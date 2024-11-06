import React, { useContext } from "react";
import {
    Box,
    Typography,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle";
import CvContext from "@/Context/CvContext";

const educationLevels = [
    "8-10 Years Formal Education",
    "Post Secondary - Diploma",
    "Post Secondary - Degree / BSC",
];

const caregiverQuas = [
    "3 months Caregiver / Nurse Aid course",
    "6 months Caregiver / Nurse Aid course",
    "Mid wife diploma",
    "Diploma in Nursing / Caregiver",
    "Degree / BSC in Nursing / Caregiver",
];
const EducationQualificationForm = () => {
    const { data, handleChange } = useContext(CvContext);
    return (
        <Box>
            <Box
                sx={{
                    mt: 2,
                    mb: 4,
                }}
            >
                <Subtitle>Education level</Subtitle>
                <FormControl component="fieldset" sx={{ flexGrow: 1 }}>
                    <RadioGroup
                        column
                        value={data.education_level}
                        onChange={handleChange("education_level")}
                        sx={{ px: 3 }}
                    >
                        {educationLevels.map((level) => (
                            <FormControlLabel
                                key={level}
                                value={level}
                                control={<Radio />}
                                label={
                                    <Typography fontSize={12}>
                                        {level}
                                    </Typography>
                                }
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Box>
            <Box
                sx={{
                    mb: 2,
                }}
            >
                <Subtitle>Qualification</Subtitle>
                <FormControl component="fieldset" sx={{ flexGrow: 1 }}>
                    <RadioGroup
                        column
                        value={data.caregiver_qualification}
                        onChange={handleChange("caregiver_qualification")}
                        sx={{ px: 3 }}
                    >
                        {caregiverQuas.map((qua) => (
                            <FormControlLabel
                                key={qua}
                                value={qua}
                                control={<Radio />}
                                label={
                                    <Typography fontSize={12}>{qua}</Typography>
                                }
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Box>
        </Box>
    );
};

export default EducationQualificationForm;
