<?php

namespace App\Http\Controllers;

use App\Models\CV;
use App\Models\CarePlanPhoto;
use App\Models\CaseRecord;
use App\Models\Patient;
use App\Models\PatientCaregiverAssignment;
use App\Models\PatientFeedback;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Carbon\Carbon;
use Inertia\Inertia;

class PatientController extends Controller
{
    // See by admin
    public function index(Request $request)
    {
        $query = $this->patientsWithCaregivers();

        if ($request->filled('service_area')) {
            $query->where('service_area', $request->service_area);
        }

        $patients = $query
            ->orderByDesc('id')
            ->paginate(50)
            ->withQueryString()
            ->through(fn (Patient $patient) => $this->presentPatient($patient));

        return Inertia::render('Admin/Patient/AdminPatients', [
            'patients' => $patients,
            'count' => Patient::count(),
            'filters' => [
                'service_area' => $request->service_area,
            ],
        ]);
    }
    
    // Create patient by admin
    public function createPatient(Request $request)
    {
        $fromCase = null;
        $matchingPatients = [];

        if ($request->filled('case_id')) {
            $case = CaseRecord::findOrFail($request->input('case_id'));

            if ($case->patient_id) {
                return redirect()
                    ->route('admin.patient', $case->patient_id)
                    ->with('success', 'This case is already linked to a patient.');
            }

            abort_unless($case->canLinkPatient(), 403);

            $fromCase = $case->patientFormDefaults();
            $matchingPatients = Patient::query()
                ->matchingCase($case)
                ->orderByDesc('id')
                ->limit(15)
                ->get()
                ->map(fn (Patient $patient) => [
                    'id' => $patient->id,
                    'pt_id' => $patient->pt_id,
                    'first_name' => $patient->first_name,
                    'last_name' => $patient->last_name,
                    'type' => $patient->type,
                    'emergency_contact_phone' => $patient->emergency_contact_phone,
                    'address' => $patient->address,
                    'service_area' => $patient->service_area,
                ])
                ->values()
                ->all();
        }

        return Inertia::render('Admin/Patient/CreatePatient', [
            'fromCase' => $fromCase,
            'matchingPatients' => $matchingPatients,
        ]);
    }

    // Store patient by admin
    public function store(Request $request)
    {
        $request->merge([
            'case_id' => $request->filled('case_id') ? $request->input('case_id') : null,
        ]);

        $validated = $request->validate([
            'type' => 'required|in:Elder,Baby,Newborn,Maternal',
            'first_name' => 'required|string|max:100',
            'last_name' => 'nullable|string|max:100',
            'date_of_birth' => 'required|date|before_or_equal:today',
            'gender' => 'required|in:Male,Female,Other',
            'weight_kg' => 'nullable|numeric',
            'height_cm' => 'nullable|numeric',
            'blood_type' => 'nullable|in:A+,A-,B+,B-,O+,O-,AB+,AB-',
            'allergies' => 'nullable|string',
            'medical_conditions' => 'nullable|string',
            'emergency_contact_name' => 'nullable|string|max:100',
            'emergency_contact_relationship' => 'nullable|string|max:50',
            'emergency_contact_phone' => 'nullable|string|max:15',
            'address' => 'nullable|string',
            'service_area' => 'required|string',
            'notes' => 'nullable|string',
            'case_id' => 'nullable|exists:case_records,id',
        ]);

        $case = null;
        if (! empty($validated['case_id'])) {
            $case = CaseRecord::findOrFail($validated['case_id']);
            abort_unless($case->canLinkPatient(), 403);
        }

        $validated['created_by'] = Auth::user()->name;
        $caseId = $validated['case_id'] ?? null;
        unset($validated['case_id']);

        $patient = DB::transaction(function () use ($validated, $case) {
            $patient = Patient::create($validated);

            if ($case) {
                $case->update(['patient_id' => $patient->id]);
            }

            return $patient;
        });

        if ($caseId) {
            return redirect()
                ->route('admin.patient', $patient->id)
                ->with('success', 'Patient created and linked to the case.');
        }

        return redirect()->route('admin.patients')->with('success', 'Patient created successfully!');
    }

