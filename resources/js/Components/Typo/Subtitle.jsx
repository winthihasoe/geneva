import { Typography } from "@mui/material";
import React from "react";

export default function Subtitle({ children }) {
    return (
        <Typography
            variant="h6"
            fontSize={{ xs: 12, sm: 14, md: 15 }}
            fontWeight={600}
            mb={1}
            mr={1}
            color="grey.800"
            fontFamily={"Mina"}
        >
            {children}
        </Typography>
    );
}
