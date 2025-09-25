import AppLayout from "@/Layouts/AppLayout";
import { Head, router } from "@inertiajs/react";
import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import React, { useContext } from "react";

import { CarePlanProvider } from "@/Context/CarePlanContext";
import StartMaternalCare from "./components/StartMaternalCare";

function MaternalCare({ carePlan }) {
    return (
        <AppLayout>
            <Head title="Maternal care" />
            <CarePlanProvider carePlan={carePlan}>
                <Box sx={{ bgcolor: "primary.main" }}>
                    <Container maxWidth="lg">
                        <Grid2
                            container
                            sx={{
                                py: 5,
                                justifyContent: "center",
                            }}
                        >
                            <Grid2 size={{ xs: 0, sm: 0, md: 6 }}>
                                <img
                                    src="/images/carePlan/pregnancy_care.png"
                                    alt="Maternal Care"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        borderRadius: 8,
                                        margin: "20px auto",
                                        opacity: 0.9,
                                    }}
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 10, md: 6 }}>
                                <Box sx={{ maxWidth: 500, margin: "auto" }}>
                                    <StartMaternalCare />
                                </Box>
                            </Grid2>
                        </Grid2>
                    </Container>
                </Box>
            </CarePlanProvider>
        </AppLayout>
    );
}

export default MaternalCare;
