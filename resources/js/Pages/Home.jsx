import ContactForm from "@/Components/Forms/ContactForm";
import StartCVForm from "@/Pages/CV/components/StartCVForm";
import CaregiverCardMini from "@/Components/Home/CaregiverCardMini";
import CustomizedCarePlan from "@/Components/Home/CustomizedCarePlan";
import Explore from "@/Components/Home/Explore";
import StartBlog from "@/Components/Home/StartBlog";
import { Head, usePage } from "@inertiajs/react";
import { Box, Grid2, Typography } from "@mui/material";
import React from "react";
import AppLayout from "@/Layouts/AppLayout";

function Home({ caregivers }) {
    const CVs = Object.values(caregivers);
    const user = usePage().props.auth.user;

    return (
        <AppLayout>
            <Box position={"relative"}>
                <Head title="Home" />
                <Box
                    sx={{
                        position: "relative", // Position relative to allow content positioning

                        width: "100%", // Full width for background
                    }}
                >
                    {/* Background - Half green, half white */}
                    <Box
                        sx={{
                            display: "flex", // Flexbox for half-half background
                            position: "absolute", // Positioned absolutely within the parent
                            top: 0,
                            left: 0,
                            height: "100%",
                            width: "100%",
                        }}
                    >
                        {/* Right half - white background */}
                        <Box
                            sx={{
                                backgroundColor: "white",
                                flex: 1, // Half width
                                display: {
                                    xs: "none", // Hide on extra small screens
                                    sm: "block", // Show on small and up
                                },
                            }}
                        />
                        {/* Left half - green background */}
                        <Box
                            sx={{
                                backgroundColor: "primary.main",
                                flex: 1, // Half width
                                display: {
                                    xs: "none", // Hide on extra small screens
                                    sm: "block", // Show on small and up
                                },
                            }}
                        />

                        {/* Full green background for extra small screens */}
                        <Box
                            sx={{
                                backgroundColor: "primary.main",
                                flex: 1,
                                display: {
                                    xs: "block", // Show on extra small screens
                                    sm: "none", // Hide on small and above
                                },
                            }}
                        />
                    </Box>

                    {/* Content goes here - separate from the background */}
                    <Box
                        sx={{
                            position: "relative", // Make sure content is on top of background
                            zIndex: 1, // Ensure content is above the background
                            color: "black", // Text color, customize as needed
                        }}
                    >
                        <Grid2
                            container
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
                                <Box sx={{ pt: 2 }}>
                                    <Explore />
                                </Box>
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
                                <Box
                                    sx={{
                                        backgroundImage:
                                            "url(/images/quote.png)",
                                        width: "100%",
                                        height: 400,
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "contain",
                                        mt: 3,
                                    }}
                                />
                            </Grid2>
                        </Grid2>

                        <Grid2
                            container
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
                                {/* Customized your care plan section (Demo)  */}
                                <CustomizedCarePlan user={user} />
                                <StartBlog />
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        px: { xs: 1, sm: 0 },
                                        width: "100%",
                                    }}
                                >
                                    {CVs &&
                                        CVs.length > 0 &&
                                        CVs.slice(0, 6).map((cv) => (
                                            <CaregiverCardMini
                                                key={cv.ha_id}
                                                cv={cv}
                                            />
                                        ))}
                                </Box>
                            </Grid2>
                        </Grid2>

                        <Grid2 container>
                            <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
                                <ContactForm />
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
                                <StartCVForm />
                            </Grid2>
                        </Grid2>
                    </Box>
                </Box>
            </Box>
        </AppLayout>
    );
}

export default Home;
