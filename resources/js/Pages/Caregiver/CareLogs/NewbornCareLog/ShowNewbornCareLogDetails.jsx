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
    Chip,
    Alert,
} from "@mui/material";
import { usePage } from "@inertiajs/react";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import FeedingIcon from "@mui/icons-material/RestaurantMenu";
import DiaperIcon from "@mui/icons-material/ChangeCircle";
import SleepIcon from "@mui/icons-material/Hotel";
import ActivityIcon from "@mui/icons-material/PlayArrow";
import HygieneIcon from "@mui/icons-material/CleanHands";
import VitalIcon from "@mui/icons-material/LocalHospital";
import SupplyIcon from "@mui/icons-material/Inventory";
import MoodIcon from "@mui/icons-material/Mood";
import CalendarIcon from "@mui/icons-material/CalendarToday";
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

const ShowNewbornCareLogDetails = () => {
    const { props } = usePage();
    const { careLogData } = props;

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

    // Table data helpers
    const feedingRows = (feeding_records || []).map((item) => [
        formatTime(item.feeding_time),
        item.feeding_type || "N/A",
        item.amount ? `${item.amount} ${item.amount_unit || "ml"}` : "N/A",
        item.notes || "N/A",
    ]);
    const diaperRows = (diaper_changes || []).map((item) => [
        formatTime(item.change_time),
        item.diaper_content || "N/A",
        item.notes || "N/A",
    ]);
    const sleepRows = (sleep_records || []).map((item) => [
        formatTime(item.sleep_start_time),
        formatTime(item.sleep_end_time),
        item.duration || "N/A",
        item.notes || "N/A",
    ]);
    const activityRows = (activity_records || []).map((item) => [
        formatTime(item.activity_time),
        item.activity_type || "N/A",
        item.duration || "N/A",
        item.notes || "N/A",
    ]);
    const hygieneRows = (hygiene_records || []).map((item) => [
        formatTime(item.hygiene_time),
        item.hygiene_activity || "N/A",
        item.products_used || "N/A",
        item.notes || "N/A",
    ]);
    const vitalRows = (vital_signs || []).map((item) => [
        formatTime(item.measurement_time),
        item.temperature
            ? `${item.temperature}°${item.temperature_unit || "C"}`
            : "N/A",
        item.pulse_rate ? `${item.pulse_rate}/min` : "N/A",
        item.respiratory_rate ? `${item.respiratory_rate}/min` : "N/A",
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
            label: "Baby Name",
            value: `${care_log?.first_name || ""} ${care_log?.last_name || ""}`,
        },
        { label: "Date", value: formatDate(care_log?.care_date) },
        { label: "Age", value: care_log?.age_display || "N/A" },
        {
            label: "Weight",
            value: care_log?.weight_kg ? `${care_log.weight_kg} kg` : "N/A",
        },
        {
            label: "Height",
            value: care_log?.height_cm ? `${care_log.height_cm} cm` : "N/A",
        },
        {
            label: "Care Type",
            value: care_log?.care_type || "N/A",
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
                    NEWBORN CARE LOG
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

            {/* Feeding Records */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                <Avatar sx={{ bgcolor: "#fff3e0", color: "#f57c00" }}>
                    <FeedingIcon />
                </Avatar>
                <SectionTitle fontSize={18}>Feeding Records</SectionTitle>
            </Box>
            <TableSection
                columns={["Time", "Type", "Amount", "Notes"]}
                rows={feedingRows}
                emptyMessage="No feeding records found"
            />

            {/* Diaper Changes */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                <Avatar sx={{ bgcolor: "#f3e5f5", color: "#718521ff" }}>
                    <DiaperIcon />
                </Avatar>
                <SectionTitle fontSize={18}>Diaper Changes</SectionTitle>
            </Box>
            <TableSection
                columns={["Time", "Content", "Notes"]}
                rows={diaperRows}
                emptyMessage="No diaper change records found"
            />

            {/* Sleep Records */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                <Avatar sx={{ bgcolor: "#e8f5e8", color: "#388e3c" }}>
                    <SleepIcon />
                </Avatar>
                <SectionTitle fontSize={18}>Sleep Records</SectionTitle>
            </Box>
            <TableSection
                columns={["Start Time", "End Time", "Duration", "Notes"]}
                rows={sleepRows}
                emptyMessage="No sleep records found"
            />

            {/* Activity Records */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                <Avatar sx={{ bgcolor: "#fff8e1", color: "#f9a825" }}>
                    <ActivityIcon />
                </Avatar>
                <SectionTitle fontSize={18}>Activity Records</SectionTitle>
            </Box>
            <TableSection
                columns={["Time", "Activity", "Duration", "Notes"]}
                rows={activityRows}
                emptyMessage="No activity records found"
            />

            {/* Hygiene Records */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                <Avatar sx={{ bgcolor: "#e0f2f1", color: "#00796b" }}>
                    <HygieneIcon />
                </Avatar>
                <SectionTitle fontSize={18}>Hygiene & Grooming</SectionTitle>
            </Box>
            <TableSection
                columns={["Time", "Activity", "Products Used", "Notes"]}
                rows={hygieneRows}
                emptyMessage="No hygiene records found"
            />

            {/* Vital Signs */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                <Avatar sx={{ bgcolor: "#ffebee", color: "#c62828" }}>
                    <VitalIcon />
                </Avatar>
                <SectionTitle fontSize={18}>Vital Signs</SectionTitle>
            </Box>
            <TableSection
                columns={[
                    "Time",
                    "Temperature",
                    "Pulse Rate",
                    "Respiratory Rate",
                    "Notes",
                ]}
                rows={vitalRows}
                emptyMessage="No vital signs records found"
            />

            {/* Health & Behavior */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                <Avatar sx={{ bgcolor: "#fce4ec", color: "#c2185b" }}>
                    <MoodIcon />
                </Avatar>
                <SectionTitle fontSize={18}>Health & Behavior</SectionTitle>
            </Box>
            <Grid container spacing={3} sx={{ mb: 2 }}>
                <Grid item size={4}>
                    <Typography variant="subtitle2" color="textSecondary">
                        Mood
                    </Typography>
                    <Typography variant="body1">
                        {emotion_behavior?.mood || "Not recorded"}
                    </Typography>
                </Grid>
                <Grid item size={4}>
                    <Typography variant="subtitle2" color="textSecondary">
                        Symptoms
                    </Typography>
                    <Typography variant="body1">
                        {emotion_behavior?.symptoms || "None reported"}
                    </Typography>
                </Grid>
                <Grid item size={4}>
                    <Typography variant="subtitle2" color="textSecondary">
                        Medications
                    </Typography>
                    <Typography variant="body1">
                        {emotion_behavior?.medications || "None given"}
                    </Typography>
                </Grid>
            </Grid>

            {/* Requested Supplies */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                <Avatar sx={{ bgcolor: "#e1f5fe", color: "#0277bd" }}>
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
                                Guardian Signature
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
                                Guardian Comment
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

export default ShowNewbornCareLogDetails;
