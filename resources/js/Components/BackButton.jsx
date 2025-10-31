import React from "react";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { Box, IconButton, Typography } from "@mui/material";
import { router } from "@inertiajs/react";

export default function BackButton({ route = null, label = "" }) {
    const handleGoBack = () => {
        if (route) {
            router.visit(route);
        } else {
            // Go back to the previous page in the browser history
            window.history.back();
        }
    };

    return (
        <IconButton sx={{ mr: 0.5, p: 0 }} onClick={handleGoBack}>
            <ArrowCircleLeftOutlinedIcon />
            <Typography ml={1} variant="caption" color="text.secondary">
                {label}
            </Typography>
        </IconButton>
    );
}
