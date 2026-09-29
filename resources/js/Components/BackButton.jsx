import React from "react";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { router } from "@inertiajs/react";
import { isLeaveBlocked, requestLeave } from "@/hooks/useLeaveGuard";

export default function BackButton({ route = null, label = "" }) {
    const leave = () => {
        if (route) {
            router.visit(route);
        } else {
            window.history.back();
        }
    };

    const handleGoBack = () => {
        if (isLeaveBlocked()) {
            requestLeave(leave);
            return;
        }

        leave();
    };

    return (
        <Button
            variant="text"
            aria-label="Back"
            sx={{ mr: 0.5, p: 1 }}
            onClick={handleGoBack}
        >
            <ArrowCircleLeftOutlinedIcon />
            <Typography ml={1} variant="caption" color="text.secondary">
                {label}
            </Typography>
        </Button>
    );
}
