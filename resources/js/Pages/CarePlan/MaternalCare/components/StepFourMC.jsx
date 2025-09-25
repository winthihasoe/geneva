import { CarePlanContext } from "@/Context/CarePlanContext";
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import React, { useContext } from "react";

// Age ranges with min/max values for easy filtering
const Ages = [
    { label: "20-30 years", min: 20, max: 30, value: "20-30" },
    { label: "30-40 years", min: 30, max: 40, value: "30-40" },
    { label: "40+ years", min: 40, max: 100, value: "40+" },
    { label: "Doesn't matter", min: null, max: null, value: "any" },
];
const Religions = [
    "Buddhist",
    "Christian",
    "Islam",
    "Hinduism",
    "Doesn't matter",
];

const Nationalities = [
    "Thailand",
    "Myanmar",
    "Laos",
    "Indonesian",
    "Filipino",
    "Indian",
    "Doesn't matter",
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

function StepFourMC() {
    const { carePlanData, updateNestedField } = useContext(CarePlanContext);

    // Handle age preference change (single selection)
    const handleAgeChange = (ageValue) => {
        const selectedAge = Ages.find((age) => age.value === ageValue);
        updateNestedField("preferences", "age", ageValue);

        // Also store min/max values for easy filtering
        if (selectedAge && selectedAge.min !== null) {
            updateNestedField("preferences", "minimum_age", selectedAge.min);
            updateNestedField("preferences", "maximum_age", selectedAge.max);
        } else {
            updateNestedField("preferences", "minimum_age", "");
            updateNestedField("preferences", "maximum_age", "");
        }
    };

    // Handle religion preference change (multiple selection)
    const handleReligionChange = (religion) => (event) => {
        const currentReligions = carePlanData.preferences?.religion || [];

        if (event.target.checked) {
            // If "Doesn't matter" is selected, clear all others
            if (religion === "Doesn't matter") {
                updateNestedField("preferences", "religion", [
                    "Doesn't matter",
                ]);
            } else {
                // Remove "Doesn't matter" if another option is selected
                const filteredReligions = currentReligions.filter(
                    (r) => r !== "Doesn't matter"
                );
                updateNestedField("preferences", "religion", [
                    ...filteredReligions,
                    religion,
                ]);
            }
        } else {
            updateNestedField(
                "preferences",
                "religion",
                currentReligions.filter((r) => r !== religion)
            );
        }
    };

    // Handle nationality preference change (multiple selection)
    const handleNationalityChange = (nationality) => (event) => {
        const currentNationalities =
            carePlanData.preferences?.nationality || [];

        if (event.target.checked) {
            // If "Doesn't matter" is selected, clear all others
            if (nationality === "Doesn't matter") {
                updateNestedField("preferences", "nationality", [
                    "Doesn't matter",
                ]);
            } else {
                // Remove "Doesn't matter" if another option is selected
                const filteredNationalities = currentNationalities.filter(
                    (n) => n !== "Doesn't matter"
                );
                updateNestedField("preferences", "nationality", [
                    ...filteredNationalities,
                    nationality,
                ]);
            }
        } else {
            updateNestedField(
                "preferences",
                "nationality",
                currentNationalities.filter((n) => n !== nationality)
            );
        }
    };

    const currentReligions = carePlanData.preferences?.religion || [];
    const currentNationalities = carePlanData.preferences?.nationality || [];
    const currentAge = carePlanData.preferences?.age || "";

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
                <Typography sx={{ fontSize: 11, color: "white" }}>
                    This section allows you to specify your personal preferences
                    for the nanny's profile to help ensure the best possible
                    match for your household or care recipient.
                </Typography>

                {/* Caregiver's Age - Radio Group (single selection) */}
                <Box>
                    <Typography
                        variant="body2"
                        fontWeight={"bold"}
                        color="white"
                    >
                        Caregiver's Age *
                    </Typography>

                    <FormControl component="fieldset" sx={{ px: 2 }}>
                        <RadioGroup
                            row
                            value={currentAge}
                            onChange={(e) => handleAgeChange(e.target.value)}
                        >
                            {Ages.map((age, index) => (
                                <FormControlLabel
                                    key={index}
                                    value={age.value}
                                    control={<Radio sx={whiteControlSx} />}
                                    label={
                                        <Typography color="white" fontSize={12}>
                                            {age.label}
                                        </Typography>
                                    }
                                    sx={{ mb: 1 }}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Box>

                {/* Religion - Checkbox Group (multiple selection) */}
                <Box>
                    <Typography
                        variant="body2"
                        fontWeight={"bold"}
                        color="white"
                    >
                        Religion
                    </Typography>

                    <FormGroup row sx={{ px: 2 }}>
                        {Religions.map((religion, index) => (
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        sx={whiteControlSx}
                                        checked={currentReligions.includes(
                                            religion
                                        )}
                                        onChange={handleReligionChange(
                                            religion
                                        )}
                                    />
                                }
                                label={
                                    <Typography color="white" fontSize={12}>
                                        {religion}
                                    </Typography>
                                }
                                sx={{ mb: 1 }}
                            />
                        ))}
                    </FormGroup>
                </Box>

                {/* Race/Nationality - Checkbox Group (multiple selection) */}
                <Box>
                    <Typography
                        variant="body2"
                        fontWeight={"bold"}
                        color="white"
                    >
                        Race
                    </Typography>

                    <FormGroup row sx={{ px: 2 }}>
                        {Nationalities.map((nationality, index) => (
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        sx={whiteControlSx}
                                        checked={currentNationalities.includes(
                                            nationality
                                        )}
                                        onChange={handleNationalityChange(
                                            nationality
                                        )}
                                    />
                                }
                                label={
                                    <Typography color="white" fontSize={12}>
                                        {nationality}
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

export default StepFourMC;
