import AppLayout from "@/Layouts/AppLayout";
import React, { useEffect, useRef, useState } from "react";
import { Head, router } from "@inertiajs/react";
import {
    Box,
    Paper,
    Typography,
    Button,
    IconButton,
    Container,
    Alert,
} from "@mui/material";
import {
    Save as SaveIcon,
    ArrowBack as ArrowBackIcon,
    FavoriteBorder as PregnancyIcon,
    LocalPharmacy as MedicationIcon,
    Favorite as HealthIcon,
    DirectionsWalk as ExerciseIcon,
    Restaurant as NutritionIcon,
    SportsEsports as ActivitiesIcon,
    Hotel as SleepIcon,
    Psychology as EmotionalIcon,
    Warning as AccidentIcon,
    Note as NotesIcon,
    Draw as SignatureIcon,
    Visibility as PreviewIcon,
    Edit as EditIcon,
    Send as SubmitIcon,
    Download as DownloadIcon,
    ChildCare as FetalIcon,
    CleanHands as HygieneIcon,
    CleaningServices as HouseholdIcon,
    Inventory as SupplyIcon,
    Opacity as UrinaryIcon,
} from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";

// Import components
import BasicInformation from "./components/BasicInformation";
import HygieneSection from "./components/HygieneSection";
import Medication from "./components/Medication";
import HealthMonitoring from "./components/HealthMonitoring";
import Exercises from "./components/Exercises";
import FoodDiary from "./components/FoodDiary";
import UrinaryBowelRecord from "./components/UrinaryBowelRecord";
import ActivitiesSection from "./components/ActivitiesSection";
import SleepSection from "./components/SleepSection";
import EmotionBehavior from "./components/EmotionBehavior";
import FetalHealth from "./components/FetalHealth";
import AccidentEmergency from "./components/AccidentEmergency";
import HouseholdWork from "./components/HouseholdWork";
import RequestedSuppliesSection from "./components/RequestedSuppliesSection";
import AdditionalNotesSection from "./components/AdditionalNotesSection";
import SignaturesSection from "./components/SignaturesSection";
import PreviewMaternalCareLog from "./components/PreviewMaternalCareLog";
import BackButton from "@/Components/BackButton";

const longNote =
    "This is a detailed observation note. The client responded well to care and showed positive engagement throughout the activity. No adverse reactions were observed. Continued monitoring is recommended for optimal health and well-being. Family members were informed and are supportive of the current care plan. Further updates will be provided as needed.";

// Generate a full set of test data for the maternal care log form
export function generateTestData(caregiverName = "Jane Caregiver") {
    return {
        date: "2025-10-17",
        firstName: "Mary",
        lastName: "Smith",
        age: "32",
        gestationalAge: "28 weeks",
        weight: "68",
        height: "165",

        hygiene: [
            { time: "08:00", activity: "Shower", notes: longNote },
            { time: "19:00", activity: "Oral care", notes: longNote },
        ],
        moisturizer_applied: true,
        pressure_areas_checked: true,
        skin_care_findings: "No redness or irritation observed",
        medication: [
            {
                time: "09:00",
                medication: "Prenatal vitamin",
                dosage: "1 tab",
                route: "PO",
                notes: longNote,
            },
            {
                time: "21:00",
                medication: "Iron supplement",
                dosage: "1 tab",
                route: "PO",
                notes: longNote,
            },
        ],
        vitalSigns: {
            times: ["08:00", "20:00"],
            bloodPressureSystolic: ["120", "118"],
            bloodPressureDiastolic: ["80", "78"],
            temperature: ["36.7", "36.8"],
            temperatureUnit: ["C", "C"],
            pulseRate: ["78", "76"],
            respiratoryRate: ["16", "15"],
            spo2: ["98", "99"],
        },
        bloodGlucose: [
            {
                measurement_time: "07:30",
                glucose_level: "5.2",
                timing: "fasting",
                note: longNote,
            },
            {
                measurement_time: "19:30",
                glucose_level: "6.1",
                timing: "2hpp",
                note: longNote,
            },
        ],
        mobility: [
            {
                time: "10:00",
                duration: "20 min",
                activity: "Walking around the park",
                notes: "No issues",
            },
        ],
        intake: [
            {
                meal_type: "breakfast",
                meal_time: "08:30",
                food_items: ["Oatmeal", "Banana"],
                amount: "350",
                amount_unit: "ml",
                assistance_needed: false,
                intake_notes: longNote,
            },
            {
                meal_type: "lunch",
                meal_time: "12:30",
                food_items: ["Chicken", "Rice", "Salad"],
                amount: "500",
                amount_unit: "ml",
                assistance_needed: false,
                intake_notes: longNote,
            },
        ],
        output: [
            {
                record_time: "09:00",
                urine_frequency: "Normal",
                blood_in_urine: false,
                pain_discomfort_urination: true,
                discharge: true,
                bowel_movement_frequency: "Every 2 days",
                blood_in_stool: true,
                pain_discomfort_abdomen: false,
                other_symptoms: longNote,
            },
        ],

        activities: [
            {
                time: "15:00",
                activity: "Knitting",
                duration: "30 min",
                notes: longNote,
            },
        ],
        sleep: [
            {
                type: "Afternoon Nap",
                sleep_start_time: "22:00",
                duration: "7h",
                sleep_quality: "Good",
                notes: longNote,
            },
        ],
        sleepIssues: "None",
        emotionalMood: "Calm",
        behavioralConcerns: "None",
        emotionalActionTaken: "N/A",

        fetalHealth: {
            fetalMovementDetected: true,
            kickCount: "12",
            fetalHeartSound: "145",
            notes: longNote,
        },

        accident: [
            {
                time: "11:32",
                description: "Slip on foot",
                severity: "Medium",
                action: longNote,
            },
        ],
        household: [
            {
                task: "Laundry",
                time: "11:00",
                duration: "30 min",
                notes: longNote,
            },
            {
                task: "Cleaning room",
                time: "14:00",
                duration: "15 min",
                notes: longNote,
            },
        ],
        requestedSupplies: [
            {
                item: "Maternity pads",
                quantity: "2 packs",
                purpose: "Postpartum",
                priority: "high",
            },
        ],

        additionalNotes: longNote,
        caregiverSignature: "",
        caregiverName,
        clientSignature: "",
        clientComment: longNote,
    };
}

