<?php

namespace App\Http\Controllers;

use App\Models\CaseRecord;
use App\Models\Patient;
use App\Support\TypedNameConfirmation;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CaseRecordController extends Controller
{
    public function index(Request $request)
    {
        $month = $this->resolveMonth($request->input('month'));
        $start = Carbon::createFromFormat('Y-m-d', $month.'-01')->startOfMonth();
        $end = $start->copy()->endOfMonth();
        $search = trim((string) $request->input('search', ''));

        $scoped = CaseRecord::query();

        if ($search !== '') {
            $this->applySearch($scoped, $search, ['name', 'phone', 'address'], 'phone');
        } else {
            $scoped->whereBetween('inquiry_at', [$start, $end]);
        }

        $byBranch = (clone $scoped)
            ->select('branch', DB::raw('count(*) as total'))
            ->groupBy('branch')
            ->pluck('total', 'branch');

        $query = (clone $scoped)
            ->when($request->filled('branch'), fn ($q) => $q->where('branch', $request->branch));

        $records = (clone $query)
            ->with('patient:id,pt_id,first_name,last_name,type,emergency_contact_phone,address,service_area')
            ->when(
                $search !== '',
                fn ($q) => $q->orderByDesc('inquiry_at'),
                fn ($q) => $q->orderBy('inquiry_at'),
            )
            ->orderBy('source_row')
            ->orderBy('id')
            ->get()
            ->map(fn (CaseRecord $record) => $this->tableRecord($record));

        $availableMonths = CaseRecord::query()
            ->whereNotNull('inquiry_at')
            ->orderBy('inquiry_at')
            ->pluck('inquiry_at')
            ->map(fn ($date) => Carbon::parse($date)->format('Y-m'))
            ->unique()
            ->values();

        return Inertia::render('Admin/Cases/AdminCases', [
            'records' => $records,
            'filters' => [
                'branch' => $request->branch ?? '',
                'month' => $month,
                'search' => $search,
            ],
            'availableMonths' => $availableMonths,
            'summary' => [
                'total' => (clone $query)->count(),
                'by_branch' => $byBranch,
            ],
            'branches' => CaseRecord::BRANCHES,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Cases/CaseForm', [
            'record' => null,
            'branches' => CaseRecord::BRANCHES,
            'careTypes' => CaseRecord::formCareTypes(),
            'levels' => CaseRecord::LEVELS,
            'dutyTypes' => CaseRecord::DUTY_TYPES,
            'statuses' => CaseRecord::STATUSES,
            'matchingPatients' => [],
        ]);
    }

    public function store(Request $request)
    {
        $case = CaseRecord::create($this->validated($request));

        if ($case->canLinkPatient()) {
            return redirect()
                ->route('admin.cases.edit', $case)
                ->with('success', 'Case created. Create or link a patient for this confirmed case.');
        }

        return redirect()
            ->route('admin.cases.index')
            ->with('success', 'Case record created.');
    }

    public function edit(CaseRecord $case)
    {
        $case->load('patient:id,pt_id,first_name,last_name,type,emergency_contact_phone,address,service_area');

        return Inertia::render('Admin/Cases/CaseForm', [
            'record' => $this->formRecord($case),
            'branches' => CaseRecord::BRANCHES,
            'careTypes' => CaseRecord::formCareTypes($case->care_type),
            'levels' => CaseRecord::formLevels($case->level),
            'dutyTypes' => CaseRecord::formChoices(CaseRecord::DUTY_TYPES, $case->duty_type),
            'statuses' => CaseRecord::STATUSES,
            'matchingPatients' => $case->canLinkPatient()
                ? $this->presentPatients($this->matchingPatients($case))
                : [],
        ]);
    }

    public function update(Request $request, CaseRecord $case)
    {
        $case->update($this->validated($request, $case));
        $case->refresh();

        if ($case->canLinkPatient()) {
            return redirect()
                ->route('admin.cases.edit', $case)
                ->with('success', 'Case updated. Create or link a patient for this confirmed case.');
        }

        return redirect()
            ->route('admin.cases.index')
            ->with('success', 'Case record updated.');
    }

    public function destroy(Request $request, CaseRecord $case)
    {
        $request->validate([
            'confirm_name' => ['required', 'string', 'max:255'],
        ]);

        if (! TypedNameConfirmation::matches($case->name, $request->input('confirm_name'))) {
            return back()->withErrors([
                'confirm_name' => TypedNameConfirmation::rejectionMessage('name'),
            ]);
        }

        try {
            $case->delete();
        } catch (Exception $exception) {
            Log::error('Failed to delete case record.', [
                'case_id' => $case->id,
                'message' => $exception->getMessage(),
            ]);

            return back()->withErrors([
                'confirm_name' => 'Could not delete this case. Please try again.',
            ]);
        }

        return back()->with('success', 'Case deleted.');
    }

    public function searchPatients(Request $request, CaseRecord $case)
    {
        abort_unless($case->canLinkPatient(), 403);

        $search = trim((string) $request->input('q', ''));

        $patients = $search === ''
            ? $this->matchingPatients($case)
            : Patient::query()->matchingSearch($search)->orderByDesc('id')->limit(15)->get();

        return response()->json($this->presentPatients($patients));
    }

    public function linkPatient(Request $request, CaseRecord $case)
    {
        abort_unless($case->canLinkPatient(), 403);

        $validated = $request->validate([
            'patient_id' => ['required', 'exists:patients,id'],
        ]);

        $case->update(['patient_id' => $validated['patient_id']]);

        return redirect()
            ->route('admin.cases.edit', $case)
            ->with('success', 'Patient linked to this case.');
    }

    public function unlinkPatient(CaseRecord $case)
    {
        abort_unless($case->patient_id !== null, 403);

        $case->update(['patient_id' => null]);

        return redirect()
            ->route('admin.cases.edit', $case)
            ->with('success', 'Patient unlinked from this case.');
    }

    private function applySearch($query, string $search, array $columns, ?string $phoneColumn = null): void
    {
        $like = '%'.$search.'%';
        $digits = preg_replace('/\D+/', '', $search) ?? '';

        $query->where(function ($inner) use ($like, $columns, $phoneColumn, $digits) {
            foreach ($columns as $column) {
                $inner->orWhere($column, 'like', $like);
            }

            if ($phoneColumn === 'phone' && strlen($digits) >= 4) {
                $inner->orWhereRaw(
                    "REPLACE(REPLACE(REPLACE(REPLACE(phone, ' ', ''), '-', ''), CHAR(10), ''), CHAR(13), '') LIKE ?",
                    ['%'.$digits.'%']
                );
            }
        });
    }

    private function resolveMonth(?string $month): string
    {
        if (is_string($month) && preg_match('/^\d{4}-(0[1-9]|1[0-2])$/', $month)) {
            return $month;
        }

        $latest = CaseRecord::query()->max('inquiry_at');

        if ($latest) {
            return Carbon::parse($latest)->format('Y-m');
        }

        return now()->format('Y-m');
    }

    private function tableRecord(CaseRecord $record): array
    {
        return [
            'id' => $record->id,
            'branch' => $record->branch,
            'name' => $record->name,
            'inquiry_at' => optional($record->inquiry_at)->format('Y-m-d H:i:s'),
            'inquiry_note' => $record->inquiry_note,
            'care_type' => $record->care_type,
            'address' => $record->address,
            'phone' => $record->phone,
            'requested_start' => $record->requested_start,
            'requested_start_date' => optional($record->requested_start_date)->format('Y-m-d'),
            'duration' => $record->duration,
            'level' => $record->level,
            'duty_type' => $record->duty_type,
            'cv_sent_at' => optional($record->cv_sent_at)->format('Y-m-d H:i:s'),
            'cv_sent_note' => $record->cv_sent_note,
            'client_response' => $record->client_response,
            'interview_date' => optional($record->interview_date)->format('Y-m-d'),
            'interview_note' => $record->interview_note,
            'confirm_date' => optional($record->confirm_date)->format('Y-m-d'),
            'confirm_note' => $record->confirm_note,
            'deposit_note' => $record->deposit_note,
            'duty_start_date' => optional($record->duty_start_date)->format('Y-m-d'),
            'duty_start_note' => $record->duty_start_note,
            'status' => $record->status,
            'patient_id' => $record->patient_id,
            'patient' => $this->presentPatientSummary($record->patient),
        ];
    }

    private function validated(Request $request, ?CaseRecord $case = null): array
    {
        $levels = CaseRecord::formLevels($case?->level);
        $dutyTypes = CaseRecord::formChoices(CaseRecord::DUTY_TYPES, $case?->duty_type);
        $selectedLevels = CaseRecord::levelNames($request->input('level'));

        $request->merge([
            'level' => $selectedLevels === [] ? null : $selectedLevels,
        ]);

        $data = $request->validate([
            'branch' => ['required', Rule::in(CaseRecord::BRANCHES)],
            'inquiry_at' => ['nullable', 'date'],
            'inquiry_note' => ['nullable', 'string'],
            'care_type' => ['nullable', Rule::in(CaseRecord::storedCareTypes())],
            'name' => ['required', 'string', 'max:255'],
            'address' => ['nullable', 'string'],
            'phone' => ['nullable', 'string', 'max:255'],
            'requested_start' => ['nullable', 'string', 'max:255'],
            'requested_start_date' => ['nullable', 'date'],
            'duration' => ['nullable', 'string', 'max:255'],
            'level' => [
                'nullable',
                'array',
                function (string $attribute, mixed $value, \Closure $fail) use ($levels) {
                    if (! is_array($value)) {
                        return;
                    }

                    foreach ($value as $name) {
                        if (! is_string($name) || ! in_array($name, $levels, true)) {
                            $fail('Select a level from the list.');

                            return;
                        }
                    }

                    if (strlen(implode(', ', $value)) > 255) {
                        $fail('Select fewer levels.');
                    }
                },
            ],
            'duty_type' => ['nullable', Rule::in($dutyTypes)],
            'cv_sent_at' => ['nullable', 'date'],
            'cv_sent_note' => ['nullable', 'string'],
            'client_response' => ['nullable', 'string'],
            'interview_date' => ['nullable', 'date'],
            'interview_note' => ['nullable', 'string'],
            'confirm_date' => ['nullable', 'date'],
            'confirm_note' => ['nullable', 'string'],
            'deposit_note' => ['nullable', 'string'],
            'duty_start_date' => ['nullable', 'date'],
            'duty_start_note' => ['nullable', 'string'],
            'status' => ['required', Rule::in(CaseRecord::STATUSES)],
            'notes' => ['nullable', 'string'],
        ]);

        $data = $this->emptyToNull($data, [
            'inquiry_at',
            'inquiry_note',
            'care_type',
            'address',
            'phone',
            'requested_start',
            'requested_start_date',
            'duration',
            'duty_type',
            'cv_sent_at',
            'cv_sent_note',
            'client_response',
            'interview_date',
            'interview_note',
            'confirm_date',
            'confirm_note',
            'deposit_note',
            'duty_start_date',
            'duty_start_note',
            'notes',
        ]);

        $data['level'] = empty($data['level'])
            ? null
            : implode(', ', $data['level']);

        return $data;
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

    private function formRecord(CaseRecord $record): array
    {
        return [
            'id' => $record->id,
            'branch' => $record->branch,
            'inquiry_at' => optional($record->inquiry_at)->format('Y-m-d\TH:i') ?? '',
            'inquiry_note' => $record->inquiry_note ?? '',
            'care_type' => $record->care_type ?? '',
            'name' => $record->name,
            'address' => $record->address ?? '',
            'phone' => $record->phone ?? '',
            'requested_start' => $record->requested_start ?? '',
            'requested_start_date' => optional($record->requested_start_date)->format('Y-m-d') ?? '',
            'duration' => $record->duration ?? '',
            'level' => $record->level ?? '',
            'duty_type' => $record->duty_type ?? '',
            'cv_sent_at' => optional($record->cv_sent_at)->format('Y-m-d\TH:i') ?? '',
            'cv_sent_note' => $record->cv_sent_note ?? '',
            'client_response' => $record->client_response ?? '',
            'interview_date' => optional($record->interview_date)->format('Y-m-d') ?? '',
            'interview_note' => $record->interview_note ?? '',
            'confirm_date' => optional($record->confirm_date)->format('Y-m-d') ?? '',
            'confirm_note' => $record->confirm_note ?? '',
            'deposit_note' => $record->deposit_note ?? '',
            'duty_start_date' => optional($record->duty_start_date)->format('Y-m-d') ?? '',
            'duty_start_note' => $record->duty_start_note ?? '',
            'status' => $record->status,
            'notes' => $record->notes ?? '',
            'patient_id' => $record->patient_id,
            'patient' => $this->presentPatientSummary($record->patient),
        ];
    }

    private function matchingPatients(CaseRecord $case): Collection
    {
        return Patient::query()
            ->matchingCase($case)
            ->orderByDesc('id')
            ->limit(15)
            ->get();
    }

    private function presentPatients(Collection $patients): array
    {
        return $patients
            ->map(fn (Patient $patient) => $this->presentPatientSummary($patient))
            ->values()
            ->all();
    }

    private function presentPatientSummary(?Patient $patient): ?array
    {
        if (! $patient) {
            return null;
        }

        return [
            'id' => $patient->id,
            'pt_id' => $patient->pt_id,
            'first_name' => $patient->first_name,
            'last_name' => $patient->last_name,
            'type' => $patient->type,
            'emergency_contact_phone' => $patient->emergency_contact_phone,
            'address' => $patient->address,
            'service_area' => $patient->service_area,
        ];
    }
}
