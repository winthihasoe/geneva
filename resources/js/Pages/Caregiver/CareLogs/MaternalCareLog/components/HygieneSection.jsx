import React from "react";
import {
    Typography,
    TextField,
    Button,
    IconButton,
    Card,
    CardContent,
    Box,
    Grid2,
    Divider,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

const HygieneSection = ({
    data,
    moisturizer_applied,
    pressure_areas_checked,
    skin_care_findings,
    handleArrayChange,
    handleInputChange,
    addArrayItem,
    removeArrayItem,
    entryRefs,
}) => {
    return (
        <Card sx={{ borderRadius: 2, bgcolor: "transparent" }}>
            <CardContent>
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
                    <Typography variant="h6" fontWeight="bold" color="primary">
                        1. Hygiene & Grooming
                    </Typography>
                    <Button
                        startIcon={<AddIcon />}
                        onClick={() =>
                            addArrayItem("hygiene", {
                                time: "",
                                activity: "",
                                notes: "",
                            })
                        }
                        variant="outlined"
                        size="small"
                    >
                        Add Entry
                    </Button>
                </Box>

                {data.map((item, index) => (
                    <Box
                        key={index}
                        ref={(el) => {
                            if (entryRefs) {
                                entryRefs.current[`hygiene-${index}`] = el;
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
                                Entry {index + 1}
                            </Typography>
                            <IconButton
                                onClick={() =>
                                    removeArrayItem("hygiene", index)
                                }
                                color="error"
                                size="small"
                                disabled={data.length === 1}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>

                        <Grid2 container spacing={2} sx={{ mb: 3 }}>
                            <Grid2 item size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Time"
                                    type="time"
                                    value={item.time}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "hygiene",
                                            index,
                                            "time",
                                            e.target.value
                                        )
                                    }
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid2>

                            <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Activity"
                                    value={item.activity}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "hygiene",
                                            index,
                                            "activity",
                                            e.target.value
                                        )
                                    }
                                    placeholder="e.g., Bath, Nail Trim, Hair Care, Wash Face, Oral Care, Dressing"
                                />
                            </Grid2>

                            <Grid2 item size={{ xs: 12, sm: 12, md: 5 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Notes"
                                    value={item.notes}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "hygiene",
                                            index,
                                            "notes",
                                            e.target.value
                                        )
                                    }
                                    multiline
                                    maxRows={5}
                                    placeholder="Any observations, client cooperation, assistance needed..."
                                />
                            </Grid2>
                        </Grid2>

                        {index < data.length - 1 && <Divider sx={{ mb: 3 }} />}
                    </Box>
                ))}

                <Typography
                    variant="subtitle"
                    color="primary"
                    mt={2}
                    fontWeight={600}
                >
                    Special Skin Care
                </Typography>
                {/* Moisturizer applied Yes or No Radio button*/}

                <Grid2 container spacing={2} sx={{ mb: 3, mt: 1 }}>
                    <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
                        <FormControl component="fieldset" sx={{ mt: 2 }}>
                            <FormLabel component="legend">
                                Moisturizer Applied
                            </FormLabel>
                            <RadioGroup
                                row
                                value={String(moisturizer_applied)} // convert boolean → string
                                onChange={(e) =>
                                    handleInputChange(
                                        "moisturizer_applied",
                                        e.target.value === "true" // convert string → boolean
                                    )
                                }
                            >
                                <FormControlLabel
                                    value="true"
                                    control={<Radio size="small" />}
                                    label="Yes"
                                />
                                <FormControlLabel
                                    value="false"
                                    control={<Radio size="small" />}
                                    label="No"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid2>
                    <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
                        <FormControl component="fieldset" sx={{ mt: 2 }}>
                            <FormLabel component="legend">
                                Pressure Areas Checked
                            </FormLabel>
                            <RadioGroup
                                row
                                value={String(pressure_areas_checked)} // convert boolean → string
                                onChange={(e) =>
                                    handleInputChange(
                                        "pressure_areas_checked",
                                        e.target.value === "true" // convert string → boolean
                                    )
                                }
                            >
                                <FormControlLabel
                                    value="true"
                                    control={<Radio size="small" />}
                                    label="Yes"
                                />
                                <FormControlLabel
                                    value="false"
                                    control={<Radio size="small" />}
                                    label="No"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid2>
                    <Grid2 item size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label="Skin Care Findings"
                            value={skin_care_findings}
                            onChange={(e) =>
                                handleInputChange(
                                    "skin_care_findings",
                                    e.target.value
                                )
                            }
                            multiline
                            maxRows={5}
                            placeholder="Any skin issues, redness, irritation, dryness, wounds, rashes..."
                        />
                    </Grid2>
                </Grid2>
            </CardContent>
        </Card>
    );
};

export default HygieneSection;
