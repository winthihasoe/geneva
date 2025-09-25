import { CarePlanContext } from "@/Context/CarePlanContext";
import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState, useContext } from "react";

const Languages = ["Thai", "Myanmar", "English", "Chinese", "Hindi"];

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

function StepFiveMC() {
    const { carePlanData, updateCarePlan, updateNestedField } =
        useContext(CarePlanContext);

    const [otherLanguage, setOtherLanguage] = useState("");
    const [showOtherLanguageField, setShowOtherLanguageField] = useState(false);

    // Handle language preference change (multiple selection)
    const handleLanguageChange = (language) => (event) => {
        const currentLanguages = carePlanData.preferred_language
            ? carePlanData.preferred_language
                  .split(",")
                  .map((lang) => lang.trim())
            : [];

        if (event.target.checked) {
            updateCarePlan(
                "preferred_language",
                [...currentLanguages, language].join(", ")
            );
        } else {
            const filteredLanguages = currentLanguages.filter(
                (lang) => lang !== language
            );
            updateCarePlan("preferred_language", filteredLanguages.join(", "));
        }
    };

    // Handle other language change
    const handleOtherLanguageChange = (event) => {
        const value = event.target.value;
        setOtherLanguage(value);

        const currentLanguages = carePlanData.preferred_language
            ? carePlanData.preferred_language
                  .split(",")
                  .map((lang) => lang.trim())
            : [];

        // Remove any previous "Other:" entries
        const filteredLanguages = currentLanguages.filter(
            (lang) => !lang.startsWith("Other:")
        );

        if (value.trim()) {
            updateCarePlan(
                "preferred_language",
                [...filteredLanguages, `Other: ${value}`].join(", ")
            );
        } else {
            updateCarePlan("preferred_language", filteredLanguages.join(", "));
        }
    };

    // Handle other language checkbox
    const handleOtherLanguageCheckbox = (event) => {
        const isChecked = event.target.checked;
        setShowOtherLanguageField(isChecked);

        if (!isChecked) {
            setOtherLanguage("");
            const currentLanguages = carePlanData.preferred_language
                ? carePlanData.preferred_language
                      .split(",")
                      .map((lang) => lang.trim())
                : [];
            const filteredLanguages = currentLanguages.filter(
                (lang) => !lang.startsWith("Other:")
            );
            updateCarePlan("preferred_language", filteredLanguages.join(", "));
        }
    };

    const currentLanguages = carePlanData.preferred_language
        ? carePlanData.preferred_language.split(",").map((lang) => lang.trim())
        : [];

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ color: "white" }}>
                Nanny Preferences
            </Typography>

            {/* Language Preferences */}
            <Box>
                <Typography variant="body2" fontWeight={"bold"} color="white">
                    Language *
                </Typography>

                <FormGroup row sx={{ px: 2 }}>
                    {Languages.map((language, index) => (
                        <FormControlLabel
                            key={index}
                            control={
                                <Checkbox
                                    sx={whiteControlSx}
                                    checked={currentLanguages.includes(
                                        language
                                    )}
                                    onChange={handleLanguageChange(language)}
                                />
                            }
                            label={
                                <Typography color="white" fontSize={12}>
                                    {language}
                                </Typography>
                            }
                            sx={{ mb: 1 }}
                        />
                    ))}

                    {/* Other language checkbox */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                sx={whiteControlSx}
                                checked={showOtherLanguageField}
                                onChange={handleOtherLanguageCheckbox}
                            />
                        }
                        label={
                            <Typography color="white" fontSize={12}>
                                Other
                            </Typography>
                        }
                        sx={{ mb: 1 }}
                    />
                </FormGroup>

                {/* Other language text field */}
                {showOtherLanguageField && (
                    <Box sx={{ px: 2 }}>
                        <Typography color="white" variant="body2">
                            Other language
                        </Typography>
                        <TextField
                            value={otherLanguage}
                            onChange={handleOtherLanguageChange}
                            placeholder="Please specify..."
                            fullWidth
                            variant="filled"
                            size="small"
                            sx={{
                                "& .MuiFilledInput-root": {
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    color: "white",
                                },
                                "& .MuiFilledInput-input": {
                                    color: "white",
                                },
                                "& .MuiInputBase-input::placeholder": {
                                    color: "rgba(255, 255, 255, 0.7)",
                                },
                            }}
                        />
                    </Box>
                )}
            </Box>

            {/* Weight Preferences */}
            <Box>
                <Typography
                    variant="body2"
                    fontWeight={"bold"}
                    color="white"
                    mb={1}
                >
                    Weight between:
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                    <Box>
                        <Typography variant="body2" color="white">
                            Minimum weight in kg
                        </Typography>
                        <TextField
                            fullWidth
                            variant="filled"
                            value={
                                carePlanData.preferences?.minimum_weight || ""
                            }
                            onChange={(e) =>
                                updateNestedField(
                                    "preferences",
                                    "minimum_weight",
                                    e.target.value
                                )
                            }
                            sx={{
                                "& .MuiFilledInput-root": {
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    color: "white",
                                },
                                "& .MuiFilledInput-input": {
                                    color: "white",
                                },
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="body2" color="white">
                            Maximum weight in kg
                        </Typography>
                        <TextField
                            fullWidth
                            variant="filled"
                            value={
                                carePlanData.preferences?.maximum_weight || ""
                            }
                            onChange={(e) =>
                                updateNestedField(
                                    "preferences",
                                    "maximum_weight",
                                    e.target.value
                                )
                            }
                            sx={{
                                "& .MuiFilledInput-root": {
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    color: "white",
                                },
                                "& .MuiFilledInput-input": {
                                    color: "white",
                                },
                            }}
                        />
                    </Box>
                </Box>
            </Box>

            {/* Height Preferences */}
            <Box>
                <Typography variant="body2" fontWeight={"bold"} color="white">
                    Height between:
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                    <Box>
                        <Typography variant="body2" color="white">
                            Minimum height in cm
                        </Typography>
                        <TextField
                            fullWidth
                            variant="filled"
                            value={
                                carePlanData.preferences?.minimum_height || ""
                            }
                            onChange={(e) =>
                                updateNestedField(
                                    "preferences",
                                    "minimum_height",
                                    e.target.value
                                )
                            }
                            sx={{
                                "& .MuiFilledInput-root": {
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    color: "white",
                                },
                                "& .MuiFilledInput-input": {
                                    color: "white",
                                },
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="body2" color="white">
                            Maximum height in cm
                        </Typography>
                        <TextField
                            fullWidth
                            variant="filled"
                            value={
                                carePlanData.preferences?.maximum_height || ""
                            }
                            onChange={(e) =>
                                updateNestedField(
                                    "preferences",
                                    "maximum_height",
                                    e.target.value
                                )
                            }
                            sx={{
                                "& .MuiFilledInput-root": {
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    color: "white",
                                },
                                "& .MuiFilledInput-input": {
                                    color: "white",
                                },
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default StepFiveMC;
