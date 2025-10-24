import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Divider,
    Typography,
    Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import VisibilityIcon from "@mui/icons-material/Visibility";

function formatFetalHealth(fetal) {
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
            `Movement Detected: ${fetal.fetalMovementDetected ? "Yes" : "No"}`
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
}

function filterArray(data, type) {
    if (!data || data.length === 0) return [];
    switch (type) {
        case "hygiene":
            return data.filter(
                (item) => item.time || item.activity || item.notes
            );
        case "medication":
            return data.filter(
                (item) =>
                    item.time ||
                    item.medication ||
                    item.dosage ||
                    item.route ||
                    item.notes
            );
        case "bloodGlucose":
            return data.filter(
                (item) =>
                    item.measurement_time ||
                    item.glucose_level ||
                    item.timing ||
                    item.note
            );
        case "mobility":
            return data.filter(
                (item) =>
                    item.time || item.activity || item.duration || item.notes
            );
        case "intake":
            return data.filter(
                (item) =>
                    item.meal_type ||
                    item.meal_time ||
                    (Array.isArray(item.food_items) &&
                        item.food_items.filter(
                            (food) =>
                                typeof food === "string" && food.trim() !== ""
                        ).length > 0) ||
                    item.intake_notes
            );
        case "output":
            return data.filter(
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
            );
        case "activities":
            return data.filter(
                (item) =>
                    item.time || item.activity || item.duration || item.notes
            );
        case "sleep":
            return data.filter(
                (item) =>
                    item.type ||
                    item.sleep_start_time ||
                    item.duration ||
                    item.sleep_quality
            );
        case "accident":
            return data.filter(
                (item) =>
                    item.time ||
                    item.description ||
                    item.severity ||
                    item.action
            );
        case "household":
            return data.filter(
                (item) => item.task || item.time || item.duration || item.notes
            );
        case "supplies":
            return data.filter(
                (item) => item.item || item.quantity || item.purpose
            );
        default:
            return data;
    }
}

