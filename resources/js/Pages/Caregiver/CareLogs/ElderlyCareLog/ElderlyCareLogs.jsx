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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
} from "@mui/material";
import {
    Save as SaveIcon,
    ArrowBack as ArrowBackIcon,
    Wc as HygieneIcon,
    LocalPharmacy as MedicationIcon,
    Favorite as HealthIcon,
    DirectionsWalk as MobilityIcon,
    Restaurant as IntakeIcon,
    SportsEsports as ActivitiesIcon,
    Hotel as SleepIcon,
    Psychology as EmotionalIcon,
    Warning as AccidentIcon,
    CleaningServices as HouseholdIcon,
    Inventory as SuppliesIcon,
    Note as NotesIcon,
    Draw as SignatureIcon,
    Visibility as PreviewIcon,
    Edit as EditIcon,
    Send as SubmitIcon,
    Download as DownloadIcon,
} from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";

// Import components (you'll need to create these based on the sections)
import BasicInformation from "./components/BasicInformation";
import RequestedSuppliesSection from "./components/RequestedSuppliesSection";
import AdditionalNotesSection from "./components/AdditionalNotesSection";
import SignaturesSection from "./components/SignaturesSection";

import HygieneSection from "./components/HygieneSection";
import Medication from "./components/Medication";
import HealthMonitoring from "./components/HealthMonitoring";
import MobilityExercise from "./components/MobilityExercise";
import IntakeOutput from "./components/IntakeOutput";
import ActivitiesSection from "./components/ActivitiesSection";
import SleepSection from "./components/SleepSection";
import EmotionBehavior from "./components/EmotionBehavior";
import AccidentEmergency from "./components/AccidentEmergency";
import HouseholdWork from "./components/HouseholdWork";
import Backbutton from "@/Components/Backbutton";

// Test Data Generator - Add this after imports
const longNote =
    "This is a detailed observation note. The client responded well to care and showed positive engagement throughout the activity. No adverse reactions were observed. Continued monitoring is recommended for optimal health and well-being. Family members were informed and are supportive of the current care plan. Further updates will be provided as needed.";

