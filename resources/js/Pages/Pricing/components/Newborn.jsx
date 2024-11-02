import { Box, Grid2, Typography } from "@mui/material";
import React from "react";

const Contents = [
    {
        title: "Feeding Support",
        body: "bottle feeding, basic breastfeeding support, and preparing formula as needed.",
    },
    {
        title: "Diapering and Bathing",
        body: "diaper changing, sponge baths, and newborn hygiene.",
    },
    {
        title: "Basic Soothing Techniques",
        body: "rocking, swaddling, and soft singing.",
    },
    {
        title: "Sleep Routine",
        body: "establish a simple sleep routine and understands basic sleep cues and cycles.",
    },
    {
        title: "General Safety:",
        body: "safe sleeping positions, handling, and preventing choking hazards.",
    },
    {
        title: "Health Monitoring",
        body: "Monitors for vital signs and signs of common issues like fever or skin irritation, but may rely on parents for guidance.",
    },
];

function Newborn() {
    return (
        <Box sx={{ p: { xs: 0, sm: 2, md: 4 }, my: 3, position: "relative" }}>
            <Grid2
                container
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    gap: 1,
                }}
            >
                <Grid2 size={{ xs: 12, sm: 7, md: 3 }}>
                    <img
                        src="/images/pricing/newborn_care.jpeg"
                        alt="Newborn"
                        style={{
                            width: "100%",
                            marginTop: "30px",
                            borderRadius: "40px",
                        }}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 12, md: 8 }}>
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
                        Newborn Care Nanny
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
                                fontSize={{ xs: 15, sm: 16, md: 16 }}
                                fontFamily={"Livvic"}
                                fontWeight={400}
                                color="primary"
                                width={"60%"}
                            >
                                <img
                                    src="/images/pricing/heart.png"
                                    alt="heart"
                                    style={{ width: 15, marginRight: "10px" }}
                                />
                                {content.title}:
                            </Typography>
                            <Typography
                                fontSize={{ xs: 15, sm: 16, md: 16 }}
                                fontFamily={"Livvic"}
                                fontWeight={400}
                                width={"100%"}
                            >
                                {content.body}
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

export default Newborn;
