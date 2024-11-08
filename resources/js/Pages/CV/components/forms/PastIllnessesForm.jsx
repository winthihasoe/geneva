import React, { useContext } from "react";
import {
    Box,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle"; // Ensure this path is correct
import CvContext from "@/Context/CvContext";
import TinyText from "@/Components/Typo/TinyText";

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

const PastIllnessesForm = () => {
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
            <Subtitle>
                Past and existing illnesses (including chronic ailments and
                illnesses requiring medication):
            </Subtitle>
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
                <Subtitle>Other illness</Subtitle>
                <TextField
                    value={data.other_illness}
                    onChange={handleChange("other_illness")}
                    fullWidth
                    multiline
                    size="small"
                    placeholder="Other illness ..."
                    inputProps={{ maxLength: 500 }}
                />
                <TinyText>Only 500 words</TinyText>
            </Box>
        </Box>
    );
};

export default PastIllnessesForm;
