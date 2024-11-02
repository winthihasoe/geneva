import React from "react";
import {
    Box,
    TextField,
    Typography,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormGroup,
    Checkbox,
} from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle";

const dietaryRestrictions = [
    "No restriction",
    "No pork",
    "No beef",
    "Vegetarian",
];
const foodHandling = ["No restriction", "No pork", "No beef"];

const DietaryFoodHandlingForm = ({ data, handleChange }) => {
    const handleCheckboxChange = (section, value) => (event) => {
        const newValues = event.target.checked
            ? [...data[section], value]
            : data[section].filter((item) => item !== value);
        handleChange(section)({ target: { value: newValues } });
    };

    return (
        <Box
            sx={{
                mb: 3,
                display: "flex",
                flexDirection: "column",
                gap: 3,
            }}
        >
            {/* Dietary Restriction  */}
            <FormControl component="fieldset" sx={{ mb: 2 }}>
                <Subtitle>Dietary Restrictions</Subtitle>
                <FormGroup
                    row
                    sx={{ display: "flex", flexWrap: "wrap", columnGap: 2 }}
                >
                    {dietaryRestrictions.map((restriction) => (
                        <FormControlLabel
                            key={restriction}
                            control={
                                <Checkbox
                                    checked={data.dietary_restrictions.includes(
                                        restriction
                                    )}
                                    onChange={handleCheckboxChange(
                                        "dietary_restrictions",
                                        restriction
                                    )}
                                />
                            }
                            label={
                                <Typography fontSize={12}>
                                    {restriction}
                                </Typography>
                            }
                        />
                    ))}
                </FormGroup>
                <TextField
                    value={data.other_dietary_restrictions}
                    onChange={handleChange("other_dietary_restrictions")}
                    size="small"
                    label="Other dietary restrictions ..."
                    multiline
                    minRows={2}
                    inputProps={{
                        maxLength: 220,
                    }}
                />
            </FormControl>

            {/* Food Handling  */}
            <FormControl component="fieldset" sx={{ mb: 2 }}>
                <Subtitle>Food Handling Preferences</Subtitle>
                <FormGroup
                    row
                    sx={{ display: "flex", flexWrap: "wrap", columnGap: 2 }}
                >
                    {foodHandling.map((handling) => (
                        <FormControlLabel
                            key={handling}
                            control={
                                <Checkbox
                                    checked={data.food_handling.includes(
                                        handling
                                    )}
                                    onChange={handleCheckboxChange(
                                        "food_handling",
                                        handling
                                    )}
                                />
                            }
                            label={
                                <Typography fontSize={12}>
                                    {handling}
                                </Typography>
                            }
                        />
                    ))}
                </FormGroup>
                <TextField
                    value={data.other_food_handling}
                    onChange={handleChange("other_food_handling")}
                    size="small"
                    label="Others food handling specific ..."
                    multiline
                    minRows={2}
                    inputProps={{
                        maxLength: 220,
                    }}
                />
            </FormControl>
        </Box>
    );
};

export default DietaryFoodHandlingForm;
