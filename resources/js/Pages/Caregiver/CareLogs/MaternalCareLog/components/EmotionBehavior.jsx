import React from "react";
import {
    Typography,
    TextField,
    Card,
    CardContent,
    Box,
    Grid2,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
} from "@mui/material";

const EmotionBehavior = ({ formData, handleInputChange }) => {
    const moodOptions = ["Happy", "Calm", "Anxious", "Irritable", "Other"];
    const behaviorOptions = ["None", "Restlessness", "Withdrawal", "Other"];

    return (
        <Card sx={{ borderRadius: 2, bgcolor: "transparent" }}>
            <CardContent>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="primary"
                    sx={{ mb: 3 }}
                >
                    9. Emotional & Behavioral Observation
                </Typography>

                <Grid2 container spacing={3}>
                    {/* General Mood */}
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                        <FormControl fullWidth variant="standard">
                            <InputLabel>General Mood</InputLabel>
                            <Select
                                value={formData.emotionalMood || ""}
                                onChange={(e) =>
                                    handleInputChange(
                                        "emotionalMood",
                                        e.target.value
                                    )
                                }
                                label="General Mood"
                            >
                                {moodOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid2>

                    {/* Other Mood (conditional) */}
                    {formData.emotionalMood === "Other" && (
                        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                            <TextField
                                fullWidth
                                variant="standard"
                                label="Other Mood"
                                value={formData.emotionalMoodOther || ""}
                                onChange={(e) =>
                                    handleInputChange(
                                        "emotionalMoodOther",
                                        e.target.value
                                    )
                                }
                                placeholder="Specify other mood"
                            />
                        </Grid2>
                    )}

                    {/* Behavioral Concerns */}
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                        <FormControl fullWidth variant="standard">
                            <InputLabel>Behavioral Concerns</InputLabel>
                            <Select
                                value={formData.behavioralConcerns || ""}
                                onChange={(e) =>
                                    handleInputChange(
                                        "behavioralConcerns",
                                        e.target.value
                                    )
                                }
                                label="Behavioral Concerns"
                            >
                                {behaviorOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid2>

                    {/* Other Behavioral Concerns (conditional) */}
                    {formData.behavioralConcerns === "Other" && (
                        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                            <TextField
                                fullWidth
                                variant="standard"
                                label="Other Behavioral Concerns"
                                value={formData.behavioralConcernsOther || ""}
                                onChange={(e) =>
                                    handleInputChange(
                                        "behavioralConcernsOther",
                                        e.target.value
                                    )
                                }
                                placeholder="Specify other behavioral concerns"
                            />
                        </Grid2>
                    )}

                    {/* Action Taken */}
                    <Grid2 size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label="Action Taken"
                            value={formData.emotionalActionTaken || ""}
                            onChange={(e) =>
                                handleInputChange(
                                    "emotionalActionTaken",
                                    e.target.value
                                )
                            }
                            multiline
                            maxRows={4}
                            placeholder="Describe any actions taken to address mood or behavioral concerns"
                        />
                    </Grid2>
                </Grid2>
            </CardContent>
        </Card>
    );
};

export default EmotionBehavior;
