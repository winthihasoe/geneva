import React, { useContext } from "react";
import { Box, Typography, Slider, Grid2, TextField } from "@mui/material";
import CvContext from "@/Context/CvContext";

const languages = ["Thai", "Myanmar", "English", "Chinese", "Hindi"];

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
                    Phone Number
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
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                    Line ID
                </Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    name="line"
                    value={data.line || ""}
                    onChange={handleChange("line")}
                />
            </Box>
            <Typography>Language</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Choose the language bar to descibe you language skill.
            </Typography>

            {languages.map((language) => (
                <Grid2
                    container
                    key={language}
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        gap: 1,
                        py: 1,
                    }}
                >
                    <Grid2 item size={{ xs: 3 }}>
                        <Typography
                            sx={{
                                width: "30%",
                                fontSize: 13,
                                fontWeight: "bold",
                            }}
                        >
                            {language}
                        </Typography>
                    </Grid2>
                    <Grid2 item size={{ xs: 8 }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <Typography fontSize={11}>Very limited</Typography>
                            <Slider
                                value={parseInt(
                                    data.language
                                        .find((lang) =>
                                            lang.startsWith(language)
                                        )
                                        ?.split(" ")[1] || 0
                                )}
                                onChange={handleSliderChange(language)}
                                min={0}
                                max={10}
                                step={2}
                                valueLabelDisplay="auto"
                                marks
                                sx={{ maxWidth: 300 }} // Set width for the slider
                            />
                            <Typography fontSize={11}>Excellent</Typography>
                        </Box>
                    </Grid2>
                </Grid2>
            ))}
        </Box>
    );
};

export default StepFive;
