<?php

namespace App\Http\Controllers;

use App\Models\CarePlan;
use App\Models\CV;
use App\Models\Interview;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class InterviewController extends Controller
{
    public function showCV ($slug)
    {
        $cv = CV::with('certificates', 'experiences')->where('slug', $slug)->firstOrFail();
        $user_id = Auth::user()->id;
 
        $existingCarePlan = CarePlan::where('user_id', $user_id)->latest()->first();

       // Map the CarePlan's numeric duration to the string format in the Package duration
        $durationMapping = [
            3 => '3-month',
            6 => '6-month',
            1 => '1-year',
        ];

        // Get the corresponding string duration
        $mappedDuration = $durationMapping[$existingCarePlan->duration] ?? null;

        $service = Service::where('name', $existingCarePlan->service_type)
        ->with(['packages.durations.salaries', 'packages.durations.serviceFees'])
        ->firstOrFail();
       

        // Convert packages to a collection to use firstWhere
        $packages = collect($service->packages);
        
        // Access package type from the schedule array
        $packageType = $existingCarePlan->schedule['package'] ?? null;

        // Initialize variables
        $selectedSalary = null;
        $serviceFees = null;

        // Ensure packageType is not null before accessing
        if ($packageType) {
            // Get the specific package based on CarePlan's schedule package type
            $selectedPackage = $packages->firstWhere('type', $packageType);
            
            // Get the specific duration based on the mapped duration string
            $selectedDuration = $selectedPackage
                ? collect($selectedPackage->durations)->firstWhere('duration', $mappedDuration)
                : null;
             
            // Extract the relevant salaries and service fees based on the selected package and duration
            $salaries = $selectedDuration ? collect($selectedDuration->salaries) : null;
            $serviceFees = $selectedDuration ? collect($selectedDuration->serviceFees) : null;

            if ($salaries) {
                if ($existingCarePlan->service_type === 'Elder Care + Maid Service') {
                    // For 'Elder Care + Maid Service', select the first available salary
                    $selectedSalary = $salaries->first();
                } else if ($existingCarePlan->service_type === 'Nanny Care + Maid Service') {
                    // For 'Elder Care + Maid Service', select the first available salary
                    $selectedSalary = $salaries->first();
                } else if ($existingCarePlan->service_type === 'Elder Care') {
                    // For other care types, select salary based on caregiver level
                    $selectedSalary = $cv->level === 'Advanced Caregiver'
                        ? $salaries->first(function ($salary) {
                            return stripos($salary->role, 'Adv Caregiver') !== false;
                        })
                        : $salaries->first(function ($salary) {
                            return stripos($salary->role, 'Caregiver') !== false;
                        });
                } else if ($existingCarePlan->service_type === 'Newborn Care') {
                    // For other care types, select salary based on caregiver level
                    $selectedSalary = $cv->level === 'Super Newborn Nanny'
                        ? $salaries->first(function ($salary) {
                            return stripos($salary->role, 'Super Nanny') !== false;
                        })
                        : $salaries->first(function ($salary) {
                            return stripos($salary->role, 'Nanny') !== false;
                        });
                } else if ($existingCarePlan->service_type === 'Nanny Service') {
                    // For other care types, select salary based on caregiver level
                    $selectedSalary = $cv->level === 'Super Nanny'
                        ? $salaries->first(function ($salary) {
                            return stripos($salary->role, 'Super Nanny') !== false;
                        })
                        : $salaries->first(function ($salary) {
                            return stripos($salary->role, 'Nanny') !== false;
                        });
                }
            }
            
        } else {
            $selectedPackage = null;
            $selectedDuration = null;
            $salaries = null;
            $serviceFees = null;
        }
        return Inertia::render('Interview/CreateInterview', [
            'cv' => $cv,
            'carePlan' => $existingCarePlan,
            'selectedSalary' => $selectedSalary,
            'serviceFees' => $serviceFees,
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
