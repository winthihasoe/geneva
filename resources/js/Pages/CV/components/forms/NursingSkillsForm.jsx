import React from "react";
import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Typography,
} from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle";

const elderNursingSkills = [
    "Transferring",
    "Showering",
    "Changing Diaper",
    "Monitoring Vital Signs",
    "Conduct Physical Exercise",
    "Bed Sponging",
    "Bedsores",
    "Special Meal Preparation",
    "NGT Feeding",
    "PEG Tube Feeding",
    "Urinary Catheter",
    "Stoma Bag",
    "Wound Dressing",
    "Medication Management",
    "Airway Suctioning",
    "Blood Glucose Monitoring",
    "Insulin Injection",
    "Tracheostomy Care",
    "First Aid",
];

const childNursingSkills = [
    "Bottle preparation and feeding",
    "Breastfeeding support",
    "Burping techniques",
    "Diaper changing",
    "Bathing skills",
    "Umbilical cord care",
    "Soothing techniques",
    "Establishing sleep routines",
    "Recognizing illness symptoms",
    "Handling emergency",
    "Monitoring growth and milestones",
    "Parent communication and support",
    "Behavior management and discipline",
    "First aid and CPR",
    "Weaning diet",
    "Potty training",
    "Structured play and learning activities",
    "Language development",
];

const diagnosis = [
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

const NursingSkillsForm = ({ data, handleChange }) => {
    const handleCheckboxChange = (section, value) => (event) => {
        const newValues = event.target.checked
            ? [...data[section], value]
            : data[section].filter((item) => item !== value);
        handleChange(section)({ target: { value: newValues } });
    };

    return (
        <Box sx={{ mb: 3 }}>
            {/* Skill for elder care  */}
            <Subtitle>Nursing Skills for Senior care</Subtitle>
            <FormGroup row sx={{ mb: 3, px: 2 }}>
                {elderNursingSkills.map((skill) => (
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
            </FormGroup>

            {/* Child care skills  */}
            <Subtitle>Nursing Skills for Baby care</Subtitle>
            <FormGroup row sx={{ mb: 3, px: 2 }}>
                {childNursingSkills.map((skill) => (
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
            </FormGroup>
        </Box>
    );
};

export default NursingSkillsForm;