    // Edit patient by admin
    public function editPatient($id)
    {
        $patient = Patient::findOrFail($id);
        return Inertia::render('Admin/Patient/EditPatient', compact('patient'));
    }

    // Update patient by admin
    public function update(Request $request, $id)
    {
        // Validate the request data
        $validated = $request->validate([
            'type' => 'required|in:Elder,Baby,Newborn,Maternal',
            'first_name' => 'required|string|max:100',
            'last_name' => 'nullable|string|max:100',
            'date_of_birth' => 'nullable|date|before_or_equal:today',
            'gender' => 'required|in:Male,Female,Other',
            'weight_kg' => 'nullable|numeric',
            'height_cm' => 'nullable|numeric',
            'blood_type' => 'nullable|in:A+,A-,B+,B-,O+,O-,AB+,AB-',
            'allergies' => 'nullable|string',
            'medical_conditions' => 'nullable|string',
            'emergency_contact_name' => 'nullable|string|max:100',
            'emergency_contact_relationship' => 'nullable|string|max:50',
            'emergency_contact_phone' => 'nullable|string|max:15',
            'address' => 'nullable|string',
            'service_area' => 'required|string',
            'notes' => 'nullable|string',
        ]);
        $patient = Patient::findOrFail($id);
        $patient->update($validated);   
        // Redirect to the index page with a success message
        return back()->with('success', 'Patient updated successfully!');
    }

    public function storeFeedback(Request $request, $id)
    {
        $patient = Patient::findOrFail($id);

        $request->merge([
            'body' => trim((string) $request->input('body')),
        ]);

        $feedbackType = is_string($request->input('feedback_type'))
            ? $request->input('feedback_type')
            : '';

        $validated = $request->validate([
            'body' => 'required|string|max:5000',
            'feedback_type' => ['required', Rule::in(array_keys(PatientFeedback::TYPES))],
            'follow_up' => [
                'required',
                Rule::in(array_keys(PatientFeedback::FOLLOW_UPS[$feedbackType] ?? [])),
            ],
        ]);

        $patient->feedbackEntries()->create([
            'body' => $validated['body'],
            'feedback_type' => $validated['feedback_type'],
            'follow_up' => $validated['follow_up'],
            'recorded_by' => Auth::id(),
        ]);

        return back()->with('success', 'Feedback saved.');
    }

    public function updateFeedback(Request $request, PatientFeedback $feedback)
    {
        $request->merge([
            'body' => trim((string) $request->input('body')),
        ]);

        $validated = $request->validate([
            'body' => 'required|string|max:5000',
        ]);

        $feedback->update([
            'body' => $validated['body'],
        ]);

        return back()->with('success', 'Feedback saved.');
    }

    public function destroyFeedback(PatientFeedback $feedback)
    {
        $feedback->delete();

        return back()->with('success', 'Feedback deleted.');
    }

    public function feedbacks(Request $request)
    {
        $validated = $request->validate([
            'search' => 'nullable|string|max:100',
            'service_area' => 'nullable|in:Mandalay,Yangon',
            'type' => 'nullable|in:Elder,Baby,Newborn,Maternal',
        ]);

        $search = trim((string) ($validated['search'] ?? ''));
        $serviceArea = $validated['service_area'] ?? '';
        $type = $validated['type'] ?? '';

        $query = Patient::query()
            ->with([
                'feedbackEntries.recorder:id,name',
                'caregiverAssignments.cv:id,full_name',
            ])
            ->orderByDesc('created_at')
            ->orderByDesc('id');

        if ($search !== '') {
            $query->where(function ($builder) use ($search) {
                $builder->where('first_name', 'like', '%'.$search.'%')
                    ->orWhere('last_name', 'like', '%'.$search.'%')
                    ->orWhere('pt_id', 'like', '%'.$search.'%');
            });
        }

        if ($serviceArea !== '') {
            $query->where('service_area', $serviceArea);
        }

        if ($type !== '') {
            $query->where('type', $type);
        }

        $patients = $query
            ->paginate(50)
            ->withQueryString()
            ->through(fn (Patient $patient) => $this->presentFeedbackRow($patient));

        return Inertia::render('Admin/Patient/AdminFeedbacks', [
            'patients' => $patients,
            'columns' => PatientFeedback::sheetColumns(),
            'filters' => [
                'search' => $search,
                'service_area' => $serviceArea,
                'type' => $type,
            ],
        ]);
    }   


