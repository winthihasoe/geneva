<?php

namespace App\Http\Controllers;

use App\Models\CV;
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

    public function store(Request $request)
    {
        // dd($request->profile_photo);
        try {
            $currentStep = $request->input('current_step');
            $userId = Auth()->user()->id;
            $stepValidationRules = [
                0 => [
                    'full_name' => 'required|string|max:255',
                    'nickname' => 'nullable|string|max:255',
                    'introduction' => 'nullable|string|max:2000', 
                    'date_of_birth' => 'required|date',
                    'gender' => 'nullable|string|max:255',
                    'height' => 'nullable|numeric',
                    'weight' => 'nullable|numeric',
                    'place_of_birth' => 'nullable|string|max:255',
                    'nationality' => 'nullable|string|max:255',
                    'other_nationality' => 'nullable|string|max:255',
                    'religion' => 'nullable|string|max:255',
                    'language' => 'nullable|array', 
                    'hobbies' => 'nullable|array', 
                    'other_hobbies' => 'nullable|string|max:1000',
                    'wears_glasses' => 'nullable|string|max:255',
                    'has_tattoo' => 'nullable|string|max:255',
                    'habits' => 'nullable|array', 
                    'other_habits' => 'nullable|string|max:1000',
                    'email' => 'nullable|email|max:255',
                    'emergency_contact' => 'nullable|string|max:20',
                    'line' => 'nullable|string|max:20',
                    'phone' => 'nullable|string|max:20',
                    'current_address' => 'nullable|string|max:1000',
                    'residential_address' => 'nullable|string|max:1000',
                    'education_level' => 'nullable|string|max:255',
                    'caregiver_qualification' => 'nullable|string|max:255',
                    'marital_status' => 'nullable|string|max:255',
                    'number_of_children' => 'nullable|string|max:255',
                    'number_of_siblings' => 'nullable|string|max:255',                    
                ],
                1 => [
                    'past_illnesses' => 'nullable|array', 
                    'other_illness' => 'nullable|string|max:1000',
                    'allergies' => 'nullable|string|max:1000',
                    'physical_disability' => 'nullable|string|max:1000',
                    'dietary_restrictions' => 'nullable|array', 
                    'other_dietary_restrictions' => 'nullable|string|max:255',
                    'food_handling' => 'nullable|array', 
                    'other_food_handling' => 'nullable|string|max:255',
                ],
                2 => [                    
                    'passport_number' => 'nullable|string|max:225',
                    'passport_type' => 'nullable|string|max:225',
                    'visa_type' => 'nullable|string|max:225',
                ],
                3 => [
                    // Experience
                    'newborn_experience_years' => 'nullable|string|max: 255',
                    'nanny_experience_years' => 'nullable|string|max: 255',
                    'elder_experience_years' => 'nullable|string|max: 255',
                    'detail_experience' => 'nullable|string|max: 1000',
 
                    'gender_of_patient' => 'nullable|string|max:255',

                    'nursing_skills_for_elder' => 'nullable|array', 
                    'nursing_skills_for_child' => 'nullable|array', 
                    'types_of_patients_handled' => 'nullable|array', 
                    'types_of_babies_handled' => 'nullable|array', 
                    'other_types_of_patients_handled' => 'nullable|string|max:1000', 
                    'other_types_of_babies_handled' => 'nullable|string|max:1000', 
                   
                    'current_location' => 'nullable|string|max:255',
                    'worked_in_thailand' => 'nullable|string|max:255',
                    
                    'services' => 'nullable|array', 
                    'package_duration' => 'nullable|array', 
                    'package' => 'nullable|array', 
                    'service_area' => 'nullable|string',
                    'agree_to_terms' => 'required|boolean',
                ],                
            ];
    
            // Get validation rules for the current step
            $validationRules = $stepValidationRules[$currentStep] ?? [];
    
            // Validate the request data for the current step
            $validatedData = $request->validate($validationRules);

           // Get existing cv data if exists
           $cv = CV::where('user_id', $userId)->first();
    
           // Prepare the data to save
           $data = array_merge(
               $cv ? $cv->toArray() : [],
               $validatedData,
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
                'message' => 'Data saved...', // The message for the frontend
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

    public function finishCV ()
    {
        return redirect(route('cv.show'))->with('success', 'CV created successful');   
    }
   
    public function myCV ()
    {
        $cv = CV::where('user_id', Auth::user()->id)->first();
        return Inertia::render('CV/MyCV', [
            'cv' => $cv,
            'certificates' => $cv ? $cv->certificates : collect(), // Return an empty collection if no CV exists
        ]);
    }


  
}
