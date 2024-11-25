import AppLayout from "@/Layouts/AppLayout";
import { Head, router } from "@inertiajs/react";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";

function Success() {
    return (
        <AppLayout>
            <Head title="Application Success" />
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap-reverse",
                        margin: "50px auto",
                        maxWidth: 1000,
                        minHeight: "70vh",
                        rowGap: 3,
                    }}
                >
                    <Box sx={{ width: 300 }}>
                        <img
                            src="/images/interview.gif"
                            alt="Application"
                            style={{ width: 300, objectFit: "contain" }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                        }}
                    >
                        <Typography
                            fontFamily={"Londrina Solid"}
                            fontSize={{ xs: 26, sm: 32, md: 35 }}
                            color="primary"
                            textAlign={"center"}
                            mb={1}
                        >
                            "Your application is submitted to Hearty Aid !”
                        </Typography>
                        <Typography
                            fontFamily={"Kufam"}
                            fontSize={{ xs: 11, sm: 13, md: 13 }}
                            textAlign={"center"}
                            mb={2}
                        >
                            Admin will reach out within 3 business days for
                            confirmation and interview.
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{ borderRadius: 20, width: 100 }}
                            onClick={() => router.get(route("home"))}
                        >
                            <Typography fontFamily={"Kufam"} fontSize={17}>
                                Home
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Container>
        </AppLayout>
    );
}

export default Success;
