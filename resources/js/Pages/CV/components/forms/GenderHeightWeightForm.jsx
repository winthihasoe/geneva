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
import Subtitle from "@/Components/Typo/Subtitle";
import CvContext from "@/Context/CvContext";
import TinyText from "@/Components/Typo/TinyText";

const GenderHeightWeightForm = () => {
    const { data, handleChange } = useContext(CvContext);
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
            <Box mb={2}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                        gap: 2,
                    }}
                >
                    <Subtitle>Height</Subtitle>
                    <TextField
                        size="small"
                        type="number"
                        value={data.height ?? ""}
                        inputProps={{ min: 0 }}
                        onChange={handleChange("height")}
                        InputProps={{
                            endAdornment: <Typography>cm</Typography>,
                        }}
                    />
                </Box>
                <TinyText>
                    Height in "cm" and can't input decimal (point).
                </TinyText>
            </Box>
            <Box mb={2}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 1,
                    }}
                >
                    <Subtitle>Weight</Subtitle>
                    <TextField
                        size="small"
                        type="number"
                        value={data.weight ?? ""}
                        inputProps={{ min: 0 }}
                        onChange={handleChange("weight")}
                        InputProps={{
                            endAdornment: <Typography>kg</Typography>,
                        }}
                    />
                </Box>
                <TinyText>
                    Weight in "kg" and can input decimal (point).
                </TinyText>
            </Box>
        </Box>
    );
};

export default GenderHeightWeightForm;
