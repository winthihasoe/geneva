<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PatientController extends Controller
{
    // See by admin
    public function index()
    {
        return Inertia::render('Admin/Patient/AdminPatients', [
            'patients' => Patient::orderBy('id', 'desc')->paginate(15),
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

    // Show single patient to admin 
    public function adminSinglePatient($id)
    {
        $patient = Patient::with('carePlanPhotos')->findOrFail($id);
        return Inertia::render('Admin/Patient/AdminSinglePatient', compact('patient'));
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
