import React from "react";
import { Box } from "@mui/material";
import dayjs from "dayjs";

// Define the component
const ShowActiveOrOffline = ({ lastActiveAt }) => {
    // Calculate the difference between now and the last active time in hours
    const now = dayjs();
    const lastActive = dayjs(lastActiveAt);
    const diffInHours = now.diff(lastActive, "hour");

    // Determine whether to show green or red ripple based on the time difference
    const isActive = diffInHours < 2; // If within 1 hour, show green, else red

    return (
        <Box
            sx={{
                position: "relative",
                width: 17,
                height: 17,
                border: "2px solid",
                borderColor: "#fff",
                borderRadius: "50%",
                bgcolor: isActive ? "#3dc13c" : "#f13637", // Inner dot color: green if active, red if offline
                marginRight: 1, // Space between the dot and other elements
            }}
        >
            {/* CSS for ripple effect */}
            {/* CSS for ripple effect */}
            <style>
                {`
        @keyframes ripple {
            0% {
                width: 10px;
                height: 10px;
                opacity: 1;
            }
            70% {
                width: 24px;
                height: 24px;
                opacity: 0.3;  // Smooth fading
            }
            100% {
                width: 24px;
                height: 24px;
                opacity: 0;  // Fully transparent at end
            }
        }
        `}
            </style>
        </Box>
    );
};

export default ShowActiveOrOffline;
