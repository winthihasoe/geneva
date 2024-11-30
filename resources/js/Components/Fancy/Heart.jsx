import { Box } from "@mui/material";
import React from "react";

function Heart({ top = null, bottom = null, left = null, right = null }) {
    return (
        <Box
            sx={{
                position: "absolute",
                top: top, // Applies if `top` prop is provided
                bottom: bottom, // Applies if `bottom` prop is provided
                left: left, // Applies if `left` prop is provided
                right: right, // Applies if `right` prop is provided
            }}
        >
            <img
                src="/images/heart.png"
                alt="heart"
                style={{
                    width: 25,
                }}
            />
        </Box>
    );
}

export default Heart;
