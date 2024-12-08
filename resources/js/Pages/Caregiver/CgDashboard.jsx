import TitleCenter from "@/Components/Typo/TitleCenter";
import AppLayout from "@/Layouts/AppLayout";
import { Head, router } from "@inertiajs/react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Typography,
} from "@mui/material";
import React from "react";

const Menus = [
    {
        title: "Fill CV",
        routeName: "cv.create",
    },
    {
        title: "My CV",
        routeName: "cv.show",
    },
    {
        title: "Qualification",
        routeName: "certificates.show",
    },
    {
        title: "Experience",
        routeName: "experiences.show",
    },
    {
        title: "Medical Checkup",
        routeName: "medical.chekup",
    },
];

const MyCares = [
    {
        title: "My patient / baby",
        routeName: "experiences.show",
    },
    {
        title: "Care Plan",
        routeName: "experiences.show",
    },
    {
        title: "Care Logs",
        routeName: "experiences.show",
    },
];

function CgDashboard() {
    return (
        <AppLayout>
            <Container maxWidth="md" sx={{ minHeight: "80vh", py: 5 }}>
                <Head title="Caregiver dashboard" />
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "flex-start",
                        rowGap: 3,
                    }}
                >
                    <Box sx={{ maxWidth: 400, margin: "auto" }}>
                        <TitleCenter>My Information</TitleCenter>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                flexWrap: "wrap",
                            }}
                        >
                            {Menus.map((item, index) => (
                                <Button
                                    key={index}
                                    sx={{
                                        width: 120,
                                        height: 80,
                                        m: 1,
                                        borderRadius: 10,
                                    }}
                                    variant="contained"
                                    onClick={() =>
                                        router.get(route(item.routeName))
                                    }
                                >
                                    <Typography
                                        variant="h6"
                                        fontSize={{ xs: 14, sm: 15 }}
                                        fontFamily={"Abyssinica SIL"}
                                    >
                                        {item.title}
                                    </Typography>
                                </Button>
                            ))}
                        </Box>
                    </Box>

                    {/* <Box sx={{ maxWidth: 400, margin: "0 auto" }}>
                        <TitleCenter>My Care</TitleCenter>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                flexWrap: "wrap",
                                maxWidth: 400,
                                mb: 2,
                            }}
                        >
                            {MyCares.map((item, index) => (
                                <Button
                                    key={index}
                                    sx={{
                                        width: 120,
                                        height: 90,
                                        m: 1,
                                        borderRadius: 10,
                                        bgcolor: "#6CE4CF",
                                    }}
                                    variant="contained"
                                    onClick={() =>
                                        router.get(route(item.routeName))
                                    }
                                >
                                    <Typography
                                        color="black"
                                        variant="h6"
                                        fontSize={{ xs: 14, sm: 15 }}
                                        fontFamily={"Abyssinica SIL"}
                                    >
                                        {item.title}
                                    </Typography>
                                </Button>
                            ))}
                        </Box>
                    </Box> */}
                </Box>
            </Container>
        </AppLayout>
    );
}

export default CgDashboard;
