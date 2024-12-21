import { Box } from "@mui/material";
import React from "react";

function PolygonDotted({
    top = null,
    right = null,
    left = null,
    bottom = null,
}) {
    return (
        <Box
            sx={{
                display: { xs: "none", sm: "none", md: "flex" },
                position: "absolute",
                top: { top },
                right: { right },
                left: { left },
                bottom: { bottom },
            }}
        >
            <img
                src="/images/pricing/dotted2.png"
                alt="Dotted"
                style={{
                    width: 150,
                }}
            />
        </Box>
    );
}

export default PolygonDotted;
