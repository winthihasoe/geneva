import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { Box, Container, Typography } from "@mui/material";
import React from "react";

function SuccessBooking() {
    return (
        <AppLayout>
            <Head title="Booking Success" />
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
                            alt="Interview"
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
                            "Your interview request is successful!”
                        </Typography>
                        <Typography
                            fontFamily={"Kufam"}
                            fontSize={{ xs: 11, sm: 13, md: 13 }}
                            textAlign={"center"}
                        >
                            An admin will reach out within 24 hours for
                            confirmation and payment arrangements.
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </AppLayout>
    );
}

export default SuccessBooking;
