import { Box, Grid2, Typography } from "@mui/material";
import React from "react";

function Nanny() {
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
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <img
                        src="/images/pricing/nanny.png"
                        alt="heart"
                        style={{ width: "100%" }}
                    />
                </Grid2>
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
                        Nanny
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
                        Supervise the child, ensuring safety, and handling basic
                        needs like snacks, playtime, and bedtime routines.
                    </Typography>
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default Nanny;
