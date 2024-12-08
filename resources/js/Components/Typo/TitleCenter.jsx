import { Typography } from "@mui/material";
import React from "react";

export default function TitleCenter({ children }) {
    return (
        <Typography
            fontSize={{ xs: 18, sm: 20, md: 22 }}
            textAlign="center"
            fontWeight={600}
            mb={2}
            color="grey.700"
            fontFamily={"Livvic"}
        >
            {children}
        </Typography>
    );
}
