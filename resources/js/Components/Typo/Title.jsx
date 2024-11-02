import { Typography } from "@mui/material";
import React from "react";

export default function Title({ children }) {
    return (
        <Typography
            variant="h5"
            fontSize={{ xs: 18, sm: 22, md: 33 }}
            fontWeight={800}
            mb={3}
            fontFamily={"Livvic"}
            color="primary"
        >
            {children}
        </Typography>
    );
}
