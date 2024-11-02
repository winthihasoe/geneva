import React, { useState } from "react";
import { Typography } from "@mui/material";

function LongArray({ data, fontSize, fontWeight, fontFamily }) {
    const [expanded, setExpanded] = useState(false);

    // Display up to 3 items, if not expanded
    const itemsToShow = expanded ? data : data.slice(0, 3);

    return (
        <Typography
            fontSize={fontSize}
            fontFamily={fontFamily}
            fontWeight={fontWeight}
            onClick={() => setExpanded(!expanded)}
            sx={{ cursor: data.length > 3 ? "pointer" : "default" }}
        >
            {itemsToShow.join(", ")}
            {data.length > 3 && !expanded && (
                <span style={{ color: "red", fontSize: 13 }}> ... more</span>
            )}
            {expanded && (
                <span style={{ color: "red", fontSize: 13 }}> ... less</span>
            )}
        </Typography>
    );
}

export default LongArray;
