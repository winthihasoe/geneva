<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminUserManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_access_admin_dashboard(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->get(route('admin.dashboard'))
            ->assertOk();
    }

    public function test_super_admin_can_access_admin_dashboard(): void
    {
        $superAdmin = User::factory()->superAdmin()->create();

        $this->actingAs($superAdmin)
            ->get(route('admin.dashboard'))
            ->assertOk();
    }

    public function test_regular_user_cannot_access_admin_dashboard(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get(route('admin.dashboard'))
            ->assertRedirect('/');
    }

    public function test_super_admin_can_view_user_management(): void
    {
        $superAdmin = User::factory()->superAdmin()->create();

        $this->actingAs($superAdmin)
            ->get(route('admin.users'))
            ->assertOk();
    }

    public function test_admin_cannot_view_user_management(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->get(route('admin.users'))
            ->assertRedirect(route('admin.dashboard'));
    }

    public function test_super_admin_can_update_user_roles(): void
    {
        $superAdmin = User::factory()->superAdmin()->create();
        $user = User::factory()->create();

        $this->actingAs($superAdmin)
            ->put(route('admin.users.roles.update', $user), [
                'is_admin' => true,
                'is_super_admin' => false,
                'is_caregiver' => false,
                'is_employer' => false,
            ])
            ->assertRedirect();

        $this->assertTrue($user->fresh()->is_admin);
        $this->assertFalse($user->fresh()->is_super_admin);
    }

    public function test_admin_cannot_update_user_roles(): void
    {
        $admin = User::factory()->admin()->create();
        $user = User::factory()->create();

        $this->actingAs($admin)
            ->put(route('admin.users.roles.update', $user), [
                'is_admin' => true,
                'is_super_admin' => false,
                'is_caregiver' => false,
                'is_employer' => false,
            ])
            ->assertRedirect(route('admin.dashboard'));

        $this->assertFalse($user->fresh()->is_admin);
    }

    public function test_super_admin_cannot_remove_own_super_admin_role(): void
    {
        $superAdmin = User::factory()->superAdmin()->create();

        $this->actingAs($superAdmin)
            ->put(route('admin.users.roles.update', $superAdmin), [
                'is_admin' => false,
                'is_super_admin' => false,
                'is_caregiver' => false,
                'is_employer' => false,
            ]);

        $this->assertTrue($superAdmin->fresh()->is_super_admin);
    }

    public function test_last_super_admin_cannot_be_demoted(): void
    {
        $superAdmin = User::factory()->superAdmin()->create();
        $otherSuperAdmin = User::factory()->superAdmin()->create();

        $this->actingAs($superAdmin)
            ->put(route('admin.users.roles.update', $otherSuperAdmin), [
                'is_admin' => true,
                'is_super_admin' => false,
                'is_caregiver' => false,
                'is_employer' => false,
            ])
            ->assertRedirect();

        $this->assertFalse($otherSuperAdmin->fresh()->is_super_admin);

        $this->actingAs($superAdmin)
            ->put(route('admin.users.roles.update', $superAdmin), [
                'is_admin' => true,
                'is_super_admin' => false,
                'is_caregiver' => false,
                'is_employer' => false,
            ]);

        $this->assertTrue($superAdmin->fresh()->is_super_admin);
    }
}
