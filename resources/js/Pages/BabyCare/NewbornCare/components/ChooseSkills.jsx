import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid2,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import Subtitle from "@/Components/Typo/Subtitle";
import MainTitle from "@/Pages/CustomizedCare/components/MainTitle";

const BasicCare = [
    "Bottle-feeding",
    "Breastfeeding",
    "Bathing & Grooming",
    "Diapering & Hygiene",
    "Sleep Routines & Soothing",
    "Tummy time & Gentle playing",
    "Emotional Comforting (example: holding, rocking & gentle interaction)",
    "Monitoring Vital Signs",
    "Routine Care Log (Docummenting daily activities such as feeding, sleeping & etc)",
];

const AdvancedCare = [
    "Early development assessments",
    "Activities for motor & sensory development",
    "Colic & reflux management",
    "Medication administration",
    "Respiratory support (assisting with nebulizer & oxygen therapy)",
    "Feeding tube management",
    "Care for premature infants",
    "Blood sugar monitoring",
    "Jaundice management",
    "Vital Signs monitoring & reporting",
    "Seizures care & monitoring",
    "Infant CPR & First Aid Readiness",
    "Emergency Preparedness and Care Planning",
];

function ChooseSkills() {
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
        <>
            <Box textAlign="center">
                <Box display={"inline-block"} position={"relative"}>
                    <MainTitle>Choose Your Needed Services</MainTitle>
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
            <Grid2
                container
                p={{ xs: 1, sm: 2, md: 3 }}
                rowGap={3}
                columnGap={2}
                display={"flex"}
                alignItems={"flex-start"}
                justifyContent={"center"}
            >
                <Grid2
                    size={{ xs: 12, sm: 12, md: 4 }}
                    sx={{
                        position: "relative",
                        display: "flex",
                        justifyContent: {
                            xs: "center",
                            sm: "center",
                            md: "flex-start",
                        },
                        alignItems: {
                            xs: "center",
                            sm: "center",
                            md: "flex-start",
                        },
                        flexDirection: "column",
                    }}
                >
                    <Box>
                        <Subtitle>
                            Essential Daily needs &{" "}
                            <span
                                style={{
                                    color: "#21875C",
                                    fontSize: 32,
                                    fontFamily: "Kavoon",
                                    fontWeight: "400",
                                    wordWrap: "break-word",
                                }}
                            >
                                B
                            </span>
                            asic Care
                        </Subtitle>
                        <FormGroup
                            row
                            sx={{
                                mb: 3,
                                px: 2,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {BasicCare.map((skill) => (
                                <FormControlLabel
                                    key={skill}
                                    control={<Checkbox />}
                                    label={
                                        <Typography
                                            sx={{
                                                fontSize: {
                                                    xs: 13,
                                                    sm: 15,
                                                    md: 18,
                                                },
                                                fontFamily: "Karma",
                                            }}
                                        >
                                            {skill}
                                        </Typography>
                                    }
                                    sx={{ width: 280 }}
                                />
                            ))}
                        </FormGroup>
                    </Box>

                    <Box
                        sx={{
                            display: { xs: "none", sm: "none", md: "flex" },
                            position: "absolute",
                            bottom: 300,
                            left: -120,
                        }}
                    >
                        <img
                            src="/images/noodle.png"
                            alt="leaves"
                            style={{
                                width: 200,
                            }}
                        />
                    </Box>
                    <img
                        src="/images/babyCare/baby_growth.png"
                        alt="leaves"
                        style={{
                            minWidth: 280,
                            maxWidth: 500,
                            height: 200,
                            objectFit: "cover",
                        }}
                    />
                </Grid2>
                <Grid2
                    size={{ xs: 12, sm: 12, md: 6 }}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        position: "relative",
                    }}
                >
                    <Box
                        sx={{
                            display: { xs: "none", sm: "none", md: "flex" },
                            position: "absolute",
                            top: 0,
                            right: -120,
                        }}
                    >
                        <img
                            src="/images/noodle.png"
                            alt="leaves"
                            style={{
                                width: 200,
                            }}
                        />
                    </Box>
                    <Box>
                        <Subtitle>
                            <span
                                style={{
                                    color: "#21875C",
                                    fontSize: 32,
                                    fontFamily: "Kavoon",
                                    fontWeight: "400",
                                    wordWrap: "break-word",
                                }}
                            >
                                A
                            </span>
                            dvanced Care & Medical Support
                        </Subtitle>
                        <FormGroup
                            row
                            sx={{
                                mb: 3,
                                px: 2,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {AdvancedCare.map((skill) => (
                                <FormControlLabel
                                    key={skill}
                                    control={<Checkbox />}
                                    label={
                                        <Typography
                                            sx={{
                                                fontSize: {
                                                    xs: 13,
                                                    sm: 15,
                                                    md: 18,
                                                },
                                                fontFamily: "Karma",
                                            }}
                                        >
                                            {skill}
                                        </Typography>
                                    }
                                    sx={{ width: 280 }}
                                />
                            ))}
                        </FormGroup>
                    </Box>
                </Grid2>
            </Grid2>
        </>
    );
}

export default ChooseSkills;
