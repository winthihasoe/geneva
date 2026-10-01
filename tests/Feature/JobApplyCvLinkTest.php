<?php

namespace Tests\Feature;

use App\Models\CV;
use App\Models\JobApply;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class JobApplyCvLinkTest extends TestCase
{
    use DatabaseTransactions;

    public function test_saving_recruit_leaves_cv_unlinked(): void
    {
        $admin = $this->createAdminUser();
        $apply = $this->createApply([
            'name' => 'Recruit Optional',
            'decision' => 'pending',
            'status' => 'pending',
        ]);

        $this->actingAs($admin)
            ->put(route('admin.job.apply.update', $apply->id), [
                'name' => 'Recruit Optional',
                'service_area' => 'Yangon',
                'decision' => 'recruit',
            ])
            ->assertRedirect(route('admin.job.apply.single', $apply->id));

        $fresh = $apply->fresh();
        $this->assertSame('recruit', $fresh->status);
        $this->assertSame('recruit', $fresh->decision);
        $this->assertNull($fresh->cv_id);
    }

    public function test_link_existing_cv_from_recruit_candidate(): void
    {
        $admin = $this->createAdminUser();
        $apply = $this->createApply([
            'name' => 'Daw Link',
            'phone' => '09111222333',
            'decision' => 'recruit',
            'status' => 'recruit',
        ]);
        $cv = $this->createCv($admin, [
            'full_name' => 'Daw Link',
            'phone' => '09111222333',
        ]);

        $this->actingAs($admin)
            ->post(route('admin.job.apply.link-cv', $apply->id), [
                'cv_id' => $cv->id,
            ])
            ->assertRedirect(route('admin.job.apply.single', $apply->id));

        $this->assertSame($cv->id, $apply->fresh()->cv_id);
    }

    public function test_pending_candidate_cannot_link_a_cv(): void
    {
        $admin = $this->createAdminUser();
        $apply = $this->createApply([
            'decision' => 'pending',
            'status' => 'pending',
        ]);
        $cv = $this->createCv($admin, ['full_name' => 'Someone Else']);

        $this->actingAs($admin)
            ->post(route('admin.job.apply.link-cv', $apply->id), [
                'cv_id' => $cv->id,
            ])
            ->assertForbidden();

        $this->assertNull($apply->fresh()->cv_id);
    }

    public function test_second_link_is_rejected(): void
    {
        $admin = $this->createAdminUser();
        $first = $this->createCv($admin, ['full_name' => 'First CV']);
        $second = $this->createCv($admin, ['full_name' => 'Second CV']);
        $apply = $this->createApply([
            'decision' => 'recruit',
            'status' => 'recruit',
            'cv_id' => $first->id,
        ]);

        $this->actingAs($admin)
            ->post(route('admin.job.apply.link-cv', $apply->id), [
                'cv_id' => $second->id,
            ])
            ->assertForbidden();

        $this->assertSame($first->id, $apply->fresh()->cv_id);
    }

    public function test_unlink_clears_the_cv_and_keeps_the_cv_record(): void
    {
        $admin = $this->createAdminUser();
        $cv = $this->createCv($admin, ['full_name' => 'Wrong CV']);
        $apply = $this->createApply([
            'name' => 'Wrong Link Candidate',
            'decision' => 'recruit',
            'status' => 'recruit',
            'cv_id' => $cv->id,
        ]);

        $this->actingAs($admin)
            ->delete(route('admin.job.apply.unlink-cv', $apply->id))
            ->assertRedirect(route('admin.job.apply.single', $apply->id));

        $this->assertNull($apply->fresh()->cv_id);
        $this->assertNotNull($cv->fresh());

        $replacement = $this->createCv($admin, ['full_name' => 'Right CV']);

        $this->actingAs($admin)
            ->post(route('admin.job.apply.link-cv', $apply->id), [
                'cv_id' => $replacement->id,
            ])
            ->assertRedirect(route('admin.job.apply.single', $apply->id));

        $this->assertSame($replacement->id, $apply->fresh()->cv_id);
    }

    public function test_unlinked_candidate_cannot_be_unlinked_again(): void
    {
        $admin = $this->createAdminUser();
        $apply = $this->createApply([
            'decision' => 'recruit',
            'status' => 'recruit',
        ]);

        $this->actingAs($admin)
            ->delete(route('admin.job.apply.unlink-cv', $apply->id))
            ->assertForbidden();
    }

    public function test_create_cv_from_candidate_prefills_and_links(): void
    {
        $admin = $this->createAdminUser();
        $apply = $this->createApply([
            'name' => 'Daw Prefill',
            'phone' => '0999888777',
            'email' => 'prefill@example.com',
            'gender' => 'Female',
            'date_of_birth' => '1992-03-04',
            'current_address' => 'Bahan',
            'nationality' => 'Myanmar',
            'decision' => 'recruit',
            'status' => 'recruit',
        ]);

        $this->actingAs($admin)
            ->get(route('admin.cv.create', ['job_apply_id' => $apply->id]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/CV/AdminCreateCV')
                ->where('cvData.full_name', 'Daw Prefill')
                ->where('cvData.phone', '0999888777')
                ->where('cvData.email', 'prefill@example.com')
                ->where('cvData.gender', 'Female')
                ->where('cvData.date_of_birth', '1992-03-04')
                ->where('cvData.current_address', 'Bahan')
                ->where('cvData.nationality', 'Myanmar')
                ->where('cvData.job_apply_id', $apply->id)
            );

        $this->actingAs($admin)
            ->postJson(route('admin.cv.store'), [
                'current_step' => 1,
                'full_name' => 'Daw Prefill',
                'date_of_birth' => '1992-03-04',
                'gender' => 'Female',
                'phone' => '0999888777',
                'job_apply_id' => $apply->id,
            ])
            ->assertCreated()
            ->assertJsonPath('status', 'success');

        $cv = CV::query()->where('full_name', 'Daw Prefill')->latest('id')->first();
        $this->assertNotNull($cv);
        $this->assertSame($cv->id, $apply->fresh()->cv_id);
        $this->assertSame('0999888777', $cv->phone);
    }

    public function test_search_marks_a_cv_already_linked_to_another_candidate(): void
    {
        $admin = $this->createAdminUser();
        $cv = $this->createCv($admin, ['full_name' => 'Shared Caregiver']);
        $this->createApply([
            'name' => 'Already Linked',
            'decision' => 'recruit',
            'status' => 'recruit',
            'cv_id' => $cv->id,
        ]);
        $apply = $this->createApply([
            'name' => 'Needs A CV',
            'decision' => 'recruit',
            'status' => 'recruit',
        ]);

        $this->actingAs($admin)
            ->getJson(route('admin.job.apply.cvs.search', ['id' => $apply->id, 'q' => 'Shared']))
            ->assertOk()
            ->assertJsonPath('0.full_name', 'Shared Caregiver')
            ->assertJsonPath('0.linked_candidate.name', 'Already Linked');
    }

    public function test_cannot_link_a_cv_already_linked_to_another_candidate(): void
    {
        $admin = $this->createAdminUser();
        $cv = $this->createCv($admin, ['full_name' => 'Taken Caregiver']);
        $this->createApply([
            'name' => 'Already Linked',
            'decision' => 'recruit',
            'status' => 'recruit',
            'cv_id' => $cv->id,
        ]);
        $apply = $this->createApply([
            'name' => 'Needs A CV',
            'decision' => 'recruit',
            'status' => 'recruit',
        ]);

        $this->actingAs($admin)
            ->from(route('admin.job.apply.single', $apply->id))
            ->post(route('admin.job.apply.link-cv', $apply->id), [
                'cv_id' => $cv->id,
            ])
            ->assertRedirect(route('admin.job.apply.single', $apply->id))
            ->assertSessionHasErrors('cv_id');

        $this->assertNull($apply->fresh()->cv_id);
    }

    public function test_job_apply_list_includes_cv_summary(): void
    {
        $admin = $this->createAdminUser();
        $cv = $this->createCv($admin, ['full_name' => 'Listed Caregiver']);
        $this->createApply([
            'name' => 'Listed Recruit Chip',
            'decision' => 'recruit',
            'status' => 'recruit',
            'cv_id' => $cv->id,
        ]);

        $this->actingAs($admin)
            ->get(route('admin.job.apply', ['search' => 'Listed Recruit Chip']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/JobApplies/JobApplies')
                ->where('jobApplies.0.name', 'Listed Recruit Chip')
                ->where('jobApplies.0.status', 'recruit')
                ->where('jobApplies.0.cv.full_name', 'Listed Caregiver')
            );
    }

    private function createAdminUser(): User
    {
        return User::query()->create([
            'name' => 'CV Link Tester',
            'email' => 'cv-link-'.uniqid('', true).'@example.com',
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

    private function createCv(User $user, array $attributes = []): CV
    {
        return CV::create(array_merge([
            'user_id' => $user->id,
            'full_name' => 'Caregiver',
            'gender' => 'Female',
        ], $attributes));
    }
}
