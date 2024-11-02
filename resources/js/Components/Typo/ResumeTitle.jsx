import { Typography } from "@mui/material";
import React from "react";

export default function ResumeTitle({ children }) {
    return (
        <Typography fontSize={{ xs: 12, sm: 13, md: 15 }} fontWeight={800}>
            {children}
        </Typography>
    );
}
