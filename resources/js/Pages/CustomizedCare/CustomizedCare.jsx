import AppLayout from "@/Layouts/AppLayout";
import { Head, router, usePage } from "@inertiajs/react";
import {
    Box,
    Button,
    Container,
    Divider,
    Grid2,
    Typography,
} from "@mui/material";
import React from "react";

function CustomizedCare() {
    return (
        <AppLayout>
            <Head title="Choose Service" />
            <Box sx={{ bgcolor: "primary.main" }}>
                <Container maxWidth="lg" sx={{ px: 2, pt: 3, pb: 7 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            alignItems: "center",
                            gap: 2,
                            margin: "auto",
                            justifyContent: "center",
                            my: 3,
                        }}
                    >
                        <Typography
                            variant="h1"
                            sx={{
                                textAlign: "right",
                                color: "white",
                                pt: 3,
                                mb: 3,
                            }}
                        >
                            Customized <br />
                            Care Plans
                        </Typography>
                        <Divider
                            orientation="vertical"
                            sx={{
                                bgcolor: "white",
                            }}
                            flexItem
                        />
                        <Box sx={{ maxWidth: 400 }}>
                            <Typography variant="subtitle1" color="white">
                                Customized caregiver or nanny CVs will be
                                generated based on your specific requirements
                                once you have completely filled the requested
                                information.
                            </Typography>
                        </Box>
                    </Box>

                    <Grid2
                        container
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            gap: { xs: 3, sm: 2, md: 0 },

                            pb: 4,
                        }}
                    >
                        {/* Newboran Baby care  */}
                        <Grid2 size={{ xs: 10, sm: 5, md: 4 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                }}
                            >
                                {/* Contents and button  */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "10px",
                                        py: 3,
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography
                                        textAlign={"center"}
                                        variant="h4"
                                        color="white"
                                    >
                                        Newborn
                                        <br />
                                        Baby Care
                                    </Typography>
                                    <Typography
                                        textAlign={"center"}
                                        variant="subtitle1"
                                        color="white"
                                        maxWidth={"300px"}
                                    >
                                        Customize your care plan to your baby.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() =>
                                            router.get(route("care.baby.start"))
                                        }
                                    >
                                        Get Care Now
                                    </Button>
                                </Box>
                                {/* Green Box with Baby Video */}

                                <img
                                    src="/images/carePlan/baby_care.png"
                                    style={{
                                        width: "350px",
                                        height: "300px",
                                        objectFit: "cover",
                                        margin: "auto",
                                        borderRadius: "8px",
                                    }}
                                />
                            </Box>
                        </Grid2>

                        {/* Maternal Care  */}
                        <Grid2 size={{ xs: 10, sm: 5, md: 4 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                }}
                            >
                                {/* Contents and button  */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "10px",
                                        py: 3,
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography
                                        textAlign={"center"}
                                        variant="h4"
                                        color="white"
                                    >
                                        Maternal <br />
                                        Care
                                    </Typography>
                                    <Typography
                                        textAlign={"center"}
                                        variant="subtitle1"
                                        color="white"
                                        maxWidth={"300px"}
                                    >
                                        Customization the care plan for pregnant
                                        mother.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() =>
                                            router.get(
                                                route("care.maternal.start")
                                            )
                                        }
                                    >
                                        Get Care Now
                                    </Button>
                                </Box>
                                {/* Green Box with Baby Video */}

                                <img
                                    src="/images/carePlan/pregnancy_care.png"
                                    style={{
                                        width: "300px",
                                        height: "300px",
                                        objectFit: "cover",
                                        margin: "auto",
                                        borderRadius: "8px",
                                    }}
                                />
                            </Box>
                        </Grid2>
                        {/* Elder Care  */}
                        <Grid2 size={{ xs: 10, sm: 5, md: 4 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                }}
                            >
                                {/* Contents and button  */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "10px",
                                        py: 3,
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography
                                        textAlign={"center"}
                                        variant="h4"
                                        color="white"
                                    >
                                        Adult/Senior
                                        <br />
                                        Care
                                    </Typography>
                                    <Typography
                                        textAlign={"center"}
                                        variant="subtitle1"
                                        color="white"
                                        maxWidth={"300px"}
                                    >
                                        Customize the care plan for your loved
                                        one.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() =>
                                            router.get(
                                                route("care.elder.start")
                                            )
                                        }
                                    >
                                        Get Care Now
                                    </Button>
                                </Box>
                                {/* Green Box with Baby Video */}

                                <img
                                    src="/images/carePlan/elder_care.png"
                                    style={{
                                        width: "300px",
                                        height: "300px",
                                        objectFit: "cover",
                                        margin: "auto",
                                        borderRadius: "8px",
                                    }}
                                />
                            </Box>
                        </Grid2>
                    </Grid2>
                </Container>
            </Box>
        </AppLayout>
    );
}

export default CustomizedCare;
