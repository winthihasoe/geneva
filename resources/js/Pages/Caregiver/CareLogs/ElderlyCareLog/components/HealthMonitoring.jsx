import React from "react";
import {
    Typography,
    TextField,
    Card,
    CardContent,
    Grid2,
    Box,
    Button,
    IconButton,
    Divider,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

const HealthMonitoring = ({
    formData,
    handleInputChange,
    handleVitalSignChange,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
}) => {
    // Handle vital signs as array entries - Updated for elderly care
    const addVitalSignEntry = () => {
        const newIndex = formData.vitalSigns.times.length;
        handleVitalSignChange("times", newIndex, "");
        handleVitalSignChange("bloodPressureSystolic", newIndex, "");
        handleVitalSignChange("bloodPressureDiastolic", newIndex, "");
        handleVitalSignChange("temperature", newIndex, "");
        handleVitalSignChange("temperatureUnit", newIndex, "C");
        handleVitalSignChange("pulseRate", newIndex, "");
        handleVitalSignChange("respiratoryRate", newIndex, "");
        handleVitalSignChange("spo2", newIndex, "");
    };

    const removeVitalSignEntry = (index) => {
        if (formData.vitalSigns.times.length > 1) {
            const newTimes = formData.vitalSigns.times.filter(
                (_, i) => i !== index
            );
            const newBloodPressureSystolic =
                formData.vitalSigns.bloodPressureSystolic.filter(
                    (_, i) => i !== index
                );
            const newBloodPressureDiastolic =
                formData.vitalSigns.bloodPressureDiastolic.filter(
                    (_, i) => i !== index
                );
            const newTemperature = formData.vitalSigns.temperature.filter(
                (_, i) => i !== index
            );
            const newTemperatureUnit =
                formData.vitalSigns.temperatureUnit.filter(
                    (_, i) => i !== index
                );
            const newPulseRate = formData.vitalSigns.pulseRate.filter(
                (_, i) => i !== index
            );
            const newRespiratoryRate =
                formData.vitalSigns.respiratoryRate.filter(
                    (_, i) => i !== index
                );
            const newSpo2 = formData.vitalSigns.spo2.filter(
                (_, i) => i !== index
            );

            // Update all vital sign arrays
            const updatedVitalSigns = {
                times: newTimes,
                bloodPressureSystolic: newBloodPressureSystolic,
                bloodPressureDiastolic: newBloodPressureDiastolic,
                temperature: newTemperature,
                temperatureUnit: newTemperatureUnit,
                pulseRate: newPulseRate,
                respiratoryRate: newRespiratoryRate,
                spo2: newSpo2,
            };

            handleInputChange("vitalSigns", updatedVitalSigns);
        }
    };

    return (
        <Card sx={{ borderRadius: 2, bgcolor: "transparent" }}>
            <CardContent>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={3}
                    color="primary"
                >
                    3. Health Monitoring
                </Typography>

                {/* Vital Signs Section */}
                <Box sx={{ mb: 4 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 3,
                            flexWrap: "wrap",
                            gap: 2,
                        }}
                    >
                        <Typography variant="subtitle1" fontWeight="bold">
                            Vital Signs
                        </Typography>
                        <Button
                            startIcon={<AddIcon />}
                            onClick={addVitalSignEntry}
                            variant="outlined"
                            size="small"
                        >
                            Add Entry
                        </Button>
                    </Box>

                    {formData.vitalSigns.times.map((_, index) => (
                        <Box key={index}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: 2,
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                >
                                    Entry {index + 1}
                                </Typography>
                                <IconButton
                                    onClick={() => removeVitalSignEntry(index)}
                                    color="error"
                                    size="small"
                                    disabled={
                                        formData.vitalSigns.times.length === 1
                                    }
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>

                            <Grid2 container spacing={2} sx={{ mb: 3 }}>
                                <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label="Time"
                                        type="time"
                                        value={
                                            formData.vitalSigns.times[index] ||
                                            ""
                                        }
                                        onChange={(e) =>
                                            handleVitalSignChange(
                                                "times",
                                                index,
                                                e.target.value
                                            )
                                        }
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid2>

                                <Grid2 size={{ xs: 6, sm: 3, md: 1.5 }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label="Systolic BP"
                                        type="number"
                                        value={
                                            formData.vitalSigns
                                                .bloodPressureSystolic[index] ||
                                            ""
                                        }
                                        onChange={(e) =>
                                            handleVitalSignChange(
                                                "bloodPressureSystolic",
                                                index,
                                                e.target.value
                                            )
                                        }
                                        placeholder="120"
                                        inputProps={{ min: 0, max: 300 }}
                                    />
                                </Grid2>

                                <Grid2 size={{ xs: 6, sm: 3, md: 1.5 }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label="Diastolic BP"
                                        type="number"
                                        value={
                                            formData.vitalSigns
                                                .bloodPressureDiastolic[
                                                index
                                            ] || ""
                                        }
                                        onChange={(e) =>
                                            handleVitalSignChange(
                                                "bloodPressureDiastolic",
                                                index,
                                                e.target.value
                                            )
                                        }
                                        placeholder="80"
                                        inputProps={{ min: 0, max: 200 }}
                                    />
                                </Grid2>

                                <Grid2 size={{ xs: 8, sm: 4, md: 2 }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label="Temperature"
                                        type="number"
                                        step="0.1"
                                        value={
                                            formData.vitalSigns.temperature[
                                                index
                                            ] || ""
                                        }
                                        onChange={(e) =>
                                            handleVitalSignChange(
                                                "temperature",
                                                index,
                                                e.target.value
                                            )
                                        }
                                        placeholder="37.0"
                                    />
                                </Grid2>

                                <Grid2 size={{ xs: 4, sm: 2, md: 1 }}>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel>Unit</InputLabel>
                                        <Select
                                            value={
                                                formData.vitalSigns
                                                    .temperatureUnit[index] ||
                                                "C"
                                            }
                                            onChange={(e) =>
                                                handleVitalSignChange(
                                                    "temperatureUnit",
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            label="Unit"
                                        >
                                            <MenuItem value="C">°C</MenuItem>
                                            <MenuItem value="F">°F</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid2>

                                <Grid2 size={{ xs: 6, sm: 3, md: 1.5 }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label="Pulse Rate"
                                        type="number"
                                        value={
                                            formData.vitalSigns.pulseRate[
                                                index
                                            ] || ""
                                        }
                                        onChange={(e) =>
                                            handleVitalSignChange(
                                                "pulseRate",
                                                index,
                                                e.target.value
                                            )
                                        }
                                        placeholder="70"
                                        inputProps={{ min: 0, max: 200 }}
                                    />
                                </Grid2>

                                <Grid2 size={{ xs: 6, sm: 3, md: 1.5 }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label="Respiratory Rate"
                                        type="number"
                                        value={
                                            formData.vitalSigns.respiratoryRate[
                                                index
                                            ] || ""
                                        }
                                        onChange={(e) =>
                                            handleVitalSignChange(
                                                "respiratoryRate",
                                                index,
                                                e.target.value
                                            )
                                        }
                                        placeholder="16"
                                        inputProps={{ min: 0, max: 100 }}
                                    />
                                </Grid2>

                                <Grid2 size={{ xs: 6, sm: 3, md: 1 }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label="SPO2 (%)"
                                        type="number"
                                        value={
                                            formData.vitalSigns.spo2[index] ||
                                            ""
                                        }
                                        onChange={(e) =>
                                            handleVitalSignChange(
                                                "spo2",
                                                index,
                                                e.target.value
                                            )
                                        }
                                        placeholder="98"
                                        inputProps={{ min: 0, max: 100 }}
                                    />
                                </Grid2>
                            </Grid2>

                            {index < formData.vitalSigns.times.length - 1 && (
                                <Divider sx={{ mb: 3 }} />
                            )}
                        </Box>
                    ))}
                </Box>

                <Typography my={3} textAlign={"center"}>
                    * * * *
                </Typography>

                {/* Blood Glucose Section */}
                <Box sx={{ mt: 4 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 3,
                            flexWrap: "wrap",
                            gap: 2,
                        }}
                    >
                        <Typography variant="subtitle1" fontWeight="bold">
                            Blood Glucose Entries
                        </Typography>
                        <Button
                            startIcon={<AddIcon />}
                            onClick={() =>
                                addArrayItem("bloodGlucose", {
                                    measurement_time: "",
                                    glucose_level: "",
                                    timing: "",
                                    note: "",
                                })
                            }
                            variant="outlined"
                            size="small"
                        >
                            Add Entry
                        </Button>
                    </Box>

                    {formData.bloodGlucose.map((item, index) => (
                        <Box key={index}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: 2,
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                >
                                    Entry {index + 1}
                                </Typography>
                                <IconButton
                                    onClick={() =>
                                        removeArrayItem("bloodGlucose", index)
                                    }
                                    color="error"
                                    size="small"
                                    disabled={
                                        formData.bloodGlucose.length === 1
                                    }
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>

                            <Grid2 container spacing={2} sx={{ mb: 3 }}>
                                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label="Measurement Time"
                                        type="time"
                                        value={item.measurement_time}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "bloodGlucose",
                                                index,
                                                "measurement_time",
                                                e.target.value
                                            )
                                        }
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid2>

                                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label="Glucose Level (mg/dL)"
                                        type="number"
                                        value={item.glucose_level}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "bloodGlucose",
                                                index,
                                                "glucose_level",
                                                e.target.value
                                            )
                                        }
                                        placeholder="100"
                                        inputProps={{ min: 0, max: 1000 }}
                                    />
                                </Grid2>

                                <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel>Timing</InputLabel>
                                        <Select
                                            value={item.timing}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    "bloodGlucose",
                                                    index,
                                                    "timing",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <MenuItem value="fasting">
                                                Fasting
                                            </MenuItem>
                                            <MenuItem value="random">
                                                Random
                                            </MenuItem>
                                            <MenuItem value="2hpp">
                                                2H Post-Prandial (2HPP)
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid2>

                                <Grid2 size={{ xs: 12, sm: 12, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label="Note"
                                        value={item.note}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "bloodGlucose",
                                                index,
                                                "note",
                                                e.target.value.slice(0, 255)
                                            )
                                        }
                                        multiline
                                        maxRows={5}
                                        placeholder="Any observations or notes..."
                                        inputProps={{ maxLength: 255 }}
                                    />
                                </Grid2>
                            </Grid2>

                            {index < formData.bloodGlucose.length - 1 && (
                                <Divider sx={{ mb: 3 }} />
                            )}
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default HealthMonitoring;
