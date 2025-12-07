import React, { useContext } from "react";
import { Box, Typography, Slider, Grid2, TextField } from "@mui/material";
import CvContext from "@/Context/CvContext";

const StepFive = () => {
    // Handle changes in the slider
    const { data, handleChange, handleSliderChange } = useContext(CvContext);
    return (
        <Box
            sx={{
                margin: "auto",
                maxWidth: 400,
                my: 2,
            }}
        >
            {/* Contact Info Fields */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                    Phone
                </Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    name="phone"
                    value={data.phone || ""}
                    onChange={handleChange("phone")}
                    sx={{ mb: 2 }}
                />
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                    Emergency Contact Number
                </Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    name="emergency_contact"
                    value={data.emergency_contact || ""}
                    onChange={handleChange("emergency_contact")}
                    sx={{ mb: 2 }}
                />
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                    Email
                </Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    name="email"
                    value={data.email || ""}
                    onChange={handleChange("email")}
                    sx={{ mb: 2 }}
                />
            </Box>
        </Box>
    );
};

export default StepFive;
