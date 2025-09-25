import AppLayout from "@/Layouts/AppLayout";
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { router } from "@inertiajs/react";

function AssessmentSubmissionSuccessful() {
    return (
        <AppLayout>
            <Box
                sx={{
                    maxWidth: 500,
                    mx: "auto",
                    my: 8,
                    p: 4,
                    textAlign: "center",
                }}
            >
                <CheckCircleOutlineIcon
                    color="success"
                    sx={{ fontSize: 64, mb: 2 }}
                />
                <Typography variant="h4" fontWeight="bold" mb={2}>
                    Submission Successful!
                </Typography>
                <Typography variant="body1" mb={3}>
                    Thank you for submitting your Caregiver Skill Assessment.
                    <br />
                    Our team will review your information and contact you soon.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => router.visit("/")}
                >
                    Back to Home
                </Button>
            </Box>
        </AppLayout>
    );
}

export default AssessmentSubmissionSuccessful;
