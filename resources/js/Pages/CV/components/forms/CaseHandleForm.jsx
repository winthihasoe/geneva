import React from "react";
import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    TextField,
    Typography,
} from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle";

const elderHandle = [
    "COPD",
    "Dementia and Alzheimer's Disease",
    "Chronic kidney disease",
    "Fall",
    "Hypertension",
    "Stroke",
    "Heart Disease",
    "Diabetes",
    "Cancer",
    "Osteoporosis",
    "Osteoporosis Dementia",
    "Depression",
    "Parkinson's Disease",
];

const babiesHandle = [
    "Common cold and flu",
    "Pneumonia",
    "Bronchiolitis",
    "Hand, Foot, and Mouth disease",
    "Diarrhea and Gastroenteritis",
    "Dengue fever",
    "Chickenpox",
    "Tuberculosis",
    "Worm infection",
    "Scabies and lice",
    "Measles",
    "Rubella",
    "Conjunctivitis",
    "Malaria",
];

const CaseHandleForm = ({ data, handleChange }) => {
    const handleCheckboxChange = (section, value) => (event) => {
        const newValues = event.target.checked
            ? [...data[section], value]
            : data[section].filter((item) => item !== value);
        handleChange(section)({ target: { value: newValues } });
    };

    return (
        <Box sx={{ mb: 3 }}>
            {/* Skill for elder care  */}
            <Subtitle>Types of Patients handled (Elder care)</Subtitle>
            <FormGroup row sx={{ mb: 3, px: 2 }}>
                {elderHandle.map((skill) => (
                    <FormControlLabel
                        key={skill}
                        control={
                            <Checkbox
                                checked={data.nursing_skills.includes(skill)}
                                onChange={handleCheckboxChange(
                                    "nursing_skills",
                                    skill
                                )}
                            />
                        }
                        label={<Typography fontSize={12}>{skill}</Typography>}
                        sx={{ width: 200 }}
                    />
                ))}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Subtitle>Others:</Subtitle>
                    <TextField size="small" />
                </Box>
            </FormGroup>

            {/* Child care skills  */}
            <Subtitle>Types of Babies handled (Child care)</Subtitle>
            <FormGroup row sx={{ mb: 3, px: 2 }}>
                {babiesHandle.map((skill) => (
                    <FormControlLabel
                        key={skill}
                        control={
                            <Checkbox
                                checked={data.nursing_skills.includes(skill)}
                                onChange={handleCheckboxChange(
                                    "nursing_skills",
                                    skill
                                )}
                            />
                        }
                        label={<Typography fontSize={12}>{skill}</Typography>}
                        sx={{ width: 200 }}
                    />
                ))}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Subtitle>Others:</Subtitle>
                    <TextField size="small" />
                </Box>
            </FormGroup>
        </Box>
    );
};

export default CaseHandleForm;
