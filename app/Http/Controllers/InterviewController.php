<?php

namespace App\Http\Controllers;

use App\Models\CarePlan;
use App\Models\CV;
use App\Models\Interview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class InterviewController extends Controller
{
    public function showCV ($slug)
    {
        $cv = CV::with('certificates')->where('slug', $slug)->firstOrFail();
        $user_id = Auth::user()->id;
        $existingCarePlan = CarePlan::where('user_id', $user_id)->first();
        return Inertia::render('Interview/CreateInterview', [
            'cv' => $cv,
            'carePlan' => $existingCarePlan,
        ]);
    }

    public function store(Request $request)
    {
        try{
            $user_id = Auth::user()->id;
             // Check if an interview record already exists with the same user_id, care_plan_id, and cv_id
            $existingInterview = Interview::where('user_id', $user_id)
                ->where('care_plan_id', $request['care_plan_id'])
                ->where('cv_id', $request['cv_id'])
                ->first();

            if ($existingInterview) {
                return redirect(route('interview.book.success'))->with(['success' => 'Interview already booked.']);
            }

            // Validate the request data
            $validatedData = $request->validate([
                'cv_id' => 'required|exists:c_v_s,id',
                'care_plan_id' => 'required|exists:care_plans,id',
                'date' => 'required|date',
                'time' => 'required|date_format:H:i',
                'alt_date' => 'nullable|date',
                'alt_time' => 'nullable|date_format:H:i',
                'mode' => 'required|string',
                'location' => 'nullable|string',
                'online' => 'nullable|string',
            ]);

            
    
            // Create a new interview record
            $interview = Interview::create([
                'user_id' => $user_id,
                'cv_id' => $validatedData['cv_id'],
                'care_plan_id' => $validatedData['care_plan_id'],
                'date' => $validatedData['date'] ?? null,
                'time' => $validatedData['time'] ?? null,
                'alt_date' => $validatedData['alt_date'] ?? null,
                'alt_time' => $validatedData['alt_time'] ?? null,
                'mode' => $validatedData['mode'] ?? null,
                'location' => $validatedData['location'] ?? null,
                'online' => $validatedData['online'] ?? null,
                'status' => 'pending',  // Default status
                'is_approved' => false,  // Default approval status
            ]);
    
            // Return a response on success
            return redirect()->route('interview.book.success')->with('success', 'Interview created successfully.');
        } catch (\Exception $e) {
            // Log the error for debugging
            Log::error('Error creating interview: ' . $e->getMessage());

            return back()->with('error',  $e->getMessage());
        }
    }

    public function bookSuccess()
    {
        return Inertia::render('Interview/SuccessBooking');
    }
}
