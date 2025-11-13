import ShapeCamel from "@/Components/Fancy/ShapeCamel";
import ThreeArrows from "@/Components/Fancy/ThreeArrows";
import ThreeStars from "@/Components/Fancy/ThreeStars";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { Box, Container, Grid2, Typography } from "@mui/material";
import React from "react";

function Mission() {
    return (
        <AppLayout>
            <Head title="Mission Statement" />
            <Container maxWidth="lg" sx={{ pb: 5 }}>
                <Typography variant="h3" align="center" sx={{ mt: 6, mb: 2 }}>
                    Our Mission
                </Typography>
                <Typography
                    variant="h6"
                    align="center"
                    sx={{ mb: { xs: 2, sm: 5, md: 6 }, fontWeight: 200 }}
                >
                    Caring with Heart. Serving with Purpose.
                </Typography>
                {/* Two messages side by side with image in middle  */}
                <Grid2 container spacing={4} sx={{ py: 4, mb: 4 }}>
                    <Grid2
                        item
                        size={{ xs: 12, sm: 6, md: 4 }}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            alignContent: "center",
                        }}
                    >
                        <Box
                            sx={{
                                borderRadius: 2,
                                overflow: "hidden",
                                boxShadow: 3,
                                p: 3,
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{ fontStyle: "italic" }}
                            >
                                At Hearty Aid Nanny and Caregiver Agency, our
                                mission is simple yet profound to enrich lives
                                through compassionate, respectful, and
                                dependable care.
                            </Typography>
                        </Box>
                    </Grid2>
                    <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
                        <Box
                            sx={{
                                backgroundImage:
                                    "url(/images/mission/elder_help.png)",
                                height: 300,
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                            }}
                        />
                    </Grid2>
                    <Grid2
                        item
                        size={{ xs: 12, sm: 12, md: 4 }}
                        sx={{
                            display: "flex",
                            alignItems: "flex-end",
                            alignContent: "center",
                        }}
                    >
                        <Box
                            sx={{
                                borderRadius: 2,
                                overflow: "hidden",
                                boxShadow: 3,
                                p: 3,
                                bgcolor: "primary.main",
                                maxWidith: 400,
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{ fontStyle: "italic", color: "white" }}
                            >
                                We believe that everyone deserves to live with
                                dignity, independence, and joy, whether they are
                                a child growing up in a nurturing home or an
                                elder receiving comfort and support.
                            </Typography>
                        </Box>
                    </Grid2>
                </Grid2>

                <Box
                    sx={{
                        py: 4,
                        textAlign: "center",
                        borderRadius: 2,
                        bgcolor: "gray.100",
                        mb: { xs: 0, sm: 4 },
                        p: 3,
                    }}
                >
                    <Typography variant="h5" mb={2}>
                        Our Commitment
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        maxWidth={700}
                        mx={"auto"}
                        mb={6}
                    >
                        We are committed to improving the quality of life for
                        every individual and family we serve. Our caregivers and
                        nannies are more than professionals, they are
                        companions, mentors, and trusted helpers who bring
                        kindness and dedication into each moment of care.
                    </Typography>

                    {/* Target png image on left, text on right */}
                    <Grid2
                        container
                        spacing={4}
                        maxWidth={800}
                        sx={{
                            mx: "auto",
                        }}
                    >
                        <Grid2 item size={{ xs: 12, sm: 4 }}>
                            <Box
                                sx={{
                                    backgroundImage:
                                        "url(/images/mission/target.png)",
                                    height: 200,
                                    backgroundSize: "contain",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                }}
                            />
                        </Grid2>
                        <Grid2
                            item
                            size={{ xs: 12, sm: 8 }}
                            sx={{
                                px: { xs: 0, sm: 2 },
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="subtitle1"
                                    mb={1}
                                    textAlign={"left"}
                                >
                                    With every service, we aim to:
                                </Typography>
                                <ul>
                                    <li>
                                        <Typography
                                            variant="body2"
                                            textAlign={"left"}
                                            sx={{ fontStyle: "italic" }}
                                        >
                                            Respect each person’s dignity and
                                            individuality
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography
                                            variant="body2"
                                            textAlign={"left"}
                                            sx={{ fontStyle: "italic" }}
                                        >
                                            Support independence and confidence
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography
                                            variant="body2"
                                            textAlign={"left"}
                                            sx={{ fontStyle: "italic" }}
                                        >
                                            Deliver consistent, reliable, and
                                            heartfelt assistance
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography
                                            variant="body2"
                                            textAlign={"left"}
                                            sx={{ fontStyle: "italic" }}
                                        >
                                            Build trust through communication
                                            and understanding
                                        </Typography>
                                    </li>
                                </ul>
                            </Box>
                        </Grid2>
                    </Grid2>
                </Box>

                {/* Caregiver image on left, text on right */}
                <Grid2
                    container
                    spacing={4}
                    sx={{
                        py: { xs: 2, sm: 4 },
                        px: 3,
                    }}
                >
                    <Grid2 item size={{ xs: 12, sm: 5 }}>
                        <Box
                            sx={{
                                backgroundImage:
                                    "url(/images/mission/caregiver-circle.png)",
                                height: 400,
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                bgcolor: "white",
                            }}
                        />
                    </Grid2>
                    <Grid2
                        item
                        size={{ xs: 12, sm: 7 }}
                        sx={{
                            px: { xs: 0, sm: 2 },
                            display: "flex",
                            alignItems: "flex-start",
                        }}
                    >
                        <Box sx={{ p: { xs: 0, sm: 3 } }}>
                            <Typography
                                variant="h5"
                                mb={2}
                                textAlign={"center"}
                                color="primary"
                            >
                                Caring for Every Stage of Life
                            </Typography>
                            <Typography variant="subtitle1" mb={2}>
                                At Hearty Aid, we serve both children and adults
                                with equal dedication.
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                mb={1}
                                fontWeight={600}
                            >
                                For Families & Children:
                            </Typography>
                            <Typography
                                variant="body2"
                                textAlign={"left"}
                                sx={{ fontStyle: "italic", ml: 2 }}
                            >
                                We provide a safe, loving, and stimulating
                                environment that encourages curiosity, growth,
                                and creativity.Our nannies help children learn,
                                play, and thrive while offering parents peace of
                                mind that their little ones are cared for with
                                patience and love.
                            </Typography>

                            <Typography
                                variant="subtitle1"
                                mt={3}
                                mb={1}
                                fontWeight={600}
                            >
                                For Seniors & Individuals in Need of Care
                            </Typography>
                            <Typography
                                variant="body2"
                                textAlign={"left"}
                                sx={{ fontStyle: "italic", ml: 2 }}
                            >
                                Our caregivers promote comfort, dignity, and
                                independence through personalized support.
                                Whether it’s companionship, assistance with
                                daily tasks, or specialized care, we focus on
                                creating an environment where clients feel
                                valued and respected.
                            </Typography>
                        </Box>
                    </Grid2>
                </Grid2>
            </Container>
        </AppLayout>
    );
}

export default Mission;
