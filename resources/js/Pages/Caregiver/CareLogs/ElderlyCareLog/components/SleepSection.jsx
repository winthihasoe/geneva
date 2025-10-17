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

const SleepSection = ({
    data,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
    formData,
    handleInputChange,
}) => {
    const qualityOptions = ["Good", "Fair", "Poor"];
    const sleepIssuesOptions = [
        "None",
        "Restlessness",
        "Frequent Walking",
        "Difficulty Falling Asleep",
    ];

    const sleepTypes = ["Morning Nap", "Afternoon Nap", "Night Sleep"];

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
                        7. Sleep & Rest Tracking
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
                        Add Entry
                    </Button>
                </Box>

                {data.map((item, index) => (
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
                                    <InputLabel>Type</InputLabel>
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
                                        label="Type"
                                    >
                                        {sleepTypes.map((option) => (
                                            <MenuItem
                                                key={option}
                                                value={option}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Time"
                                    type="time"
                                    value={item.sleep_start_time}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "sleep",
                                            index,
                                            "time",
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
                                    label="Duration"
                                    value={item.duration}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "sleep",
                                            index,
                                            "duration",
                                            e.target.value
                                        )
                                    }
                                    placeholder="e.g., 2 hours"
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                <FormControl fullWidth variant="standard">
                                    <InputLabel>Quality</InputLabel>
                                    <Select
                                        value={item.sleep_quality}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "sleep",
                                                index,
                                                "quality",
                                                e.target.value
                                            )
                                        }
                                        label="Quality"
                                    >
                                        {qualityOptions.map((option) => (
                                            <MenuItem
                                                key={option}
                                                value={option}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid2>

                            <Grid2 size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Notes"
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
                                    placeholder="e.g., Disturbances"
                                />
                            </Grid2>
                        </Grid2>

                        {index < data.length - 1 && <Divider sx={{ mb: 3 }} />}
                    </Box>
                ))}

                {/* Sleep Issues Section */}
                <Divider sx={{ my: 3 }} />

                <Box sx={{ mt: 3 }}>
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        color="text.primary"
                        sx={{ mb: 2 }}
                    >
                        Signs of Sleep Issues Observed
                    </Typography>

                    <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                            <FormControl fullWidth variant="standard">
                                <InputLabel>Sleep Issues</InputLabel>
                                <Select
                                    value={formData.sleepIssues || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "sleepIssues",
                                            e.target.value
                                        )
                                    }
                                    label="Sleep Issues"
                                >
                                    {sleepIssuesOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
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
