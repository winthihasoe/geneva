import { Typography } from "@mui/material";
import React from "react";

export default function MainTitle({ children }) {
    return (
        <Typography
            variant="h5"
            fontSize={{ xs: 30, sm: 33, md: 45 }}
            fontWeight={600}
            mb={2}
            color="primary"
            textAlign={"center"}
            lineHeight={1.2}
        >
            {children}
        </Typography>
    );
}
