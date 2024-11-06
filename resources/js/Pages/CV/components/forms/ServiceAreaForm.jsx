import React, { useContext } from "react";
import {
    Box,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormGroup,
    Checkbox,
} from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle";
import CvContext from "@/Context/CvContext";

const ServiceAreas = [
    "Anywhere in Thailand",
    "Bangkok only",
    "Chiang Mai",
    "Both Chiang Mai & Bangkok",
];
const ServiceAreaForm = () => {
    const { data, handleChange } = useContext(CvContext);
    const handleCheckboxChange = (section, value) => (event) => {
        const newValues = event.target.checked
            ? [...data[section], value]
            : data[section].filter((item) => item !== value);
        handleChange(section)({ target: { value: newValues } });
    };
    return (
        <Box sx={{ py: 3 }}>
            <Box mb={3}>
                <Subtitle>Service Area</Subtitle>

                <FormControl component="fieldset">
                    <RadioGroup
                        row
                        sx={{ px: 2 }}
                        value={data.service_area}
                        onChange={handleChange("service_area")}
                    >
                        {ServiceAreas.map((area) => (
                            <FormControlLabel
                                value={area}
                                control={<Radio />}
                                label={
                                    <Typography
                                        fontSize={14}
                                        fontFamily={"Kufam"}
                                    >
                                        {area}
                                    </Typography>
                                }
                                sx={{
                                    ".MuiFormControlLabel-label": {
                                        fontSize: 12,
                                    },
                                }}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Box>
        </Box>
    );
};

export default ServiceAreaForm;
