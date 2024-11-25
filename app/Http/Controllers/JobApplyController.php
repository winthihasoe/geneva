<?php

namespace App\Http\Controllers;

use App\Models\JobApply;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Mailjet\LaravelMailjet\Facades\Mailjet;
use Mailjet\Resources;

class JobApplyController extends Controller
{
    public function jobApply ()
    {
        return Inertia::render('JobApply/JobApply');
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'date_of_birth' => 'required|date',
                'gender' => 'required|string|max:10',
                'height' => 'required|numeric',
                'weight' => 'required|numeric',
                'nationality' => 'required|string|max:100',
                'religion' => 'required|string|max:100',
                'phone' => 'required|string|max:20',
                'email' => 'nullable|email|max:255',
                'line' => 'nullable|string|max:255',
                'current_address' => 'required|string|max:255',
                'experience' => 'required|string|max:1000',
                'certificate_details' => 'required|string|max:1000',
                'language' => 'required|string|max:255',
                'passport' => 'nullable|file|mimes:jpeg,png,jpg|max:10048',
                'visa' => 'nullable|file|mimes:jpeg,png,jpg|max:10048',
                'certificates.*' => 'required|file|mimes:jpeg,png,jpg|max:1048',
            ]);
    
              // Handle file uploads with null checks
            $passportPath = $request->hasFile('passport')
            ? $request->file('passport')->store('passports', 'public')
            : null;

            $visaPath = $request->hasFile('visa')
                ? $request->file('visa')->store('visas', 'public')
                : null;

            // Save certificate files
            $certificatePaths = [];
            if ($request->hasFile('certificates')) {
                foreach ($request->file('certificates') as $certificate) {
                    $certificatePaths[] = $certificate->store('certificates', 'public');
                }
            }
    
            // Save the job application to the database
            $newCV = JobApply::create([
                'name' => $validatedData['name'],
                'date_of_birth' => $validatedData['date_of_birth'],
                'gender' => $validatedData['gender'],
                'height' => $validatedData['height'],
                'weight' => $validatedData['weight'],
                'nationality' => $validatedData['nationality'],
                'religion' => $validatedData['religion'],
                'phone' => $validatedData['phone'],
                'email' => $validatedData['email'],
                'line' => $validatedData['line'],
                'current_address' => $validatedData['current_address'],
                'experience' => $validatedData['experience'],
                'language' => $validatedData['language'],
                'passport' => $passportPath,
                'visa' => $visaPath,
                'certificates' => $certificatePaths,
                'certificate_details' => $validatedData['certificate_details'],
            ]);


            if($newCV)
            {
                $mj = Mailjet::getClient();

                $body = [
                    'FromEmail' => "noreply@heartyaid.com",
                    'FromName' => "Hearty Aid",
                    'Subject' => "A new CV is received.",
                    'MJ-TemplateID' => 6500192,
                    'MJ-TemplateLanguage' => true,
                    'Vars' => [
                        // personal info
                        "name" => $newCV->name ?? '',
                        "date_of_birth" => $newCV->date_of_birth ?? '',
                        "gender" => $newCV->gender ?? '',
                        "height" => $newCV->height ?? '',
                        "weight" => $newCV->weight ?? '',
                        "nationality" => $newCV->nationality ?? '',
                        "religion" => $newCV->religion ?? '',
                        "language" => $newCV->language ?? '',
                        
                        // Contact info
                        "phone" => $newCV->phone ?? '',
                        "email" => $newCV->email ?? '',
                        "line" => $newCV->line ?? '',
                        "current_address" => $newCV->current_address ?? '',
                       
                        // Contact info 
                        "certificate_details" => $newCV->certificate_details,
                        "experience" => $newCV->experience,
                    ],
                    'Recipients' => [['Email' => 'heartyaidbkk@gmail.com']]
                ];

                // Send email
                $response = $mj->post(Resources::$Email, ['body' => $body]);

                if (!$response->success()) {
                    Log::error('Mailjet response:', [
                        'status' => $response->getStatus(),
                        'reason' => $response->getReasonPhrase(),
                        'body' => $response->getBody(),
                    ]);
                }
            }
            return redirect()->route('job.apply.success')->with('success', 'Application submitted successfully!');
            // return back()->with('success', 'Application submitted successfully!');
    
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }

    }

    public function success ()
    {
        return Inertia::render('JobApply/Success');
    }

    // Shows job applies to admin
    public function adminJobApplies()
    {
        return Inertia::render('Admin/JobApplies/JobApplies', [
            'jobApplies' => JobApply::orderBy('id', 'desc')->paginate(10),
            'count' => JobApply::count(),
        ]);
    }
   
    // Shows single job apply to admin
    public function adminSingleJobApply($id)
    {
        return Inertia::render('Admin/JobApplies/SingleJobApply', [
            'apply' => JobApply::findOrFail($id),
        ]);
    }

    // Show search result to admin
    public function adminSearchJobApply(Request $request)
    {
        $search = strtolower($request->input('search'));
        // Perform the search
        $searchResults = JobApply::where('name', 'like', "%{$search}%")
        ->orderBy('id', 'desc')
        ->get();

        return Inertia::render('Admin/JobApplies/JobApplySearchResult', [
            'searchTerm' => $search,
            'searchResults' => $searchResults,
        ]);
    }

}
