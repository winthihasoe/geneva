import { Typography } from "@mui/material";
import React from "react";

export default function TinyText({ children }) {
    return (
        <Typography fontSize={11} gutterBottom>
            {children}
        </Typography>
    );
}