// Generate a minimal valid set of test data for the maternal care log form
export function generateMinimalTestData(caregiverName = "Jane Caregiver") {
    return {
        date: "2025-10-17",
        firstName: "Mary",
        lastName: "",
        age: "32",
        gestationalAge: "28 weeks",
        weight: "",
        height: "",

        hygiene: [{ time: "", activity: "", notes: "" }],
        medication: [
            { time: "", medication: "", dosage: "", route: "", notes: "" },
        ],
        vitalSigns: {
            times: [""],
            bloodPressureSystolic: [""],
            bloodPressureDiastolic: [""],
            temperature: [""],
            temperatureUnit: ["C"],
            pulseRate: [""],
            respiratoryRate: [""],
            spo2: [""],
        },
        bloodGlucose: [
            { measurement_time: "", glucose_level: "", timing: "", note: "" },
        ],
        mobility: [{ time: "", duration: "", activity: "", notes: "" }],
        intake: [
            {
                meal_type: "",
                meal_time: "",
                food_items: [""],
                amount: "",
                amount_unit: "ml",
                assistance_needed: false,
                intake_notes: "",
            },
        ],
        output: [
            {
                output_time: "",
                urine_volume: "",
                urine_volume_unit: "ml",
                urine_color: "",
                bowel_movement: "",
                bowel_consistency: "",
                output_notes: "",
            },
        ],
        hydrationRecord: {
            fluid_intake: "",
            fluid_intake_unit: "l",
            dehydration_signs: "",
            other_dehydration_signs: "",
        },
        activities: [{ time: "", activity: "", duration: "", notes: "" }],
        sleep: [
            {
                type: "",
                sleep_start_time: "",
                duration: "",
                sleep_quality: "",
                notes: "",
            },
        ],
        sleepIssues: "",
        emotionalMood: "",
        behavioralConcerns: "",
        emotionalActionTaken: "",

        fetalHealth: {
            fetalMovementDetected: undefined,
            kickCount: "",
            fetalHeartSound: "",
            notes: "",
        },

        accident: [
            { time: "", description: "", severity: "Medium", action: "" },
        ],
        household: [{ task: "", time: "", duration: "", notes: "" }],
        requestedSupplies: [
            { item: "", quantity: "", purpose: "", priority: "medium" },
        ],

        additionalNotes: "",
        caregiverSignature: "",
        caregiverName,
        clientSignature: "",
        clientComment: "",
    };
}

