<?php

namespace Tests\Feature;

use App\Models\CV;
use App\Models\CaseRecord;
use App\Models\JobApply;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AdminRecordDeleteTest extends TestCase
{
    use DatabaseTransactions;

    public function test_admin_can_delete_a_job_application_by_typing_the_candidate_name(): void
    {
        Storage::fake('public');
        Storage::disk('public')->put('jobApply/id/passport.jpg', 'passport');
        Storage::disk('public')->put('jobApply/certificates/cert.jpg', 'certificate');

        $admin = $this->createAdminUser();
        $cv = $this->createCv($admin);
        $apply = JobApply::create([
            'name' => 'Daw Hla',
            'service_area' => 'Yangon',
            'source' => 'manual',
            'decision' => 'recruit',
            'status' => 'recruit',
            'cv_id' => $cv->id,
            'passport' => 'jobApply/id/passport.jpg',
            'certificates' => ['jobApply/certificates/cert.jpg'],
        ]);

        $this->actingAs($admin)
            ->from(route('admin.job.apply'))
            ->delete(route('admin.job.apply.destroy', $apply->id), [
                'confirm_name' => '  Daw Hla  ',
            ])
            ->assertRedirect(route('admin.job.apply'));

        $this->assertDatabaseMissing('job_applies', ['id' => $apply->id]);
        $this->assertDatabaseHas('c_v_s', ['id' => $cv->id]);
        Storage::disk('public')->assertMissing('jobApply/id/passport.jpg');
        Storage::disk('public')->assertMissing('jobApply/certificates/cert.jpg');
    }

    public function test_job_application_is_kept_when_the_typed_name_does_not_match(): void
    {
        $admin = $this->createAdminUser();
        $apply = $this->createApply(['name' => 'Daw Hla']);

        $this->actingAs($admin)
            ->from(route('admin.job.apply'))
            ->delete(route('admin.job.apply.destroy', $apply->id), [
                'confirm_name' => 'Daw Mya',
            ])
            ->assertRedirect(route('admin.job.apply'))
            ->assertSessionHasErrors('confirm_name');

        $this->assertDatabaseHas('job_applies', ['id' => $apply->id]);
    }

    public function test_job_application_delete_requires_a_confirm_name(): void
    {
        $admin = $this->createAdminUser();
        $apply = $this->createApply();

        $this->actingAs($admin)
            ->from(route('admin.job.apply'))
            ->delete(route('admin.job.apply.destroy', $apply->id), [])
            ->assertSessionHasErrors('confirm_name');

        $this->assertDatabaseHas('job_applies', ['id' => $apply->id]);
    }

    public function test_guest_cannot_delete_a_job_application(): void
    {
        $apply = $this->createApply();

        $this->delete(route('admin.job.apply.destroy', $apply->id), [
            'confirm_name' => $apply->name,
        ])->assertRedirect(route('login'));

        $this->assertDatabaseHas('job_applies', ['id' => $apply->id]);
    }

    public function test_missing_job_application_returns_not_found(): void
    {
        $admin = $this->createAdminUser();

        $this->actingAs($admin)
            ->delete(route('admin.job.apply.destroy', 999999999), [
                'confirm_name' => 'Nobody',
            ])
            ->assertNotFound();
    }

    public function test_admin_can_delete_a_case_by_typing_the_name(): void
    {
        $admin = $this->createAdminUser();
        $patient = $this->createPatient();
        $case = $this->createCase([
            'name' => 'U Aung',
            'patient_id' => $patient->id,
            'status' => 'confirmed',
        ]);

        $this->actingAs($admin)
            ->from(route('admin.cases.index'))
            ->delete(route('admin.cases.destroy', $case), [
                'confirm_name' => 'U Aung',
            ])
            ->assertRedirect(route('admin.cases.index'));

        $this->assertDatabaseMissing('case_records', ['id' => $case->id]);
        $this->assertDatabaseHas('patients', ['id' => $patient->id]);
    }

    public function test_case_is_kept_when_the_typed_name_does_not_match(): void
    {
        $admin = $this->createAdminUser();
        $case = $this->createCase(['name' => 'U Aung']);

        $this->actingAs($admin)
            ->from(route('admin.cases.index'))
            ->delete(route('admin.cases.destroy', $case), [
                'confirm_name' => 'Daw Mya',
            ])
            ->assertRedirect(route('admin.cases.index'))
            ->assertSessionHasErrors('confirm_name');

        $this->assertDatabaseHas('case_records', ['id' => $case->id]);
    }

    public function test_non_admin_cannot_delete_a_case(): void
    {
        $user = User::query()->create([
            'name' => 'Regular User',
            'email' => 'regular-'.uniqid('', true).'@example.com',
            'password' => 'password',
            'is_admin' => false,
        ]);
        $case = $this->createCase();

        $this->actingAs($user)
            ->delete(route('admin.cases.destroy', $case), [
                'confirm_name' => $case->name,
            ])
            ->assertRedirect('/');

        $this->assertDatabaseHas('case_records', ['id' => $case->id]);
    }

    public function test_deleting_one_job_application_does_not_remove_other_applications(): void
    {
        $admin = $this->createAdminUser();
        $target = $this->createApply(['name' => 'Daw Hla']);
        $other = $this->createApply(['name' => 'Daw Hla']);
        $untouched = $this->createApply(['name' => 'U Kyaw']);

        $this->actingAs($admin)
            ->from(route('admin.job.apply'))
            ->delete(route('admin.job.apply.destroy', $target->id), [
                'confirm_name' => 'Daw Hla',
            ])
            ->assertRedirect(route('admin.job.apply'));

        $this->assertDatabaseMissing('job_applies', ['id' => $target->id]);
        $this->assertDatabaseHas('job_applies', ['id' => $other->id]);
        $this->assertDatabaseHas('job_applies', ['id' => $untouched->id]);
    }

    public function test_deleting_one_case_does_not_remove_other_cases(): void
    {
        $admin = $this->createAdminUser();
        $target = $this->createCase(['name' => 'U Aung']);
        $other = $this->createCase(['name' => 'U Aung']);
        $untouched = $this->createCase(['name' => 'Daw Mya']);

        $this->actingAs($admin)
            ->from(route('admin.cases.index'))
            ->delete(route('admin.cases.destroy', $target), [
                'confirm_name' => 'U Aung',
            ])
            ->assertRedirect(route('admin.cases.index'));

        $this->assertDatabaseMissing('case_records', ['id' => $target->id]);
        $this->assertDatabaseHas('case_records', ['id' => $other->id]);
        $this->assertDatabaseHas('case_records', ['id' => $untouched->id]);
    }

    public function test_job_application_delete_does_not_remove_linked_cv(): void
    {
        $admin = $this->createAdminUser();
        $cv = $this->createCv($admin);
        $apply = $this->createApply([
            'name' => 'Linked Candidate',
            'cv_id' => $cv->id,
            'decision' => 'recruit',
            'status' => 'recruit',
        ]);
        $otherApply = $this->createApply([
            'name' => 'Other Candidate',
            'cv_id' => null,
        ]);

        $this->actingAs($admin)
            ->from(route('admin.job.apply'))
            ->delete(route('admin.job.apply.destroy', $apply->id), [
                'confirm_name' => 'Linked Candidate',
            ])
            ->assertRedirect(route('admin.job.apply'));

        $this->assertDatabaseMissing('job_applies', ['id' => $apply->id]);
        $this->assertDatabaseHas('c_v_s', ['id' => $cv->id]);
        $this->assertDatabaseHas('job_applies', ['id' => $otherApply->id]);
    }

    private function createAdminUser(): User
    {
        return User::query()->create([
            'name' => 'Delete Tester',
            'email' => 'delete-'.uniqid('', true).'@example.com',
            'password' => 'password',
            'is_admin' => true,
        ]);
    }

    private function createApply(array $attributes = []): JobApply
    {
        return JobApply::create(array_merge([
            'name' => 'Candidate',
            'service_area' => 'Yangon',
            'source' => 'manual',
            'decision' => 'pending',
            'status' => 'pending',
        ], $attributes));
    }

    private function createCv(User $user): CV
    {
        return CV::create([
            'user_id' => $user->id,
            'full_name' => 'Linked Caregiver',
            'gender' => 'Female',
        ]);
    }

    private function createCase(array $attributes = []): CaseRecord
    {
        return CaseRecord::create(array_merge([
            'branch' => 'Yangon',
            'name' => 'Test Client',
            'status' => 'open',
            'care_type' => 'elder',
        ], $attributes));
    }

    private function createPatient(): Patient
    {
        return Patient::create([
            'type' => 'Elder',
            'first_name' => 'Patient',
            'last_name' => 'Keep',
            'gender' => 'Male',
            'service_area' => 'Yangon',
        ]);
    }
}
