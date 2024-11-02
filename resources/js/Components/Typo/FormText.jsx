import { Typography } from "@mui/material";
import React from "react";

export default function FormText({ children }) {
    return (
        <Typography mb={1} fontSize={{ xs: 11, sm: 13, md: 14 }}>
            {children}
        </Typography>
    );
}
