import { Box } from "@mui/material";
import React from "react";

function Shape({ top = null, right = null, left = null, bottom = null }) {
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
                src="/images/contact/shape.png"
                alt="Shape"
                style={{
                    width: 250,
                }}
            />
        </Box>
    );
}

export default Shape;
