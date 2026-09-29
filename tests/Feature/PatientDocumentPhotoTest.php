<?php

namespace Tests\Feature;

use App\Models\CarePlanPhoto;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PatientDocumentPhotoTest extends TestCase
{
    use DatabaseTransactions;

    public function test_admin_stores_a_compressed_jpeg_for_one_section(): void
    {
        Storage::fake('local');
        $admin = $this->createAdminUser();
        $patient = $this->createPatient();
        $file = UploadedFile::fake()->image('page.png', 1800, 2400);
        $original = file_get_contents($file->getRealPath());

        $response = $this->actingAs($admin)->post(
            route('admin.patient.documents.store', [
                'patient' => $patient,
                'kind' => CarePlanPhoto::KIND_CARE_PLAN,
            ]),
            ['photo' => $file],
        );

        $response->assertOk();

        $photo = CarePlanPhoto::query()->where('patient_id', $patient->id)->first();
        $this->assertNotNull($photo);
        $this->assertSame(CarePlanPhoto::KIND_CARE_PLAN, $photo->kind);
        $this->assertSame(1, $photo->position);
        $this->assertStringStartsWith("patient-documents/{$patient->id}/care_plan/", $photo->photo_path);
        $this->assertStringEndsWith('.jpg', $photo->photo_path);

        $stored = Storage::disk('local')->get($photo->photo_path);
        $this->assertNotSame($original, $stored);
        $this->assertSame("\xFF\xD8\xFF", substr($stored, 0, 3));

        $info = getimagesize(Storage::disk('local')->path($photo->photo_path));
        $this->assertLessThanOrEqual(1600, max($info[0], $info[1]));
        $this->assertSame(IMAGETYPE_JPEG, $info[2]);

        $this->assertSame(
            0,
            CarePlanPhoto::query()
                ->where('patient_id', $patient->id)
                ->where('kind', CarePlanPhoto::KIND_CAREGIVER_AGREEMENT)
                ->count()
        );

        $this->actingAs($admin)
            ->get(route('admin.patient', $patient->id))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->has('documentPhotos.care_plan', 1)
                ->has('documentPhotos.caregiver_agreement', 0)
                ->has('documentPhotos.caregiver_service_agreement', 0)
                ->where('documentPhotos.care_plan.0.kind', CarePlanPhoto::KIND_CARE_PLAN)
                ->where('documentPhotos.care_plan.0.url', route('admin.patient.documents.show', $photo))
                ->missing('patient.care_plan_photos')
            );

        $this->actingAs($admin)
            ->get(route('admin.patient.documents.show', $photo))
            ->assertOk()
            ->assertHeader('content-type', 'image/jpeg');
    }

    public function test_oversize_and_non_image_uploads_are_rejected(): void
    {
        Storage::fake('local');
        $admin = $this->createAdminUser();
        $patient = $this->createPatient();

        $this->actingAs($admin)
            ->post(
                route('admin.patient.documents.store', [
                    'patient' => $patient,
                    'kind' => CarePlanPhoto::KIND_CARE_PLAN,
                ]),
                ['photo' => UploadedFile::fake()->image('large.jpg')->size(11000)],
                ['Accept' => 'application/json'],
            )
            ->assertStatus(422)
            ->assertJsonValidationErrors('photo');

        $this->actingAs($admin)
            ->post(
                route('admin.patient.documents.store', [
                    'patient' => $patient,
                    'kind' => CarePlanPhoto::KIND_CARE_PLAN,
                ]),
                ['photo' => UploadedFile::fake()->create('notes.pdf', 20, 'application/pdf')],
                ['Accept' => 'application/json'],
            )
            ->assertStatus(422)
            ->assertJsonValidationErrors('photo');

        $this->actingAs($admin)
            ->post(
                "/admin/patients/{$patient->id}/documents/not-a-kind",
                ['photo' => UploadedFile::fake()->image('page.jpg')],
            )
            ->assertNotFound();

        $this->assertSame(0, CarePlanPhoto::query()->where('patient_id', $patient->id)->count());
    }

    public function test_delete_removes_the_photo_and_a_guest_cannot_view_it(): void
    {
        Storage::fake('local');
        $admin = $this->createAdminUser();
        $patient = $this->createPatient();

        $this->actingAs($admin)->post(
            route('admin.patient.documents.store', [
                'patient' => $patient,
                'kind' => CarePlanPhoto::KIND_CAREGIVER_SERVICE_AGREEMENT,
            ]),
            ['photo' => UploadedFile::fake()->image('agreement.jpg', 800, 1100)],
        )->assertOk();

        $photo = CarePlanPhoto::query()->where('patient_id', $patient->id)->first();
        $this->assertNotNull($photo);

        auth()->logout();

        $this->get(route('admin.patient.documents.show', $photo))
            ->assertRedirect(route('login'));

        $this->actingAs($admin)
            ->delete(route('admin.patient.documents.destroy', $photo))
            ->assertRedirect()
            ->assertSessionHas('success', 'Photo deleted.');

        $this->assertDatabaseMissing('care_plan_photos', ['id' => $photo->id]);
        Storage::disk('local')->assertMissing($photo->photo_path);
    }

    private function createAdminUser(): User
    {
        return User::query()->create([
            'name' => 'Document Tester',
            'email' => 'docs-'.uniqid('', true).'@example.com',
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
}
