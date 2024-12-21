import ShapeCamel from "@/Components/Fancy/ShapeCamel";
import ThreeArrows from "@/Components/Fancy/ThreeArrows";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import PolygonDotted from "@/Components/Fancy/PolygonDotted";
import ThreeLeaves from "@/Components/Fancy/ThreeLeaves";
import Noodle from "@/Components/Fancy/Noodle";

export default function CustomerService() {
    return (
        <AppLayout>
            <Head title="Customer Service" />

            <Box
                sx={{
                    bgcolor: "#E0F4EC",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    alignItems: "center",
                    pt: { xs: 5, sm: 10 },
                    px: 1,
                    overflow: "hidden",
                }}
            >
                <ThreeArrows top={0} left={10} />
                <PolygonDotted bottom={30} right={-30} />
                {/* Info Text  */}
                <Box sx={{ maxWidth: 550 }}>
                    <Typography
                        fontFamily={"Lilita One"}
                        fontSize={{ xs: 23, sm: 40 }}
                    >
                        Our dedicated{" "}
                        <span style={{ color: "#21875C" }}>
                            customer service team
                        </span>{" "}
                        is here to assist with
                    </Typography>
                    {[
                        "inquiries",
                        "service requests, and",
                        "any other needs.",
                    ].map((title, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                gap: 1,
                                alignItems: "center",
                            }}
                        >
                            <FavoriteBorderRoundedIcon fontSize="large" />
                            <Typography
                                fontFamily={"Lilita One"}
                                fontSize={{ xs: 22, sm: 40 }}
                            >
                                {title}
                            </Typography>
                        </Box>
                    ))}

                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: "center",
                        }}
                    >
                        <Box
                            component="img"
                            src="/images/customerService/customer_service.gif"
                            alt="Operator"
                            sx={{
                                width: { xs: 90, sm: 180 },
                            }}
                        />
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: 8,
                                py: { xs: 2, sm: 3 },
                                px: { xs: 2, sm: 4 },
                            }}
                        >
                            <Typography
                                fontFamily={"Lilita One"}
                                fontSize={{ xs: 20, sm: 30, md: 40 }}
                            >
                                082 - 902 - 1957
                            </Typography>
                        </Button>
                    </Box>
                </Box>
                <Box
                    component="img"
                    src="/images/customerService/operator.png"
                    alt="Operator"
                    sx={{
                        width: { xs: 230, sm: 320 },
                    }}
                />
            </Box>
            <Container maxWidth="md" sx={{ position: "relative", py: 5 }}>
                {/* Operation hours  */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 5,
                    }}
                >
                    <Box sx={{ position: "relative" }}>
                        <Typography
                            fontFamily={"Lilita One"}
                            fontSize={{ xs: 35, sm: 40, md: 45 }}
                            sx={{
                                wordWrap: "break-word",
                                mb: 2,
                                color: "primary.main",
                                textShadow:
                                    "3px 3px 0 #FFFFFF, -3px -3px 0 #FFFFFF, 3px -3px 0 #FFFFFF, -3px 3px 0 #FFFFFF, 4px 4px 10px rgba(0, 0, 0, 0.5)", // White stroke and subtle shadow
                            }}
                            textAlign={"center"}
                        >
                            Operation Hours
                        </Typography>

                        <ThreeLeaves top={-40} left={-75} rotate={-35} />
                        <Noodle top={-20} right={-70} />
                        <Typography
                            textAlign={"center"}
                            fontSize={{ xs: 25, sm: 35 }}
                            fontFamily={"Livvic"}
                        >
                            9am - 6pm
                        </Typography>
                    </Box>
                    <Box sx={{ position: "relative" }}>
                        <Typography
                            fontFamily={"Lilita One"}
                            fontSize={{ xs: 35, sm: 40, md: 45 }}
                            sx={{
                                wordWrap: "break-word",
                                mb: 2,
                                color: "primary.main",
                                textShadow:
                                    "3px 3px 0 #FFFFFF, -3px -3px 0 #FFFFFF, 3px -3px 0 #FFFFFF, -3px 3px 0 #FFFFFF, 4px 4px 10px rgba(0, 0, 0, 0.5)", // White stroke and subtle shadow
                            }}
                            textAlign={"center"}
                        >
                            Operation Days
                        </Typography>

                        <ThreeLeaves top={-40} left={-75} rotate={-35} />
                        <Typography
                            textAlign={"center"}
                            fontSize={{ xs: 25, sm: 35 }}
                            fontFamily={"Livvic"}
                        >
                            Monday to Saturday
                        </Typography>
                    </Box>
                    <Box sx={{ position: "relative" }}>
                        <Typography
                            fontSize={{ xs: 30, sm: 50 }}
                            fontFamily={"Lilita One"}
                            textAlign={"center"}
                        >
                            We are closed on every Sunday!
                        </Typography>
                        <Noodle top={-20} left={-70} />
                    </Box>
                </Box>
            </Container>
            <Box sx={{ position: "relative" }}>
                <ShapeCamel bottom={0} right={0} />
            </Box>
        </AppLayout>
    );
}
