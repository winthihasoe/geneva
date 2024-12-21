import PolygonDotted from "@/Components/Fancy/PolygonDotted";
import ShapeCamel from "@/Components/Fancy/ShapeCamel";
import ThreeArrows from "@/Components/Fancy/ThreeArrows";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { Box, Container, Grid2, Typography } from "@mui/material";
import React from "react";
import SuperNewborn from "./components/SuperNewborn";
import NewbornNanny from "./components/NewbornNanny";
import SuperNanny from "./components/SuperNanny";
import Nanny from "./components/Nanny";
import AdvancedCaregiver from "./components/AdvancedCaregiver";
import Caregiver from "./components/Caregiver";

function Team() {
    return (
        <AppLayout>
            <Head title="Care Philosophy" />
            <Box position={"relative"}>
                <Container
                    maxWidth="lg"
                    sx={{ position: "relative", zIndex: -1000 }}
                >
                    <ThreeArrows top={0} left={0} />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 15,
                            py: { xs: 3, sm: 4, md: 10 },
                        }}
                    >
                        <Typography
                            fontSize={{ xs: 30, sm: 50, md: 70 }}
                            fontFamily={"Lilita One"}
                            fontWeight={400}
                            color="primary"
                            sx={{
                                border: "1px solid #000",
                                borderRadius: 5,
                                bgcolor: "#fff",
                                textAlign: "center",
                                px: 4,
                                boxShadow: 3,
                            }}
                        >
                            Team Introduction
                        </Typography>
                    </Box>
                    <Grid2
                        container
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Grid2
                            size={{
                                xs: 12,
                                sm: 3,
                            }}
                            sx={{
                                display: "flex",
                                justifyContent: {
                                    xs: "center",
                                    sm: "flex-start",
                                },
                            }}
                        >
                            <Box
                                component="img"
                                src="/images/team/cg.png"
                                alt="Caregiver"
                                sx={{
                                    width: 220,
                                    mb: { xs: 0, sm: -6 },
                                }}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 8 }}>
                            <Typography
                                fontSize={{ xs: 25, sm: 30, md: 38 }}
                                fontFamily={"Lilita One"}
                            >
                                "Our medical doctors serve as{" "}
                                <span style={{ color: "#21875C" }}>
                                    operational leads
                                </span>
                                , overseeing{" "}
                                <span style={{ color: "#21875C" }}>
                                    care planning
                                </span>{" "}
                                to ensure that both infants and older adults
                                receive the specialized support and attention
                                they need."
                            </Typography>
                        </Grid2>
                    </Grid2>
                </Container>

                <Box
                    component="img"
                    src="/images/team/curved.png"
                    alt="Caregiver"
                    sx={{ width: "100%", zIndex: 1000 }}
                />
                <Box sx={{ bgcolor: "primary.main", mt: -4 }}>
                    <Container maxWidth="lg" sx={{ pb: 5 }}>
                        <SuperNewborn />
                        <NewbornNanny />

                        <Box textAlign={"right"}>
                            <Box
                                component="img"
                                src="/images/team/breeze.png"
                                alt="Caregiver"
                                sx={{
                                    width: "80%",
                                    borderRadius: 10,
                                }}
                            />
                        </Box>

                        <SuperNanny />
                        <Nanny />

                        <Box textAlign={"right"}>
                            <Box
                                component="img"
                                src="/images/team/breeze.png"
                                alt="Caregiver"
                                sx={{
                                    width: "80%",
                                    borderRadius: 10,
                                }}
                            />
                        </Box>

                        <AdvancedCaregiver />
                        <Caregiver />
                    </Container>
                </Box>

                <PolygonDotted top={"35%"} right={0} />
            </Box>
        </AppLayout>
    );
}

export default Team;
