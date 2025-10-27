import React from "react";
import {
    Box,
    Typography,
    Divider,
    Grid2 as Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Alert,
} from "@mui/material";
import { usePage } from "@inertiajs/react";
import PregnantIcon from "@mui/icons-material/PregnantWoman";
import HygieneIcon from "@mui/icons-material/CleanHands";
import MedicationIcon from "@mui/icons-material/LocalPharmacy";
import VitalIcon from "@mui/icons-material/LocalHospital";
import ActivityIcon from "@mui/icons-material/PlayArrow";
import SleepIcon from "@mui/icons-material/Hotel";
import MobilityIcon from "@mui/icons-material/DirectionsWalk";
import IntakeIcon from "@mui/icons-material/RestaurantMenu";
import OutputIcon from "@mui/icons-material/Opacity";
import EmotionalIcon from "@mui/icons-material/Psychology";
import EmergencyIcon from "@mui/icons-material/Warning";
import HouseholdIcon from "@mui/icons-material/CleaningServices";
import SupplyIcon from "@mui/icons-material/Inventory";
import "../../../../../css/a4.css";

const primaryColor = "#21875C";
const secondaryColor = "#FFC547";
const textColor = "#333";
const lightGray = "#808080";
const headerBg = "#f5f5f5";

const SectionTitle = ({ children, fontSize = 20 }) => (
    <Typography
        variant="h6"
        sx={{
            color: primaryColor,
            fontWeight: "bold",
            fontSize,
            mt: 3,
            mb: 2,
            borderBottom: `2px solid ${secondaryColor}`,
            display: "inline-block",
            pb: 0.5,
        }}
    >
        {children}
    </Typography>
);

