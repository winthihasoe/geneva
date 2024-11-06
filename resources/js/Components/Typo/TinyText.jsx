import { Typography } from "@mui/material";
import React from "react";

export default function TinyText({ children, textAlign = "left" }) {
    return (
        <Typography textAlign={textAlign} fontSize={11} gutterBottom>
            {children}
        </Typography>
    );
}
