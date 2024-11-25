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
import React, { useContext, useState } from "react";
import Subtitle from "@/Components/Typo/Subtitle";
import MainTitle from "@/Pages/CustomizedCare/components/MainTitle";
import Noodle from "@/Components/Fancy/Noodle";
import { CarePlanContext } from "@/Context/CarePlanContext";

// For Elder Care
function ChooseSkills({ advSkills, basicSkills }) {
    const { carePlanData, updateCarePlan } = useContext(CarePlanContext);

    const handleCheckboxChange = (section, value) => (event) => {
        const newValues = event.target.checked
            ? [...carePlanData[section], value]
            : carePlanData[section].filter((item) => item !== value);
        updateCarePlan(section, newValues);
    };

    return (
        <Box position={"relative"}>
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
                p={{ xs: 1, sm: 2, md: 2 }}
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
                    <Box sx={{ maxWidth: 400 }}>
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
                            {basicSkills.map((skill) => (
                                <FormControlLabel
                                    key={skill}
                                    control={
                                        <Checkbox
                                            checked={carePlanData.services.includes(
                                                skill
                                            )}
                                            onChange={handleCheckboxChange(
                                                "services",
                                                skill
                                            )}
                                        />
                                    }
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

                    <Noodle bottom={300} left={-30} />
                </Grid2>
                <Grid2
                    size={{ xs: 12, sm: 12, md: 6 }}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        position: "relative",
                    }}
                >
                    <Noodle top={0} right={10} />
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
                            {advSkills.map((skill) => (
                                <FormControlLabel
                                    key={skill}
                                    control={
                                        <Checkbox
                                            checked={carePlanData.services.includes(
                                                skill
                                            )}
                                            onChange={handleCheckboxChange(
                                                "services",
                                                skill
                                            )}
                                        />
                                    }
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
        </Box>
    );
}

export default ChooseSkills;
