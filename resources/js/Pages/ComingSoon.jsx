import AppLayout from "@/Layouts/AppLayout";
import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { router } from "@inertiajs/react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function ComingSoon() {
    return (
        <AppLayout>
            <Container maxWidth="md">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "70vh",
                        textAlign: "center",
                        py: 8,
                    }}
                >
                    <AccessTimeIcon
                        sx={{
                            fontSize: 80,
                            color: "primary.main",
                            mb: 3,
                        }}
                    />

                    <Typography
                        variant="h2"
                        fontWeight="bold"
                        color="primary.main"
                        mb={2}
                        sx={{
                            fontSize: { xs: "2.5rem", md: "3.5rem" },
                        }}
                    >
                        Coming Soon
                    </Typography>

                    <Typography
                        variant="h5"
                        color="text.secondary"
                        mb={3}
                        sx={{
                            fontSize: { xs: "1.2rem", md: "1.5rem" },
                            maxWidth: "600px",
                        }}
                    >
                        We&apos;re working hard to bring you something amazing.
                        Stay tuned!
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        mb={4}
                        sx={{ maxWidth: "500px" }}
                    >
                        This feature is currently under development. We&apos;ll
                        notify you as soon as it&apos;s ready.
                    </Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => router.visit("/")}
                        sx={{ px: 4, py: 1.5 }}
                    >
                        Back to Home
                    </Button>
                </Box>
            </Container>
        </AppLayout>
    );
}

export default ComingSoon;
