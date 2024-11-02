import { Typography } from "@mui/material";
import React from "react";

export default function BodyText({ children }) {
    return (
        <Typography
            mt={2}
            fontSize={{ xs: 11, sm: 13, md: 14 }}
            mb={{ xs: 1, sm: 2 }}
        >
            {children}
        </Typography>
    );
}