const TableSection = ({ columns, rows, emptyMessage }) => (
    <Box>
        {rows && rows.length > 0 ? (
            <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ background: primaryColor }}>
                            {columns.map((col, idx) => (
                                <TableCell
                                    key={idx}
                                    sx={{ color: "#fff", fontWeight: "bold" }}
                                >
                                    {col}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, idx) => (
                            <TableRow
                                key={idx}
                                sx={{
                                    background:
                                        idx % 2 === 0 ? headerBg : "#fff",
                                }}
                            >
                                {row.map((cell, cidx) => (
                                    <TableCell key={cidx}>{cell}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        ) : (
            <Typography sx={{ color: lightGray, mt: 1 }}>
                {emptyMessage}
            </Typography>
        )}
    </Box>
);

const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
};

const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const ShowMaternalCareLogDetails = () => {
    const { props } = usePage();
    const { careLogData } = props;

    const {
        care_log,
        hygiene_records,
        medication_records,
        vital_signs,
        blood_glucose_records,
        mobility_records,
        intake_output_records,
        urinary_bowel_records,
        fetal_health_records,
        activity_records,
        sleep_records,
        household_records,
        supply_requests,
        emotion_behavior,
        emergency_incidents,
    } = careLogData;

    // Intake/Output separation
    const intakeRecords =
        intake_output_records?.filter(
            (record) =>
                record.meal_type || record.meal_time || record.food_items
        ) || [];

    // Table data helpers
    const hygieneRows = (hygiene_records || []).map((item) => [
        formatTime(item.hygiene_time),
        item.hygiene_activity || "N/A",
        item.notes || "N/A",
    ]);
    const medicationRows = (medication_records || []).map((item) => [
        formatTime(item.administration_time),
        item.medication_name || "N/A",
        item.dosage || "N/A",
        item.route || "N/A",
        item.notes || "N/A",
    ]);
    const vitalRows = (vital_signs || []).map((item) => [
        formatTime(item.measurement_time),
        item.systolic_pressure && item.diastolic_pressure
            ? `${item.systolic_pressure}/${item.diastolic_pressure} mmHg`
            : "N/A",
        item.temperature
            ? `${item.temperature}°${item.temperature_unit || "C"}`
            : "N/A",
        item.pulse_rate ? `${item.pulse_rate}/min` : "N/A",
        item.respiratory_rate ? `${item.respiratory_rate}/min` : "N/A",
        item.spo2 ? `${item.spo2}%` : "N/A",
        item.notes || "N/A",
    ]);
    const glucoseRows = (blood_glucose_records || []).map((item) => [
        formatTime(item.measurement_time),
        item.glucose_level ? `${item.glucose_level} mg/dL` : "N/A",
        item.timing || "N/A",
        item.notes || "N/A",
    ]);
    const mobilityRows = (mobility_records || []).map((item) => [
        formatTime(item.exercise_time),
        item.duration || "N/A",
        item.mobility_assistance_details || "N/A",
        item.notes || "N/A",
    ]);
    const intakeRows = (intakeRecords || []).map((item) => [
        formatTime(item.meal_time),
        item.meal_type || "N/A",
        (() => {
            try {
                const items =
                    typeof item.food_items === "string"
                        ? JSON.parse(item.food_items)
                        : item.food_items;
                return Array.isArray(items)
                    ? items.filter(Boolean).join(", ")
                    : "N/A";
            } catch {
                return "N/A";
            }
        })(),
        item.amount ? `${item.amount} ${item.amount_unit || ""}` : "N/A",
        item.assistance_needed ? "Yes" : "No",
        item.intake_notes || "N/A",
    ]);
    const outputRows = (urinary_bowel_records || []).map((item) => [
        formatTime(item.record_time),
        item.urine_frequency || "N/A",
        item.blood_in_urine === 1 ? "Yes" : "No",
        item.pain_discomfort_urination === 1 ? "Yes" : "No",
        item.discharge === 1 ? "Yes" : "No",
        item.bowel_movement_frequency || "N/A",
        item.blood_in_stool === 1 ? "Yes" : "No",
        item.pain_discomfort_abdomen === 1 ? "Yes" : "No",
        item.other_symptoms || "N/A",
    ]);
    const activityRows = (activity_records || []).map((item) => [
        formatTime(item.activity_time),
        item.activity_type || "N/A",
        item.duration || "N/A",
        item.notes || "N/A",
    ]);
    const sleepRows = (sleep_records || []).map((item) => [
        item.type || "N/A",
        formatTime(item.sleep_start_time),
        item.duration || "N/A",
        item.sleep_quality || "N/A",
        item.notes || "N/A",
    ]);
    const emergencyRows = (emergency_incidents || []).map((item) => [
        formatTime(item.incident_time),
        item.incident_description || "N/A",
        item.severity || "N/A",
        item.actions_taken || "N/A",
    ]);
    const householdRows = (household_records || []).map((item) => [
        item.household_work || "N/A",
        formatTime(item.start_time),
        item.duration || "N/A",
        item.notes || "N/A",
    ]);
    const supplyRows = (supply_requests || []).map((item) => [
        item.item || "N/A",
        item.quantity || "N/A",
        item.purpose || "N/A",
        item.priority || "N/A",
    ]);

    // Basic Info
    const basicInfoRows = [
        {
            label: "Client Name",
            value: `${care_log?.first_name || ""} ${care_log?.last_name || ""}`,
        },
        { label: "Date", value: formatDate(care_log?.care_date) },
        { label: "Age", value: care_log?.age_display || "N/A" },
        {
            label: "Gestational Age",
            value: care_log?.gestational_age || "N/A",
        },
        {
            label: "Weight",
            value: care_log?.weight_kg ? `${care_log.weight_kg} kg` : "N/A",
        },
        {
            label: "Height",
            value: care_log?.height_cm ? `${care_log.height_cm} cm` : "N/A",
        },
    ];

    return (
        <div className="a4-page">
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography
                    variant="h5"
                    sx={{ color: primaryColor, fontWeight: "bold" }}
                >
                    MATERNAL CARE LOG
                </Typography>
                <Typography sx={{ color: lightGray, fontSize: 13 }}>
                    Generated on {new Date().toLocaleDateString()} at{" "}
                    {new Date().toLocaleTimeString()}
                </Typography>
                <Divider sx={{ mt: 1, mb: 2, borderColor: primaryColor }} />
            </Box>

            {/* Basic Info */}
            <SectionTitle>Basic Information</SectionTitle>
            <Grid container columnSpacing={5} sx={{ mb: 1 }}>
                {basicInfoRows.map((row, idx) => (
                    <Grid item size={6} key={idx}>
                        <Grid container spacing={1} sx={{ mb: 0.5 }}>
                            <Grid item size={5}>
                                <Typography
                                    sx={{
                                        color: textColor,
                                        fontWeight: 600,
                                    }}
                                >
                                    {row.label}:
                                </Typography>
                            </Grid>
                            <Grid item size={7}>
                                <Typography sx={{ color: textColor }}>
                                    {row.value}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>

            {/* Hygiene */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                <Avatar sx={{ bgcolor: "#e8f5e8", color: "#4caf50" }}>
                    <HygieneIcon />
                </Avatar>
                <SectionTitle fontSize={18}>Hygiene & Grooming</SectionTitle>
            </Box>
            <TableSection
                columns={["Time", "Activity", "Notes"]}
                rows={hygieneRows}
                emptyMessage="No hygiene records found"
            />
            {/* Moisturizer, Pressure Area, Skin Care Findings summary */}
            {hygiene_records &&
                hygiene_records.length > 0 &&
                (() => {
                    const anyMoisturizer = hygiene_records.some(
                        (r) => r.moisturizer_applied
                    );
                    const anyPressure = hygiene_records.some(
                        (r) => r.pressure_areas_checked
                    );
                    const anySkinCare = hygiene_records.some(
                        (r) => r.skin_care_findings
                    );
                    if (!anyMoisturizer && !anyPressure && !anySkinCare)
                        return null;
                    return (
                        <Box sx={{ mt: 1, mb: 2 }}>
                            {anyMoisturizer && (
                                <Typography variant="body2">
                                    • Moisturizer applied.
                                </Typography>
                            )}
                            {anyPressure && (
                                <Typography variant="body2">
                                    • Pressure areas were checked.
                                </Typography>
                            )}
                            {anySkinCare && (
                                <Typography variant="body2">
                                    • Skin care findings:{" "}
                                    {hygiene_records
                                        .filter((r) => r.skin_care_findings)
                                        .map((r) => r.skin_care_findings)
                                        .join(", ")}
                                </Typography>
                            )}
                        </Box>
                    );
                })()}

            {/* Medication */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                <Avatar sx={{ bgcolor: "#fff3e0", color: "#ff9800" }}>
                    <MedicationIcon />
                </Avatar>
                <SectionTitle fontSize={18}>
                    Medication Administration
                </SectionTitle>
            </Box>
            <TableSection
                columns={["Time", "Medication", "Dosage", "Route", "Notes"]}
                rows={medicationRows}
                emptyMessage="No medication records found"
            />

            {/* Vital Signs */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                <Avatar sx={{ bgcolor: "#ffebee", color: "#f44336" }}>
                    <VitalIcon />
                </Avatar>
                <SectionTitle fontSize={18}>Vital Signs</SectionTitle>
            </Box>
            <TableSection
                columns={[
                    "Time",
                    "Blood Pressure",
                    "Temperature",
                    "Pulse",
                    "Respiratory",
                    "SpO2",
                    "Notes",
                ]}
                rows={vitalRows}
                emptyMessage="No vital signs records found"
            />

            {/* Blood Glucose */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                <Avatar sx={{ bgcolor: "#ffebee", color: "#d32f2f" }}>
                    <VitalIcon />
                </Avatar>
                <SectionTitle fontSize={18}>Blood Glucose Records</SectionTitle>
            </Box>
            <TableSection
                columns={["Time", "Glucose Level", "Timing", "Notes"]}
                rows={glucoseRows}
                emptyMessage="No blood glucose records found"
            />

            {/* Mobility */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                <Avatar sx={{ bgcolor: "#e3f2fd", color: "#2196f3" }}>
                    <MobilityIcon />
                </Avatar>
                <SectionTitle fontSize={18}>Mobility & Exercise</SectionTitle>
            </Box>
            <TableSection
                columns={["Time", "Duration", "Activity/Assistance", "Notes"]}
                rows={mobilityRows}
                emptyMessage="No mobility & exercise records found"
            />

            {/* Intake */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                <Avatar sx={{ bgcolor: "#f1f8e9", color: "#8bc34a" }}>
                    <IntakeIcon />
                </Avatar>
                <SectionTitle fontSize={18}>Food Diary</SectionTitle>
            </Box>
            <TableSection
                columns={[
                    "Time",
                    "Meal Type",
                    "Food/Drink",
                    "Amount",
                    "Assistance",
                    "Notes",
                ]}
                rows={intakeRows}
                emptyMessage="No intake records found"
            />

            {/* Output */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                <Avatar sx={{ bgcolor: "#e0f2f1", color: "#009688" }}>
                    <OutputIcon />
                </Avatar>
                <SectionTitle fontSize={18}>
                    Urinary & Bowel Health Records
                </SectionTitle>
            </Box>
            <TableSection
                columns={[
                    "Time",
                    "Urine Frequency",
                    "Blood in Urine",
                    "Pain/Discomfort Urination",
                    "Discharge",
                    "Bowel Movement Frequency",
                    "Blood in Stool",
                    "Pain/Discomfort Abdomen",
                    "Other Symptoms",
                ]}
                rows={outputRows}
                emptyMessage="No output records found"
            />

            {/* Fetal Health */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                <Avatar sx={{ bgcolor: "#fff3e0", color: "#ff9800" }}>
                    <PregnantIcon />
                </Avatar>
                <SectionTitle fontSize={18}>
                    Fetal Health Monitoring
                </SectionTitle>
            </Box>
            <Box sx={{ mb: 2 }}>
                <Typography variant="body1">
                    Movement Detected:{" "}
                    {fetal_health_records?.fetal_movement_detected == 1
                        ? "Yes"
                        : fetal_health_records?.fetal_movement_detected == 0
                        ? "No"
                        : "Not recorded"}
                </Typography>
                <Typography variant="body1">
                    Kick Count: {fetal_health_records?.kick_count || "N/A"}
                </Typography>
                <Typography variant="body1">
                    Heart Rate:{" "}
                    {fetal_health_records?.fetal_heart_sound || "N/A"} bpm
                </Typography>
                <Typography variant="body1">
                    Notes: {fetal_health_records?.notes || "N/A"}
                </Typography>
            </Box>

            {/* Activities */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                <Avatar sx={{ bgcolor: "#fff8e1", color: "#ffc107" }}>
                    <ActivityIcon />
                </Avatar>
                <SectionTitle fontSize={18}>
                    Activities & Social Interaction
                </SectionTitle>
            </Box>
            <TableSection
                columns={["Time", "Activity", "Duration", "Notes"]}
                rows={activityRows}
                emptyMessage="No activity records found"
            />

            {/* Sleep */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                <Avatar sx={{ bgcolor: "#e0f2f1", color: "#009688" }}>
                    <SleepIcon />
                </Avatar>
                <SectionTitle fontSize={18}>Sleep & Rest Tracking</SectionTitle>
            </Box>
            <TableSection
                columns={["Type", "Start Time", "Duration", "Quality", "Notes"]}
                rows={sleepRows}
                emptyMessage="No sleep records found"
            />
            <Box sx={{ mt: 1 }}>
                <Typography variant="subtitle1" gutterBottom>
                    Sleep Issues Observed:{" "}
                    {sleep_records.length > 0
                        ? sleep_records[0]?.sleep_issue
                        : "No issues reported"}
                </Typography>
            </Box>

            {/* Emotional & Behavioral */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                <Avatar sx={{ bgcolor: "#fce4ec", color: "#e91e63" }}>
                    <EmotionalIcon />
                </Avatar>
                <SectionTitle fontSize={18}>
                    Emotional & Behavioral Observation
                </SectionTitle>
            </Box>
            <Box sx={{ mb: 2 }}>
                <Grid container spacing={3}>
                    <Grid item size={4}>
                        <Typography variant="subtitle2" color="textSecondary">
                            General Mood
                        </Typography>
                        <Typography variant="body1">
                            {emotion_behavior?.mood || "Not recorded"}
                        </Typography>
                    </Grid>
                    <Grid item size={4}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Behavioral Concerns
                        </Typography>
                        <Typography variant="body1">
                            {emotion_behavior?.behavior || "None reported"}
                        </Typography>
                    </Grid>
                    <Grid item size={4}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Action Taken
                        </Typography>
                        <Typography variant="body1">
                            {emotion_behavior?.action_taken ||
                                "No action taken"}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

            {/* Emergency */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                <Avatar sx={{ bgcolor: "#fff3e0", color: "#ff5722" }}>
                    <EmergencyIcon />
                </Avatar>
                <SectionTitle fontSize={18}>
                    Accident & Emergency Situations
                </SectionTitle>
            </Box>
            <TableSection
                columns={["Time", "Description", "Severity", "Actions Taken"]}
                rows={emergencyRows}
                emptyMessage="No emergency incidents found"
            />

            {/* Household */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                <Avatar sx={{ bgcolor: "#e8eaf6", color: "#673ab7" }}>
                    <HouseholdIcon />
                </Avatar>
                <SectionTitle fontSize={18}>
                    Household Work by Caregiver
                </SectionTitle>
            </Box>
            <TableSection
                columns={["Work", "Start Time", "Duration", "Notes"]}
                rows={householdRows}
                emptyMessage="No household work records found"
            />

            {/* Supplies */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                <Avatar sx={{ bgcolor: "#e1f5fe", color: "#03a9f4" }}>
                    <SupplyIcon />
                </Avatar>
                <SectionTitle fontSize={18}>Requested Supplies</SectionTitle>
            </Box>
            <TableSection
                columns={["Item", "Quantity", "Purpose", "Priority"]}
                rows={supplyRows}
                emptyMessage="No supply requests found"
            />

            {/* Additional Notes */}
            {care_log.additional_notes && (
                <Box sx={{ mt: 3 }}>
                    <SectionTitle fontSize={18}>Additional Notes</SectionTitle>
                    <Alert severity="info" sx={{ fontSize: "1rem" }}>
                        {care_log.additional_notes}
                    </Alert>
                </Box>
            )}

            {/* Signatures */}
            <Box sx={{ mt: 3 }}>
                <SectionTitle fontSize={18}>Signatures & Comments</SectionTitle>
                <Grid container spacing={3}>
                    <Grid item size={6}>
                        <Box>
                            <Typography
                                variant="subtitle2"
                                color="textSecondary"
                                mb={1}
                            >
                                Caregiver Signature
                            </Typography>
                            {care_log.caregiver_signature ? (
                                <Box
                                    sx={{
                                        border: "1px solid #e0e0e0",
                                        borderRadius: 1,
                                        p: 2,
                                        backgroundColor: "#fafafa",
                                        maxWidth: 300,
                                        height: 120,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <img
                                        src={care_log.caregiver_signature}
                                        alt="Caregiver Signature"
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "100%",
                                            objectFit: "contain",
                                        }}
                                    />
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        border: "1px dashed #ccc",
                                        borderRadius: 1,
                                        p: 2,
                                        backgroundColor: "#f9f9f9",
                                        maxWidth: 300,
                                        height: 120,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Signature data unavailable
                                    </Typography>
                                </Box>
                            )}
                            <Typography
                                variant="subtitle2"
                                color="textSecondary"
                                my={1}
                            >
                                Caregiver Name
                            </Typography>
                            <Typography variant="body1" mb={2}>
                                {care_log.caregiver_name || "Not provided"}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item size={6}>
                        <Box>
                            <Typography
                                variant="subtitle2"
                                color="textSecondary"
                                mb={1}
                            >
                                Client/Family Signature
                            </Typography>
                            {care_log.guardian_signature ? (
                                <Box
                                    sx={{
                                        border: "1px solid #e0e0e0",
                                        borderRadius: 1,
                                        p: 2,
                                        backgroundColor: "#fafafa",
                                        maxWidth: 300,
                                        height: 120,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mb: 2,
                                    }}
                                >
                                    <img
                                        src={care_log.guardian_signature}
                                        alt="Guardian Signature"
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "100%",
                                            objectFit: "contain",
                                        }}
                                    />
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        border: "1px dashed #ccc",
                                        borderRadius: 1,
                                        p: 2,
                                        backgroundColor: "#f9f9f9",
                                        maxWidth: 300,
                                        height: 120,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mb: 2,
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Signature data unavailable
                                    </Typography>
                                </Box>
                            )}
                            <Typography
                                variant="subtitle2"
                                color="textSecondary"
                                mb={1}
                            >
                                Client/Family Comment
                            </Typography>
                            <Box
                                sx={{
                                    border: "1px solid #e0e0e0",
                                    borderRadius: 1,
                                    p: 2,
                                    backgroundColor: "#fafafa",
                                    minHeight: 60,
                                }}
                            >
                                <Typography variant="body1">
                                    {care_log.guardian_comment ||
                                        "No comment provided"}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* Footer */}
            <Box sx={{ textAlign: "center", mt: 4 }}>
                <Divider sx={{ mb: 1, borderColor: primaryColor }} />
                <Typography sx={{ color: lightGray, fontSize: 12 }}>
                    Generated by Hearty Aid Care Logs System
                </Typography>
            </Box>
        </div>
    );
};

export default ShowMaternalCareLogDetails;
