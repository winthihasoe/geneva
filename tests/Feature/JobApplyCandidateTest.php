<?php

namespace Tests\Feature;

use App\Models\JobApply;
use App\Models\User;
use App\Support\PerformanceRecordImporter;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Inertia\Testing\AssertableInertia as Assert;
use Mailjet\Client;
use Mailjet\LaravelMailjet\Facades\Mailjet;
use Mailjet\Response;
use Mockery;
use Tests\TestCase;

class JobApplyCandidateTest extends TestCase
{
    use DatabaseTransactions;

    public function test_importer_writes_recruitment_rows_to_job_applies(): void
    {
        $importer = new PerformanceRecordImporter;
        $row = $this->importRow([
            'decision' => 'pending',
            'interview_score' => '80',
        ]);

        $summary = $importer->importPayload(['recruitment' => [$row]]);

        $this->assertSame(1, $summary['recruitment']['created']);

        $apply = JobApply::query()->where('name', 'Daw Hla')->first();
        $this->assertNotNull($apply);
        $this->assertSame('import', $apply->source);
        $this->assertSame('Yangon', $apply->service_area);
        $this->assertSame('pending', $apply->decision);
        $this->assertSame('pending', $apply->status);
        $this->assertSame('YGN Recruit', $apply->source_sheet);
        $this->assertSame(2, $apply->source_row);
        $this->assertNull($apply->phone);
        $this->assertNull($apply->date_of_birth);
    }

    public function test_importer_updates_pipeline_without_clearing_profile_fields(): void
    {
        $importer = new PerformanceRecordImporter;
        $importer->importPayload(['recruitment' => [$this->importRow()]]);

        $apply = JobApply::query()->where('name', 'Daw Hla')->first();
        $apply->update([
            'phone' => '091111111',
            'passport' => 'jobApply/id/keep.jpg',
            'current_address' => 'Bahan',
        ]);

        $summary = $importer->importPayload([
            'recruitment' => [$this->importRow([
                'decision' => 'recruit',
                'interview_score' => '90',
                'interviewed_by' => 'Thida',
            ])],
        ]);

        $this->assertSame(1, $summary['recruitment']['updated']);

        $fresh = $apply->fresh();
        $this->assertSame('091111111', $fresh->phone);
        $this->assertSame('jobApply/id/keep.jpg', $fresh->passport);
        $this->assertSame('Bahan', $fresh->current_address);
        $this->assertSame('recruit', $fresh->decision);
        $this->assertSame('recruit', $fresh->status);
        $this->assertSame(90, $fresh->interview_score);
        $this->assertSame('Thida', $fresh->interviewed_by);
        $this->assertSame('import', $fresh->source);
    }

    public function test_public_apply_requires_profile_fields(): void
    {
        $this->from(route('job.apply'))
            ->post(route('job.apply.store'), [
                'name' => 'Only Name',
            ])
            ->assertRedirect(route('job.apply'));

        $this->assertDatabaseMissing('job_applies', ['name' => 'Only Name']);
    }

    public function test_public_apply_sets_source_to_website(): void
    {
        $this->mockMailjet();

        $this->post(route('job.apply.store'), $this->publicPayload())
            ->assertRedirect(route('job.apply.success'));

        $apply = JobApply::query()->where('name', 'Public Applicant')->first();
        $this->assertNotNull($apply);
        $this->assertSame('website', $apply->source);
        $this->assertSame('pending', $apply->decision);
        $this->assertSame('Pending', $apply->status);
        $this->assertSame('091234567', $apply->phone);
        $this->assertSame('Female', $apply->gender);
    }

    public function test_admin_manual_create_allows_sparse_fields(): void
    {
        $admin = $this->createAdminUser();

        $this->actingAs($admin)
            ->post(route('admin.job.apply.store'), [
                'name' => 'Walk In',
                'service_area' => 'Yangon',
                'decision' => 'pending',
            ])
            ->assertRedirect(route('admin.job.apply'));

        $apply = JobApply::query()->where('name', 'Walk In')->first();
        $this->assertNotNull($apply);
        $this->assertSame('manual', $apply->source);
        $this->assertSame('Yangon', $apply->service_area);
        $this->assertNull($apply->phone);
        $this->assertNull($apply->date_of_birth);
        $this->assertSame('pending', $apply->decision);
        $this->assertSame('pending', $apply->status);
    }

