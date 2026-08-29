<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CareLogController extends Controller
{
    public function storeNewbornCareLog(Request $request)
    {
        \Log::info('=== NEWBORN CARE LOG SUBMISSION START ===');
        \Log::info('Request data:', $request->all());

        $request->validate([
            'care_date' => 'required|date',
            'first_name' => 'required|string|max:255',
            'age_display' => 'required|string|max:255',
        ]);

        return $this->persistInfantStyleCareLog($request, 'newborn');
    }

    public function storeBabyCareLog(Request $request)
    {
        \Log::info('=== BABY CARE LOG SUBMISSION START ===');
        \Log::info('Request data:', $request->all());

        $request->validate([
            'care_date' => 'required|date',
            'first_name' => 'required|string|max:255',
            'age_display' => 'required|string|max:255',
        ]);

        return $this->persistInfantStyleCareLog($request, 'baby');
    }

    protected function persistInfantStyleCareLog(Request $request, string $careType): RedirectResponse
    {
        try {
            $ctx = $this->careLogPersistenceContext($request);
            if ($ctx['cv_id'] === null) {
                return redirect()->back()->with(
                    'error',
                    'Please create a CV before submitting care logs.'
                );
            }

            DB::beginTransaction();
            \Log::info('Starting database transaction');

            $cvId = $ctx['cv_id'];
            $patientId = $ctx['patient_id'];

            \Log::info('Care log persistence:', [
                'cv_id' => $cvId,
                'patient_id' => $patientId,
                'public' => $ctx['is_public'],
                'care_type' => $careType,
            ]);

            // Create the main care log entry
            $careLogData = [
                'cv_id' => $cvId,
                'patient_id' => $patientId,
                'care_date' => $request->care_date,
                'care_type' => $careType,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name, // Add this field
                'age_display' => $request->age_display,
                'weight_kg' => $request->weight_kg ? (float) $request->weight_kg : null,
                'height_cm' => $request->height_cm ? (float) $request->height_cm : null,
                'additional_notes' => $request->additional_notes,
                'caregiver_name' => $request->caregiver_name,
                'caregiver_signature' => $request->caregiver_signature,
                'guardian_signature' => $request->guardian_signature,
                'guardian_comment' => $request->guardian_comment,
                'created_at' => now(),
                'updated_at' => now(),
            ];

            // ✅ Fix: Log the data array BEFORE inserting
            \Log::info('Care log data to insert:', $careLogData);

            // ✅ Fix: Insert and get the ID
            $careLog = DB::table('care_logs')->insertGetId($careLogData);

            // ✅ Fix: Log the ID correctly
            \Log::info('Care log created with ID:', ['id' => $careLog]);

            // Store emotion/behavior data
            if ($request->emotion_behavior) {
                $emotionData = $request->emotion_behavior;
                DB::table('emotion_behaviors')->insert([
                    'care_log_id' => $careLog,
                    'mood' => $emotionData['mood'] ?? null,
                    'behavior' => $emotionData['behavior'] ?? null,
                    'symptoms' => $emotionData['symptoms'] ?? null,
                    'medications' => $emotionData['medications'] ?? null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            // Store feeding records
            if ($request->feeding_records && count($request->feeding_records) > 0) {
                $feedingRecords = [];
                foreach ($request->feeding_records as $feeding) {
                    if (! empty($feeding['feeding_time']) || ! empty($feeding['feeding_type'])) {
                        $feedingRecords[] = [
                            'care_log_id' => $careLog,
                            'feeding_time' => $feeding['feeding_time'] ?? null,
                            'feeding_type' => $feeding['feeding_type'] ?? null,
                            'amount' => ! empty($feeding['amount']) ? (float) $feeding['amount'] : null,
                            'amount_unit' => $feeding['amount_unit'] ?? 'ml',
                            'notes' => $feeding['notes'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($feedingRecords)) {
                    DB::table('feeding_records')->insert($feedingRecords);
                }
            }

            // Store diaper changes
            if ($request->diaper_changes && count($request->diaper_changes) > 0) {
                $diaperRecords = [];
                foreach ($request->diaper_changes as $diaper) {
                    if (! empty($diaper['change_time']) || ! empty($diaper['diaper_content'])) {
                        $diaperRecords[] = [
                            'care_log_id' => $careLog,
                            'change_time' => $diaper['change_time'] ?? null,
                            'diaper_content' => $diaper['diaper_content'] ?? null,
                            'notes' => $diaper['notes'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($diaperRecords)) {
                    DB::table('diaper_changes')->insert($diaperRecords);
                }
            }

            // Store sleep records
            if ($request->sleep_records && count($request->sleep_records) > 0) {
                $sleepRecords = [];
                foreach ($request->sleep_records as $sleep) {
                    if (! empty($sleep['sleep_start_time']) || ! empty($sleep['sleep_end_time'])) {
                        $sleepRecords[] = [
                            'care_log_id' => $careLog,
                            'sleep_start_time' => $sleep['sleep_start_time'] ?? null,
                            'sleep_end_time' => $sleep['sleep_end_time'] ?? null,
                            'duration' => $sleep['duration'] ?? null,
                            'notes' => $sleep['notes'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($sleepRecords)) {
                    DB::table('sleep_records')->insert($sleepRecords);
                }
            }

            // Store activity records
            if ($request->activity_records && count($request->activity_records) > 0) {
                $activityRecords = [];
                foreach ($request->activity_records as $activity) {
                    if (! empty($activity['activity_time']) || ! empty($activity['activity_type'])) {
                        $activityRecords[] = [
                            'care_log_id' => $careLog,
                            'activity_time' => $activity['activity_time'] ?? null,
                            'activity_type' => $activity['activity_type'] ?? null,
                            'duration' => $activity['duration'] ?? null,
                            'notes' => $activity['notes'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($activityRecords)) {
                    DB::table('activity_records')->insert($activityRecords);
                }
            }

            // Store hygiene records
            if ($request->hygiene_records && count($request->hygiene_records) > 0) {
                $hygieneRecords = [];
                foreach ($request->hygiene_records as $hygiene) {
                    if (! empty($hygiene['hygiene_time']) || ! empty($hygiene['hygiene_activity'])) {
                        $hygieneRecords[] = [
                            'care_log_id' => $careLog,
                            'hygiene_time' => $hygiene['hygiene_time'] ?? null,
                            'hygiene_activity' => $hygiene['hygiene_activity'] ?? null,
                            'products_used' => $hygiene['products_used'] ?? null,
                            'notes' => $hygiene['notes'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($hygieneRecords)) {
                    DB::table('hygiene_records')->insert($hygieneRecords);
                }
            }

            // Store vital signs
            if ($request->vital_signs && count($request->vital_signs) > 0) {
                $vitalRecords = [];
                foreach ($request->vital_signs as $vital) {
                    if (! empty($vital['measurement_time']) ||
                        ! empty($vital['temperature']) ||
                        ! empty($vital['pulse_rate']) ||
                        ! empty($vital['respiratory_rate'])) {

                        $vitalRecords[] = [
                            'care_log_id' => $careLog,
                            'measurement_time' => $vital['measurement_time'] ?? null,
                            'temperature' => ! empty($vital['temperature']) ? (float) $vital['temperature'] : null,
                            'temperature_unit' => $vital['temperature_unit'] ?? 'C',
                            'pulse_rate' => ! empty($vital['pulse_rate']) ? (int) $vital['pulse_rate'] : null,
                            'respiratory_rate' => ! empty($vital['respiratory_rate']) ? (int) $vital['respiratory_rate'] : null,
                            'systolic_pressure' => ! empty($vital['systolic_pressure']) ? (int) $vital['systolic_pressure'] : null,
                            'diastolic_pressure' => ! empty($vital['diastolic_pressure']) ? (int) $vital['diastolic_pressure'] : null,
                            'notes' => $vital['notes'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($vitalRecords)) {
                    DB::table('vital_signs')->insert($vitalRecords);
                }
            }

            // Store requested supplies
            if ($request->requested_supplies && count($request->requested_supplies) > 0) {
                $supplyRecords = [];
                foreach ($request->requested_supplies as $supply) {
                    if (! empty($supply['item'])) {
                        $supplyRecords[] = [
                            'care_log_id' => $careLog,
                            'item' => $supply['item'],
                            'quantity' => $supply['quantity'] ?? null,
                            'purpose' => $supply['purpose'] ?? null,
                            'priority' => $supply['priority'] ?? 'medium',
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($supplyRecords)) {
                    DB::table('requested_supplies')->insert($supplyRecords);
                }
            }

            DB::commit();
            \Log::info('Transaction committed successfully');

            return $this->redirectAfterCareLogStore($request, [
                'success' => 'Care log submitted successfully!',
                'show_pdf_prompt' => true,
                'care_log_data' => [
                    'id' => $careLog,
                    'baby_name' => $request->first_name.' '.($request->last_name ?? ''),
                    'form_data' => $request->all(),
                ],
            ]);

        } catch (\Throwable $e) {
            DB::rollBack();

            \Log::error('=== '.strtoupper($careType).' CARE LOG ERROR ===');
            \Log::error('Error: '.$e->getMessage());
            \Log::error('File: '.$e->getFile());
            \Log::error('Line: '.$e->getLine());
            \Log::error('Trace: '.$e->getTraceAsString());

            return redirect()->back()->withErrors([
                'error' => 'Failed to save care log. Please try again.',
            ])->withInput();
        }
    }

    // Store Elderly Care Log
    public function storeElderlyCareLog(Request $request)
    {
        // Add debug logging
        \Log::info('=== ELDERLY CARE LOG DEBUG START ===');
        \Log::info('Request data:', $request->all());

        // Validate the main required fields
        try {
            $request->validate([
                'care_date' => 'required|date',
                'first_name' => 'required|string|max:255',
                'age_display' => 'required|string|max:255',
            ]);
            \Log::info('Validation passed');
        } catch (\Exception $e) {
            \Log::error('Validation failed:', ['error' => $e->getMessage()]);
            throw $e;
        }

        try {
            $ctx = $this->careLogPersistenceContext($request);
            if ($ctx['cv_id'] === null) {
                return redirect()->back()->with(
                    'error',
                    'Please create a CV before submitting care logs.'
                );
            }

            DB::beginTransaction();
            \Log::info('Transaction started');

            $cvId = $ctx['cv_id'];
            $patientId = $ctx['patient_id'];

            \Log::info('Care log persistence:', [
                'cv_id' => $cvId,
                'patient_id' => $patientId,
                'public' => $ctx['is_public'],
            ]);

            // Create the main care log entry
            \Log::info('Preparing care log data...');
            $careLogData = [
                'cv_id' => $cvId,
                'patient_id' => $patientId,
                'care_date' => $request->care_date,
                'care_type' => 'elder',
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'age_display' => $request->age_display,
                'weight_kg' => $request->weight_kg ? (float) $request->weight_kg : null,
                'height_cm' => $request->height_cm ? (float) $request->height_cm : null,
                'additional_notes' => $request->additional_notes,
                'caregiver_name' => $request->caregiver_name,
                'caregiver_signature' => $request->caregiver_signature,
                'guardian_signature' => $request->client_signature,
                'guardian_comment' => $request->client_comment,
                'created_at' => now(),
                'updated_at' => now(),
            ];
            \Log::info('Care log data prepared:', $careLogData);

            $careLog = DB::table('care_logs')->insertGetId($careLogData);
            \Log::info('Care log inserted with ID:', ['care_log_id' => $careLog]);

            // Store emotion/behavior data
            if ($request->emotion_behavior) {
                \Log::info('Processing emotion/behavior data...');
                $emotionData = $request->emotion_behavior;
                try {
                    DB::table('emotion_behaviors')->insert([
                        'care_log_id' => $careLog,
                        'mood' => $emotionData['mood'] ?? null,
                        'behavior' => $emotionData['behavior'] ?? null,
                        'action_taken' => $emotionData['action_taken'] ?? null,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                    \Log::info('Emotion/behavior data inserted');
                } catch (\Exception $e) {
                    \Log::error('Error inserting emotion/behavior data:', ['error' => $e->getMessage()]);
                    throw $e;
                }
            }

            // Store hygiene records
            if ($request->hygiene_records && count($request->hygiene_records) > 0) {
                \Log::info('Processing hygiene records...', ['count' => count($request->hygiene_records)]);
                $hygieneRecords = [];
                foreach ($request->hygiene_records as $index => $hygiene) {
                    // Fix: Map frontend fields (time, activity) to backend fields (hygiene_time, hygiene_activity)
                    if (! empty($hygiene['time']) || ! empty($hygiene['activity'])) {
                        $hygieneRecords[] = [
                            'care_log_id' => $careLog,
                            'hygiene_time' => $hygiene['time'] ?? null,
                            'hygiene_activity' => $hygiene['activity'] ?? null,
                            'notes' => $hygiene['notes'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($hygieneRecords)) {
                    try {
                        DB::table('hygiene_records')->insert($hygieneRecords);
                        \Log::info('Hygiene records inserted', ['count' => count($hygieneRecords)]);
                    } catch (\Exception $e) {
                        \Log::error('Error inserting hygiene records:', ['error' => $e->getMessage()]);
                        throw $e;
                    }
                }
                if ($request->moisturizer_applied !== null || $request->pressure_areas_checked !== null || $request->skin_care_findings !== null) {
                    DB::table('hygiene_records')->insert([
                        'care_log_id' => $careLog,
                        'moisturizer_applied' => $request->moisturizer_applied ?? null,
                        'pressure_areas_checked' => $request->pressure_areas_checked ?? null,
                        'skin_care_findings' => $request->skin_care_findings ?? null,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }

            // Store medication records
            if ($request->medication_records && count($request->medication_records) > 0) {
                \Log::info('Processing medication records...', ['count' => count($request->medication_records)]);
                $medicationRecords = [];
                foreach ($request->medication_records as $medication) {
                    // Fix: Map frontend fields (time, medication) to backend fields (medication_time, medication_name)
                    if (! empty($medication['time']) || ! empty($medication['medication'])) {
                        $medicationRecords[] = [
                            'care_log_id' => $careLog,
                            'administration_time' => $medication['time'] ?? null,
                            'medication_name' => $medication['medication'] ?? null,
                            'dosage' => $medication['dosage'] ?? null,
                            'route' => $medication['route'] ?? null,
                            'notes' => $medication['notes'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($medicationRecords)) {
                    try {
                        DB::table('medication_administrations')->insert($medicationRecords);
                        \Log::info('Medication records inserted', ['count' => count($medicationRecords)]);
                    } catch (\Exception $e) {
                        \Log::error('Error inserting medication records:', ['error' => $e->getMessage()]);
                        throw $e;
                    }
                }
            }

            // Store mobility/exercise records
            if ($request->mobility_records && count($request->mobility_records) > 0) {
                \Log::info('Processing mobility records...', ['count' => count($request->mobility_records)]);
                $mobilityRecords = [];
                foreach ($request->mobility_records as $mobility) {
                    // Fix: Map frontend fields (time, activity) to backend fields (exercise_time, mobility_assistance_details)
                    if (! empty($mobility['time']) || ! empty($mobility['activity'])) {
                        $mobilityRecords[] = [
                            'care_log_id' => $careLog,
                            'exercise_time' => $mobility['time'] ?? null,
                            'duration' => $mobility['duration'] ?? null,
                            'mobility_assistance_details' => $mobility['activity'] ?? null,
                            'notes' => $mobility['notes'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($mobilityRecords)) {
                    try {
                        DB::table('mobility_exercises')->insert($mobilityRecords);
                        \Log::info('Mobility records inserted', ['count' => count($mobilityRecords)]);
                    } catch (\Exception $e) {
                        \Log::error('Error inserting mobility records:', ['error' => $e->getMessage()]);
                        throw $e;
                    }
                }
            }

            // Store intake and output records
            if ($request->intake_records && count($request->intake_records) > 0) {
                \Log::info('Processing intake records...', ['count' => count($request->intake_records)]);
                $intakeRecords = [];
                foreach ($request->intake_records as $intake) {
                    if (! empty($intake['meal_time']) || ! empty($intake['meal_type'])) {
                        $intakeRecords[] = [
                            'care_log_id' => $careLog,
                            'meal_type' => $intake['meal_type'] ?? null,
                            'meal_time' => $intake['meal_time'] ?? null,
                            'food_items' => json_encode($intake['food_items'] ?? []),
                            'amount' => ! empty($intake['amount']) ? $intake['amount'] : null,
                            'amount_unit' => $intake['amount_unit'] ?? 'oz',
                            'assistance_needed' => $intake['assistance_needed'] ?? false,
                            'intake_notes' => $intake['intake_notes'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($intakeRecords)) {
                    try {
                        DB::table('intake_output_records')->insert($intakeRecords);
                        \Log::info('Intake records inserted', ['count' => count($intakeRecords)]);
                    } catch (\Exception $e) {
                        \Log::error('Error inserting intake records:', ['error' => $e->getMessage()]);
                        throw $e;
                    }
                }
            }

            // Store output records
            if ($request->output_records && count($request->output_records) > 0) {
                \Log::info('Processing output records...', ['count' => count($request->output_records)]);
                $outputRecords = [];
                foreach ($request->output_records as $output) {
                    if (! empty($output['output_time']) || ! empty($output['urine_volume'])) {
                        $outputRecords[] = [
                            'care_log_id' => $careLog,
                            'output_time' => $output['output_time'] ?? null,
                            'urine_volume' => ! empty($output['urine_volume']) ? (int) $output['urine_volume'] : null,
                            'urine_volume_unit' => $output['urine_volume_unit'] ?? 'l',
                            'urine_color' => $output['urine_color'] ?? null,
                            'bowel_movement' => $output['bowel_movement'] ?? null,
                            'bowel_consistency' => $output['bowel_consistency'] ?? null,
                            'output_notes' => $output['output_notes'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($outputRecords)) {
                    try {
                        DB::table('intake_output_records')->insert($outputRecords);
                        \Log::info('Output records inserted', ['count' => count($outputRecords)]);
                    } catch (\Exception $e) {
                        \Log::error('Error inserting output records:', ['error' => $e->getMessage()]);
                        throw $e;
                    }
                }
            }

            // Store hydration record
            if ($request->hydration_record) {
                \Log::info('Processing hydration record...');
                $hydrationData = $request->hydration_record;
                if (! empty($hydrationData['fluid_intake']) || ! empty($hydrationData['dehydration_signs'])) {
                    try {
                        DB::table('intake_output_records')->insert([
                            'care_log_id' => $careLog,
                            'fluid_intake' => ! empty($hydrationData['fluid_intake']) ? $hydrationData['fluid_intake'] : null,
                            'fluid_intake_unit' => $hydrationData['fluid_intake_unit'] ?? 'l',
                            'dehydration_signs' => $hydrationData['dehydration_signs'] ?? null,
                            'other_dehydration_signs' => $hydrationData['other_dehydration_signs'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                        \Log::info('Hydration record inserted');
                    } catch (\Exception $e) {
                        \Log::error('Error inserting hydration record:', ['error' => $e->getMessage()]);
                        throw $e;
                    }
                }
            }

            // Store activity records
            if ($request->activity_records && count($request->activity_records) > 0) {
                \Log::info('Processing activity records...', ['count' => count($request->activity_records)]);
                $activityRecords = [];
                foreach ($request->activity_records as $activity) {
                    // Fix: Map frontend fields (time, activity) to backend fields (activity_time, activity_type)
                    if (! empty($activity['time']) || ! empty($activity['activity'])) {
                        $activityRecords[] = [
                            'care_log_id' => $careLog,
                            'activity_time' => $activity['time'] ?? null,
                            'activity_type' => $activity['activity'] ?? null,
                            'duration' => $activity['duration'] ?? null,
                            'notes' => $activity['notes'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($activityRecords)) {
                    try {
                        DB::table('activity_records')->insert($activityRecords);
                        \Log::info('Activity records inserted', ['count' => count($activityRecords)]);
                    } catch (\Exception $e) {
                        \Log::error('Error inserting activity records:', ['error' => $e->getMessage()]);
                        throw $e;
                    }
                }
            }

            // Store sleep records
            if ($request->sleep_records && count($request->sleep_records) > 0) {
                \Log::info('Processing sleep records...', ['count' => count($request->sleep_records)]);
                $sleepRecords = [];
                foreach ($request->sleep_records as $sleep) {
                    if (! empty($sleep['type']) || ! empty($sleep['sleep_start_time']) || ! empty($sleep['duration'])) {
                        $sleepRecords[] = [
                            'care_log_id' => $careLog,
                            'type' => $sleep['type'] ?? null,
                            'sleep_start_time' => $sleep['sleep_start_time'] ?? null,
                            'duration' => $sleep['duration'] ?? null,
                            'sleep_quality' => $sleep['sleep_quality'] ?? null,
                            'notes' => $sleep['notes'] ?? null,
                            'sleep_issues' => $request->sleep_issues ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($sleepRecords)) {
                    try {
                        DB::table('sleep_records')->insert($sleepRecords);
                        \Log::info('Sleep records inserted', ['count' => count($sleepRecords)]);
                    } catch (\Exception $e) {
                        \Log::error('Error inserting sleep records:', ['error' => $e->getMessage()]);
                        throw $e;
                    }
                }
            }

            // Store emergency incidents
            if ($request->emergency_incidents && count($request->emergency_incidents) > 0) {
                \Log::info('Processing emergency incidents...', ['count' => count($request->emergency_incidents)]);
                $emergencyRecords = [];
                foreach ($request->emergency_incidents as $incident) {
                    if (! empty($incident['incident_time']) || ! empty($incident['incident_description'])) {
                        $emergencyRecords[] = [
                            'care_log_id' => $careLog,
                            'incident_time' => ! empty($incident['incident_time']) ?
                                $request->care_date.' '.$incident['incident_time'] : null,
                            'incident_description' => $incident['incident_description'] ?? null,
                            'severity' => $incident['severity'] ?? 'medium',
                            'actions_taken' => $incident['actions_taken'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($emergencyRecords)) {
                    try {
                        DB::table('emergency_incidents')->insert($emergencyRecords);
                        \Log::info('Emergency incidents inserted', ['count' => count($emergencyRecords)]);
                    } catch (\Exception $e) {
                        \Log::error('Error inserting emergency incidents:', ['error' => $e->getMessage()]);
                        throw $e;
                    }
                }
            }

            // Store household work records
            if ($request->household_records && count($request->household_records) > 0) {
                \Log::info('Processing household work records...', ['count' => count($request->household_records)]);
                $houseworkRecords = [];
                foreach ($request->household_records as $housework) {
                    if (! empty($housework['household_work']) || ! empty($housework['start_time'])) {
                        $houseworkRecords[] = [
                            'care_log_id' => $careLog,
                            'household_work' => $housework['household_work'] ?? null,
                            'start_time' => $housework['start_time'] ?? null,
                            'duration' => $housework['duration'] ?? null,
                            'notes' => $housework['notes'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($houseworkRecords)) {
                    try {
                        DB::table('household_work_records')->insert($houseworkRecords);
                        \Log::info('Household work records inserted', ['count' => count($houseworkRecords)]);
                    } catch (\Exception $e) {
                        \Log::error('Error inserting household work records:', ['error' => $e->getMessage()]);
                        throw $e;
                    }
                }
            }

            // Store vital signs
            if ($request->vital_signs && count($request->vital_signs) > 0) {
                \Log::info('Processing vital signs...', ['count' => count($request->vital_signs)]);
                $vitalRecords = [];
                foreach ($request->vital_signs as $vital) {
                    if (! empty($vital['measurement_time']) ||
                        ! empty($vital['temperature']) ||
                        ! empty($vital['pulse_rate']) ||
                        ! empty($vital['respiratory_rate']) ||
                        ! empty($vital['systolic_pressure']) ||
                        ! empty($vital['spo2'])) {

                        $vitalRecords[] = [
                            'care_log_id' => $careLog,
                            'measurement_time' => $vital['measurement_time'] ?? null,
                            'temperature' => ! empty($vital['temperature']) ? (float) $vital['temperature'] : null,
                            'temperature_unit' => $vital['temperature_unit'] ?? 'C',
                            'pulse_rate' => ! empty($vital['pulse_rate']) ? (int) $vital['pulse_rate'] : null,
                            'respiratory_rate' => ! empty($vital['respiratory_rate']) ? (int) $vital['respiratory_rate'] : null,
                            'systolic_pressure' => ! empty($vital['systolic_pressure']) ? (int) $vital['systolic_pressure'] : null,
                            'diastolic_pressure' => ! empty($vital['diastolic_pressure']) ? (int) $vital['diastolic_pressure'] : null,
                            'spo2' => ! empty($vital['spo2']) ? (int) $vital['spo2'] : null,
                            'notes' => $vital['notes'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($vitalRecords)) {
                    try {
                        DB::table('vital_signs')->insert($vitalRecords);
                        \Log::info('Vital signs inserted', ['count' => count($vitalRecords)]);
                    } catch (\Exception $e) {
                        \Log::error('Error inserting vital signs:', ['error' => $e->getMessage()]);
                        throw $e;
                    }
                }
            }

            // Store blood glucose records
            if ($request->blood_glucose_records && count($request->blood_glucose_records) > 0) {
                \Log::info('Processing blood glucose records...', ['count' => count($request->blood_glucose_records)]);
                $glucoseRecords = [];
                foreach ($request->blood_glucose_records as $glucose) {
                    if (! empty($glucose['measurement_time']) || ! empty($glucose['glucose_level'])) {
                        $glucoseRecords[] = [
                            'care_log_id' => $careLog,
                            'measurement_time' => $glucose['measurement_time'] ?? null,
                            'glucose_level' => ! empty($glucose['glucose_level']) ? (float) $glucose['glucose_level'] : null,
                            'timing' => $glucose['timing'] ?? null,
                            'notes' => $glucose['notes'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($glucoseRecords)) {
                    try {
                        DB::table('blood_glucose_records')->insert($glucoseRecords);
                        \Log::info('Blood glucose records inserted', ['count' => count($glucoseRecords)]);
                    } catch (\Exception $e) {
                        \Log::error('Error inserting blood glucose records:', ['error' => $e->getMessage()]);
                        throw $e;
                    }
                }
            }

            // Store requested supplies
            if ($request->requested_supplies && count($request->requested_supplies) > 0) {
                \Log::info('Processing supply requests...', ['count' => count($request->requested_supplies)]);
                $supplyRecords = [];
                foreach ($request->requested_supplies as $supply) {
                    if (! empty($supply['item'])) {
                        $supplyRecords[] = [
                            'care_log_id' => $careLog,
                            'item' => $supply['item'],
                            'quantity' => $supply['quantity'] ?? null,
                            'purpose' => $supply['purpose'] ?? null,
                            'priority' => $supply['priority'] ?? 'medium',
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($supplyRecords)) {
                    try {
                        DB::table('requested_supplies')->insert($supplyRecords);
                        \Log::info('Supply requests inserted', ['count' => count($supplyRecords)]);
                    } catch (\Exception $e) {
                        \Log::error('Error inserting supply requests:', ['error' => $e->getMessage()]);
                        throw $e;
                    }
                }
            }

            DB::commit();
            \Log::info('Transaction committed successfully');

            return $this->redirectAfterCareLogStore($request, [
                'success' => 'Elderly care log submitted successfully!',
                'show_pdf_prompt' => true,
                'care_log_data' => [
                    'id' => $careLog,
                    'first_name' => $request->first_name,
                    'form_data' => $request->all(),
                ],
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('=== ELDERLY CARE LOG ERROR ===');
            \Log::error('Error message: '.$e->getMessage());
            \Log::error('Error file: '.$e->getFile());
            \Log::error('Error line: '.$e->getLine());
            \Log::error('Stack trace: '.$e->getTraceAsString());
            \Log::info('=== ELDERLY CARE LOG DEBUG END ===');

            return redirect()->back()->withErrors([
                'error' => 'Failed to save care log. Please try again.',
            ])->withInput();
        }
    }

    // Store Maternal Care Log
    public function storeMaternalCareLog(Request $request)
    {
        // Add debug logging
        \Log::info('=== Maternal CARE LOG DEBUG START ===');
        \Log::info('Request data:', $request->all());

        // Validate the main required fields
        try {
            $request->validate([
                'care_date' => 'required|date',
                'first_name' => 'required|string|max:255',
                'age_display' => 'required|string|max:255',
            ]);
            \Log::info('Validation passed');
        } catch (\Exception $e) {
            \Log::error('Validation failed:', ['error' => $e->getMessage()]);
            throw $e;
        }

        try {
            $ctx = $this->careLogPersistenceContext($request);
            if ($ctx['cv_id'] === null) {
                return redirect()->back()->with(
                    'error',
                    'Please create a CV before submitting care logs.'
                );
            }

            DB::beginTransaction();
            \Log::info('Transaction started');

            $cvId = $ctx['cv_id'];
            $patientId = $ctx['patient_id'];

            \Log::info('Care log persistence:', [
                'cv_id' => $cvId,
                'patient_id' => $patientId,
                'public' => $ctx['is_public'],
            ]);

            // Create the main care log entry
            \Log::info('Preparing care log data...');
            $careLogData = [
                'cv_id' => $cvId,
                'patient_id' => $patientId,
                'care_date' => $request->care_date,
                'care_type' => 'maternal',
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'age_display' => $request->age_display,
                'gestational_age' => $request->gestational_age,
                'weight_kg' => $request->weight_kg ? (float) $request->weight_kg : null,
                'height_cm' => $request->height_cm ? (float) $request->height_cm : null,
                'additional_notes' => $request->additional_notes,
                'caregiver_name' => $request->caregiver_name,
                'caregiver_signature' => $request->caregiver_signature,
                'guardian_signature' => $request->client_signature,
                'guardian_comment' => $request->client_comment,
                'created_at' => now(),
                'updated_at' => now(),
            ];
            \Log::info('Care log data prepared:', $careLogData);

            $careLog = DB::table('care_logs')->insertGetId($careLogData);
            \Log::info('Care log inserted with ID:', ['care_log_id' => $careLog]);

            // Store emotion/behavior data
            if ($request->emotion_behavior) {
                \Log::info('Processing emotion/behavior data...');
                $emotionData = $request->emotion_behavior;
                try {
                    DB::table('emotion_behaviors')->insert([
                        'care_log_id' => $careLog,
                        'mood' => $emotionData['mood'] ?? null,
                        'behavior' => $emotionData['behavior'] ?? null,
                        'action_taken' => $emotionData['action_taken'] ?? null,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                    \Log::info('Emotion/behavior data inserted');
                } catch (\Exception $e) {
                    \Log::error('Error inserting emotion/behavior data:', ['error' => $e->getMessage()]);
                    throw $e;
                }
            }

            // Store hygiene records
            if ($request->hygiene_records && count($request->hygiene_records) > 0) {
                \Log::info('Processing hygiene records...', ['count' => count($request->hygiene_records)]);
                $hygieneRecords = [];
                foreach ($request->hygiene_records as $index => $hygiene) {
                    // Fix: Map frontend fields (time, activity) to backend fields (hygiene_time, hygiene_activity)
                    if (! empty($hygiene['time']) || ! empty($hygiene['activity'])) {
                        $hygieneRecords[] = [
                            'care_log_id' => $careLog,
                            'hygiene_time' => $hygiene['time'] ?? null,
                            'hygiene_activity' => $hygiene['activity'] ?? null,
                            'notes' => $hygiene['notes'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($hygieneRecords)) {
                    try {
                        DB::table('hygiene_records')->insert($hygieneRecords);
                        \Log::info('Hygiene records inserted', ['count' => count($hygieneRecords)]);
                    } catch (\Exception $e) {
                        \Log::error('Error inserting hygiene records:', ['error' => $e->getMessage()]);
                        throw $e;
                    }
                }
                if ($request->moisturizer_applied !== null || $request->pressure_areas_checked !== null || $request->skin_care_findings !== null) {
                    DB::table('hygiene_records')->insert([
                        'care_log_id' => $careLog,
                        'moisturizer_applied' => $request->moisturizer_applied ?? null,
                        'pressure_areas_checked' => $request->pressure_areas_checked ?? null,
                        'skin_care_findings' => $request->skin_care_findings ?? null,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }

            // Store medication records
            if ($request->medication_records && count($request->medication_records) > 0) {
                \Log::info('Processing medication records...', ['count' => count($request->medication_records)]);
                $medicationRecords = [];
                foreach ($request->medication_records as $medication) {
                    // Fix: Map frontend fields (time, medication) to backend fields (medication_time, medication_name)
                    if (! empty($medication['time']) || ! empty($medication['medication'])) {
                        $medicationRecords[] = [
                            'care_log_id' => $careLog,
                            'administration_time' => $medication['time'] ?? null,
                            'medication_name' => $medication['medication'] ?? null,
                            'dosage' => $medication['dosage'] ?? null,
                            'route' => $medication['route'] ?? null,
                            'notes' => $medication['notes'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($medicationRecords)) {
                    try {
                        DB::table('medication_administrations')->insert($medicationRecords);
                        \Log::info('Medication records inserted', ['count' => count($medicationRecords)]);
                    } catch (\Exception $e) {
                        \Log::error('Error inserting medication records:', ['error' => $e->getMessage()]);
                        throw $e;
                    }
                }
            }

            // Store mobility/exercise records
            if ($request->mobility_records && count($request->mobility_records) > 0) {
                \Log::info('Processing mobility records...', ['count' => count($request->mobility_records)]);
                $mobilityRecords = [];
                foreach ($request->mobility_records as $mobility) {
                    // Fix: Map frontend fields (time, activity) to backend fields (exercise_time, mobility_assistance_details)
                    if (! empty($mobility['time']) || ! empty($mobility['activity'])) {
                        $mobilityRecords[] = [
                            'care_log_id' => $careLog,
                            'exercise_time' => $mobility['time'] ?? null,
                            'duration' => $mobility['duration'] ?? null,
                            'mobility_assistance_details' => $mobility['activity'] ?? null,
                            'notes' => $mobility['notes'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($mobilityRecords)) {
                    try {
                        DB::table('mobility_exercises')->insert($mobilityRecords);
                        \Log::info('Mobility records inserted', ['count' => count($mobilityRecords)]);
                    } catch (\Exception $e) {
                        \Log::error('Error inserting mobility records:', ['error' => $e->getMessage()]);
                        throw $e;
                    }
                }
            }

            // Store intake and output records
            if ($request->intake_records && count($request->intake_records) > 0) {
                \Log::info('Processing intake records...', ['count' => count($request->intake_records)]);
                $intakeRecords = [];
                foreach ($request->intake_records as $intake) {
                    if (! empty($intake['meal_time']) || ! empty($intake['meal_type'])) {
                        $intakeRecords[] = [
                            'care_log_id' => $careLog,
                            'meal_type' => $intake['meal_type'] ?? null,
                            'meal_time' => $intake['meal_time'] ?? null,
                            'food_items' => json_encode($intake['food_items'] ?? []),
                            'amount' => ! empty($intake['amount']) ? $intake['amount'] : null,
                            'amount_unit' => $intake['amount_unit'] ?? 'oz',
                            'assistance_needed' => $intake['assistance_needed'] ?? false,
                            'intake_notes' => $intake['intake_notes'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($intakeRecords)) {
                    try {
                        DB::table('intake_output_records')->insert($intakeRecords);
                        \Log::info('Intake records inserted', ['count' => count($intakeRecords)]);
                    } catch (\Exception $e) {
                        \Log::error('Error inserting intake records:', ['error' => $e->getMessage()]);
                        throw $e;
                    }
                }
            }

            // Store output records
            if ($request->output_records && count($request->output_records) > 0) {
                \Log::info('Processing output records...', ['count' => count($request->output_records)]);
                $outputRecords = [];
                foreach ($request->output_records as $output) {
                    if (! empty($output['record_time']) || ! empty($output['urine_frequency'])) {
                        $outputRecords[] = [
                            'care_log_id' => $careLog,
                            'record_time' => $output['record_time'] ?? null,
                            'urine_frequency' => $output['urine_frequency'] ?? null,
                            'blood_in_urine' => $output['blood_in_urine'] ?? false,
                            'pain_discomfort_urination' => $output['pain_discomfort_urination'] ?? false,
                            'discharge' => $output['discharge'] ?? false,
                            'bowel_movement_frequency' => $output['bowel_movement_frequency'] ?? null,
                            'blood_in_stool' => $output['blood_in_stool'] ?? false,
                            'pain_discomfort_abdomen' => $output['pain_discomfort_abdomen'] ?? false,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($outputRecords)) {
                    try {
                        DB::table('urinary_bowel_records')->insert($outputRecords);
                        \Log::info('Output records inserted', ['count' => count($outputRecords)]);
                    } catch (\Exception $e) {
                        \Log::error('Error inserting output records:', ['error' => $e->getMessage()]);
                        throw $e;
                    }
                }
            }

            // Store activity records
            if ($request->activity_records && count($request->activity_records) > 0) {
                \Log::info('Processing activity records...', ['count' => count($request->activity_records)]);
                $activityRecords = [];
                foreach ($request->activity_records as $activity) {
                    // Fix: Map frontend fields (time, activity) to backend fields (activity_time, activity_type)
                    if (! empty($activity['time']) || ! empty($activity['activity'])) {
                        $activityRecords[] = [
                            'care_log_id' => $careLog,
                            'activity_time' => $activity['time'] ?? null,
                            'activity_type' => $activity['activity'] ?? null,
                            'duration' => $activity['duration'] ?? null,
                            'notes' => $activity['notes'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($activityRecords)) {
                    try {
                        DB::table('activity_records')->insert($activityRecords);
                        \Log::info('Activity records inserted', ['count' => count($activityRecords)]);
                    } catch (\Exception $e) {
                        \Log::error('Error inserting activity records:', ['error' => $e->getMessage()]);
                        throw $e;
                    }
                }
            }

            // Store sleep records
            if ($request->sleep_records && count($request->sleep_records) > 0) {
                \Log::info('Processing sleep records...', ['count' => count($request->sleep_records)]);
                $sleepRecords = [];
                foreach ($request->sleep_records as $sleep) {
                    if (! empty($sleep['type']) || ! empty($sleep['sleep_start_time']) || ! empty($sleep['duration'])) {
                        $sleepRecords[] = [
                            'care_log_id' => $careLog,
                            'type' => $sleep['type'] ?? null,
                            'sleep_start_time' => $sleep['sleep_start_time'] ?? null,
                            'duration' => $sleep['duration'] ?? null,
                            'sleep_quality' => $sleep['sleep_quality'] ?? null,
                            'notes' => $sleep['notes'] ?? null,
                            'sleep_issues' => $request->sleep_issues ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($sleepRecords)) {
                    try {
                        DB::table('sleep_records')->insert($sleepRecords);
                        \Log::info('Sleep records inserted', ['count' => count($sleepRecords)]);
                    } catch (\Exception $e) {
                        \Log::error('Error inserting sleep records:', ['error' => $e->getMessage()]);
                        throw $e;
                    }
                }
            }

            // Fetal Health records
            if ($request->fetal_health) {
                \Log::info('Processing fetal health records...');
                $fetalHealthRecords = $request->fetal_health;
                try {
                    DB::table('fetal_health_records')->insert([
                        'care_log_id' => $careLog,
                        'fetal_movement_detected' => $fetalHealthRecords['fetal_movement_detected'] ?? null,
                        'kick_count' => $fetalHealthRecords['kick_count'] ? (int) $fetalHealthRecords['kick_count'] : null,
                        'fetal_heart_sound' => $fetalHealthRecords['fetal_heart_sound'] ? (int) $fetalHealthRecords['fetal_heart_sound'] : null,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                    \Log::info('Fetal health data inserted');
                } catch (\Exception $e) {
                    \Log::error('Error inserting fetal health data:', ['error' => $e->getMessage()]);
                    throw $e;
                }
            }

            // Store emergency incidents
            if ($request->emergency_incidents && count($request->emergency_incidents) > 0) {
                \Log::info('Processing emergency incidents...', ['count' => count($request->emergency_incidents)]);
                $emergencyRecords = [];
                foreach ($request->emergency_incidents as $incident) {
                    if (! empty($incident['incident_time']) || ! empty($incident['incident_description'])) {
                        $emergencyRecords[] = [
                            'care_log_id' => $careLog,
                            'incident_time' => ! empty($incident['incident_time']) ?
                                $request->care_date.' '.$incident['incident_time'] : null,
                            'incident_description' => $incident['incident_description'] ?? null,
                            'severity' => $incident['severity'] ?? 'medium',
                            'actions_taken' => $incident['actions_taken'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($emergencyRecords)) {
                    try {
                        DB::table('emergency_incidents')->insert($emergencyRecords);
                        \Log::info('Emergency incidents inserted', ['count' => count($emergencyRecords)]);
                    } catch (\Exception $e) {
                        \Log::error('Error inserting emergency incidents:', ['error' => $e->getMessage()]);
                        throw $e;
                    }
                }
            }

            // Store household work records
            if ($request->household_records && count($request->household_records) > 0) {
                \Log::info('Processing household work records...', ['count' => count($request->household_records)]);
                $houseworkRecords = [];
                foreach ($request->household_records as $housework) {
                    if (! empty($housework['household_work']) || ! empty($housework['start_time'])) {
                        $houseworkRecords[] = [
                            'care_log_id' => $careLog,
                            'household_work' => $housework['household_work'] ?? null,
                            'start_time' => $housework['start_time'] ?? null,
                            'duration' => $housework['duration'] ?? null,
                            'notes' => $housework['notes'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($houseworkRecords)) {
                    try {
                        DB::table('household_work_records')->insert($houseworkRecords);
                        \Log::info('Household work records inserted', ['count' => count($houseworkRecords)]);
                    } catch (\Exception $e) {
                        \Log::error('Error inserting household work records:', ['error' => $e->getMessage()]);
                        throw $e;
                    }
                }
            }

            // Store vital signs
            if ($request->vital_signs && count($request->vital_signs) > 0) {
                \Log::info('Processing vital signs...', ['count' => count($request->vital_signs)]);
                $vitalRecords = [];
                foreach ($request->vital_signs as $vital) {
                    if (! empty($vital['measurement_time']) ||
                        ! empty($vital['temperature']) ||
                        ! empty($vital['pulse_rate']) ||
                        ! empty($vital['respiratory_rate']) ||
                        ! empty($vital['systolic_pressure']) ||
                        ! empty($vital['spo2'])) {

                        $vitalRecords[] = [
                            'care_log_id' => $careLog,
                            'measurement_time' => $vital['measurement_time'] ?? null,
                            'temperature' => ! empty($vital['temperature']) ? (float) $vital['temperature'] : null,
                            'temperature_unit' => $vital['temperature_unit'] ?? 'C',
                            'pulse_rate' => ! empty($vital['pulse_rate']) ? (int) $vital['pulse_rate'] : null,
                            'respiratory_rate' => ! empty($vital['respiratory_rate']) ? (int) $vital['respiratory_rate'] : null,
                            'systolic_pressure' => ! empty($vital['systolic_pressure']) ? (int) $vital['systolic_pressure'] : null,
                            'diastolic_pressure' => ! empty($vital['diastolic_pressure']) ? (int) $vital['diastolic_pressure'] : null,
                            'spo2' => ! empty($vital['spo2']) ? (int) $vital['spo2'] : null,
                            'notes' => $vital['notes'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($vitalRecords)) {
                    try {
                        DB::table('vital_signs')->insert($vitalRecords);
                        \Log::info('Vital signs inserted', ['count' => count($vitalRecords)]);
                    } catch (\Exception $e) {
                        \Log::error('Error inserting vital signs:', ['error' => $e->getMessage()]);
                        throw $e;
                    }
                }
            }

            // Store blood glucose records
            if ($request->blood_glucose_records && count($request->blood_glucose_records) > 0) {
                \Log::info('Processing blood glucose records...', ['count' => count($request->blood_glucose_records)]);
                $glucoseRecords = [];
                foreach ($request->blood_glucose_records as $glucose) {
                    if (! empty($glucose['measurement_time']) || ! empty($glucose['glucose_level'])) {
                        $glucoseRecords[] = [
                            'care_log_id' => $careLog,
                            'measurement_time' => $glucose['measurement_time'] ?? null,
                            'glucose_level' => ! empty($glucose['glucose_level']) ? (float) $glucose['glucose_level'] : null,
                            'timing' => $glucose['timing'] ?? null,
                            'notes' => $glucose['notes'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($glucoseRecords)) {
                    try {
                        DB::table('blood_glucose_records')->insert($glucoseRecords);
                        \Log::info('Blood glucose records inserted', ['count' => count($glucoseRecords)]);
                    } catch (\Exception $e) {
                        \Log::error('Error inserting blood glucose records:', ['error' => $e->getMessage()]);
                        throw $e;
                    }
                }
            }

            // Store requested supplies
            if ($request->requested_supplies && count($request->requested_supplies) > 0) {
                \Log::info('Processing supply requests...', ['count' => count($request->requested_supplies)]);
                $supplyRecords = [];
                foreach ($request->requested_supplies as $supply) {
                    if (! empty($supply['item'])) {
                        $supplyRecords[] = [
                            'care_log_id' => $careLog,
                            'item' => $supply['item'],
                            'quantity' => $supply['quantity'] ?? null,
                            'purpose' => $supply['purpose'] ?? null,
                            'priority' => $supply['priority'] ?? 'medium',
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
                if (! empty($supplyRecords)) {
                    try {
                        DB::table('requested_supplies')->insert($supplyRecords);
                        \Log::info('Supply requests inserted', ['count' => count($supplyRecords)]);
                    } catch (\Exception $e) {
                        \Log::error('Error inserting supply requests:', ['error' => $e->getMessage()]);
                        throw $e;
                    }
                }
            }

            DB::commit();
            \Log::info('Transaction committed successfully');

            return $this->redirectAfterCareLogStore($request, [
                'success' => 'Maternal care log submitted successfully!',
                'show_pdf_prompt' => true,
                'care_log_data' => [
                    'id' => $careLog,
                    'first_name' => $request->first_name,
                    'form_data' => $request->all(),
                ],
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('=== MATERNAL CARE LOG ERROR ===');
            \Log::error('Error message: '.$e->getMessage());
            \Log::error('Error file: '.$e->getFile());
            \Log::error('Error line: '.$e->getLine());
            \Log::error('Stack trace: '.$e->getTraceAsString());
            \Log::info('=== MATERNAL CARE LOG DEBUG END ===');

            return redirect()->back()->withErrors([
                'error' => 'Failed to save care log. Please try again.',
            ])->withInput();
        }
    }

    // Newborn Care Log Details
    public function getBabyCareLogDetails($id)
    {
        $careLogData = $this->getCareLogData($id, 'baby');

        return Inertia::render('Caregiver/CareLogs/BabyCareLog/BabyCareLogDetails', [
            'careLogData' => $careLogData,
        ]);
    }

    public function showBabyCareLogDetails($id)
    {
        $careLogData = $this->getCareLogData($id, 'baby');

        return Inertia::render('Caregiver/CareLogs/BabyCareLog/ShowBabyCareLogDetails', [
            'careLogData' => $careLogData,
        ]);
    }

    // Newborn Care Log Details
    public function getNewbornCareLogDetails($id)
    {
        $careLogData = $this->getCareLogData($id, 'newborn');

        return Inertia::render('Caregiver/CareLogs/NewbornCareLog/NewbornCareLogDetails', [
            'careLogData' => $careLogData,
        ]);
    }

    // Preview like PDF file in webpage (not real PDF file) because Myanmar font issue
    public function showNewbornCareLogDetails($id)
    {
        $careLogData = $this->getCareLogData($id, 'newborn');

        return Inertia::render('Caregiver/CareLogs/NewbornCareLog/ShowNewbornCareLogDetails', [
            'careLogData' => $careLogData,
        ]);
    }

    // Maternal Care Log Details
    public function getMaternalCareLogDetails($id)
    {
        $careLogData = $this->getCareLogData($id, 'maternal');

        return Inertia::render('Caregiver/CareLogs/MaternalCareLog/MaternalCareLogDetails', [
            'careLogData' => $careLogData,
        ]);
    }

    // Preview like PDF file in webpage (not real PDF file) because Myanmar font issue
    public function showMaternalCareLogDetails($id)
    {
        $careLogData = $this->getCareLogData($id, 'maternal');

        return Inertia::render('Caregiver/CareLogs/MaternalCareLog/ShowMaternalCareLogDetails', [
            'careLogData' => $careLogData,
        ]);
    }

    // Elderly Care Log Details
    public function getElderlyCareLogDetails($id)
    {
        $careLogData = $this->getCareLogData($id, 'elder');

        return Inertia::render('Caregiver/CareLogs/ElderlyCareLog/ElderlyCareLogDetails', [
            'careLogData' => $careLogData,
        ]);
    }

    // Preview like PDF file in webpage (not real PDF file) because Myanmar font issue
    public function showElderlyCareLogDetails($id)
    {
        $careLogData = $this->getCareLogData($id, 'elder');

        return Inertia::render('Caregiver/CareLogs/ElderlyCareLog/ShowElderlyCareLogDetails', [
            'careLogData' => $careLogData,
        ]);
    }

    /**
     * Care log detail payload for public link history (scoped by assignment cv + patient).
     *
     * @return array<string, mixed>
     */
    public function getCareLogDataForPublic(int $careLogId, int $cvId, int $patientId, string $careType): array
    {
        $careLog = DB::table('care_logs')
            ->where('id', $careLogId)
            ->where('cv_id', $cvId)
            ->where('patient_id', $patientId)
            ->where('care_type', $careType)
            ->first();

        if (! $careLog) {
            abort(404, 'Care log not found or access denied');
        }

        return array_merge(
            ['care_log' => $careLog],
            $this->fetchCareLogRelatedRecords($careLogId, $careType)
        );
    }

    // Private helper method to get care log data (shared logic)
    private function getCareLogData($id, $expectedCareType = null)
    {
        $user = Auth::user();
        $cvId = $user->cv ? $user->cv->id : null;

        // Fetch the main care log
        $careLogQuery = DB::table('care_logs')
            ->where('id', $id)
            ->where('cv_id', $cvId); // Ensure caregiver can only view their own logs

        // Optional: Verify care type if provided
        if ($expectedCareType) {
            $careLogQuery->where('care_type', $expectedCareType);
        }

        $careLog = $careLogQuery->first();

        if (! $careLog) {
            abort(404, 'Care log not found or access denied');
        }

        return array_merge(
            ['care_log' => $careLog],
            $this->fetchCareLogRelatedRecords($id, $expectedCareType)
        );
    }

    /**
     * Related rows for a care log (feeding/diaper for newborn and baby).
     *
     * @return array<string, mixed>
     */
    private function fetchCareLogRelatedRecords(int $id, ?string $expectedCareType): array
    {
        $loadInfantFeedingDiaper = in_array($expectedCareType, ['newborn', 'baby'], true);

        if ($loadInfantFeedingDiaper) {
            $feedingRecords = DB::table('feeding_records')
                ->where('care_log_id', $id)
                ->orderBy('feeding_time')
                ->get();
        } else {
            $feedingRecords = [];
        }

        if ($loadInfantFeedingDiaper) {
            $diaperChangeRecords = DB::table('diaper_changes')
                ->where('care_log_id', $id)
                ->orderBy('change_time')
                ->get();
        } else {
            $diaperChangeRecords = [];
        }

        $emotionBehavior = DB::table('emotion_behaviors')
            ->where('care_log_id', $id)
            ->first();

        $hygieneRecords = DB::table('hygiene_records')
            ->where('care_log_id', $id)
            ->orderBy('hygiene_time')
            ->get();

        $medicationRecords = DB::table('medication_administrations')
            ->where('care_log_id', $id)
            ->orderBy('administration_time')
            ->get();

        $mobilityRecords = DB::table('mobility_exercises')
            ->where('care_log_id', $id)
            ->orderBy('exercise_time')
            ->get();

        $intake_output_records = DB::table('intake_output_records')
            ->where('care_log_id', $id)
            ->orderBy('created_at')
            ->get();

        $activityRecords = DB::table('activity_records')
            ->where('care_log_id', $id)
            ->orderBy('activity_time')
            ->get();

        $sleepRecords = DB::table('sleep_records')
            ->where('care_log_id', $id)
            ->orderBy('sleep_start_time')
            ->get();

        $emergencyIncidents = DB::table('emergency_incidents')
            ->where('care_log_id', $id)
            ->orderBy('incident_time')
            ->get();

        $householdRecords = DB::table('household_work_records')
            ->where('care_log_id', $id)
            ->orderBy('start_time')
            ->get();

        $vitalSigns = DB::table('vital_signs')
            ->where('care_log_id', $id)
            ->orderBy('measurement_time')
            ->get();

        $bloodGlucoseRecords = DB::table('blood_glucose_records')
            ->where('care_log_id', $id)
            ->orderBy('measurement_time')
            ->get();

        $supplyRequests = DB::table('requested_supplies')
            ->where('care_log_id', $id)
            ->get();

        $fetalRecords = DB::table('fetal_health_records')
            ->where('care_log_id', $id)
            ->first();

        $urinaryBowelRecords = DB::table('urinary_bowel_records')
            ->where('care_log_id', $id)
            ->orderBy('record_time')
            ->get();

        return [
            'feeding_records' => $feedingRecords,
            'diaper_changes' => $diaperChangeRecords,
            'emotion_behavior' => $emotionBehavior,
            'hygiene_records' => $hygieneRecords,
            'medication_records' => $medicationRecords,
            'mobility_records' => $mobilityRecords,
            'intake_output_records' => $intake_output_records,
            'activity_records' => $activityRecords,
            'sleep_records' => $sleepRecords,
            'emergency_incidents' => $emergencyIncidents,
            'household_records' => $householdRecords,
            'vital_signs' => $vitalSigns,
            'blood_glucose_records' => $bloodGlucoseRecords,
            'supply_requests' => $supplyRequests,
            'fetal_health_records' => $fetalRecords,
            'urinary_bowel_records' => $urinaryBowelRecords,
        ];
    }

    // Show all care logs to admin
    public function adminCareLogs(Request $request)
    {
        $query = DB::table('care_logs')
            ->select([
                'care_logs.*',
                'c_v_s.full_name as caregiver_full_name',
                'patients.service_area as service_area',
            ])
            ->leftJoin('c_v_s', 'care_logs.cv_id', '=', 'c_v_s.id')
            ->leftJoin('patients', 'care_logs.patient_id', '=', 'patients.id')
            ->orderBy('care_date', 'desc');

        // Apply filters
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('care_logs.first_name', 'like', "%{$search}%")
                    ->orWhere('care_logs.last_name', 'like', "%{$search}%")
                    ->orWhere('care_logs.caregiver_name', 'like', "%{$search}%")
                    ->orWhere('c_v_s.full_name', 'like', "%{$search}%");
            });
        }

        if ($request->filled('care_type')) {
            $query->where('care_logs.care_type', $request->care_type);
        }

        if ($request->filled('service_area') && in_array($request->service_area, ['Yangon', 'Mandalay'], true)) {
            $query->where('patients.service_area', $request->service_area);
        }

        if ($request->filled('date_from')) {
            $query->where('care_logs.care_date', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->where('care_logs.care_date', '<=', $request->date_to);
        }

        // Get paginated results
        $careLogs = $query->paginate(20);

        // Transform caregiver name for display
        $careLogs->through(function ($log) {
            $log->caregiver_name = $log->caregiver_full_name ?: 'Not specified';

            return $log;
        });

        // Count care logs by type (no filters, total in DB)
        $careTypeCounts = DB::table('care_logs')
            ->select('care_type', DB::raw('count(*) as total'))
            ->whereIn('care_type', ['baby', 'newborn', 'maternal', 'elder'])
            ->groupBy('care_type')
            ->pluck('total', 'care_type')
            ->toArray();

        // Ensure all types are present
        $careTypeCounts = array_merge([
            'baby' => 0,
            'newborn' => 0,
            'maternal' => 0,
            'elder' => 0,
        ], $careTypeCounts);

        return Inertia::render('Admin/CareLogs/AdminCareLogs', [
            'careLogs' => $careLogs,
            'filters' => [
                'search' => $request->search,
                'care_type' => $request->care_type,
                'service_area' => $request->service_area,
                'date_from' => $request->date_from,
                'date_to' => $request->date_to,
            ],
            'careTypeCounts' => $careTypeCounts,
        ]);
    }

    // Admin Care Log Details Methods
    public function adminBabyCareLogDetails($id)
    {
        $careLogData = $this->getAdminCareLogData($id, 'baby');

        return Inertia::render('Admin/CareLogs/AdminBabyCareLogDetails', [
            'careLogData' => $careLogData,
        ]);
    }

    public function adminShowBabyCareLogDetails($id)
    {
        $careLogData = $this->getAdminCareLogData($id, 'baby');

        return Inertia::render('Caregiver/CareLogs/BabyCareLog/ShowBabyCareLogDetails', [
            'careLogData' => $careLogData,
        ]);
    }

    public function adminNewbornCareLogDetails($id)
    {
        $careLogData = $this->getAdminCareLogData($id, 'newborn');

        return Inertia::render('Admin/CareLogs/AdminNewbornCareLogDetails', [
            'careLogData' => $careLogData,
        ]);
    }

    // Admin Care Log Details Preview Methods
    public function adminShowNewbornCareLogDetails($id)
    {
        $careLogData = $this->getAdminCareLogData($id, 'newborn');

        return Inertia::render('Caregiver/CareLogs/NewbornCareLog/ShowNewbornCareLogDetails', [ // Shared same file as caregiver
            'careLogData' => $careLogData,
        ]);
    }

    public function adminMaternalCareLogDetails($id)
    {
        $careLogData = $this->getAdminCareLogData($id, 'maternal');

        return Inertia::render('Admin/CareLogs/AdminMaternalCareLogDetails', [
            'careLogData' => $careLogData,
        ]);
    }

    // Admin Maternal Care Log Details Preview Methods
    public function adminShowMaternalCareLogDetails($id)
    {
        $careLogData = $this->getAdminCareLogData($id, 'maternal');

        return Inertia::render('Caregiver/CareLogs/MaternalCareLog/ShowMaternalCareLogDetails', [
            'careLogData' => $careLogData,
        ]);
    }

    public function adminElderlyCareLogDetails($id)
    {
        $careLogData = $this->getAdminCareLogData($id, 'elder');

        return Inertia::render('Admin/CareLogs/AdminElderlyCareLogDetails', [
            'careLogData' => $careLogData,
        ]);
    }

    public function adminShowElderlyCareLogDetails($id)
    {
        $careLogData = $this->getAdminCareLogData($id, 'elder');

        return Inertia::render('Caregiver/CareLogs/ElderlyCareLog/ShowElderlyCareLogDetails', [
            'careLogData' => $careLogData,
        ]);
    }

    // Admin version of getCareLogData (no CV restriction)
    private function getAdminCareLogData($id, $expectedCareType = null)
    {
        // Fetch the main care log with caregiver info
        $careLogQuery = DB::table('care_logs')
            ->select([
                'care_logs.*',
                'c_v_s.full_name as caregiver_full_name',
            ])
            ->leftJoin('c_v_s', 'care_logs.cv_id', '=', 'c_v_s.id')
            ->where('care_logs.id', $id);

        // Optional: Verify care type if provided
        if ($expectedCareType) {
            $careLogQuery->where('care_logs.care_type', $expectedCareType);
        }

        $careLog = $careLogQuery->first();

        if (! $careLog) {
            abort(404, 'Care log not found');
        }

        // Add caregiver name for display
        $careLog->caregiver_display_name = $careLog->caregiver_full_name ?: 'Not specified';

        return array_merge(
            ['care_log' => $careLog],
            $this->fetchCareLogRelatedRecords($id, $expectedCareType)
        );
    }

    /**
     * @return array{cv_id: int|null, patient_id: int|null, is_public: bool}
     */
    protected function careLogPersistenceContext(Request $request): array
    {
        $public = $request->attributes->get('public_care_log_context');
        if (is_array($public) && isset($public['cv_id'], $public['patient_id'])) {
            return [
                'cv_id' => (int) $public['cv_id'],
                'patient_id' => (int) $public['patient_id'],
                'is_public' => true,
            ];
        }

        $user = Auth::user();
        $cvId = $user?->cv?->id;

        return [
            'cv_id' => $cvId !== null ? (int) $cvId : null,
            'patient_id' => null,
            'is_public' => false,
        ];
    }

    protected function redirectAfterCareLogStore(Request $request, array $flash): RedirectResponse
    {
        $uuid = $request->attributes->get('public_care_log_uuid');
        if (is_string($uuid) && $uuid !== '') {
            $success = $flash['success'] ?? 'Care log submitted successfully!';

            return redirect()
                ->route('public.care-log.history', ['uuid' => $uuid])
                ->with('success', $success);
        }

        return redirect()->route('cg.mycarelogs')->with($flash);
    }
}
