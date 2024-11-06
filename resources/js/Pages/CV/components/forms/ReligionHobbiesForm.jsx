import React, { useContext } from "react";
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
import CvContext from "@/Context/CvContext";

const religions = [
    "Buddhism",
    "Christianity",
    "Catholic",
    "Muslim",
    "Hinduism",
    "Taoism",
    "No Religion",
];

const hobbies = [
    "Reading",
    "Cooking",
    "Gardening",
    "Photography",
    "Traveling",
    "Drawing",
    "Playing Guitar",
    "Playing Piano",
];

const ReligionHobbiesForm = () => {
    const { data, handleChange } = useContext(CvContext);
    const handleCheckboxChange = (value) => (event) => {
        const newValues = event.target.checked
            ? [...data.hobbies, value]
            : data.hobbies.filter((habit) => habit !== value);
        handleChange("hobbies")({ target: { value: newValues } });
    };

    return (
        <Box sx={{ mb: 3 }}>
            <Subtitle>Religion</Subtitle>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
                <FormControl component="fieldset" sx={{ flexGrow: 1, px: 2 }}>
                    <RadioGroup
                        row
                        value={data.religion}
                        onChange={handleChange("religion")}
                    >
                        {religions.map((religion) => (
                            <FormControlLabel
                                key={religion}
                                value={religion}
                                control={<Radio />}
                                label={
                                    <Typography fontSize={12}>
                                        {religion}
                                    </Typography>
                                }
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Box>

            <Subtitle>Hobbies</Subtitle>
            <FormControl component="fieldset">
                <FormGroup row sx={{ px: 2, mb: 2 }}>
                    {hobbies.map((hobby) => (
                        <FormControlLabel
                            key={hobby}
                            control={
                                <Checkbox
                                    checked={data.hobbies.includes(hobby)}
                                    onChange={handleCheckboxChange(hobby)}
                                />
                            }
                            label={
                                <Typography fontSize={12}>{hobby}</Typography>
                            }
                        />
                    ))}
                </FormGroup>
            </FormControl>
            <TextField
                size="small"
                label="Other hobbies"
                value={data.other_hobbies}
                onChange={handleChange("other_hobbies")}
                fullWidth
                multiline
            />
        </Box>
    );
};

export default ReligionHobbiesForm;
