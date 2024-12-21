import { Box, Grid2, Typography } from "@mui/material";
import React from "react";

const Contents = [
    "Feeding Support",
    "Diapering and Bathing",
    "Basic Soothing Techniques",
    "Sleep Routine",
    "General Safety",
    "Health Monitoring",
];

function NewbornNanny() {
    return (
        <Grid2
            container
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                rowGap: 3,
                px: { xs: 0, sm: 2, md: 3 },
            }}
        >
            <Grid2
                size={{ xs: 12, sm: 12, md: 6 }}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Box
                    component="img"
                    src="/images/pricing/newborn_care.jpeg"
                    alt="Caregiver"
                    sx={{
                        width: { xs: "100%", sm: "100%", md: "60%" },
                        borderRadius: 10,
                    }}
                />
            </Grid2>
            <Grid2
                size={{ xs: 12, sm: 12, md: 6 }}
                sx={{
                    display: "flex",
                    justifyContent: {
                        xs: "center",
                        sm: "center",
                        md: "flex-start",
                    },
                }}
            >
                <Box>
                    <Typography
                        fontFamily={"Lilita One"}
                        fontSize={{ xs: 35, sm: 40, md: 45 }}
                        sx={{
                            wordWrap: "break-word",
                            mb: 2,
                            color: "primary.main",
                            textShadow:
                                "3px 3px 0 #FFFFFF, -3px -3px 0 #FFFFFF, 3px -3px 0 #FFFFFF, -3px 3px 0 #FFFFFF, 4px 4px 10px rgba(0, 0, 0, 0.5)", // White stroke and subtle shadow
                        }}
                    >
                        Newborn Nanny
                    </Typography>
                    {Contents.map((content, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                mb: 1,
                                ml: 3,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 10,
                                    height: 10,
                                    bgcolor: "#fff",
                                    borderRadius: 20,
                                }}
                            />
                            <Typography
                                fontSize={{ xs: 20, sm: 25 }}
                                fontFamily={"Livvic"}
                                color="#fff"
                            >
                                {content}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Grid2>
        </Grid2>
    );
}

export default NewbornNanny;
