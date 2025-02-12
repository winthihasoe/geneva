import { Box } from "@mui/material";
import React from "react";

function ECG({ top = null, right = null, left = null, bottom = null }) {
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
                src="/images/ecg.png"
                alt="star"
                style={{
                    width: 75,
                }}
            />
        </Box>
    );
}

export default ECG;
