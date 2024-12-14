import { Typography } from "@mui/material";
import React from "react";

export default function Subtitle({ children }) {
    return (
        <Typography
            variant="h6"
            fontSize={{ xs: 13, sm: 14, md: 15 }}
            fontWeight={600}
            mb={1}
            mr={1}
            fontFamily={"Mina"}
        >
            {children}
        </Typography>
    );
}
