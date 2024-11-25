import AppLayout from "@/Layouts/AppLayout";
import { Head, router } from "@inertiajs/react";
import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import React, { useContext } from "react";
import babyPlaying from "../../../../public/images/babyCare/nanny.gif";
import babySleeping from "../../../../public/images/babyCare/newborn_nanny.gif";
import arrowDown from "../../../../public/images/right-down.svg"; // Adjust this path
import arrowUp from "../../../../public/images/right-up.svg"; // Adjust this path
import { CarePlanProvider } from "@/Context/CarePlanContext";
import MainTitle from "../CustomizedCare/components/MainTitle";
import Noodle from "@/Components/Fancy/Noodle";

function BabyCare({ carePlan }) {
    const handleNewbornStart = (service) => {
        router.get(route("care.newborn.start"));
    };
    const handleNannyStart = () => {
        router.get(route("nanny.options.choose"));
    };
    return (
        <AppLayout>
            <Head title="Baby care" />
            <CarePlanProvider carePlan={carePlan}>
                <Container maxWidth="md" sx={{ my: { xs: 0, sm: 3, md: 10 } }}>
                    <Box
                        sx={{
                            textAlign: "center",
                            my: 3,
                            position: "relative",
                        }}
                    >
                        <Box display={"inline-block"} position={"relative"}>
                            <MainTitle>Pick the care options!</MainTitle>
                            <Box
                                sx={{
                                    display: {
                                        xs: "none",
                                        sm: "flex",
                                        md: "flex",
                                    },
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

                    <Grid2 container sx={{ rowGap: 3 }}>
                        <Grid2
                            size={{ xs: 12, sm: 6 }}
                            sx={{
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 1,
                                px: { xs: 1, sm: 5 },
                                pt: { xs: 0, sm: 10 },
                            }}
                        >
                            {/* Description text */}
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontFamily: "Kavivanar",
                                    fontSize: 16,
                                }}
                            >
                                For infants under 1 year
                            </Typography>

                            {/* Curved Arrow */}
                            <Box
                                component="img"
                                src={arrowDown}
                                alt="Curved arrow down"
                                sx={{
                                    width: 30,
                                    ml: 10,
                                }}
                            />
                            <Button
                                sx={{
                                    bgcolor: "#f5f5f5",
                                    borderRadius: 20,
                                    boxShadow: 2,
                                }}
                                variant="contained"
                                onClick={() =>
                                    handleNewbornStart("Newborn Care")
                                }
                            >
                                <Typography
                                    sx={{
                                        color: "primary.main",
                                        fontFamily: "Karma",
                                        fontSize: 18,
                                        fontWeight: 400,
                                    }}
                                >
                                    Newborn Nanny
                                </Typography>
                            </Button>

                            {/* Green Box with Baby sleeping */}
                            <Box
                                sx={{
                                    width: "100%",
                                    height: 200,
                                    backgroundColor: "#2c7a57",
                                    borderRadius: 4,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    overflow: "hidden",
                                    mt: 2,
                                }}
                            >
                                <img
                                    src={babySleeping}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>
                            <Noodle bottom={0} left={-100} />
                        </Grid2>
                        <Grid2
                            size={{ xs: 12, sm: 6 }}
                            sx={{
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "flex-end",
                                gap: 1,
                                px: { xs: 1, sm: 5 },
                                pb: { xs: 5, sm: 10 },
                            }}
                        >
                            {/* Green Box with baby playing Gif */}
                            <Box
                                sx={{
                                    width: "100%",
                                    height: 200,
                                    backgroundColor: "#2c7a57",
                                    borderRadius: 4,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    overflow: "hidden",
                                    mb: 2,
                                }}
                            >
                                <img
                                    src={babyPlaying}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>
                            <Button
                                sx={{
                                    bgcolor: "#f5f5f5",
                                    borderRadius: 20,
                                    boxShadow: 2,
                                }}
                                variant="contained"
                                onClick={handleNannyStart}
                            >
                                <Typography
                                    sx={{
                                        color: "primary.main",
                                        fontFamily: "Karma",
                                        fontSize: 18,
                                        fontWeight: 400,
                                    }}
                                >
                                    Nanny
                                </Typography>
                            </Button>
                            {/* Curved Arrow */}
                            <Box
                                component="img"
                                src={arrowUp}
                                alt="Curved arrow up"
                                sx={{
                                    width: 30,
                                    mr: 3,
                                }}
                            />

                            {/* Description text */}
                            <Typography
                                sx={{
                                    fontFamily: "Kavivanar",
                                    fontSize: 16,
                                }}
                            >
                                For toddlers over 1 year
                            </Typography>

                            <Noodle top={0} right={-100} />
                        </Grid2>
                    </Grid2>
                </Container>
            </CarePlanProvider>
        </AppLayout>
    );
}

export default BabyCare;