const generateTestData = () => ({
    // Basic Information
    date: new Date().toISOString().split("T")[0],
    firstName: "Margaret",
    lastName: "Thompson",
    age: "78 years",
    weight: "65",
    height: "165",

    // Hygiene data
    hygiene: [
        {
            time: "08:00",
            activity: "Morning shower",
            notes: longNote,
        },
        {
            time: "14:30",
            activity: "Oral care",
            notes: longNote,
        },
        {
            time: "20:00",
            activity: "Evening wash",
            notes: longNote,
        },
    ],
    moisturizer_applied: true,
    pressure_areas_checked: true,
    skin_care_findings: longNote,

    // Medication data
    medication: [
        {
            time: "08:00",
            medication: "Metformin",
            dosage: "500mg",
            route: "PO",
            notes: longNote,
        },
        {
            time: "12:00",
            medication: "Lisinopril",
            dosage: "10mg",
            route: "PO",
            notes: longNote,
        },
        {
            time: "18:00",
            medication: "Vitamin D",
            dosage: "1000 IU",
            route: "IV",
            notes: longNote,
        },
    ],

    // Mobility & Exercise data
    mobility: [
        {
            time: "09:30",
            activity: "Walking exercise",
            duration: "20 minutes",
            notes: longNote,
        },
        {
            time: "15:00",
            activity: "Chair exercises",
            duration: "15 minutes",
            notes: longNote,
        },
    ],

    // Intake data
    intake: [
        {
            meal_type: "breakfast",
            meal_time: "08:30",
            food_items: [
                "Oatmeal",
                "Fresh berries",
                "Orange juice",
                "Lemon tea",
                "Water",
                "Milk",
                "Yogurt",
            ],
            amount: "75",
            amount_unit: "ml",
            assistance_needed: false,
            intake_notes: longNote,
        },
        {
            meal_type: "lunch",
            meal_time: "12:30",
            food_items: ["Chicken soup", "Whole grain bread", "Apple slices"],
            amount: "90",
            amount_unit: "ml",
            assistance_needed: false,
            intake_notes: longNote,
        },
        {
            meal_type: "dinner",
            meal_time: "18:30",
            food_items: ["Grilled salmon", "Steamed vegetables", "Rice"],
            amount: "80",
            amount_unit: "ml",
            assistance_needed: true,
            intake_notes: longNote,
        },
    ],

    // Output data
    output: [
        {
            output_time: "10:00",
            urine_volume: "250",
            urine_volume_unit: "ml",
            urine_color: "pale_yellow",
            bowel_movement: "yes",
            bowel_consistency: "soft",
            output_notes: longNote,
        },
        {
            output_time: "16:30",
            urine_volume: "300",
            urine_volume_unit: "ml",
            urine_color: "amber",
            bowel_movement: "no",
            bowel_consistency: "",
            output_notes: longNote,
        },
    ],

    // Hydration data
    hydration: {
        fluid_intake: "1.8",
        fluid_intake_unit: "l",
        dehydration_signs: "none",
        other_dehydration_signs: "none",
    },

    // Activities data
    activities: [
        {
            time: "10:30",
            activity: "Reading newspaper",
            duration: "45 minutes",
            notes: longNote,
        },
        {
            time: "14:00",
            activity: "Playing cards",
            duration: "30 minutes",
            notes: longNote,
        },
        {
            time: "19:30",
            activity: "Watching TV",
            duration: "60 minutes",
            notes: longNote,
        },
    ],

    // Sleep data
    sleep: [
        {
            type: "Night Sleep",
            sleep_start_time: "22:00",
            duration: "7 hours",
            sleep_quality: "Good",
            notes: longNote,
            issue: "none",
        },
        {
            type: "Afternoon Nap",
            time: "14:30",
            duration: "45 minutes",
            sleep_quality: "Fair",
            notes: longNote,
            issue: "",
        },
    ],

    // Sleep issues
    sleepIssues: "Restlessness",

    // Emotional & Behavioral data
    emotionalMood: "Other",
    emotionalMoodOther: longNote,
    behavioralConcerns: "None",
    behavioralConcernsOther: longNote,
    emotionalActionTaken: longNote,

    // Accident data
    accident: [
        {
            time: "16:45",
            description: longNote,
            severity: "Low",
            action: longNote,
        },
    ],

    // Household work data
    household: [
        {
            time: "15:30",
            task: "Laundry assistance",
            duration: "30 minutes",
            notes: longNote,
        },
        {
            task: "Light cleaning",
            duration: "45 minutes",
            notes: longNote,
        },
    ],

    // Vital Signs data
    vitalSigns: {
        times: ["09:00", "15:00", "21:00"],
        bloodPressureSystolic: ["135", "128", "132"],
        bloodPressureDiastolic: ["82", "78", "80"],
        temperature: ["36.8", "36.6", "36.7"],
        temperatureUnit: ["C", "C", "C"],
        pulseRate: ["78", "74", "72"],
        respiratoryRate: ["18", "16", "17"],
        spo2: ["98", "97", "98"],
    },

    // Blood Glucose data
    bloodGlucose: [
        {
            measurement_time: "08:15",
            glucose_level: "110",
            timing: "fasting",
            note: longNote,
        },
        {
            measurement_time: "18:15",
            glucose_level: "145",
            timing: "2hpp",
            note: longNote,
        },
    ],

    // Additional Notes
    additionalNotes: longNote + " " + longNote + " " + longNote,

    // Requested Supplies
    requestedSupplies: [
        {
            item: "Blood pressure monitor strips",
            quantity: "1 box",
            purpose: longNote,
            priority: "high",
        },
        {
            item: "Incontinence pads",
            quantity: "2 packs",
            purpose: longNote,
            priority: "medium",
        },
        {
            item: "Non-slip bath mat",
            quantity: "1 piece",
            purpose: longNote,
            priority: "high",
        },
    ],

    // Signatures
    caregiverSignature: "",
    clientSignature: "",
    clientComment: longNote,
});

