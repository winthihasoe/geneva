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
    formData,
    handleInputChange,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
}) {
    const handleRecordChange = (field, value) => {
        handleInputChange(`urinaryBowelRecord.${field}`, value);
    };

    const urinaryBowelRecord = formData.urinaryBowelRecord || {
        recordTime: "",
        urineFrequency: "",
        bloodInUrine: false,
        painDiscomfortUrination: false,
        discharge: false,
        bowelMovementFrequency: "",
        bloodInStool: false,
        painDiscomfortAbdomen: false,
        otherSymptoms: "",
    };

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
                    6. Urinary & Bowel Health Record
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {/* Record Time */}
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
                        value={urinaryBowelRecord.recordTime || ""}
                        onChange={(e) =>
                            handleRecordChange("recordTime", e.target.value)
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
                        <UrinaryIcon sx={{ color: "#2196f3", fontSize: 24 }} />
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
                            <FluidIcon
                                sx={{ color: "#2196f3", fontSize: 20 }}
                            />
                            <FormLabel
                                sx={{
                                    fontWeight: "bold",
                                    color: "text.primary",
                                    "&.Mui-focused": { color: "text.primary" },
                                }}
                            >
                                Urination Frequency
                            </FormLabel>
                        </Box>
                        <Select
                            value={urinaryBowelRecord.urineFrequency || ""}
                            onChange={(e) =>
                                handleRecordChange(
                                    "urineFrequency",
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
                                    checked={
                                        urinaryBowelRecord.bloodInUrine || false
                                    }
                                    onChange={(e) =>
                                        handleRecordChange(
                                            "bloodInUrine",
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
                                        urinaryBowelRecord.painDiscomfortUrination ||
                                        false
                                    }
                                    onChange={(e) =>
                                        handleRecordChange(
                                            "painDiscomfortUrination",
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
                                    checked={
                                        urinaryBowelRecord.discharge || false
                                    }
                                    onChange={(e) =>
                                        handleRecordChange(
                                            "discharge",
                                            e.target.checked
                                        )
                                    }
                                    size="small"
                                />
                            }
                            label="Unusual discharge"
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
                        <BowelIcon sx={{ color: "#ff9800", fontSize: 24 }} />
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
                            <BowelIcon
                                sx={{ color: "#ff9800", fontSize: 20 }}
                            />
                            <FormLabel
                                sx={{
                                    fontWeight: "bold",
                                    color: "text.primary",
                                    "&.Mui-focused": { color: "text.primary" },
                                }}
                            >
                                Bowel Movement Frequency
                            </FormLabel>
                        </Box>
                        <Select
                            value={
                                urinaryBowelRecord.bowelMovementFrequency || ""
                            }
                            onChange={(e) =>
                                handleRecordChange(
                                    "bowelMovementFrequency",
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
                                    checked={
                                        urinaryBowelRecord.bloodInStool || false
                                    }
                                    onChange={(e) =>
                                        handleRecordChange(
                                            "bloodInStool",
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
                                        urinaryBowelRecord.painDiscomfortAbdomen ||
                                        false
                                    }
                                    onChange={(e) =>
                                        handleRecordChange(
                                            "painDiscomfortAbdomen",
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
                        <NotesIcon sx={{ color: "#673ab7", fontSize: 20 }} />
                        <Typography variant="subtitle2" fontWeight="bold">
                            Other Symptoms & Notes
                        </Typography>
                    </Box>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        placeholder="Describe any other urinary or bowel symptoms, patterns, or concerns..."
                        value={urinaryBowelRecord.otherSymptoms || ""}
                        onChange={(e) =>
                            handleRecordChange("otherSymptoms", e.target.value)
                        }
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "white",
                            },
                        }}
                    />
                </Grid>
            </Grid>

            {/* Warning Alerts for Concerning Symptoms */}
            {(urinaryBowelRecord.bloodInUrine ||
                urinaryBowelRecord.bloodInStool ||
                urinaryBowelRecord.painDiscomfortUrination ||
                urinaryBowelRecord.painDiscomfortAbdomen) && (
                <Alert severity="warning" sx={{ mt: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <WarningIcon />
                        <Typography variant="subtitle2" fontWeight="bold">
                            Important Symptoms Noted
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        The following concerning symptoms have been recorded:
                    </Typography>
                    <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
                        {urinaryBowelRecord.bloodInUrine && (
                            <li>Blood in urine</li>
                        )}
                        {urinaryBowelRecord.bloodInStool && (
                            <li>Blood in stool</li>
                        )}
                        {urinaryBowelRecord.painDiscomfortUrination && (
                            <li>Pain during urination</li>
                        )}
                        {urinaryBowelRecord.painDiscomfortAbdomen && (
                            <li>Abdominal pain/discomfort</li>
                        )}
                    </ul>
                    <Typography
                        variant="body2"
                        color="warning.main"
                        fontWeight="bold"
                    >
                        Please consult with healthcare provider as soon as
                        possible.
                    </Typography>
                </Alert>
            )}

            {/* Summary Box */}
            {(urinaryBowelRecord.recordTime ||
                urinaryBowelRecord.urineFrequency ||
                urinaryBowelRecord.bowelMovementFrequency) && (
                <Box
                    sx={{
                        mt: 3,
                        p: 2,
                        backgroundColor: "rgba(0, 150, 136, 0.05)",
                        borderRadius: 1,
                        border: "1px solid rgba(0, 150, 136, 0.2)",
                    }}
                >
                    <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        color="primary"
                        mb={1}
                    >
                        Health Record Summary:
                    </Typography>
                    <Grid container spacing={2}>
                        {urinaryBowelRecord.recordTime && (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Typography variant="body2">
                                    <strong>Time:</strong>{" "}
                                    {urinaryBowelRecord.recordTime}
                                </Typography>
                            </Grid>
                        )}
                        {urinaryBowelRecord.urineFrequency && (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Typography variant="body2">
                                    <strong>Urination:</strong>{" "}
                                    {urinaryBowelRecord.urineFrequency}
                                </Typography>
                            </Grid>
                        )}
                        {urinaryBowelRecord.bowelMovementFrequency && (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Typography variant="body2">
                                    <strong>Bowel Movement:</strong>{" "}
                                    {urinaryBowelRecord.bowelMovementFrequency}
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            )}
        </Paper>
    );
}

export default UrinaryBowelRecord;
