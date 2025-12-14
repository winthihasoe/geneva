import React, { useState } from "react";
import { Button, Box, Typography, Snackbar, Alert } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function ReviewLinkButton({
    patientSlug,
    caregiverSlug,
    isReviewed = false,
}) {
    const [copied, setCopied] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleCopyLink = async () => {
        const reviewLink = `${window.location.origin}/review/${patientSlug}/${caregiverSlug}`;

        try {
            await navigator.clipboard.writeText(reviewLink);
            setCopied(true);
            setSnackbarOpen(true);

            // Reset copied state after 3 seconds
            setTimeout(() => setCopied(false), 3000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    if (isReviewed) {
        return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button
                    variant="outlined"
                    color="success"
                    size="small"
                    disabled
                    startIcon={<CheckCircleIcon />}
                    sx={{ borderRadius: 20 }}
                >
                    Reviewed
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            <Typography
                variant="caption"
                color="textSecondary"
                mb={1}
                display="block"
            >
                Send this link to the customer to collect their reviews.
            </Typography>
            <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={handleCopyLink}
                startIcon={<ContentCopyIcon />}
                sx={{ borderRadius: 20 }}
            >
                {copied ? "Link Copied!" : "Copy Review Link"}
            </Button>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Review link copied to clipboard!
                </Alert>
            </Snackbar>
        </Box>
    );
}
