import { router } from "@inertiajs/react";
import { Box, Button, Container, Grid, Grid2, Typography } from "@mui/material";
import React from "react";

function Hero() {
    return (
        <Box sx={{ bgcolor: "primary.main" }}>
            <Container maxWidth="lg" sx={{ padding: 0 }}>
                <Grid2
                    container
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        flexWrap: "wrap-reverse",
                        justifyContent: "center",
                    }}
                >
                    {/* Image Section */}
                    <Grid2
                        item
                        size={{ xs: 12, sm: 10, md: 6 }}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: { xs: 1, sm: 2 },
                            pt: { xs: 0, sm: 0, md: 8 },
                            pb: 8,
                            px: 1,
                        }}
                    >
                        {/* Maternal Care  */}
                        <Box
                            sx={{
                                width: { xs: 120, sm: 163 },
                                height: { xs: 280, sm: 350 },
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}
                        >
                            <img
                                src="/images/explore/maternal-care.jpg"
                                alt="maternal care"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: 100,
                                }}
                            />
                            <Typography
                                variant="h5"
                                fontFamily={"Roboto Slab"}
                                fontWeight={500}
                                color="white"
                                textAlign={"center"}
                                sx={{
                                    fontSize: { xs: "1.2rem", sm: "1.6rem" },
                                }}
                            >
                                Maternal <br />
                                Care
                            </Typography>
                        </Box>

                        {/* Baby care  */}
                        <Box
                            sx={{
                                width: { xs: 120, sm: 163 },
                                height: { xs: 280, sm: 350 },
                                display: "flex",

                                flexDirection: "column",
                                gap: 2,
                            }}
                        >
                            <img
                                src="/images/explore/baby-care.jpg"
                                alt="baby sitter"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: 100,
                                }}
                            />
                            <Typography
                                variant="h5"
                                fontFamily={"Roboto Slab"}
                                fontWeight={500}
                                color="white"
                                textAlign={"center"}
                                sx={{
                                    fontSize: { xs: "1.2rem", sm: "1.6rem" },
                                }}
                            >
                                Nanny <br />
                                Care
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                width: { xs: 120, sm: 163 },
                                height: { xs: 280, sm: 350 },
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}
                        >
                            <img
                                src="/images/register/two-caregivers.png"
                                alt="elder care"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: 100,
                                    backgroundColor: "white",
                                }}
                            />
                            <Typography
                                variant="h5"
                                fontFamily={"Roboto Slab"}
                                fontWeight={500}
                                color="white"
                                textAlign={"center"}
                                sx={{
                                    fontSize: { xs: "1.2rem", sm: "1.6rem" },
                                }}
                            >
                                Elderly <br />
                                Care
                            </Typography>
                        </Box>
                    </Grid2>
                    {/* Text ... */}
                    <Grid2
                        item
                        size={{ xs: 12, sm: 10, md: 6 }}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            px: { xs: 2, sm: 6, md: 5 },
                            py: { xs: 4, sm: 8 },
                            maxWidth: { xs: 450, sm: 600 },
                        }}
                    >
                        <Box>
                            <Typography variant="body2" color="white">
                                Not Just Care.
                                <br />A Plan Made Just for You.
                            </Typography>
                            <Typography
                                variant="h4"
                                fontFamily={"Roboto Slab"}
                                fontWeight={500}
                                color="white"
                            >
                                We are committed to
                                <br /> Quality Care
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="white">
                                “Personalised care starts with our expert
                                counselling to understand & meet each client’s
                                unique needs.”
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="body2" color="white" mb={2}>
                                We understand your unique needs through our
                                Custom Care Planning Session.
                            </Typography>
                        </Box>
                    </Grid2>
                </Grid2>
            </Container>
        </Box>
    );
}

export default Hero;
