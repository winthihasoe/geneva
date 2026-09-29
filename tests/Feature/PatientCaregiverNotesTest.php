<?php

namespace Tests\Feature;

use App\Models\CV;
use App\Models\CaregiverAssignmentNote;
use App\Models\Patient;
use App\Models\PatientCaregiverAssignment;
use App\Models\PatientFeedback;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PatientCaregiverNotesTest extends TestCase
{
    use DatabaseTransactions;

    public function test_assignment_keeps_many_feedbacks_and_complaints_with_the_staff_name(): void
    {
        $admin = $this->createAdminUser();
        $patient = $this->createPatient();
        $assignment = $this->createAssignment($admin, $patient, 'Hnin Yu Wai');

        $this->actingAs($admin)
            ->post(route('admin.patient.caregiver.notes.store', $assignment), [
                'kind' => 'complaint',
                'body' => 'Late for the morning duty.',
            ])
            ->assertRedirect()
            ->assertSessionHas('success', 'Complaint saved.');

        $this->actingAs($admin)
            ->post(route('admin.patient.caregiver.notes.store', $assignment), [
                'kind' => 'feedback',
                'body' => 'Family is happy with this caregiver.',
            ])
            ->assertRedirect()
            ->assertSessionHas('success', 'Feedback saved.');

        $notes = CaregiverAssignmentNote::query()
            ->where('patient_caregiver_assignment_id', $assignment->id)
            ->orderBy('id')
            ->get();

        $this->assertCount(2, $notes);
        $this->assertSame('complaint', $notes[0]->kind);
        $this->assertSame('feedback', $notes[1]->kind);
        $this->assertSame($admin->id, $notes[0]->recorded_by);
        $this->assertSame(0, PatientFeedback::query()->where('patient_id', $patient->id)->count());

        $this->actingAs($admin)
            ->get(route('admin.patient', $patient))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->has('currentAssignment.0.notes', 2)
                ->where('currentAssignment.0.notes.0.body', 'Family is happy with this caregiver.')
                ->where('currentAssignment.0.notes.0.kind', 'feedback')
                ->where('currentAssignment.0.notes.0.staff_name', 'Notes Tester')
                ->where('currentAssignment.0.notes.1.kind', 'complaint')
            );
    }

    public function test_patient_feedbacks_stay_on_the_patient(): void
    {
        $admin = $this->createAdminUser();
        $patient = $this->createPatient();
        $assignment = $this->createAssignment($admin, $patient, 'Hnin Yu Wai');

        $this->actingAs($admin)
            ->post(route('admin.patient.feedbacks.store', $patient), [
                'body' => 'Continue the duty.',
            ])
            ->assertRedirect();

        $this->actingAs($admin)
            ->post(route('admin.patient.feedbacks.store', $patient), [
                'body' => 'Asked for an earlier start time.',
            ])
            ->assertRedirect();

        $this->assertSame(2, PatientFeedback::query()->where('patient_id', $patient->id)->count());
        $this->assertSame(0, $assignment->notes()->count());
        $this->assertSame($admin->id, PatientFeedback::query()->where('patient_id', $patient->id)->first()->recorded_by);
    }

    public function test_notes_can_be_deleted(): void
    {
        $admin = $this->createAdminUser();
        $patient = $this->createPatient();
        $assignment = $this->createAssignment($admin, $patient, 'Hnin Yu Wai');

        $complaint = CaregiverAssignmentNote::create([
            'patient_caregiver_assignment_id' => $assignment->id,
            'kind' => 'complaint',
            'body' => 'Late for the morning duty.',
            'recorded_by' => $admin->id,
        ]);
        $feedback = PatientFeedback::create([
            'patient_id' => $patient->id,
            'body' => 'Continue the duty.',
            'recorded_by' => $admin->id,
        ]);

        $this->actingAs($admin)
            ->delete(route('admin.patient.caregiver.notes.destroy', $complaint))
            ->assertRedirect()
            ->assertSessionHas('success', 'Complaint deleted.');

        $this->actingAs($admin)
            ->delete(route('admin.patient.feedbacks.destroy', $feedback))
            ->assertRedirect()
            ->assertSessionHas('success', 'Feedback deleted.');

        $this->assertDatabaseMissing('assignment_notes', ['id' => $complaint->id]);
        $this->assertDatabaseMissing('patient_feedbacks', ['id' => $feedback->id]);
    }

    public function test_blank_note_is_rejected(): void
    {
        $admin = $this->createAdminUser();
        $patient = $this->createPatient();
        $assignment = $this->createAssignment($admin, $patient, 'Hnin Yu Wai');

        $this->actingAs($admin)
            ->post(route('admin.patient.caregiver.notes.store', $assignment), [
                'kind' => 'complaint',
                'body' => '   ',
            ])
            ->assertSessionHasErrors('body');

        $this->assertSame(0, $assignment->notes()->count());
    }

    private function createAdminUser(): User
    {
        return User::query()->create([
            'name' => 'Notes Tester',
            'email' => 'notes-'.uniqid('', true).'@example.com',
            'password' => 'password',
            'is_admin' => true,
        ]);
    }

    private function createPatient(): Patient
    {
        return Patient::create([
            'type' => 'Elder',
            'first_name' => 'Dewa',
            'last_name' => 'Kumar',
            'gender' => 'Male',
            'service_area' => 'Mandalay',
        ]);
    }

    private function createAssignment(User $admin, Patient $patient, string $name): PatientCaregiverAssignment
    {
        $caregiver = User::query()->create([
            'name' => $name,
            'email' => 'cg-'.uniqid('', true).'@example.com',
            'password' => 'password',
            'is_caregiver' => true,
        ]);

        $cv = CV::create([
            'user_id' => $caregiver->id,
            'full_name' => $name,
            'gender' => 'Female',
        ]);

        return PatientCaregiverAssignment::create([
            'patient_id' => $patient->id,
            'cv_id' => $cv->id,
            'assigned_by' => $admin->id,
            'start_date' => '2026-09-11',
        ]);
    }
}
