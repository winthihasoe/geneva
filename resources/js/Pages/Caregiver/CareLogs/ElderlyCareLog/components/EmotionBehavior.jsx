import React from "react";
import {
    Typography,
    TextField,
    Card,
    CardContent,
    Grid2,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
} from "@mui/material";

const MOOD_KEYS = ["Happy", "Calm", "Anxious", "Irritable", "Other"];
const BEHAVIOR_KEYS = ["None", "Restlessness", "Withdrawal", "Other"];

const EmotionBehavior = ({ strings, formData, handleInputChange }) => {
    const e = strings.emotion;
    const opt = strings.options;

    return (
        <Card sx={{ borderRadius: 2, bgcolor: "transparent" }}>
            <CardContent>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="primary"
                    sx={{ mb: 3 }}
                >
                    {e.sectionTitle}
                </Typography>

                <Grid2 container spacing={3}>
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                        <FormControl fullWidth variant="standard">
                            <InputLabel>{e.generalMood}</InputLabel>
                            <Select
                                value={formData.emotionalMood || ""}
                                onChange={(e) =>
                                    handleInputChange(
                                        "emotionalMood",
                                        e.target.value
                                    )
                                }
                                label={e.generalMood}
                            >
                                {MOOD_KEYS.map((key) => (
                                    <MenuItem key={key} value={key}>
                                        {opt.mood[key]}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid2>

                    {formData.emotionalMood === "Other" && (
                        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                            <TextField
                                fullWidth
                                variant="standard"
                                label={e.otherMood}
                                value={formData.emotionalMoodOther || ""}
                                onChange={(e) =>
                                    handleInputChange(
                                        "emotionalMoodOther",
                                        e.target.value
                                    )
                                }
                                placeholder={e.otherMoodPlaceholder}
                            />
                        </Grid2>
                    )}

                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                        <FormControl fullWidth variant="standard">
                            <InputLabel>{e.behavioralConcerns}</InputLabel>
                            <Select
                                value={formData.behavioralConcerns || ""}
                                onChange={(e) =>
                                    handleInputChange(
                                        "behavioralConcerns",
                                        e.target.value
                                    )
                                }
                                label={e.behavioralConcerns}
                            >
                                {BEHAVIOR_KEYS.map((key) => (
                                    <MenuItem key={key} value={key}>
                                        {opt.behavior[key]}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid2>

                    {formData.behavioralConcerns === "Other" && (
                        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                            <TextField
                                fullWidth
                                variant="standard"
                                label={e.otherBehavioral}
                                value={formData.behavioralConcernsOther || ""}
                                onChange={(e) =>
                                    handleInputChange(
                                        "behavioralConcernsOther",
                                        e.target.value
                                    )
                                }
                                placeholder={e.otherBehavioralPlaceholder}
                            />
                        </Grid2>
                    )}

                    <Grid2 size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label={e.actionTaken}
                            value={formData.emotionalActionTaken || ""}
                            onChange={(e) =>
                                handleInputChange(
                                    "emotionalActionTaken",
                                    e.target.value
                                )
                            }
                            multiline
                            maxRows={4}
                            placeholder={e.actionPlaceholder}
                        />
                    </Grid2>
                </Grid2>
            </CardContent>
        </Card>
    );
};

export default EmotionBehavior;
