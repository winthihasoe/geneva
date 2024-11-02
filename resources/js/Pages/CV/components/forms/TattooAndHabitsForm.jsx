import React from "react";
import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
    Checkbox,
    Typography,
    FormGroup,
} from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle";

const habits = ["Alcohol Consumption", "Smoking", "Gambling"];
const TattooAndHabitsForm = ({ data, handleChange }) => {
    const handleCheckboxChange = (value) => (event) => {
        const newValues = event.target.checked
            ? [...data.habits, value]
            : data.habits.filter((habit) => habit !== value);
        handleChange("habits")({ target: { value: newValues } });
    };

    return (
        <Box sx={{ mb: 3 }}>
            <Subtitle>Do you have tattoo?</Subtitle>
            <FormControl component="fieldset" sx={{ mb: 3 }}>
                <RadioGroup
                    row
                    sx={{ px: 2 }}
                    aria-label="tattoo"
                    value={data.has_tattoo}
                    onChange={handleChange("has_tattoo")}
                >
                    <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label={<Typography fontSize={12}>Yes</Typography>}
                    />
                    <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label={<Typography fontSize={12}>No</Typography>}
                    />
                </RadioGroup>
            </FormControl>

            <Subtitle>Do you have any of following habits</Subtitle>

            <FormGroup row sx={{ px: 2 }}>
                {habits.map((habit) => (
                    <FormControlLabel
                        key={habit}
                        control={
                            <Checkbox
                                checked={data.habits.includes(habit)}
                                onChange={handleCheckboxChange(habit)}
                            />
                        }
                        label={<Typography fontSize={13}>{habit}</Typography>}
                    />
                ))}
            </FormGroup>
            <TextField
                size="small"
                fullWidth
                multiline
                minRows={2}
                label="Other habits"
                value={data.other_habits}
                onChange={handleChange("other_habits")}
            />
        </Box>
    );
};

export default TattooAndHabitsForm;
