import { Box, Grid2, Typography } from "@mui/material";
import React from "react";

function SuperNanny() {
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
                <Grid2 size={{ xs: 12, sm: 6 }} sx={{ maxWidth: 300 }}>
                    <Typography
                        fontFamily={"Lilita One"}
                        fontSize={{ xs: 35, sm: 30, md: 35 }}
                        sx={{
                            wordWrap: "break-word",
                            mb: 2,
                            color: "primary.main",
                            textShadow:
                                "2px 2px 0 #FFFFFF, -2px -2px 0 #FFFFFF, 2px -2px 0 #FFFFFF, -2px 2px 0 #FFFFFF, 4px 4px 10px rgba(0, 0, 0, 0.2)", // White stroke and subtle shadow
                        }}
                    >
                        Super Nanny
                    </Typography>
                    <Typography
                        mb={1}
                        fontSize={{ xs: 15, sm: 16, md: 16 }}
                        fontFamily={"Livvic"}
                        fontWeight={400}
                    >
                        <img
                            src="/images/pricing/heart.png"
                            alt="heart"
                            style={{ width: 15, marginRight: "10px" }}
                        />
                        Handle a range of daily tasks, including feeding,
                        bathing and homework help.
                    </Typography>
                    <Typography
                        mb={1}
                        fontSize={{ xs: 16, sm: 18, md: 20 }}
                        fontFamily={"Madimi One"}
                        fontWeight={600}
                        color="primary"
                    >
                        <img
                            src="/images/pricing/heart.png"
                            alt="heart"
                            style={{ width: 15, marginRight: "10px" }}
                        />
                        Contribute to the child's development through structured
                        activities,educational play, and emotional support.
                    </Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <img
                        src="/images/pricing/super_nanny.png"
                        alt="super nanny"
                        style={{ width: "100%" }}
                    />
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
                    alt="dotted"
                    style={{
                        width: 100,
                    }}
                />
            </Box>
        </Box>
    );
}

export default SuperNanny;
