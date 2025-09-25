<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Mailjet\LaravelMailjet\Facades\Mailjet;
use Mailjet\Resources;

class AssessmentController extends Controller
{
    public function assessmentCenter() {
        return Inertia::render('Assessment/SkillAssessment');
    }

    public function submitAssessment(Request $request)
    {
        $validated = $request->validate([
            'fullName' => 'required|string|max:255',
            'dateOfBirth' => 'required|date',
            'gender' => 'required|in:Male,Female,Other',
            'phone' => 'required|string|max:50',
            'email' => 'required|email|max:255',
            'address' => 'required|string',
            'education' => 'required|string',
            'certifications' => 'nullable|string',
            'experienceYears' => 'required|string|max:10',
            'experienceDetails' => 'required|string',
        ]);

        $newAssessment =Assessment::create([
            'full_name' => $validated['fullName'],
            'date_of_birth' => $validated['dateOfBirth'],
            'gender' => $validated['gender'],
            'phone' => $validated['phone'],
            'email' => $validated['email'],
            'address' => $validated['address'],
            'education' => $validated['education'],
            'certifications' => $validated['certifications'] ?? null,
            'experience_years' => $validated['experienceYears'],
            'experience_details' => $validated['experienceDetails'],
            'status' => 'pending',
        ]);

        $mj = Mailjet::getClient();

        if ($newAssessment){
            $body = [
                'FromEmail' => "noreply@heartyaid.com",
                'FromName' => "Hearty Aid",
                'Subject' => "New Skill Assessment Submission received!",
                'MJ-TemplateID' => 7337138,
                'MJ-TemplateLanguage' => true,
                'Vars' => [
                    'name' => $newAssessment->full_name,
                    'email' => $newAssessment->email,
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

        return redirect()->route('assessment.submission.success');
    }

    public function assessmentSubmissionSuccess() {
        return Inertia::render('Assessment/AssessmentSubmissionSuccessful');
    }


    // Admin view for all assessments
    public function adminAssessments() {
        $assessments = Assessment::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Assessment/AdminAssessments', [
            'assessments' => $assessments,
        ]);
    }
}
