import { Typography } from "@mui/material";
import React from "react";

export default function TitleNoPadding({ children }) {
    return (
        <Typography
            variant="h5"
            fontSize={{ xs: 18, sm: 20, md: 22 }}
            fontWeight={700}
            fontFamily={"Sansita"}
        >
            {children}
        </Typography>
    );
}
