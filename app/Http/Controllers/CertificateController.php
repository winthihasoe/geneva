<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CertificateController extends Controller
{
    public function show()
    {
        $user = Auth::user();
        $certificates = $user->cv ? $user->cv->certificates : collect(); // Return an empty collection if no CV exists
    
        return Inertia::render('Certificate/MyCertificates', [
            'certificates' => $certificates
        ]);
    }
    
    public function store(Request $request)
    {
        $cv = Auth::user()->cv;
        
        // Validate the form data
        $validatedData = $request->validate([
            'qualification_type' => 'required|string|max:255',
            'training_center_name' => 'required|string|max:255',
            'course' => 'nullable|string|max:255',
            'start_date' => 'required|date|before_or_equal:today',
            'duration' => 'required|integer|min:1|max:50',
            'certificate_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10048', // Image validation
        ]);
        $validatedData['cv_id'] = $cv->id;
        // Handle the certificate image upload
        if ($request->hasFile('certificateImage')) {
            $imagePath = $request->file('certificateImage')->store('photos/certificates', 'public');
            $validatedData['certificate_photo'] = $imagePath;
        }

        // Save the certificate data
        Certificate::create($validatedData);

        // Redirect back with a success message
        return redirect()->back()->with('success', 'Certificate saved successfully!');
    }

    // Update certificate by caregiver or admin
    public function update(Request $request, $certId)
    {
        // Find the certificate by ID
        $certificate = Certificate::findOrFail($certId);

        // Validate the incoming request data
        $validatedData = $request->validate([
            'qualification_type' => 'required|string|max:255',
            'training_center_name' => 'required|string|max:255',
            'course' => 'nullable|string|max:255',
            'start_date' => 'required|date|before_or_equal:today',
            'duration' => 'required|integer|min:1|max:50',
        ]);

        // Update the certificate with the validated data
        $certificate->update($validatedData);

        // Redirect back with a success message
        return redirect()->back()->with('success', 'Certificate updated successfully!');
    }


    public function delete($certId)
    {
        $deleteCert = Certificate::findOrFail($certId);
        $deleteCert->delete();
        $photoPath = 'public/' . $deleteCert->certificate_photo;
                
        if (Storage::exists($photoPath)) {
            // Log the deletion attempt
            Log::info("Deleting old photo: " . $photoPath);
    
            // Attempt deletion and log if successful or not
            $deleted = Storage::delete($photoPath);
    
            if ($deleted) {
                Log::info("Old photo deleted successfully.");
            } else {
                Log::warning("Failed to delete old photo.");
            }
        } else {
            Log::warning("Old photo does not exist at path: " . $photoPath);
        }

        return back()->with('success', "Certificate deleted!");
    }
}