// Section configurations with sweet and warm colors for maternal care
const sectionConfigs = {
    basic: {
        color: "linear-gradient(135deg, #fce4ec 0%, #fff8f9 100%)",
        icon: InfoIcon,
        iconColor: "#e91e63",
    },
    hygiene: {
        color: "linear-gradient(135deg, #e8f5e8 0%, #f8fff8 100%)",
        icon: HygieneIcon,
        iconColor: "#4caf50",
    },
    medication: {
        color: "linear-gradient(135deg, #fff3e0 0%, #fffaf6 100%)",
        icon: MedicationIcon,
        iconColor: "#ff9800",
    },
    health: {
        color: "linear-gradient(135deg, #ffebee 0%, #fff9fa 100%)",
        icon: HealthIcon,
        iconColor: "#e91e63",
    },
    exercise: {
        color: "linear-gradient(135deg, #e3f2fd 0%, #f7fcff 100%)",
        icon: ExerciseIcon,
        iconColor: "#2196f3",
    },
    nutrition: {
        color: "linear-gradient(135deg, #f1f8e9 0%, #fbfff9 100%)",
        icon: NutritionIcon,
        iconColor: "#8bc34a",
    },
    urinary: {
        color: "linear-gradient(135deg, #e0f2f1 0%, #f7ffff 100%)",
        icon: UrinaryIcon,
        iconColor: "#009688",
    },
    activities: {
        color: "linear-gradient(135deg, #fff8e1 0%, #fffdf7 100%)",
        icon: ActivitiesIcon,
        iconColor: "#ffc107",
    },
    sleep: {
        color: "linear-gradient(135deg, #e8eaf6 0%, #f8f9ff 100%)",
        icon: SleepIcon,
        iconColor: "#673ab7",
    },
    emotional: {
        color: "linear-gradient(135deg, #f9fbe7 0%, #fefffe 100%)",
        icon: EmotionalIcon,
        iconColor: "#cddc39",
    },
    fetal: {
        color: "linear-gradient(135deg, #fff3e0 0%, #fffaf6 100%)",
        icon: FetalIcon,
        iconColor: "#ff9800",
    },
    accident: {
        color: "linear-gradient(135deg, #fff0f0 0%, #fffafa 100%)",
        icon: AccidentIcon,
        iconColor: "#ff7043",
    },
    household: {
        color: "linear-gradient(135deg, #f3e5f5 0%, #faf8fb 100%)",
        icon: HouseholdIcon,
        iconColor: "#9c27b0",
    },
    supplies: {
        color: "linear-gradient(135deg, #e1f5fe 0%, #f7fdff 100%)",
        icon: SupplyIcon,
        iconColor: "#03a9f4",
    },
    notes: {
        color: "linear-gradient(135deg, #f0f4c3 0%, #fcfef3 100%)",
        icon: NotesIcon,
        iconColor: "#689f38",
    },
    signatures: {
        color: "linear-gradient(135deg, #efebe9 0%, #faf9f8 100%)",
        icon: SignatureIcon,
        iconColor: "#795548",
    },
};

// Enhanced Card Wrapper Component
const SectionCard = ({ children, config, sx = {} }) => {
    return (
        <Paper
            sx={{
                mb: 4,
                borderRadius: 3,
                background: config.color,
                border: "1px solid rgba(233,30,99,0.08)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: -20,
                    right: -20,
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: `${config.iconColor}08`,
                    zIndex: 0,
                },
                "& > *": {
                    position: "relative",
                    zIndex: 1,
                },
                ...sx,
            }}
        >
            {children}
        </Paper>
    );
};

const LOCAL_STORAGE_KEY = "maternalCareLogDraft";

