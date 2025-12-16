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
                'height' => 'required',
                'weight' => 'required',
                'ethnicity' => 'required|string|max:100',
                'religion' => 'required|string|max:100',
                'phone' => 'required|string|max:20',
                'email' => 'nullable|email|max:255',
                'viber' => 'nullable|string|max:20',
                'current_address' => 'required|string|max:500',
                'service_area' => 'required|string|max:255',
                'available_townships' => 'nullable|array',
                'available_townships.*' => 'string',
                'experience' => 'required|string|max:1000',
                'certificate_details' => 'required|string|max:1000',
                'passport' => 'nullable|file|mimes:jpeg,png,jpg|max:10048',
                'visa' => 'nullable|file|mimes:jpeg,png,jpg|max:10048',
                'certificates.*' => 'required|file|mimes:jpeg,png,jpg|max:10048',
            ]);
    
              // Handle file uploads with null checks
              // table column is passport but store National ID
            $passportPath = $request->hasFile('passport')
            ? $request->file('passport')->store('jobApply/id', 'public')
            : null;

            // table column is visa but store Family Member record
            $visaPath = $request->hasFile('visa')
                ? $request->file('visa')->store('jobApply/familyMembers', 'public')
                : null;

            // Save certificate files
            $certificatePaths = [];
            if ($request->hasFile('certificates')) {
                foreach ($request->file('certificates') as $certificate) {
                    $certificatePaths[] = $certificate->store('jobApply/certificates', 'public');
                }
            }
    
            // Save the job application to the database
            $newCV = JobApply::create([
                'name' => $validatedData['name'],
                'date_of_birth' => $validatedData['date_of_birth'],
                'gender' => $validatedData['gender'],
                'height' => $validatedData['height'],
                'weight' => $validatedData['weight'],
                'ethnicity' => $validatedData['ethnicity'],
                'religion' => $validatedData['religion'],
                'phone' => $validatedData['phone'],
                'email' => $validatedData['email'],
                'viber' => $validatedData['viber'],
                'current_address' => $validatedData['current_address'],
                'service_area' => $validatedData['service_area'],
                'available_townships' => $validatedData['available_townships'] ?? [],
                'experience' => $validatedData['experience'],
                'passport' => $passportPath,
                'visa' => $visaPath,
                'certificates' => $certificatePaths,
                'certificate_details' => $validatedData['certificate_details'],
            ]);


            if($newCV)
            {
                $mj = Mailjet::getClient();

                $body = [
                    'FromEmail' => "noreply@genevacaregiver.com",
                    'FromName' => "Geneva",
                    'Subject' => "A new CV is received.",
                    'MJ-TemplateID' => 7562532,
                    'MJ-TemplateLanguage' => true,
                    'Vars' => [
                        // personal info
                        "name" => $newCV->name ?? '',
                        "date_of_birth" => $newCV->date_of_birth ?? '',
                        "gender" => $newCV->gender ?? '',
                        "height" => $newCV->height ?? '',
                        "weight" => $newCV->weight ?? '',
                        "ethnicity" => $newCV->ethnicity ?? '',
                        "religion" => $newCV->religion ?? '',
                        "language" => $newCV->language ?? '',
                        
                        // Contact info
                        "phone" => $newCV->phone ?? '',
                        "email" => $newCV->email ?? '',
                        "viber" => $newCV->viber ?? '',
                        "current_address" => $newCV->current_address ?? '',
                        "service_area" => $newCV->service_area ?? '',

                        // Contact info 
                        "certificate_details" => $newCV->certificate_details,
                        "experience" => $newCV->experience,
                    ],
                    'Recipients' => [['Email' => 'genevacaregivertraining@gmail.com']]
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
    public function adminJobApplies(Request $request)
    {
        $query = JobApply::query();

        // Apply status filter
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Apply service area filter
        if ($request->filled('service_area')) {
            $query->where('service_area', $request->service_area);
        }

        $jobApplies = $query->orderBy('id', 'desc')->paginate(20)->withQueryString();

        return Inertia::render('Admin/JobApplies/JobApplies', [
            'jobApplies' => $jobApplies,
            'count' => JobApply::count(),
            'filters' => [
                'status' => $request->status,
                'service_area' => $request->service_area,
            ],
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

    // Update status of job apply
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Pending,Contacted,Uncontactable,Refuse job',
        ]);

        $apply = JobApply::findOrFail($id);
        $apply->status = $request->status;
        $apply->save();

        return back()->with('success', 'Status updated successfully.');
    }

}