    // Show single patient to admin 
    public function adminSinglePatient($id)
    {
       $patient = Patient::with('carePlanPhotos')->findOrFail($id);
        // Get approved caregivers with necessary fields
        $caregivers = CV::where('status', 'available')->select('id', 'full_name', 'geneva_id', 'service_area', 'profile_photo')
            ->get()
            ->map(function ($cv) {
                return [
                    'id' => $cv->id,
                    'full_name' => $cv->full_name,
                    'geneva_id' => $cv->geneva_id,
                    'service_area' => $cv->service_area,
                    'profile_photo' => $cv->profile_photo ? asset('storage/' . $cv->profile_photo) : null,
                ];
            });
        
        // Get current active assignments (can be multiple)
        $currentAssignments = PatientCaregiverAssignment::with(['cv', 'notes.recorder:id,name'])
            ->where('patient_id', $id)
            ->whereNull('end_date')
            ->get()
            ->map(function ($assignment) {
                if (! $assignment->cv) {
                    return null;
                }
                return [
                    'id' => $assignment->id,
                    'patient_id' => $assignment->patient_id,
                    'cv_id' => $assignment->cv_id,
                    'start_date' => $assignment->start_date,
                    'end_date' => $assignment->end_date,
                    'level' => $assignment->level,
                    'duration' => $assignment->duration,
                    'assignment_reason' => $assignment->assignment_reason,
                    'notes' => $assignment->notes->map->toPresentation()->values()->all(),
                    'caregiver' => [
                        'id' => $assignment->cv->id,
                        'slug' => $assignment->cv->slug,
                        'full_name' => $assignment->cv->full_name,
                        'geneva_id' => $assignment->cv->geneva_id,
                        'profile_photo' => $assignment->cv->profile_photo 
                            ? asset('storage/' . $assignment->cv->profile_photo) 
                            : null,
                    ]
                ];
            })
            ->filter() // remove any nulls
            ->values()
            ->all();

        // Get assignment history
        $history = $patient->caregiverAssignments()
            ->with(['cv', 'notes.recorder:id,name'])
            ->whereNotNull('end_date')
            ->orderBy('end_date', 'desc')
            ->get()
            ->map(function ($assignment) {
                return [
                    'id' => $assignment->id,
                    'start_date' => $assignment->start_date,
                    'end_date' => $assignment->end_date,
                    'level' => $assignment->level,
                    'duration' => $assignment->duration,
                    'assignment_reason' => $assignment->assignment_reason,
                    'end_reason' => $assignment->end_reason,
                    'notes' => $assignment->notes->map->toPresentation()->values()->all(),
                    'caregiver' => [
                        'id' => $assignment->cv->id,
                        'slug' => $assignment->cv->slug,
                        'full_name' => $assignment->cv->full_name,
                        'geneva_id' => $assignment->cv->geneva_id,
                        'profile_photo' => $assignment->cv->profile_photo 
                            ? asset('storage/' . $assignment->cv->profile_photo) 
                            : null,
                    ]
                ];
            });

            // Get reviews for this patient
            $reviews = Review::where('patient_id', $patient->id)
                ->pluck('cv_id')
                ->toArray();

        $caseRecords = $patient->caseRecords()
            ->orderByDesc('inquiry_at')
            ->orderByDesc('id')
            ->get()
            ->map(function (CaseRecord $case) {
                $inquiryAt = $case->inquiry_at;
                $inquiryDisplay = null;

                if ($inquiryAt) {
                    $inquiryDisplay = $inquiryAt->format('H:i') === '00:00'
                        ? $inquiryAt->format('d-m-Y')
                        : $inquiryAt->format('d-m-Y H:i');
                }

                return [
                    'id' => $case->id,
                    'inquiry_at' => $inquiryDisplay,
                    'branch' => $case->branch,
                    'status' => $case->status,
                    'name' => $case->name,
                    'care_type' => $case->care_type,
                ];
            })
            ->values()
            ->all();
        
        $patientFeedbacks = $patient->feedbackEntries()
            ->with('recorder:id,name')
            ->get()
            ->map(fn (PatientFeedback $feedback) => $feedback->toPresentation())
            ->values()
            ->all();

        $documentPhotos = $this->documentPhotos($patient);
        $patient->unsetRelation('carePlanPhotos');

        return Inertia::render('Admin/Patient/AdminSinglePatient', [
            'patient' => $patient,
            'documentPhotos' => $documentPhotos,
            'patientFeedbacks' => $patientFeedbacks,
            'caregivers' => $caregivers,
            'currentAssignment' => $currentAssignments,
            'history' => $history,
            'reviewedCaregiverIds' => $reviews,
            'caseRecords' => $caseRecords,
        ]);
    }

