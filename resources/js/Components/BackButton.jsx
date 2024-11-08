import React from "react";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { Box, IconButton } from "@mui/material";
import { router } from "@inertiajs/react";

export default function BackButton({ route = null }) {
    const handleGoBack = () => {
        if (route) {
            router.visit(route);
        } else {
            // Go back to the previous page in the browser history
            window.history.back();
        }
    };

    return (
        <IconButton sx={{ mr: 1 }} onClick={handleGoBack}>
            <ArrowCircleLeftOutlinedIcon />
        </IconButton>
    );
}
