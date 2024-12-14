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

        return Inertia::render('BabyCare/BabyCare', [
            'carePlan' => $existingCarePlan ?? null,
        ]);
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

    public function store(Request $request)
    {
        try {
            $user = Auth::user();
            $user_id = $user->id;
    
           
            // Validate the incoming request data
            $validatedData = $request->validate([
                'care_type' => 'required|in:Baby,Elder',
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
            $existingCarePlan = CarePlan::where([
                ['user_id', '=', $user_id],
                ['care_type', '=', $validatedData['care_type']],
                ['start_date', '=', $validatedData['start_date']],
                ['service_type', '=', $validatedData['service_type']]
            ])->first();
    
    
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
    
                // Format the duration before including it in the email
                $formattedDuration = $validatedData["duration"] === 1 ? '1-year' : "{$validatedData['duration']}-month";

                $mj = Mailjet::getClient();
                
                // Prepare email body using validated data
                if($data['care_type'] == 'Baby')
                {
                    $body = [
                        'FromEmail' => "service@heartyaid.com",
                        'FromName' => "Hearty Aid",
                        'Subject' => "Your customized care plan is updated.",
                        'MJ-TemplateID' => 6461565,
                        'MJ-TemplateLanguage' => true,
                        'Vars' => [
                            // Baby info
                            "baby_name" => $validatedData['care_recipient_info']['name'] ?? '',
                            "date_of_birth" => $validatedData['care_recipient_info']['date_of_birth'] ?? '',
                            "gender" => $validatedData['care_recipient_info']['gender'] ?? '',
                            "allergy" => $validatedData['care_recipient_info']['allergies'] ?? '',
                            "medical_condition" => $validatedData['care_recipient_info']['baby_medical_condition'] ?? '',
                            
                            // Guardian info
                            "parent_name" => $validatedData['contact_info']['name'] ?? '',
                            "relation" => $validatedData['contact_info']['relationship'] ?? '',
                            "phone" => $validatedData['contact_info']['phone_number'] ?? '',
                            "line_id" => $validatedData['contact_info']['line_id'] ?? '',
                            "home_address" => $validatedData['care_recipient_info']['home_address'] ?? '',
                            
                            // Care schedule
                            "start_date" => $validatedData['start_date'] ?? '',
                            "package" => $validatedData['schedule']['package'] ?? '',
                            "duty_time" => $validatedData['schedule']['duty_time'] ?? '',
                            "duration" => $formattedDuration ?? '',
                            "services" => isset($validatedData['services']) && is_array($validatedData['services']) 
                                        ? implode(', ', $validatedData['services']) 
                                        : '',
                            
                            // Nanny preference
                            "nanny_age" => $validatedData['preferences']['age'] ?? '',
                            "additional_note" => $validatedData['additional_notes'] ?? '',
                            "experience" => $validatedData['preferences']['experience'] ?? '',
                            "nationality" => $validatedData['preferences']['nationality'] ?? '',
                            "religion" => $validatedData['preferences']['religion'] ?? '',
                            "language" => $validatedData['preferred_language'] ?? '',   
                        ],
                        'Recipients' => [['Email' => $user->email]]
                    ];
                } else if($data['care_type'] == 'Elder')
                {
                    // create $body and template for elder care plan
                    $body = [
                        'FromEmail' => "service@heartyaid.com",
                        'FromName' => "Hearty Aid",
                        'Subject' => "Your customized care plan is updated.",
                        'MJ-TemplateID' => 6473181,
                        'MJ-TemplateLanguage' => true,
                        'Vars' => [
                            // Baby info
                            "elder_name" => $validatedData['care_recipient_info']['name'] ?? '',
                            "date_of_birth" => $validatedData['care_recipient_info']['date_of_birth'] ?? '',
                            "gender" => $validatedData['care_recipient_info']['gender'] ?? '',
                            "home_address" => $validatedData['care_recipient_info']['home_address'] ?? '',
                            
                            // Medical conditions 
                            "medical_conditions" => isset($validatedData['medical_conditions']) && is_array($validatedData['medical_conditions']) 
                            ? implode(', ', $validatedData['medical_conditions']) 
                            : '',
                            "other_medical_conditions" => $validatedData['other_medical_conditions'] ?? '',
                            "allergy" => $validatedData['care_recipient_info']['allergies'] ?? '',

                            // Mobility Level
                            "mobilities" => $validatedData['mobilities'] ?? '',
                            
                            // Memory & Awareness
                            "memory" => $validatedData['memory'] ?? '',
                            
                            // Alertness & Orientation
                            "alertness" => $validatedData['alertness'] ?? '',
                            
                            // Guardian info
                            "contact_name" => $validatedData['contact_info']['name'] ?? '',
                            "relation" => $validatedData['contact_info']['relationship'] ?? '',
                            "phone" => $validatedData['contact_info']['phone_number'] ?? '',
                            "line_id" => $validatedData['contact_info']['line_id'] ?? '',
                            
                            // Care schedule
                            "start_date" => $validatedData['start_date'] ?? '',
                            "package" => $validatedData['schedule']['package'] ?? '',
                            "duty_time" => $validatedData['schedule']['duty_time'] ?? '',
                            "duration" => $formattedDuration ?? '',
                            "services" => isset($validatedData['services']) && is_array($validatedData['services']) 
                                        ? implode(', ', $validatedData['services']) 
                                        : '',
                            
                            // Nanny preference
                            "nanny_age" => $validatedData['preferences']['age'] ?? '',
                            "additional_note" => $validatedData['additional_notes'] ?? '',
                            "experience" => $validatedData['preferences']['experience'] ?? '',
                            "nationality" => $validatedData['preferences']['nationality'] ?? '',
                            "religion" => $validatedData['preferences']['religion'] ?? '',
                            "language" => $validatedData['preferred_language'] ?? '',   
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
               
    
                return response()->json([
                    'message' => 'Care plan updated successfully.',
                    'care_plan_id' => $existingCarePlan->id,
                ], 200);
            } else {
                // Create a new care plan if none exists
                $carePlan = CarePlan::create($data);

                // Format the duration before including it in the email
                $formattedDuration = $carePlan->duration === 1 ? '1-year' : "{$carePlan->duration}-month";

                $mj = Mailjet::getClient();
                // Prepare email body using validated data
                if($data['care_type'] == 'Baby') 
                {
                    $body = [
                        'FromEmail' => "service@heartyaid.com",
                        'FromName' => "Hearty Aid",
                        'Subject' => "Your customized care plan is created.",
                        'MJ-TemplateID' => 6461565,
                        'MJ-TemplateLanguage' => true,
                        'Vars' => [
                            // Baby info
                            "baby_name" => $carePlan->care_recipient_info['name'] ?? '',
                            "date_of_birth" => $carePlan->care_recipient_info['date_of_birth'] ?? '',
                            "gender" => $carePlan->care_recipient_info['gender'] ?? '',
                            "allergy" => $carePlan->care_recipient_info['allergies'] ?? '',
                            "medical_condition" => $carePlan->care_recipient_info['baby_medical_condition'] ?? '',
    
                            // Guardian info
                            "parent_name" => $carePlan->contact_info['name'] ?? '',
                            "relation" => $carePlan->contact_info['relationship'] ?? '',
                            "phone" => $carePlan->contact_info['phone_number'] ?? '',
                            "line_id" => $carePlan->contact_info['line_id'] ?? '',
                            "home_address" => $carePlan->care_recipient_info['home_address'] ?? '',
    
                            // Care schedule
                            "start_date" => $carePlan->start_date ?? '',
                            "package" => $carePlan->schedule['package'] ?? '',
                            "duty_time" => $carePlan->schedule['duty_time'] ?? '',
                            "duration" => $formattedDuration ?? '',
                            "services" => isset($carePlan->services) && is_array($carePlan->services) 
                                        ? implode(', ', $carePlan->services) 
                                        : '',
    
                            // Nanny preference
                            "nanny_age" => $carePlan->preferences['age'] ?? '',
                            "additional_note" => $carePlan->additional_notes ?? '',
                            "experience" => $carePlan->preferences['experience'] ?? '',
                            "nationality" => $carePlan->preferences['nationality'] ?? '',
                            "religion" => $carePlan->preferences['religion'] ?? '',
                            "language" => $carePlan->preferred_language ?? '',   
                        ],
                        'Recipients' => [['Email' => $user->email]]
                    ];
                } else if($data['care_type'] == 'Elder')
                {
                    // Create $body and elder care template
                    $body = [
                        'FromEmail' => "service@heartyaid.com",
                        'FromName' => "Hearty Aid",
                        'Subject' => "Your customized care plan is created.",
                        'MJ-TemplateID' => 6473181,
                        'MJ-TemplateLanguage' => true,
                        'Vars' => [
                            // Baby info
                            "elder_name" => $validatedData['care_recipient_info']['name'] ?? '',
                            "date_of_birth" => $validatedData['care_recipient_info']['date_of_birth'] ?? '',
                            "gender" => $validatedData['care_recipient_info']['gender'] ?? '',
                            "home_address" => $validatedData['care_recipient_info']['home_address'] ?? '',
                            
                            // Medical conditions 
                            "medical_conditions" => isset($validatedData['medical_conditions']) && is_array($validatedData['medical_conditions']) 
                            ? implode(', ', $validatedData['medical_conditions']) 
                            : '',
                            "other_medical_conditions" => $validatedData['other_medical_conditions'] ?? '',
                            "allergy" => $validatedData['care_recipient_info']['allergies'] ?? '',

                            // Mobility Level
                            "mobilities" => $validatedData['mobilities'] ?? '',
                            
                            // Memory & Awareness
                            "memory" => $validatedData['memory'] ?? '',
                            
                            // Alertness & Orientation
                            "alertness" => $validatedData['alertness'] ?? '',
                            
                            // Guardian info
                            "contact_name" => $validatedData['contact_info']['name'] ?? '',
                            "relation" => $validatedData['contact_info']['relationship'] ?? '',
                            "phone" => $validatedData['contact_info']['phone_number'] ?? '',
                            "line_id" => $validatedData['contact_info']['line_id'] ?? '',
                            
                            // Care schedule
                            "start_date" => $validatedData['start_date'] ?? '',
                            "package" => $validatedData['schedule']['package'] ?? '',
                            "duty_time" => $validatedData['schedule']['duty_time'] ?? '',
                            "duration" => $formattedDuration ?? '',
                            "services" => isset($validatedData['services']) && is_array($validatedData['services']) 
                                        ? implode(', ', $validatedData['services']) 
                                        : '',
                            
                            // Nanny preference
                            "nanny_age" => $validatedData['preferences']['age'] ?? '',
                            "additional_note" => $validatedData['additional_notes'] ?? '',
                            "experience" => $validatedData['preferences']['experience'] ?? '',
                            "nationality" => $validatedData['preferences']['nationality'] ?? '',
                            "religion" => $validatedData['preferences']['religion'] ?? '',
                            "language" => $validatedData['preferred_language'] ?? '',   
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
               
                return response()->json([
                    'message' => 'Care plan created successfully.',
                    'care_plan_id' => $carePlan->id,
                ], 200);
            }
        } catch (\Exception $e) {
            // Log and return error response
            Log::error('Error creating/updating care plan: ' . $e->getMessage());
    
            return response()->json([
                'message' => 'Failed to create or update care plan.',
                'error' => $e->getMessage()
            ], 500);
        }
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
