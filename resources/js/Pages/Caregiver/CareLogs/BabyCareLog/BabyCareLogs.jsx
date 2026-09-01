import React, { useEffect, useRef, useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
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
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import {
    Save as SaveIcon,
    ArrowBack as ArrowBackIcon,
    Restaurant as FeedingIcon,
    ChildCare as DiaperIcon,
    Hotel as SleepIcon,
    SportsEsports as ActivityIcon,
    Soap as HygieneIcon,
    Favorite as HealthIcon,
    Note as NotesIcon,
    Inventory as SuppliesIcon,
    Draw as SignatureIcon,
    Visibility as PreviewIcon,
    Edit as EditIcon,
    Send as SubmitIcon,
    Download as DownloadIcon,
} from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";

// Import components
import BasicInformation from "./components/BasicInformation";
import FeedingSection from "./components/FeedingSection";
import DiaperChangesSection from "./components/DiaperChangesSection";
import SleepSection from "./components/SleepSection";
import ActivitiesSection from "./components/ActivitiesSection";
import HygieneSection from "./components/HygieneSection";
import HealthBehaviorSection from "./components/HealthBehaviorSection";
import AdditionalNotesSection from "./components/AdditionalNotesSection";
import RequestedSuppliesSection from "./components/RequestedSuppliesSection";
import SignaturesSection from "./components/SignaturesSection";
import BackButton from "@/Components/BackButton";
import {
    BABY_CARE_LOG_FORM_LOCALE_KEY,
    getBabyFormStrings,
    parseBabyFormLocale,
} from "@/locales/careLogs/babyCareLogForm";
import {
    getLocalStorage,
    removeLocalStorage,
    setLocalStorage,
} from "@/utils/safeLocalStorage";

// Test Data Generator - Add this after imports
// const generateTestData = () => ({
//     // Basic Information (name/age come from patient prefill)
//     date: new Date().toISOString().split("T")[0],
//     weight: "5.2",
//     height: "58",

//     // Feeding data
//     feeding: [
//         {
//             time: "09:00",
//             type: "Breast milk",
//             amount: "120",
//             amount_unit: "ml",
//             notes: "Fed well, no issues",
//         },
//         {
//             time: "12:30",
//             type: "Formula",
//             amount: "150",
//             amount_unit: "ml",
//             notes: "Hungry baby, finished quickly",
//         },
//         {
//             time: "15:45",
//             type: "Breast milk",
//             amount: "100",
//             amount_unit: "ml",
//             notes: "Sleepy during feeding",
//         },
//     ],
//     foodOffered: [
//         {
//             mealTime: "Breakfast",
//             foodOffer: "Rice cereal with banana",
//             quantity: "3 tbsp",
//             texture: "Puree",
//             reaction: "Loved it! Ate everything",
//         },
//         {
//             mealTime: "Morning Snack",
//             foodOffer: "Mashed avocado",
//             quantity: "2 tbsp",
//             texture: "Mashed",
//             reaction: "Made funny faces but ate most",
//         },
//         {
//             mealTime: "Lunch",
//             foodOffer: "Sweet potato and carrot puree",
//             quantity: "4 tbsp",
//             texture: "Puree",
//             reaction: "Enjoyed, asked for more",
//         },
//     ],

//     // Diaper changes
//     diaperChanges: [
//         {
//             time: "08:30",
//             content: "Wet",
//             notes: "Normal urine, no smell",
//         },
//         {
//             time: "10:15",
//             content: "Dirty",
//             notes: "Soft stool, yellowish color",
//         },
//         {
//             time: "14:20",
//             content: "Wet",
//             notes: "Heavy wet diaper",
//         },
//     ],
//     toileting: [
//         {
//             time: "09:00",
//             toiletAttempt: "Yes",
//             result: "Success",
//             type: "Urine",
//             reaction: "Very willing, asked to use potty",
//             notes: "Great progress today",
//         },
//         {
//             time: "13:30",
//             toiletAttempt: "Yes",
//             result: "Accident",
//             type: "Urine",
//             reaction: "Was playing and didn't want to stop",
//             notes: "Need to remind more frequently",
//         },
//         {
//             time: "16:00",
//             toiletAttempt: "Yes",
//             result: "Success",
//             type: "Bowel",
//             reaction: "Proud and happy",
//             notes: "Big milestone!",
//         },
//     ],

//     // Sleep records
//     sleep: [
//         {
//             timeStarted: "10:00",
//             timeEnded: "11:30",
//             duration: "1.5 hours",
//             notes: "Peaceful sleep, no crying",
//         },
//         {
//             timeStarted: "13:00",
//             timeEnded: "14:45",
//             duration: "1 hour 45 minutes",
//             notes: "Light sleep, woke up happy",
//         },
//     ],

//     // Activities
//     activities: [
//         {
//             time: "09:30",
//             activity: "Tummy time",
//             duration: "15 minutes",
//             details: "Good head control, enjoyed it",
//         },
//         {
//             time: "11:45",
//             activity: "Reading books",
//             duration: "10 minutes",
//             details: "Looked at colorful pictures",
//         },
//         {
//             time: "16:00",
//             activity: "Singing",
//             duration: "20 minutes",
//             details: "ရောင်စုံဘောလုံးသီချင်းဆိုပြတယ်။",
//         },
//     ],

//     // Hygiene
//     hygiene: [
//         {
//             time: "08:00",
//             activity: "Diaper change",
//             products: "Baby wipes, cream",
//             notes: "Cleaned thoroughly",
//         },
//         {
//             time: "12:00",
//             activity: "Face cleaning",
//             products: "Soft cloth, warm water",
//             notes: "Cleaned after feeding",
//         },
//     ],

//     // Health & Behavior
//     mood: "Happy and content",
//     symptoms: "None observed",
//     medications: "Vitamin D drops (1 drop daily)",

//     // Vital Signs
//     vitalSigns: {
//         times: ["09:00", "15:00"],
//         temperature: ["36.5", "36.8"],
//         temperatureUnit: ["C", "C"],
//         pulseRate: ["120", "125"],
//         respiratoryRate: ["30", "32"],
//     },

//     // Additional Notes
//     additionalNotes:
//         "Baby is developing well. Good appetite, regular sleep patterns. Parents report baby is more alert during the day. Recommend continuing current routine.",

//     // Requested Supplies
//     requestedSupplies: [
//         {
//             item: "Diapers (Size 2)",
//             quantity: "1 pack",
//             purpose: "Daily care needs",
//             priority: "high",
//         },
//         {
//             item: "Baby wipes",
//             quantity: "2 packs",
//             purpose: "Hygiene and cleaning",
//             priority: "medium",
//         },
//         {
//             item: "Baby formula",
//             quantity: "1 can",
//             purpose: "Supplemental feeding",
//             priority: "low",
//         },
//     ],

//     // Signatures
//     caregiverSignature: "",
//     guardianSignature: "",
//     guardianComment: "",
// });

// Minimal test data for quick testing
// const generateMinimalTestData = () => ({
//     date: new Date().toISOString().split("T")[0],
//     weight: "4.5",
//     height: "55",
//     mood: "Happy",
//     additionalNotes: "Test notes",
//     caregiverSignature: "Test Caregiver",

//     // Keep minimal arrays
//     feeding: [
//         {
//             time: "09:00",
//             type: "Breast milk",
//             amount: "100",
//             amount_unit: "ml",
//             notes: "Good feeding",
//         },
//     ],
//     foodOffered: [
//         {
//             mealTime: "Breakfast",
//             foodOffer: "Oatmeal",
//             quantity: "2 tbsp",
//             texture: "Puree",
//             reaction: "Good",
//         },
//     ],
//     diaperChanges: [{ time: "08:30", content: "Wet", notes: "Normal" }],
//     sleep: [
//         {
//             timeStarted: "10:00",
//             timeEnded: "11:00",
//             duration: "1 hour",
//             notes: "Good sleep",
//         },
//     ],
//     activities: [
//         {
//             time: "11:30",
//             activity: "Tummy time",
//             duration: "10 min",
//             details: "Enjoyed it",
//         },
//     ],
//     hygiene: [
//         {
//             time: "08:00",
//             activity: "Diaper change",
//             products: "Wipes",
//             notes: "Clean",
//         },
//     ],
//     vitalSigns: {
//         times: ["09:00"],
//         temperature: ["36.5"],
//         temperatureUnit: ["C"],
//         pulseRate: ["120"],
//         respiratoryRate: ["30"],
//     },
//     requestedSupplies: [
//         {
//             item: "Diapers",
//             quantity: "1 pack",
//             purpose: "Daily care",
//             priority: "high",
//         },
//     ],
//     toileting: [
//         {
//             time: "10:00",
//             toiletAttempt: "Yes",
//             result: "Success",
//             type: "Urine",
//             reaction: "Good",
//             notes: "Doing well",
//         },
//     ],
// });

// Section configurations with colors and icons
const sectionConfigs = {
    basic: {
        color: "linear-gradient(135deg, #e3f2fd 0%, #f8f9fa 100%)",
        icon: InfoIcon,
        iconColor: "#1976d2",
    },
    feeding: {
        color: "linear-gradient(135deg, #ffe0f8ff 0%, #f8f9fa 100%)",
        icon: FeedingIcon,
        iconColor: "#f57c00",
    },
    diaper: {
        color: "linear-gradient(135deg, #f3e5f5 0%, #f8f9fa 100%)",
        icon: DiaperIcon,
        iconColor: "#7b1fa2",
    },
    sleep: {
        color: "linear-gradient(135deg, #e8f5e8 0%, #f8f9fa 100%)",
        icon: SleepIcon,
        iconColor: "#388e3c",
    },
    activities: {
        color: "linear-gradient(135deg, #fff8e1 0%, #f8f9fa 100%)",
        icon: ActivityIcon,
        iconColor: "#f9a825",
    },
    hygiene: {
        color: "linear-gradient(135deg, #e0f2f1 0%, #f8f9fa 100%)",
        icon: HygieneIcon,
        iconColor: "#00796b",
    },
    health: {
        color: "linear-gradient(135deg, #fce4ec 0%, #f8f9fa 100%)",
        icon: HealthIcon,
        iconColor: "#c2185b",
    },
    notes: {
        color: "linear-gradient(135deg, #f1f8e9 0%, #f8f9fa 100%)",
        icon: NotesIcon,
        iconColor: "#689f38",
    },
    supplies: {
        color: "linear-gradient(135deg, #e1f5fe 0%, #f8f9fa 100%)",
        icon: SuppliesIcon,
        iconColor: "#0097a7",
    },
    signatures: {
        color: "linear-gradient(135deg, #efebe9 0%, #f8f9fa 100%)",
        icon: SignatureIcon,
        iconColor: "#5d4037",
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

        // Filter out empty entries based on type
        const filteredData = data.filter((item) => {
            switch (type) {
                case "feeding":
                    return item.time || item.type || item.amount || item.notes;
                case "diaper":
                    return item.time || item.content || item.notes;
                case "sleep":
                    return (
                        item.timeStarted ||
                        item.timeEnded ||
                        item.duration ||
                        item.notes
                    );
                case "activities":
                    return (
                        item.time ||
                        item.activity ||
                        item.duration ||
                        item.details
                    );
                case "hygiene":
                    return (
                        item.time ||
                        item.activity ||
                        item.products ||
                        item.notes
                    );
                case "supplies":
                    return item.item || item.quantity || item.purpose;
                case "foodOffered":
                    return (
                        item.mealTime ||
                        item.foodOffer ||
                        item.quantity ||
                        item.texture ||
                        item.reaction
                    );
                case "toileting":
                    return (
                        item.time ||
                        item.toiletAttempt ||
                        item.result ||
                        item.type ||
                        item.reaction ||
                        item.notes
                    );
                default:
                    return true;
            }
        });

        if (filteredData.length === 0) return "No entries";

        return filteredData
            .map((item, index) => {
                switch (type) {
                    case "feeding":
                        return `${index + 1}. Time: ${
                            item.time || "N/A"
                        }, Type: ${item.type || "N/A"}, Amount: ${
                            item.amount || "N/A"
                        } ${item.amount_unit || ""}, Notes: ${
                            item.notes || "None"
                        }`;
                    case "diaper":
                        return `${index + 1}. Time: ${
                            item.time || "N/A"
                        }, Content: ${item.content || "N/A"}, Notes: ${
                            item.notes || "None"
                        }`;
                    case "sleep":
                        return `${index + 1}. Start: ${
                            item.timeStarted || "N/A"
                        }, End: ${item.timeEnded || "N/A"}, Duration: ${
                            item.duration || "N/A"
                        }, Notes: ${item.notes || "None"}`;
                    case "activities":
                        return `${index + 1}. Time: ${
                            item.time || "N/A"
                        }, Activity: ${item.activity || "N/A"}, Duration: ${
                            item.duration || "N/A"
                        }, Notes: ${item.details || "None"}`;
                    case "hygiene":
                        return `${index + 1}. Time: ${
                            item.time || "N/A"
                        }, Activity: ${item.activity || "N/A"}, Products: ${
                            item.products || "N/A"
                        }, Notes: ${item.notes || "None"}`;
                    case "supplies":
                        return `${index + 1}. Item: ${
                            item.item || "N/A"
                        }, Quantity: ${item.quantity || "N/A"}, Purpose: ${
                            item.purpose || "N/A"
                        }, Priority: ${item.priority || "N/A"}`;
                    case "foodOffered":
                        return `${index + 1}. Meal: ${
                            item.mealTime || "N/A"
                        }, Food: ${item.foodOffer || "N/A"}, Quantity: ${
                            item.quantity || "N/A"
                        }, Texture: ${item.texture || "N/A"}, Reaction: ${
                            item.reaction || "None"
                        }`;
                    case "toileting":
                        return `${index + 1}. Time: ${
                            item.time || "N/A"
                        }, Toilet Attempt: ${
                            item.toiletAttempt || "N/A"
                        }, Result: ${item.result || "N/A"}, Type: ${
                            item.type || "N/A"
                        }, Reaction: ${item.reaction || "N/A"}, Notes: ${
                            item.notes || "None"
                        }`;
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
                        !formData.vitalSigns.temperature[index] &&
                        !formData.vitalSigns.pulseRate[index] &&
                        !formData.vitalSigns.respiratoryRate[index]
                    ) {
                        return null;
                    }
                    return `${index + 1}. Time: ${time || "N/A"}, Temp: ${
                        formData.vitalSigns.temperature[index] || "N/A"
                    }°${
                        formData.vitalSigns.temperatureUnit[index] || "C"
                    }, Pulse: ${
                        formData.vitalSigns.pulseRate[index] || "N/A"
                    }/min, Respiratory: ${
                        formData.vitalSigns.respiratoryRate[index] || "N/A"
                    }/min`;
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
                        Care Log Preview
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
                        <strong>Baby Name:</strong>{" "}
                        {formData.firstName || "Not specified"}{" "}
                        {formData.lastName || ""}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Age:</strong> {formData.age || "Not specified"}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Weight:</strong>{" "}
                        {formData.weight || "Not specified"}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Height:</strong>{" "}
                        {formData.height || "Not specified"}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Feeding */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Feeding
                    </Typography>
                    <Typography
                        component="pre"
                        sx={{ whiteSpace: "pre-line", fontSize: "0.875rem" }}
                    >
                        {formatArrayData(formData.feeding, "feeding")}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Food Offered */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Food Offered
                    </Typography>
                    <Typography
                        component="pre"
                        sx={{ whiteSpace: "pre-line", fontSize: "0.875rem" }}
                    >
                        {formatArrayData(formData.foodOffered, "foodOffered")}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Diaper Changes */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Diaper Changes
                    </Typography>
                    <Typography
                        component="pre"
                        sx={{ whiteSpace: "pre-line", fontSize: "0.875rem" }}
                    >
                        {formatArrayData(formData.diaperChanges, "diaper")}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Toileting and Training */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Toileting and Training Report
                    </Typography>
                    <Typography
                        component="pre"
                        sx={{ whiteSpace: "pre-line", fontSize: "0.875rem" }}
                    >
                        {formatArrayData(formData.toileting, "toileting")}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Sleep */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Sleep
                    </Typography>
                    <Typography
                        component="pre"
                        sx={{ whiteSpace: "pre-line", fontSize: "0.875rem" }}
                    >
                        {formatArrayData(formData.sleep, "sleep")}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Activities */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Activities
                    </Typography>
                    <Typography
                        component="pre"
                        sx={{ whiteSpace: "pre-line", fontSize: "0.875rem" }}
                    >
                        {formatArrayData(formData.activities, "activities")}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Hygiene */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Hygiene & Grooming
                    </Typography>
                    <Typography
                        component="pre"
                        sx={{ whiteSpace: "pre-line", fontSize: "0.875rem" }}
                    >
                        {formatArrayData(formData.hygiene, "hygiene")}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Health & Behavior */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Health & Behavior
                    </Typography>
                    <Typography>
                        <strong>Mood:</strong>{" "}
                        {formData.mood || "Not specified"}
                    </Typography>
                    <Typography>
                        <strong>Symptoms:</strong>{" "}
                        {formData.symptoms || "None reported"}
                    </Typography>
                    <Typography>
                        <strong>Medications:</strong>{" "}
                        {formData.medications || "None given"}
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        sx={{ mt: 2, mb: 1 }}
                        fontWeight="bold"
                    >
                        Vital Signs:
                    </Typography>
                    <Typography
                        component="pre"
                        sx={{ whiteSpace: "pre-line", fontSize: "0.875rem" }}
                    >
                        {formatVitalSigns()}
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
                            "supplies",
                        )}
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
                        <strong>Guardian Signature:</strong>{" "}
                        {formData.guardianSignature
                            ? "Provided"
                            : "Not provided"}
                    </Typography>
                    <Typography>
                        <strong>Guardian Comment:</strong>{" "}
                        {formData.guardianComment || "No comment"}
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
                            : "linear-gradient(45deg, #e91e63 30%, #f8bbd9 90%)",
                        "&:hover": {
                            background: isSubmitting
                                ? "linear-gradient(45deg, #9e9e9e 30%, #bdbdbd 90%)"
                                : "linear-gradient(45deg, #d81b60 30%, #f48fb1 90%)",
                        },
                    }}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const LOCAL_STORAGE_KEY = "babyCareLogDraft";

const BabyCareLogs = ({
    caregiverName,
    lastCareLog,
    isPublic = false,
    lockPatientDemographics = false,
    submitUrl,
    historyUrl,
    initialPatientPrefill,
}) => {
    const [formData, setFormData] = useState({
        // Basic Information (maps to care_logs table)
        date: new Date().toISOString().split("T")[0],
        firstName: "",
        lastName: "",
        age: "",
        weight: "",
        height: "",

        // Array data (maps to separate tables)
        feeding: [
            {
                time: "",
                type: "",
                amount: "",
                amount_unit: "oz",
                notes: "",
            },
        ],
        foodOffered: [
            {
                mealTime: "",
                foodOffer: "",
                quantity: "",
                texture: "",
                reaction: "",
            },
        ],
        diaperChanges: [{ time: "", content: "", notes: "" }],
        toileting: [
            {
                time: "",
                toiletAttempt: "",
                result: "",
                type: "",
                reaction: "",
                notes: "",
            },
        ],
        sleep: [{ timeStarted: "", timeEnded: "", duration: "", notes: "" }],
        activities: [{ time: "", activity: "", duration: "", details: "" }],
        hygiene: [{ time: "", activity: "", products: "", notes: "" }],

        // Health and Behavior (maps to emotion_behaviors table)
        mood: "",
        symptoms: "",
        medications: "",

        // Vital Signs (maps to vital_signs table)
        vitalSigns: {
            times: [""],
            temperature: [""],
            temperatureUnit: ["C"],
            pulseRate: [""],
            respiratoryRate: [""],
        },

        // Additional Notes (maps to care_logs table)
        additionalNotes: "",

        // Requested Supplies (maps to requested_supplies table)
        requestedSupplies: [
            { item: "", quantity: "", purpose: "", priority: "" },
        ],

        // Signatures (maps to care_logs table) - UPDATED FIELD NAMES
        caregiverSignature: "",
        caregiverName: caregiverName || "",
        guardianSignature: "",
        guardianComment: "",
    });

    const [showPreview, setShowPreview] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formLocale, setFormLocale] = useState(() =>
        parseBabyFormLocale(getLocalStorage(BABY_CARE_LOG_FORM_LOCALE_KEY)),
    );

    useEffect(() => {
        setLocalStorage(BABY_CARE_LOG_FORM_LOCALE_KEY, formLocale);
    }, [formLocale]);

    const strings = getBabyFormStrings(formLocale);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear validation errors when user starts typing
        if (validationErrors.length > 0) {
            setValidationErrors([]);
        }
    };

    const handleArrayChange = (section, index, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: prev[section].map((item, i) =>
                i === index ? { ...item, [field]: value } : item,
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
                newVitalSigns.temperature.length,
                newVitalSigns.temperatureUnit.length,
                newVitalSigns.pulseRate.length,
                newVitalSigns.respiratoryRate.length,
            );

            [
                "times",
                "temperature",
                "temperatureUnit",
                "pulseRate",
                "respiratoryRate",
            ].forEach((key) => {
                while (newVitalSigns[key].length < maxLength) {
                    newVitalSigns[key].push(
                        key === "temperatureUnit" ? "C" : "",
                    );
                }
            });

            return {
                ...prev,
                vitalSigns: newVitalSigns,
            };
        });
    };

    // Validation function
    const validateForm = () => {
        const errors = [];
        const v = strings.validation;

        if (!formData.firstName.trim()) {
            errors.push(v.babyNameRequired);
        }

        if (!formData.age.trim()) {
            errors.push(v.ageRequired);
        }

        if (!formData.date) {
            errors.push(v.dateRequired);
        }

        const hasFeeding =
            Array.isArray(formData.feeding) &&
            formData.feeding.some(
                (item) => item.time || item.type || item.amount || item.notes,
            );
        if (!hasFeeding) {
            errors.push(v.feedingRequired);
        }

        const hasSleep =
            Array.isArray(formData.sleep) &&
            formData.sleep.some(
                (item) =>
                    item.timeStarted ||
                    item.timeEnded ||
                    item.duration ||
                    item.notes,
            );
        if (!hasSleep) {
            errors.push(v.sleepRequired);
        }

        return errors;
    };

    // Transform vital signs from arrays to individual records
    const transformVitalSigns = () => {
        const vitalSignsRecords = [];
        const {
            times,
            temperature,
            temperatureUnit,
            pulseRate,
            respiratoryRate,
        } = formData.vitalSigns;

        const maxLength = Math.max(
            times.length,
            temperature.length,
            temperatureUnit.length,
            pulseRate.length,
            respiratoryRate.length,
        );

        for (let i = 0; i < maxLength; i++) {
            if (
                times[i] ||
                temperature[i] ||
                pulseRate[i] ||
                respiratoryRate[i]
            ) {
                vitalSignsRecords.push({
                    measurement_time: times[i] || null,
                    temperature: temperature[i]
                        ? parseFloat(temperature[i])
                        : null,
                    temperature_unit: temperatureUnit[i] || "C",
                    pulse_rate: pulseRate[i] ? parseInt(pulseRate[i]) : null,
                    respiratory_rate: respiratoryRate[i]
                        ? parseInt(respiratoryRate[i])
                        : null,
                    systolic_pressure: null,
                    diastolic_pressure: null,
                    notes: null,
                });
            }
        }

        return vitalSignsRecords;
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

    const toStoredDraft = (data) => {
        if (!isPublic) {
            return data;
        }
        const { firstName, lastName, age, ...rest } = data;
        return rest;
    };

    // Load draft from localStorage on mount
    useEffect(() => {
        const savedDraft = getLocalStorage(LOCAL_STORAGE_KEY);
        if (savedDraft) {
            try {
                const parsed = JSON.parse(savedDraft);
                setFormData((prev) => ({
                    ...prev,
                    ...parsed,
                    ...(isPublic
                        ? {
                              firstName: prev.firstName,
                              lastName: prev.lastName,
                              age: prev.age,
                          }
                        : {}),
                }));
            } catch (e) {
                // Ignore parse errors
            }
        }
    }, [isPublic]);

    // Save draft to localStorage on every change
    useEffect(() => {
        setLocalStorage(
            LOCAL_STORAGE_KEY,
            JSON.stringify(toStoredDraft(formData)),
        );
    }, [formData, isPublic]);

    useEffect(() => {
        if (!isPublic || !initialPatientPrefill) {
            return;
        }
        setFormData((prev) => ({
            ...prev,
            firstName:
                initialPatientPrefill.firstName !== undefined
                    ? initialPatientPrefill.firstName
                    : prev.firstName,
            lastName:
                initialPatientPrefill.lastName !== undefined
                    ? initialPatientPrefill.lastName
                    : prev.lastName,
            age:
                initialPatientPrefill.age !== undefined
                    ? initialPatientPrefill.age
                    : prev.age,
            date: initialPatientPrefill.date || prev.date,
        }));
    }, [isPublic, initialPatientPrefill]);

    // Clear draft helper
    const clearDraft = () => {
        removeLocalStorage(LOCAL_STORAGE_KEY);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            // Transform data to match database structure before sending
            const transformedData = {
                // Main care log data - UPDATED FIELD NAMES
                care_date: formData.date,
                first_name: formData.firstName,
                last_name: formData.lastName || null,
                age_display: formData.age,
                weight_kg: formData.weight ? parseFloat(formData.weight) : null,
                height_cm: formData.height ? parseFloat(formData.height) : null,
                additional_notes: formData.additionalNotes,
                caregiver_name: formData.caregiverName,
                caregiver_signature: formData.caregiverSignature,
                guardian_signature: formData.guardianSignature,
                guardian_comment: formData.guardianComment,

                // Emotion/Behavior data
                emotion_behavior: {
                    mood: formData.mood,
                    behavior: null,
                    symptoms: formData.symptoms,
                    medications: formData.medications,
                },

                // Array data for related tables - FILTERED
                feeding_records: formData.feeding
                    .filter(
                        (item) =>
                            item.time || item.type || item.amount || item.notes,
                    )
                    .map((item) => ({
                        feeding_time: item.time,
                        feeding_type: item.type,
                        amount: item.amount ? parseFloat(item.amount) : null,
                        amount_unit: item.amount_unit,
                        notes: item.notes,
                    })),
                diaper_changes: formData.diaperChanges
                    .filter((item) => item.time || item.content || item.notes)
                    .map((item) => ({
                        change_time: item.time,
                        diaper_content: item.content,
                        notes: item.notes,
                    })),
                sleep_records: formData.sleep
                    .filter(
                        (item) =>
                            item.timeStarted ||
                            item.timeEnded ||
                            item.duration ||
                            item.notes,
                    )
                    .map((item) => ({
                        sleep_start_time: item.timeStarted,
                        sleep_end_time: item.timeEnded,
                        duration: item.duration,
                        notes: item.notes,
                    })),
                activity_records: formData.activities
                    .filter(
                        (item) =>
                            item.time ||
                            item.activity ||
                            item.duration ||
                            item.details,
                    )
                    .map((item) => ({
                        activity_time: item.time,
                        activity_type: item.activity,
                        duration: item.duration,
                        notes: item.details,
                    })),
                hygiene_records: formData.hygiene
                    .filter(
                        (item) =>
                            item.time ||
                            item.activity ||
                            item.products ||
                            item.notes,
                    )
                    .map((item) => ({
                        hygiene_time: item.time,
                        hygiene_activity: item.activity,
                        products_used: item.products,
                        notes: item.notes,
                    })),
                vital_signs: transformVitalSigns(),
                requested_supplies: formData.requestedSupplies
                    .filter(
                        (item) => item.item || item.quantity || item.purpose,
                    )
                    .map((item) => ({
                        item: item.item,
                        quantity: item.quantity,
                        purpose: item.purpose,
                        priority: item.priority || "medium",
                    })),
                food_offered_records: formData.foodOffered
                    .filter(
                        (item) =>
                            item.mealTime ||
                            item.foodOffer ||
                            item.quantity ||
                            item.texture ||
                            item.reaction,
                    )
                    .map((item) => ({
                        meal_time: item.mealTime,
                        food_offered: item.foodOffer,
                        quantity: item.quantity,
                        texture: item.texture,
                        reaction_notes: item.reaction,
                    })),
                toileting_records: formData.toileting
                    .filter(
                        (item) =>
                            item.time ||
                            item.toiletAttempt ||
                            item.result ||
                            item.type ||
                            item.reaction ||
                            item.notes,
                    )
                    .map((item) => ({
                        time: item.time,
                        toilet_attempt: item.toiletAttempt,
                        result: item.result,
                        type: item.type,
                        reaction: item.reaction,
                        notes: item.notes,
                    })),
            };

            // Use Inertia router - this will now redirect to mycarelogs with flash message
            router.post(
                submitUrl ?? route("carelogs.baby.store"),
                transformedData,
                {
                    onSuccess: () => {
                        // This will fire when redirected to mycarelogs page
                        setShowPreview(false);
                        clearDraft();
                    },
                    onError: (errors) => {
                        console.error("Submission errors:", errors);
                        alert(strings.alerts.submitFailed);
                    },
                    onFinish: () => {
                        setIsSubmitting(false);
                    },
                },
            );
        } catch (error) {
            console.error("Submission error:", error);
            alert(strings.alerts.submitFailed);
            setIsSubmitting(false);
        }
    };

    // Add these new functions
    const fillWithTestData = () => {
        const testData = generateTestData();
        setFormData((prev) => ({
            ...prev,
            ...testData,
            caregiverName: caregiverName || prev.caregiverName || "",
        }));
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
            feeding: [
                {
                    time: "",
                    type: "",
                    amount: "",
                    amount_unit: "oz",
                    notes: "",
                },
            ],
            foodOffered: [
                {
                    mealTime: "",
                    foodOffer: "",
                    quantity: "",
                    texture: "",
                    reaction: "",
                },
            ],
            diaperChanges: [{ time: "", content: "", notes: "" }],
            toileting: [
                {
                    time: "",
                    toiletAttempt: "",
                    result: "",
                    type: "",
                    reaction: "",
                    notes: "",
                },
            ],
            sleep: [
                { timeStarted: "", timeEnded: "", duration: "", notes: "" },
            ],
            activities: [{ time: "", activity: "", duration: "", details: "" }],
            hygiene: [{ time: "", activity: "", products: "", notes: "" }],
            mood: "",
            symptoms: "",
            medications: "",
            vitalSigns: {
                times: [""],
                temperature: [""],
                temperatureUnit: ["C"],
                pulseRate: [""],
                respiratoryRate: [""],
            },
            additionalNotes: "",
            requestedSupplies: [
                { item: "", quantity: "", purpose: "", priority: "" },
            ],
            caregiverSignature: "",
            caregiverName: caregiverName || "",
            guardianSignature: "",
            guardianComment: "",
        });
        setValidationErrors([]);
        clearDraft();
    };

    // Function to continue from last care log
    const continueFromLastCareLog = () => {
        if (!lastCareLog) return;
        setFormData((prev) => ({
            ...prev,
            date: new Date().toISOString().split("T")[0], // today's date
            firstName: lastCareLog.firstName || "",
            lastName: lastCareLog.lastName || "",
            age: lastCareLog.age || "",
            weight: lastCareLog.weight || "",
            height: lastCareLog.height || "",
        }));
        setValidationErrors([]);
    };

    const pageBody = (
        <>
            <Head title={strings.page.headTitle} />
            <Container maxWidth="lg" sx={{ pb: 8 }}>
                {/* Add Test Data Buttons - Insert this BEFORE the existing sections */}
                {/* <Paper
                    sx={{
                        p: 3,
                        mb: 4,
                        borderRadius: 3,
                        background:
                            "linear-gradient(135deg, #fff3e0 0%, #f8f9fa 100%)",
                        border: "2px dashed #ff9800",
                    }}
                >
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: "#f57c00", fontWeight: "bold" }}
                    >
                        {strings.testing.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, color: "#666" }}>
                        {strings.testing.description}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        <Button
                            variant="contained"
                            onClick={fillWithTestData}
                            sx={{
                                background:
                                    "linear-gradient(45deg, #ff9800 30%, #ffb74d 90%)",
                                color: "white",
                                fontWeight: "bold",
                                "&:hover": {
                                    background:
                                        "linear-gradient(45deg, #f57c00 30%, #ffa726 90%)",
                                },
                            }}
                        >
                            {strings.testing.fillComplete}
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
                            {strings.testing.fillMinimal}
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
                            {strings.testing.clearForm}
                        </Button>
                    </Box>
                </Paper> */}

                {/* Enhanced Header */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
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
                            color: "#e6991eff",
                            flex: "1 1 auto",
                            minWidth: 0,
                        }}
                    >
                        {strings.page.mainTitle}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexShrink: 0,
                        }}
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ display: { xs: "none", sm: "block" } }}
                        >
                            {strings.page.languageLabel}
                        </Typography>
                        <ToggleButtonGroup
                            exclusive
                            size="small"
                            value={formLocale}
                            onChange={(_, value) => {
                                if (value !== null) {
                                    setFormLocale(value);
                                }
                            }}
                            aria-label={strings.page.languageLabel}
                        >
                            <ToggleButton value="en">
                                {strings.page.languageEn}
                            </ToggleButton>
                            <ToggleButton value="my">
                                {strings.page.languageMy}
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
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
                                "linear-gradient(90deg, #e3f2fd 60%, #f8bbd9 100%)",
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
                                {strings.lastLog.yourLast}
                                <span style={{ color: "#e91e63" }}></span>
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                sx={{ color: "red" }}
                            >
                                {lastCareLog.firstName}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ mb: 0.5, color: "red" }}
                            >
                                {strings.lastLog.age} {lastCareLog.age}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#555" }}>
                                {strings.lastLog.lastLogDate}{" "}
                                {lastCareLog.date
                                    ? new Date(
                                          lastCareLog.date,
                                      ).toLocaleDateString(undefined, {
                                          year: "numeric",
                                          month: "short",
                                          day: "numeric",
                                      })
                                    : strings.lastLog.unknown}{" "}
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={continueFromLastCareLog}
                            sx={{
                                fontWeight: "bold",
                                background:
                                    "linear-gradient(45deg, #1976d2 30%, #64b5f6 90%)",
                                "&:hover": {
                                    background:
                                        "linear-gradient(45deg, #1565c0 30%, #42a5f5 90%)",
                                },
                            }}
                            size="small"
                        >
                            {strings.lastLog.continue}
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
                            {strings.validation.heading}
                        </Typography>
                        <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
                            {validationErrors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </Alert>
                )}

                <SectionCard config={sectionConfigs.basic}>
                    <BasicInformation
                        formData={formData}
                        handleInputChange={handleInputChange}
                        lockPatientDemographics={lockPatientDemographics}
                        strings={strings}
                    />
                </SectionCard>

                <SectionCard config={sectionConfigs.feeding}>
                    <FeedingSection
                        data={formData.feeding}
                        foodOfferedData={formData.foodOffered}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                        entryRefs={entryRefs}
                        strings={strings}
                    />
                </SectionCard>

                <SectionCard config={sectionConfigs.diaper}>
                    <DiaperChangesSection
                        data={formData.diaperChanges}
                        toiletingData={formData.toileting}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                        entryRefs={entryRefs}
                        strings={strings}
                    />
                </SectionCard>

                <SectionCard config={sectionConfigs.sleep}>
                    <SleepSection
                        data={formData.sleep}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                        entryRefs={entryRefs}
                        strings={strings}
                    />
                </SectionCard>

                <SectionCard config={sectionConfigs.activities}>
                    <ActivitiesSection
                        data={formData.activities}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                        entryRefs={entryRefs}
                        strings={strings}
                    />
                </SectionCard>

                <SectionCard config={sectionConfigs.hygiene}>
                    <HygieneSection
                        data={formData.hygiene}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                        entryRefs={entryRefs}
                        strings={strings}
                    />
                </SectionCard>

                <SectionCard config={sectionConfigs.health}>
                    <HealthBehaviorSection
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleVitalSignChange={handleVitalSignChange}
                        entryRefs={entryRefs}
                        strings={strings}
                    />
                </SectionCard>

                <SectionCard config={sectionConfigs.notes}>
                    <AdditionalNotesSection
                        additionalNotes={formData.additionalNotes}
                        handleInputChange={handleInputChange}
                        strings={strings}
                    />
                </SectionCard>

                <SectionCard config={sectionConfigs.supplies}>
                    <RequestedSuppliesSection
                        data={formData.requestedSupplies}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                        entryRefs={entryRefs}
                        strings={strings}
                    />
                </SectionCard>

                <SectionCard config={sectionConfigs.signatures}>
                    <SignaturesSection
                        formData={formData}
                        handleInputChange={handleInputChange}
                        strings={strings}
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
                            {strings.validation.heading}
                        </Typography>
                        <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
                            {validationErrors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </Alert>
                )}

                {/* Enhanced Action Buttons */}
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
                        {strings.actions.previewCareLog}
                    </Button>

                    <Button
                        onClick={() => {
                            clearDraft();
                            if (isPublic && historyUrl) {
                                router.get(historyUrl);
                                return;
                            }
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
                        {strings.actions.cancel}
                    </Button>
                </Box>

                <PreviewDialog
                    open={showPreview}
                    onClose={() => setShowPreview(false)}
                    formData={formData}
                    onEdit={handleEditClick}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                />
            </Container>
        </>
    );

    return isPublic ? pageBody : <AppLayout>{pageBody}</AppLayout>;
};

export default BabyCareLogs;
