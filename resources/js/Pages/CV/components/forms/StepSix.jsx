import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    TextField,
    Typography,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormGroup,
    Checkbox,
} from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle";
import CvContext from "@/Context/CvContext";
import TinyText from "@/Components/Typo/TinyText";
import ProfileUploadForm from "./ProfileUploadForm";

const Personality = ["Gentle & Patient", "Active & Energetic", "Calm & Quiet"];
const Services = ["Elder Care", "Newborn & Baby Care", "Maternal Care"];

// Experience years options
const ExperienceYears = [
    "Less than 1 year",
    "1-3 years",
    "More than 3 years",
    "More than 10 years",
];

const StepSix = () => {
    const { data, handleChange } = useContext(CvContext);
    const handleCheckboxChange = (section, value) => (event) => {
        const newValues = event.target.checked
            ? [...data[section], value]
            : data[section].filter((item) => item !== value);
        handleChange(section)({ target: { value: newValues } });
    };

    return (
        <Box sx={{ margin: "auto", maxWidth: 500 }}>
            <FormControl
                component="fieldset"
                sx={{
                    mb: 3,
                }}
            >
                <Typography variant="subtitle1" fontWeight="bold">
                    Personality
                </Typography>

                <RadioGroup
                    row
                    value={data.personality}
                    onChange={handleChange("personality")}
                >
                    {Personality.map((personality) => (
                        <FormControlLabel
                            key={personality}
                            value={personality}
                            control={<Radio />}
                            label={
                                <Typography fontSize={12}>
                                    {personality}
                                </Typography>
                            }
                        />
                    ))}
                </RadioGroup>
            </FormControl>
            <Box mb={3}>
                <Typography variant="subtitle1" fontWeight="bold">
                    Care Specializations (Choose all that applied)
                </Typography>

                <FormGroup row sx={{ px: 2 }}>
                    {Services.map((service) => (
                        <FormControlLabel
                            key={service}
                            control={
                                <Checkbox
                                    checked={data.services.includes(service)}
                                    onChange={handleCheckboxChange(
                                        "services",
                                        service
                                    )}
                                />
                            }
                            label={
                                <Typography fontSize={12}>{service}</Typography>
                            }
                        />
                    ))}
                </FormGroup>
            </Box>

            {/* Home Care Experience Years */}
            <Box mb={4}>
                <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                    Home Care Experience Years
                </Typography>

                {/* Elder Care Experience */}
                <Box mb={3}>
                    <Typography variant="body2" mb={1}>
                        Elder Care
                    </Typography>
                    <FormControl component="fieldset">
                        <RadioGroup
                            row
                            value={data.elder_experience_years || ""}
                            onChange={handleChange("elder_experience_years")}
                        >
                            {ExperienceYears.map((years) => (
                                <FormControlLabel
                                    key={years}
                                    value={years}
                                    control={<Radio />}
                                    label={
                                        <Typography fontSize={11}>
                                            {years}
                                        </Typography>
                                    }
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Box>

                {/* Newborn Care Experience */}
                <Box mb={3}>
                    <Typography variant="body2" mb={1}>
                        Newborn Care
                    </Typography>
                    <FormControl component="fieldset">
                        <RadioGroup
                            row
                            value={data.newborn_experience_years || ""}
                            onChange={handleChange("newborn_experience_years")}
                        >
                            {ExperienceYears.map((years) => (
                                <FormControlLabel
                                    key={years}
                                    value={years}
                                    control={<Radio />}
                                    label={
                                        <Typography fontSize={11}>
                                            {years}
                                        </Typography>
                                    }
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Box>

                {/* Maternal Care Experience */}
                <Box mb={3}>
                    <Typography variant="body2" mb={1}>
                        Maternal Care
                    </Typography>
                    <FormControl component="fieldset">
                        <RadioGroup
                            row
                            value={data.nanny_experience_years || ""}
                            onChange={handleChange("nanny_experience_years")}
                        >
                            {ExperienceYears.map((years) => (
                                <FormControlLabel
                                    key={years}
                                    value={years}
                                    control={<Radio />}
                                    label={
                                        <Typography fontSize={11}>
                                            {years}
                                        </Typography>
                                    }
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    );
};

export default StepSix;
