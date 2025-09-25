import React, { useContext } from "react";
import {
    Box,
    TextField,
    Typography,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import CvContext from "@/Context/CvContext";
import ProfileUploadForm from "./ProfileUploadForm";

const nationalityOptions = [
    "Thailand",
    "Myanmar",
    "Laos",
    "Indonesian",
    "Filipino",
    "Indian",
    "Sri Lanka",
];

const religions = [
    "Buddhism",
    "Christianity",
    "Catholic",
    "Muslim",
    "Hinduism",
    "Taoism",
    "No Religion",
];

const StepTwo = () => {
    const { data, handleChange } = useContext(CvContext);
    return (
        <Box
            sx={{
                margin: "auto",
                maxWidth: 400,
            }}
        >
            <ProfileUploadForm />
            <Box
                sx={{
                    my: 3,
                }}
            >
                <Typography variant="subtitle1" fontWeight="bold">
                    Height in cm
                </Typography>
                <TextField
                    size="small"
                    type="number"
                    value={data.height ?? ""}
                    inputProps={{ min: 0 }}
                    onChange={handleChange("height")}
                    InputProps={{
                        endAdornment: <Typography>cm</Typography>,
                    }}
                    placeholder="150"
                    fullWidth
                />
                <Typography variant="body2" mt={1} color="textSecondary">
                    Can't input decimal (point).
                </Typography>
            </Box>
            <Box
                sx={{
                    mb: 3,
                }}
            >
                <Typography variant="subtitle1" fontWeight="bold">
                    Weight in kg
                </Typography>
                <TextField
                    size="small"
                    type="number"
                    value={data.weight ?? ""}
                    inputProps={{ min: 0 }}
                    onChange={handleChange("weight")}
                    InputProps={{
                        endAdornment: <Typography>kg</Typography>,
                    }}
                    placeholder="60.5"
                    fullWidth
                />
                <Typography variant="body2" mt={1} color="textSecondary">
                    Can input decimal (point).
                </Typography>
            </Box>

            {/* Nationality  */}
            <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                    Nationality
                </Typography>
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
                    <Typography>Other nationality</Typography>
                    <TextField
                        size="small"
                        onChange={handleChange("other_nationality")}
                    />
                </Box>
            </Box>

            {/* Religion  */}
            <Box sx={{ my: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                    Religion
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        gap: 2,
                    }}
                >
                    <FormControl component="fieldset" sx={{ flexGrow: 1 }}>
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
            </Box>
        </Box>
    );
};

export default StepTwo;
