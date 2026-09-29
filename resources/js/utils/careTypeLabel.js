export function careTypeLabel(value) {
    if (value === null || value === undefined) {
        return "";
    }

    const key = String(value).trim().toLowerCase();

    if (key === "") {
        return "";
    }

    if (key === "elder" || key === "elderly") {
        return "Elderly";
    }

    if (key === "child" || key === "baby") {
        return "Baby";
    }

    if (key === "newborn") {
        return "Newborn";
    }

    if (key === "maternal") {
        return "Maternal";
    }

    return String(value);
}

export const PATIENT_TYPE_OPTIONS = [
    { value: "Elder", label: "Elderly" },
    { value: "Baby", label: "Baby" },
    { value: "Newborn", label: "Newborn" },
    { value: "Maternal", label: "Maternal" },
];

export function patientDisplayName(patient) {
    if (!patient) {
        return "";
    }

    const name = [patient.first_name, patient.last_name]
        .filter(Boolean)
        .join(" ")
        .trim();

    return name || patient.pt_id || "";
}
