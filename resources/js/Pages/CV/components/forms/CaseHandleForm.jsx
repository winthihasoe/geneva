import React, { useContext } from "react";
import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    TextField,
    Typography,
} from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle";
import CvContext from "@/Context/CvContext";

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

const CaseHandleForm = () => {
    const { data, handleChange } = useContext(CvContext);
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
                                checked={data.types_of_patients_handled.includes(
                                    skill
                                )}
                                onChange={handleCheckboxChange(
                                    "types_of_patients_handled",
                                    skill
                                )}
                            />
                        }
                        label={<Typography fontSize={12}>{skill}</Typography>}
                        sx={{ width: 200 }}
                    />
                ))}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Subtitle>Other cases:</Subtitle>
                    <TextField
                        value={data.other_types_of_patients_handled}
                        size="small"
                        onChange={handleChange(
                            "other_types_of_patients_handled"
                        )}
                        inputProps={{ maxLength: 220 }}
                    />
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
                                checked={data.types_of_babies_handled.includes(
                                    skill
                                )}
                                onChange={handleCheckboxChange(
                                    "types_of_babies_handled",
                                    skill
                                )}
                            />
                        }
                        label={<Typography fontSize={12}>{skill}</Typography>}
                        sx={{ width: 200 }}
                    />
                ))}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Subtitle>Others cases:</Subtitle>
                    <TextField
                        value={data.other_types_of_babies_handled}
                        size="small"
                        onChange={handleChange("other_types_of_babies_handled")}
                        inputProps={{ maxLength: 220 }}
                    />
                </Box>
            </FormGroup>
        </Box>
    );
};

export default CaseHandleForm;
