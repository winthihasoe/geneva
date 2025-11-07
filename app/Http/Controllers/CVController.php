<?php

namespace App\Http\Controllers;

use App\Models\CV;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Spatie\Image\Image;
use Spatie\ImageOptimizer\OptimizerChainFactory;

class CVController extends Controller
{
    public function createCV()
    {
        $user = auth()->user();
        $cv = $user->cv; 
        return Inertia::render('CV/CreateCV', [
            'cvData' => $cv ? $cv->toArray() : null,
            'newbornBasicCare' => DB::table('newborn_basic_care')->get(),
            'newbornAdvancedCare' => DB::table('newborn_advanced_care')->get(),
            'nannyBasicCare' => DB::table('nanny_basic_care')->get(),
            'nannyAdvancedCare' => DB::table('nanny_advanced_care')->get(),
            'elderBasicCare' => DB::table('elder_basic_care')->get(),
            'elderAdvancedCare' => DB::table('elder_advanced_care')->get(),
            
        ]);
    }

    public function storeVeryOld(Request $request)
    {
        try {
            $currentStep = $request->input('current_step');
            $userId = Auth()->user()->id;
            $stepValidationRules = [
                // 0 => [
                //     'full_name' => 'required|string|max:255',
                //     'nickname' => 'nullable|string|max:255',
                //     'introduction' => 'nullable|string|max:2000', 
                //     'date_of_birth' => 'required|date',
                //     'gender' => 'nullable|string|max:255',
                //     'height' => 'nullable|numeric',
                //     'weight' => 'nullable|numeric',
                //     'place_of_birth' => 'nullable|string|max:255',
                //     'nationality' => 'nullable|string|max:255',
                //     'other_nationality' => 'nullable|string|max:255',
                //     'religion' => 'nullable|string|max:255',
                //     'language' => 'nullable|array', 
                //     'hobbies' => 'nullable|array', 
                //     'other_hobbies' => 'nullable|string|max:1000',
                //     'wears_glasses' => 'nullable|string|max:255',
                //     'has_tattoo' => 'nullable|string|max:255',
                //     'habits' => 'nullable|array', 
                //     'other_habits' => 'nullable|string|max:1000',
                //     'email' => 'nullable|email|max:255',
                //     'emergency_contact' => 'nullable|string|max:20',
                //     'line' => 'nullable|string|max:20',
                //     'phone' => 'nullable|string|max:20',
                //     'current_address' => 'nullable|string|max:1000',
                //     'residential_address' => 'nullable|string|max:1000',
                //     'education_level' => 'nullable|string|max:255',
                //     'caregiver_qualification' => 'nullable|string|max:255',
                //     'marital_status' => 'nullable|string|max:255',
                //     'number_of_children' => 'nullable|string|max:255',
                //     'number_of_siblings' => 'nullable|string|max:255',                    
                // ],
                // 1 => [
                //     'past_illnesses' => 'nullable|array', 
                //     'other_illness' => 'nullable|string|max:1000',
                //     'allergies' => 'nullable|string|max:1000',
                //     'physical_disability' => 'nullable|string|max:1000',
                //     'dietary_restrictions' => 'nullable|array', 
                //     'other_dietary_restrictions' => 'nullable|string|max:255',
                //     'food_handling' => 'nullable|array', 
                //     'other_food_handling' => 'nullable|string|max:255',
                // ],
                // 2 => [                    
                //     'passport_number' => 'nullable|string|max:225',
                //     'passport_type' => 'nullable|string|max:225',
                //     'visa_type' => 'nullable|string|max:225',
                // ],
                // 3 => [
                //     // Experience
                //     'newborn_experience_years' => 'nullable|string|max: 255',
                //     'nanny_experience_years' => 'nullable|string|max: 255',
                //     'elder_experience_years' => 'nullable|string|max: 255',
                //     'detail_experience' => 'nullable|string|max: 2000',
 
                //     'gender_of_patient' => 'nullable|string|max:255',

                //     'nursing_skills_for_elder' => 'nullable|array', 
                //     'nursing_skills_for_child' => 'nullable|array', 
                //     'types_of_patients_handled' => 'nullable|array', 
                //     'types_of_babies_handled' => 'nullable|array', 
                //     'other_types_of_patients_handled' => 'nullable|string|max:1000', 
                //     'other_types_of_babies_handled' => 'nullable|string|max:1000', 
                   
                //     'current_location' => 'nullable|string|max:255',
                //     'worked_in_thailand' => 'nullable|string|max:255',
                    
                //     'services' => 'nullable|array', 
                //     'package_duration' => 'nullable|array', 
                //     'package' => 'nullable|array', 
                //     'service_area' => 'nullable|string',
                //     'agree_to_terms' => 'required|boolean',
                // ],       
                1 => [
                    'full_name' => 'required|string|max:255',
                    'nickname' => 'required|string|max:255',
                    'date_of_birth' => 'required|date',
                    'gender' => 'required|string|max:255',
                ],
                2 => [
                    'profile_photo' => 'sometimes|file|image|mimes:jpeg,png,jpg,heic|max:2048',
                    'height' => 'nullable|numeric',
                    'weight' => 'nullable|numeric',
                    'nationality' => 'nullable|string|max:255',
                    'other_nationality' => 'nullable|string|max:255',
                    'religion' => 'nullable|string|max:255',
                ],
                3 => [
                    'passport_number' => 'required|string|max:255',
                    'visa_type' => 'required|string|max:255',
                    'passport_expiry_date' => 'required|date|after:today',
                    'passport' => 'sometimes|file|image|mimes:jpeg,png,jpg,heic|max:2048',
                ],
                4 => [
                    // Certificate validation (optional)
                    // 'citizenship_certificate' => 'sometimes|file|image|mimes:jpeg,png,jpg,heic|max:2048',
                    // 'family_member_record' => 'sometimes|file|image|mimes:jpeg,png,jpg,heic|max:2048',
                ],
                5 => [
                    'language' => 'required|array|min:1',
                ],
                6 => [
                    'personality' => 'required|string|max:255',
                    'services' => 'required|array|min:1', // Elder care, Newborn and Baby care, Maternal care
                ],
                7 => [
                    // Experience validation (optional)
                ],
                8 => [
                    'package' => 'required|array|min:1', // Live-in, Live-out, Maid service
                ],
                9 => [
                    // Skills validation
                ],
                10 => [
                    // Medical conditions validation
                ],
                11 => [
                    // Food handling and dietary restrictions validation
                ],
                12 => [
                    'agree_to_terms' => 'required|accepted',
                ],         
            ];
            
    
            // Get validation rules for the current step
            $validationRules = $stepValidationRules[$currentStep] ?? [];
    
            // Validate the request data for the current step
            $validatedData = $request->validate($validationRules);

           // Get existing cv data if exists
           $cv = CV::where('user_id', $userId)->first();

           Log::info('Data from request:', $request->all());
          
           // Prepare the data to save
           $data = array_merge(
               $cv ? $cv->toArray() : [],
               $request->except(['_token', 'profile_photo', 'passport', 'citizenship_certificate', 'family_member_record']), // Exclude file fields from direct assignment,
               ['current_step' => $currentStep, 'user_id' => $userId],
            );

            Log::info('Data to be saved:', $data);

            // Save or update caregiver data
           
            if($cv){
                $cv->update($data);
            }else {
                $cv = CV::create($data);
            }

            // storing for profile photo
            if ($request->hasFile('profile_photo')) {
                // Delete the existing photo if it exists
                if ($cv && $cv->profile_photo) {
                    $photoPath = 'public/' . $cv->profile_photo;
                
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
                }
        
                // Get the uploaded photo
                $photoFile = $request->file('profile_photo');
                $photoFilename = uniqid() . '_' . $photoFile->getClientOriginalName();
        
                // Store the uploaded photo in 'storage/app/public/photos/caregiverProfiles'
                $relativePath = 'photos/caregiverProfiles/' . $photoFilename;
                $photoFile->storeAs('public/photos/caregiverProfiles', $photoFilename);
        
                // Full file path for resizing and optimization
                $filePath = storage_path('app/public/' . $relativePath);
        
                // Resize the photo to 600px width while keeping aspect ratio
                Image::load($filePath)
                    ->width(600)  // Set the width to 600px
                    ->save();
        
                // Optimize the resized photo to reduce file size
                $optimizerChain = OptimizerChainFactory::create();
                $optimizerChain->optimize($filePath);
        
                // Update the caregiver's photo field in the database with the relative path
                $cv->update(['profile_photo' => $relativePath]);
                $cv->update(['current_step' => 2]);
            }
            
            // storing for passport
            if ($request->hasFile('passport')) {
                // Delete the existing photo if it exists
                if ($cv && $cv->passport) {
                    $photoPath = 'public/' . $cv->passport;
                
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
                }
        
                // Get the uploaded photo
                $photoFile = $request->file('passport');
                $photoFilename = uniqid() . '_' . $photoFile->getClientOriginalName();
        
                // Store the uploaded photo in 'storage/app/public/photos/caregiverProfiles'
                $relativePath = 'photos/passport/' . $photoFilename;
                $photoFile->storeAs('public/photos/passport', $photoFilename);
        
                // Full file path for resizing and optimization
                $filePath = storage_path('app/public/' . $relativePath);
        
                // Resize the photo to 600px width while keeping aspect ratio
                Image::load($filePath)
                    ->width(600)  // Set the width to 600px
                    ->save();
        
                // Optimize the resized photo to reduce file size
                $optimizerChain = OptimizerChainFactory::create();
                $optimizerChain->optimize($filePath);
        
                // Update the caregiver's photo field in the database with the relative path
                $cv->update(['passport' => $relativePath]);
                $cv->update(['current_step' => 2]);
            }
            
            // storing for id record
            if ($request->hasFile('citizenship_certificate')) {
                // Delete the existing photo if it exists
                if ($cv && $cv->citizenship_certificate) {
                    $photoPath = 'public/' . $cv->citizenship_certificate;
                
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
                }
        
                // Get the uploaded photo
                $photoFile = $request->file('citizenship_certificate');
                $photoFilename = uniqid() . '_' . $photoFile->getClientOriginalName();
        
                // Store the uploaded photo in 'storage/app/public/photos/caregiverProfiles'
                $relativePath = 'photos/id/' . $photoFilename;
                $photoFile->storeAs('public/photos/id', $photoFilename);
        
                // Full file path for resizing and optimization
                $filePath = storage_path('app/public/' . $relativePath);
        
                // Resize the photo to 600px width while keeping aspect ratio
                Image::load($filePath)
                    ->width(600)  // Set the width to 600px
                    ->save();
        
                // Optimize the resized photo to reduce file size
                $optimizerChain = OptimizerChainFactory::create();
                $optimizerChain->optimize($filePath);
        
                // Update the caregiver's photo field in the database with the relative path
                $cv->update(['citizenship_certificate' => $relativePath]);
                $cv->update(['current_step' => 2]);
            }
           
            // storing for family member record
            if ($request->hasFile('family_member_record')) {
                // Delete the existing photo if it exists
                if ($cv && $cv->family_member_record) {
                    $photoPath = 'public/' . $cv->family_member_record;
                
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
                }
        
                // Get the uploaded photo
                $photoFile = $request->file('family_member_record');
                $photoFilename = uniqid() . '_' . $photoFile->getClientOriginalName();
        
                // Store the uploaded photo in 'storage/app/public/photos/caregiverProfiles'
                $relativePath = 'photos/familyRecord/' . $photoFilename;
                $photoFile->storeAs('public/photos/familyRecord', $photoFilename);
        
                // Full file path for resizing and optimization
                $filePath = storage_path('app/public/' . $relativePath);
        
                // Resize the photo to 600px width while keeping aspect ratio
                Image::load($filePath)
                    ->width(600)  // Set the width to 600px
                    ->save();
        
                // Optimize the resized photo to reduce file size
                $optimizerChain = OptimizerChainFactory::create();
                $optimizerChain->optimize($filePath);
        
                // Update the caregiver's photo field in the database with the relative path
                $cv->update(['family_member_record' => $relativePath]);
                $cv->update(['current_step' => 2]);
            }

           
            return response()->json([
                'status' => 'success',
                'message' => 'Data saved ...', // The message for the frontend
                'id' => $cv->id, // Optionally return the ID of the created CV
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to save data',
                'error' => $e->getMessage(),
            ], 500);
        }       
    }


