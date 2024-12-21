import { Box } from "@mui/material";
import React from "react";

function ThreeLeaves({
    top = null,
    bottom = null,
    left = null,
    right = null,
    rotate = 0,
}) {
    return (
        <Box
            sx={{
                display: { xs: "none", sm: "none", md: "flex" },
                position: "absolute",
                top: top, // Applies if `top` prop is provided
                bottom: bottom, // Applies if `bottom` prop is provided
                left: left, // Applies if `left` prop is provided
                right: right, // Applies if `right` prop is provided
                transform: `rotate(${rotate}deg)`, // Dynamic rotation angle
            }}
        >
            <img
                src="/images/three_leaves.png"
                alt="leaves"
                style={{
                    width: 120,
                }}
            />
        </Box>
    );
}

export default ThreeLeaves;
