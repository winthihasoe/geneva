<?php

namespace Tests\Feature;

use App\Models\CV;
use App\Models\CareLog;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class BabyCareLogFoodOfferedPersistenceTest extends TestCase
{
    use DatabaseTransactions;

    public function test_baby_care_log_stores_weaning_diet_and_toileting(): void
    {
        $caregiver = $this->createCaregiverWithCv();

        $this->actingAs($caregiver)
            ->post(route('carelogs.baby.store'), [
                'care_date' => '2099-09-17',
                'first_name' => 'Mina',
                'last_name' => 'Baby',
                'age_display' => '11 months',
                'feeding_records' => [
                    [
                        'feeding_time' => '08:00',
                        'feeding_type' => 'Formula',
                        'amount' => 120,
                        'amount_unit' => 'ml',
                        'notes' => 'Finished bottle',
                    ],
                ],
                'food_offered_records' => [
                    [
                        'meal_time' => 'Lunch',
                        'food_offered' => 'Banana puree',
                        'quantity' => '2 tbsp',
                        'texture' => 'Puree',
                        'reaction_notes' => 'Liked it',
                    ],
                ],
                'toileting_records' => [
                    [
                        'time' => '10:15',
                        'toilet_attempt' => 'Yes',
                        'result' => 'Success',
                        'type' => 'Urine',
                        'reaction' => 'Calm',
                        'notes' => 'Sat on potty',
                    ],
                ],
            ])
            ->assertRedirect(route('cg.mycarelogs'));

        $careLog = CareLog::query()
            ->where('cv_id', $caregiver->cv->id)
            ->where('care_type', 'baby')
            ->where('first_name', 'Mina')
            ->latest('id')
            ->first();

        $this->assertNotNull($careLog);

        $this->assertDatabaseHas('food_offered_records', [
            'care_log_id' => $careLog->id,
            'meal_time' => 'Lunch',
            'food_offered' => 'Banana puree',
            'quantity' => '2 tbsp',
            'texture' => 'Puree',
            'reaction_notes' => 'Liked it',
        ]);

        $this->assertDatabaseHas('toileting_training_records', [
            'care_log_id' => $careLog->id,
            'toilet_attempt' => 'Yes',
            'result' => 'Success',
            'type' => 'Urine',
            'reaction' => 'Calm',
            'notes' => 'Sat on potty',
        ]);

        $this->actingAs($caregiver)
            ->get(route('cg.carelog.baby.details', $careLog->id))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Caregiver/CareLogs/BabyCareLog/BabyCareLogDetails')
                ->where('careLogData.food_offered_records.0.food_offered', 'Banana puree')
                ->where('careLogData.food_offered_records.0.meal_time', 'Lunch')
                ->where('careLogData.toileting_training_records.0.result', 'Success')
            );
    }

    private function createCaregiverWithCv(): User
    {
        $user = User::query()->create([
            'name' => 'Baby Care Log Tester',
            'email' => 'baby-carelog-'.uniqid('', true).'@example.com',
            'password' => 'password',
            'is_caregiver' => true,
            'is_admin' => false,
        ]);

        CV::create([
            'user_id' => $user->id,
            'full_name' => 'Baby Care Log Tester',
        ]);

        return $user->fresh();
    }
}