// Minimal test data for quick testing
const generateMinimalTestData = () => ({
    date: new Date().toISOString().split("T")[0],
    firstName: "John",
    lastName: "Smith",
    age: "65 years",
    weight: "70",
    height: "175",

    // Minimal required data
    hygiene: [
        {
            time: "08:00",
            activity: "Morning wash",
            notes: "Completed independently",
        },
    ],
    medication: [
        {
            time: "09:00",
            medication: "Daily vitamins",
            dosage: "1 tablet",
            route: "Oral",
            notes: "Taken with breakfast",
        },
    ],
    mobility: [
        {
            time: "10:00",
            activity: "Short walk",
            duration: "15 min",
            notes: "Good mobility",
        },
    ],

    intake: [
        {
            meal_type: "Breakfast",
            meal_time: "08:30",
            food_items: ["Toast", "Coffee"],
            amount: "100",
            amount_unit: "%",
            assistance_needed: false,
            intake_notes: "Ate well",
        },
    ],

    output: [
        {
            output_time: "09:30",
            urine_volume: "200",
            urine_volume_unit: "ml",
            urine_color: "Yellow",
            bowel_movement: "Yes",
            bowel_consistency: "Normal",
            output_notes: "Regular",
        },
    ],

    hydration: {
        fluid_intake: "1.5",
        fluid_intake_unit: "l",
        dehydration_signs: "None",
        other_dehydration_signs: "",
    },

    activities: [
        {
            time: "14:00",
            activity: "Reading",
            duration: "30 min",
            notes: "Enjoyed book",
        },
    ],
    sleep: [
        {
            time: "22:00",
            duration: "8 hours",
            sleep_quality: "Good",
            notes: "Restful sleep",
            issue: "",
        },
    ],

    sleepIssues: "No issues observed",
    emotionalMood: "Happy",
    behavioralConcerns: "None",
    emotionalActionTaken: "No action needed",

    accident: [{ time: "", description: "", severity: "Low", action: "" }],
    household: [
        {
            task: "Light tidying",
            duration: "20 min",
            notes: "Minimal assistance needed",
        },
    ],

    vitalSigns: {
        times: ["09:00"],
        bloodPressureSystolic: ["120"],
        bloodPressureDiastolic: ["80"],
        temperature: ["36.5"],
        temperatureUnit: ["C"],
        pulseRate: ["72"],
        respiratoryRate: ["16"],
        spo2: ["99"],
    },

    bloodGlucose: [
        {
            measurement_time: "09:00",
            glucose_level: "100",
            timing: "Fasting",
            note: "Normal",
        },
    ],
    additionalNotes: "Client is doing well with current care plan",
    requestedSupplies: [
        {
            item: "Toiletries",
            quantity: "1 set",
            purpose: "Personal hygiene",
            priority: "medium",
        },
    ],
    caregiverSignature: "Test Caregiver",
});

