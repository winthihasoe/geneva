import React, { useState } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    Container,
    Typography,
    Card,
    CardContent,
    Grid2 as Grid,
    Box,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Alert,
    Avatar,
} from "@mui/material";
import {
    ArrowBack as ArrowBackIcon,
    Download as DownloadIcon,
    CalendarToday as CalendarIcon,
    Person as PersonIcon,
    RestaurantMenu as FeedingIcon,
    Hotel as SleepIcon,
    CleanHands as HygieneIcon,
    LocalHospital as VitalIcon,
    Inventory as SupplyIcon,
    PlayArrow as ActivityIcon,
    ChangeCircle as DiaperIcon,
    Mood as MoodIcon,
    AdminPanelSettings as AdminIcon,
} from "@mui/icons-material";
import { generateCareLogPDF } from "@/utils/pdfGenerator";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import BackButton from "@/Components/BackButton";

function AdminBabyCareLogDetails() {
    const { props } = usePage();
    const { careLogData } = props;
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    const {
        care_log,
        emotion_behavior,
        feeding_records,
        food_offered_records,
        diaper_changes,
        sleep_records,
        activity_records,
        hygiene_records,
        vital_signs,
        supply_requests,
    } = careLogData;

    const handleGeneratePDF = async () => {
        setIsGeneratingPDF(true);

        try {
            // Transform the care log data to the format expected by PDF generator
            const formData = transformCareLogToFormData();
            const result = await generateCareLogPDF(formData);

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

    const transformCareLogToFormData = () => {
        return {
            date: care_log.care_date,
            firstName: care_log.first_name,
            lastName: care_log.last_name || "",
            age: care_log.age_display,
            weight: care_log.weight_kg,
            height: care_log.height_cm,
            additionalNotes: care_log.additional_notes,
            caregiverName:
                care_log.caregiver_display_name || care_log.caregiver_name,
            caregiverSignature: care_log.caregiver_signature,
            guardianSignature: care_log.guardian_signature,
            guardianComment: care_log.guardian_comment,
            mood: emotion_behavior?.mood,
            symptoms: emotion_behavior?.symptoms,
            medications: emotion_behavior?.medications,
            feeding:
                feeding_records?.map((record) => ({
                    time: record.feeding_time,
                    type: record.feeding_type,
                    amount: record.amount,
                    amount_unit: record.amount_unit,
                    notes: record.notes,
                })) || [],
            diaperChanges:
                diaper_changes?.map((record) => ({
                    time: record.change_time,
                    content: record.diaper_content,
                    notes: record.notes,
                })) || [],
            sleep:
                sleep_records?.map((record) => ({
                    timeStarted: record.sleep_start_time,
                    timeEnded: record.sleep_end_time,
                    duration: record.duration,
                    notes: record.notes,
                })) || [],
            activities:
                activity_records?.map((record) => ({
                    time: record.activity_time,
                    activity: record.activity_type,
                    duration: record.duration,
                    details: record.notes,
                })) || [],
            hygiene:
                hygiene_records?.map((record) => ({
                    time: record.hygiene_time,
                    activity: record.hygiene_activity,
                    products: record.products_used,
                    notes: record.notes,
                })) || [],
            vitalSigns: transformVitalSigns(),
            requestedSupplies:
                supply_requests?.map((record) => ({
                    item: record.item,
                    quantity: record.quantity,
                    purpose: record.purpose,
                    priority: record.priority,
                })) || [],
        };
    };

    const transformVitalSigns = () => {
        const vitalSigns = {
            times: [],
            temperature: [],
            temperatureUnit: [],
            pulseRate: [],
            respiratoryRate: [],
        };

        vital_signs?.forEach((sign) => {
            vitalSigns.times.push(sign.measurement_time || "");
            vitalSigns.temperature.push(sign.temperature || "");
            vitalSigns.temperatureUnit.push(sign.temperature_unit || "C");
            vitalSigns.pulseRate.push(sign.pulse_rate || "");
            vitalSigns.respiratoryRate.push(sign.respiratory_rate || "");
        });

        return vitalSigns;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const formatTime = (timeString) => {
        if (!timeString) return "-";
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString(
            "en-US",
            {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            }
        );
    };

    const renderTableData = (data, columns, emptyMessage) => {
        if (!data || data.length === 0) {
            return (
                <Box sx={{ textAlign: "center", py: 4 }}>
                    <Typography variant="body2" color="textSecondary">
                        {emptyMessage}
                    </Typography>
                </Box>
            );
        }

        return (
            <TableContainer component={Paper} elevation={0}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.key}
                                    sx={{ fontWeight: "bold" }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index} hover>
                                {columns.map((column) => (
                                    <TableCell key={column.key}>
                                        {column.format
                                            ? column.format(
                                                  row[column.key],
                                                  row
                                              )
                                            : row[column.key] || "-"}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
        <AdminLayout>
            <Container maxWidth="lg" sx={{ pb: 4, px: { xs: 0 } }}>
                <Typography
                    variant="h4"
                    textAlign={"center"}
                    fontWeight="bold"
                    color="primary"
                >
                    Baby Care Log Details
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        my: 3,
                        gap: 2,
                    }}
                >
                    <BackButton />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <Button
                            onClick={() =>
                                router.get(
                                    route(
                                        "admin.carelog.baby.details.show",
                                        care_log.id
                                    )
                                )
                            }
                            disabled={isGeneratingPDF}
                            size="small"
                            variant="contained"
                            sx={{
                                background: isGeneratingPDF
                                    ? "linear-gradient(45deg, #9e9e9e 30%, #bdbdbd 90%)"
                                    : "linear-gradient(45deg, #2196f3 30%, #64b5f6 90%)",
                                "&:hover": {
                                    background: isGeneratingPDF
                                        ? "linear-gradient(45deg, #9e9e9e 30%, #bdbdbd 90%)"
                                        : "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                                },
                            }}
                        >
                            <Typography variant="body2" fontWeight="bold">
                                Preview
                            </Typography>
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<DownloadIcon />}
                            onClick={handleGeneratePDF}
                            disabled={isGeneratingPDF}
                            size="small"
                        >
                            <Typography variant="body2" fontWeight="bold">
                                {isGeneratingPDF ? "Generating..." : "Download"}
                            </Typography>
                        </Button>
                    </Box>
                </Box>
                <Alert severity="info" sx={{ mb: 1 }}>
                    Logged by: {care_log.caregiver_display_name || "-"}
                </Alert>

                {/* Basic Information */}
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 3,
                            }}
                        >
                            <Avatar
                                sx={{ bgcolor: "#e3f2fd", color: "#1976d2" }}
                            >
                                <ChildCareIcon />
                            </Avatar>
                            <Typography variant="h5" fontWeight="bold">
                                Basic Information
                            </Typography>
                        </Box>

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                >
                                    Baby Name
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="medium"
                                >
                                    {care_log.first_name}{" "}
                                    {care_log.last_name || ""}
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                >
                                    Age
                                </Typography>
                                <Typography variant="body1">
                                    {care_log.age_display}
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 6, md: 6 }}>
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                >
                                    Weight
                                </Typography>
                                <Typography variant="body1">
                                    {care_log.weight_kg
                                        ? `${care_log.weight_kg} kg`
                                        : "Not recorded"}
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 6, md: 6 }}>
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                >
                                    Height
                                </Typography>
                                <Typography variant="body1">
                                    {care_log.height_cm
                                        ? `${care_log.height_cm} cm`
                                        : "Not recorded"}
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 6, md: 6 }}>
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                >
                                    Care Date
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <CalendarIcon fontSize="small" />
                                    <Typography variant="body1">
                                        {formatDate(care_log.care_date)}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 6, md: 6 }}>
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                >
                                    Care Type
                                </Typography>
                                <Chip
                                    label={care_log.care_type}
                                    color="primary"
                                    size="small"
                                    icon={<ChildCareIcon />}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                {/* Feeding Records */}
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 3,
                            }}
                        >
                            <Avatar
                                sx={{ bgcolor: "#fff3e0", color: "#f57c00" }}
                            >
                                <FeedingIcon />
                            </Avatar>
                            <Typography variant="h5" fontWeight="bold">
                                Feeding Records
                            </Typography>
                        </Box>

                        {renderTableData(
                            feeding_records,
                            [
                                {
                                    key: "feeding_time",
                                    label: "Time",
                                    format: formatTime,
                                },
                                { key: "feeding_type", label: "Type" },
                                {
                                    key: "amount",
                                    label: "Amount",
                                    format: (value, row) =>
                                        value
                                            ? `${value} ${
                                                  row.amount_unit || "ml"
                                              }`
                                            : "-",
                                },
                                { key: "notes", label: "Notes" },
                            ],
                            "No feeding records found"
                        )}
                    </CardContent>
                </Card>

                {/* Food offered */}
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 3,
                            }}
                        >
                            <Avatar
                                sx={{ bgcolor: "#e8eaf6", color: "#3949ab" }}
                            >
                                <FastfoodOutlinedIcon />
                            </Avatar>
                            <Typography variant="h5" fontWeight="bold">
                                Food Offered
                            </Typography>
                        </Box>

                        {renderTableData(
                            food_offered_records || [],
                            [
                                {
                                    key: "meal_time",
                                    label: "Time",
                                    format: formatTime,
                                },
                                { key: "food_offered", label: "Food" },
                                { key: "quantity", label: "Quantity" },
                                { key: "texture", label: "Texture" },
                                { key: "reaction_notes", label: "Notes" },
                            ],
                            "No food offered records found"
                        )}
                    </CardContent>
                </Card>

                {/* Diaper Changes */}
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 3,
                            }}
                        >
                            <Avatar
                                sx={{ bgcolor: "#f3e5f5", color: "#7b1fa2" }}
                            >
                                <DiaperIcon />
                            </Avatar>
                            <Typography variant="h5" fontWeight="bold">
                                Diaper Changes
                            </Typography>
                        </Box>

                        {renderTableData(
                            diaper_changes,
                            [
                                {
                                    key: "change_time",
                                    label: "Time",
                                    format: formatTime,
                                },
                                { key: "diaper_content", label: "Content" },
                                { key: "notes", label: "Notes" },
                            ],
                            "No diaper change records found"
                        )}
                    </CardContent>
                </Card>

                {/* Sleep Records */}
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 3,
                            }}
                        >
                            <Avatar
                                sx={{ bgcolor: "#e8f5e8", color: "#388e3c" }}
                            >
                                <SleepIcon />
                            </Avatar>
                            <Typography variant="h5" fontWeight="bold">
                                Sleep Records
                            </Typography>
                        </Box>

                        {renderTableData(
                            sleep_records,
                            [
                                {
                                    key: "sleep_start_time",
                                    label: "Start Time",
                                    format: formatTime,
                                },
                                {
                                    key: "sleep_end_time",
                                    label: "End Time",
                                    format: formatTime,
                                },
                                { key: "duration", label: "Duration" },
                                { key: "notes", label: "Notes" },
                            ],
                            "No sleep records found"
                        )}
                    </CardContent>
                </Card>

                {/* Activity Records */}
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 3,
                            }}
                        >
                            <Avatar
                                sx={{ bgcolor: "#fff8e1", color: "#f9a825" }}
                            >
                                <ActivityIcon />
                            </Avatar>
                            <Typography variant="h5" fontWeight="bold">
                                Activity Records
                            </Typography>
                        </Box>

                        {renderTableData(
                            activity_records,
                            [
                                {
                                    key: "activity_time",
                                    label: "Time",
                                    format: formatTime,
                                },
                                { key: "activity_type", label: "Activity" },
                                { key: "duration", label: "Duration" },
                                { key: "notes", label: "Notes" },
                            ],
                            "No activity records found"
                        )}
                    </CardContent>
                </Card>

                {/* Hygiene Records */}
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 3,
                            }}
                        >
                            <Avatar
                                sx={{ bgcolor: "#e0f2f1", color: "#00796b" }}
                            >
                                <HygieneIcon />
                            </Avatar>
                            <Typography variant="h5" fontWeight="bold">
                                Hygiene & Grooming
                            </Typography>
                        </Box>

                        {renderTableData(
                            hygiene_records,
                            [
                                {
                                    key: "hygiene_time",
                                    label: "Time",
                                    format: formatTime,
                                },
                                { key: "hygiene_activity", label: "Activity" },
                                {
                                    key: "products_used",
                                    label: "Products Used",
                                },
                                { key: "notes", label: "Notes" },
                            ],
                            "No hygiene records found"
                        )}
                    </CardContent>
                </Card>

                {/* Vital Signs */}
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 3,
                            }}
                        >
                            <Avatar
                                sx={{ bgcolor: "#ffebee", color: "#c62828" }}
                            >
                                <VitalIcon />
                            </Avatar>
                            <Typography variant="h5" fontWeight="bold">
                                Vital Signs
                            </Typography>
                        </Box>

                        {renderTableData(
                            vital_signs,
                            [
                                {
                                    key: "measurement_time",
                                    label: "Time",
                                    format: formatTime,
                                },
                                {
                                    key: "temperature",
                                    label: "Temperature",
                                    format: (value, row) =>
                                        value
                                            ? `${value}°${
                                                  row.temperature_unit || "C"
                                              }`
                                            : "-",
                                },
                                {
                                    key: "pulse_rate",
                                    label: "Pulse Rate",
                                    format: (value) =>
                                        value ? `${value}/min` : "-",
                                },
                                {
                                    key: "respiratory_rate",
                                    label: "Respiratory Rate",
                                    format: (value) =>
                                        value ? `${value}/min` : "-",
                                },
                                { key: "notes", label: "Notes" },
                            ],
                            "No vital signs records found"
                        )}
                    </CardContent>
                </Card>

                {/* Health & Behavior */}
                {emotion_behavior && (
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    mb: 3,
                                }}
                            >
                                <Avatar
                                    sx={{
                                        bgcolor: "#fce4ec",
                                        color: "#c2185b",
                                    }}
                                >
                                    <MoodIcon />
                                </Avatar>
                                <Typography variant="h5" fontWeight="bold">
                                    Health & Behavior
                                </Typography>
                            </Box>

                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        Mood
                                    </Typography>
                                    <Typography variant="body1">
                                        {emotion_behavior.mood ||
                                            "Not recorded"}
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        Symptoms
                                    </Typography>
                                    <Typography variant="body1">
                                        {emotion_behavior.symptoms ||
                                            "None reported"}
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        Medications
                                    </Typography>
                                    <Typography variant="body1">
                                        {emotion_behavior.medications ||
                                            "None given"}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                )}

                {/* Requested Supplies */}
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 3,
                            }}
                        >
                            <Avatar
                                sx={{ bgcolor: "#e1f5fe", color: "#0277bd" }}
                            >
                                <SupplyIcon />
                            </Avatar>
                            <Typography variant="h5" fontWeight="bold">
                                Requested Supplies
                            </Typography>
                        </Box>

                        {renderTableData(
                            supply_requests,
                            [
                                { key: "item", label: "Item" },
                                { key: "quantity", label: "Quantity" },
                                { key: "purpose", label: "Purpose" },
                                { key: "priority", label: "Priority" },
                            ],
                            "No supply requests found"
                        )}
                    </CardContent>
                </Card>

                {/* Additional Notes */}
                {care_log.additional_notes && (
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h5" fontWeight="bold" mb={2}>
                                Additional Notes
                            </Typography>
                            <Alert severity="info" sx={{ fontSize: "1rem" }}>
                                {care_log.additional_notes}
                            </Alert>
                        </CardContent>
                    </Card>
                )}

                {/* Signatures */}
                <Card>
                    <CardContent>
                        <Typography variant="h5" fontWeight="bold" mb={3}>
                            Signatures & Comments
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box>
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                        mb={1}
                                    >
                                        Caregiver Name
                                    </Typography>
                                    <Typography variant="body1" mb={2}>
                                        {care_log.caregiver_display_name ||
                                            care_log.caregiver_full_name ||
                                            care_log.caregiver_name ||
                                            "Not provided"}
                                    </Typography>

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
                                                src={
                                                    care_log.caregiver_signature
                                                }
                                                alt="Caregiver Signature"
                                                style={{
                                                    maxWidth: "100%",
                                                    maxHeight: "100%",
                                                    objectFit: "contain",
                                                }}
                                                onError={(e) => {
                                                    e.target.style.display =
                                                        "none";
                                                    e.target.nextSibling.style.display =
                                                        "block";
                                                }}
                                            />
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                sx={{ display: "none" }}
                                            >
                                                Signature data unavailable
                                            </Typography>
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
                                                Not signed
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
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
                                                src={
                                                    care_log.guardian_signature
                                                }
                                                alt="Guardian Signature"
                                                style={{
                                                    maxWidth: "100%",
                                                    maxHeight: "100%",
                                                    objectFit: "contain",
                                                }}
                                                onError={(e) => {
                                                    e.target.style.display =
                                                        "none";
                                                    e.target.nextSibling.style.display =
                                                        "block";
                                                }}
                                            />
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                sx={{ display: "none" }}
                                            >
                                                Signature data unavailable
                                            </Typography>
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
                                                Not signed
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
                    </CardContent>
                </Card>
            </Container>
        </AdminLayout>
    );
}

export default AdminBabyCareLogDetails;
