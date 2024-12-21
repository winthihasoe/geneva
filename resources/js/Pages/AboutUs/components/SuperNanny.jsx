import { Box, Grid2, Typography } from "@mui/material";
import React from "react";

const Contents = [
    "Handle a range of daily tasks, including feeding, bathing and homework help.",
    "Contribute to the child's development through structured activities, educational play, and emotional support.",
];

function SuperNanny() {
    return (
        <Grid2
            container
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                rowGap: 3,
                px: { xs: 0, sm: 2, md: 3 },
                py: 3,
            }}
        >
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
                        Super Nanny
                    </Typography>
                    {Contents.map((content, index) => (
                        <Typography
                            fontSize={{ xs: 20, sm: 25 }}
                            fontFamily={"Livvic"}
                            ml={3}
                            mb={1}
                            key={index}
                            color="#fff"
                        >
                            {content}
                        </Typography>
                    ))}
                </Box>
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
                <Box
                    component="img"
                    src="/images/pricing/super_nanny.png"
                    alt="Caregiver"
                    sx={{
                        width: { xs: "100%", sm: "100%", md: "80%" },
                        borderRadius: 10,
                    }}
                />
            </Grid2>
        </Grid2>
    );
}

export default SuperNanny;
