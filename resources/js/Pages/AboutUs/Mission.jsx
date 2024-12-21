import ShapeCamel from "@/Components/Fancy/ShapeCamel";
import ThreeArrows from "@/Components/Fancy/ThreeArrows";
import ThreeStars from "@/Components/Fancy/ThreeStars";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { Box, Container, Typography } from "@mui/material";
import React from "react";

function Mission() {
    return (
        <AppLayout>
            <Head title="Mission Statement" />
            <Box position={"relative"}>
                <Container maxWidth="md" sx={{ position: "relative" }}>
                    <ThreeArrows top={0} left={0} />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: { xs: 5, sm: 8 },
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
                                px: 7,
                                boxShadow: 3,
                            }}
                        >
                            Our Mission
                        </Typography>

                        <Box
                            sx={{
                                position: "relative",
                                bgcolor: "primary.main",
                                borderRadius: { xs: 20, sm: 30, md: 50 },
                                py: { xs: 3, sm: 5, md: 4 },
                                px: { xs: 3, sm: 5, md: 6 },
                            }}
                        >
                            <Typography
                                fontSize={{ xs: 18, sm: 25, md: 30 }}
                                fontFamily={"Lilita One"}
                                fontWeight={400}
                                color="white"
                                ml={10}
                            >
                                To improve quality of life, respect dignity, and
                                support independence through caring and reliable
                                services.
                            </Typography>
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: -20,
                                    left: { xs: -20, sm: -40 },
                                    width: { xs: 120, sm: 170 },
                                }}
                            >
                                <img
                                    src="/images/mission/elder_help.png"
                                    alt="Elder help"
                                    style={{
                                        width: "100%",
                                    }}
                                />
                            </Box>
                        </Box>

                        <Box position={"relative"} mt={10}>
                            {/* Background Image Positioned Behind */}
                            <Box
                                component="img"
                                src="/images/mission/baby_hug.png"
                                alt="Baby hug"
                                sx={{
                                    position: "absolute",
                                    top: { xs: -100, sm: -120 }, // Push the image up
                                    right: 0, // Push the image slightly outside the box
                                    width: { xs: 200, sm: 250 },
                                    zIndex: -1,
                                }}
                            />
                            <Box
                                component="img"
                                src="/images/pricing/heart.png"
                                alt="Baby hug"
                                sx={{
                                    position: "absolute",
                                    top: { xs: -50, sm: -80 }, // Push the image up
                                    right: 180, // Push the image slightly outside the box
                                    width: { xs: 50, sm: 70 },
                                }}
                            />
                            <Box
                                sx={{
                                    bgcolor: "#FFF9F9",

                                    borderRadius: { xs: 20, sm: 30, md: 50 },
                                    py: { xs: 3, sm: 5, md: 4 },
                                    px: { xs: 3, sm: 5, md: 6 },

                                    boxShadow: 3,
                                    mt: 10,
                                    zIndex: 1,
                                }}
                            >
                                {/* Text Content */}
                                <Typography
                                    fontSize={{ xs: 20, sm: 25, md: 30 }}
                                    fontFamily={"Lilita One"}
                                    fontWeight={400}
                                    color="primary"
                                    sx={{
                                        position: "relative", // Ensure content stays above the image
                                        zIndex: 1,
                                    }}
                                    textAlign={{ xs: "center", sm: "left" }}
                                >
                                    To support the growth and development of
                                    children in a safe, loving, and stimulating
                                    environment.
                                </Typography>
                            </Box>
                        </Box>

                        {/* Video section come here */}
                        <Box
                            sx={{
                                position: "relative",
                                maxWidth: 500,
                            }}
                        >
                            <ThreeStars top={-30} right={-80} />
                            <Box
                                component="img"
                                src="/images/mission/mission.gif"
                                alt="Mission"
                                sx={{ width: { xs: 250, sm: 300 } }}
                            />
                            <ThreeStars bottom={0} left={-80} />
                        </Box>
                    </Box>
                </Container>
                <ShapeCamel bottom={0} right={0} />
            </Box>
        </AppLayout>
    );
}

export default Mission;
