import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { Box, Container, Grid2, Typography } from "@mui/material";
import React from "react";
import AccessAlarmRoundedIcon from "@mui/icons-material/AccessAlarmRounded";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import LoyaltyRoundedIcon from "@mui/icons-material/LoyaltyRounded";

function Philosophy() {
    return (
        <AppLayout>
            <Head title="Care Philosophy" />
            <Container maxWidth="lg" sx={{ pb: { xs: 5, md: 10 } }}>
                <Typography variant="h3" align="center" sx={{ mt: 6, mb: 2 }}>
                    Our Care Philosophy
                </Typography>
                <Typography
                    variant="h6"
                    align="center"
                    sx={{ mb: { xs: 2 }, fontWeight: 200 }}
                >
                    Caring from the Heart
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    maxWidth={700}
                    mx={"auto"}
                    mb={6}
                    textAlign={"center"}
                >
                    At Hearty Aid Nanny and Caregiver Agency, we believe that
                    true care goes far beyond meeting daily needs. It’s about
                    creating an environment filled with trust, love, and respect
                    — where every person feels safe, valued, and supported.
                </Typography>

                {/* Brain image on left, text on right */}
                <Grid2
                    container
                    spacing={4}
                    sx={{
                        py: 2,
                        mb: { xs: 2, sm: 4 },
                    }}
                >
                    <Grid2
                        item
                        size={{ xs: 12, sm: 4 }}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                backgroundImage:
                                    "url(/images/philosophy/brain.png)",
                                height: 200,
                                width: 200,
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                justifyContent: "center",
                            }}
                        />
                    </Grid2>
                    <Grid2
                        item
                        size={{ xs: 12, sm: 8 }}
                        sx={{
                            px: 4,
                            py: 5,
                            display: "flex",
                            alignItems: "center",
                            bgcolor: "primary.main",
                            borderRadius: 5,
                            color: "white",
                            boxShadow: 3,
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h6"
                                mb={1}
                                fontWeight={700}
                                textAlign={"left"}
                            >
                                Our Ethics of Care
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                mb={1}
                                textAlign={"left"}
                            >
                                We follow simple yet powerful values that guide
                                everything we do:
                            </Typography>
                            <ul>
                                <li>
                                    <Typography
                                        variant="body2"
                                        fontSize={12}
                                        textAlign={"left"}
                                        sx={{ fontStyle: "italic" }}
                                    >
                                        <b>Respect:</b> We honor every person’s
                                        dignity, beliefs, and choices.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography
                                        variant="body2"
                                        fontSize={12}
                                        textAlign={"left"}
                                        sx={{ fontStyle: "italic" }}
                                    >
                                        <b>Compassion:</b> We listen with
                                        kindness and care with understanding.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography
                                        variant="body2"
                                        fontSize={12}
                                        textAlign={"left"}
                                        sx={{ fontStyle: "italic" }}
                                    >
                                        <b>Trust:</b> We build honest,
                                        dependable relationships with families
                                        and clients.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography
                                        variant="body2"
                                        textAlign={"left"}
                                        sx={{ fontStyle: "italic" }}
                                    >
                                        <b>Love:</b> We bring warmth and empathy
                                        into every act of service.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography
                                        variant="body2"
                                        fontSize={12}
                                        textAlign={"left"}
                                        sx={{ fontStyle: "italic" }}
                                    >
                                        <b>Commitment:</b> We dedicate ourselves
                                        to improving lives every day.
                                    </Typography>
                                </li>
                            </ul>
                        </Box>
                    </Grid2>
                </Grid2>

                {/* Caregiver image on left, text on right */}
                <Grid2
                    container
                    spacing={4}
                    sx={{
                        py: { xs: 2, sm: 4 },
                        px: 3,
                        mb: { xs: 2, sm: 4 },
                    }}
                >
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
                </Grid2>

                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignItems: "center",
                        mt: 6,
                        gap: { xs: 2, sm: 2, md: 5 },
                    }}
                >
                    {/* Image  */}
                    <Box
                        sx={{
                            backgroundImage: "url(/images/philosophy/care.png)",
                            height: 150,
                            width: 150,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            justifyContent: "center",
                            display: { xs: "none", sm: "none", md: "block" },
                        }}
                    />

                    {/* 1st Card  */}
                    <Box
                        sx={{
                            px: 4,
                            py: 5,
                            maxWidth: 220,
                            bgcolor: "primary.main",
                            borderRadius: 5,
                            color: "white",
                            boxShadow: 3,
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <Typography
                            variant="subtitle2"
                            textAlign={"center"}
                            fontWeight={700}
                        >
                            Compassion in Every Action
                        </Typography>
                        <AccessAlarmRoundedIcon fontSize="large" />
                        <Typography
                            variant="body2"
                            fontSize={12}
                            textAlign={"center"}
                            mb={2}
                        >
                            We care with genuine kindness and understanding.
                            Every touch, smile, and word is given with heart
                            because compassion makes care meaningful.
                        </Typography>
                    </Box>

                    {/* 2nd Card  */}
                    <Box
                        sx={{
                            px: 4,
                            py: 5,
                            width: 220,
                            bgcolor: "secondary.main",
                            borderRadius: 5,
                            boxShadow: 3,
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <Typography
                            variant="subtitle2"
                            textAlign={"center"}
                            fontWeight={700}
                        >
                            Respect and Trust to Customer
                        </Typography>
                        <LoyaltyRoundedIcon fontSize="large" />
                        <Typography
                            variant="body2"
                            fontSize={12}
                            textAlign={"center"}
                            mb={2}
                        >
                            We value each person’s dignity and choices. Through
                            honesty and reliability, we build trust that lasts
                            between caregivers, families, and those we serve.
                        </Typography>
                    </Box>

                    {/* 3rd Card  */}
                    <Box
                        sx={{
                            px: 4,
                            py: 5,
                            maxWidth: 220,
                            bgcolor: "#30B0C7",
                            borderRadius: 5,
                            color: "white",
                            boxShadow: 3,
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <Typography
                            variant="subtitle2"
                            textAlign={"center"}
                            fontWeight={700}
                        >
                            Care that Nurtures Life
                        </Typography>
                        <SpaRoundedIcon fontSize="large" />
                        <Typography
                            variant="body2"
                            fontSize={12}
                            textAlign={"center"}
                            mb={2}
                        >
                            We go beyond daily help. we create warmth, comfort,
                            and connection. Our goal is to support growth,
                            happiness, and a sense of belonging in every home.
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </AppLayout>
    );
}

export default Philosophy;
