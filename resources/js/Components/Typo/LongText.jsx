import React, { useState } from "react";
import { Typography, Button } from "@mui/material";

const LongText = ({ children, limit, fontSize }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    // Handle null or undefined children gracefully
    if (!children) {
        return null; // or you can return a default message like <Typography>No content available</Typography>
    }

    // Check if the text is longer than the limit
    const isLongText = children.length > limit;

    return (
        <Typography fontSize={fontSize}>
            {/* Show the full text if not long, otherwise toggle between shortened and full text */}
            {expanded || !isLongText
                ? children
                : `${children.substring(0, limit)}...`}
            {isLongText && (
                <Button size="small" onClick={toggleExpand}>
                    <Typography
                        color={"blue"}
                        fontSize={{ xs: 11, sm: 13, md: 13 }}
                    >
                        {expanded ? "Read Less" : "Read More"}
                    </Typography>
                </Button>
            )}
        </Typography>
    );
};

export default LongText;
