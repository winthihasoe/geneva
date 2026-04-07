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
    MenuItem,
    FormControl,
    InputLabel,
    Select,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

const SLEEP_TYPES = ["Morning Nap", "Afternoon Nap", "Night Sleep"];
const QUALITY_KEYS = ["Good", "Fair", "Poor"];
const SLEEP_ISSUE_KEYS = [
    "None",
    "Restlessness",
    "Frequent Waking",
    "Difficulty Falling Asleep",
];

const SleepSection = ({
    strings,
    data,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
    formData,
    handleInputChange,
    entryRefs,
}) => {
    const c = strings.common;
    const s = strings.sleep;
    const opt = strings.options;

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
                        {s.sectionTitle}
                    </Typography>
                    <Button
                        startIcon={<AddIcon />}
                        onClick={() =>
                            addArrayItem("sleep", {
                                type: "",
                                sleep_start_time: "",
                                duration: "",
                                sleep_quality: "",
                                notes: "",
                                issue: "",
                            })
                        }
                        variant="outlined"
                        size="small"
                    >
                        {c.addEntry}
                    </Button>
                </Box>

                {data.map((item, index) => (
                    <Box
                        key={index}
                        ref={(el) => {
                            if (entryRefs) {
                                entryRefs.current[`sleep-${index}`] = el;
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
                                onClick={() => removeArrayItem("sleep", index)}
                                color="error"
                                size="small"
                                disabled={data.length === 1}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>

                        <Grid2 container spacing={2} sx={{ mb: 3 }}>
                            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                <FormControl fullWidth variant="standard">
                                    <InputLabel>{c.type}</InputLabel>
                                    <Select
                                        value={item.type || ""}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "sleep",
                                                index,
                                                "type",
                                                e.target.value
                                            )
                                        }
                                        label={c.type}
                                    >
                                        {SLEEP_TYPES.map((key) => (
                                            <MenuItem key={key} value={key}>
                                                {opt.sleepType[key]}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label={c.time}
                                    type="time"
                                    value={item.sleep_start_time}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "sleep",
                                            index,
                                            "sleep_start_time",
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
                                    label={c.duration}
                                    value={item.duration}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "sleep",
                                            index,
                                            "duration",
                                            e.target.value
                                        )
                                    }
                                    placeholder={s.durationPlaceholder}
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                <FormControl fullWidth variant="standard">
                                    <InputLabel>{c.quality}</InputLabel>
                                    <Select
                                        value={item.sleep_quality}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "sleep",
                                                index,
                                                "sleep_quality",
                                                e.target.value
                                            )
                                        }
                                        label={c.quality}
                                    >
                                        {QUALITY_KEYS.map((key) => (
                                            <MenuItem key={key} value={key}>
                                                {opt.sleepQuality[key]}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid2>

                            <Grid2 size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label={c.notes}
                                    value={item.notes}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "sleep",
                                            index,
                                            "notes",
                                            e.target.value
                                        )
                                    }
                                    multiline
                                    maxRows={3}
                                    placeholder={s.notesPlaceholder}
                                />
                            </Grid2>
                        </Grid2>

                        {index < data.length - 1 && <Divider sx={{ mb: 3 }} />}
                    </Box>
                ))}

                <Divider sx={{ my: 3 }} />

                <Box sx={{ mt: 3 }}>
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        color="text.primary"
                        sx={{ mb: 2 }}
                    >
                        {s.sleepIssuesHeading}
                    </Typography>

                    <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                            <FormControl fullWidth variant="standard">
                                <InputLabel>{s.sleepIssues}</InputLabel>
                                <Select
                                    value={formData.sleepIssues || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "sleepIssues",
                                            e.target.value
                                        )
                                    }
                                    label={s.sleepIssues}
                                >
                                    {SLEEP_ISSUE_KEYS.map((key) => (
                                        <MenuItem key={key} value={key}>
                                            {opt.sleepIssues[key]}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid2>
                    </Grid2>
                </Box>
            </CardContent>
        </Card>
    );
};

export default SleepSection;
