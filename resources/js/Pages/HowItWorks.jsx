import AppLayout from "@/Layouts/AppLayout";
import { router } from "@inertiajs/react";
import { Container, Typography, Box, Button, Grid, Grid2 } from "@mui/material";
import React from "react";

const steps = [
    {
        image: "/images/howitworks/1.jpg",
        title: "Select Care Type",
        description:
            "Begin by choosing the type of care service that best matches your needs. Whether it is Baby Care, Maternal Care, or Elderly Care, selecting the right category helps us tailor the service to provide the most suitable caregiver for your situation.",
        showButton: true,
    },
    {
        image: "/images/howitworks/2.png",
        title: "Provide Care Info",
        description:
            "Fill out a simple form with important details about your requirements. This includes basic personal information, care preferences, and any special instructions. The more details you share, the better we can match you with the right caregiver.",
    },
    {
        image: "/images/howitworks/3.png",
        title: "Choose a Caregiver",
        description:
            "Review our list of qualified caregivers who are available for your chosen care type. You can view their profiles, skills, and experience before making your selection, ensuring that you feel confident and comfortable with your choice.",
    },
    {
        image: "/images/howitworks/4.png",
        title: "Book Your Schedule",
        description:
            "Select a convenient date and time for your caregiving service. Our flexible booking system allows you to plan ahead, making sure the caregiver is available when you need them most.",
    },
    {
        image: "/images/howitworks/5.png",
        title: "Follow-Up & Confirm",
        description:
            "Once your booking is submitted, our admin team will promptly contact you to confirm the details. They will also answer any questions you may have and provide additional support to make your caregiving experience smooth and stress-free.",
    },
];

function HowItWorks() {
    return (
        <AppLayout>
            <Container maxWidth="md" sx={{ pt: 3, pb: 6 }}>
                <Box sx={{ position: "relative", mb: { xs: 5, sm: 7 } }}>
                    <Typography
                        variant="h3"
                        component="h1"
                        textAlign="center"
                        fontFamily="Righteous"
                        sx={{
                            fontSize: {
                                xs: "2rem",
                                sm: "2.1rem",
                                md: "2.2rem",
                            },
                        }}
                    >
                        How It Works
                    </Typography>
                    <Box
                        sx={{
                            backgroundImage: 'url("/images/underline.png")',
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "contain",
                            width: 80,
                            height: 20,
                            position: "absolute",
                            bottom: -15,
                            right: "calc(50% - 70px)",
                        }}
                    />
                </Box>
                {steps.map((step, idx) => (
                    <Grid2
                        container
                        spacing={4}
                        alignItems="flex-start"
                        key={step.title}
                        sx={{
                            mb: 5,
                            flexDirection: {
                                xs: "column",
                                sm: "row",
                                md: "row",
                            },
                        }}
                    >
                        <Grid2 item size={{ xs: 12, sm: 4, md: 4 }}>
                            <Box
                                component="img"
                                src={step.image}
                                alt={step.title}
                                sx={{
                                    width: "100%",
                                    maxWidth: 300,
                                    display: "block",
                                    mx: { xs: "auto", md: 0 },
                                    borderRadius: 2,
                                }}
                            />
                        </Grid2>
                        <Grid2 item size={{ xs: 12, sm: 8, md: 8 }}>
                            <Typography
                                variant="h5"
                                fontFamily={"Righteous"}
                                letterSpacing={1}
                                mb={2}
                                bgcolor={"primary.main"}
                                color="white"
                                py={1}
                                px={2}
                                borderRadius={2}
                                sx={{
                                    fontSize: {
                                        xs: "1.3rem",
                                        sm: "1.5rem",
                                        md: "1.8rem",
                                    },
                                }}
                            >
                                {`${idx + 1}. ${step.title}`}
                            </Typography>
                            <Typography
                                variant="body1"
                                mb={step.showButton ? 3 : 0}
                                sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                            >
                                {step.description}
                            </Typography>
                            {step.showButton && (
                                <Box textAlign="center" mt={2}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() =>
                                            router.get(route("care.start"))
                                        }
                                    >
                                        Get Care Now
                                    </Button>
                                </Box>
                            )}
                        </Grid2>
                    </Grid2>
                ))}
            </Container>
        </AppLayout>
    );
}

export default HowItWorks;
