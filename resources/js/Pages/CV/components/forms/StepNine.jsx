import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Typography,
} from "@mui/material";
import React, { useContext } from "react";
import ElderNursingSkillsForm from "./ElderNursingSkillsForm";
import ChildNursingSkillsForm from "./ChildNursingSkillsForm";
import CvContext from "@/Context/CvContext";

const BasicElderSkills = [
    "Assistance with bathing, dressing, grooming, toileting",
    "Meal preparation and feeding support",
    "Mobility assistance (walking, transferring)",
    "Companionship and emotional support",
    "Light housekeeping and laundry",
    "Medication reminders and administration (Injections not included)",
    "Escorting to appointments or social activities",
];
const AdvancedElderSkills = [
    "Medication management and administration",
    "Vital signs monitoring",
    "Wound care and dressing changes",
    "Chronic disease management",
    "Pain management",
    "Oxygen Therapy",
    "Post-hospitalization or post-surgical care",
    "Ostomy and catheter care",
    "Tube feeding (enteral feeding)",
    "Catheter care",
    "Incontinence management",
    "Fall prevention monitoring",
    "Dementia and Alzheimer’s care",
    "Mental health monitoring",
    "Palliative and end-of-life care",
    "Medical equipment use and training",
    "Regular health assessments and reports",
    "Emergency response planning",
];

const BasicBabySkills = [
    "Breastfeeding support",
    "Diaper changing",
    "Bathing and baby hygiene",
    "Bottle feeding and burping",
    "Preparing baby formula",
    "Sterilizing bottles and utensils",
    "Putting baby to sleep (sleep routine support)",
    "Dressing the baby",
    "Light baby laundry",
    "Cleaning and organizing baby items",
    "Providing emotional comfort (talking, singing, playing)",
    "Monitoring baby's general behavior and mood",
    "Recording feeding and sleep times for parents",
];
const AdvancedBabySkills = [
    "Administering prescribed medications",
    "Monitoring vital signs (e.g. temperature, breathing)",
    "Tube feeding or special feeding methods (if required)",
    "Managing colic, reflux, or feeding difficulties",
    "Administering nebulizer treatments for respiratory conditions",
    "Managing seizure-prone or neurologically vulnerable babies",
    "Supporting babies with congenital conditions (e.g. cleft palate, heart conditions)",
    "Post-vaccination care and observation",
    "Infant CPR and emergency response",
    "Caring for premature babies or infants with special needs",
    "Assisting in developmental monitoring (milestones)",
    "Observing and reporting any health concerns to parents",
];

function StepNine() {
    const { data, handleChange } = useContext(CvContext);

    const handleCheckboxChange = (section, value) => (event) => {
        const newValues = event.target.checked
            ? [...data[section], value]
            : data[section].filter((item) => item !== value);
        handleChange(section)({ target: { value: newValues } });
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
            }}
        >
            {/* Elder Care Skills  */}
            <Box sx={{ width: 300 }}>
                <Typography variant="body1" fontWeight="bold" sx={{ mb: 2 }}>
                    Basic Skills (Elderly Care)
                </Typography>
                <FormGroup sx={{ mb: 3, px: 2 }}>
                    {BasicElderSkills.map((care) => (
                        <FormControlLabel
                            key={care}
                            control={
                                <Checkbox
                                    checked={data.nursing_skills_for_elder.includes(
                                        care
                                    )}
                                    onChange={handleCheckboxChange(
                                        "nursing_skills_for_elder",
                                        care
                                    )}
                                />
                            }
                            label={
                                <Typography fontSize={12}>{care}</Typography>
                            }
                        />
                    ))}
                </FormGroup>
                <Typography variant="body1" fontWeight="bold" sx={{ mb: 2 }}>
                    Advanced Skills (Elderly Care)
                </Typography>
                <FormGroup sx={{ mb: 3, px: 2 }}>
                    {AdvancedElderSkills.map((care) => (
                        <FormControlLabel
                            key={care}
                            control={
                                <Checkbox
                                    checked={data.nursing_skills_for_elder.includes(
                                        care
                                    )}
                                    onChange={handleCheckboxChange(
                                        "nursing_skills_for_elder",
                                        care
                                    )}
                                />
                            }
                            label={
                                <Typography fontSize={12}>{care}</Typography>
                            }
                        />
                    ))}
                </FormGroup>
            </Box>

            {/* Child Care Skills  */}
            <Box sx={{ width: 300 }}>
                <Typography variant="body1" fontWeight="bold" sx={{ mb: 2 }}>
                    Basic Skills (Baby Care)
                </Typography>
                <FormGroup sx={{ mb: 3, px: 2 }}>
                    {BasicBabySkills.map((care) => (
                        <FormControlLabel
                            key={care}
                            control={
                                <Checkbox
                                    checked={data.nursing_skills_for_child.includes(
                                        care
                                    )}
                                    onChange={handleCheckboxChange(
                                        "nursing_skills_for_child",
                                        care
                                    )}
                                />
                            }
                            label={
                                <Typography fontSize={12}>{care}</Typography>
                            }
                        />
                    ))}
                </FormGroup>

                {/* Adv Skills for baby care  */}
                <Typography variant="body1" fontWeight="bold" sx={{ mb: 2 }}>
                    Advanced Skills (Baby Care)
                </Typography>
                <FormGroup sx={{ mb: 3, px: 2 }}>
                    {AdvancedBabySkills.map((care) => (
                        <FormControlLabel
                            key={care}
                            control={
                                <Checkbox
                                    checked={data.nursing_skills_for_child.includes(
                                        care
                                    )}
                                    onChange={handleCheckboxChange(
                                        "nursing_skills_for_child",
                                        care
                                    )}
                                />
                            }
                            label={
                                <Typography fontSize={12}>{care}</Typography>
                            }
                        />
                    ))}
                </FormGroup>
            </Box>
        </Box>
    );
}

export default StepNine;
