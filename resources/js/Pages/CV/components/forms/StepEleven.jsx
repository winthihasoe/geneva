import CvContext from "@/Context/CvContext";
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    TextField,
    Typography,
} from "@mui/material";
import React, { useContext } from "react";

const dietaryRestrictions = [
    "No restriction",
    "No pork",
    "No beef",
    "Vegetarian",
];
const foodHandling = ["No restriction", "No pork", "No beef"];

function StepEleven() {
    const { data, handleChange } = useContext(CvContext);

    const handleCheckboxChange = (section, value) => (event) => {
        const newValues = event.target.checked
            ? [...data[section], value]
            : data[section].filter((item) => item !== value);
        handleChange(section)({ target: { value: newValues } });
    };
    return (
        <Box sx={{ margin: "auto", maxWidth: 500 }}>
            <Box mb={3}>
                <Typography variant="subtitle1" fontWeight="bold">
                    Allergies (if any)
                </Typography>
                <TextField
                    value={data.allergies}
                    onChange={handleChange("allergies")}
                    fullWidth
                    size="small"
                    multiline
                    placeholder="Describe any allergy you have ..."
                    inputProps={{ maxLength: 500 }}
                />
                <Typography variant="caption" color="textSecondary">
                    Only 500 words
                </Typography>
            </Box>
            <Box mb={3}>
                <Typography variant="subtitle1" fontWeight="bold">
                    Physical Disabilities
                </Typography>

                <TextField
                    value={data.physical_disability}
                    onChange={handleChange("physical_disability")}
                    fullWidth
                    multiline
                    size="small"
                    placeholder="Describe any disability you have ..."
                    inputProps={{ maxLength: 500 }}
                />
                <Typography variant="caption" color="textSecondary">
                    Only 500 words
                </Typography>
            </Box>

            {/* Dietary Restriction  */}
            <FormControl component="fieldset" sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                    Dietary Restrictions
                </Typography>

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
                    placeholder="Other dietary restrictions ..."
                    multiline
                    inputProps={{
                        maxLength: 220,
                    }}
                />
                <Typography variant="caption" color="textSecondary">
                    Only 220 words
                </Typography>
            </FormControl>

            {/* Food Handling  */}
            <FormControl component="fieldset" sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                    Food Handling Preferences
                </Typography>
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
                    placeholder="Others food handling specific ..."
                    multiline
                    inputProps={{
                        maxLength: 220,
                    }}
                />
                <Typography variant="caption" color="textSecondary">
                    Only 220 words
                </Typography>
            </FormControl>
        </Box>
    );
}

export default StepEleven;
