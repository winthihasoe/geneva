import { Typography } from "@mui/material";
import React from "react";

export default function UnderlinedText({
    children,
    setState = () => {}, // Default to a no-op function if setState is not passed
    state,
    optionState,
}) {
    return (
        <Typography
            sx={{
                textDecoration: "underline",
                fontSize: { xs: 10, sm: 11, md: 13 },
                fontWeight: state == optionState ? 700 : 400,
                cursor: "pointer",
            }}
            onClick={() => setState(optionState)}
        >
            {children}
        </Typography>
    );
}