    public function store(Request $request)
    {
        try {
            $currentStep = $request->input('current_step');
            $userId = Auth()->user()->id;
            
            $stepValidationRules = [
                1 => [
                    'full_name' => 'required|string|max:255',
                    'nickname' => 'required|string|max:255',
                    'date_of_birth' => 'required|date',
                    'gender' => 'required|string|max:255',
                ],
                2 => [
                    'profile_photo' => 'nullable|file|image|mimes:jpeg,png,jpg,heic|max:2048',
                    'height' => 'nullable|numeric',
                    'weight' => 'nullable|numeric',
                    'nationality' => 'nullable|string|max:255',
                    'other_nationality' => 'nullable|string|max:255',
                    'religion' => 'nullable|string|max:255',
                ],
                3 => [
                    'passport_number' => 'required|string|max:255',
                    'visa_type' => 'required|string|max:255',
                    'passport_expiry_date' => 'required|date|after:today',
                    'passport' => 'nullable|file|image|mimes:jpeg,png,jpg,heic|max:2048',
                    'visa_stamp' => 'nullable|file|image|mimes:jpeg,png,jpg,heic|max:2048',
                ],
                4 => [
                    //
                ],
                5 => [
                    //
                ],
                6 => [
                    //
                ],
                7 => [
                    //
                ],
                8 => [
                    //
                ],
                9 => [
                    //
                ],
                10 => [
                    //
                ],
                11 => [
                    //
                ],
                12 => [
                    'agree_to_terms' => 'required|accepted',
                ],         
            ];

            // Get validation rules for the current step
            $validationRules = $stepValidationRules[$currentStep] ?? [];

            // Define file fields that should be handled separately
            $fileFields = ['profile_photo', 'passport', 'visa_stamp', 'citizenship_certificate', 'family_member_record'];

            foreach ($fileFields as $field) {
                if ($request->has($field) && !$request->hasFile($field)) {
                    // If field exists but is not an actual file upload, remove validation for it
                    unset($validationRules[$field]);
                    Log::info("Skipping file validation for {$field} - not an actual file upload");
                }
            }
            // Validate the request data for the current step
            $validatedData = $request->validate($validationRules);

            // Get existing cv data if exists
            $cv = CV::where('user_id', $userId)->first();

            // Prepare the data to save (exclude file fields from direct assignment)
            $data = array_merge(
                $cv ? $cv->toArray() : [],
                $request->except(array_merge(['_token'], $fileFields)),
                ['current_step' => $currentStep, 'user_id' => $userId]
            );

            // Convert boolean fields to proper integer values
            $booleanFields = ['maid_service', 'agree_to_terms'];
            foreach ($booleanFields as $field) {
                if (isset($data[$field])) {
                    $data[$field] = filter_var($data[$field], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
                }
            }

            // Convert JSON string arrays back to arrays if needed
            $arrayFields = [
                'language', 'hobbies', 'habits', 'past_illnesses', 
                'dietary_restrictions', 'food_handling', 'services', 
                'package', 'package_duration', 'nursing_skills_for_elder',
                'nursing_skills_for_child', 'types_of_patients_handled',
                'types_of_babies_handled'
            ];
            
            foreach ($arrayFields as $field) {
                if (isset($data[$field]) && is_string($data[$field])) {
                    $data[$field] = json_decode($data[$field], true) ?: [];
                }
            }


            // Remove unnecessary fields from existing CV data
            unset($data['id'], $data['created_at'], $data['updated_at']);

            Log::info('Data to be saved:', $data);

            // Save or update caregiver data
            if($cv){
                $cv->update($data);
            } else {
                $cv = CV::create($data);
            }

            // Handle file uploads using the improved method
            $this->handleFileUploads($request, $cv, $currentStep);

            return response()->json([
                'status' => 'success',
                'message' => $currentStep == 12 ? 'CV completed successfully!' : 'Data saved successfully!',
                'id' => $cv->id,
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('CV Validation Error:', $e->errors());
            return response()->json([
                'status' => 'error',
                'message' => 'Please fill in all required fields.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('CV Save Error: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to save data',
                'error' => $e->getMessage(),
            ], 500);
        }       
    }

    private function handleFileUploads(Request $request, CV $cv, $currentStep)
    {
        $fileFields = [
            'profile_photo' => 'photos/caregiverProfiles',
            'passport' => 'photos/passport',
            'visa_stamp' => 'photos/visa',
            'citizenship_certificate' => 'photos/id',
            'family_member_record' => 'photos/familyRecord',
        ];

        foreach ($fileFields as $field => $directory) {
            if ($request->hasFile($field)) {
                try {
                    Log::info("Processing actual file upload for: {$field}");

                    // Delete existing file if it exists
                    if ($cv->$field) {
                        $existingPath = 'public/' . $cv->$field;
                        if (Storage::exists($existingPath)) {
                            Storage::delete($existingPath);
                            Log::info("Deleted existing file: {$existingPath}");
                        }
                    }

                    // Upload new file
                    $file = $request->file($field);
                    $filename = uniqid() . '_' . $file->getClientOriginalName();
                    $relativePath = $directory . '/' . $filename;
                    
                    // Store the file
                    $file->storeAs('public/' . $directory, $filename);
                    
                    // Get full file path for image processing
                    $filePath = storage_path('app/public/' . $relativePath);
                    
                    // Resize and optimize image
                    if (file_exists($filePath)) {
                        Image::load($filePath)->width(600)->save();
                        $optimizerChain = OptimizerChainFactory::create();
                        $optimizerChain->optimize($filePath);
                    }

                    // Update CV with file path (don't update current_step here)
                    $cv->update([$field => $relativePath]);
                    
                    Log::info("File uploaded successfully: {$field} -> {$relativePath}");
                    
                } catch (\Exception $e) {
                    // Field exists but is not a file upload (probably blob data)
                    Log::info("Skipping file processing for {$field} - not an actual file upload");
                }
            }
        }
    }
    // public function storeMethodOld(Request $request)
    // {
    //     try {
    //         $currentStep = $request->input('current_step', 1);
    //         $userId = Auth()->user()->id;
            
    //         // Log the request for debugging
    //         Log::info('CV Store Request', [
    //             'step' => $currentStep,
    //             'user_id' => $userId,
    //             'has_files' => !empty($request->allFiles()),
    //             'files' => array_keys($request->allFiles()),
    //             'data_keys' => array_keys($request->except(['_token']))
    //         ]);
            
    //         // Define validation rules for each step
    //         $stepValidationRules = [
    //             1 => [
    //                 'full_name' => 'required|string|max:255',
    //                 'nickname' => 'required|string|max:255',
    //                 'date_of_birth' => 'required|date',
    //                 'gender' => 'required|string|max:255',
    //             ],
    //             2 => [
    //                 'profile_photo' => 'sometimes|file|image|mimes:jpeg,png,jpg,heic|max:2048',
    //                 'height' => 'required|numeric|min:100|max:250',
    //                 'weight' => 'required|numeric|min:30|max:200',
    //                 'nationality' => 'required|string|max:255',
    //                 'religion' => 'required|string|max:255',
    //             ],
    //             3 => [
    //                 'passport_number' => 'required|string|max:255',
    //                 'visa_type' => 'required|string|max:255',
    //                 'passport_expiry_date' => 'required|date|after:today',
    //                 'passport' => 'sometimes|file|image|mimes:jpeg,png,jpg,heic|max:2048',
    //             ],
    //             4 => [
    //                 // Certificate validation (optional)
    //                 // 'citizenship_certificate' => 'sometimes|file|image|mimes:jpeg,png,jpg,heic|max:2048',
    //                 // 'family_member_record' => 'sometimes|file|image|mimes:jpeg,png,jpg,heic|max:2048',
    //             ],
    //             5 => [
    //                 'language' => 'required|array|min:1',
    //             ],
    //             6 => [
    //                 'personality' => 'required|string|max:255',
    //                 'services' => 'required|array|min:1', // Elder care, Newborn and Baby care, Maternal care
    //             ],
    //             7 => [
    //                 // Experience validation (optional)
    //             ],
    //             8 => [
    //                 'package' => 'required|array|min:1', // Live-in, Live-out, Maid service
    //             ],
    //             9 => [
    //                 // Skills validation
    //             ],
    //             10 => [
    //                 // Medical conditions validation
    //             ],
    //             11 => [
    //                 // Food handling and dietary restrictions validation
    //             ],
    //             12 => [
    //                 'agree_to_terms' => 'required|accepted',
    //             ],
    //         ];

    //         // Get validation rules for the current step
    //         $validationRules = $stepValidationRules[$currentStep] ?? [];

    //         // Validate the request data for the current step
    //         $validatedData = $request->validate($validationRules);

    //         // Get existing CV data if exists
    //         $cv = CV::where('user_id', $userId)->first();

    //         // Prepare the data to save (exclude file fields from direct assignment)
    //         $fileFields = ['profile_photo', 'passport', 'citizenship_certificate', 'family_member_record'];
    //         $dataToSave = array_merge(
    //             $cv ? $cv->toArray() : [],
    //             array_diff_key($validatedData, array_flip($fileFields)),
    //             ['current_step' => $currentStep, 'user_id' => $userId]
    //         );

    //         // Remove unnecessary fields
    //         unset($dataToSave['id'], $dataToSave['created_at'], $dataToSave['updated_at']);

    //         Log::info('Data to be saved:', $dataToSave);

    //         // Save or update CV data
    //         if ($cv) {
    //             $cv->update($dataToSave);
    //         } else {
    //             $cv = CV::create($dataToSave);
    //         }

    //         // Handle file uploads
    //         $this->handleFileUploads($request, $cv);

    //         return response()->json([
    //             'status' => 'success',
    //             'message' => $currentStep == 11 ? 'CV completed successfully!' : 'Hello, Data saved!',
    //             'step' => $currentStep,
    //             'cv_id' => $cv->id,
    //         ], 200);

    //     } catch (\Illuminate\Validation\ValidationException $e) {
    //         Log::error('CV Validation Error:', $e->errors());
    //         return response()->json([
    //             'status' => 'error',
    //             'message' => 'Please fill in all required fields.',
    //             'errors' => $e->errors(),
    //         ], 422);
    //     } catch (\Exception $e) {
    //         Log::error('CV Save Error: ' . $e->getMessage(), [
    //             'user_id' => $userId ?? null,
    //             'step' => $currentStep ?? null,
    //             'trace' => $e->getTraceAsString()
    //         ]);
    //         return response()->json([
    //             'status' => 'error',
    //             'message' => 'Failed to save data. Please try again.',
    //             'error' => config('app.debug') ? $e->getMessage() : 'Internal server error',
    //         ], 500);
    //     }
    // }

    // private function handleFileUploads(Request $request, CV $cv)
    // {
    //     $fileFields = ['profile_photo', 'passport', 'citizenship_certificate', 'family_member_record'];
    //     $storageDirectories = [
    //         'profile_photo' => 'photos/caregiverProfiles',
    //         'passport' => 'photos/passport',
    //         'citizenship_certificate' => 'photos/id',
    //         'family_member_record' => 'photos/familyRecord',
    //     ];

    //     foreach ($fileFields as $field) {
    //         if ($request->hasFile($field)) {
    //             try {
    //                 Log::info("Processing file upload for field: {$field}");
                    
    //                 // Delete existing file if it exists
    //                 if ($cv->$field) {
    //                     $existingPath = 'public/' . $cv->$field;
    //                     if (Storage::exists($existingPath)) {
    //                         Storage::delete($existingPath);
    //                         Log::info("Deleted existing file: {$existingPath}");
    //                     }
    //                 }

    //                 // Upload new file
    //                 $file = $request->file($field);
    //                 $filename = uniqid() . '_' . $file->getClientOriginalName();
    //                 $relativePath = $storageDirectories[$field] . '/' . $filename;
                    
    //                 // Ensure directory exists
    //                 $directory = 'public/' . $storageDirectories[$field];
    //                 if (!Storage::exists($directory)) {
    //                     Storage::makeDirectory($directory);
    //                 }
                    
    //                 // Store the file
    //                 $file->storeAs($directory, $filename);
                    
    //                 Log::info("File stored at: {$relativePath}");

    //                 // Get full file path for image processing
    //                 $filePath = storage_path('app/public/' . $relativePath);
                    
    //                 // Check if file exists before processing
    //                 if (file_exists($filePath)) {
    //                     try {
    //                         // Resize and optimize image
    //                         Image::load($filePath)->width(600)->save();
                            
    //                         $optimizerChain = OptimizerChainFactory::create();
    //                         $optimizerChain->optimize($filePath);
                            
    //                         Log::info("Image processed successfully: {$filePath}");
    //                     } catch (\Exception $e) {
    //                         Log::warning("Image processing failed for {$filePath}: " . $e->getMessage());
    //                         // Continue even if image processing fails
    //                     }
    //                 } else {
    //                     Log::error("File not found after storage: {$filePath}");
    //                 }

    //                 // Update CV with file path
    //                 $cv->update([$field => $relativePath]);
                    
    //                 Log::info("CV updated with {$field}: {$relativePath}");
                    
    //             } catch (\Exception $e) {
    //                 Log::error("File upload error for {$field}: " . $e->getMessage());
    //                 throw new \Exception("Failed to upload {$field}: " . $e->getMessage());
    //             }
    //         }
    //     }
    // }

    public function finishCV ()
    {
        return redirect(route('cv.show'))->with('success', 'CV created successful');   
    }

    public function editCV()
    {
        $cv = Auth::user()->cv;
        return Inertia::render('CV/EditCV' , [
            'cvData' => $cv ? $cv->toArray() : null,
            'newbornBasicCare' => DB::table('newborn_basic_care')->get(),
            'newbornAdvancedCare' => DB::table('newborn_advanced_care')->get(),
            'nannyBasicCare' => DB::table('nanny_basic_care')->get(),
            'nannyAdvancedCare' => DB::table('nanny_advanced_care')->get(),
            'elderBasicCare' => DB::table('elder_basic_care')->get(),
            'elderAdvancedCare' => DB::table('elder_advanced_care')->get(),
            
        ]);
    }
   
    public function myCV ()
    {
        $cv = CV::with('certificates', 'experiences')->where('user_id', Auth::user()->id)->first();
        return Inertia::render('CV/MyCV', [
            'cv' => $cv,
            'certificates' => $cv ? $cv->certificates : collect(), // Return an empty collection if no CV exists
        ]);
    }

    // Show all CV to admin
    public function adminCVs ()
    {
       
        $resumeNeedToApprove = CV::with('user')->where('is_approved', false)->orderBy('id', 'desc')->get();
        $resumes = CV::with('user')->where('is_approved', true)->orderBy('id', 'desc')->paginate(6);
        $resumeCount = CV::where('is_approved', true)->count();
        return Inertia::render('Admin/CV/AdminCVs', [
            'resumeNeedToApprove' => $resumeNeedToApprove,
            'resumes' => $resumes,
            'resumeCount' => $resumeCount
        ]);
    }
    // approve caregiver resume by admin
    public function approveResume($cvId)
    {
        $approveResume = CV::findOrFail($cvId);
        $approveResume->is_approved = true;
        $approveResume->approved_at = Carbon::now();
        $approveResume->approved_by = Auth::user()->name;
        $approveResume->update();

        return back()->with('success', 'CV Approved');
    }

    // unapprove caregiver resume by admin
    public function unApproveResume($cvId)
    {
        $approveResume = CV::findOrFail($cvId);
        $approveResume->is_approved = false;
        $approveResume->approved_at = null;
        $approveResume->update();

        return back()->with('success', 'CV Unapproved');
    }
    
    // Admin Single CV
    public function adminSingleCV ($cvId)
    {
        $cv = CV::with('user', 'certificates', 'experiences')->findOrFail($cvId);
        return Inertia::render('Admin/CV/AdminSingleCV', [
            'cv' => $cv,
        ]);
    }

    public function adminSearchCV(Request $request)
    {
        $search = strtolower($request->input('search'));
        // Perform the search
        $searchResults = CV::with('user')
            ->whereHas('user', function($query) use ($search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->orWhere('full_name', 'like', "%{$search}%")
            ->orWhere('nickname', 'like', "%{$search}%")
            ->get();

        return Inertia::render('Admin/CV/CVSearchResult', [
            'searchTerm' => $search,
            'searchResults' => $searchResults,
        ]);
    }

    public function updateLevel(Request $request, $id)
    {
        $cv = CV::findOrFail($id);
        $cv->level = $request->level;
        $cv->nanny_care_level = $request->nanny_care_level;
        $cv->newborn_care_level = $request->newborn_care_level;
        $cv->save();

        return back()->with('success', 'Levels updated successfully.');
    }

    public function updateStatus(Request $request, $id)
    {
        $cv = CV::findOrFail($id);
        $cv->status = $request->status;
        $cv->save();
        return back()->with('success', 'Status updated successfully.');
    }

  
}
