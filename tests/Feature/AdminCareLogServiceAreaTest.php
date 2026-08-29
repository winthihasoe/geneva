<?php

namespace Tests\Feature;

use App\Models\CareLog;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminCareLogServiceAreaTest extends TestCase
{
    use DatabaseTransactions;

    public function test_admin_care_logs_include_patient_service_area(): void
    {
        $admin = $this->createAdminUser();
        $patient = $this->createPatient('Yangon', 'YgnChipPatient');
        $this->createCareLog($patient, '2099-12-28');

        $this->actingAs($admin)
            ->get(route('admin.care.logs'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/CareLogs/AdminCareLogs')
                ->where('careLogs.data.0.first_name', 'YgnChipPatient')
                ->where('careLogs.data.0.service_area', 'Yangon')
            );
    }

    public function test_admin_can_filter_care_logs_by_yangon(): void
    {
        $admin = $this->createAdminUser();
        $yangonPatient = $this->createPatient('Yangon', 'YgnFilterPatient');
        $mandalayPatient = $this->createPatient('Mandalay', 'MdyFilterPatient');
        $this->createCareLog($yangonPatient, '2099-12-27');
        $this->createCareLog($mandalayPatient, '2099-12-26');

        $this->actingAs($admin)
            ->get(route('admin.care.logs', ['service_area' => 'Yangon']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/CareLogs/AdminCareLogs')
                ->where('filters.service_area', 'Yangon')
                ->where('careLogs.data.0.first_name', 'YgnFilterPatient')
                ->where('careLogs.data.0.service_area', 'Yangon')
                ->has('careLogs.data', fn (Assert $logs) => $logs
                    ->each(fn (Assert $log) => $log
                        ->where('service_area', 'Yangon')
                        ->etc()
                    )
                )
            );
    }

    public function test_admin_can_filter_care_logs_by_mandalay(): void
    {
        $admin = $this->createAdminUser();
        $yangonPatient = $this->createPatient('Yangon', 'YgnOnlyPatient');
        $mandalayPatient = $this->createPatient('Mandalay', 'MdyOnlyPatient');
        $this->createCareLog($yangonPatient, '2099-12-25');
        $this->createCareLog($mandalayPatient, '2099-12-24');

        $this->actingAs($admin)
            ->get(route('admin.care.logs', ['service_area' => 'Mandalay']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/CareLogs/AdminCareLogs')
                ->where('filters.service_area', 'Mandalay')
                ->where('careLogs.data.0.first_name', 'MdyOnlyPatient')
                ->where('careLogs.data.0.service_area', 'Mandalay')
                ->has('careLogs.data', fn (Assert $logs) => $logs
                    ->each(fn (Assert $log) => $log
                        ->where('service_area', 'Mandalay')
                        ->etc()
                    )
                )
            );
    }

    public function test_regular_user_cannot_view_admin_care_logs(): void
    {
        $user = $this->createUser();

        $this->actingAs($user)
            ->get(route('admin.care.logs'))
            ->assertRedirect('/');
    }

    private function createAdminUser(): User
    {
        return $this->createUser(['is_admin' => true]);
    }

    private function createUser(array $attributes = []): User
    {
        return User::query()->create(array_merge([
            'name' => 'Care Log Tester',
            'email' => 'carelog-sa-'.uniqid('', true).'@example.com',
            'password' => 'password',
            'is_admin' => false,
        ], $attributes));
    }

    private function createPatient(string $serviceArea, string $firstName): Patient
    {
        return Patient::create([
            'type' => 'Baby',
            'first_name' => $firstName,
            'last_name' => 'Test',
            'gender' => 'Female',
            'service_area' => $serviceArea,
        ]);
    }

    private function createCareLog(Patient $patient, string $careDate): CareLog
    {
        return CareLog::create([
            'patient_id' => $patient->id,
            'care_type' => 'newborn',
            'care_date' => $careDate,
            'first_name' => $patient->first_name,
            'last_name' => $patient->last_name,
            'age_display' => '2 weeks',
        ]);
    }
}
