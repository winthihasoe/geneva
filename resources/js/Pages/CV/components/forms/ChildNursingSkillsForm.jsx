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

const ChildNursingSkillsForm = () => {
    const {
        data,
        handleChange,
        newbornBasicCare,
        newbornAdvancedCare,
        nannyBasicCare,
        nannyAdvancedCare,
    } = useContext(CvContext);

    const handleCheckboxChange = (section, value) => (event) => {
        const newValues = event.target.checked
            ? [...data[section], value]
            : data[section].filter((item) => item !== value);
        handleChange(section)({ target: { value: newValues } });
    };

    return (
        <Box sx={{ mb: 3 }}>
            {/* Skill for newborn basic care  */}
            <Subtitle>Skills for Newborn Basic Care</Subtitle>
            <FormGroup row sx={{ mb: 3, px: 2 }}>
                {newbornBasicCare.map((care) => (
                    <FormControlLabel
                        key={care.id}
                        control={
                            <Checkbox
                                checked={data.nursing_skills_for_child.includes(
                                    care.care_name
                                )}
                                onChange={handleCheckboxChange(
                                    "nursing_skills_for_child",
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

            {/* Skill for newborn advanced care  */}
            <Subtitle>Nursing Skills for Newborn Advanced Care</Subtitle>
            <FormGroup row sx={{ mb: 3, px: 2 }}>
                {newbornAdvancedCare.map((care) => (
                    <FormControlLabel
                        key={care.id}
                        control={
                            <Checkbox
                                checked={data.nursing_skills_for_child.includes(
                                    care.care_name
                                )}
                                onChange={handleCheckboxChange(
                                    "nursing_skills_for_child",
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

            {/* Nanny Basic skills  */}
            <Subtitle>Skills for Nanny Basic care</Subtitle>
            <FormGroup row sx={{ mb: 3, px: 2 }}>
                {nannyBasicCare.map((care) => (
                    <FormControlLabel
                        key={care.id}
                        control={
                            <Checkbox
                                checked={data.nursing_skills_for_child.includes(
                                    care.care_name
                                )}
                                onChange={handleCheckboxChange(
                                    "nursing_skills_for_child",
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

            {/* Nanny Advanced skills  */}
            <Subtitle>Nursing Skills for Nanny Advanced care</Subtitle>
            <FormGroup row sx={{ mb: 3, px: 2 }}>
                {nannyAdvancedCare.map((care) => (
                    <FormControlLabel
                        key={care.id}
                        control={
                            <Checkbox
                                checked={data.nursing_skills_for_child.includes(
                                    care.care_name
                                )}
                                onChange={handleCheckboxChange(
                                    "nursing_skills_for_child",
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

export default ChildNursingSkillsForm;
