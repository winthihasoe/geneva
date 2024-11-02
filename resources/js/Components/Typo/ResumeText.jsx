import { Typography } from "@mui/material";
import React from "react";

export default function ResumeText({ children }) {
    return (
        <Typography
            fontSize={{ xs: 13, sm: 14, md: 15 }}
            fontFamily={"Lato"}
            fontWeight={600}
            mb={1}
        >
            {children}
        </Typography>
    );
}
