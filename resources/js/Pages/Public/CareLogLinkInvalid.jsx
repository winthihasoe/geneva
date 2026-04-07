import React from "react";
import { Head } from "@inertiajs/react";
import { Box, Container, Typography, Paper } from "@mui/material";

export default function CareLogLinkInvalid() {
    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc", py: 6 }}>
            <Head title="Link no longer available" />
            <Container maxWidth="sm">
                <Paper sx={{ p: 4, borderRadius: 2 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        This link is no longer available
                    </Typography>
                    <Typography color="text.secondary">
                        The caregiver assignment may have ended, or the link
                        is invalid. Please contact your coordinator if you need
                        a new link.
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}
