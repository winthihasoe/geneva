import { Box, Grid2, Typography } from "@mui/material";
import React from "react";

const Contents = [
    "Personal care assistance",
    "Basic mobility support",
    "Meal preparation & feeding",
    "Medication reminders",
    "Companionship & social support",
    "Observation & reporting",
];

function ElderCare() {
    return (
        <Box sx={{ p: { xs: 0, sm: 2, md: 4 }, my: 3, position: "relative" }}>
            <Grid2
                container
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Grid2 size={{ xs: 12, sm: 7, md: 6 }}>
                    <img
                        src="/images/pricing/senior_care.png"
                        alt="Super Newborn"
                        style={{
                            width: "100%",
                            marginTop: "30px",
                            borderRadius: "40px",
                        }}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 5, md: 5 }}>
                    <Typography
                        fontFamily={"Lilita One"}
                        fontSize={{ xs: 35, sm: 35, md: 40 }}
                        sx={{
                            wordWrap: "break-word",
                            textAlign: "center",
                            mb: 2,
                            color: "primary.main",
                            textShadow:
                                "2px 2px 0 #FFFFFF, -2px -2px 0 #FFFFFF, 2px -2px 0 #FFFFFF, -2px 2px 0 #FFFFFF, 4px 4px 10px rgba(0, 0, 0, 0.2)", // White stroke and subtle shadow
                        }}
                    >
                        Caregiver
                    </Typography>
                    {Contents.map((content, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                                mb: 2,
                            }}
                        >
                            <Typography
                                fontSize={{ xs: 15, sm: 16, md: 18 }}
                                fontFamily={"Livvic"}
                            >
                                <img
                                    src="/images/pricing/heart.png"
                                    alt="heart"
                                    style={{ width: 15, marginRight: "10px" }}
                                />
                                {content}
                            </Typography>
                        </Box>
                    ))}
                </Grid2>
            </Grid2>
            <Box
                sx={{
                    display: {
                        xs: "none",
                        sm: "none",
                        md: "flex",
                        position: "absolute",
                        top: 0,
                        left: -30,
                    },
                }}
            >
                <img
                    src="/images/pricing/dotted2.png"
                    alt="arrow"
                    style={{
                        width: 100,
                    }}
                />
            </Box>
        </Box>
    );
}

export default ElderCare;
