import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { Box, Container, Grid2 } from "@mui/material";
import React, { useContext } from "react";

import { CarePlanProvider } from "@/Context/CarePlanContext";
import StartBabyCare from "./components/StartBabyCare";

function BabyCare({ carePlan }) {
    return (
        <AppLayout>
            <Head title="Baby care" />
            <CarePlanProvider carePlan={carePlan}>
                <Box sx={{ bgcolor: "primary.main" }}>
                    <Container maxWidth="lg">
                        <Grid2
                            container
                            sx={{
                                py: 5,
                                justifyContent: "center",
                            }}
                            spacing={1}
                        >
                            <Grid2 size={{ xs: 0, sm: 0, md: 6 }}>
                                <img
                                    src="/images/carePlan/baby_care.png"
                                    alt="Baby Care"
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
                                    <StartBabyCare />
                                </Box>
                            </Grid2>
                        </Grid2>
                    </Container>
                </Box>
            </CarePlanProvider>
        </AppLayout>
    );
}

export default BabyCare;