const PreviewMaternalCareLog = ({
    open,
    onClose,
    formData,
    onEdit,
    onSubmit,
    isSubmitting = false,
}) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ pb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <VisibilityIcon color="primary" />
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

                {/* Hygiene */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Hygiene & Grooming
                    </Typography>
                    {filterArray(formData.hygiene, "hygiene").length > 0 ? (
                        filterArray(formData.hygiene, "hygiene").map(
                            (item, idx) => (
                                <Typography key={idx} variant="body2">
                                    {item.time} - {item.activity} ({item.notes})
                                </Typography>
                            )
                        )
                    ) : (
                        <Typography>No hygiene records</Typography>
                    )}
                </Box>
                <Divider sx={{ my: 2 }} />

                {/* Medication */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Medication Administration
                    </Typography>
                    {filterArray(formData.medication, "medication").length >
                    0 ? (
                        filterArray(formData.medication, "medication").map(
                            (item, idx) => (
                                <Typography key={idx} variant="body2">
                                    {item.time} - {item.medication} (
                                    {item.dosage}, {item.route}) {item.notes}
                                </Typography>
                            )
                        )
                    ) : (
                        <Typography>No medication records</Typography>
                    )}
                </Box>
                <Divider sx={{ my: 2 }} />

                {/* Vital Signs */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Vital Signs
                    </Typography>
                    {formData.vitalSigns && formData.vitalSigns.times ? (
                        formData.vitalSigns.times.map((time, idx) => (
                            <Typography key={idx} variant="body2">
                                {time && (
                                    <>
                                        <strong>Time:</strong> {time} |{" "}
                                        <strong>BP:</strong>{" "}
                                        {
                                            formData.vitalSigns
                                                .bloodPressureSystolic[idx]
                                        }
                                        /
                                        {
                                            formData.vitalSigns
                                                .bloodPressureDiastolic[idx]
                                        }{" "}
                                        mmHg | <strong>Temp:</strong>{" "}
                                        {formData.vitalSigns.temperature[idx]}{" "}
                                        {
                                            formData.vitalSigns.temperatureUnit[
                                                idx
                                            ]
                                        }{" "}
                                        | <strong>Pulse:</strong>{" "}
                                        {formData.vitalSigns.pulseRate[idx]} |{" "}
                                        <strong>Resp:</strong>{" "}
                                        {
                                            formData.vitalSigns.respiratoryRate[
                                                idx
                                            ]
                                        }{" "}
                                        | <strong>SpO2:</strong>{" "}
                                        {formData.vitalSigns.spo2[idx]}
                                    </>
                                )}
                            </Typography>
                        ))
                    ) : (
                        <Typography>No vital signs recorded</Typography>
                    )}
                </Box>
                <Divider sx={{ my: 2 }} />

                {/* Blood Glucose */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Blood Glucose
                    </Typography>
                    {filterArray(formData.bloodGlucose, "bloodGlucose").length >
                    0 ? (
                        filterArray(formData.bloodGlucose, "bloodGlucose").map(
                            (item, idx) => (
                                <Typography key={idx} variant="body2">
                                    {item.measurement_time} -{" "}
                                    {item.glucose_level} mmol/L ({item.timing}){" "}
                                    {item.note}
                                </Typography>
                            )
                        )
                    ) : (
                        <Typography>No blood glucose records</Typography>
                    )}
                </Box>
                <Divider sx={{ my: 2 }} />

                {/* Mobility/Exercise */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Mobility / Exercise
                    </Typography>
                    {filterArray(formData.mobility, "mobility").length > 0 ? (
                        filterArray(formData.mobility, "mobility").map(
                            (item, idx) => (
                                <Typography key={idx} variant="body2">
                                    {item.time} - {item.activity} (
                                    {item.duration}) {item.notes}
                                </Typography>
                            )
                        )
                    ) : (
                        <Typography>No mobility records</Typography>
                    )}
                </Box>
                <Divider sx={{ my: 2 }} />

                {/* Intake */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Food Intake
                    </Typography>
                    {filterArray(formData.intake, "intake").length > 0 ? (
                        filterArray(formData.intake, "intake").map(
                            (item, idx) => (
                                <Typography key={idx} variant="body2">
                                    {item.meal_type} at {item.meal_time}:{" "}
                                    {item.food_items &&
                                        item.food_items.join(", ")}{" "}
                                    ({item.amount} {item.amount_unit}){" "}
                                    {item.intake_notes}
                                </Typography>
                            )
                        )
                    ) : (
                        <Typography>No intake records</Typography>
                    )}
                </Box>
                <Divider sx={{ my: 2 }} />

                {/* Output */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Urinary & Bowel Health Record
                    </Typography>
                    {filterArray(formData.output, "output").length > 0 ? (
                        filterArray(formData.output, "output").map(
                            (item, idx) => (
                                <Typography key={idx} variant="body2">
                                    Time: {item.record_time} | Urine Frequency:{" "}
                                    {item.urine_frequency} | Blood in Urine:{" "}
                                    {item.blood_in_urine ? "Yes" : "No"} |
                                    Pain/Discomfort Urination:{" "}
                                    {item.pain_discomfort_urination
                                        ? "Yes"
                                        : "No"}{" "}
                                    | Discharge: {item.discharge ? "Yes" : "No"}{" "}
                                    | Bowel Movement Frequency:{" "}
                                    {item.bowel_movement_frequency} | Blood in
                                    Stool: {item.blood_in_stool ? "Yes" : "No"}{" "}
                                    | Pain/Discomfort Abdomen:{" "}
                                    {item.pain_discomfort_abdomen
                                        ? "Yes"
                                        : "No"}{" "}
                                    | Other Symptoms: {item.other_symptoms}
                                </Typography>
                            )
                        )
                    ) : (
                        <Typography>No output records</Typography>
                    )}
                </Box>
                <Divider sx={{ my: 2 }} />

                {/* Activities */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Activities & Social Interaction
                    </Typography>
                    {filterArray(formData.activities, "activities").length >
                    0 ? (
                        filterArray(formData.activities, "activities").map(
                            (item, idx) => (
                                <Typography key={idx} variant="body2">
                                    {item.time} - {item.activity} (
                                    {item.duration}) {item.notes}
                                </Typography>
                            )
                        )
                    ) : (
                        <Typography>No activities recorded</Typography>
                    )}
                </Box>
                <Divider sx={{ my: 2 }} />

                {/* Sleep */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Sleep & Rest Tracking
                    </Typography>
                    {filterArray(formData.sleep, "sleep").length > 0 ? (
                        filterArray(formData.sleep, "sleep").map(
                            (item, idx) => (
                                <Typography key={idx} variant="body2">
                                    Sleep Start Time: {item.sleep_start_time}
                                    <br />
                                    Duration: {item.duration} <br />
                                    Quality:
                                    {item.sleep_quality}
                                    <br />
                                    Note: {item.notes || "N/A"}
                                </Typography>
                            )
                        )
                    ) : (
                        <Typography>No sleep records</Typography>
                    )}
                    <Typography variant="body2">
                        Sleep Issues: {formData.sleepIssues || "None"}
                    </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />

                {/* Emotional & Behavioral */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Emotional & Behavioral Observation
                    </Typography>
                    <Typography variant="body2">
                        Mood: {formData.emotionalMood || "Not specified"}
                    </Typography>
                    <Typography variant="body2">
                        Behavioral Concerns:{" "}
                        {formData.behavioralConcerns || "None"}
                    </Typography>
                    <Typography variant="body2">
                        Action Taken: {formData.emotionalActionTaken || "N/A"}
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
                        {formatFetalHealth(formData.fetalHealth)}
                    </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />

                {/* Accident & Emergency */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Accident & Emergency Situations
                    </Typography>
                    {filterArray(formData.accident, "accident").length > 0 ? (
                        filterArray(formData.accident, "accident").map(
                            (item, idx) => (
                                <Typography key={idx} variant="body2">
                                    {item.time} - {item.description} (
                                    {item.severity}) {item.action}
                                </Typography>
                            )
                        )
                    ) : (
                        <Typography>No accident records</Typography>
                    )}
                </Box>
                <Divider sx={{ my: 2 }} />

                {/* Household Work */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Household Work by Caregiver
                    </Typography>
                    {filterArray(formData.household, "household").length > 0 ? (
                        filterArray(formData.household, "household").map(
                            (item, idx) => (
                                <Typography key={idx} variant="body2">
                                    {item.task} at {item.time} ({item.duration}){" "}
                                    {item.notes}
                                </Typography>
                            )
                        )
                    ) : (
                        <Typography>No household work recorded</Typography>
                    )}
                </Box>
                <Divider sx={{ my: 2 }} />

                {/* Requested Supplies */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Requested Supplies
                    </Typography>
                    {filterArray(formData.supplies, "supplies").length > 0 ? (
                        filterArray(formData.supplies, "supplies").map(
                            (item, idx) => (
                                <Typography key={idx} variant="body2">
                                    {item.item} ({item.quantity}) -{" "}
                                    {item.purpose} [{item.priority}]
                                </Typography>
                            )
                        )
                    ) : (
                        <Typography>No supplies requested</Typography>
                    )}
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
                    startIcon={<SendIcon />}
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

export default PreviewMaternalCareLog;
