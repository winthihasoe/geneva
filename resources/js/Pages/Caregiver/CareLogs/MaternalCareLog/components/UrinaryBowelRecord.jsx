import React from "react";
import {
    Box,
    Typography,
    Grid2 as Grid,
    FormControl,
    FormLabel,
    TextField,
    Paper,
    Alert,
    InputAdornment,
    Checkbox,
    FormControlLabel as CheckboxLabel,
    Select,
    MenuItem,
    Divider,
} from "@mui/material";
import {
    WaterDrop as UrinaryIcon,
    FiberManualRecord as BowelIcon,
    AccessTime as TimeIcon,
    Warning as WarningIcon,
    Notes as NotesIcon,
    Opacity as FluidIcon,
    LocalHospital as HealthIcon,
} from "@mui/icons-material";

function UrinaryBowelRecord({
    strings,
    data,
    handleInputChange,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
}) {
    const urineFrequencyOptions = [
        { value: "Normal", label: "Normal (6-8 times/day)" },
        { value: "Increased", label: "Increased (More than 8 times/day)" },
        { value: "Decreased", label: "Decreased (Less than 6 times/day)" },
    ];

    const bowelFrequencyOptions = [
        { value: "Daily", label: "Daily" },
        { value: "Every 2 days", label: "Every 2 days" },
        { value: "Every 3 days", label: "Every 3 days" },
        { value: "Weekly", label: "Weekly" },
        { value: "Less than weekly", label: "Less than weekly" },
    ];

    return (
        <Paper
            elevation={2}
            sx={{
                p: 3,
                borderRadius: 2,
                background: "linear-gradient(135deg, #e0f2f1 0%, #f7ffff 100%)",
                border: "1px solid rgba(0, 150, 136, 0.1)",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                <Typography variant="h6" fontWeight="bold" color="primary">
                    {strings.urinaryBowel.sectionTitle}
                </Typography>
            </Box>

            {/* Record Time */}
            {data.map((item, index) => (
                <Grid container spacing={3} key={index}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 1,
                            }}
                        >
                            <TimeIcon sx={{ color: "#607d8b", fontSize: 20 }} />
                            <Typography variant="subtitle2" fontWeight="bold">
                                Record Time
                            </Typography>
                        </Box>
                        <TextField
                            fullWidth
                            type="time"
                            value={item.record_time || ""}
                            onChange={(e) =>
                                handleArrayChange(
                                    "output",
                                    index,
                                    "record_time",
                                    e.target.value
                                )
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <TimeIcon
                                            sx={{ color: "#666", fontSize: 18 }}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor: "white",
                                },
                            }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Divider sx={{ my: 2 }} />
                    </Grid>

                    {/* URINARY HEALTH SECTION */}
                    <Grid size={{ xs: 12 }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 3,
                            }}
                        >
                            <UrinaryIcon
                                sx={{ color: "#2196f3", fontSize: 24 }}
                            />
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                color="#2196f3"
                            >
                                Urinary Health
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Urine Frequency */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl fullWidth>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 1,
                                }}
                            >
                                <FormLabel
                                    sx={{
                                        fontWeight: "bold",
                                        color: "text.primary",
                                        "&.Mui-focused": {
                                            color: "text.primary",
                                        },
                                    }}
                                >
                                    Urination Frequency
                                </FormLabel>
                            </Box>
                            <Select
                                value={item.urine_frequency || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "output",
                                        index,
                                        "urine_frequency",
                                        e.target.value
                                    )
                                }
                                displayEmpty
                                sx={{
                                    backgroundColor: "white",
                                }}
                            >
                                <MenuItem value="">
                                    <em>Select frequency</em>
                                </MenuItem>
                                {urineFrequencyOptions.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Urinary Symptoms */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography
                            variant="subtitle2"
                            fontWeight="bold"
                            sx={{ mb: 2 }}
                        >
                            Urinary Symptoms (Check if present)
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                            }}
                        >
                            <CheckboxLabel
                                control={
                                    <Checkbox
                                        checked={item.blood_in_urine || false}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "output",
                                                index,
                                                "blood_in_urine",
                                                e.target.checked
                                            )
                                        }
                                        size="small"
                                    />
                                }
                                label="Blood in urine"
                            />
                            <CheckboxLabel
                                control={
                                    <Checkbox
                                        checked={
                                            item.pain_discomfort_urination ||
                                            null
                                        }
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "output",
                                                index,
                                                "pain_discomfort_urination",
                                                e.target.checked
                                            )
                                        }
                                        size="small"
                                    />
                                }
                                label="Pain/discomfort during urination"
                            />
                            <CheckboxLabel
                                control={
                                    <Checkbox
                                        checked={item.discharge || null}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "output",
                                                index,
                                                "discharge",
                                                e.target.checked
                                            )
                                        }
                                        size="small"
                                    />
                                }
                                label="Discharge"
                            />
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Divider sx={{ my: 2 }} />
                    </Grid>

                    {/* BOWEL HEALTH SECTION */}
                    <Grid size={{ xs: 12 }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 3,
                            }}
                        >
                            <BowelIcon
                                sx={{ color: "#ff9800", fontSize: 24 }}
                            />
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                color="#ff9800"
                            >
                                Bowel Health
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Bowel Movement Frequency */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl fullWidth>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 1,
                                }}
                            >
                                <FormLabel
                                    sx={{
                                        fontWeight: "bold",
                                        color: "text.primary",
                                        "&.Mui-focused": {
                                            color: "text.primary",
                                        },
                                    }}
                                >
                                    Bowel Movement Frequency
                                </FormLabel>
                            </Box>
                            <Select
                                value={item.bowel_movement_frequency || ""}
                                onChange={(e) =>
                                    handleArrayChange(
                                        "output",
                                        index,
                                        "bowel_movement_frequency",
                                        e.target.value
                                    )
                                }
                                displayEmpty
                                sx={{
                                    backgroundColor: "white",
                                }}
                            >
                                <MenuItem value="">
                                    <em>Select frequency</em>
                                </MenuItem>
                                {bowelFrequencyOptions.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Bowel Symptoms */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography
                            variant="subtitle2"
                            fontWeight="bold"
                            sx={{ mb: 2 }}
                        >
                            Bowel Symptoms (Check if present)
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                            }}
                        >
                            <CheckboxLabel
                                control={
                                    <Checkbox
                                        checked={item.blood_in_stool || false}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "output",
                                                index,
                                                "blood_in_stool",
                                                e.target.checked
                                            )
                                        }
                                        size="small"
                                    />
                                }
                                label="Blood in stool"
                            />
                            <CheckboxLabel
                                control={
                                    <Checkbox
                                        checked={
                                            item.pain_discomfort_abdomen ||
                                            false
                                        }
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "output",
                                                index,
                                                "pain_discomfort_abdomen",
                                                e.target.checked
                                            )
                                        }
                                        size="small"
                                    />
                                }
                                label="Pain/discomfort in abdomen"
                            />
                        </Box>
                    </Grid>

                    {/* Other Symptoms */}
                    <Grid size={{ xs: 12 }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 1,
                            }}
                        >
                            <NotesIcon
                                sx={{ color: "#673ab7", fontSize: 20 }}
                            />
                            <Typography variant="subtitle2" fontWeight="bold">
                                Other Symptoms & Notes
                            </Typography>
                        </Box>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="Describe any other urinary or bowel symptoms, patterns, or concerns..."
                            value={item.other_symptoms || ""}
                            onChange={(e) =>
                                handleArrayChange(
                                    "output",
                                    index,
                                    "other_symptoms",
                                    e.target.value
                                )
                            }
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor: "white",
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            ))}
        </Paper>
    );
}

export default UrinaryBowelRecord;
