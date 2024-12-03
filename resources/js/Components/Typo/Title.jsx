import { Typography } from "@mui/material";
import React from "react";

export default function Title({ children }) {
    return (
        <Typography
            variant="h4"
            // fontSize={{ xs: 20, sm: 22, md: 33 }}
            fontWeight={800}
            mb={1}
            fontFamily={"Livvic"}
            color="primary"
        >
            {children}
        </Typography>
    );
}
