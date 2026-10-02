<?php

namespace App\Http\Controllers;

use App\Models\CV;
use App\Models\JobApply;
use App\Models\User;
use App\Support\TypedNameConfirmation;
use Illuminate\Support\Collection;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Mailjet\LaravelMailjet\Facades\Mailjet;
use Mailjet\Resources;

class JobApplyController extends Controller
{
    public function jobApply()
    {
        return Inertia::render('JobApply/JobApply');
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'date_of_birth' => 'required|date',
                'gender' => 'required|string|max:10',
                'height' => 'required',
                'weight' => 'required',
                'ethnicity' => 'required|string|max:100',
                'religion' => 'required|string|max:100',
                'phone' => 'required|string|max:20',
                'email' => 'nullable|email|max:255',
                'viber' => 'nullable|string|max:20',
                'current_address' => 'required|string|max:500',
                'service_area' => 'required|string|max:255',
                'available_townships' => 'nullable|array',
                'available_townships.*' => 'string',
                'experience' => 'required|string|max:1000',
                'certificate_details' => 'required|string|max:1000',
                'passport' => 'nullable|file|mimes:jpeg,png,jpg|max:10048',
                'visa' => 'nullable|file|mimes:jpeg,png,jpg|max:10048',
                'certificates.*' => 'required|file|mimes:jpeg,png,jpg|max:10048',
            ]);

            $existingApply = JobApply::where('name', $validatedData['name'])
                ->where('date_of_birth', $validatedData['date_of_birth'])
                ->where('gender', $validatedData['gender'])
                ->first();

            if ($existingApply) {
                return redirect()->route('job.apply.already.submit')->with('success', 'You have already submitted an application.');
            }

            $passportPath = $request->hasFile('passport')
                ? $request->file('passport')->store('jobApply/id', 'public')
                : null;

            $visaPath = $request->hasFile('visa')
                ? $request->file('visa')->store('jobApply/familyMembers', 'public')
                : null;

            $certificatePaths = [];
            if ($request->hasFile('certificates')) {
                foreach ($request->file('certificates') as $certificate) {
                    $certificatePaths[] = $certificate->store('jobApply/certificates', 'public');
                }
            }

            $newCV = JobApply::create([
                'name' => $validatedData['name'],
                'date_of_birth' => $validatedData['date_of_birth'],
                'gender' => $validatedData['gender'],
                'height' => $validatedData['height'],
                'weight' => $validatedData['weight'],
                'ethnicity' => $validatedData['ethnicity'],
                'religion' => $validatedData['religion'],
                'phone' => $validatedData['phone'],
                'email' => $validatedData['email'] ?? null,
                'viber' => $validatedData['viber'] ?? null,
                'current_address' => $validatedData['current_address'],
                'service_area' => $validatedData['service_area'],
                'available_townships' => $validatedData['available_townships'] ?? [],
                'experience' => $validatedData['experience'],
                'passport' => $passportPath,
                'visa' => $visaPath,
                'certificates' => $certificatePaths,
                'certificate_details' => $validatedData['certificate_details'],
                'source' => 'website',
                'decision' => 'pending',
                'status' => 'Pending',
            ]);

            if ($newCV) {
                $mj = Mailjet::getClient();

                $body = [
                    'FromEmail' => 'noreply@genevacaregiver.com',
                    'FromName' => 'Geneva',
                    'Subject' => 'A new CV is received.',
                    'MJ-TemplateID' => 7562532,
                    'MJ-TemplateLanguage' => true,
                    'Vars' => [
                        'name' => $newCV->name ?? '',
                        'date_of_birth' => $newCV->date_of_birth ?? '',
                        'gender' => $newCV->gender ?? '',
                        'height' => $newCV->height ?? '',
                        'weight' => $newCV->weight ?? '',
                        'ethnicity' => $newCV->ethnicity ?? '',
                        'religion' => $newCV->religion ?? '',
                        'language' => $newCV->language ?? '',
                        'phone' => $newCV->phone ?? '',
                        'email' => $newCV->email ?? '',
                        'viber' => $newCV->viber ?? '',
                        'current_address' => $newCV->current_address ?? '',
                        'service_area' => $newCV->service_area ?? '',
                        'certificate_details' => $newCV->certificate_details,
                        'experience' => $newCV->experience,
                    ],
                    'Recipients' => [['Email' => 'genevacaregivertraining@gmail.com']],
                ];

                $response = $mj->post(Resources::$Email, ['body' => $body]);

                if (! $response->success()) {
                    Log::error('Mailjet response:', [
                        'status' => $response->getStatus(),
                        'reason' => $response->getReasonPhrase(),
                        'body' => $response->getBody(),
                    ]);
                }
            }

            return redirect()->route('job.apply.success')->with('success', 'Application submitted successfully!');
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function success()
    {
        return Inertia::render('JobApply/Success');
    }

    public function alreadySubmit()
    {
        return Inertia::render('JobApply/AlreadySubmit');
    }

    public function adminJobApplies(Request $request)
    {
        $month = $this->resolveMonth($request->input('month'));
        $start = Carbon::createFromFormat('Y-m-d', $month.'-01')->startOfMonth();
        $end = $start->copy()->endOfMonth();
        $search = trim((string) $request->input('search', ''));

        $scoped = JobApply::query();

        if ($search !== '') {
            $this->applySearch($scoped, $search);
        } else {
            $this->applyReportedMonth($scoped, $start, $end);
        }

        $byArea = (clone $scoped)
            ->select('service_area', DB::raw('count(*) as total'))
            ->groupBy('service_area')
            ->pluck('total', 'service_area');

        $query = (clone $scoped)
            ->when($request->filled('service_area'), fn ($q) => $q->where('service_area', $request->service_area));

        $jobApplies = (clone $query)
            ->with('cv:id,full_name,geneva_id,phone,gender')
            ->when(
                $search !== '',
                fn ($q) => $q->orderByDesc('cv_reported_date')->orderByDesc('created_at'),
                fn ($q) => $q->orderBy('cv_reported_date')->orderBy('created_at'),
            )
            ->orderBy('id')
            ->get()
            ->map(fn (JobApply $apply) => $this->tableRecord($apply));

        return Inertia::render('Admin/JobApplies/JobApplies', [
            'jobApplies' => $jobApplies,
            'count' => (clone $query)->count(),
            'filters' => [
                'service_area' => $request->service_area ?? '',
                'month' => $month,
                'search' => $search,
            ],
            'availableMonths' => $this->availableMonths(),
            'byArea' => $byArea,
            'serviceAreas' => JobApply::BRANCHES,
        ]);
    }

    public function adminCreate()
    {
        return Inertia::render('Admin/JobApplies/JobApplyForm', [
            'record' => null,
            'branches' => JobApply::BRANCHES,
            'genders' => JobApply::GENDERS,
            'staff' => $this->staffOptions(),
            'decisions' => JobApply::DECISIONS,
        ]);
    }

    public function adminStore(Request $request)
    {
        JobApply::create([
            ...$this->validatedAdmin($request),
            'source' => 'manual',
        ]);

        return redirect()
            ->route('admin.job.apply')
            ->with('success', 'Candidate created.');
    }

    public function adminSingleJobApply($id)
    {
        $apply = JobApply::with('cv:id,full_name,geneva_id,phone,gender')->findOrFail($id);

        return Inertia::render('Admin/JobApplies/SingleJobApply', [
            'apply' => $this->detailRecord($apply),
            'branches' => JobApply::BRANCHES,
            'genders' => JobApply::GENDERS,
            'staff' => $this->staffOptions(),
            'decisions' => $apply->isWebsiteSource()
                ? JobApply::WEBSITE_STATUSES
                : JobApply::DECISIONS,
            'matchingCvs' => $apply->canLinkCv()
                ? $this->presentCvs($this->matchingCvs($apply), $apply)
                : [],
        ]);
    }

    public function adminUpdate(Request $request, $id)
    {
        $apply = JobApply::findOrFail($id);
        $apply->update($this->validatedAdmin($request, $apply));

        return redirect()
            ->route('admin.job.apply.single', $apply->id)
            ->with('success', 'Candidate updated.');
    }

    public function destroy(Request $request, $id)
    {
        $apply = JobApply::findOrFail($id);

        $request->validate([
            'confirm_name' => ['required', 'string', 'max:255'],
        ]);

        if (! TypedNameConfirmation::matches($apply->name, $request->input('confirm_name'))) {
            return back()->withErrors([
                'confirm_name' => TypedNameConfirmation::rejectionMessage('candidate name'),
            ]);
        }

        try {
            $paths = $this->storedFilePaths($apply);
            if ($paths !== []) {
                Storage::disk('public')->delete($paths);
            }

            $apply->delete();
        } catch (Exception $exception) {
            Log::error('Failed to delete job application.', [
                'job_apply_id' => $apply->id,
                'message' => $exception->getMessage(),
            ]);

            return back()->withErrors([
                'confirm_name' => 'Could not delete this application. Please try again.',
            ]);
        }

        return back()->with('success', 'Job application deleted.');
    }

    public function adminSearchJobApply(Request $request)
    {
        $search = trim((string) $request->input('search', ''));
        $query = JobApply::query();

        if ($search !== '') {
            $this->applySearch($query, $search);
        }

        $searchResults = $query
            ->with('cv:id,full_name,geneva_id,phone,gender')
            ->orderByDesc('id')
            ->get()
            ->map(fn (JobApply $apply) => $this->tableRecord($apply));

        return Inertia::render('Admin/JobApplies/JobApplySearchResult', [
            'searchTerm' => $search,
            'searchResults' => $searchResults,
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $apply = JobApply::findOrFail($id);

        $request->validate([
            'status' => [
                'required',
                Rule::in($apply->isWebsiteSource() ? JobApply::WEBSITE_STATUSES : JobApply::STATUSES),
            ],
        ]);

        if ($apply->isWebsiteSource()) {
            $apply->status = $request->status;
        } else {
            $apply->status = JobApply::alignedStatus($request->status);
            $apply->decision = $apply->status;
        }
        $apply->save();

        return back()->with('success', 'Status updated successfully.');
    }

    public function searchCvs(Request $request, $id)
    {
        $apply = JobApply::findOrFail($id);
        abort_unless($apply->canLinkCv(), 403);

        $search = trim((string) $request->input('q', ''));

        $cvs = $search === ''
            ? $this->matchingCvs($apply)
            : CV::query()->matchingSearch($search)->orderByDesc('id')->limit(15)->get();

        return response()->json($this->presentCvs($cvs, $apply));
    }

    public function linkCv(Request $request, $id)
    {
        $apply = JobApply::findOrFail($id);
        abort_unless($apply->canLinkCv(), 403);

        $validated = $request->validate([
            'cv_id' => ['required', 'exists:c_v_s,id'],
        ]);

        $alreadyLinked = JobApply::query()
            ->where('cv_id', $validated['cv_id'])
            ->whereKeyNot($apply->id)
            ->exists();

        if ($alreadyLinked) {
            return back()->withErrors([
                'cv_id' => 'This CV is linked to another candidate.',
            ]);
        }

        $apply->update(['cv_id' => $validated['cv_id']]);

        return redirect()
            ->route('admin.job.apply.single', $apply->id)
            ->with('success', 'CV linked to this candidate.');
    }

    public function unlinkCv($id)
    {
        $apply = JobApply::findOrFail($id);
        abort_unless($apply->cv_id !== null, 403);

        $apply->update(['cv_id' => null]);

        return redirect()
            ->route('admin.job.apply.single', $apply->id)
            ->with('success', 'CV unlinked from this candidate.');
    }

    private function applySearch($query, string $search): void
    {
        $like = '%'.$search.'%';
        $digits = preg_replace('/\D+/', '', $search) ?? '';

        $query->where(function ($inner) use ($like, $digits) {
            $inner->where('name', 'like', $like)
                ->orWhere('phone', 'like', $like)
                ->orWhere('coordinated_by', 'like', $like)
                ->orWhere('interviewed_by', 'like', $like);

            if (strlen($digits) >= 4) {
                $inner->orWhereRaw(
                    "REPLACE(REPLACE(REPLACE(REPLACE(phone, ' ', ''), '-', ''), CHAR(10), ''), CHAR(13), '') LIKE ?",
                    ['%'.$digits.'%']
                );
            }
        });
    }

    private function applyReportedMonth($query, Carbon $start, Carbon $end): void
    {
        $query->where(function ($inner) use ($start, $end) {
            $inner->whereBetween('cv_reported_date', [$start->toDateString(), $end->toDateString()])
                ->orWhere(function ($fallback) use ($start, $end) {
                    $fallback->whereNull('cv_reported_date')
                        ->whereBetween('created_at', [$start, $end]);
                });
        });
    }

    private function availableMonths()
    {
        $reported = JobApply::query()
            ->whereNotNull('cv_reported_date')
            ->pluck('cv_reported_date');

        $created = JobApply::query()
            ->whereNull('cv_reported_date')
            ->pluck('created_at');

        return $reported
            ->concat($created)
            ->filter()
            ->map(fn ($date) => Carbon::parse($date)->format('Y-m'))
            ->unique()
            ->sort()
            ->values();
    }

    private function resolveMonth(?string $month): string
    {
        if (is_string($month) && preg_match('/^\d{4}-(0[1-9]|1[0-2])$/', $month)) {
            return $month;
        }

        $latestReported = JobApply::query()->max('cv_reported_date');
        $latestCreated = JobApply::query()->max('created_at');
        $latest = collect([$latestReported, $latestCreated])
            ->filter()
            ->map(fn ($date) => Carbon::parse($date))
            ->sort()
            ->last();

        if ($latest) {
            return $latest->format('Y-m');
        }

        return now()->format('Y-m');
    }

    private function tableRecord(JobApply $apply): array
    {
        $listedAt = $apply->cv_reported_date
            ? $apply->cv_reported_date->format('Y-m-d')
            : optional($apply->created_at)->format('Y-m-d H:i:s');

        return [
            'id' => $apply->id,
            'name' => $apply->name,
            'created_at' => $listedAt,
            'status' => $apply->isWebsiteSource()
                ? ($apply->status ?: 'Pending')
                : JobApply::alignedStatus($apply->status ?: $apply->decision),
            'source' => $apply->source,
            'coordinated_by' => $apply->coordinated_by,
            'interview_date' => optional($apply->interview_date)->format('Y-m-d'),
            'interviewed_by' => $apply->interviewed_by,
            'interview_score' => $apply->interview_score,
            'training_start_date' => optional($apply->training_start_date)->format('Y-m-d'),
            'assessment_date' => optional($apply->assessment_date)->format('Y-m-d'),
            'assessment_score' => $apply->assessment_score,
            'gender' => $apply->gender,
            'date_of_birth' => $apply->date_of_birth
                ? $apply->date_of_birth->format('Y-m-d')
                : null,
            'service_area' => $apply->service_area,
            'phone' => $apply->phone,
            'viber' => $apply->viber,
            'current_address' => $apply->current_address,
            'available_townships' => $apply->available_townships,
            'experience' => $apply->experience,
            'certificate_details' => $apply->certificate_details,
            'cv' => $this->presentCvSummary($apply->cv),
        ];
    }

    private function detailRecord(JobApply $apply): array
    {
        return [
            'id' => $apply->id,
            'name' => $apply->name,
            'date_of_birth' => optional($apply->date_of_birth)->format('Y-m-d'),
            'gender' => $apply->gender,
            'height' => $apply->height,
            'weight' => $apply->weight,
            'ethnicity' => $apply->ethnicity,
            'religion' => $apply->religion,
            'phone' => $apply->phone,
            'email' => $apply->email,
            'viber' => $apply->viber,
            'current_address' => $apply->current_address,
            'service_area' => $apply->service_area ?? 'Yangon',
            'available_townships' => $apply->available_townships ?? [],
            'status' => $apply->isWebsiteSource()
                ? ($apply->status ?: 'Pending')
                : JobApply::alignedStatus($apply->status ?: $apply->decision),
            'source' => $apply->source,
            'experience' => $apply->experience,
            'certificate_details' => $apply->certificate_details,
            'passport' => $apply->passport,
            'visa' => $apply->visa,
            'certificates' => $apply->certificates ?? [],
            'coordinated_by' => $apply->coordinated_by ?? '',
            'interviewed_by' => $apply->interviewed_by ?? '',
            'cv_reported_date' => optional($apply->cv_reported_date)->format('Y-m-d') ?? '',
            'interview_date' => optional($apply->interview_date)->format('Y-m-d') ?? '',
            'training_start_date' => optional($apply->training_start_date)->format('Y-m-d') ?? '',
            'assessment_date' => optional($apply->assessment_date)->format('Y-m-d') ?? '',
            'interview_score' => $apply->interview_score ?? '',
            'interview_score_note' => $apply->interview_score_note ?? '',
            'interview_note' => $apply->interview_note ?? '',
            'decision' => $apply->isWebsiteSource()
                ? ($apply->status ?: 'Pending')
                : JobApply::alignedStatus($apply->status ?: $apply->decision),
            'assessment_score' => $apply->assessment_score ?? '',
            'training_note' => $apply->training_note ?? '',
            'assessment_note' => $apply->assessment_note ?? '',
            'notes' => $apply->notes ?? '',
            'cv' => $this->presentCvSummary($apply->cv),
        ];
    }

    private function matchingCvs(JobApply $apply): Collection
    {
        return CV::query()
            ->matchingJobApply($apply)
            ->orderByDesc('id')
            ->limit(15)
            ->get();
    }

    private function presentCvs(Collection $cvs, ?JobApply $except = null): array
    {
        $ids = $cvs->pluck('id')->filter()->values();
        $linkedByCv = $ids->isEmpty()
            ? collect()
            : JobApply::query()
                ->whereIn('cv_id', $ids)
                ->when($except, fn ($query) => $query->whereKeyNot($except->id))
                ->orderBy('id')
                ->get(['id', 'name', 'cv_id'])
                ->groupBy('cv_id');

        return $cvs
            ->map(function (CV $cv) use ($linkedByCv) {
                $summary = $this->presentCvSummary($cv);
                $other = $linkedByCv->get($cv->id)?->first();
                $summary['linked_candidate'] = $other ? [
                    'id' => $other->id,
                    'name' => $other->name,
                ] : null;

                return $summary;
            })
            ->values()
            ->all();
    }

    private function presentCvSummary(?CV $cv): ?array
    {
        if (! $cv) {
            return null;
        }

        return [
            'id' => $cv->id,
            'full_name' => $cv->full_name,
            'geneva_id' => $cv->geneva_id,
            'phone' => $cv->phone,
            'gender' => $cv->gender,
        ];
    }

    /**
     * @return list<array{id: int, name: string}>
     */
    private function staffOptions(): array
    {
        return User::query()
            ->where(function ($query) {
                $query->where('is_admin', true)
                    ->orWhere('is_super_admin', true);
            })
            ->whereNotNull('name')
            ->where('name', '!=', '')
            ->orderBy('name')
            ->get(['id', 'name'])
            ->map(fn (User $user) => [
                'id' => $user->id,
                'name' => $user->name,
            ])
            ->values()
            ->all();
    }

    /**
     * @param  list<string>  $allowed
     * @return list<string>
     */
    private function allowedValues(array $allowed, ?string $current): array
    {
        return collect($allowed)
            ->merge([$current])
            ->filter(fn ($value) => is_string($value) && $value !== '')
            ->unique()
            ->values()
            ->all();
    }

    /**
     * @return list<string>
     */
    private function interviewerNames(mixed $value): array
    {
        if (is_array($value)) {
            return collect($value)
                ->map(fn ($name) => trim((string) $name))
                ->filter()
                ->unique()
                ->values()
                ->all();
        }

        if (! is_string($value) || trim($value) === '') {
            return [];
        }

        return collect(explode(',', $value))
            ->map(fn ($name) => trim($name))
            ->filter()
            ->unique()
            ->values()
            ->all();
    }

    private function validatedAdmin(Request $request, ?JobApply $existing = null): array
    {
        $isWebsite = $existing?->isWebsiteSource() ?? false;
        $statusValues = $isWebsite ? JobApply::WEBSITE_STATUSES : JobApply::STATUSES;

        $interviewers = $this->interviewerNames($request->input('interviewed_by'));
        $request->merge([
            'interviewed_by' => $interviewers === [] ? null : $interviewers,
        ]);

        $allowedInterviewers = collect($this->staffOptions())
            ->pluck('name')
            ->merge($this->interviewerNames($existing?->interviewed_by))
            ->filter(fn ($name) => is_string($name) && $name !== '')
            ->unique()
            ->values()
            ->all();

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'service_area' => ['required', Rule::in(JobApply::BRANCHES)],
            'phone' => ['nullable', 'string', 'max:20'],
            'gender' => ['nullable', Rule::in($this->allowedValues(JobApply::GENDERS, $existing?->gender))],
            'date_of_birth' => ['nullable', 'date'],
            'coordinated_by' => ['nullable', 'string', 'max:255'],
            'interviewed_by' => [
                'nullable',
                'array',
                function (string $attribute, mixed $value, \Closure $fail) use ($allowedInterviewers) {
                    if (! is_array($value)) {
                        return;
                    }

                    foreach ($value as $name) {
                        if (! is_string($name) || ! in_array($name, $allowedInterviewers, true)) {
                            $fail('Select interviewers from the staff list.');

                            return;
                        }
                    }

                    if (strlen(implode(', ', $value)) > 255) {
                        $fail('Select fewer interviewers.');
                    }
                },
            ],
            'cv_reported_date' => ['nullable', 'date'],
            'interview_date' => ['nullable', 'date'],
            'training_start_date' => ['nullable', 'date'],
            'assessment_date' => ['nullable', 'date'],
            'interview_score' => ['nullable', 'integer', 'min:0', 'max:100'],
            'interview_score_note' => ['nullable', 'string'],
            'interview_note' => ['nullable', 'string'],
            'decision' => ['required', Rule::in($statusValues)],
            'assessment_score' => ['nullable', 'string', 'max:255'],
            'training_note' => ['nullable', 'string'],
            'assessment_note' => ['nullable', 'string'],
            'notes' => ['nullable', 'string'],
        ]);

        $data = $this->emptyToNull($data, [
            'phone',
            'gender',
            'date_of_birth',
            'coordinated_by',
            'cv_reported_date',
            'interview_date',
            'training_start_date',
            'assessment_date',
            'interview_score',
            'interview_score_note',
            'interview_note',
            'assessment_score',
            'training_note',
            'assessment_note',
            'notes',
        ]);

        $data['interviewed_by'] = empty($data['interviewed_by'])
            ? null
            : implode(', ', $data['interviewed_by']);

        if ($isWebsite) {
            $data['status'] = $data['decision'];
            unset($data['decision']);
        } else {
            $data['status'] = JobApply::alignedStatus($data['decision']);
            $data['decision'] = $data['status'];
        }

        return $data;
    }

    private function storedFilePaths(JobApply $apply): array
    {
        $certificates = is_array($apply->certificates) ? $apply->certificates : [];
        $candidates = [$apply->passport, $apply->visa, ...$certificates];

        return array_values(array_filter(
            $candidates,
            fn ($path) => is_string($path)
                && $path !== ''
                && ! str_contains($path, '..')
                && ! str_starts_with($path, 'http')
        ));
    }

    private function emptyToNull(array $data, array $keys): array
    {
        foreach ($keys as $key) {
            if (array_key_exists($key, $data) && $data[$key] === '') {
                $data[$key] = null;
            }
        }

        return $data;
    }
}
