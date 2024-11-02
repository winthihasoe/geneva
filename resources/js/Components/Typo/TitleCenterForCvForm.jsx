import { Typography } from "@mui/material";
import React from "react";

export default function TitleCenterForCvForm({ children }) {
    return (
        <Typography
            fontSize={{ xs: 18, sm: 20, md: 24 }}
            textAlign="center"
            fontWeight={400}
            mb={3}
            color="grey.700"
            fontFamily={"ADLaM Display"}
        >
            {children}
        </Typography>
    );
}
