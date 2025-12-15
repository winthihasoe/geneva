<?php

namespace App\Http\Controllers;

use App\Models\PatientCaregiverAssignment;
use App\Models\CV;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PatientCaregiverAssignmentController extends Controller
{
    public function assign(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'cv_id' => 'required|exists:c_v_s,id',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'assignment_reason' => 'nullable|string|max:500',
        ]);

        // End any current active assignment
        $currentAssignments = PatientCaregiverAssignment::where('patient_id', $validated['patient_id'])
            ->whereNull('end_date')
            ->get();

        foreach ($currentAssignments as $currentAssignment) {
            $currentAssignment->update(['end_date' => now()]);
            // Update previous CV status to Available
            CV::where('id', $currentAssignment->cv_id)->update(['status' => 'Available']);
        }
        // Create new assignment
        PatientCaregiverAssignment::create([
            'patient_id' => $validated['patient_id'],
            'cv_id' => $validated['cv_id'],
            'assigned_by' => Auth::id(),
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'assignment_reason' => $validated['assignment_reason'],
        ]);

        // Update CV status to Occupied
        CV::where('id', $validated['cv_id'])->update(['status' => 'Occupied']);

        return redirect()->back()->with('success', 'Caregiver assigned successfully');
    }

    public function end(Request $request, $id)
    {
        $validated = $request->validate([
            'end_reason' => 'required|string|max:500',
        ]);

        $assignment = PatientCaregiverAssignment::findOrFail($id);
        $assignment->update([
            'end_date' => now(),
            'end_reason' => $validated['end_reason'],
        ]);

        // Update CV status to Available
        CV::where('id', $assignment->cv_id)->update(['status' => 'Available']);

        return redirect()->back()->with('success', 'Assignment ended successfully');
    }
}
