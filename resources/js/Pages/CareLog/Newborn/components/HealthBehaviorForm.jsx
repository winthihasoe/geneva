import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";

const HealthBehaviorForm = () => {
    const [formState, setFormState] = useState({
        mood_behavior: "",
        symptoms: "",
        medications: "",
    });

    const handleInputChange = (field, value) => {
        setFormState({ ...formState, [field]: value });
    };

    return (
        <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Health & Behavior
            </Typography>
            <TextField
                label="Mood/Behavior"
                value={formState.mood_behavior}
                onChange={(e) =>
                    handleInputChange("mood_behavior", e.target.value)
                }
                fullWidth
                size="small"
                placeholder="e.g., Happy, Fussy, Sleepy"
                multiline
                rows={2}
                sx={{ marginBottom: 2 }}
            />
            <TextField
                label="Symptoms"
                value={formState.symptoms}
                onChange={(e) => handleInputChange("symptoms", e.target.value)}
                fullWidth
                size="small"
                placeholder="e.g., Cough, Rash"
                multiline
                rows={2}
                sx={{ marginBottom: 2 }}
            />
            <TextField
                label="Medications Given"
                value={formState.medications}
                onChange={(e) =>
                    handleInputChange("medications", e.target.value)
                }
                fullWidth
                size="small"
                placeholder="e.g., Paracetamol"
                multiline
                rows={2}
            />
        </Box>
    );
};

export default HealthBehaviorForm;
