import { Box, Grid2, Typography } from "@mui/material";
import React from "react";

const Services = [
    "Providing reliable platform",
    "Arranging interviews",
    "Providing training tailored to each client's needs",
    "Thorough background checks",
    "Replacement options",
    "Monthly follow-ups",
];

function HeartyAidServices() {
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
                <Grid2
                    size={{ xs: 12, sm: 6 }}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            backgroundImage:
                                "url(/images/pricing/green_bg.png)",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            height: 300,
                            width: 300,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            fontSize={{ xs: 30, sm: 30, md: 38 }}
                            fontFamily={"Lilita One"}
                            color="#fff"
                        >
                            Hearty Aid <br />
                            Services
                        </Typography>
                    </Box>
                </Grid2>
                <Grid2
                    size={{ xs: 12, sm: 6 }}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        maxWidth: 450,
                    }}
                >
                    {Services.map((service, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                            }}
                        >
                            <img
                                src="/images/pricing/mark.png"
                                alt="mark"
                                style={{
                                    width: 35,
                                    height: 35,
                                    marginRight: "10px",
                                }}
                            />
                            <Typography
                                key={index}
                                mb={1}
                                fontSize={{ xs: 15, sm: 16, md: 18 }}
                                fontFamily={"Livvic"}
                                fontWeight={400}
                            >
                                {service}
                            </Typography>
                        </Box>
                    ))}
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default HeartyAidServices;
