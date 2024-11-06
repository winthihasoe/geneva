import React, { useContext } from "react";
import {
    Box,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
} from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle";
import CvContext from "@/Context/CvContext";

const SiblingsAndGlassesForm = () => {
    const { data, handleChange } = useContext(CvContext);
    return (
        <Box sx={{ mb: 3 }}>
            <Subtitle>Number of Siblings</Subtitle>
            <TextField
                value={data.number_of_siblings}
                onChange={handleChange("number_of_siblings")}
                fullWidth
                inputProps={{ maxLength: 200 }}
                size="small"
                sx={{ mb: 3 }}
                multiline
            />
            <Subtitle>Do you need to wear glasses</Subtitle>
            <RadioGroup
                row
                value={data.wears_glasses}
                onChange={handleChange("wears_glasses")}
                sx={{ mb: 2, px: 2 }}
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
        </Box>
    );
};

export default SiblingsAndGlassesForm;
