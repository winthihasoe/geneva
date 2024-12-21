import PolygonDotted from "@/Components/Fancy/PolygonDotted";
import ShapeCamel from "@/Components/Fancy/ShapeCamel";
import ThreeArrows from "@/Components/Fancy/ThreeArrows";
import ThreeStars from "@/Components/Fancy/ThreeStars";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { Box, Container, Typography } from "@mui/material";
import React from "react";

function Philosophy() {
    return (
        <AppLayout>
            <Head title="Care Philosophy" />
            <Box position={"relative"}>
                <Container maxWidth="md" sx={{ position: "relative" }}>
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
                            Our Ethics of Care
                        </Typography>

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
                                src="/images/philosophy/signs.gif"
                                alt="Signs"
                                sx={{ minWidth: 300, maxWidth: 450 }}
                            />
                            <ThreeStars bottom={0} left={-80} />
                        </Box>
                        <Box
                            component="img"
                            src="/images/philosophy/care_hand.png"
                            alt="Care Hands"
                            sx={{ width: 200 }}
                        />
                        <Box
                            sx={{
                                border: "5px dashed",
                                borderColor: "primary.main",
                                borderRadius: { xs: 5, sm: 20 },
                                position: "relative",
                                px: { xs: 2, sm: 5 },
                                py: { xs: 3, sm: 4 },
                                mt: -8,
                            }}
                        >
                            <Typography
                                fontSize={{ xs: 30, sm: 40 }}
                                fontFamily={"Lilita One"}
                                color="primary"
                            >
                                At Hearty Aid, we believe that care extends
                                beyond meeting physical needs—it is about
                                fostering an environment of trust, love, and
                                respect that nurtures the heart and soul. 
                            </Typography>
                        </Box>
                    </Box>
                </Container>
                <PolygonDotted top={"50%"} right={0} />

                <ShapeCamel bottom={0} right={0} />
            </Box>
        </AppLayout>
    );
}

export default Philosophy;
