import {
    Box,
    FormControlLabel,
    Grid2,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import MainTitle from "@/Pages/CustomizedCare/components/MainTitle";
import ServiceTable from "@/Pages/Pricing/components/ServiceTable";
import Noodle from "@/Components/Fancy/Noodle";
import { CarePlanContext } from "@/Context/CarePlanContext";

function CareSchedule({ service }) {
    const { carePlanData, updateCarePlan, updateNestedField } =
        useContext(CarePlanContext);

    const [showDutyTime, setShowDutyTime] = useState(false);
    const handlePackage = (event) => {
        updateNestedField("schedule", "package", event.target.value);
        if (event.target.value == "Live-out") {
            setShowDutyTime(true);
        } else {
            setShowDutyTime(false);
            updateNestedField("schedule", "duty_time", "");
        }
    };
    return (
        <>
            <Grid2
                container
                position={"relative"}
                p={{ xs: 1, sm: 2, md: 3 }}
                rowGap={5}
            >
                <Grid2
                    size={{ xs: 12, sm: 12, md: 6 }}
                    sx={{
                        position: "relative",
                    }}
                >
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
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            {/* Start date  */}
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
                                    Start Date
                                </Typography>
                                <TextField
                                    sx={{
                                        bgcolor: "#f5f5f5",
                                        borderRadius: 20,
                                        px: 1,
                                        width: 200,
                                    }}
                                    type="date"
                                    value={carePlanData.start_date}
                                    onChange={(e) =>
                                        updateCarePlan(
                                            "start_date",
                                            e.target.value
                                        )
                                    }
                                />
                            </Box>

                            <Box my={4}>
                                <Typography
                                    sx={{
                                        fontFamily: "Karma",
                                        fontSize: { xs: 20, sm: 25 },
                                        fontWeight: "bold",
                                        color: "primary.main",
                                    }}
                                >
                                    Choose Care timing
                                </Typography>
                                <RadioGroup
                                    row
                                    onChange={(e) => handlePackage(e)}
                                    value={carePlanData.schedule.package}
                                >
                                    <FormControlLabel
                                        value="Live-out"
                                        control={<Radio size="small" />}
                                        label={
                                            <Typography
                                                sx={{
                                                    fontFamily: "Karma",
                                                    fontSize: {
                                                        xs: 15,
                                                        sm: 20,
                                                    },
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

                                                    fontSize: {
                                                        xs: 15,
                                                        sm: 20,
                                                    },
                                                }}
                                            >
                                                24-Hour Care (Live-in)
                                            </Typography>
                                        }
                                    />
                                </RadioGroup>

                                {showDutyTime && (
                                    <Box sx={{ pl: 3 }}>
                                        <RadioGroup
                                            row
                                            value={
                                                carePlanData.schedule.duty_time
                                            }
                                            onChange={(e) =>
                                                updateNestedField(
                                                    "schedule",
                                                    "duty_time",
                                                    e.target.value
                                                )
                                            }
                                        >
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
                                        fontSize: { xs: 20, sm: 25 },
                                        fontWeight: "bold",
                                        color: "primary.main",
                                    }}
                                >
                                    Choose care program duration
                                </Typography>
                                <RadioGroup
                                    row
                                    value={carePlanData.duration}
                                    onChange={(e) =>
                                        updateCarePlan(
                                            "duration",
                                            e.target.value
                                        )
                                    }
                                >
                                    <FormControlLabel
                                        value={3}
                                        control={<Radio size="small" />}
                                        label={
                                            <Typography
                                                sx={{
                                                    fontFamily: "Karma",

                                                    fontSize: 13,
                                                }}
                                            >
                                                3-month
                                            </Typography>
                                        }
                                    />
                                    <FormControlLabel
                                        value={6}
                                        control={<Radio size="small" />}
                                        label={
                                            <Typography
                                                sx={{
                                                    fontFamily: "Karma",

                                                    fontSize: 13,
                                                }}
                                            >
                                                6-month
                                            </Typography>
                                        }
                                    />
                                    <FormControlLabel
                                        value={1}
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
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
                    <MainTitle>Pricing Detail</MainTitle>
                    <Box sx={{ mt: -3 }}>
                        <ServiceTable service={service} />
                    </Box>
                </Grid2>
                <Noodle bottom={0} left={0} />
            </Grid2>
        </>
    );
}

export default CareSchedule;