const MaternalCareLogs = ({ caregiverName, lastCareLog }) => {
    const [formData, setFormData] = useState({
        // Basic Information
        date: new Date().toISOString().split("T")[0],
        firstName: "",
        lastName: "",
        age: "",
        gestationalAge: "",
        weight: "",
        height: "",

        // Array fields for all sections
        hygiene: [{ time: "", activity: "", notes: "" }],
        moisturizer_applied: null,
        pressure_areas_checked: null,
        skin_care_findings: "",
        medication: [
            { time: "", medication: "", dosage: "", route: "", notes: "" },
        ],
        vitalSigns: {
            times: [""],
            bloodPressureSystolic: [""],
            bloodPressureDiastolic: [""],
            temperature: [""],
            temperatureUnit: ["C"],
            pulseRate: [""],
            respiratoryRate: [""],
            spo2: [""],
        },
        bloodGlucose: [
            { measurement_time: "", glucose_level: "", timing: "", note: "" },
        ],
        mobility: [{ time: "", duration: "", activity: "", notes: "" }],
        intake: [
            {
                meal_type: "",
                meal_time: "",
                food_items: [""],
                amount: "",
                amount_unit: "ml",
                assistance_needed: false,
                intake_notes: "",
            },
        ],
        output: [
            {
                record_time: "",
                urine_frequency: "",
                blood_in_urine: null,
                pain_discomfort_urination: null,
                discharge: null,
                bowel_movement_frequency: "",
                blood_in_stool: null,
                pain_discomfort_abdomen: null,
                other_symptoms: "",
            },
        ],

        activities: [{ time: "", activity: "", duration: "", notes: "" }],
        sleep: [
            {
                type: "",
                sleep_start_time: "",
                duration: "",
                sleep_quality: "",
                notes: "",
                issue: "",
            },
        ],
        sleepIssues: "",
        emotionalMood: "",
        behavioralConcerns: "",
        emotionalActionTaken: "",

        // Fetal Health
        fetalHealth: {
            fetalMovementDetected: null,
            kickCount: "",
            fetalHeartSound: "",
            notes: "",
        },

        accident: [{ time: "", description: "", severity: "", action: "" }],
        household: [{ task: "", time: "", duration: "", notes: "" }],
        requestedSupplies: [
            { item: "", quantity: "", purpose: "", priority: "medium" },
        ],

        // Additional Notes
        additionalNotes: "",

        // Signatures
        caregiverSignature: "",
        caregiverName: caregiverName || "",
        clientSignature: "",
        clientComment: "",
    });

    const [showPreview, setShowPreview] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (validationErrors.length > 0) {
            setValidationErrors([]);
        }
    };

    const handleArrayChange = (arrayName, index, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [arrayName]: prev[arrayName].map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            ),
        }));
    };

    const entryRefs = useRef({});

    const addArrayItem = (arrayName, defaultItem) => {
        setFormData((prev) => {
            const newArray = [...prev[arrayName], defaultItem];
            return {
                ...prev,
                [arrayName]: newArray,
            };
        });

        setTimeout(() => {
            // Scroll to the last entry after state update
            const lastIndex = formData[arrayName].length;
            const ref = entryRefs.current[`${arrayName}-${lastIndex}`];
            if (ref && ref.scrollIntoView) {
                ref.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }, 300); // Delay to wait for render
    };

    const removeArrayItem = (arrayName, index) => {
        setFormData((prev) => ({
            ...prev,
            [arrayName]: prev[arrayName].filter((_, i) => i !== index),
        }));
    };

    const handleVitalSignChange = (type, index, value) => {
        setFormData((prev) => {
            const newVitalSigns = { ...prev.vitalSigns };

            if (!newVitalSigns[type]) {
                newVitalSigns[type] = [];
            }

            while (newVitalSigns[type].length <= index) {
                newVitalSigns[type].push("");
            }

            newVitalSigns[type][index] = value;

            const maxLength = Math.max(
                newVitalSigns.times.length,
                newVitalSigns.bloodPressureSystolic.length,
                newVitalSigns.bloodPressureDiastolic.length,
                newVitalSigns.temperature.length,
                newVitalSigns.temperatureUnit.length,
                newVitalSigns.pulseRate.length,
                newVitalSigns.respiratoryRate.length,
                newVitalSigns.spo2.length
            );

            [
                "times",
                "bloodPressureSystolic",
                "bloodPressureDiastolic",
                "temperature",
                "temperatureUnit",
                "pulseRate",
                "respiratoryRate",
                "spo2",
            ].forEach((key) => {
                while (newVitalSigns[key].length < maxLength) {
                    newVitalSigns[key].push(
                        key === "temperatureUnit" ? "C" : ""
                    );
                }
            });

            return {
                ...prev,
                vitalSigns: newVitalSigns,
            };
        });
    };

    const validateForm = () => {
        const errors = [];

        if (!formData.firstName.trim()) {
            errors.push("Client's name is required");
        }

        if (!formData.age.trim()) {
            errors.push("Age is required");
        }

        if (!formData.gestationalAge.trim()) {
            errors.push("Gestational age is required");
        }

        if (!formData.date) {
            errors.push("Date is required");
        }

        if (formData.fetalHealth.fetalMovementDetected == null) {
            errors.push("Fetal movement data is required");
        }

        // check vital signs blood pressure pairs
        if (
            formData.vitalSigns &&
            formData.vitalSigns.bloodPressureSystolic &&
            formData.vitalSigns.bloodPressureDiastolic
        ) {
            formData.vitalSigns.bloodPressureSystolic.forEach((sys, i) => {
                const dia = formData.vitalSigns.bloodPressureDiastolic[i];
                if ((sys && !dia) || (!sys && dia)) {
                    errors.push(
                        `Both systolic and diastolic blood pressure are required for vital sign entry #${
                            i + 1
                        }`
                    );
                }
            });
        }

        return errors;
    };

    const handleSaveClick = () => {
        const errors = validateForm();

        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }

        setValidationErrors([]);
        setShowPreview(true);
    };

    const handleEditClick = () => {
        setShowPreview(false);
    };

    // Load draft from localStorage on mount
    useEffect(() => {
        const savedDraft = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedDraft) {
            try {
                setFormData(JSON.parse(savedDraft));
            } catch (e) {
                // Ignore parse errors
            }
        }
    }, []);

    // Save draft to localStorage on every change
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
    }, [formData]);

    // Clear draft helper
    const clearDraft = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const transformedData = {
                care_date: formData.date,
                first_name: formData.firstName,
                last_name: formData.lastName || null,
                age_display: formData.age,
                gestational_age: formData.gestationalAge,
                weight_kg: formData.weight ? parseFloat(formData.weight) : null,
                height_cm: formData.height ? parseFloat(formData.height) : null,
                additional_notes: formData.additionalNotes,
                caregiver_name: formData.caregiverName,
                caregiver_signature: formData.caregiverSignature,
                client_signature: formData.clientSignature,
                client_comment: formData.clientComment,

                // All the other data sections would be included here
                hygiene_records: formData.hygiene.filter(
                    (item) => item.time || item.activity || item.notes
                ),
                moisturizer_applied: formData.moisturizer_applied,
                pressure_areas_checked: formData.pressure_areas_checked,
                skin_care_findings: formData.skin_care_findings || null,

                medication_records: formData.medication.filter(
                    (item) => item.time || item.medication || item.dosage
                ),
                mobility_records: formData.mobility.filter(
                    (item) => item.time || item.activity || item.duration
                ),
                intake_records: formData.intake.filter(
                    (item) => item.meal_time || item.meal_type || item.amount
                ),
                output_records: formData.output.filter(
                    (item) =>
                        item.record_time ||
                        item.urine_frequency ||
                        item.blood_in_urine ||
                        item.pain_discomfort_urination ||
                        item.discharge ||
                        item.bowel_movement_frequency ||
                        item.blood_in_stool ||
                        item.pain_discomfort_abdomen ||
                        item.other_symptoms
                ),

                activity_records: formData.activities.filter(
                    (item) => item.time || item.activity || item.duration
                ),
                sleep_records: formData.sleep.filter(
                    (item) =>
                        item.type ||
                        item.sleep_start_time ||
                        item.duration ||
                        item.sleep_quality
                ),
                sleep_issues: formData.sleepIssues || null,

                // Replace emotional_records with emotion_behavior
                emotion_behavior: {
                    mood:
                        formData.emotionalMood === "Other"
                            ? formData.emotionalMoodOther
                            : formData.emotionalMood,
                    behavior:
                        formData.behavioralConcerns === "Other"
                            ? formData.behavioralConcernsOther
                            : formData.behavioralConcerns,
                    action_taken: formData.emotionalActionTaken || null,
                },

                accident_records: formData.accident.filter(
                    (item) => item.time || item.description || item.action
                ),
                household_records: formData.household
                    .filter(
                        (item) =>
                            item.task ||
                            item.time ||
                            item.duration ||
                            item.notes
                    )
                    .map((item) => ({
                        household_work: item.task || null,
                        start_time: item.time || null,
                        duration: item.duration || null,
                        notes: item.notes || null,
                    })),
                requested_supplies: formData.requestedSupplies
                    .filter(
                        (item) => item.item || item.quantity || item.purpose
                    )
                    .map((item) => ({
                        item: item.item,
                        quantity: item.quantity,
                        purpose: item.purpose,
                        priority: item.priority || "medium",
                    })),
                vital_signs: transformVitalSigns(),
                blood_glucose_records: formData.bloodGlucose.filter(
                    (item) =>
                        item.measurement_time ||
                        item.glucose_level ||
                        item.timing
                ),

                // Update accident_records to use the new field names and include severity
                emergency_incidents: formData.accident
                    .filter(
                        (item) => item.time || item.description || item.action
                    )
                    .map((item) => ({
                        incident_time: item.time || null,
                        incident_description: item.description || null,
                        severity: item.severity
                            ? item.severity.toLowerCase()
                            : "",
                        actions_taken: item.action || null,
                    })),

                fetal_health:
                    formData.fetalHealth.fetalMovementDetected !== undefined ||
                    formData.fetalHealth.kickCount ||
                    formData.fetalHealth.fetalHeartSound ||
                    formData.fetalHealth.notes
                        ? {
                              fetal_movement_detected:
                                  formData.fetalHealth.fetalMovementDetected,
                              kick_count: formData.fetalHealth.kickCount
                                  ? parseInt(formData.fetalHealth.kickCount)
                                  : null,
                              fetal_heart_sound: formData.fetalHealth
                                  .fetalHeartSound
                                  ? parseInt(
                                        formData.fetalHealth.fetalHeartSound
                                    )
                                  : null,
                              notes: formData.fetalHealth.notes || null,
                          }
                        : null,
            };

            router.post(route("carelogs.maternal.store"), transformedData, {
                onSuccess: () => {
                    setShowPreview(false);
                    clearDraft();
                },
                onError: (errors) => {
                    console.error("Submission errors:", errors);
                    alert("Failed to submit care log. Please try again.");
                },
                onFinish: () => {
                    setIsSubmitting(false);
                },
            });
        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to submit care log. Please try again.");
            setIsSubmitting(false);
        }
    };

    const transformVitalSigns = () => {
        const vitalSignsRecords = [];
        const {
            times,
            bloodPressureSystolic,
            bloodPressureDiastolic,
            temperature,
            temperatureUnit,
            pulseRate,
            respiratoryRate,
            spo2, // Use spo2 instead of bloodSugar
        } = formData.vitalSigns;

        const maxLength = Math.max(
            times.length,
            bloodPressureSystolic.length,
            bloodPressureDiastolic.length,
            temperature.length,
            pulseRate.length,
            respiratoryRate.length,
            spo2.length // Use spo2 instead of bloodSugar and weight
        );

        for (let i = 0; i < maxLength; i++) {
            if (
                times[i] ||
                bloodPressureSystolic[i] ||
                bloodPressureDiastolic[i] ||
                temperature[i] ||
                pulseRate[i] ||
                respiratoryRate[i] ||
                spo2[i] // Use spo2
            ) {
                vitalSignsRecords.push({
                    measurement_time: times[i] || null,
                    systolic_pressure: bloodPressureSystolic[i]
                        ? parseInt(bloodPressureSystolic[i])
                        : null,
                    diastolic_pressure: bloodPressureDiastolic[i]
                        ? parseInt(bloodPressureDiastolic[i])
                        : null,
                    temperature: temperature[i]
                        ? parseFloat(temperature[i])
                        : null,
                    temperature_unit: temperatureUnit[i] || "C",
                    pulse_rate: pulseRate[i] ? parseInt(pulseRate[i]) : null,
                    respiratory_rate: respiratoryRate[i]
                        ? parseInt(respiratoryRate[i])
                        : null,
                    spo2: spo2[i] ? parseInt(spo2[i]) : null, // Add spo2
                    notes: null,
                });
            }
        }

        return vitalSignsRecords;
    };

    // Add these new functions for test data
    const fillWithTestData = () => {
        const testData = generateTestData();
        setFormData({
            ...testData,
            caregiverName: caregiverName || testData.caregiverName,
        });
        // Clear any validation errors
        setValidationErrors([]);
    };

    const clearForm = () => {
        setFormData({
            date: new Date().toISOString().split("T")[0],
            firstName: "",
            lastName: "",
            age: "",
            weight: "",
            height: "",

            hygiene: [
                {
                    time: "",
                    activity: "",
                    notes: "",
                },
            ],
            moisturizer_applied: null,
            pressure_areas_checked: null,
            skin_care_findings: "",
            medication: [
                { time: "", medication: "", dosage: "", route: "", notes: "" },
            ],
            mobility: [{ time: "", duration: "", activity: "", notes: "" }],

            intake: [
                {
                    meal_type: "",
                    meal_time: "",
                    food_items: [""],
                    amount: "",
                    amount_unit: "oz",
                    assistance_needed: false,
                    intake_notes: "",
                },
            ],
            output: [
                {
                    output_time: "",
                    urine_volume: "",
                    urine_volume_unit: "l",
                    urine_color: "",
                    bowel_movement: "",
                    bowel_consistency: "",
                    output_notes: "",
                },
            ],
            hydration: {
                fluid_intake: "",
                fluid_intake_unit: "l",
                dehydration_signs: "",
                other_dehydration_signs: "",
            },

            activities: [{ time: "", activity: "", duration: "", notes: "" }],
            sleep: [
                {
                    type: "",
                    sleep_start_time: "",
                    duration: "",
                    sleep_quality: "",
                    notes: "",
                    issue: "",
                },
            ],
            sleepIssues: "",

            emotionalMood: "",
            emotionalMoodOther: "",
            behavioralConcerns: "",
            behavioralConcernsOther: "",
            emotionalActionTaken: "",

            accident: [{ time: "", description: "", severity: "", action: "" }],
            household: [{ task: "", duration: "", notes: "" }],
            supplies: [
                { item: "", quantity: "", purpose: "", priority: "medium" },
            ],

            vitalSigns: {
                times: [""],
                bloodPressureSystolic: [""],
                bloodPressureDiastolic: [""],
                temperature: [""],
                temperatureUnit: ["C"],
                pulseRate: [""],
                respiratoryRate: [""],
                spo2: [""],
            },

            bloodGlucose: [
                {
                    measurement_time: "",
                    glucose_level: "",
                    timing: "",
                    note: "",
                },
            ],

            additionalNotes: "",
            caregiverSignature: "",
            caregiverName: caregiverName || "",
            clientSignature: "",
            clientComment: "",
        });
        setValidationErrors([]);
        clearDraft();
    };

    const fillWithMinimalData = () => {
        const minimalData = generateMinimalTestData();
        setFormData({
            ...formData, // Keep existing data
            ...minimalData,
            caregiverName: caregiverName || minimalData.caregiverSignature,
        });
        // Clear any validation errors
        setValidationErrors([]);
    };

    // Continue from last care log feature
    const continueFromLastCareLog = () => {
        if (!lastCareLog) return;
        setFormData((prev) => ({
            ...prev,
            date: new Date().toISOString().split("T")[0],
            firstName: lastCareLog.firstName || "",
            lastName: lastCareLog.lastName || "",
            age: lastCareLog.age || "",
            gestationalAge: lastCareLog.gestationalAge || "",
            weight: lastCareLog.weight || "",
            height: lastCareLog.height || "",
        }));
        setValidationErrors([]);
    };

    return (
        <AppLayout>
            <Head title="Maternal Care Log" />
            <Container maxWidth="lg" sx={{ pb: 8 }}>
                {/* <Paper
                    sx={{
                        p: 3,
                        mb: 4,
                        borderRadius: 3,
                        background:
                            "linear-gradient(135deg, #f3e5f5 0%, #f8f9fa 100%)",
                        border: "2px dashed #7b1fa2",
                    }}
                >
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: "#7b1fa2", fontWeight: "bold" }}
                    >
                        🧪 Testing Tools (Development Only)
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, color: "#666" }}>
                        Use these buttons to quickly fill the form with test
                        data instead of entering manually:
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        <Button
                            variant="contained"
                            onClick={fillWithTestData}
                            sx={{
                                background:
                                    "linear-gradient(45deg, #7b1fa2 30%, #ba68c8 90%)",
                                color: "white",
                                fontWeight: "bold",
                                "&:hover": {
                                    background:
                                        "linear-gradient(45deg, #6a1b9a 30%, #ab47bc 90%)",
                                },
                            }}
                        >
                            Fill Complete Test Data
                        </Button>

                        <Button
                            variant="contained"
                            onClick={fillWithMinimalData}
                            sx={{
                                background:
                                    "linear-gradient(45deg, #2196f3 30%, #64b5f6 90%)",
                                color: "white",
                                fontWeight: "bold",
                                "&:hover": {
                                    background:
                                        "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                                },
                            }}
                        >
                            Fill Minimal Data
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={clearForm}
                            sx={{
                                borderColor: "#f44336",
                                color: "#f44336",
                                fontWeight: "bold",
                                "&:hover": {
                                    borderColor: "#d32f2f",
                                    bgcolor: "#ffebee",
                                },
                            }}
                        >
                            Clear Form
                        </Button>
                    </Box>
                </Paper> */}
                {/* Enhanced Header */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        py: 3,
                        borderRadius: 3,
                        color: "gray.600",
                    }}
                >
                    <BackButton />

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{
                            fontSize: {
                                xs: "1.5rem",
                                sm: "2rem",
                                md: "2.5rem",
                            },
                            color: "#e91e63",
                        }}
                    >
                        Maternal Daily Care Logs
                    </Typography>
                </Box>

                {/* Continue Care Log Feature */}
                {lastCareLog && (
                    <Paper
                        sx={{
                            mb: 3,
                            p: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            background:
                                "linear-gradient(90deg, #fce4ec 60%, #f8bbd9 100%)",
                            border: "1px solid #e0e0e0",
                            borderRadius: 2,
                        }}
                        elevation={0}
                    >
                        <Box>
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold" }}
                            >
                                Your last care log:{" "}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                sx={{ color: "red" }}
                            >
                                {lastCareLog.firstName} {lastCareLog.lastName}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ mb: 0.5, color: "red" }}
                            >
                                Age: {lastCareLog.age}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#555" }}>
                                Last log date:{" "}
                                {lastCareLog.date
                                    ? new Date(
                                          lastCareLog.date
                                      ).toLocaleDateString(undefined, {
                                          year: "numeric",
                                          month: "short",
                                          day: "numeric",
                                      })
                                    : "Unknown"}
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={continueFromLastCareLog}
                            sx={{
                                fontWeight: "bold",
                                background:
                                    "linear-gradient(45deg, #e91e63 30%, #f8bbd9 90%)",
                                "&:hover": {
                                    background:
                                        "linear-gradient(45deg, #d81b60 30%, #f48fb1 90%)",
                                },
                            }}
                            size="small"
                        >
                            Continue
                        </Button>
                    </Paper>
                )}

                {/* Validation Errors */}
                {validationErrors.length > 0 && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        <Typography
                            variant="subtitle2"
                            fontWeight="bold"
                            gutterBottom
                        >
                            Please fill the following fields:
                        </Typography>
                        <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
                            {validationErrors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </Alert>
                )}

                {/* All Form Sections */}
                <SectionCard config={sectionConfigs.basic}>
                    <BasicInformation
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />
                </SectionCard>

                {/* 1. Hygiene & Grooming */}
                <SectionCard config={sectionConfigs.hygiene}>
                    <HygieneSection
                        data={formData.hygiene}
                        moisturizer_applied={formData.moisturizer_applied}
                        pressure_areas_checked={formData.pressure_areas_checked}
                        skin_care_findings={formData.skin_care_findings}
                        handleArrayChange={handleArrayChange}
                        handleInputChange={handleInputChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                        entryRefs={entryRefs}
                    />
                </SectionCard>

                {/* 2. Medication Administration */}
                <SectionCard config={sectionConfigs.medication}>
                    <Medication
                        data={formData.medication}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                        entryRefs={entryRefs}
                    />
                </SectionCard>

                {/* 3. Health Monitoring */}
                <SectionCard config={sectionConfigs.health}>
                    <HealthMonitoring
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleVitalSignChange={handleVitalSignChange}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                        entryRefs={entryRefs}
                    />
                </SectionCard>

                {/* 4. Exercises */}
                <SectionCard config={sectionConfigs.exercise}>
                    <Exercises
                        data={formData.mobility}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                        entryRefs={entryRefs}
                    />
                </SectionCard>

                {/* 5. Food Diary */}
                <SectionCard config={sectionConfigs.nutrition}>
                    <FoodDiary
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                        entryRefs={entryRefs}
                    />
                </SectionCard>

                {/* 6. Urinary & Bowel Health Record */}
                <SectionCard config={sectionConfigs.urinary}>
                    <UrinaryBowelRecord
                        data={formData.output}
                        handleInputChange={handleInputChange}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                    />
                </SectionCard>

                {/* 7. Activities & Social Interaction */}
                <SectionCard config={sectionConfigs.activities}>
                    <ActivitiesSection
                        data={formData.activities}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                        entryRefs={entryRefs}
                    />
                </SectionCard>

                {/* 8. Sleep & Rest Tracking */}
                <SectionCard config={sectionConfigs.sleep}>
                    <SleepSection
                        data={formData.sleep}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                        formData={formData}
                        handleInputChange={handleInputChange}
                        entryRefs={entryRefs}
                    />
                </SectionCard>

                {/* 9. Emotional & Behavioral Observation */}
                <SectionCard config={sectionConfigs.emotional}>
                    <EmotionBehavior
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />
                </SectionCard>

                {/* 10. Fetal Health */}
                <SectionCard config={sectionConfigs.fetal}>
                    <FetalHealth
                        formData={formData}
                        setFormData={setFormData}
                    />
                </SectionCard>

                {/* 11. Accident & Emergency Situations */}
                <SectionCard config={sectionConfigs.accident}>
                    <AccidentEmergency
                        data={formData.accident}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                        entryRefs={entryRefs}
                    />
                </SectionCard>

                {/* 12. Household Work by Caregiver */}
                <SectionCard config={sectionConfigs.household}>
                    <HouseholdWork
                        data={formData.household}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                        entryRefs={entryRefs}
                    />
                </SectionCard>

                {/* 13. Requested Supplies */}
                <SectionCard config={sectionConfigs.supplies}>
                    <RequestedSuppliesSection
                        data={formData.requestedSupplies}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                        entryRefs={entryRefs}
                    />
                </SectionCard>

                {/* 14. Additional Notes */}
                <SectionCard config={sectionConfigs.notes}>
                    <AdditionalNotesSection
                        additionalNotes={formData.additionalNotes}
                        handleInputChange={handleInputChange}
                    />
                </SectionCard>

                {/* Signatures Section */}
                <SectionCard config={sectionConfigs.signatures}>
                    <SignaturesSection
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />
                </SectionCard>

                {/* Validation Errors */}
                {validationErrors.length > 0 && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        <Typography
                            variant="subtitle2"
                            fontWeight="bold"
                            gutterBottom
                        >
                            Please fill the following fields:
                        </Typography>
                        <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
                            {validationErrors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </Alert>
                )}

                {/* Action Buttons */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 3,
                        mt: 5,
                        flexDirection: { xs: "column", sm: "row" },
                    }}
                >
                    <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSaveClick}
                        fullWidth={window.innerWidth < 600}
                        sx={{
                            py: 1.5,
                            px: 4,
                            borderRadius: 3,
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            background:
                                "linear-gradient(45deg, #e91e63 30%, #f8bbd9 90%)",
                            boxShadow: "0 6px 20px rgba(233,30,99,0.3)",
                            "&:hover": {
                                background:
                                    "linear-gradient(45deg, #d81b60 30%, #f48fb1 90%)",
                                boxShadow: "0 8px 25px rgba(233,30,99,0.4)",
                            },
                        }}
                    >
                        Preview Care Log
                    </Button>

                    <Button
                        onClick={() => {
                            clearDraft();
                            router.get(route("cg.dashboard"));
                        }}
                        fullWidth={window.innerWidth < 600}
                        sx={{
                            py: 1.5,
                            px: 4,
                            borderRadius: 3,
                            fontSize: "1rem",
                            border: "2px solid #e0e0e0",
                            "&:hover": {
                                border: "2px solid #bdbdbd",
                                bgcolor: "#f5f5f5",
                            },
                        }}
                    >
                        Cancel
                    </Button>
                </Box>

                {/* Preview Dialog */}

                <PreviewMaternalCareLog
                    open={showPreview}
                    onClose={() => setShowPreview(false)}
                    formData={formData}
                    onEdit={handleEditClick}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                />
            </Container>
        </AppLayout>
    );
};

export default MaternalCareLogs;
