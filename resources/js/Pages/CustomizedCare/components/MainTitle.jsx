import { Typography } from "@mui/material";
import React from "react";

export default function MainTitle({ children }) {
    return (
        <Typography
            variant="h5"
            fontSize={{ xs: 30, sm: 33, md: 45 }}
            fontWeight={400}
            mb={2}
            fontFamily={"Karma"}
            color="primary"
            textAlign={"center"}
        >
            {children}
        </Typography>
    );
}
