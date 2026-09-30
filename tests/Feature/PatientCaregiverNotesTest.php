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
                'feedback_type' => 'daily',
                'follow_up' => 'one_day_before_completion',
                'body' => 'Continue the duty.',
            ])
            ->assertRedirect()
            ->assertSessionHas('success', 'Feedback saved.');

        $this->actingAs($admin)
            ->post(route('admin.patient.feedbacks.store', $patient), [
                'feedback_type' => 'monthly',
                'follow_up' => 'three_days_before_month',
                'body' => 'Asked for an earlier start time.',
            ])
            ->assertRedirect();

        $this->assertSame(2, PatientFeedback::query()->where('patient_id', $patient->id)->count());
        $this->assertSame(0, $assignment->notes()->count());

        $latest = PatientFeedback::query()
            ->where('patient_id', $patient->id)
            ->orderByDesc('id')
            ->first();

        $this->assertSame($admin->id, $latest->recorded_by);
        $this->assertSame('monthly', $latest->feedback_type);
        $this->assertSame('three_days_before_month', $latest->follow_up);

        $this->actingAs($admin)
            ->get(route('admin.patient', $patient))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->has('patientFeedbacks', 2)
                ->where('patientFeedbacks.0.feedback_type', 'monthly')
                ->where('patientFeedbacks.0.feedback_type_label', 'Monthly feedback')
                ->where('patientFeedbacks.0.follow_up_label', '3 days before 1 month')
                ->where('patientFeedbacks.1.feedback_type', 'daily')
                ->where('patientFeedbacks.1.follow_up_label', '1 day before duty completion')
            );
    }

    public function test_patient_feedback_follow_up_must_match_the_type(): void
    {
        $admin = $this->createAdminUser();
        $patient = $this->createPatient();

        $this->actingAs($admin)
            ->post(route('admin.patient.feedbacks.store', $patient), [
                'feedback_type' => 'daily',
                'follow_up' => 'three_days_before_month',
                'body' => 'Continue the duty.',
            ])
            ->assertSessionHasErrors('follow_up');

        $this->actingAs($admin)
            ->post(route('admin.patient.feedbacks.store', $patient), [
                'feedback_type' => 'monthly',
                'follow_up' => 'one_day_before_completion',
                'body' => 'Continue the duty.',
            ])
            ->assertSessionHasErrors('follow_up');

        $this->assertSame(0, PatientFeedback::query()->where('patient_id', $patient->id)->count());
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

    public function test_feedback_sheet_lists_patients_by_type_and_label(): void
    {
        $admin = $this->createAdminUser();
        $token = 'Fb'.substr(uniqid(), -8);
        $elder = Patient::create([
            'type' => 'Elder',
            'first_name' => $token.' Elder',
            'last_name' => 'Kumar',
            'gender' => 'Male',
            'service_area' => 'Mandalay',
        ]);
        $baby = Patient::create([
            'type' => 'Baby',
            'first_name' => $token.' Baby',
            'last_name' => 'Aye',
            'gender' => 'Female',
            'service_area' => 'Yangon',
        ]);

        $older = PatientFeedback::create([
            'patient_id' => $elder->id,
            'body' => 'Older daily note.',
            'feedback_type' => 'daily',
            'follow_up' => 'after_1_duty',
            'recorded_by' => $admin->id,
        ]);
        PatientFeedback::query()->whereKey($older->id)->update([
            'created_at' => '2026-09-01 09:00:00',
            'updated_at' => '2026-09-01 09:00:00',
        ]);

        $latest = PatientFeedback::create([
            'patient_id' => $elder->id,
            'body' => 'Continue after the first duty.',
            'feedback_type' => 'daily',
            'follow_up' => 'after_1_duty',
            'recorded_by' => $admin->id,
        ]);
        PatientFeedback::query()->whereKey($latest->id)->update([
            'created_at' => '2026-09-20 09:00:00',
            'updated_at' => '2026-09-20 09:00:00',
        ]);

        PatientFeedback::create([
            'patient_id' => $baby->id,
            'body' => 'Check before the month ends.',
            'feedback_type' => 'monthly',
            'follow_up' => 'three_days_before_month',
            'recorded_by' => $admin->id,
        ]);

        $this->actingAs($admin)
            ->get(route('admin.patient.feedbacks', ['search' => $token]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Patient/AdminFeedbacks')
                ->has('columns', 6)
                ->where('columns.0.type_label', 'Daily feedback')
                ->where('columns.0.follow_up_label', 'After 1 duty')
                ->where('columns.2.follow_up_label', 'After duty is finished')
                ->where('columns.3.type_label', 'Monthly feedback')
                ->where('columns.4.follow_up_label', '3 days before 1 month')
                ->has('patients.data', 2)
                ->where('patients.data.0.name', $token.' Baby Aye')
                ->where('patients.data.0.on_duty', false)
                ->where('patients.data.0.caregiver_name', null)
                ->where('patients.data.0.feedbacks.monthly.three_days_before_month.body', 'Check before the month ends.')
                ->where('patients.data.0.feedbacks.monthly.three_days_before_month.staff_name', 'Notes Tester')
                ->where('patients.data.1.name', $token.' Elder Kumar')
                ->where('patients.data.1.feedbacks.daily.after_1_duty.body', 'Continue after the first duty.')
                ->where('patients.data.1.feedbacks.daily.after_1_duty.recorded_at', '20-09-2026')
                ->where('patients.data.1.feedbacks.daily.after_1_duty.staff_name', 'Notes Tester')
            );

        $this->actingAs($admin)
            ->get(route('admin.patient.feedbacks', [
                'search' => $token,
                'service_area' => 'Yangon',
                'type' => 'Baby',
            ]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->has('patients.data', 1)
                ->where('patients.data.0.id', $baby->id)
            );
    }

    public function test_feedback_sheet_shows_the_current_or_last_caregiver(): void
    {
        $admin = $this->createAdminUser();
        $token = 'Cg'.substr(uniqid(), -8);
        $endedPatient = Patient::create([
            'type' => 'Elder',
            'first_name' => $token.' Ended',
            'last_name' => 'Patient',
            'gender' => 'Male',
            'service_area' => 'Mandalay',
        ]);
        $onDutyPatient = Patient::create([
            'type' => 'Baby',
            'first_name' => $token.' Active',
            'last_name' => 'Patient',
            'gender' => 'Female',
            'service_area' => 'Yangon',
        ]);

        $first = $this->createAssignment($admin, $onDutyPatient, 'First Caregiver');
        $first->update([
            'start_date' => '2026-01-05',
            'end_date' => '2026-03-01',
            'level' => 'Skilled',
            'duration' => 'Daily',
            'assignment_reason' => 'Day',
        ]);
        $current = $this->createAssignment($admin, $onDutyPatient, 'Current Caregiver');
        $current->update([
            'start_date' => '2026-04-02',
            'level' => 'Advanced',
            'duration' => 'Monthly',
            'assignment_reason' => 'Night',
        ]);

        $last = $this->createAssignment($admin, $endedPatient, 'Last Caregiver');
        $last->update([
            'start_date' => '2026-02-01',
            'end_date' => '2026-08-15',
            'level' => 'Special Nurse',
            'duration' => 'Daily',
            'assignment_reason' => '24 hr',
        ]);

        $this->actingAs($admin)
            ->get(route('admin.patient.feedbacks', ['search' => $token]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->has('patients.data', 2)
                ->where('patients.data.0.name', $token.' Active Patient')
                ->where('patients.data.0.on_duty', true)
                ->where('patients.data.0.caregiver_name', 'Current Caregiver')
                ->where('patients.data.0.start_date', '05-01-2026')
                ->where('patients.data.0.end_date', null)
                ->where('patients.data.0.level', 'Advanced')
                ->where('patients.data.0.duty', 'Night')
                ->where('patients.data.0.duration', 'Monthly')
                ->where('patients.data.1.name', $token.' Ended Patient')
                ->where('patients.data.1.on_duty', false)
                ->where('patients.data.1.caregiver_name', 'Last Caregiver')
                ->where('patients.data.1.start_date', '01-02-2026')
                ->where('patients.data.1.end_date', '15-08-2026')
                ->where('patients.data.1.level', 'Special Nurse')
                ->where('patients.data.1.duty', '24 hr')
                ->where('patients.data.1.duration', 'Daily')
            );
    }

    public function test_existing_feedback_can_be_edited_from_the_sheet(): void
    {
        $admin = $this->createAdminUser();
        $patient = $this->createPatient();
        $feedback = PatientFeedback::create([
            'patient_id' => $patient->id,
            'body' => 'Continue the duty.',
            'feedback_type' => 'daily',
            'follow_up' => 'after_duty_finished',
            'recorded_by' => $admin->id,
        ]);

        $this->actingAs($admin)
            ->put(route('admin.patient.feedbacks.update', $feedback), [
                'body' => 'Duty finished and the family is satisfied.',
            ])
            ->assertRedirect()
            ->assertSessionHas('success', 'Feedback saved.');

        $feedback->refresh();
        $this->assertSame('Duty finished and the family is satisfied.', $feedback->body);
        $this->assertSame($admin->id, $feedback->recorded_by);
        $this->assertSame('daily', $feedback->feedback_type);
        $this->assertSame('after_duty_finished', $feedback->follow_up);
    }

    public function test_additional_assignment_stores_level_duration_and_duty(): void
    {
        $admin = $this->createAdminUser();
        $patient = $this->createPatient();
        $this->createAssignment($admin, $patient, 'Hnin Yu Wai');

        $caregiver = User::query()->create([
            'name' => 'Su Su',
            'email' => 'cg-'.uniqid('', true).'@example.com',
            'password' => 'password',
            'is_caregiver' => true,
        ]);
        $cv = CV::create([
            'user_id' => $caregiver->id,
            'full_name' => 'Su Su',
            'gender' => 'Female',
            'status' => 'Available',
        ]);

        $this->actingAs($admin)
            ->post(route('admin.patient.caregiver.assign.additional'), [
                'patient_id' => $patient->id,
                'cv_id' => $cv->id,
                'start_date' => '2026-09-30',
                'level' => 'Special Nurse',
                'duration' => 'Monthly',
                'assignment_reason' => '24 hr',
            ])
            ->assertRedirect()
            ->assertSessionHas('success', 'Additional caregiver assigned successfully');

        $assignment = PatientCaregiverAssignment::query()
            ->where('patient_id', $patient->id)
            ->where('cv_id', $cv->id)
            ->first();

        $this->assertNotNull($assignment);
        $this->assertSame('Special Nurse', $assignment->level);
        $this->assertSame('Monthly', $assignment->duration);
        $this->assertSame('24 hr', $assignment->assignment_reason);

        $this->actingAs($admin)
            ->get(route('admin.patient', $patient->id))
            ->assertInertia(fn (Assert $page) => $page
                ->where('currentAssignment.1.level', 'Special Nurse')
                ->where('currentAssignment.1.duration', 'Monthly')
                ->where('currentAssignment.1.assignment_reason', '24 hr')
            );
    }

    public function test_additional_assignment_rejects_unknown_level_duration_or_duty(): void
    {
        $admin = $this->createAdminUser();
        $patient = $this->createPatient();
        $assignment = $this->createAssignment($admin, $patient, 'Hnin Yu Wai');

        $this->actingAs($admin)
            ->post(route('admin.patient.caregiver.assign.additional'), [
                'patient_id' => $patient->id,
                'cv_id' => $assignment->cv_id,
                'start_date' => '2026-09-30',
                'level' => 'Expert',
                'duration' => 'Weekly',
                'assignment_reason' => 'Live-out',
            ])
            ->assertSessionHasErrors(['level', 'duration', 'assignment_reason']);
    }

    public function test_assignment_details_can_be_updated(): void
    {
        $admin = $this->createAdminUser();
        $patient = $this->createPatient();
        $assignment = $this->createAssignment($admin, $patient, 'Hnin Yu Wai');

        $this->actingAs($admin)
            ->put(route('admin.patient.caregiver.update', $assignment), [
                'start_date' => '2026-09-01',
                'level' => 'Advanced',
                'duration' => 'Daily',
                'assignment_reason' => 'Night',
            ])
            ->assertRedirect()
            ->assertSessionHas('success', 'Assignment updated.');

        $assignment->refresh();
        $this->assertSame('2026-09-01', $assignment->start_date->toDateString());
        $this->assertSame('Advanced', $assignment->level);
        $this->assertSame('Daily', $assignment->duration);
        $this->assertSame('Night', $assignment->assignment_reason);

        $this->actingAs($admin)
            ->put(route('admin.patient.caregiver.update', $assignment), [
                'start_date' => '2026-09-01',
                'level' => 'Expert',
                'duration' => 'Weekly',
                'assignment_reason' => 'Live-out',
            ])
            ->assertSessionHasErrors(['level', 'duration', 'assignment_reason']);
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
