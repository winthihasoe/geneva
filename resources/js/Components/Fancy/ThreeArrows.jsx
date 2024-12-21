import { Box } from "@mui/material";
import React from "react";

function ThreeArrows({ top = null, right = null, left = null, bottom = null }) {
    return (
        <Box
            sx={{
                display: { xs: "none", sm: "flex", md: "flex" },
                position: "absolute",
                top: { top },
                right: { right },
                left: { left },
                bottom: { bottom },
            }}
        >
            <img
                src="/images/pricing/three_arrow.png"
                alt="arrow"
                style={{
                    width: 150,
                }}
            />
        </Box>
    );
}

export default ThreeArrows;
