import AppLayout from "@/Layouts/AppLayout";
import React, { useState } from "react";
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

// Import PDF generation utility
import { generateCareLogPDF } from "@/utils/pdfGenerator";

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

// Preview Dialog Component
const PreviewDialog = ({
    open,
    onClose,
    formData,
    onEdit,
    onSubmit,
    onGeneratePDF,
    isSubmitting = false,
    isGeneratingPDF = false,
}) => {
    const formatFetalHealth = () => {
        const fetal = formData.fetalHealth;
        if (
            !fetal ||
            (!fetal.fetalMovementDetected &&
                !fetal.fetalHeartSound &&
                !fetal.kickCount)
        ) {
            return "No fetal health data recorded";
        }

        let result = [];
        if (fetal.fetalMovementDetected !== undefined) {
            result.push(
                `Movement Detected: ${
                    fetal.fetalMovementDetected ? "Yes" : "No"
                }`
            );
        }
        if (fetal.kickCount) {
            result.push(`Kick Count: ${fetal.kickCount}`);
        }
        if (fetal.fetalHeartSound) {
            result.push(`Heart Rate: ${fetal.fetalHeartSound} BPM`);
        }
        if (fetal.notes) {
            result.push(`Notes: ${fetal.notes}`);
        }

        return result.join("\n");
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ pb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <PreviewIcon color="primary" />
                    <Typography variant="h6" fontWeight="bold">
                        Maternal Care Log Preview
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
                        <strong>Gestational Age:</strong>{" "}
                        {formData.gestationalAge || "Not specified"}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Fetal Health */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Fetal Health Monitoring
                    </Typography>
                    <Typography
                        component="pre"
                        sx={{
                            whiteSpace: "pre-line",
                            fontSize: "0.875rem",
                        }}
                    >
                        {formatFetalHealth()}
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
                    onClick={onGeneratePDF}
                    startIcon={<DownloadIcon />}
                    variant="outlined"
                    color="primary"
                    disabled={isSubmitting || isGeneratingPDF}
                >
                    {isGeneratingPDF ? "Generating..." : "Download PDF"}
                </Button>

                <Button
                    onClick={onEdit}
                    startIcon={<EditIcon />}
                    variant="outlined"
                    color="primary"
                    disabled={isSubmitting || isGeneratingPDF}
                >
                    Edit
                </Button>

                <Button
                    onClick={onSubmit}
                    startIcon={<SubmitIcon />}
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting || isGeneratingPDF}
                    sx={{
                        background:
                            isSubmitting || isGeneratingPDF
                                ? "linear-gradient(45deg, #9e9e9e 30%, #bdbdbd 90%)"
                                : "linear-gradient(45deg, #e91e63 30%, #f8bbd9 90%)",
                        "&:hover": {
                            background:
                                isSubmitting || isGeneratingPDF
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

const MaternalCareLogs = ({ caregiverName }) => {
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
        sleep: [{ time: "", duration: "", quality: "", notes: "" }],
        sleepIssues: "",
        emotionalMood: "",
        behavioralConcerns: "",
        emotionalActionTaken: "",

        // Fetal Health
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
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

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

    const addArrayItem = (arrayName, defaultItem) => {
        setFormData((prev) => ({
            ...prev,
            [arrayName]: [...prev[arrayName], defaultItem],
        }));
    };

    const removeArrayItem = (arrayName, index) => {
        setFormData((prev) => ({
            ...prev,
            [arrayName]: prev[arrayName].filter((_, i) => i !== index),
        }));
    };

    const handleVitalSignChange = (field, index, value) => {
        setFormData((prev) => ({
            ...prev,
            vitalSigns: {
                ...prev.vitalSigns,
                [field]: prev.vitalSigns[field].map((item, i) =>
                    i === index ? value : item
                ),
            },
        }));
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

    const handleGeneratePDF = async () => {
        setIsGeneratingPDF(true);
        try {
            const result = await generateCareLogPDF(formData, "maternal");
            if (result.success) {
                alert(
                    `PDF generated successfully! Saved as: ${result.filename}`
                );
            } else {
                alert(`Failed to generate PDF: ${result.error}`);
            }
        } catch (error) {
            console.error("PDF generation error:", error);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setIsGeneratingPDF(false);
        }
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

    return (
        <AppLayout>
            <Head title="Maternal Care Log" />
            <Container maxWidth="lg" sx={{ pb: 8 }}>
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
                    <IconButton
                        onClick={() => router.get(route("cg.dashboard"))}
                    >
                        <ArrowBackIcon />
                    </IconButton>

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
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                    />
                </SectionCard>

                {/* 2. Medication Administration */}
                <SectionCard config={sectionConfigs.medication}>
                    <Medication
                        data={formData.medication}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
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
                    />
                </SectionCard>

                {/* 4. Exercises */}
                <SectionCard config={sectionConfigs.exercise}>
                    <Exercises
                        data={formData.mobility}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
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
                    />
                </SectionCard>

                {/* 6. Urinary & Bowel Health Record */}
                <SectionCard config={sectionConfigs.urinary}>
                    <UrinaryBowelRecord
                        formData={formData}
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
                    />
                </SectionCard>

                {/* 12. Household Work by Caregiver */}
                <SectionCard config={sectionConfigs.household}>
                    <HouseholdWork
                        data={formData.household}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
                    />
                </SectionCard>

                {/* 13. Requested Supplies */}
                <SectionCard config={sectionConfigs.supplies}>
                    <RequestedSuppliesSection
                        data={formData.requestedSupplies}
                        handleArrayChange={handleArrayChange}
                        addArrayItem={addArrayItem}
                        removeArrayItem={removeArrayItem}
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
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                        onClick={handleGeneratePDF}
                        disabled
                        fullWidth={window.innerWidth < 600}
                        sx={{
                            py: 1.5,
                            px: 4,
                            borderRadius: 3,
                            fontSize: "1rem",
                            fontWeight: "bold",
                            border: "2px solid #e91e63",
                            color: "#e91e63",
                            "&:hover": {
                                border: "2px solid #d81b60",
                                bgcolor: "#fce4ec",
                            },
                        }}
                    >
                        {isGeneratingPDF ? "Generating PDF..." : "Download PDF"}
                    </Button>

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
                        onClick={() => router.get(route("cg.dashboard"))}
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
                    onGeneratePDF={handleGeneratePDF}
                    isSubmitting={isSubmitting}
                    isGeneratingPDF={isGeneratingPDF}
                />
            </Container>
        </AppLayout>
    );
};

export default MaternalCareLogs;
