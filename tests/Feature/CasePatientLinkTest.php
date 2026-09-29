<?php

namespace Tests\Feature;

use App\Models\CaseRecord;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class CasePatientLinkTest extends TestCase
{
    use DatabaseTransactions;

    public function test_confirmed_case_update_stays_on_edit_when_unlinked(): void
    {
        $admin = $this->createAdminUser();
        $case = $this->createCase(['status' => 'interviewing']);

        $this->actingAs($admin)
            ->put(route('admin.cases.update', $case), $this->casePayload($case, [
                'status' => 'confirmed',
            ]))
            ->assertRedirect(route('admin.cases.edit', $case));

        $this->assertNull($case->fresh()->patient_id);
    }

    public function test_create_patient_from_case_prefills_and_links(): void
    {
        $admin = $this->createAdminUser();
        $case = $this->createCase([
            'status' => 'confirmed',
            'name' => 'Daw Mya',
            'care_type' => 'elder',
            'phone' => '091234567',
            'address' => 'Bahan',
            'branch' => 'Yangon',
            'duration' => '1 month',
        ]);

        $this->actingAs($admin)
            ->get(route('admin.patient.create', ['case_id' => $case->id]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Patient/CreatePatient')
                ->where('fromCase.first_name', 'Daw Mya')
                ->where('fromCase.type', 'Elder')
                ->where('fromCase.service_area', 'Yangon')
                ->where('fromCase.emergency_contact_phone', '091234567')
            );

        $this->actingAs($admin)
            ->post(route('admin.patient.store'), [
                'type' => 'Elder',
                'first_name' => 'Daw Mya Chip',
                'last_name' => '',
                'date_of_birth' => '1948-01-15',
                'gender' => 'Female',
                'service_area' => 'Yangon',
                'address' => 'Bahan',
                'emergency_contact_phone' => '091234567',
                'notes' => 'Duration: 1 month',
                'case_id' => $case->id,
            ])
            ->assertRedirect();

        $patient = Patient::query()->where('first_name', 'Daw Mya Chip')->latest('id')->first();
        $this->assertNotNull($patient);
        $this->assertSame('Elder', $patient->type);
        $this->assertSame($patient->id, $case->fresh()->patient_id);
    }

    public function test_child_case_prefills_patient_as_baby(): void
    {
        $admin = $this->createAdminUser();
        $case = $this->createCase([
            'status' => 'confirmed',
            'care_type' => 'child',
            'name' => 'Mg Mg',
        ]);

        $this->actingAs($admin)
            ->get(route('admin.patient.create', ['case_id' => $case->id]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('fromCase.type', 'Baby')
            );
    }

    public function test_link_existing_patient_from_confirmed_case(): void
    {
        $admin = $this->createAdminUser();
        $case = $this->createCase([
            'status' => 'confirmed',
            'name' => 'U Aung',
            'phone' => '0999888777',
        ]);
        $patient = $this->createPatient([
            'first_name' => 'U Aung',
            'emergency_contact_phone' => '0999888777',
        ]);

        $this->actingAs($admin)
            ->post(route('admin.cases.link-patient', $case), [
                'patient_id' => $patient->id,
            ])
            ->assertRedirect(route('admin.cases.edit', $case));

        $this->assertSame($patient->id, $case->fresh()->patient_id);
    }

    public function test_unlink_clears_the_patient_and_keeps_the_patient_record(): void
    {
        $admin = $this->createAdminUser();
        $patient = $this->createPatient(['first_name' => 'Wrong Patient']);
        $case = $this->createCase([
            'status' => 'confirmed',
            'name' => 'Wrong Link Case',
            'patient_id' => $patient->id,
        ]);

        $this->actingAs($admin)
            ->delete(route('admin.cases.unlink-patient', $case))
            ->assertRedirect(route('admin.cases.edit', $case));

        $this->assertNull($case->fresh()->patient_id);
        $this->assertNotNull($patient->fresh());

        $replacement = $this->createPatient(['first_name' => 'Right Patient']);

        $this->actingAs($admin)
            ->post(route('admin.cases.link-patient', $case), [
                'patient_id' => $replacement->id,
            ])
            ->assertRedirect(route('admin.cases.edit', $case));

        $this->assertSame($replacement->id, $case->fresh()->patient_id);
    }

    public function test_unlinked_case_cannot_be_unlinked_again(): void
    {
        $admin = $this->createAdminUser();
        $case = $this->createCase(['status' => 'confirmed']);

        $this->actingAs($admin)
            ->delete(route('admin.cases.unlink-patient', $case))
            ->assertForbidden();
    }

    public function test_open_case_cannot_link_a_patient(): void
    {
        $admin = $this->createAdminUser();
        $case = $this->createCase(['status' => 'open']);
        $patient = $this->createPatient(['first_name' => 'Someone']);

        $this->actingAs($admin)
            ->post(route('admin.cases.link-patient', $case), [
                'patient_id' => $patient->id,
            ])
            ->assertForbidden();

        $this->assertNull($case->fresh()->patient_id);
    }

    public function test_cases_table_includes_patient_summary(): void
    {
        $admin = $this->createAdminUser();
        $patient = $this->createPatient(['first_name' => 'LinkedChipPatient', 'last_name' => 'Case']);
        $this->createCase([
            'status' => 'confirmed',
            'name' => 'CallerChipCase',
            'inquiry_at' => now(),
            'patient_id' => $patient->id,
        ]);

        $this->actingAs($admin)
            ->get(route('admin.cases.index', ['search' => 'CallerChipCase']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Cases/AdminCases')
                ->where('records.0.name', 'CallerChipCase')
                ->where('records.0.patient.first_name', 'LinkedChipPatient')
                ->where('records.0.status', 'confirmed')
            );
    }

    public function test_patient_page_lists_linked_cases(): void
    {
        $admin = $this->createAdminUser();
        $patient = $this->createPatient(['first_name' => 'Chart']);
        $case = $this->createCase([
            'status' => 'on_duty',
            'name' => 'Caller',
            'patient_id' => $patient->id,
            'inquiry_at' => '2026-09-01 09:30:00',
            'branch' => 'Mandalay',
        ]);

        $this->actingAs($admin)
            ->get(route('admin.patient', $patient->id))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Patient/AdminSinglePatient')
                ->where('caseRecords.0.id', $case->id)
                ->where('caseRecords.0.branch', 'Mandalay')
                ->where('caseRecords.0.status', 'on_duty')
            );
    }

    public function test_naypyidaw_case_does_not_prefill_service_area(): void
    {
        $admin = $this->createAdminUser();
        $case = $this->createCase([
            'status' => 'confirmed',
            'branch' => 'Naypyidaw',
        ]);

        $this->actingAs($admin)
            ->get(route('admin.patient.create', ['case_id' => $case->id]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('fromCase.service_area', '')
            );
    }

    public function test_long_phone_goes_into_notes_instead_of_emergency_contact(): void
    {
        $admin = $this->createAdminUser();
        $case = $this->createCase([
            'status' => 'confirmed',
            'phone' => '09-123-456-789-000',
        ]);

        $this->actingAs($admin)
            ->get(route('admin.patient.create', ['case_id' => $case->id]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('fromCase.emergency_contact_phone', '')
                ->where('fromCase.notes', 'Phone: 09-123-456-789-000')
            );
    }

    private function createAdminUser(): User
    {
        return User::query()->create([
            'name' => 'Case Patient Tester',
            'email' => 'case-patient-'.uniqid('', true).'@example.com',
            'password' => 'password',
            'is_admin' => true,
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

    private function createPatient(array $attributes = []): Patient
    {
        return Patient::create(array_merge([
            'type' => 'Elder',
            'first_name' => 'Patient',
            'last_name' => 'Test',
            'gender' => 'Female',
            'service_area' => 'Yangon',
        ], $attributes));
    }

    private function casePayload(CaseRecord $case, array $overrides = []): array
    {
        return array_merge([
            'branch' => $case->branch,
            'name' => $case->name,
            'status' => $case->status,
            'care_type' => $case->care_type,
            'address' => $case->address,
            'phone' => $case->phone,
            'inquiry_at' => optional($case->inquiry_at)?->format('Y-m-d H:i:s'),
            'inquiry_note' => $case->inquiry_note,
            'requested_start' => $case->requested_start,
            'requested_start_date' => optional($case->requested_start_date)?->format('Y-m-d'),
            'duration' => $case->duration,
            'level' => $case->level,
            'duty_type' => $case->duty_type,
            'cv_sent_at' => optional($case->cv_sent_at)?->format('Y-m-d H:i:s'),
            'cv_sent_note' => $case->cv_sent_note,
            'client_response' => $case->client_response,
            'interview_date' => optional($case->interview_date)?->format('Y-m-d'),
            'interview_note' => $case->interview_note,
            'confirm_date' => optional($case->confirm_date)?->format('Y-m-d'),
            'confirm_note' => $case->confirm_note,
            'deposit_note' => $case->deposit_note,
            'duty_start_date' => optional($case->duty_start_date)?->format('Y-m-d'),
            'duty_start_note' => $case->duty_start_note,
            'notes' => $case->notes,
        ], $overrides);
    }
}
