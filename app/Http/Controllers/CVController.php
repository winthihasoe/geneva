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

    // Admin Create CV for caregiver
    public function adminCreateCV()
    {
        // check is the user is admin
        if (auth()->user()->isAdmin()) {
            return Inertia::render('Admin/CV/AdminCreateCV', [
                'cvData' =>  null,
                'newbornBasicCare' => DB::table('newborn_basic_care')->get(),
                'newbornAdvancedCare' => DB::table('newborn_advanced_care')->get(),
                'nannyBasicCare' => DB::table('nanny_basic_care')->get(),
                'nannyAdvancedCare' => DB::table('nanny_advanced_care')->get(),
                'elderBasicCare' => DB::table('elder_basic_care')->get(),
                'elderAdvancedCare' => DB::table('elder_advanced_care')->get(),
                
            ]);
        }
       
    }

    
    public function adminStoreCV(Request $request)
    {
        try {
            $currentStep = $request->input('current_step');
            
            $stepValidationRules = [
                1 => [
                    'full_name' => 'required|string|max:255',
                    'nickname' => 'nullable|string|max:255',
                    'date_of_birth' => 'required|date',
                    'gender' => 'required|string|max:255',
                ],
                2 => [
                    'profile_photo' => 'nullable|file|image|mimes:jpeg,png,jpg,heic|max:2048',
                    'height' => 'nullable|numeric',
                    'weight' => 'nullable|numeric',
                    'religion' => 'nullable|string|max:255',
                ],
                3 => [
                    //
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
                    //
                ],         
            ];

            // Get validation rules for the current step
            $validationRules = $stepValidationRules[$currentStep] ?? [];

            // Define file fields that should be handled separately
            $fileFields = ['profile_photo', 'citizenship_certificate', 'family_member_record'];

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
            $cv = CV::find($request->input('cv_id'));// Get the latest record
            $userId = Auth()->user()->id;

            // Prepare the data to save (exclude file fields from direct assignment)
            $data = array_merge(
                $cv ? $cv->toArray() : [],
                $request->except(array_merge(['_token', 'geneva_id', 'slug'], $fileFields)),
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
             // Check if there is an incomplete resume
            if ($request->input('cv_id')) {
                // If the current cv is not completed, update the same row
                $cv->update($data);
            } else {
                // If the last cv is completed, create a new row for a new resume
               $cv = CV::create($data);

               // Ensure geneva_id is saved
                if (empty($cv->geneva_id)) {
                    \Log::warning('geneva_id was not set during creation, attempting to set manually');
                    $cv->geneva_id = CV::generateGenevaId();
                    $cv->save();
                    \Log::info('geneva_id manually saved', ['geneva_id' => $cv->geneva_id]);
                }
            }

            // Handle file uploads using the improved method
            $this->handleFileUploads($request, $cv, $currentStep);

            return response()->json([
                'status' => 'success',
                'message' => $currentStep == 11 ? 'CV completed successfully!' : 'Data saved successfully!',
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

    public function adminFinishCV ()
    {
        return redirect(route('admin.cv.all'))->with('success', 'CV created successful');   
    }

    public function adminEditCV($cvId)
    {
        $cv = CV::findOrFail($cvId);
        
        return Inertia::render('Admin/CV/AdminCreateCV' , [
            'cvData' => $cv ? $cv->toArray() : null,
            'newbornBasicCare' => DB::table('newborn_basic_care')->get(),
            'newbornAdvancedCare' => DB::table('newborn_advanced_care')->get(),
            'nannyBasicCare' => DB::table('nanny_basic_care')->get(),
            'nannyAdvancedCare' => DB::table('nanny_advanced_care')->get(),
            'elderBasicCare' => DB::table('elder_basic_care')->get(),
            'elderAdvancedCare' => DB::table('elder_advanced_care')->get(),
            
        ]);
    }

     // Show all CV to admin
    public function adminCVs ()
    {
       
        // $resumeNeedToApprove = CV::with('user')->where('is_approved', false)->orderBy('id', 'desc')->get();
        // $resumes = CV::with('user')->where('is_approved', true)->orderBy('id', 'desc')->paginate(10);
        $cvCount = CV::count();
        $cvs = CV::orderBy('id', 'desc')->with('user')->paginate(20);
        return Inertia::render('Admin/CV/AdminCVs', [
            'cvs' => $cvs,
            'cvCount' => $cvCount,
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
