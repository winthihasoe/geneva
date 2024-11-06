import {
    Box,
    Checkbox,
    Divider,
    FormControlLabel,
    FormGroup,
    Grid2,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import ServiceTable from "@/Pages/Pricing/components/ServiceTable";
import Subtitle from "@/Components/Typo/Subtitle";
import Noodle from "@/Components/Fancy/Noodle";
import MainTitle from "@/Pages/CustomizedCare/components/MainTitle";

const Ages = ["< 30 years old", "> 30 years old", "It's okay, whatever!"];

const Religions = [
    "Buddhist",
    "Christian",
    "Islam",
    "Hinduism",
    "It's okay, whatever!",
];

const Nationalities = [
    "Myanmar",
    "Indonesian",
    "Filipino",
    "Thai",
    "It's okay, whatever!",
];

const Languages = [
    "Myanmar",
    "Myanmar & English",
    "Myanmar & Thai",
    "Myanmar, English & Thai",
    "It's okay, whatever!",
];

const Experiences = [
    "< 2 years",
    "> 2 years",
    "> 3 years",
    "> 5 years",
    "It's okay, whatever!",
];

const Communications = [
    "Daily updates on the baby’s routine and well-being",
    "Weekly check-ins or summary reports",
    "As-needed updates based on specific concerns",
];

function Preferences() {
    const [carePackage, setCarePackage] = useState("");
    const [duty, setDuty] = useState("");
    const handlePackage = (event) => {
        const value = event.target.value;
        setCarePackage(value);
        if (value == "Live-in") {
            setDuty("");
        }
    };
    return (
        <Box
            sx={{
                position: "relative",
                px: { xs: 1, sm: 5, md: 10 },
                maxWidth: 900,
                margin: "auto",
            }}
        >
            <Box textAlign="center">
                <Box display={"inline-block"} position={"relative"}>
                    <MainTitle>Nanny Preferences</MainTitle>
                    <Box
                        sx={{
                            display: { xs: "none", sm: "flex", md: "flex" },
                        }}
                    >
                        <img
                            src="/images/three_leaves.png"
                            alt="leaves"
                            style={{
                                width: 70,
                                position: "absolute",
                                top: -33,
                                left: -35,
                            }}
                        />
                    </Box>
                </Box>
            </Box>

            {/* Age Prefernces  */}
            <Box mb={3}>
                <Typography
                    sx={{
                        fontFamily: "Karma",
                        color: "primary.main",
                        fontSize: 30,
                    }}
                >
                    Age Preference
                </Typography>
                <RadioGroup row>
                    {Ages.map((age, index) => (
                        <FormControlLabel
                            key={index}
                            value={age}
                            control={<Radio size="small" />}
                            label={
                                <Typography
                                    sx={{
                                        fontFamily: "Karma",
                                        fontSize: {
                                            xs: 13,
                                            sm: 14,
                                            md: 16,
                                        },
                                    }}
                                >
                                    {age}
                                </Typography>
                            }
                        />
                    ))}
                </RadioGroup>
            </Box>

            {/* Religion  */}
            <Box mb={3}>
                <Typography
                    sx={{
                        fontFamily: "Karma",
                        color: "primary.main",
                        fontSize: 30,
                    }}
                >
                    Religion
                </Typography>
                <RadioGroup row>
                    {Religions.map((reg, index) => (
                        <FormControlLabel
                            key={index}
                            value={reg}
                            control={<Radio size="small" />}
                            label={
                                <Typography
                                    sx={{
                                        fontFamily: "Karma",
                                        fontSize: {
                                            xs: 13,
                                            sm: 14,
                                            md: 16,
                                        },
                                    }}
                                >
                                    {reg}
                                </Typography>
                            }
                        />
                    ))}
                </RadioGroup>
            </Box>

            {/* Nationality  */}
            <Box mb={3}>
                <Typography
                    sx={{
                        fontFamily: "Karma",
                        color: "primary.main",
                        fontSize: 30,
                    }}
                >
                    Nationality
                </Typography>
                <RadioGroup row>
                    {Nationalities.map((nationality, index) => (
                        <FormControlLabel
                            key={index}
                            value={nationality}
                            control={<Radio size="small" />}
                            label={
                                <Typography
                                    sx={{
                                        fontFamily: "Karma",
                                        fontSize: {
                                            xs: 13,
                                            sm: 14,
                                            md: 16,
                                        },
                                    }}
                                >
                                    {nationality}
                                </Typography>
                            }
                        />
                    ))}
                </RadioGroup>
            </Box>

            {/* Language Spoken  */}
            <Box mb={3}>
                <Typography
                    sx={{
                        fontFamily: "Karma",
                        color: "primary.main",
                        fontSize: 30,
                    }}
                >
                    Language Spoken
                </Typography>
                <RadioGroup row>
                    {Languages.map((lang, index) => (
                        <FormControlLabel
                            key={index}
                            value={lang}
                            control={<Radio size="small" />}
                            label={
                                <Typography
                                    sx={{
                                        fontFamily: "Karma",
                                        fontSize: {
                                            xs: 13,
                                            sm: 14,
                                            md: 16,
                                        },
                                    }}
                                >
                                    {lang}
                                </Typography>
                            }
                        />
                    ))}
                </RadioGroup>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Experiences  */}
            <Box mb={3}>
                <Typography
                    sx={{
                        fontFamily: "Karma",
                        color: "primary.main",
                        fontSize: 30,
                    }}
                >
                    Years of experiences
                </Typography>
                <RadioGroup row>
                    {Experiences.map((exp, index) => (
                        <FormControlLabel
                            key={index}
                            value={exp}
                            control={<Radio size="small" />}
                            label={
                                <Typography
                                    sx={{
                                        fontFamily: "Karma",
                                        fontSize: {
                                            xs: 13,
                                            sm: 14,
                                            md: 16,
                                        },
                                    }}
                                >
                                    {exp}
                                </Typography>
                            }
                        />
                    ))}
                </RadioGroup>
            </Box>

            {/* Communications  */}
            <Box mb={3}>
                <Typography
                    sx={{
                        fontFamily: "Karma",
                        color: "primary.main",
                        fontSize: 30,
                    }}
                >
                    Level of communication required
                </Typography>
                <RadioGroup row>
                    {Communications.map((commu, index) => (
                        <FormControlLabel
                            key={index}
                            value={commu}
                            control={<Radio size="small" />}
                            label={
                                <Typography
                                    sx={{
                                        fontFamily: "Karma",
                                        fontSize: {
                                            xs: 13,
                                            sm: 14,
                                            md: 16,
                                        },
                                    }}
                                >
                                    {commu}
                                </Typography>
                            }
                        />
                    ))}
                </RadioGroup>
            </Box>
            {/* right noodle  */}
            <Noodle top={0} right={-120} />

            {/* left noodle  */}
            <Noodle bottom={0} left={-120} />
        </Box>
    );
}

export default Preferences;
