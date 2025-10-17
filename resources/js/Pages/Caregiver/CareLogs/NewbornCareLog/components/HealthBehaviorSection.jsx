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

const HealthBehaviorSection = ({
    formData,
    handleInputChange,
    handleVitalSignChange,
}) => {
    // Handle vital signs as array entries - UPDATED without blood pressure
    const addVitalSignEntry = () => {
        const newIndex = formData.vitalSigns.times.length;
        handleVitalSignChange("times", newIndex, "");
        handleVitalSignChange("temperature", newIndex, "");
        handleVitalSignChange("temperatureUnit", newIndex, "C"); // Default to Celsius
        handleVitalSignChange("pulseRate", newIndex, "");
        handleVitalSignChange("respiratoryRate", newIndex, "");
    };

    const removeVitalSignEntry = (index) => {
        if (formData.vitalSigns.times.length > 1) {
            const newTimes = formData.vitalSigns.times.filter(
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

            // Update all vital sign arrays
            const updatedVitalSigns = {
                times: newTimes,
                temperature: newTemperature,
                temperatureUnit: newTemperatureUnit,
                pulseRate: newPulseRate,
                respiratoryRate: newRespiratoryRate,
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
                    6. Health and Behavior
                </Typography>

                <Grid2 container spacing={3} mb={4}>
                    <Grid2 size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label="Mood/Behavior Observed (e.g., Happy, Fussy, Sleepy)"
                            value={formData.mood}
                            onChange={(e) =>
                                handleInputChange("mood", e.target.value)
                            }
                            multiline
                            rows={2}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label="Any Symptoms? (e.g., Cough, Rash, Vomiting)"
                            value={formData.symptoms}
                            onChange={(e) =>
                                handleInputChange("symptoms", e.target.value)
                            }
                            multiline
                            rows={2}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label="Medications Given (if any)"
                            value={formData.medications}
                            onChange={(e) =>
                                handleInputChange("medications", e.target.value)
                            }
                            multiline
                            rows={2}
                        />
                    </Grid2>
                </Grid2>

                {/* Vital Signs Section - UPDATED without blood pressure */}
                <Box sx={{ mb: 3 }}>
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
                            Vital Signs (Temperature/Pulse Rate/Respiratory
                            Rate)
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
                                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
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

                                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label="Temperature"
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

                                <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
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

                                <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label="Pulse Rate (per minute)"
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
                                        placeholder="120"
                                    />
                                </Grid2>

                                <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label="Respiratory Rate (per minute)"
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
                                        placeholder="40"
                                    />
                                </Grid2>
                            </Grid2>

                            {index < formData.vitalSigns.times.length - 1 && (
                                <Divider sx={{ mb: 3 }} />
                            )}
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default HealthBehaviorSection;
