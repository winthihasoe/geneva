import { Typography } from "@mui/material";
import React from "react";

export default function ResumeSubtitle({ children }) {
    return (
        <Typography fontSize={{ xs: 15, sm: 19, md: 22 }} fontWeight={600}>
            {children}
        </Typography>
    );
}
