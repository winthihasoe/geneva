import React from "react";
import { Box, Container, Typography, Link as MuiLink } from "@mui/material";
import { Link } from "@inertiajs/react";

export default function GuestCareLogLayout({
    children,
    title,
    historyUrl,
    hideChrome = false,
}) {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#f8fafc",
                py: 3,
            }}
        >
            <Container maxWidth="lg">
                {!hideChrome ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                            flexWrap: "wrap",
                            gap: 1,
                        }}
                    >
                        <Typography variant="h6" fontWeight="bold" color="primary">
                            {title || "Care log"}
                        </Typography>
                        {historyUrl ? (
                            <MuiLink
                                component={Link}
                                href={historyUrl}
                                underline="hover"
                                fontWeight="medium"
                            >
                                View history
                            </MuiLink>
                        ) : null}
                    </Box>
                ) : null}
                {children}
            </Container>
        </Box>
    );
}
