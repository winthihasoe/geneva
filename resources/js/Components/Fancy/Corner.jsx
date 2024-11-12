import { Box } from "@mui/material";
import React from "react";

function Corner({ top = null, bottom = null, left = null, right = null }) {
    return (
        <Box
            sx={{
                display: { xs: "none", sm: "none", md: "flex" },
                position: "absolute",
                top: top, // Applies if `top` prop is provided
                bottom: bottom, // Applies if `bottom` prop is provided
                left: left, // Applies if `left` prop is provided
                right: right, // Applies if `right` prop is provided
            }}
        >
            <img
                src="/images/corner.png"
                alt="corner"
                style={{
                    width: 130,
                }}
            />
        </Box>
    );
}

export default Corner;
