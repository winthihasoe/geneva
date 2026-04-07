import elderlyEn from "../elderlyCareLogForm/en.js";

function deepMerge(a, b) {
    const out = { ...a };
    for (const k of Object.keys(b)) {
        const bv = b[k];
        const av = a[k];
        if (
            bv &&
            typeof bv === "object" &&
            !Array.isArray(bv) &&
            typeof bv !== "function" &&
            av &&
            typeof av === "object" &&
            !Array.isArray(av)
        ) {
            out[k] = deepMerge(av, bv);
        } else {
            out[k] = bv;
        }
    }
    return out;
}

const maternalOverrides = {
    page: {
        headTitle: "Maternal Care Log",
        mainTitle: "Maternal Daily Care Logs",
    },
    basic: {
        gestationalAge: "Gestational Age *",
        gestationalPlaceholder: "e.g., 20 weeks",
        gestationalCaption:
            "Gestational age is the duration of pregnancy, measured in weeks from the first day of a person's last menstrual period (LMP)",
    },
    validation: {
        gestationalRequired: "Gestational age is required",
        fetalMovementRequired: "Fetal movement data is required",
    },
    hygiene: { sectionTitle: "1. Hygiene & Grooming" },
    medication: { sectionTitle: "2. Medication Administration" },
    health: { sectionTitle: "3. Health Monitoring" },
    mobility: { sectionTitle: "4. Mobility & Exercise" },
    intakeOutput: { sectionTitle: "5. Food Diary & Intake/Output" },
    foodDiary: {
        sectionTitle: "5. Food Diary",
    },
    urinaryBowel: {
        sectionTitle: "6. Urinary & Bowel Health Record",
    },
    activities: { sectionTitle: "7. Activities" },
    sleep: { sectionTitle: "8. Sleep & Rest Tracking" },
    emotion: { sectionTitle: "9. Emotional & Behavioral Observation" },
    fetalHealth: {
        sectionTitle: "10. Fetal Health Monitoring",
    },
    accident: { sectionTitle: "11. Accident & Emergency Situations" },
    household: { sectionTitle: "12. Household Works by Caregiver" },
    supplies: { sectionTitle: "13. Requested Supplies" },
    additionalNotes: { sectionTitle: "14. Additional Notes/Observations" },
};

export default deepMerge(elderlyEn, maternalOverrides);