// Section configurations with elderly-appropriate colors and icons
const sectionConfigs = {
    basic: {
        color: "linear-gradient(135deg, #f3e5f5 0%, #f8f9fa 100%)",
        icon: InfoIcon,
        iconColor: "#7b1fa2",
    },
    hygiene: {
        color: "linear-gradient(135deg, #e8f5e8 0%, #f8f9fa 100%)",
        icon: HygieneIcon,
        iconColor: "#4caf50",
    },
    medication: {
        color: "linear-gradient(135deg, #fff3e0 0%, #f8f9fa 100%)",
        icon: MedicationIcon,
        iconColor: "#ff9800",
    },
    health: {
        color: "linear-gradient(135deg, #ffebee 0%, #f8f9fa 100%)",
        icon: HealthIcon,
        iconColor: "#f44336",
    },
    mobility: {
        color: "linear-gradient(135deg, #e3f2fd 0%, #f8f9fa 100%)",
        icon: MobilityIcon,
        iconColor: "#2196f3",
    },
    intake: {
        color: "linear-gradient(135deg, #f1f8e9 0%, #f8f9fa 100%)",
        icon: IntakeIcon,
        iconColor: "#8bc34a",
    },
    activities: {
        color: "linear-gradient(135deg, #fff8e1 0%, #f8f9fa 100%)",
        icon: ActivitiesIcon,
        iconColor: "#ffc107",
    },
    sleep: {
        color: "linear-gradient(135deg, #e0f2f1 0%, #f8f9fa 100%)",
        icon: SleepIcon,
        iconColor: "#009688",
    },
    emotional: {
        color: "linear-gradient(135deg, #fce4ec 0%, #f8f9fa 100%)",
        icon: EmotionalIcon,
        iconColor: "#e91e63",
    },
    accident: {
        color: "linear-gradient(135deg, #fff3e0 0%, #f8f9fa 100%)",
        icon: AccidentIcon,
        iconColor: "#ff5722",
    },
    household: {
        color: "linear-gradient(135deg, #e8eaf6 0%, #f8f9fa 100%)",
        icon: HouseholdIcon,
        iconColor: "#673ab7",
    },
    supplies: {
        color: "linear-gradient(135deg, #e1f5fe 0%, #f8f9fa 100%)",
        icon: SuppliesIcon,
        iconColor: "#03a9f4",
    },
    notes: {
        color: "linear-gradient(135deg, #f9fbe7 0%, #f8f9fa 100%)",
        icon: NotesIcon,
        iconColor: "#689f38",
    },
    signatures: {
        color: "linear-gradient(135deg, #efebe9 0%, #f8f9fa 100%)",
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
                border: "1px solid rgba(0,0,0,0.05)",
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

// Preview Dialog Component
const PreviewDialog = ({
    open,
    onClose,
    formData,
    onEdit,
    onSubmit,
    isSubmitting = false,
}) => {
    const formatArrayData = (data, type) => {
        if (!data || data.length === 0) return "No entries";

        const filteredData = data.filter((item) => {
            switch (type) {
                case "hygiene":
                    return item.time || item.activity || item.notes;
                case "medication":
                    return item.time || item.medication || item.dosage;
                case "mobility":
                    return item.time || item.activity || item.duration;
                case "intake":
                    return item.meal_time || item.meal_type || item.amount;
                case "output":
                    return (
                        item.output_time ||
                        item.urine_volume ||
                        item.bowel_movement
                    );
                case "activities":
                    return item.time || item.activity || item.duration;
                case "sleep":
                    return (
                        item.type ||
                        item.sleep_start_time ||
                        item.duration ||
                        item.sleep_quality
                    );
                case "accident":
                    return item.time || item.type || item.description;
                case "household":
                    return item.task || item.duration || item.notes;
                case "supplies":
                    return item.item || item.quantity || item.purpose;
                default:
                    return true;
            }
        });

        if (filteredData.length === 0) return "No entries";

        return filteredData
            .map((item, index) => {
                switch (type) {
                    case "hygiene":
                        return `${index + 1}. Time: ${
                            item.time || "N/A"
                        }, Activity: ${item.activity || "N/A"}, Notes: ${
                            item.notes || "None"
                        }`;
                    case "medication":
                        return `${index + 1}. Time: ${
                            item.time || "N/A"
                        }, Medication: ${item.medication || "N/A"}, Dosage: ${
                            item.dosage || "N/A"
                        }, Route: ${item.route || "N/A"}, Notes: ${
                            item.notes || "None"
                        }`;
                    case "mobility":
                        return `${index + 1}. Time: ${
                            item.time || "N/A"
                        }, Activity: ${item.activity || "N/A"}, Duration: ${
                            item.duration || "N/A"
                        }, Notes: ${item.notes || "None"}`;
                    case "intake":
                        const foodItems =
                            item.food_items && item.food_items.length > 0
                                ? item.food_items.filter(Boolean).join(", ")
                                : "None";
                        return `${index + 1}. Time: ${
                            item.meal_time || "N/A"
                        }, Type: ${
                            item.meal_type || "N/A"
                        }, Food: ${foodItems}, Amount: ${
                            item.amount || "N/A"
                        } ${item.amount_unit || ""}, Assistance: ${
                            item.assistance_needed ? "Yes" : "No"
                        }, Notes: ${item.intake_notes || "None"}`;
                    case "output":
                        return `${index + 1}. Time: ${
                            item.output_time || "N/A"
                        }, Urine: ${item.urine_volume || "N/A"} ${
                            item.urine_volume_unit || ""
                        }, Color: ${item.urine_color || "N/A"}, Bowel: ${
                            item.bowel_movement || "N/A"
                        }, Consistency: ${
                            item.bowel_consistency || "N/A"
                        }, Notes: ${item.output_notes || "None"}`;
                    case "activities":
                        return `${index + 1}. Time: ${
                            item.time || "N/A"
                        }, Activity: ${item.activity || "N/A"}, Duration: ${
                            item.duration || "N/A"
                        }, Notes: ${item.notes || "None"}`;
                    case "sleep":
                        return `${index + 1}. Type: ${
                            item.type || "N/A"
                        }, Time: ${item.sleep_start_time || "N/A"}, Duration: ${
                            item.duration || "N/A"
                        }, Quality: ${item.sleep_quality || "N/A"}, Notes: ${
                            item.notes || "None"
                        }`;
                    case "accident":
                        return `${index + 1}. Time: ${
                            item.time || "N/A"
                        }, Severity: ${item.severity || "N/A"}, Description: ${
                            item.description || "N/A"
                        }, Actions Taken: ${item.action || "None"}`;
                    case "household":
                        return `${index + 1}. Work: ${
                            item.task || "N/A"
                        }, Time: ${item.time || "N/A"}, Duration: ${
                            item.duration || "N/A"
                        }, Notes: ${item.notes || "None"}`;
                    case "supplies":
                        return `${index + 1}. Item: ${
                            item.item || "N/A"
                        }, Quantity: ${item.quantity || "N/A"}, Purpose: ${
                            item.purpose || "N/A"
                        }, Priority: ${item.priority || "N/A"}`;
                    default:
                        return JSON.stringify(item);
                }
            })
            .join("\n");
    };

    const formatVitalSigns = () => {
        if (
            !formData.vitalSigns.times ||
            formData.vitalSigns.times.length === 0
        )
            return "No entries";

        return (
            formData.vitalSigns.times
                .map((time, index) => {
                    if (
                        !time &&
                        !formData.vitalSigns.bloodPressureSystolic[index] &&
                        !formData.vitalSigns.bloodPressureDiastolic[index] &&
                        !formData.vitalSigns.temperature[index] &&
                        !formData.vitalSigns.pulseRate[index] &&
                        !formData.vitalSigns.respiratoryRate[index] &&
                        !formData.vitalSigns.spo2[index] // Use spo2 instead of bloodSugar and weight
                    ) {
                        return null;
                    }
                    return `${index + 1}. Time: ${time || "N/A"}, BP: ${
                        formData.vitalSigns.bloodPressureSystolic[index] ||
                        "N/A"
                    }/${
                        formData.vitalSigns.bloodPressureDiastolic[index] ||
                        "N/A"
                    }, Temp: ${
                        formData.vitalSigns.temperature[index] || "N/A"
                    }°${
                        formData.vitalSigns.temperatureUnit[index] || "C"
                    }, Pulse: ${
                        formData.vitalSigns.pulseRate[index] || "N/A"
                    }/min, Respiratory: ${
                        formData.vitalSigns.respiratoryRate[index] || "N/A"
                    }/min, SPO2: ${formData.vitalSigns.spo2[index] || "N/A"}%`; // Use spo2
                })
                .filter(Boolean)
                .join("\n") || "No complete entries"
        );
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ pb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <PreviewIcon color="primary" />
                    <Typography variant="h6" fontWeight="bold">
                        Elderly Care Log Preview
                    </Typography>
                </Box>
            </DialogTitle>

            <DialogContent dividers sx={{ maxHeight: "90vh" }}>
                {/* Basic Information */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Basic Information
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Date:</strong>{" "}
                        {formData.date || "Not specified"}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Client Name:</strong>{" "}
                        {formData.firstName || "Not specified"}{" "}
                        {formData.lastName || ""}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Age:</strong> {formData.age || "Not specified"}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Weight:</strong>{" "}
                        {`${formData.weight} Kg` || "Not specified"}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Height:</strong>{" "}
                        {`${formData.height} cm` || "Not specified"}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Array sections preview - Remove emotional from here */}
                {[
                    { key: "hygiene", title: "Hygiene & Grooming" },
                    { key: "medication", title: "Medication Administration" },
                    { key: "mobility", title: "Mobility & Exercise" },
                    { key: "intake", title: "Intake Records" },
                    { key: "output", title: "Output Records" },
                    {
                        key: "activities",
                        title: "Activities & Social Interaction",
                    },
                    { key: "sleep", title: "Sleep & Rest Tracking" },
                    {
                        key: "accident",
                        title: "Accident & Emergency Situation",
                    },
                    { key: "household", title: "Household Work by Caregiver" },
                ].map(({ key, title }) => (
                    <React.Fragment key={key}>
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="h6"
                                color="primary"
                                gutterBottom
                            >
                                {title}
                            </Typography>
                            <Typography
                                component="pre"
                                sx={{
                                    whiteSpace: "pre-line",
                                    fontSize: "0.875rem",
                                }}
                            >
                                {formatArrayData(formData[key], key)}
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                    </React.Fragment>
                ))}

                {/* Add Emotional & Behavioral Observation as separate section */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Emotional & Behavioral Observation
                    </Typography>
                    <Typography variant="subtitle2">
                        <strong>General Mood:</strong>{" "}
                        {formData.emotionalMood === "Other"
                            ? formData.emotionalMoodOther || "Not specified"
                            : formData.emotionalMood || "Not specified"}
                    </Typography>
                    <Typography variant="subtitle2">
                        <strong>Behavioral Concerns:</strong>{" "}
                        {formData.behavioralConcerns === "Other"
                            ? formData.behavioralConcernsOther ||
                              "Not specified"
                            : formData.behavioralConcerns || "Not specified"}
                    </Typography>
                    <Typography variant="subtitle2">
                        <strong>Action Taken:</strong>{" "}
                        {formData.emotionalActionTaken || "No action taken"}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Health Monitoring */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Health Monitoring
                    </Typography>
                    <Typography
                        component="pre"
                        sx={{ whiteSpace: "pre-line", fontSize: "0.875rem" }}
                    >
                        {formatVitalSigns()}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Skin Care finding */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Special Skin Care
                    </Typography>
                    <Typography>
                        Moisturizer Applied:{" "}
                        {formData.moisturizer_applied ? "Yes" : "No"}
                    </Typography>
                    <Typography>
                        Pressure Areas Checked:{" "}
                        {formData.pressure_areas_checked ? "Yes" : "No"}
                    </Typography>
                    <Typography>
                        Skin Care Findings:{" "}
                        {formData.skin_care_findings || "Not Provided"}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Sleep Issues */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Sleep Issues Observed
                    </Typography>
                    <Typography>
                        {formData.sleepIssues || "No sleep issues observed"}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Requested Supplies */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Requested Supplies
                    </Typography>
                    <Typography
                        component="pre"
                        sx={{ whiteSpace: "pre-line", fontSize: "0.875rem" }}
                    >
                        {formatArrayData(
                            formData.requestedSupplies,
                            "supplies"
                        )}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Additional Notes */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Additional Notes
                    </Typography>
                    <Typography>
                        {formData.additionalNotes || "No additional notes"}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Signatures */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Signatures
                    </Typography>
                    <Typography>
                        <strong>Caregiver Name:</strong>{" "}
                        {formData.caregiverName || "Not provided"}
                    </Typography>
                    <Typography>
                        <strong>Caregiver Signature:</strong>{" "}
                        {formData.caregiverSignature
                            ? "Provided"
                            : "Not provided"}
                    </Typography>
                    <Typography>
                        <strong>Client/Family Signature:</strong>{" "}
                        {formData.clientSignature ? "Provided" : "Not provided"}
                    </Typography>
                    <Typography>
                        <strong>Client/Family Comment:</strong>{" "}
                        {formData.clientComment || "No comment"}
                    </Typography>
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2, gap: 2 }}>
                <Button
                    onClick={onEdit}
                    startIcon={<EditIcon />}
                    variant="outlined"
                    color="primary"
                    disabled={isSubmitting}
                >
                    Edit
                </Button>

                <Button
                    onClick={onSubmit}
                    startIcon={<SubmitIcon />}
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    sx={{
                        background: isSubmitting
                            ? "linear-gradient(45deg, #9e9e9e 30%, #bdbdbd 90%)"
                            : "linear-gradient(45deg, #7b1fa2 30%, #ba68c8 90%)",
                        "&:hover": {
                            background: isSubmitting
                                ? "linear-gradient(45deg, #9e9e9e 30%, #bdbdbd 90%)"
                                : "linear-gradient(45deg, #6a1b9a 30%, #ab47bc 90%)",
                        },
                    }}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const LOCAL_STORAGE_KEY = "elderlyCareLogDraft";

const ElderlyCareLogs = ({ caregiverName, lastCareLog }) => {
    const [formData, setFormData] = useState({
        // Basic Information
        date: new Date().toISOString().split("T")[0],
        firstName: "",
        lastName: "", //Optional
        age: "",
        // medicalConditions: "", // Removed as requested
        weight: "", //Optional
        height: "", //Optional

        // Array data for different sections
        hygiene: [{ time: "", activity: "", notes: "" }],
        moisturizer_applied: null,
        pressure_areas_checked: null,
        skin_care_findings: "",

        medication: [
            { time: "", medication: "", dosage: "", route: "", notes: "" },
        ],
        mobility: [{ time: "", duration: "", activity: "", notes: "" }],

        // Intake & Output data
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

        // Add new emotional/behavioral fields
        emotionalMood: "",
        emotionalMoodOther: "",
        behavioralConcerns: "",
        behavioralConcernsOther: "",
        emotionalActionTaken: "",

        // Update the accident array to match the new structure
        accident: [
            { time: "", description: "", severity: "Medium", action: "" },
        ],
        household: [{ task: "", duration: "", notes: "" }],
        requestedSupplies: [
            { item: "", quantity: "", purpose: "", priority: "medium" },
        ],

        // Health Monitoring (Vital Signs)
        vitalSigns: {
            times: [""],
            bloodPressureSystolic: [""],
            bloodPressureDiastolic: [""],
            temperature: [""],
            temperatureUnit: ["C"],
            pulseRate: [""],
            respiratoryRate: [""],
            spo2: [""], // Make sure this is included
        },

        // Blood Glucose (separate from vital signs)
        bloodGlucose: [
            {
                measurement_time: "",
                glucose_level: "",
                timing: "",
                note: "",
            },
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

    const handleArrayChange = (section, index, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: prev[section].map((item, i) =>
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

    const removeArrayItem = (section, index) => {
        if (formData[section].length > 1) {
            setFormData((prev) => ({
                ...prev,
                [section]: prev[section].filter((_, i) => i !== index),
            }));
        }
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

        if (!formData.date) {
            errors.push("Date is required");
        }

        // At least one vital sign
        const hasVitalSign =
            formData.vitalSigns &&
            formData.vitalSigns.times &&
            formData.vitalSigns.times.some(
                (t, i) =>
                    t ||
                    formData.vitalSigns.bloodPressureSystolic[i] ||
                    formData.vitalSigns.bloodPressureDiastolic[i] ||
                    formData.vitalSigns.temperature[i] ||
                    formData.vitalSigns.pulseRate[i] ||
                    formData.vitalSigns.respiratoryRate[i] ||
                    formData.vitalSigns.spo2[i]
            );
        if (!hasVitalSign) {
            errors.push("Please record vital sign");
        }
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

        // At least one intake record
        const hasIntake =
            Array.isArray(formData.intake) &&
            formData.intake.some(
                (item) =>
                    item.meal_type ||
                    item.meal_time ||
                    (item.food_items && item.food_items.some(Boolean)) ||
                    item.amount
            );
        if (!hasIntake) {
            errors.push("Food and fluid intake record is required");
        }

        // At least one output record
        const hasOutput =
            Array.isArray(formData.output) &&
            formData.output.some(
                (item) =>
                    item.output_time ||
                    item.urine_volume ||
                    item.bowel_movement ||
                    item.urine_color
            );
        if (!hasOutput) {
            errors.push("At least one output record is required");
        }

        // At least one sleep/rest tracking record
        const hasSleep =
            Array.isArray(formData.sleep) &&
            formData.sleep.some(
                (item) =>
                    item.type ||
                    item.sleep_start_time ||
                    item.duration ||
                    item.sleep_quality
            );
        if (!hasSleep) {
            errors.push("Sleep record is required");
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

    // ----- Local Storage Draft Management ------

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
                weight_kg: formData.weight ? parseFloat(formData.weight) : null,
                height_cm: formData.height ? parseFloat(formData.height) : null,
                additional_notes: formData.additionalNotes,
                caregiver_name: formData.caregiverName,
                caregiver_signature: formData.caregiverSignature,
                client_signature: formData.clientSignature,
                client_comment: formData.clientComment,

                // All the section data
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
                        item.output_time ||
                        item.urine_volume ||
                        item.bowel_movement
                ),
                hydration_record:
                    formData.hydration.fluid_intake ||
                    formData.hydration.dehydration_signs
                        ? formData.hydration
                        : null,
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
                            : "medium",
                        actions_taken: item.action || null,
                    })),
            };

            router.post(route("carelogs.elderly.store"), transformedData, {
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

            accident: [
                { time: "", description: "", severity: "Medium", action: "" },
            ],
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

    const continueFromLastCareLog = () => {
        if (!lastCareLog) return;
        setFormData((prev) => ({
            ...prev,
            date: new Date().toISOString().split("T")[0],
            firstName: lastCareLog.firstName || "",
            lastName: lastCareLog.lastName || "",
            age: lastCareLog.age || "",
            weight: lastCareLog.weight || "",
            height: lastCareLog.height || "",
        }));
        setValidationErrors([]);
    };

    return (
        <AppLayout>
            <Head title="Elderly Care Log" />
            <Container maxWidth="lg" sx={{ pb: 8 }}>
                {/* Add Test Data Buttons */}
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
                    <Backbutton />

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{
                            fontSize: {
                                xs: "1.5rem",
                                sm: "2rem",
                                md: "2.5rem",
                            },
                            color: "#7b1fa2",
                        }}
                    >
                        Elderly Daily Care Logs
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
                                "linear-gradient(90deg, #f3e5f5 60%, #ba68c8 100%)",
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
                                Your last care log:
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
                                    "linear-gradient(45deg, #7b1fa2 30%, #ba68c8 90%)",
                                "&:hover": {
                                    background:
                                        "linear-gradient(45deg, #6a1b9a 30%, #ab47bc 90%)",
                                },
                            }}
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

                <SectionCard config={sectionConfigs.medication}>
                    <Medication
                        data={formData.medication}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                        entryRefs={entryRefs}
                    />
                </SectionCard>

                <SectionCard config={sectionConfigs.health}>
                    <HealthMonitoring
                        formData={formData}
                        handleVitalSignChange={handleVitalSignChange}
                        handleInputChange={handleInputChange}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                        entryRefs={entryRefs}
                    />
                </SectionCard>

                <SectionCard config={sectionConfigs.mobility}>
                    <MobilityExercise
                        data={formData.mobility}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                        entryRefs={entryRefs}
                    />
                </SectionCard>

                <SectionCard config={sectionConfigs.intake}>
                    <IntakeOutput
                        formData={formData} // Pass entire formData
                        handleInputChange={handleInputChange}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                        entryRefs={entryRefs}
                    />
                </SectionCard>

                <SectionCard config={sectionConfigs.activities}>
                    <ActivitiesSection
                        data={formData.activities}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                        entryRefs={entryRefs}
                    />
                </SectionCard>

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

                <SectionCard config={sectionConfigs.emotional}>
                    <EmotionBehavior
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />
                </SectionCard>

                <SectionCard config={sectionConfigs.accident}>
                    <AccidentEmergency
                        data={formData.accident}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                        entryRefs={entryRefs}
                    />
                </SectionCard>

                <SectionCard config={sectionConfigs.household}>
                    <HouseholdWork
                        data={formData.household}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                        entryRefs={entryRefs}
                    />
                </SectionCard>

                <SectionCard config={sectionConfigs.supplies}>
                    <RequestedSuppliesSection
                        data={formData.requestedSupplies}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                        entryRefs={entryRefs}
                    />
                </SectionCard>

                <SectionCard config={sectionConfigs.notes}>
                    <AdditionalNotesSection
                        additionalNotes={formData.additionalNotes}
                        handleInputChange={handleInputChange}
                    />
                </SectionCard>

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
                                "linear-gradient(45deg, #7b1fa2 30%, #ba68c8 90%)",
                            boxShadow: "0 6px 20px rgba(123,31,162,0.3)",
                            "&:hover": {
                                background:
                                    "linear-gradient(45deg, #6a1b9a 30%, #ab47bc 90%)",
                                boxShadow: "0 8px 25px rgba(123,31,162,0.4)",
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
                <PreviewDialog
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

export default ElderlyCareLogs;
