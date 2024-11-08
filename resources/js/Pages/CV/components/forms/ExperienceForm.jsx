import React, { useContext, useState } from "react";
import {
    Box,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle";
import CvContext from "@/Context/CvContext";
import TinyText from "@/Components/Typo/TinyText";

const Years = [
    "More than 5 years",
    "More than 3 years",
    "More than 2 years",
    "Less than 2 years",
    "None",
];

const ExperienceForm = () => {
    const { data, handleChange } = useContext(CvContext);
    const Experiences = [
        {
            title: "Newborn Care (Baby age up to 12-months)",
            handleChange: "newborn_experience_years",
        },
        {
            title: "Nanny Care (Baby age from 1-year to 5-years)",
            handleChange: "nanny_experience_years",
        },
        {
            title: "Elder Care",
            handleChange: "elder_experience_years",
        },
    ];
    return (
        <Box sx={{ mb: 3 }}>
            <Box
                sx={{
                    my: 2,
                }}
            >
                <Subtitle>Years of Experience</Subtitle>

                {Experiences.map((experience, index) => (
                    <Box mt={2} key={index}>
                        <Typography
                            fontSize={15}
                            color="primary"
                            fontFamily={"Actor"}
                            fontWeight={800}
                        >
                            {experience.title}
                        </Typography>
                        <RadioGroup
                            row
                            value={data[experience.handleChange]}
                            onChange={handleChange(experience.handleChange)}
                        >
                            {Years.map((year, index) => (
                                <FormControlLabel
                                    key={index}
                                    value={year}
                                    control={<Radio />}
                                    label={
                                        <Typography
                                            fontSize={13}
                                            fontFamily={"Livvic"}
                                        >
                                            {year}
                                        </Typography>
                                    }
                                />
                            ))}
                        </RadioGroup>
                    </Box>
                ))}
                <Box sx={{ margin: "10px auto" }}>
                    <Subtitle>Detail Experience to show in CV</Subtitle>
                    <TextField
                        size="small"
                        placeholder="With 2 years of experience in elder senior care..."
                        multiline
                        value={data.detail_experience}
                        onChange={handleChange("detail_experience")}
                        fullWidth
                        inputProps={{ maxLength: 500 }}
                    />
                    <TinyText>Only 500 words</TinyText>
                </Box>
            </Box>
        </Box>
    );
};

export default ExperienceForm;
