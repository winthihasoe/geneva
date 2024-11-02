import React from "react";
import {
    Box,
    TextField,
    Typography,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle";
import BodyText from "@/Components/Typo/BodyText";
import TinyText from "@/Components/Typo/TinyText";
import ResumeText from "@/Components/Typo/ResumeText";

const nationalityOptions = [
    "Thailand",
    "Myanmar",
    "Laos",
    "Indonesia",
    "Philippines",
    "India",
    "Sri Lanka",
];

const PlaceOfBirthForm = ({ data, handleChange }) => {
    return (
        <Box sx={{ my: 2 }}>
            <Box sx={{ mb: 4 }}>
                <Subtitle>Place of Birth</Subtitle>
                <TextField
                    value={data.place_of_birth}
                    onChange={handleChange("place_of_birth")}
                    sx={{ flexGrow: 1 }}
                    size="small"
                    multiline
                    minRows={2}
                    fullWidth
                    inputProps={{
                        maxLength: 220,
                    }}
                />
            </Box>
            <Box>
                <Subtitle>Nationality</Subtitle>
                <FormControl component="fieldset">
                    <RadioGroup
                        row
                        value={data.nationality}
                        onChange={handleChange("nationality")}
                    >
                        {nationalityOptions.map((option) => (
                            <FormControlLabel
                                key={option}
                                value={option}
                                control={<Radio />}
                                label={
                                    <Typography fontSize={12}>
                                        {option}
                                    </Typography>
                                }
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Subtitle>Other nationality</Subtitle>
                    <TextField size="small" />
                </Box>
            </Box>
        </Box>
    );
};

export default PlaceOfBirthForm;
