<?php

namespace App\Http\Controllers;

use App\Models\CareLogPublicLink;
use App\Models\Patient;
use App\Models\PatientCaregiverAssignment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class CareLogPublicLinkController extends Controller
{
    public function store(Request $request, Patient $patient, PatientCaregiverAssignment $assignment)
    {
        if ((int) $assignment->patient_id !== (int) $patient->id) {
            abort(404);
        }

        if (! $assignment->isActive()) {
            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'Assignment is not active; cannot create a public link.',
                ], 422);
            }

            return back()->with('error', 'Assignment is not active; cannot create a public link.');
        }

        $link = CareLogPublicLink::firstOrCreate(
            ['patient_caregiver_assignment_id' => $assignment->id],
            [
                'uuid' => (string) Str::uuid(),
                'created_by' => Auth::id(),
            ]
        );

        $url = route('public.care-log.show', ['uuid' => $link->uuid]);

        if ($request->wantsJson()) {
            return response()->json(['url' => $url, 'uuid' => $link->uuid]);
        }

        return back()->with('public_care_log_url', $url);
    }
}
