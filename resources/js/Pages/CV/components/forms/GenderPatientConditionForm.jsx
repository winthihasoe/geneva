import React from "react";
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

const TypeOfCare = [
    "Elder care",
    "Newborn care",
    "Nanny service",
    "Elder + Maid",
    "Nanny + Maid",
];
const GenderPatientConditionForm = ({ data, handleChange }) => {
    const handleCheckboxChange = (section, value) => (event) => {
        const newValues = event.target.checked
            ? [...data[section], value]
            : data[section].filter((item) => item !== value);
        handleChange(section)({ target: { value: newValues } });
    };
    return (
        <Box sx={{ py: 3 }}>
            <Box mb={3}>
                <Subtitle>Gender of patient</Subtitle>

                <FormControl component="fieldset">
                    <RadioGroup
                        row
                        sx={{ px: 2 }}
                        value={data.gender_of_patient}
                        onChange={handleChange("gender_of_patient")}
                    >
                        <FormControlLabel
                            value="No requirements"
                            control={<Radio />}
                            label="No requirements"
                            sx={{
                                ".MuiFormControlLabel-label": { fontSize: 12 },
                            }}
                        />
                        <FormControlLabel
                            value="Male Only"
                            control={<Radio />}
                            label="Male Only"
                            sx={{
                                ".MuiFormControlLabel-label": { fontSize: 12 },
                            }}
                        />
                        <FormControlLabel
                            value="Female only"
                            control={<Radio />}
                            label="Female only"
                            sx={{
                                ".MuiFormControlLabel-label": { fontSize: 12 },
                            }}
                        />
                    </RadioGroup>
                </FormControl>
            </Box>
            <Box>
                <Subtitle>Type of Care</Subtitle>

                <FormGroup row sx={{ px: 2 }}>
                    {TypeOfCare.map((condition) => (
                        <FormControlLabel
                            key={condition}
                            control={
                                <Checkbox
                                    checked={data.patient_conditions.includes(
                                        condition
                                    )}
                                    onChange={handleCheckboxChange(
                                        "patient_conditions",
                                        condition
                                    )}
                                />
                            }
                            label={
                                <Typography fontSize={12}>
                                    {condition}
                                </Typography>
                            }
                            sx={{ width: 130 }}
                        />
                    ))}
                </FormGroup>
            </Box>
        </Box>
    );
};

export default GenderPatientConditionForm;
