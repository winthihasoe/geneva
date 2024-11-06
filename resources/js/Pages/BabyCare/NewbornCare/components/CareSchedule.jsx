import {
    Box,
    FormControlLabel,
    Grid2,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import MainTitle from "@/Pages/CustomizedCare/components/MainTitle";
import ServiceTable from "@/Pages/Pricing/components/ServiceTable";

function CareSchedule({ service }) {
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
                <Box
                    display={"inline-block"}
                    position={"relative"}
                    my={{ xs: 0, sm: 0, md: 2 }}
                >
                    <MainTitle>Care Schedule</MainTitle>
                    <Box
                        sx={{
                            display: {
                                xs: "none",
                                sm: "flex",
                                md: "flex",
                                position: "absolute",
                                top: -45,
                                left: -50,
                            },
                        }}
                    >
                        <img
                            src="/images/three_leaves.png"
                            alt="leaves"
                            style={{
                                width: 90,
                            }}
                        />
                    </Box>
                </Box>
            </Box>
            <Grid2 container p={{ xs: 1, sm: 2, md: 3 }} rowGap={3}>
                <Grid2
                    size={{ xs: 12, sm: 12 }}
                    sx={{
                        position: "relative",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 3,
                                    my: 1,
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: "Karma",
                                        fontSize: 18,
                                    }}
                                >
                                    Date of Birth
                                </Typography>
                                <TextField
                                    sx={{
                                        bgcolor: "#f5f5f5",
                                        borderRadius: 20,
                                        px: 1,
                                        width: 200,
                                    }}
                                    type="date"
                                />
                            </Box>
                            <Box my={2}>
                                <Typography
                                    sx={{
                                        fontFamily: "Karma",

                                        fontSize: 20,
                                    }}
                                >
                                    Choose package
                                </Typography>
                                <RadioGroup row onChange={handlePackage}>
                                    <FormControlLabel
                                        value="Live-out"
                                        control={<Radio size="small" />}
                                        label={
                                            <Typography
                                                sx={{
                                                    fontFamily: "Karma",

                                                    fontSize: 15,
                                                }}
                                            >
                                                Daytime Care (Live-out)
                                            </Typography>
                                        }
                                    />
                                    <FormControlLabel
                                        value="Live-in"
                                        control={<Radio size="small" />}
                                        label={
                                            <Typography
                                                sx={{
                                                    fontFamily: "Karma",

                                                    fontSize: 15,
                                                }}
                                            >
                                                24-Hour Care (Live-in)
                                            </Typography>
                                        }
                                    />
                                </RadioGroup>
                                {carePackage == "Live-out" && (
                                    <Box sx={{ pl: 3 }}>
                                        <Typography
                                            sx={{
                                                fontFamily: "Karma",

                                                fontSize: 15,
                                            }}
                                        >
                                            Select duty time
                                        </Typography>
                                        <RadioGroup row>
                                            <FormControlLabel
                                                value="7am - 5pm"
                                                control={<Radio size="small" />}
                                                label={
                                                    <Typography
                                                        sx={{
                                                            fontFamily: "Karma",

                                                            fontSize: 15,
                                                        }}
                                                    >
                                                        7am - 5pm
                                                    </Typography>
                                                }
                                            />
                                            <FormControlLabel
                                                value="8am - 6pm"
                                                control={<Radio size="small" />}
                                                label={
                                                    <Typography
                                                        sx={{
                                                            fontFamily: "Karma",

                                                            fontSize: 15,
                                                        }}
                                                    >
                                                        8am - 6pm
                                                    </Typography>
                                                }
                                            />
                                        </RadioGroup>
                                    </Box>
                                )}
                            </Box>
                            <Box my={2}>
                                <Typography
                                    sx={{
                                        fontFamily: "Karma",

                                        fontSize: 20,
                                    }}
                                >
                                    Choose care program duration
                                </Typography>
                                <RadioGroup row>
                                    <FormControlLabel
                                        value="3-months"
                                        control={<Radio size="small" />}
                                        label={
                                            <Typography
                                                sx={{
                                                    fontFamily: "Karma",

                                                    fontSize: 13,
                                                }}
                                            >
                                                3-months
                                            </Typography>
                                        }
                                    />
                                    <FormControlLabel
                                        value="6-months"
                                        control={<Radio size="small" />}
                                        label={
                                            <Typography
                                                sx={{
                                                    fontFamily: "Karma",

                                                    fontSize: 13,
                                                }}
                                            >
                                                6-months
                                            </Typography>
                                        }
                                    />
                                    <FormControlLabel
                                        value="1-year"
                                        control={<Radio size="small" />}
                                        label={
                                            <Typography
                                                sx={{
                                                    fontFamily: "Karma",

                                                    fontSize: 13,
                                                }}
                                            >
                                                1-year
                                            </Typography>
                                        }
                                    />
                                </RadioGroup>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: "none", sm: "none", md: "flex" },
                        }}
                    >
                        <img
                            src="/images/noodle.png"
                            alt="leaves"
                            style={{
                                width: 200,
                                position: "absolute",
                                bottom: 0,
                                right: -80,
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: { xs: "none", sm: "none", md: "flex" },
                            position: "absolute",
                            top: 0,
                            left: -30,
                        }}
                    >
                        <img
                            src="/images/babyCare/baby_box.png"
                            alt="leaves"
                            style={{
                                width: 300,
                            }}
                        />
                    </Box>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 12 }}>
                    <ServiceTable service={service} />
                </Grid2>
            </Grid2>
        </>
    );
}

export default CareSchedule;
