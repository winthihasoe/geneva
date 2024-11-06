import React, { useContext } from "react";
import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Typography,
} from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle";
import CvContext from "@/Context/CvContext";

const ElderNursingSkillsForm = () => {
    const {
        data,
        handleChange,

        elderBasicCare,
        elderAdvancedCare,
    } = useContext(CvContext);

    const handleCheckboxChange = (section, value) => (event) => {
        const newValues = event.target.checked
            ? [...data[section], value]
            : data[section].filter((item) => item !== value);
        handleChange(section)({ target: { value: newValues } });
    };

    return (
        <Box sx={{ mb: 3 }}>
            {/* Skill for elder basic care  */}
            <Subtitle>Skills for Elder Basic Care</Subtitle>
            <FormGroup row sx={{ mb: 3, px: 2 }}>
                {elderBasicCare.map((care) => (
                    <FormControlLabel
                        key={care.id}
                        control={
                            <Checkbox
                                checked={data.nursing_skills_for_elder.includes(
                                    care.care_name
                                )}
                                onChange={handleCheckboxChange(
                                    "nursing_skills_for_elder",
                                    care.care_name
                                )}
                            />
                        }
                        label={
                            <Typography fontSize={12}>
                                {care.care_name}
                            </Typography>
                        }
                        sx={{ width: 200 }}
                    />
                ))}
            </FormGroup>

            {/* Skill for elder advanced care  */}
            <Subtitle>Nursing Skills for Elder Advanced Care</Subtitle>
            <FormGroup row sx={{ mb: 3, px: 2 }}>
                {elderAdvancedCare.map((care) => (
                    <FormControlLabel
                        key={care.id}
                        control={
                            <Checkbox
                                checked={data.nursing_skills_for_elder.includes(
                                    care.care_name
                                )}
                                onChange={handleCheckboxChange(
                                    "nursing_skills_for_elder",
                                    care.care_name
                                )}
                            />
                        }
                        label={
                            <Typography fontSize={12}>
                                {care.care_name}
                            </Typography>
                        }
                        sx={{ width: 200 }}
                    />
                ))}
            </FormGroup>
        </Box>
    );
};

export default ElderNursingSkillsForm;
