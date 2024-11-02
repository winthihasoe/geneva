import { Typography } from "@mui/material";
import React from "react";

export default function EmpDetailText({ children }) {
    return (
        <Typography
            mt={2}
            fontSize={{ xs: 14, sm: 15, md: 16 }}
            mb={{ xs: 1, sm: 2 }}
        >
            {children}
        </Typography>
    );
}
