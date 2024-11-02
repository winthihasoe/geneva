import React from "react";
import {
    Box,
    TextField,
    Typography,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle";

const GenderHeightWeightForm = ({ data, handleChange }) => {
    return (
        <Box
            sx={{
                margin: "20px auto",
            }}
        >
            <FormControl
                component="fieldset"
                sx={{
                    mb: 3,
                }}
            >
                <Subtitle>Gender</Subtitle>

                <RadioGroup
                    row
                    value={data.gender}
                    onChange={handleChange("gender")}
                >
                    <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Male"
                    />
                    <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        label="Female"
                    />
                </RadioGroup>
            </FormControl>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
                <Subtitle>Height</Subtitle>
                <TextField
                    size="small"
                    type="number"
                    value={data.height}
                    inputProps={{ min: 0 }}
                    onChange={handleChange("height")}
                    InputProps={{
                        endAdornment: <Typography>cm</Typography>,
                    }}
                />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Subtitle>Weight</Subtitle>
                <TextField
                    size="small"
                    type="number"
                    value={data.weight}
                    inputProps={{ min: 0 }}
                    onChange={handleChange("weight")}
                    InputProps={{
                        endAdornment: <Typography>kg</Typography>,
                    }}
                />
            </Box>
        </Box>
    );
};

export default GenderHeightWeightForm;