    public function test_status_combines_contact_and_hire_values(): void
    {
        $this->assertSame('pending', JobApply::alignedStatus('Pending'));
        $this->assertSame('contacted', JobApply::alignedStatus('Contacted'));
        $this->assertSame('uncontactable', JobApply::alignedStatus('Uncontactable'));
        $this->assertSame('deny', JobApply::alignedStatus('Denied'));
        $this->assertSame('deny', JobApply::alignedStatus('Refuse job'));
        $this->assertSame('recruit', JobApply::alignedStatus('recruit'));
        $this->assertSame('part_time', JobApply::alignedStatus('Part Time'));
    }

    public function test_admin_manual_create_saves_gender_and_staff(): void
    {
        $admin = $this->createAdminUser();
        $superAdmin = User::query()->create([
            'name' => 'Super Interviewer',
            'email' => 'super-'.uniqid('', true).'@example.com',
            'password' => 'password',
            'is_super_admin' => true,
        ]);
        $caregiver = User::query()->create([
            'name' => 'Caregiver Only',
            'email' => 'cg-'.uniqid('', true).'@example.com',
            'password' => 'password',
            'is_caregiver' => true,
        ]);

        $this->actingAs($admin)
            ->post(route('admin.job.apply.store'), [
                'name' => 'Walk In Gender',
                'service_area' => 'Yangon',
                'decision' => 'pending',
                'gender' => 'Female',
                'coordinated_by' => 'Front desk',
                'interviewed_by' => [$admin->name, $superAdmin->name],
            ])
            ->assertRedirect(route('admin.job.apply'));

        $apply = JobApply::query()->where('name', 'Walk In Gender')->first();
        $this->assertNotNull($apply);
        $this->assertSame('Female', $apply->gender);
        $this->assertSame('Front desk', $apply->coordinated_by);
        $this->assertSame($admin->name.', Super Interviewer', $apply->interviewed_by);

        $this->actingAs($admin)
            ->from(route('admin.job.apply.create'))
            ->post(route('admin.job.apply.store'), [
                'name' => 'Bad Staff',
                'service_area' => 'Yangon',
                'decision' => 'pending',
                'gender' => 'Other',
                'coordinated_by' => $caregiver->name,
                'interviewed_by' => [$caregiver->name],
            ])
            ->assertRedirect(route('admin.job.apply.create'))
            ->assertSessionHasErrors(['gender', 'interviewed_by'])
            ->assertSessionDoesntHaveErrors('coordinated_by');

        $this->assertDatabaseMissing('job_applies', ['name' => 'Bad Staff']);
    }

    public function test_update_keeps_imported_coordinator_name(): void
    {
        $admin = $this->createAdminUser();
        $apply = JobApply::create([
            'name' => 'Imported Candidate',
            'service_area' => 'Yangon',
            'source' => 'import',
            'decision' => 'pending',
            'status' => 'pending',
            'coordinated_by' => 'Aye',
            'interviewed_by' => 'Thida',
        ]);

        $this->actingAs($admin)
            ->put(route('admin.job.apply.update', $apply->id), [
                'name' => 'Imported Candidate',
                'service_area' => 'Yangon',
                'decision' => 'pending',
                'coordinated_by' => 'Aye',
                'interviewed_by' => ['Thida', $admin->name],
            ])
            ->assertRedirect(route('admin.job.apply.single', $apply->id));

        $fresh = $apply->fresh();
        $this->assertSame('Aye', $fresh->coordinated_by);
        $this->assertSame('Thida, '.$admin->name, $fresh->interviewed_by);
    }

    public function test_admin_can_save_contacted_status(): void
    {
        $admin = $this->createAdminUser();
        $apply = JobApply::create([
            'name' => 'Status Candidate',
            'service_area' => 'Yangon',
            'source' => 'manual',
            'decision' => 'pending',
            'status' => 'pending',
        ]);

        $this->actingAs($admin)
            ->put(route('admin.job.apply.update', $apply->id), [
                'name' => 'Status Candidate',
                'service_area' => 'Yangon',
                'decision' => 'contacted',
            ])
            ->assertRedirect(route('admin.job.apply.single', $apply->id));

        $fresh = $apply->fresh();
        $this->assertSame('contacted', $fresh->status);
        $this->assertSame('contacted', $fresh->decision);
    }

