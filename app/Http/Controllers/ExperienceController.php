<?php

namespace App\Http\Controllers;

use App\Models\CV;
use App\Models\Experience;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    public function show()
    {
        $user = Auth::user();
        $experiences = $user->cv ? $user->cv->experiences : collect(); // Return an empty collection if no CV exists
    
        return Inertia::render('Experience/MyExperiences', [
            'experiences' => $experiences
        ]);
    }
    
    public function store(Request $request)
    {
        $user = Auth::user();
        $cv = $user->cv;
        if(is_null($cv))
        {
            return back()->with('error', 'CV not found. Please create CV first.');
        } else if ($cv) {
            $validatedData = $request->validate([
                'experience' => 'required|string',
                'detail' => 'nullable|string',
            ]);

            $validatedData['cv_id'] = $cv->id;

            Experience::create($validatedData);
            return back()->with('success', 'Experience is recorded!');
        } else {
            return back()->with('error', 'Something went wrong!');
        } 
    }
    
    public function adminStoreExperience(Request $request, $id)
    {
        $cv = CV::findOrfail($id);

        if(is_null($cv))
        {
            return back()->with('error', 'CV not found. Please create CV first.');
        } else if ($cv) {
            $validatedData = $request->validate([
                'experience' => 'required|string',
                'detail' => 'nullable|string',
            ]);

            $validatedData['cv_id'] = $id;

            Experience::create($validatedData);
            return back()->with('success', 'Experience is recorded!');
        } else {
            return back()->with('error', 'Something went wrong!');
        }
    }

    // Reorder experience by admin
    public function reorder(Request $request, $cvId)
    {
        $validated = $request->validate([
            'experiences' => 'required|array',
            'experiences.*.id' => 'required|exists:experiences,id',
            'experiences.*.order' => 'required|integer',
        ]);
    
        foreach ($validated['experiences'] as $exp) {
            \App\Models\Experience::where('id', $exp['id'])
                ->where('cv_id', $cvId) // Ensure experience belongs to the correct CV
                ->update(['order' => $exp['order']]);
        }
    
        return back()->with(['success' => 'Order updated successfully.']);
    }
    

    public function destroy ($id) {
        try {
            $deleteExperience = Experience::findOrFail($id);
            $deleteExperience->delete();
    
            return back()->with('success', 'Experience deleted');
        } catch (Exception $e) {
            return back()->with('error', 'Something went wrong!');
        }
    }
}
