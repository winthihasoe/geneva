<?php

namespace App\Http\Controllers;

use App\Models\CarePlan;
use App\Models\CV;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Mailjet\LaravelMailjet\Facades\Mailjet;
use Mailjet\Resources;

class CarePlanController extends Controller
{
    public function startCare ()
    {
        return Inertia::render('CustomizedCare/CustomizedCare');
    }
    
    public function startBabyCare ()
    {
        // Check if the user has an existing care plan
        $user_id = Auth::user()->id;
        $existingCarePlan = CarePlan::where('user_id', $user_id)->first();

        return Inertia::render('CarePlan/BabyCare/BabyCare', [
            'carePlan' => $existingCarePlan ?? null,
        ]);
    }
   
    public function startMaternalCare ()
    {
        // Check if the user has an existing care plan
        $user_id = Auth::user()->id;
        $existingCarePlan = CarePlan::where('user_id', $user_id)->first();

        return Inertia::render('CarePlan/MaternalCare/MaternalCare', [
            'carePlan' => $existingCarePlan ?? null,
        ]);
    }
 
    public function startElderCare ()
    {
        // Check if the user has an existing care plan
        $user_id = Auth::user()->id;
        $existingCarePlan = CarePlan::where('user_id', $user_id)->first();

        return Inertia::render('CarePlan/ElderCare/ElderCare', [
            'carePlan' => $existingCarePlan ?? null,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $user = Auth::user();
            $user_id = $user->id;

            // Validate the incoming request data
            $validatedData = $request->validate([
                'care_type' => 'required|in:Baby,Elder,Maternal',
                'start_date' => 'required|date',
                'duration' => 'required|integer',
                'preferred_language' => 'nullable|string',
                'service_type' => 'nullable|string',
                'care_recipient_info' => 'nullable|array',
                'contact_info' => 'nullable|array',
                'preferences' => 'nullable|array',
                'services' => 'nullable|array',
                'medical_conditions' => 'nullable|array',
                'other_medical_conditions' => 'nullable|string',
                'mobilities' => 'nullable|string',
                'memory' => 'nullable|string',
                'alertness' => 'nullable|string',
                'schedule' => 'nullable|array',
                'additional_notes' => 'nullable|string',
                'current_step' => 'required|integer',
            ]);

            // Check if the user already has a care plan
            $existingCarePlan = CarePlan::where('user_id', $user_id)
                ->where('care_type', $validatedData['care_type'])
                ->first();

            // Prepare data for creating or updating the care plan
            $data = [
                'user_id' => $user_id,
                'care_type' => $validatedData['care_type'],
                'start_date' => $validatedData['start_date'],
                'duration' => $validatedData['duration'],
                'preferred_language' => $validatedData['preferred_language'] ?? null,
                'service_type' => $validatedData['service_type'] ?? null,
                'care_recipient_info' => $validatedData['care_recipient_info'] ?? [],
                'contact_info' => $validatedData['contact_info'] ?? [],
                'preferences' => $validatedData['preferences'] ?? [],
                'services' => $validatedData['services'] ?? [],
                'medical_conditions' => $validatedData['medical_conditions'] ?? [],
                'other_medical_conditions' => $validatedData['other_medical_conditions'] ?? null,
                'mobilities' => $validatedData['mobilities'] ?? null,
                'memory' => $validatedData['memory'] ?? null,
                'alertness' => $validatedData['alertness'] ?? null,
                'schedule' => $validatedData['schedule'] ?? [],
                'additional_notes' => $validatedData['additional_notes'] ?? null,
                'current_step' => $validatedData['current_step'],
            ];

            if ($existingCarePlan) {
                // Update the existing care plan
                $existingCarePlan->update($data);
                $carePlan = $existingCarePlan;
            } else {
                // Create a new care plan if none exists
                $carePlan = CarePlan::create($data);
            }

            // Filter CVs for matching and similar results
            $baseQuery = CV::where('is_approved', true)
                ->select('id', 'slug', 'nickname', 'date_of_birth', 'nanny_experience_years', 'newborn_experience_years', 'elder_experience_years', 'religion', 'nationality', 'language', 'profile_photo', 'ha_id', 'weight', 'height', 'nanny_care_level', 'level', 'nursing_skills_for_child', 'nursing_skills_for_elder');

            // Get all approved CVs for filtering
            $allCVs = $baseQuery->get();
            $matchedCVs = collect();
            $similarCVs = collect();

            foreach ($allCVs as $cv) {
                $matchCount = 0;
                $matches = [];

                // 1. Age range matching
                if (!empty($carePlan->preferences['minimum_age']) && !empty($carePlan->preferences['maximum_age'])) {
                    $cvAge = \Carbon\Carbon::parse($cv->date_of_birth)->age;
                    $minAge = $carePlan->preferences['minimum_age'];
                    $maxAge = $carePlan->preferences['maximum_age'];
                    
                    if ($cvAge >= $minAge && $cvAge <= $maxAge) {
                        $matchCount++;
                        $matches[] = 'age';
                    }
                }

                // 2. Nationality matching
                if (!empty($carePlan->preferences['nationality']) && 
                    is_array($carePlan->preferences['nationality']) && 
                    !in_array('Doesn\'t matter', $carePlan->preferences['nationality'])) {
                    
                    if (in_array($cv->nationality, $carePlan->preferences['nationality'])) {
                        $matchCount++;
                        $matches[] = 'nationality';
                    }
                }

                // 3. Religion matching
                if (!empty($carePlan->preferences['religion']) && 
                    is_array($carePlan->preferences['religion']) && 
                    !in_array('Doesn\'t matter', $carePlan->preferences['religion'])) {
                    
                    if (in_array($cv->religion, $carePlan->preferences['religion'])) {
                        $matchCount++;
                        $matches[] = 'religion';
                    }
                }

                // 4. Experience matching
                if (!empty($carePlan->preferences['experience']) && is_array($carePlan->preferences['experience'])) {
                    $experienceMatch = false;
                    
                    if ($carePlan->care_type === 'Baby') {
                        // Check both nanny and newborn experience for baby care
                        if (in_array($cv->nanny_experience_years, $carePlan->preferences['experience']) ||
                            in_array($cv->newborn_experience_years, $carePlan->preferences['experience'])) {
                            $experienceMatch = true;
                        }
                    } elseif ($carePlan->care_type === 'Elder') {
                        if (in_array($cv->elder_experience_years, $carePlan->preferences['experience'])) {
                            $experienceMatch = true;
                        }
                    }
                    
                    if ($experienceMatch) {
                        $matchCount++;
                        $matches[] = 'experience';
                    }
                }

                // Categorize CVs based on match count
                if ($matchCount >= 4) {
                    // All 4 criteria match - MATCHED CV
                    $matchedCVs->push($cv);
                } elseif ($matchCount >= 1) {
                    // At least 1 criteria matches - SIMILAR CV
                    $similarCVs->push($cv);
                }
            }

            // Send email notification (only on final step)
            if ($validatedData['current_step'] == 6) {
                $this->sendCarePlanEmail($carePlan, $user, $existingCarePlan ? 'updated' : 'created');
            }
            

            // Remove duplicates (shouldn't happen with this logic, but just in case)
            $matchedCVs = $matchedCVs->unique('id');
            $similarCVs = $similarCVs->unique('id');

            // Remove matched CVs from similar CVs
            $matchedIds = $matchedCVs->pluck('id')->toArray();
            $similarCVs = $similarCVs->whereNotIn('id', $matchedIds);

            // Redirect to CV display page with data
            return redirect()->route('care.cvs.show', ['uuid' => $carePlan->uuid])
                            ->with('matchedCVs', $matchedCVs)
                            ->with('similarCVs', $similarCVs)
                            ->with('message', $existingCarePlan ? 'Care plan updated successfully!' : 'Care plan created successfully!');

        } catch (\Exception $e) {
            // Log and return error response
            Log::error('Error creating/updating care plan: ' . $e->getMessage());

            return back()->withErrors([
                'message' => 'Failed to create or update care plan: ' . $e->getMessage()
            ]);
        }
    }
    public function storeNewOld(Request $request)
    {
        try {
            $user = Auth::user();
            $user_id = $user->id;
    
            // Validate the incoming request data
            $validatedData = $request->validate([
                'care_type' => 'required|in:Baby,Elder,Maternal',
                'start_date' => 'required|date',
                'duration' => 'required|integer',
                'preferred_language' => 'nullable|string',
                'service_type' => 'nullable|string',
                'care_recipient_info' => 'nullable|array',
                'contact_info' => 'nullable|array',
                'preferences' => 'nullable|array',
                'services' => 'nullable|array',
                'medical_conditions' => 'nullable|array',
                'other_medical_conditions' => 'nullable|string',
                'mobilities' => 'nullable|string',
                'memory' => 'nullable|string',
                'alertness' => 'nullable|string',
                'schedule' => 'nullable|array',
                'additional_notes' => 'nullable|string',
                'current_step' => 'required|integer',
            ]);

            // Check if the user already has a care plan
            $existingCarePlan = CarePlan::where('user_id', $user_id)
                ->where('care_type', $validatedData['care_type'])
                ->first();
    
            // Prepare data for creating or updating the care plan
            $data = [
                'user_id' => $user_id,
                'care_type' => $validatedData['care_type'],
                'start_date' => $validatedData['start_date'],
                'duration' => $validatedData['duration'],
                'preferred_language' => $validatedData['preferred_language'] ?? null,
                'service_type' => $validatedData['service_type'] ?? null,
                'care_recipient_info' => $validatedData['care_recipient_info'] ?? [],
                'contact_info' => $validatedData['contact_info'] ?? [],
                'preferences' => $validatedData['preferences'] ?? [],
                'services' => $validatedData['services'] ?? [],
                'medical_conditions' => $validatedData['medical_conditions'] ?? [],
                'other_medical_conditions' => $validatedData['other_medical_conditions'] ?? null,
                'mobilities' => $validatedData['mobilities'] ?? null,
                'memory' => $validatedData['memory'] ?? null,
                'alertness' => $validatedData['alertness'] ?? null,
                'schedule' => $validatedData['schedule'] ?? [],
                'additional_notes' => $validatedData['additional_notes'] ?? null,
                'current_step' => $validatedData['current_step'],
            ];
    
            if ($existingCarePlan) {
                // Update the existing care plan
                $existingCarePlan->update($data);
                $carePlan = $existingCarePlan;
            } else {
                // Create a new care plan if none exists
                $carePlan = CarePlan::create($data);
            }

            // Send email notification (only on final step)
            // if ($validatedData['current_step'] == 6) {
            //     $this->sendCarePlanEmail($carePlan, $user, $existingCarePlan ? 'updated' : 'created');
            // }
            
        
            // Filter CVs for matching and similar results
            $baseQuery = CV::where('is_approved', true)
             ->select('id', 'slug', 'nickname', 'date_of_birth', 'nanny_experience_years', 'newborn_experience_years', 'elder_experience_years', 'religion', 'nationality', 'language', 'profile_photo', 'ha_id', 'weight', 'height', 'nanny_care_level', 'level', 'nursing_skills_for_child', 'nursing_skills_for_elder');

            // MATCHED CVs - strict criteria (3+ matches)
            $matchedQuery = clone $baseQuery;
            $matchedCriteria = 0;

            // Service type matching
            if ($carePlan->care_type === 'Baby') {
                if ($carePlan->service_type === 'Nanny Care Service only') {
                    $matchedQuery->whereJsonContains('services', 'Nanny service');
                    $matchedCriteria++;
                } elseif ($carePlan->service_type === 'Nanny Care Service + Maid Service') {
                    $matchedQuery->whereJsonContains('services', 'Nanny + Maid');
                    $matchedCriteria++;
                }
            }

            // Age range matching - calculate age from date_of_birth
            if (!empty($carePlan->preferences['minimum_age']) && !empty($carePlan->preferences['maximum_age'])) {
                $minAge = $carePlan->preferences['minimum_age'];
                $maxAge = $carePlan->preferences['maximum_age'];
                
                // Calculate the date range for the age requirements
                $maxBirthDate = now()->subYears($minAge)->format('Y-m-d'); // Oldest allowed birth date
                $minBirthDate = now()->subYears($maxAge + 1)->addDay()->format('Y-m-d'); // Youngest allowed birth date
                
                $matchedQuery->whereBetween('date_of_birth', [$minBirthDate, $maxBirthDate]);
                $matchedCriteria++;
            }

            // Experience matching
            if (!empty($carePlan->preferences['experience'])) {
                if ($carePlan->care_type === 'Baby') {
                    // For baby care, check both nanny and newborn experience
                    $matchedQuery->where(function($q) use ($carePlan) {
                        $q->whereIn('nanny_experience_years', $carePlan->preferences['experience'])
                        ->orWhereIn('newborn_experience_years', $carePlan->preferences['experience']);
                    });
                } elseif ($carePlan->care_type === 'Elder') {
                    $matchedQuery->whereIn('elder_experience_years', $carePlan->preferences['experience']);
                }
                $matchedCriteria++;
            }

            // Religion matching
            if (!empty($carePlan->preferences['religion']) && !in_array('Doesn\'t matter', $carePlan->preferences['religion'])) {
                $matchedQuery->whereIn('religion', $carePlan->preferences['religion']);
                $matchedCriteria++;
            }

            // Nationality matching
            if (!empty($carePlan->preferences['nationality']) && !in_array('Doesn\'t matter', $carePlan->preferences['nationality'])) {
                $matchedQuery->whereIn('nationality', $carePlan->preferences['nationality']);
                $matchedCriteria++;
            }

            // Get matched CVs only if we have 3+ criteria
            $matchedCVs = $matchedCriteria >= 3 ? $matchedQuery->get() : collect();

            // SIMILAR CVs - loose criteria (1-2 matches)
            $similarCVs = collect();

            // Service type only
            if ($carePlan->care_type === 'Baby') {
                $serviceQuery = clone $baseQuery;
                if ($carePlan->service_type === 'Nanny Care Service only') {
                    $serviceQuery->whereJsonContains('services', 'Nanny service');
                } elseif ($carePlan->service_type === 'Nanny Care Service + Maid Service') {
                    $serviceQuery->whereJsonContains('services', 'Nanny + Maid');
                }
                $similarCVs = $similarCVs->merge($serviceQuery->get());
            }

            // Age range only for similar CVs
            if (!empty($carePlan->preferences['minimum_age']) && !empty($carePlan->preferences['maximum_age'])) {
                $ageQuery = clone $baseQuery;
                
                $minAge = $carePlan->preferences['minimum_age'];
                $maxAge = $carePlan->preferences['maximum_age'];
                
                // Calculate the date range for the age requirements
                $maxBirthDate = now()->subYears($minAge)->format('Y-m-d');
                $minBirthDate = now()->subYears($maxAge + 1)->addDay()->format('Y-m-d');
                
                $ageQuery->whereBetween('date_of_birth', [$minBirthDate, $maxBirthDate]);
                $similarCVs = $similarCVs->merge($ageQuery->get());
            }

            // Experience only
            if (!empty($carePlan->preferences['experience'])) {
                $expQuery = clone $baseQuery;
                
                if ($carePlan->care_type === 'Baby') {
                    $expQuery->where(function($q) use ($carePlan) {
                        $q->whereIn('nanny_experience_years', $carePlan->preferences['experience'])
                        ->orWhereIn('newborn_experience_years', $carePlan->preferences['experience']);
                    });
                } elseif ($carePlan->care_type === 'Elder') {
                    $expQuery->whereIn('elder_experience_years', $carePlan->preferences['experience']);
                }
                
                $similarCVs = $similarCVs->merge($expQuery->get());
            }

            // Nationality only
            if (!empty($carePlan->preferences['nationality']) && !in_array('Doesn\'t matter', $carePlan->preferences['nationality'])) {
                $natQuery = clone $baseQuery;
                $natQuery->whereIn('nationality', $carePlan->preferences['nationality']);
                $similarCVs = $similarCVs->merge($natQuery->get());
            }

            // Remove duplicates and exclude matched CVs from similar
            $similarCVs = $similarCVs->unique('id');
            $matchedIds = $matchedCVs->pluck('id')->toArray();
            $similarCVs = $similarCVs->whereNotIn('id', $matchedIds);

            // Redirect to CV display page with data
            return redirect()->route('care.cvs.show', ['uuid' => $carePlan->uuid])
                            ->with('matchedCVs', $matchedCVs)
                            ->with('similarCVs', $similarCVs)
                            ->with('message', $existingCarePlan ? 'Care plan updated successfully!' : 'Care plan created successfully!');

        } catch (\Exception $e) {
            // Log and return error response
            Log::error('Error creating/updating care plan: ' . $e->getMessage());
    
            return back()->withErrors([
                'message' => 'Failed to create or update care plan: ' . $e->getMessage()
            ]);
        }
    }

    public function showCVs($uuid)
    {
        $carePlan = CarePlan::where('uuid', $uuid)->firstOrFail();
        
        // Get CV data from session first
        $matchedCVs = session('matchedCVs', collect());
        $similarCVs = session('similarCVs', collect());
        $message = session('message');

        // If session data is empty (page reload), re-filter CVs
        if ($matchedCVs->isEmpty() && $similarCVs->isEmpty()) {
            $filterResults = $this->filterCVsForCarePlan($carePlan);
            $matchedCVs = $filterResults['matchedCVs'];
            $similarCVs = $filterResults['similarCVs'];
            $message = 'CVs filtered successfully.';
        }

        return Inertia::render('CarePlan/MatchedCVs', [
            'carePlan' => $carePlan,
            'matchedCVs' => $matchedCVs,
            'similarCVs' => $similarCVs,
            'totalMatched' => $matchedCVs->count(),
            'totalSimilar' => $similarCVs->count(),
            'message' => $message,
        ]);
    }

    // Extract the filtering logic into a separate method
    private function filterCVsForCarePlan($carePlan)
    {
        // Get all approved CVs
        $baseQuery = CV::where('is_approved', true)
                    ->select('id', 'slug', 'nickname', 'date_of_birth', 'nanny_experience_years', 'newborn_experience_years', 'elder_experience_years', 'religion', 'nationality', 'language', 'profile_photo', 'ha_id', 'weight', 'height', 'nanny_care_level', 'level', 'nursing_skills_for_child', 'nursing_skills_for_elder');

        $allCVs = $baseQuery->get();
        $matchedCVs = collect();
        $similarCVs = collect();

        foreach ($allCVs as $cv) {
            $matchCount = 0;
            $matches = [];

            // 1. Age range matching
            if (!empty($carePlan->preferences['minimum_age']) && !empty($carePlan->preferences['maximum_age'])) {
                $cvAge = \Carbon\Carbon::parse($cv->date_of_birth)->age;
                $minAge = $carePlan->preferences['minimum_age'];
                $maxAge = $carePlan->preferences['maximum_age'];
                
                if ($cvAge >= $minAge && $cvAge <= $maxAge) {
                    $matchCount++;
                    $matches[] = 'age';
                }
            }

            // 2. Nationality matching
            if (!empty($carePlan->preferences['nationality']) && 
                is_array($carePlan->preferences['nationality']) && 
                !in_array('Doesn\'t matter', $carePlan->preferences['nationality'])) {
                
                if (in_array($cv->nationality, $carePlan->preferences['nationality'])) {
                    $matchCount++;
                    $matches[] = 'nationality';
                }
            }

            // 3. Religion matching
            if (!empty($carePlan->preferences['religion']) && 
                is_array($carePlan->preferences['religion']) && 
                !in_array('Doesn\'t matter', $carePlan->preferences['religion'])) {
                
                if (in_array($cv->religion, $carePlan->preferences['religion'])) {
                    $matchCount++;
                    $matches[] = 'religion';
                }
            }

            // 4. Experience matching
            if (!empty($carePlan->preferences['experience']) && is_array($carePlan->preferences['experience'])) {
                $experienceMatch = false;
                
                if ($carePlan->care_type === 'Baby') {
                    // Check both nanny and newborn experience for baby care
                    if (in_array($cv->nanny_experience_years, $carePlan->preferences['experience']) ||
                        in_array($cv->newborn_experience_years, $carePlan->preferences['experience'])) {
                        $experienceMatch = true;
                    }
                } elseif ($carePlan->care_type === 'Elder') {
                    if (in_array($cv->elder_experience_years, $carePlan->preferences['experience'])) {
                        $experienceMatch = true;
                    }
                }
                
                if ($experienceMatch) {
                    $matchCount++;
                    $matches[] = 'experience';
                }
            }

            // Categorize CVs based on match count
            if ($matchCount >= 4) {
                // All 4 criteria match - MATCHED CV
                $matchedCVs->push($cv);
            } elseif ($matchCount >= 1) {
                // At least 1 criteria matches - SIMILAR CV
                $similarCVs->push($cv);
            }
        }

        // Remove duplicates and exclude matched CVs from similar
        $matchedCVs = $matchedCVs->unique('id');
        $similarCVs = $similarCVs->unique('id');
        $matchedIds = $matchedCVs->pluck('id')->toArray();
        $similarCVs = $similarCVs->whereNotIn('id', $matchedIds);

        return [
            'matchedCVs' => $matchedCVs,
            'similarCVs' => $similarCVs
        ];
    }


    // Helper method to send email notifications
    private function sendCarePlanEmail($carePlan, $user, $action)
    {
        try {
            // Format the duration
            $formattedDuration = $carePlan->duration === 1 ? '1-year' : "{$carePlan->duration}-month";
            
            $mj = Mailjet::getClient();
            
            if ($carePlan->care_type == 'Baby') {
                $body = [
                    'FromEmail' => "service@heartyaid.com",
                    'FromName' => "Hearty Aid",
                    'Subject' => "Your customized care plan is {$action}.",
                    'MJ-TemplateID' => 6461565,
                    'MJ-TemplateLanguage' => true,
                    'Vars' => [
                        // Baby info
                        "baby_name" => $carePlan->care_recipient_info['name'] ?? '',
                        "gender" => $carePlan->care_recipient_info['gender'] ?? '',
                        "home_address" => $carePlan->care_recipient_info['home_address'] ?? '',
                        
                        // Guardian info
                        "parent_name" => $carePlan->contact_info['name'] ?? '',
                        "relation" => $carePlan->contact_info['relationship'] ?? '',
                        "phone" => $carePlan->contact_info['phone_number'] ?? '',
                        
                        // Care schedule
                        "start_date" => $carePlan->start_date ?? '',
                        "package" => $carePlan->schedule['package'] ?? '',
                        "duty_time" => $carePlan->schedule['duty'] ?? '',
                        "duration" => $formattedDuration ?? '',
                        "services" => isset($carePlan->services) && is_array($carePlan->services) 
                                    ? implode(', ', $carePlan->services) 
                                    : '',
                        
                        // Nanny preference
                        "nanny_age" => $carePlan->preferences['age'] ?? '',
                        "experience" => isset($carePlan->preferences['experience']) && is_array($carePlan->preferences['experience'])
                                      ? implode(', ', $carePlan->preferences['experience'])
                                      : '',
                        "nationality" => isset($carePlan->preferences['nationality']) && is_array($carePlan->preferences['nationality'])
                                       ? implode(', ', $carePlan->preferences['nationality'])
                                       : '',
                        "religion" => isset($carePlan->preferences['religion']) && is_array($carePlan->preferences['religion'])
                                    ? implode(', ', $carePlan->preferences['religion'])
                                    : '',
                        "language" => $carePlan->preferred_language ?? '',   
                    ],
                    'Recipients' => [['Email' => $user->email]]
                ];
            }

            // Send email
            $response = $mj->post(Resources::$Email, ['body' => $body]);

            if (!$response->success()) {
                Log::error('Mailjet response:', [
                    'status' => $response->getStatus(),
                    'reason' => $response->getReasonPhrase(),
                    'body' => $response->getBody(),
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Error sending care plan email: ' . $e->getMessage());
        }
    }
   
    public function newbornCare ()
    {
        $service = Service::where('name', 'Newborn Care')
        ->with(['packages.durations.salaries', 'packages.durations.serviceFees'])
        ->firstOrFail();
        
        //Get caregivers who can care newborn
        $caregivers = CV::where('is_approved', true)->whereJsonContains('services', 'Newborn care')->get();

        // Get the nursing skills
       
        $basicSkills = DB::table('newborn_basic_care')->pluck('care_name')->toArray();
        $advSkills = DB::table('newborn_advanced_care')->pluck('care_name')->toArray();
        
        return Inertia::render('BabyCare/NewbornCare/NewbornCare', [
            'service' => $service,
            'basicSkills' => $basicSkills,
            'advSkills' => $advSkills,
            'caregivers' => $caregivers ?? [],
        ]);
    }

    public function optionNanny () 
    {
        return Inertia::render('BabyCare/ChooseNannyCare');
    }
   
    public function nannyOnly ()
    {
        $service = Service::where('name', 'Nanny Service')
        ->with(['packages.durations.salaries', 'packages.durations.serviceFees'])
        ->firstOrFail();
       
        
        //Get caregivers who can care newborn
        $caregivers = CV::where('is_approved', true)->whereJsonContains('services', 'Nanny service')->get();

        // Get the nursing skills
       
        $basicSkills = DB::table('nanny_basic_care')->pluck('care_name')->toArray();
        $advSkills = DB::table('nanny_advanced_care')->pluck('care_name')->toArray();

        return Inertia::render('BabyCare/NannyCare/NannyCare', [
            'service' => $service,
            'basicSkills' => $basicSkills,
            'advSkills' => $advSkills,
            'caregivers' => $caregivers ?? [],
        ]);
    }
    
    public function nannyMaid ()
    {
        $service = Service::where('name', 'Nanny Care + Maid Service')
        ->with(['packages.durations.salaries', 'packages.durations.serviceFees'])
        ->firstOrFail();
       
        
        //Get caregivers who can care newborn
        $caregivers = CV::where('is_approved', true)->whereJsonContains('services', 'Nanny + Maid')->get();

        // Get the nursing skills
       
        $basicSkills = DB::table('nanny_basic_care')->pluck('care_name')->toArray();
        $advSkills = DB::table('nanny_advanced_care')->pluck('care_name')->toArray();
        $maidServices = DB::table('nanny_maid_service')->pluck('service_name')->toArray();

        return Inertia::render('BabyCare/NannyMaidCare/NannyMaidCare', [
            'service' => $service,
            'basicSkills' => $basicSkills,
            'advSkills' => $advSkills,
            'maidServices' => $maidServices,
            'caregivers' => $caregivers ?? [],
        ]);
    }

    public function optionElder()
    {
        return Inertia::render('ElderCare/ChooseElderCare');
    }
    
    public function caregiverOnly()
    {
        $service = Service::where('name', 'Elder Care')
        ->with(['packages.durations.salaries', 'packages.durations.serviceFees'])
        ->firstOrFail();
       
        
        //Get caregivers who can care newborn
        $caregivers = CV::where('is_approved', true)->whereJsonContains('services', 'Elder care')->get();

        // Get the nursing skills
       
        $basicSkills = DB::table('elder_basic_care')->pluck('care_name')->toArray();
        $advSkills = DB::table('elder_advanced_care')->pluck('care_name')->toArray();

        return Inertia::render('ElderCare/CaregiverOnly/CaregiverOnly', [
            'service' => $service,
            'basicSkills' => $basicSkills,
            'advSkills' => $advSkills,
            'caregivers' => $caregivers ?? [],
        ]);
    }
    
    public function caregiverMaid()
    {
        $service = Service::where('name', 'Elder Care + Maid Service')
        ->with(['packages.durations.salaries', 'packages.durations.serviceFees'])
        ->firstOrFail();
       
        
        //Get caregivers who can care newborn
        $caregivers = CV::where('is_approved', true)->whereJsonContains('services', 'Elder + Maid')->get();

        // Get the nursing skills
       
        $basicSkills = DB::table('elder_basic_care')->pluck('care_name')->toArray();
        $advSkills = DB::table('elder_advanced_care')->pluck('care_name')->toArray();
        $maidServices = DB::table('elder_maid_service')->pluck('service_name')->toArray();

        return Inertia::render('ElderCare/CaregiverMaid/CaregiverMaid', [
            'service' => $service,
            'basicSkills' => $basicSkills,
            'advSkills' => $advSkills,
            'maidServices' => $maidServices,
            'caregivers' => $caregivers ?? [],
        ]);
    }
    
    public function adminCarePlans ()
    {
        return Inertia::render('Admin/CarePlan/AdminCarePlans', [
            'carePlans' => CarePlan::with('user')->get()
        ]);
    }
    
    public function adminSingleCarePlan ($id)
    {
        $carePlan = CarePlan::with('user')->findOrFail($id);
        return Inertia::render('Admin/CarePlan/AdminSingleCarePlan', [
            'carePlan' => $carePlan
        ]);
    }
}