    public function test_website_status_stays_on_pipeline_save(): void
    {
        $admin = $this->createAdminUser();
        $apply = JobApply::create([
            'name' => 'Web Applicant',
            'service_area' => 'Yangon',
            'source' => 'website',
            'status' => 'Contacted',
            'decision' => 'pending',
            'phone' => '099999999',
        ]);

        $this->actingAs($admin)
            ->put(route('admin.job.apply.update', $apply->id), [
                'name' => 'Web Applicant',
                'service_area' => 'Yangon',
                'decision' => 'Contacted',
                'interview_note' => 'Called back',
            ])
            ->assertRedirect(route('admin.job.apply.single', $apply->id));

        $fresh = $apply->fresh();
        $this->assertSame('Contacted', $fresh->status);
        $this->assertSame('pending', $fresh->decision);
        $this->assertSame('Called back', $fresh->interview_note);
    }

    public function test_import_does_not_overwrite_website_status(): void
    {
        JobApply::create([
            'name' => 'Daw Hla',
            'service_area' => 'Yangon',
            'source' => 'website',
            'status' => 'Uncontactable',
            'decision' => 'pending',
        ]);

        $summary = (new PerformanceRecordImporter)->importPayload([
            'recruitment' => [$this->importRow([
                'candidate_name' => 'Daw Hla',
                'decision' => 'recruit',
            ])],
        ]);

        $this->assertSame(1, $summary['recruitment']['created']);
        $website = JobApply::query()
            ->where('name', 'Daw Hla')
            ->where('source', 'website')
            ->first();
        $this->assertSame('Uncontactable', $website->status);
        $this->assertSame('pending', $website->decision);
    }

    public function test_admin_job_apply_pages_replace_recruitment(): void
    {
        $admin = $this->createAdminUser();

        $this->actingAs($admin)
            ->get(route('admin.job.apply.create'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/JobApplies/JobApplyForm')
                ->has('branches')
                ->has('genders')
                ->has('staff')
                ->has('decisions')
                ->where('genders', ['Male', 'Female'])
                ->where('staff', fn ($staff) => collect($staff)->contains(
                    fn ($person) => $person['name'] === $admin->name
                ))
            );

        $this->actingAs($admin)
            ->get('/admin/recruitment')
            ->assertRedirect('/admin/job-applies');
    }

    private function importRow(array $overrides = []): array
    {
        return array_merge([
            'branch' => 'Yangon',
            'candidate_name' => 'Daw Hla',
            'cv_reported_date' => '2026-01-15',
            'coordinated_by' => 'Aye',
            'interview_date' => '2026-01-20',
            'interviewed_by' => 'Mya',
            'interview_score' => '80',
            'decision' => 'pending',
            'training_start' => '2026-01-25',
            'assessment_date' => '2026-02-01',
            'assessment_score' => 'A',
            'source_sheet' => 'YGN Recruit',
            'source_row' => 2,
        ], $overrides);
    }

    private function publicPayload(): array
    {
        return [
            'name' => 'Public Applicant',
            'date_of_birth' => '1994-05-12',
            'gender' => 'Female',
            'height' => '160',
            'weight' => '50',
            'ethnicity' => 'Bamar',
            'religion' => 'Buddhist',
            'phone' => '091234567',
            'email' => 'public@example.com',
            'current_address' => 'Yangon',
            'service_area' => 'Yangon',
            'experience' => 'Home care',
            'certificate_details' => 'First aid',
        ];
    }

    private function createAdminUser(): User
    {
        return User::query()->create([
            'name' => 'Job Apply Tester',
            'email' => 'job-apply-'.uniqid('', true).'@example.com',
            'password' => 'password',
            'is_admin' => true,
        ]);
    }

    private function mockMailjet(): void
    {
        $response = Mockery::mock(Response::class);
        $response->shouldReceive('success')->andReturn(true);

        $client = Mockery::mock(Client::class);
        $client->shouldReceive('post')->andReturn($response);

        Mailjet::shouldReceive('getClient')->andReturn($client);
    }
}
