import AppLayout from "@/Layouts/AppLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import React from "react";
import babyVideoSrc from "../../../../public/images/babyCare/baby.gif";
import elderVideoSrc from "../../../../public/images/elderCare/two_elder.gif";
import MainTitle from "./components/MainTitle";
import Noodle from "@/Components/Fancy/Noodle";
import Title from "@/Components/Typo/Title";
import MyCarePlans from "./components/MyCarePlans";

function CustomizedCare() {
    const carePlans = usePage().props.carePlans;
    return (
        <AppLayout>
            <Head title="Customize care" />
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
                        <Button
                            sx={{
                                bgcolor: "#f5f5f5",
                                borderRadius: 20,
                                boxShadow: 2,
                            }}
                            variant="contained"
                            onClick={() => router.get(route("care.baby.start"))}
                        >
                            <Typography
                                sx={{
                                    color: "primary.main",
                                    fontFamily: "Karma",
                                    fontSize: 18,
                                    fontWeight: 400,
                                }}
                            >
                                Baby Care
                            </Typography>
                        </Button>

                        {/* Green Box with Baby Video */}
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
                                src={babyVideoSrc}
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
                            alignItems: "center",
                            gap: 1,
                            px: { xs: 1, sm: 5 },
                            pb: { xs: 5, sm: 10 },
                        }}
                    >
                        {/* Green Box with elder Video */}
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
                                src={elderVideoSrc}
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
                        >
                            <Typography
                                sx={{
                                    color: "primary.main",
                                    fontFamily: "Karma",
                                    fontSize: 18,
                                    fontWeight: 400,
                                }}
                            >
                                Elder Care
                            </Typography>
                        </Button>

                        <Noodle top={0} right={-100} />
                    </Grid2>
                </Grid2>
                {carePlans && carePlans.length > 0 && (
                    <MyCarePlans carePlans={carePlans} />
                )}
            </Container>
        </AppLayout>
    );
}

export default CustomizedCare;
