import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
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
    useTheme,
    useMediaQuery,
    Stack,
    Divider,
} from "@mui/material";
import {
    ArrowBack as ArrowBackIcon,
    Download as DownloadIcon,
    CalendarToday as CalendarIcon,
    Person as PersonIcon,
    RestaurantMenu as IntakeIcon,
    Hotel as SleepIcon,
    CleanHands as HygieneIcon,
    LocalHospital as VitalIcon,
    Inventory as SupplyIcon,
    PlayArrow as ActivityIcon,
    LocalPharmacy as MedicationIcon,
    DirectionsWalk as MobilityIcon,
    Psychology as EmotionalIcon,
    Warning as EmergencyIcon,
    CleaningServices as HouseholdIcon,
    Opacity as OutputIcon,
    Elderly as ElderlyIcon,
} from "@mui/icons-material";
import BackButton from "@/Components/BackButton";
import { generateElderlyCareLogPDF } from "@/utils/elderlyCareLogPdfGenerator";
import { transformElderlyCareLogToPdfFormData } from "@/utils/careLogPdfTransforms";
import { genevaCareLogsGeneratedLine } from "@/utils/genevaCareLogStrings";

const ElderlyCareLogDetails = () => {
    const { props } = usePage();
    const { careLogData } = props;
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    const {
        care_log,
        emotion_behavior,
        hygiene_records,
        medication_records,
        mobility_records,
        intake_output_records,
        activity_records,
        sleep_records,
        emergency_incidents,
        household_records,
        vital_signs,
        blood_glucose_records,
        supply_requests,
    } = careLogData;

    const handleGeneratePDF = async () => {
        if (!window.confirm("Download this care log as a PDF?")) {
            return;
        }
        setIsGeneratingPDF(true);

        try {
            const formData = transformElderlyCareLogToPdfFormData(careLogData);
            const result = await generateElderlyCareLogPDF(formData);

            if (!result.success) {
                alert(`Failed to generate PDF: ${result.error}`);
            }
        } catch (error) {
            console.error("PDF generation error:", error);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setIsGeneratingPDF(false);
        }
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

        // Handle datetime strings
        if (timeString.includes(" ")) {
            const timePart = timeString.split(" ")[1];
            return new Date(`2000-01-01T${timePart}`).toLocaleTimeString(
                "en-US",
                {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                }
            );
        }

        // Handle time-only strings
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
        const theme = useTheme();
        const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

        if (!data || data.length === 0) {
            return (
                <Box sx={{ textAlign: "center", py: 4 }}>
                    <Typography variant="body2" color="textSecondary">
                        {emptyMessage}
                    </Typography>
                </Box>
            );
        }

        let filteredData = data;
        // Detect if this is the hygiene table by checking the column keys
        const hygieneKeys = ["hygiene_time", "hygiene_activity", "notes"];
        const isHygieneTable =
            columns.length === 3 &&
            columns.every((col, idx) => col.key === hygieneKeys[idx]);

        if (isHygieneTable) {
            filteredData = data.filter(
                (row) => row.hygiene_time || row.hygiene_activity || row.notes
            );
        }

        if (!filteredData.length) {
            return (
                <Box sx={{ textAlign: "center", py: 4 }}>
                    <Typography variant="body2" color="textSecondary">
                        {emptyMessage}
                    </Typography>
                </Box>
            );
        }

        if (isMobile) {
            // Render as cards for mobile
            return (
                <Stack spacing={2}>
                    {filteredData.map((row, idx) => (
                        <Paper key={idx} elevation={1} sx={{ p: 2 }}>
                            {columns.map((column) => (
                                <Box
                                    key={column.key}
                                    sx={{
                                        mb: 1,
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: 1,
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        color="textSecondary"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        {column.label}:
                                    </Typography>
                                    <Typography variant="body2">
                                        {column.format
                                            ? column.format(
                                                  row[column.key],
                                                  row
                                              )
                                            : row[column.key] || "-"}
                                    </Typography>
                                </Box>
                            ))}
                        </Paper>
                    ))}
                </Stack>
            );
        }

        // Desktop/tablet: render as table
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
                        {filteredData.map((row, index) => (
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

    // Separate intake and output records for display
    const intakeRecords =
        intake_output_records?.filter(
            (record) =>
                record.meal_type || record.meal_time || record.food_items
        ) || [];

    const outputRecords =
        intake_output_records?.filter(
            (record) =>
                record.output_time ||
                record.urine_volume ||
                record.bowel_movement
        ) || [];

    const hydrationRecord = intake_output_records?.find(
        (record) => record.fluid_intake || record.dehydration_signs
    );

    return (
        <AppLayout>
            <Container maxWidth="lg" sx={{ pt: 2, pb: 4 }}>
                <Box mb={2}>
                    <BackButton label="Back to Care Logs" />
                </Box>
                <Typography variant="h5" fontWeight="bold" color="primary">
                    Elderly Care Log Details
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        my: 3,
                        gap: 1,
                    }}
                >
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() =>
                            router.get(
                                route(
                                    "cg.carelog.elder.details.show",
                                    care_log.id
                                )
                            )
                        }
                        sx={{
                            background: isGeneratingPDF
                                ? "linear-gradient(45deg, #9e9e9e 30%, #bdbdbd 90%)"
                                : "linear-gradient(45deg, #7b1fa2 30%, #ba68c8 90%)",
                            "&:hover": {
                                background: isGeneratingPDF
                                    ? "linear-gradient(45deg, #9e9e9e 30%, #bdbdbd 90%)"
                                    : "linear-gradient(45deg, #6a1b9a 30%, #ab47bc 90%)",
                            },
                        }}
                        startIcon={<CalendarIcon />}
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
                        <Typography fontSize={13} fontWeight="bold">
                            {isGeneratingPDF ? "Generating..." : "Download"}
                        </Typography>
                    </Button>
                </Box>

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
                                sx={{ bgcolor: "#f3e5f5", color: "#7b1fa2" }}
                            >
                                <ElderlyIcon />
                            </Avatar>
                            <Typography variant="h6" fontWeight="bold">
                                Patient Information
                            </Typography>
                        </Box>

                        <Grid container spacing={2}>
                            <Grid item size={{ xs: 12, md: 6 }}>
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                >
                                    Client Name
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="medium"
                                >
                                    {care_log.first_name}{" "}
                                    {care_log.last_name || ""}
                                </Typography>
                            </Grid>
                            <Grid item size={{ xs: 12, md: 6 }}>
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
                            <Grid item size={{ xs: 6, md: 6 }}>
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
                            <Grid item size={{ xs: 6, md: 6 }}>
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
                            <Grid item size={{ xs: 12, md: 6 }}>
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
                        </Grid>
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
                                sx={{ bgcolor: "#e8f5e8", color: "#4caf50" }}
                            >
                                <HygieneIcon />
                            </Avatar>
                            <Typography variant="h6" fontWeight="bold">
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
                                { key: "notes", label: "Notes" },
                            ],
                            "No hygiene records found"
                        )}
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
                                if (
                                    !anyMoisturizer &&
                                    !anyPressure &&
                                    !anySkinCare
                                )
                                    return null;
                                return (
                                    <Box sx={{ mt: 3 }}>
                                        <Typography
                                            variant="body2"
                                            sx={{ mb: 1 }}
                                        >
                                            <strong>
                                                Moisturizer Applied:
                                            </strong>{" "}
                                            {anyMoisturizer ? "Yes" : "No"}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ mb: 1 }}
                                        >
                                            <strong>
                                                Pressure Areas Checked:
                                            </strong>{" "}
                                            {anyPressure ? "Yes" : "No"}
                                        </Typography>
                                        {anySkinCare && (
                                            <Typography variant="body2">
                                                <strong>
                                                    Skin Care Findings:
                                                </strong>{" "}
                                                {hygiene_records
                                                    .filter(
                                                        (r) =>
                                                            r.skin_care_findings
                                                    )
                                                    .map(
                                                        (r, i) =>
                                                            r.skin_care_findings
                                                    )
                                                    .join(", ")}
                                            </Typography>
                                        )}
                                    </Box>
                                );
                            })()}
                    </CardContent>
                </Card>

                {/* Medication Records */}
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
                                sx={{ bgcolor: "#fff3e0", color: "#ff9800" }}
                            >
                                <MedicationIcon />
                            </Avatar>
                            <Typography variant="h6" fontWeight="bold">
                                Medication Administration
                            </Typography>
                        </Box>

                        {renderTableData(
                            medication_records,
                            [
                                {
                                    key: "administration_time",
                                    label: "Time",
                                    format: formatTime,
                                },
                                { key: "medication_name", label: "Medication" },
                                { key: "dosage", label: "Dosage" },
                                { key: "route", label: "Route" },
                                { key: "notes", label: "Notes" },
                            ],
                            "No medication records found"
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
                                sx={{ bgcolor: "#ffebee", color: "#f44336" }}
                            >
                                <VitalIcon />
                            </Avatar>
                            <Typography variant="h6" fontWeight="bold">
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
                                    key: "systolic_pressure",
                                    label: "Blood Pressure",
                                    format: (value, row) =>
                                        value && row.diastolic_pressure
                                            ? `${value}/${row.diastolic_pressure} mmHg`
                                            : "-",
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
                                {
                                    key: "spo2",
                                    label: "SpO2",
                                    format: (value) =>
                                        value ? `${value}%` : "-",
                                },
                                { key: "notes", label: "Notes" },
                            ],
                            "No vital signs records found"
                        )}
                    </CardContent>
                </Card>

                {/* Blood Glucose Records */}
                {blood_glucose_records && blood_glucose_records.length > 0 && (
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
                                        bgcolor: "#ffebee",
                                        color: "#d32f2f",
                                    }}
                                >
                                    <VitalIcon />
                                </Avatar>
                                <Typography variant="h5" fontWeight="bold">
                                    Blood Glucose Records
                                </Typography>
                            </Box>

                            {renderTableData(
                                blood_glucose_records,
                                [
                                    {
                                        key: "measurement_time",
                                        label: "Time",
                                        format: formatTime,
                                    },
                                    {
                                        key: "glucose_level",
                                        label: "Glucose Level",
                                        format: (value) =>
                                            value ? `${value} mg/dL` : "-",
                                    },
                                    { key: "timing", label: "Timing" },
                                    { key: "notes", label: "Notes" },
                                ],
                                "No blood glucose records found"
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Mobility & Exercise */}
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
                                sx={{ bgcolor: "#e3f2fd", color: "#2196f3" }}
                            >
                                <MobilityIcon />
                            </Avatar>
                            <Typography variant="h6" fontWeight="bold">
                                Mobility & Exercise
                            </Typography>
                        </Box>

                        {renderTableData(
                            mobility_records,
                            [
                                {
                                    key: "exercise_time",
                                    label: "Time",
                                    format: formatTime,
                                },
                                { key: "duration", label: "Duration" },
                                {
                                    key: "mobility_assistance_details",
                                    label: "Activity/Assistance",
                                },
                                { key: "notes", label: "Notes" },
                            ],
                            "No mobility & exercise records found"
                        )}
                    </CardContent>
                </Card>

                {/* Intake Records */}
                {intakeRecords.length > 0 && (
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
                                        bgcolor: "#f1f8e9",
                                        color: "#8bc34a",
                                    }}
                                >
                                    <IntakeIcon />
                                </Avatar>
                                <Typography variant="h6" fontWeight="bold">
                                    Intake Records
                                </Typography>
                            </Box>

                            {renderTableData(
                                intakeRecords,
                                [
                                    {
                                        key: "meal_time",
                                        label: "Time",
                                        format: formatTime,
                                    },
                                    { key: "meal_type", label: "Meal Type" },
                                    {
                                        key: "food_items",
                                        label: "Food/Drink",
                                        format: (value) => {
                                            try {
                                                const items =
                                                    typeof value === "string"
                                                        ? JSON.parse(value)
                                                        : value;
                                                return Array.isArray(items)
                                                    ? items
                                                          .filter(Boolean)
                                                          .join(", ")
                                                    : "-";
                                            } catch {
                                                return "-";
                                            }
                                        },
                                    },
                                    {
                                        key: "amount",
                                        label: "Amount",
                                        format: (value, row) =>
                                            value
                                                ? `${value} ${
                                                      row.amount_unit || ""
                                                  }`
                                                : "-",
                                    },
                                    {
                                        key: "assistance_needed",
                                        label: "Assistance",
                                        format: (value) =>
                                            value ? "Yes" : "No",
                                    },
                                    { key: "intake_notes", label: "Notes" },
                                ],
                                "No intake records found"
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Output Records */}
                {outputRecords.length > 0 && (
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
                                        bgcolor: "#e0f2f1",
                                        color: "#009688",
                                    }}
                                >
                                    <OutputIcon />
                                </Avatar>
                                <Typography variant="h6" fontWeight="bold">
                                    Output Records
                                </Typography>
                            </Box>

                            {renderTableData(
                                outputRecords,
                                [
                                    {
                                        key: "output_time",
                                        label: "Time",
                                        format: formatTime,
                                    },
                                    {
                                        key: "urine_volume",
                                        label: "Urine Volume",
                                        format: (value, row) =>
                                            value
                                                ? `${value} ${
                                                      row.urine_volume_unit ||
                                                      ""
                                                  }`
                                                : "-",
                                    },
                                    {
                                        key: "urine_color",
                                        label: "Urine Color",
                                    },
                                    {
                                        key: "bowel_movement",
                                        label: "Bowel Movement",
                                    },
                                    {
                                        key: "bowel_consistency",
                                        label: "Consistency",
                                    },
                                    { key: "output_notes", label: "Notes" },
                                ],
                                "No output records found"
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Hydration Record */}
                {hydrationRecord && (
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
                                        bgcolor: "#e1f5fe",
                                        color: "#03a9f4",
                                    }}
                                >
                                    <OutputIcon />
                                </Avatar>
                                <Typography variant="h5" fontWeight="bold">
                                    Hydration Status
                                </Typography>
                            </Box>

                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        Fluid Intake
                                    </Typography>
                                    <Typography variant="body1">
                                        {hydrationRecord.fluid_intake
                                            ? `${
                                                  hydrationRecord.fluid_intake
                                              } ${
                                                  hydrationRecord.fluid_intake_unit ||
                                                  "L"
                                              }`
                                            : "Not recorded"}
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        Dehydration Signs
                                    </Typography>
                                    <Typography variant="body1">
                                        {hydrationRecord.dehydration_signs ||
                                            "None observed"}
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        Other Signs
                                    </Typography>
                                    <Typography variant="body1">
                                        {hydrationRecord.other_dehydration_signs ||
                                            "None"}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                )}

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
                                sx={{ bgcolor: "#fff8e1", color: "#ffc107" }}
                            >
                                <ActivityIcon />
                            </Avatar>
                            <Typography variant="h6" fontWeight="bold">
                                Activities & Social Interaction
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
                                sx={{ bgcolor: "#e0f2f1", color: "#009688" }}
                            >
                                <SleepIcon />
                            </Avatar>
                            <Typography variant="h6" fontWeight="bold">
                                Sleep & Rest Tracking
                            </Typography>
                        </Box>

                        {renderTableData(
                            sleep_records,
                            [
                                { key: "type", label: "Type" },
                                {
                                    key: "sleep_start_time",
                                    label: "Start Time",
                                    format: formatTime,
                                },
                                { key: "duration", label: "Duration" },
                                { key: "sleep_quality", label: "Quality" },
                                { key: "notes", label: "Notes" },
                            ],
                            "No sleep records found"
                        )}
                        {/* Sleep Issues */}
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Sleep Issues Observed:{" "}
                                {sleep_records.length > 0
                                    ? sleep_records[0]?.sleep_issues
                                    : "No issues reported"}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>

                {/* Emotional & Behavioral Observation */}
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
                                        color: "#e91e63",
                                    }}
                                >
                                    <EmotionalIcon />
                                </Avatar>
                                <Typography variant="h6" fontWeight="bold">
                                    Emotional & Behavioral Observation
                                </Typography>
                            </Box>

                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        General Mood
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
                                        Behavioral Concerns
                                    </Typography>
                                    <Typography variant="body1">
                                        {emotion_behavior.behavior ||
                                            "None reported"}
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        Action Taken
                                    </Typography>
                                    <Typography variant="body1">
                                        {emotion_behavior.action_taken ||
                                            "No action taken"}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                )}

                {/* Emergency Incidents */}
                {emergency_incidents && emergency_incidents.length > 0 && (
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
                                        bgcolor: "#fff3e0",
                                        color: "#ff5722",
                                    }}
                                >
                                    <EmergencyIcon />
                                </Avatar>
                                <Typography variant="h5" fontWeight="bold">
                                    Accident & Emergency Situations
                                </Typography>
                            </Box>

                            {renderTableData(
                                emergency_incidents,
                                [
                                    {
                                        key: "incident_time",
                                        label: "Time",
                                        format: formatTime,
                                    },
                                    {
                                        key: "incident_description",
                                        label: "Description",
                                    },
                                    { key: "severity", label: "Severity" },
                                    {
                                        key: "actions_taken",
                                        label: "Actions Taken",
                                    },
                                ],
                                "No emergency incidents found"
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Household Work */}
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
                                sx={{ bgcolor: "#e8eaf6", color: "#673ab7" }}
                            >
                                <HouseholdIcon />
                            </Avatar>
                            <Typography variant="h6" fontWeight="bold">
                                Household Work by Caregiver
                            </Typography>
                        </Box>

                        {renderTableData(
                            household_records,
                            [
                                { key: "household_work", label: "Work" },
                                {
                                    key: "start_time",
                                    label: "Start Time",
                                    format: formatTime,
                                },
                                { key: "duration", label: "Duration" },
                                { key: "notes", label: "Notes" },
                            ],
                            "No household work records found"
                        )}
                    </CardContent>
                </Card>

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
                                sx={{ bgcolor: "#e1f5fe", color: "#03a9f4" }}
                            >
                                <SupplyIcon />
                            </Avatar>
                            <Typography variant="h6" fontWeight="bold">
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
                        <Typography variant="h6" fontWeight="bold" mb={3}>
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
                                        {care_log.caregiver_name ||
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
                                                Signature data unavailable
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
                    </CardContent>
                </Card>

                <Box sx={{ textAlign: "center", mt: 4, mb: 2 }}>
                    <Divider sx={{ mb: 2 }} />
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                    >
                        {genevaCareLogsGeneratedLine()}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<DownloadIcon />}
                        disabled={isGeneratingPDF}
                        onClick={handleGeneratePDF}
                    >
                        {isGeneratingPDF ? "Generating…" : "Download PDF"}
                    </Button>
                </Box>
            </Container>
        </AppLayout>
    );
};

export default ElderlyCareLogDetails;
