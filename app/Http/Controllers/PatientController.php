<?php

namespace App\Http\Controllers;

use App\Models\CV;
use App\Models\Patient;
use App\Models\PatientCaregiverAssignment;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PatientController extends Controller
{
    // See by admin
    public function index()
    {
        $patients = Patient::with(['currentCaregiver.cv:id,full_name'])
            ->orderBy('id', 'desc')
            ->paginate(15);
        
        // Transform the data to include caregiver name
        $patients->getCollection()->transform(function ($patient) {
            return [
                ...$patient->toArray(),
                'current_caregiver_name' => $patient->currentCaregiver?->cv?->full_name ?? 'Not Assigned',
            ];
        });
        return Inertia::render('Admin/Patient/AdminPatients', [
            'patients' => $patients,
            'count' => Patient::count(),
        ]);
    }
    
    // Create patient by admin
    public function createPatient()
    {
        return Inertia::render('Admin/Patient/CreatePatient');
    }

    // Store patient by admin
    public function store(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'type' => 'required|in:Elder,Baby,Newborn',
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
            'notes' => 'nullable|string',
        ]);

        $name = Auth::user()->name;
        $validated['created_by'] = $name;

        // Create the patient record
        Patient::create($validated);

        // Redirect to the index page with a success message
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
            'type' => 'required|in:Elder,Baby,Newborn',
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
            'notes' => 'nullable|string',
        ]);
        $patient = Patient::findOrFail($id);
        $patient->update($validated);   
        // Redirect to the index page with a success message
        return redirect()->route('admin.patients')->with('success', 'Patient updated successfully!');
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
        
        // Get current active assignment
        $currentAssignment = PatientCaregiverAssignment::with('cv')
            ->where('patient_id', $id)
            ->whereNull('end_date')
            ->first();
            
        if ($currentAssignment && $currentAssignment->cv) {
            // Transform the caregiver data
            $currentAssignment = [
                'id' => $currentAssignment->id,
                'patient_id' => $currentAssignment->patient_id,
                'cv_id' => $currentAssignment->cv_id,
                'start_date' => $currentAssignment->start_date,
                'end_date' => $currentAssignment->end_date,
                'assignment_reason' => $currentAssignment->assignment_reason,
                'caregiver' => [
                    'id' => $currentAssignment->cv->id,
                    'slug' => $currentAssignment->cv->slug,
                    'full_name' => $currentAssignment->cv->full_name,
                    'geneva_id' => $currentAssignment->cv->geneva_id,
                    'profile_photo' => $currentAssignment->cv->profile_photo 
                        ? asset('storage/' . $currentAssignment->cv->profile_photo) 
                        : null,
                ]
            ];
        }

        // Get assignment history
        $history = $patient->caregiverAssignments()
            ->with('cv')
            ->whereNotNull('end_date')
            ->orderBy('end_date', 'desc')
            ->get()
            ->map(function ($assignment) {
                return [
                    'id' => $assignment->id,
                    'start_date' => $assignment->start_date,
                    'end_date' => $assignment->end_date,
                    'assignment_reason' => $assignment->assignment_reason,
                    'end_reason' => $assignment->end_reason,
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
        
        return Inertia::render('Admin/Patient/AdminSinglePatient', [
            'patient' => $patient,
            'caregivers' => $caregivers,
            'currentAssignment' => $currentAssignment,
            'history' => $history,
            'reviewedCaregiverIds' => $reviews,
        ]);
    }

    public function adminSearchPatient(Request $request)
    {
        $search = strtolower($request->input('search'));
        // Perform the search
        $searchResults = Patient::where('first_name', 'like', "%{$search}%")
            ->orWhere('last_name', 'like', "%{$search}%")
            ->get();

        return Inertia::render('Admin/Patient/PatientSearchResult', [
            'searchTerm' => $search,
            'searchResults' => $searchResults,
        ]);
    }
}
