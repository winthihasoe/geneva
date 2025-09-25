import { CarePlanContext } from "@/Context/CarePlanContext";
import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Typography,
} from "@mui/material";
import React, { useState, useContext } from "react";

// Experience years options
const ExperienceYears = [
    "Less than 1 year",
    "1-3 years",
    "More than 3 years",
    "More than 10 years",
];

const Qualifications = ["Diploma", "Degree", "Certificate"];

const Personalities = [
    "Gentle & Patient",
    "Active & Energetic",
    "Calm & Quiet",
    "Doesn’t matter",
];

// Custom styling for white checkboxes
const whiteControlSx = {
    color: "white",
    "&.Mui-checked": {
        color: "white",
    },
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
};

function StepSixEC() {
    const { carePlanData, updateNestedField } = useContext(CarePlanContext);

    // Handle qualification preference change (multiple selection)
    const handleQualificationChange = (qualification) => (event) => {
        const currentQualifications =
            carePlanData.preferences?.qualification || [];

        if (event.target.checked) {
            updateNestedField("preferences", "qualification", [
                ...currentQualifications,
                qualification,
            ]);
        } else {
            updateNestedField(
                "preferences",
                "qualification",
                currentQualifications.filter((q) => q !== qualification)
            );
        }
    };

    // Handle experience preference change (multiple selection)
    const handleExperienceChange = (experience) => (event) => {
        const currentExperience = carePlanData.preferences?.experience || [];

        if (event.target.checked) {
            updateNestedField("preferences", "experience", [
                ...currentExperience,
                experience,
            ]);
        } else {
            updateNestedField(
                "preferences",
                "experience",
                currentExperience.filter((e) => e !== experience)
            );
        }
    };

    // Handle personality preference change (multiple selection)
    const handlePersonalityChange = (personality) => (event) => {
        const currentPersonalities =
            carePlanData.preferences?.personality || [];

        if (event.target.checked) {
            // If "Doesn't matter" is selected, clear all others
            if (personality === "Doesn't matter") {
                updateNestedField("preferences", "personality", [
                    "Doesn't matter",
                ]);
            } else {
                // Remove "Doesn't matter" if another option is selected
                const filteredPersonalities = currentPersonalities.filter(
                    (p) => p !== "Doesn't matter"
                );
                updateNestedField("preferences", "personality", [
                    ...filteredPersonalities,
                    personality,
                ]);
            }
        } else {
            updateNestedField(
                "preferences",
                "personality",
                currentPersonalities.filter((p) => p !== personality)
            );
        }
    };

    const currentQualifications = carePlanData.preferences?.qualification || [];
    const currentExperience = carePlanData.preferences?.experience || [];
    const currentPersonalities = carePlanData.preferences?.personality || [];

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ color: "white" }}
                >
                    Nanny Preferences
                </Typography>

                {/* Qualifications */}
                <Box>
                    <Typography
                        variant="body2"
                        fontWeight={"bold"}
                        color="white"
                    >
                        Qualifications *
                    </Typography>

                    <FormGroup row sx={{ px: 2 }}>
                        {Qualifications.map((qualification, index) => (
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        sx={whiteControlSx}
                                        checked={currentQualifications.includes(
                                            qualification
                                        )}
                                        onChange={handleQualificationChange(
                                            qualification
                                        )}
                                    />
                                }
                                label={
                                    <Typography color="white" fontSize={12}>
                                        {qualification}
                                    </Typography>
                                }
                                sx={{ mb: 1 }}
                            />
                        ))}
                    </FormGroup>
                </Box>

                {/* Experience */}
                <Box>
                    <Typography
                        variant="body2"
                        fontWeight={"bold"}
                        color="white"
                    >
                        Experience *
                    </Typography>

                    <FormGroup row sx={{ px: 2 }}>
                        {ExperienceYears.map((experience, index) => (
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        sx={whiteControlSx}
                                        checked={currentExperience.includes(
                                            experience
                                        )}
                                        onChange={handleExperienceChange(
                                            experience
                                        )}
                                    />
                                }
                                label={
                                    <Typography color="white" fontSize={12}>
                                        {experience}
                                    </Typography>
                                }
                                sx={{ mb: 1 }}
                            />
                        ))}
                    </FormGroup>
                </Box>

                {/* Personality */}
                <Box>
                    <Typography
                        variant="body2"
                        fontWeight={"bold"}
                        color="white"
                    >
                        Personality
                    </Typography>

                    <FormGroup row sx={{ px: 2 }}>
                        {Personalities.map((personality, index) => (
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        sx={whiteControlSx}
                                        checked={currentPersonalities.includes(
                                            personality
                                        )}
                                        onChange={handlePersonalityChange(
                                            personality
                                        )}
                                    />
                                }
                                label={
                                    <Typography color="white" fontSize={12}>
                                        {personality}
                                    </Typography>
                                }
                                sx={{ mb: 1 }}
                            />
                        ))}
                    </FormGroup>
                </Box>
            </Box>
        </Box>
    );
}

export default StepSixEC;
