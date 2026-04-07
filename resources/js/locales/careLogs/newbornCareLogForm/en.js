import babyEn from "../babyCareLogForm/en.js";

/** Newborn form: same as baby with corrected section numbering and feeding options. */
export default {
    ...babyEn,
    page: {
        ...babyEn.page,
        headTitle: "Newborn Daily Care Log",
        mainTitle: "Newborn Daily Care Logs",
    },
    feeding: {
        ...babyEn.feeding,
        sectionTitle: "1. Feeding",
    },
    diaper: {
        ...babyEn.diaper,
        sectionTitle: "2. Diaper Changes",
    },
    sleep: {
        ...babyEn.sleep,
        sectionTitle: "3. Sleep",
    },
    activities: {
        ...babyEn.activities,
        sectionTitle: "4. Activities",
    },
    hygiene: {
        ...babyEn.hygiene,
        sectionTitle: "5. Hygiene & Grooming",
    },
    health: {
        ...babyEn.health,
        sectionTitle: "6. Health and Behavior",
    },
    additionalNotes: {
        ...babyEn.additionalNotes,
        sectionTitle: "7. Additional Notes/Observations",
    },
    options: {
        ...babyEn.options,
        feedingType: {
            Breastmilk: "Breastmilk",
            Formula: "Formula",
            "Weaning diet": "Weaning diet",
        },
    },
};