    private function documentPhotos(Patient $patient): array
    {
        $grouped = $patient->carePlanPhotos->groupBy('kind');

        return collect(CarePlanPhoto::KINDS)
            ->mapWithKeys(fn (string $kind) => [
                $kind => $grouped->get($kind, collect())
                    ->map(fn (CarePlanPhoto $photo) => $photo->toPresentation())
                    ->values()
                    ->all(),
            ])
            ->all();
    }

    private function presentFeedbackRow(Patient $patient): array
    {
        $feedbacks = [];

        foreach ($patient->feedbackEntries as $feedback) {
            if ($feedback->sheetKey() === null) {
                continue;
            }

            if (isset($feedbacks[$feedback->feedback_type][$feedback->follow_up])) {
                continue;
            }

            $feedbacks[$feedback->feedback_type][$feedback->follow_up] = [
                'id' => $feedback->id,
                'body' => $feedback->body,
                'staff_name' => $feedback->recorder->name ?? 'Unknown',
                'recorded_at' => $feedback->created_at?->format('d-m-Y'),
            ];
        }

        $name = trim($patient->first_name.' '.($patient->last_name ?? ''));

        return [
            'id' => $patient->id,
            'pt_id' => $patient->pt_id,
            'name' => $name !== '' ? $name : ($patient->pt_id ?: 'Unknown patient'),
            'type' => $patient->type,
            'service_area' => $patient->service_area,
            'feedbacks' => $feedbacks,
            ...$this->feedbackAssignmentSummary($patient),
        ];
    }

    /**
     * Caregiver, dates, level, duty, and duration for the feedback sheet.
     * An open assignment wins. Otherwise the last ended assignment is shown.
     * Start date is the first assignment. End date is shown only when nobody is on duty.
     *
     * @return array{on_duty: bool, caregiver_name: ?string, start_date: ?string, end_date: ?string, level: ?string, duty: ?string, duration: ?string}
     */
    private function feedbackAssignmentSummary(Patient $patient): array
    {
        $assignments = $patient->caregiverAssignments;

        $active = $assignments
            ->filter(fn (PatientCaregiverAssignment $assignment) => $assignment->end_date === null)
            ->sortBy('id')
            ->values();

        $lastAssigned = $assignments
            ->sortByDesc(function (PatientCaregiverAssignment $assignment) {
                $date = $assignment->end_date?->format('Y-m-d')
                    ?? $assignment->start_date?->format('Y-m-d')
                    ?? '';

                return $date.sprintf('%010d', $assignment->id);
            })
            ->first();

        $shown = $active->isNotEmpty()
            ? $active
            : collect([$lastAssigned])->filter();

        $firstStart = $assignments
            ->filter(fn (PatientCaregiverAssignment $assignment) => $assignment->start_date !== null)
            ->sortBy(fn (PatientCaregiverAssignment $assignment) => $assignment->start_date->format('Y-m-d'))
            ->first();

        $ended = $active->isEmpty() ? $shown->first() : null;

        return [
            'on_duty' => $active->isNotEmpty(),
            'caregiver_name' => $this->assignmentNames($shown),
            'start_date' => $firstStart?->start_date?->format('d-m-Y'),
            'end_date' => $ended?->end_date?->format('d-m-Y'),
            'level' => $this->assignmentValues($shown, 'level'),
            'duty' => $this->assignmentValues($shown, 'assignment_reason'),
            'duration' => $this->assignmentValues($shown, 'duration'),
        ];
    }

