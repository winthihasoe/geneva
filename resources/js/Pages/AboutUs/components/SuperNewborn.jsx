import { Box, Grid2, Typography } from "@mui/material";
import React from "react";

const Contents = [
    "Advanced Feeding Support",
    "Specialized Soothing Techniques",
    "Sleep Training and Schedule",
    "Emergency Preparedness",
    "Special Health Needs",
    "Parent Support",
];

function SuperNewborn() {
    return (
        <Grid2
            container
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                rowGap: 3,
                my: 2,
            }}
        >
            <Grid2
                size={{ xs: 12, sm: 12, md: 6 }}
                sx={{
                    display: "flex",
                    justifyContent: "center",
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
                        Super Newborn Nanny
                    </Typography>
                    {Contents.map((content, index) => (
                        <Typography
                            fontSize={{ xs: 20, sm: 25 }}
                            mb={1}
                            ml={3}
                            fontFamily={"Livvic"}
                            key={index}
                            color="#fff"
                        >
                            {content}
                        </Typography>
                    ))}
                </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 7, md: 6 }}>
                <Box
                    component="img"
                    src="/images/pricing/super_newborn_care.jpeg"
                    alt="Caregiver"
                    sx={{
                        width: { xs: "100%", sm: "100%", md: "60%" },
                        borderRadius: 10,
                    }}
                />
            </Grid2>
        </Grid2>
    );
}

export default SuperNewborn;
