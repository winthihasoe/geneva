import React, { useEffect, useRef } from "react";
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
import {
    handleNonNegativeNumberChange,
    nonNegativeNumberFieldProps,
} from "@/utils/nonNegativeNumberField";

const HealthBehaviorSection = ({
    formData,
    handleInputChange,
    handleVitalSignChange,
    entryRefs,
    strings,
}) => {
    const h = strings.health;
    const c = strings.common;
    const o = strings.options;
    const prevLength = useRef(formData.vitalSigns.times.length);

    useEffect(() => {
        const lastIndex = formData.vitalSigns.times.length - 1;
        if (formData.vitalSigns.times.length > prevLength.current) {
            const ref = entryRefs?.current?.[`vitalSigns-${lastIndex}`];
            if (ref && ref.scrollIntoView) {
                ref.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
        prevLength.current = formData.vitalSigns.times.length;
    }, [formData.vitalSigns.times.length]);

    const addVitalSignEntry = () => {
        const newIndex = formData.vitalSigns.times.length;
        handleVitalSignChange("times", newIndex, "");
        handleVitalSignChange("temperature", newIndex, "");
        handleVitalSignChange("temperatureUnit", newIndex, "C");
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
                    {h.sectionTitle}
                </Typography>

                <Grid2 container spacing={3} mb={4}>
                    <Grid2 size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label={h.mood}
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
                            label={h.symptoms}
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
                            label={h.medications}
                            value={formData.medications}
                            onChange={(e) =>
                                handleInputChange("medications", e.target.value)
                            }
                            multiline
                            rows={2}
                        />
                    </Grid2>
                </Grid2>

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
                            {h.vitalSignsHeading}
                        </Typography>
                        <Button
                            startIcon={<AddIcon />}
                            onClick={addVitalSignEntry}
                            variant="outlined"
                            size="small"
                        >
                            {c.addEntry}
                        </Button>
                    </Box>

                    {formData.vitalSigns.times.map((_, index) => (
                        <Box
                            key={index}
                            ref={(el) => {
                                if (entryRefs) {
                                    entryRefs.current[`vitalSigns-${index}`] =
                                        el;
                                }
                            }}
                        >
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
                                    {c.entry(index + 1)}
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
                                        label={c.time}
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
                                        label={h.temperature}
                                        {...nonNegativeNumberFieldProps({
                                            step: "0.1",
                                        })}
                                        value={
                                            formData.vitalSigns.temperature[
                                                index
                                            ] || ""
                                        }
                                        onChange={handleNonNegativeNumberChange(
                                            (value) =>
                                                handleVitalSignChange(
                                                    "temperature",
                                                    index,
                                                    value
                                                )
                                        )}
                                        placeholder={h.tempPlaceholder}
                                    />
                                </Grid2>

                                <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel>{c.unit}</InputLabel>
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
                                            label={c.unit}
                                        >
                                            <MenuItem value="C">
                                                {o.tempUnit.C}
                                            </MenuItem>
                                            <MenuItem value="F">
                                                {o.tempUnit.F}
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid2>

                                <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label={h.pulseRate}
                                        {...nonNegativeNumberFieldProps()}
                                        value={
                                            formData.vitalSigns.pulseRate[
                                                index
                                            ] || ""
                                        }
                                        onChange={handleNonNegativeNumberChange(
                                            (value) =>
                                                handleVitalSignChange(
                                                    "pulseRate",
                                                    index,
                                                    value
                                                )
                                        )}
                                        placeholder={h.pulsePlaceholder}
                                    />
                                </Grid2>

                                <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label={h.respiratoryRate}
                                        {...nonNegativeNumberFieldProps()}
                                        value={
                                            formData.vitalSigns.respiratoryRate[
                                                index
                                            ] || ""
                                        }
                                        onChange={handleNonNegativeNumberChange(
                                            (value) =>
                                                handleVitalSignChange(
                                                    "respiratoryRate",
                                                    index,
                                                    value
                                                )
                                        )}
                                        placeholder={h.respPlaceholder}
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