    private function assignmentNames($assignments): ?string
    {
        $names = $assignments
            ->map(fn (PatientCaregiverAssignment $assignment) => $assignment->cv?->full_name)
            ->filter(fn ($name) => is_string($name) && trim($name) !== '')
            ->implode(', ');

        return $names !== '' ? $names : null;
    }

    private function assignmentValues($assignments, string $field): ?string
    {
        $values = $assignments
            ->map(fn (PatientCaregiverAssignment $assignment) => $assignment->{$field})
            ->filter(fn ($value) => is_string($value) && trim($value) !== '')
            ->unique()
            ->implode(', ');

        return $values !== '' ? $values : null;
    }

    private function joinedAssignmentField($assignments, string $field): ?string
    {
        $values = $assignments
            ->map(function (PatientCaregiverAssignment $assignment) use ($field) {
                $value = $assignment->{$field};

                return is_string($value) ? trim($value) : '';
            })
            ->filter(fn (string $value) => $value !== '')
            ->implode(', ');

        return $values !== '' ? $values : null;
    }

    private function patientsWithCaregivers()
    {
        return Patient::with([
            'caregiverAssignments' => function ($assignmentQuery) {
                $assignmentQuery->with('cv:id,full_name')
                    ->orderByDesc('end_date')
                    ->orderByDesc('id');
            },
            'currentCaregiver.cv:id,full_name',
        ]);
    }

    private function presentPatient(Patient $patient): array
    {
        $activeAssignments = $patient->caregiverAssignments
            ->filter(fn ($assignment) => $assignment->end_date === null && $assignment->cv)
            ->values();

        $activeCaregivers = $activeAssignments
            ->map(fn ($assignment) => $assignment->cv->full_name)
            ->all();

        $latestEndedAssignment = $patient->caregiverAssignments
            ->first(fn ($assignment) => $assignment->end_date !== null);

        $latestAssignmentEndDate = $latestEndedAssignment?->end_date
            ? Carbon::parse($latestEndedAssignment->end_date)->format('d-m-Y')
            : null;

        return [
            ...$patient->toArray(),
            'current_caregiver_name' => $patient->currentCaregiver?->cv?->full_name,
            'active_caregivers' => $activeCaregivers,
            'assignment_duration' => $this->joinedAssignmentField($activeAssignments, 'duration'),
            'assignment_level' => $this->joinedAssignmentField($activeAssignments, 'level'),
            'assignment_duty' => $this->joinedAssignmentField($activeAssignments, 'assignment_reason'),
            'latest_assignment_end_date' => $latestAssignmentEndDate,
            'service_status_text' => $activeCaregivers
                ? 'Ongoing'
                : ($latestAssignmentEndDate ?? null),
        ];
    }

    public function adminSearchPatient(Request $request)
    {
        $search = strtolower((string) $request->input('search'));
        $searchResults = $this->patientsWithCaregivers()
            ->where(function ($query) use ($search) {
                $query->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%");
            })
            ->orderByDesc('id')
            ->get()
            ->map(fn (Patient $patient) => $this->presentPatient($patient))
            ->values();

        return Inertia::render('Admin/Patient/PatientSearchResult', [
            'searchTerm' => $search,
            'searchResults' => $searchResults,
        ]);
    }
}
