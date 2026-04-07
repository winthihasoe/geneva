/**
 * Map API `careLogData` (care_log + related rows) into the shape expected by PDF generators.
 */

function parseFoodItemsJson(raw) {
    if (raw == null || raw === "") {
        return [];
    }
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function newbornVitalSignsToForm(vital_signs) {
    const vitalSigns = {
        times: [],
        temperature: [],
        temperatureUnit: [],
        pulseRate: [],
        respiratoryRate: [],
    };
    vital_signs?.forEach((sign) => {
        vitalSigns.times.push(sign.measurement_time || "");
        vitalSigns.temperature.push(sign.temperature || "");
        vitalSigns.temperatureUnit.push(sign.temperature_unit || "C");
        vitalSigns.pulseRate.push(sign.pulse_rate || "");
        vitalSigns.respiratoryRate.push(sign.respiratory_rate || "");
    });
    return vitalSigns;
}

function maternalElderVitalSignsToForm(vital_signs) {
    const vitalSigns = {
        times: [],
        bloodPressureSystolic: [],
        bloodPressureDiastolic: [],
        temperature: [],
        temperatureUnit: [],
        pulseRate: [],
        respiratoryRate: [],
        spo2: [],
    };
    vital_signs?.forEach((sign) => {
        vitalSigns.times.push(sign.measurement_time || "");
        vitalSigns.bloodPressureSystolic.push(sign.systolic_pressure || "");
        vitalSigns.bloodPressureDiastolic.push(sign.diastolic_pressure || "");
        vitalSigns.temperature.push(sign.temperature || "");
        vitalSigns.temperatureUnit.push(sign.temperature_unit || "C");
        vitalSigns.pulseRate.push(sign.pulse_rate || "");
        vitalSigns.respiratoryRate.push(sign.respiratory_rate || "");
        vitalSigns.spo2.push(sign.spo2 || "");
    });
    return vitalSigns;
}

export function transformNewbornCareLogToPdfFormData(careLogData) {
    const {
        care_log,
        emotion_behavior,
        feeding_records,
        diaper_changes,
        sleep_records,
        activity_records,
        hygiene_records,
        vital_signs,
        supply_requests,
    } = careLogData;

    return {
        date: care_log.care_date,
        firstName: care_log.first_name,
        lastName: care_log.last_name || "",
        age: care_log.age_display,
        weight: care_log.weight_kg,
        height: care_log.height_cm,
        additionalNotes: care_log.additional_notes,
        caregiverName: care_log.caregiver_name,
        caregiverSignature: care_log.caregiver_signature,
        guardianSignature: care_log.guardian_signature,
        guardianComment: care_log.guardian_comment,
        mood: emotion_behavior?.mood,
        symptoms: emotion_behavior?.symptoms,
        medications: emotion_behavior?.medications,
        feeding:
            feeding_records?.map((record) => ({
                time: record.feeding_time,
                type: record.feeding_type,
                amount: record.amount,
                amount_unit: record.amount_unit,
                notes: record.notes,
            })) || [],
        diaperChanges:
            diaper_changes?.map((record) => ({
                time: record.change_time,
                content: record.diaper_content,
                notes: record.notes,
            })) || [],
        sleep:
            sleep_records?.map((record) => ({
                timeStarted: record.sleep_start_time,
                timeEnded: record.sleep_end_time,
                duration: record.duration,
                notes: record.notes,
            })) || [],
        activities:
            activity_records?.map((record) => ({
                time: record.activity_time,
                activity: record.activity_type,
                duration: record.duration,
                details: record.notes,
            })) || [],
        hygiene:
            hygiene_records?.map((record) => ({
                time: record.hygiene_time,
                activity: record.hygiene_activity,
                products: record.products_used,
                notes: record.notes,
            })) || [],
        vitalSigns: newbornVitalSignsToForm(vital_signs),
        requestedSupplies:
            supply_requests?.map((record) => ({
                item: record.item,
                quantity: record.quantity,
                purpose: record.purpose,
                priority: record.priority,
            })) || [],
    };
}

export function transformBabyCareLogToPdfFormData(careLogData) {
    const {
        care_log,
        emotion_behavior,
        feeding_records,
        food_offered_records,
        diaper_changes,
        toileting_training_records,
        sleep_records,
        activity_records,
        hygiene_records,
        vital_signs,
        supply_requests,
    } = careLogData;

    return {
        date: care_log.care_date,
        firstName: care_log.first_name,
        lastName: care_log.last_name || "",
        age: care_log.age_display,
        weight: care_log.weight_kg,
        height: care_log.height_cm,
        additionalNotes: care_log.additional_notes,
        caregiverName: care_log.caregiver_name,
        caregiverSignature: care_log.caregiver_signature,
        guardianSignature: care_log.guardian_signature,
        guardianComment: care_log.guardian_comment,
        mood: emotion_behavior?.mood,
        symptoms: emotion_behavior?.symptoms,
        medications: emotion_behavior?.medications,
        feeding:
            feeding_records?.map((record) => ({
                time: record.feeding_time,
                type: record.feeding_type,
                amount: record.amount,
                amount_unit: record.amount_unit,
                notes: record.notes,
            })) || [],
        foodOffered:
            food_offered_records?.map((record) => ({
                mealTime: record.meal_time,
                foodOffer: record.food_offered,
                quantity: record.quantity,
                texture: record.texture,
                reaction: record.reaction_notes,
            })) || [],
        diaperChanges:
            diaper_changes?.map((record) => ({
                time: record.change_time,
                content: record.diaper_content,
                notes: record.notes,
            })) || [],
        toileting:
            toileting_training_records?.map((record) => ({
                time: record.time,
                toiletAttempt: record.toilet_attempt,
                result: record.result,
                type: record.type,
                reaction: record.reaction,
                notes: record.notes,
            })) || [],
        sleep:
            sleep_records?.map((record) => ({
                timeStarted: record.sleep_start_time,
                timeEnded: record.sleep_end_time,
                duration: record.duration,
                notes: record.notes,
            })) || [],
        activities:
            activity_records?.map((record) => ({
                time: record.activity_time,
                activity: record.activity_type,
                duration: record.duration,
                details: record.notes,
            })) || [],
        hygiene:
            hygiene_records?.map((record) => ({
                time: record.hygiene_time,
                activity: record.hygiene_activity,
                products: record.products_used,
                notes: record.notes,
            })) || [],
        vitalSigns: newbornVitalSignsToForm(vital_signs),
        requestedSupplies:
            supply_requests?.map((record) => ({
                item: record.item,
                quantity: record.quantity,
                purpose: record.purpose,
                priority: record.priority,
            })) || [],
    };
}

export function transformMaternalCareLogToPdfFormData(careLogData) {
    const {
        care_log,
        emotion_behavior,
        hygiene_records,
        medication_records,
        mobility_records,
        intake_output_records,
        urinary_bowel_records,
        activity_records,
        sleep_records,
        emergency_incidents,
        household_records,
        vital_signs,
        blood_glucose_records,
        supply_requests,
        fetal_health_records,
    } = careLogData;

    const sleepList = sleep_records || [];

    return {
        date: care_log.care_date,
        firstName: care_log.first_name,
        lastName: care_log.last_name || "",
        age: care_log.age_display,
        gestationalAge: care_log.gestational_age,
        weight: care_log.weight_kg,
        height: care_log.height_cm,
        additionalNotes: care_log.additional_notes,
        caregiverName: care_log.caregiver_name,
        caregiverSignature: care_log.caregiver_signature,
        guardianSignature: care_log.guardian_signature,
        guardianComment: care_log.guardian_comment,
        emotionalMood: emotion_behavior?.mood,
        behavioralConcerns: emotion_behavior?.behavior,
        emotionalActionTaken: emotion_behavior?.action_taken,
        hygiene:
            hygiene_records?.map((record) => ({
                time: record.hygiene_time,
                activity: record.hygiene_activity,
                notes: record.notes,
                moisturizer_applied: record.moisturizer_applied,
                pressure_areas_checked: record.pressure_areas_checked,
                skin_care_findings: record.skin_care_findings,
            })) || [],
        medication:
            medication_records?.map((record) => ({
                time: record.administration_time,
                medication: record.medication_name,
                dosage: record.dosage,
                route: record.route,
                notes: record.notes,
            })) || [],
        mobility:
            mobility_records?.map((record) => ({
                time: record.exercise_time,
                duration: record.duration,
                activity: record.mobility_assistance_details,
                notes: record.notes,
            })) || [],
        intake:
            intake_output_records
                ?.filter((record) => record.meal_type)
                ?.map((record) => ({
                    meal_type: record.meal_type,
                    meal_time: record.meal_time,
                    food_items: parseFoodItemsJson(record.food_items),
                    amount: record.amount,
                    amount_unit: record.amount_unit,
                    assistance_needed: record.assistance_needed,
                    intake_notes: record.intake_notes,
                })) || [],
        output:
            urinary_bowel_records
                ?.filter(
                    (record) => record.record_time || record.urine_frequency
                )
                ?.map((record) => ({
                    record_time: record.record_time,
                    urine_frequency: record.urine_frequency,
                    blood_in_urine: record.blood_in_urine,
                    pain_discomfort_urination: record.pain_discomfort_urination,
                    bowel_movement_frequency: record.bowel_movement_frequency,
                    blood_in_stool: record.blood_in_stool,
                    discharge: record.discharge,
                    other_symptoms: record.other_symptoms,
                })) || [],
        activities:
            activity_records?.map((record) => ({
                activity: record.activity_type,
                time: record.activity_time,
                duration: record.duration,
                notes: record.notes,
            })) || [],
        sleep:
            sleepList.map((record) => ({
                type: record.type,
                time: record.sleep_start_time,
                duration: record.duration,
                quality: record.sleep_quality,
                notes: record.notes,
            })) || [],
        sleepIssues:
            sleepList.length > 0 ? sleepList[0]?.sleep_issue || "" : "",
        accidents:
            emergency_incidents?.map((record) => ({
                time:
                    record.incident_time?.split(" ")[1] ||
                    record.incident_time,
                description: record.incident_description,
                severity: record.severity,
                action: record.actions_taken,
            })) || [],
        household:
            household_records?.map((record) => ({
                task: record.household_work,
                time: record.start_time,
                duration: record.duration,
                notes: record.notes,
            })) || [],
        vitalSigns: maternalElderVitalSignsToForm(vital_signs),
        bloodGlucose:
            blood_glucose_records?.map((record) => ({
                measurement_time: record.measurement_time,
                glucose_level: record.glucose_level,
                timing: record.timing,
                note: record.notes,
            })) || [],
        supplies:
            supply_requests?.map((record) => ({
                item: record.item,
                quantity: record.quantity,
                purpose: record.purpose,
                priority: record.priority,
            })) || [],
        fetalHealth: {
            fetal_movement_detected:
                fetal_health_records?.fetal_movement_detected ?? null,
            fetal_heart_sound: fetal_health_records?.fetal_heart_sound ?? null,
            kick_count: fetal_health_records?.kick_count ?? null,
            notes: fetal_health_records?.notes ?? null,
        },
    };
}

export function transformElderlyCareLogToPdfFormData(careLogData) {
    const {
        care_log,
        emotion_behavior,
        hygiene_records,
        medication_records,
        mobility_records,
        intake_output_records,
        activity_records,
        sleep_records,
        emergency_incidents,
        household_records,
        vital_signs,
        blood_glucose_records,
        supply_requests,
    } = careLogData;

    const sleepList = sleep_records || [];

    return {
        date: care_log.care_date,
        firstName: care_log.first_name,
        lastName: care_log.last_name || "",
        age: care_log.age_display,
        weight: care_log.weight_kg,
        height: care_log.height_cm,
        additionalNotes: care_log.additional_notes,
        caregiverName: care_log.caregiver_name,
        caregiverSignature: care_log.caregiver_signature,
        guardianSignature: care_log.guardian_signature,
        guardianComment: care_log.guardian_comment,
        emotionalMood: emotion_behavior?.mood,
        behavioralConcerns: emotion_behavior?.behavior,
        emotionalActionTaken: emotion_behavior?.action_taken,
        hygiene:
            hygiene_records?.map((record) => ({
                time: record.hygiene_time,
                activity: record.hygiene_activity,
                notes: record.notes,
                moisturizer_applied: record.moisturizer_applied,
                pressure_areas_checked: record.pressure_areas_checked,
                skin_care_findings: record.skin_care_findings,
            })) || [],
        medication:
            medication_records?.map((record) => ({
                time: record.administration_time,
                medication: record.medication_name,
                dosage: record.dosage,
                route: record.route,
                notes: record.notes,
            })) || [],
        mobility:
            mobility_records?.map((record) => ({
                time: record.exercise_time,
                duration: record.duration,
                activity: record.mobility_assistance_details,
                notes: record.notes,
            })) || [],
        intake:
            intake_output_records
                ?.filter((record) => record.meal_type)
                ?.map((record) => ({
                    meal_type: record.meal_type,
                    meal_time: record.meal_time,
                    food_items: parseFoodItemsJson(record.food_items),
                    amount: record.amount,
                    amount_unit: record.amount_unit,
                    assistance_needed: record.assistance_needed,
                    intake_notes: record.intake_notes,
                })) || [],
        output:
            intake_output_records
                ?.filter(
                    (record) => record.output_time || record.urine_volume
                )
                ?.map((record) => ({
                    output_time: record.output_time,
                    urine_volume: record.urine_volume,
                    urine_volume_unit: record.urine_volume_unit,
                    urine_color: record.urine_color,
                    bowel_movement: record.bowel_movement,
                    bowel_consistency: record.bowel_consistency,
                    output_notes: record.output_notes,
                })) || [],
        hydration:
            intake_output_records
                ?.filter(
                    (record) =>
                        record.fluid_intake || record.dehydration_signs
                )
                ?.map((record) => ({
                    fluid_intake: record.fluid_intake,
                    fluid_intake_unit: record.fluid_intake_unit,
                    dehydration_signs: record.dehydration_signs,
                    other_dehydration_signs: record.other_dehydration_signs,
                })) || [],
        activities:
            activity_records?.map((record) => ({
                activity: record.activity_type,
                time: record.activity_time,
                duration: record.duration,
                notes: record.notes,
            })) || [],
        sleep:
            sleepList.map((record) => ({
                type: record.type,
                time: record.sleep_start_time,
                duration: record.duration,
                quality: record.sleep_quality,
                notes: record.notes,
            })) || [],
        sleepIssues:
            sleepList.length > 0 ? sleepList[0]?.sleep_issue || "" : "",
        accidents:
            emergency_incidents?.map((record) => ({
                time:
                    record.incident_time?.split(" ")[1] ||
                    record.incident_time,
                description: record.incident_description,
                severity: record.severity,
                action: record.actions_taken,
            })) || [],
        household:
            household_records?.map((record) => ({
                task: record.household_work,
                time: record.start_time,
                duration: record.duration,
                notes: record.notes,
            })) || [],
        vitalSigns: maternalElderVitalSignsToForm(vital_signs),
        bloodGlucose:
            blood_glucose_records?.map((record) => ({
                measurement_time: record.measurement_time,
                glucose_level: record.glucose_level,
                timing: record.timing,
                note: record.notes,
            })) || [],
        supplies:
            supply_requests?.map((record) => ({
                item: record.item,
                quantity: record.quantity,
                purpose: record.purpose,
                priority: record.priority,
            })) || [],
    };
}
