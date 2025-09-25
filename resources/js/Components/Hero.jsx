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
                    }}
                >
                    {/* Image Section */}
                    <Grid2
                        item
                        size={{ xs: 12, sm: 6 }}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: { xs: 1, sm: 2 },
                            py: { xs: 4, sm: 8 },
                        }}
                    >
                        {/* Maternal Care  */}
                        <Box
                            sx={{
                                width: { xs: 120, sm: 163 },
                                height: { xs: 350, sm: 400 },

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
                                fontFamily={"Righteous"}
                                fontWeight={500}
                                color="white"
                                textAlign={"center"}
                            >
                                Maternal <br />
                                Care
                            </Typography>
                        </Box>

                        {/* Baby care  */}
                        <Box
                            sx={{
                                width: { xs: 120, sm: 163 },
                                height: { xs: 350, sm: 400 },
                                display: "flex",
                                marginTop: 5,
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
                                fontFamily={"Righteous"}
                                fontWeight={500}
                                color="white"
                                textAlign={"center"}
                            >
                                Nanny <br />
                                Care
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                width: { xs: 120, sm: 163 },
                                height: { xs: 350, sm: 400 },
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}
                        >
                            <img
                                src="/images/explore/elder-care.jpg"
                                alt="elder care"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: 100,
                                }}
                            />
                            <Typography
                                variant="h5"
                                fontFamily={"Righteous"}
                                fontWeight={500}
                                color="white"
                                textAlign={"center"}
                            >
                                Senior <br />
                                Care
                            </Typography>
                        </Box>
                    </Grid2>
                    {/* Text ... */}
                    <Grid2
                        item
                        size={{ xs: 12, sm: 5 }}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            p: { xs: 4, sm: 6, md: 5 },
                        }}
                    >
                        <Box>
                            <Typography variant="body2" color="white">
                                Not Just Care. A Plan Made Just for You.
                            </Typography>
                            <Typography
                                variant="h2"
                                fontFamily={"Righteous"}
                                fontWeight={500}
                                color="white"
                            >
                                We are committed to Quality Care
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
                            <Button
                                size="large"
                                variant="contained"
                                color="secondary"
                                onClick={() => router.get(route("care.start"))}
                            >
                                Get Care Now
                            </Button>
                            <Button
                                size="small"
                                onClick={() =>
                                    router.get(route("how.it.works"))
                                }
                            >
                                <Typography variant="body1" color="white">
                                    <i>How It Works?</i>
                                </Typography>
                            </Button>
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
