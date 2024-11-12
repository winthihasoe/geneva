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
import React, { useContext, useState } from "react";
import ServiceTable from "@/Pages/Pricing/components/ServiceTable";
import Subtitle from "@/Components/Typo/Subtitle";
import Noodle from "@/Components/Fancy/Noodle";
import MainTitle from "@/Pages/CustomizedCare/components/MainTitle";
import { CarePlanContext } from "@/Context/CarePlanContext";

const Ages = ["< 30 years old", "> 30 years old", "It's okay, whatever!"];

const Religions = [
    "Buddhist",
    "Christian",
    "Islam",
    "Hinduism",
    "It's okay, whatever!",
];

const Nationalities = [
    "Thailand",
    "Myanmar",
    "Laos",
    "Indonesian",
    "Filipino",
    "Indian",
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
    "More than 5 years",
    "More than 3 years",
    "More than 2 years",
    "Less than 2 years",
    "It's okay, whatever!",
];

const Communications = [
    "Daily updates on the baby’s routine and well-being",
    "Weekly check-ins or summary reports",
    "As-needed updates based on specific concerns",
];

function Preferences() {
    const { carePlanData, updateNestedField, updateCarePlan } =
        useContext(CarePlanContext);

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
                        fontSize: { xs: 20, sm: 25, md: 30 },
                    }}
                >
                    Age Preference
                </Typography>
                <RadioGroup
                    row
                    value={carePlanData.preferences.age}
                    onChange={(e) =>
                        updateNestedField("preferences", "age", e.target.value)
                    }
                >
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
                        fontSize: { xs: 20, sm: 25, md: 30 },
                    }}
                >
                    Religion
                </Typography>
                <RadioGroup
                    row
                    value={carePlanData.preferences.religion}
                    onChange={(e) =>
                        updateNestedField(
                            "preferences",
                            "religion",
                            e.target.value
                        )
                    }
                >
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
                                        mr: 4,
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
                        fontSize: { xs: 20, sm: 25, md: 30 },
                    }}
                >
                    Nationality
                </Typography>
                <RadioGroup
                    row
                    value={carePlanData.preferences.nationality}
                    onChange={(e) =>
                        updateNestedField(
                            "preferences",
                            "nationality",
                            e.target.value
                        )
                    }
                >
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
                                        mr: 4,
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
                        fontSize: { xs: 20, sm: 25, md: 30 },
                    }}
                >
                    Language Spoken
                </Typography>
                <RadioGroup
                    row
                    value={carePlanData.preferred_language}
                    onChange={(e) =>
                        updateCarePlan("preferred_language", e.target.value)
                    }
                >
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
                                        mr: 4,
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
                        fontSize: { xs: 20, sm: 25, md: 30 },
                    }}
                >
                    Years of experiences
                </Typography>
                <RadioGroup
                    row
                    value={carePlanData.preferences.experience}
                    onChange={(e) =>
                        updateNestedField(
                            "preferences",
                            "experience",
                            e.target.value
                        )
                    }
                >
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
                                        mr: 4,
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
                        fontSize: { xs: 20, sm: 25, md: 30 },
                    }}
                >
                    Level of communication required
                </Typography>
                <RadioGroup
                    row
                    value={carePlanData.preferences.communication}
                    onChange={(e) =>
                        updateNestedField(
                            "preferences",
                            "communication",
                            e.target.value
                        )
                    }
                >
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
                                        mr: 4,
                                    }}
                                >
                                    {commu}
                                </Typography>
                            }
                        />
                    ))}
                </RadioGroup>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box>
                <Typography
                    sx={{
                        fontFamily: "Karma",
                        color: "primary.main",
                        fontWeight: "bold",
                        fontSize: { xs: 20, sm: 25, md: 30 },
                    }}
                >
                    Additional instructions you want to give to a Nanny
                </Typography>
                <TextField
                    multiline
                    fullWidth
                    value={carePlanData.additional_notes || ""}
                    onChange={(e) =>
                        updateCarePlan("additional_notes", e.target.value)
                    }
                />
            </Box>

            {/* right noodle  */}
            <Noodle top={0} right={-10} />

            {/* left noodle  */}
            <Noodle bottom={0} left={-10} />
        </Box>
    );
}

export default Preferences;
