import React, { useContext, useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import CvContext from "@/Context/CvContext";

const illnesses = [
    { label: "Mental illness", name: "Mental illness" },
    { label: "Epilepsy", name: "Epilepsy" },
    { label: "Asthma", name: "Asthma" },
    { label: "Diabetes", name: "Diabetes" },
    { label: "Hypertension", name: "Hypertension" },
    { label: "Tuberculosis", name: "Tuberculosis" },
    { label: "Heart disease", name: "Heart Disease" },
    { label: "Malaria", name: "Malaria" },
    { label: "Operations", name: "Operations" },
];

const StepTen = () => {
    const { data, handleChange } = useContext(CvContext);
    const handleRadioChange = (illnessName) => (event) => {
        const value = event.target.value === "yes" ? illnessName : null;
        const newPastIllnesses =
            event.target.value === "yes"
                ? [...data.past_illnesses, illnessName]
                : data.past_illnesses.filter(
                      (illness) => illness !== illnessName
                  );
        handleChange("past_illnesses")({ target: { value: newPastIllnesses } });
    };

    return (
        <Box sx={{ mb: 3, maxWidth: 400, margin: "0 auto" }}>
            <Typography variant="h6" mb={2}>
                Your Medical History{" "}
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={3}>
                Past and existing illnesses (including chronic ailments and
                illnesses requiring medication):
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: 2,
                    px: 2,
                    my: 3,
                }}
            >
                {illnesses.map((illness) => (
                    <Box
                        key={illness.name}
                        sx={{ flex: "1 1 calc(50% - 16px)" }}
                    >
                        <Typography fontSize={12} fontWeight="bold">
                            {illness.label}
                        </Typography>
                        <FormControl component="fieldset">
                            <RadioGroup
                                row
                                aria-label={illness.label}
                                name={illness.name}
                                value={
                                    data.past_illnesses.includes(illness.name)
                                        ? "yes"
                                        : "no"
                                }
                                onChange={handleRadioChange(illness.name)}
                            >
                                <FormControlLabel
                                    value="yes"
                                    control={<Radio />}
                                    label="Yes"
                                />
                                <FormControlLabel
                                    value="no"
                                    control={<Radio />}
                                    label="No"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                ))}
            </Box>
            <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                    Other illness
                </Typography>
                <TextField
                    value={data.other_illness}
                    onChange={handleChange("other_illness")}
                    fullWidth
                    multiline
                    size="small"
                    placeholder="Other illness ..."
                    inputProps={{ maxLength: 500 }}
                />
                <Typography variant="body2" color="textSecondary">
                    Only 500 words
                </Typography>
            </Box>
        </Box>
    );
};

export default StepTen;
