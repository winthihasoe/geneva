import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";

function CarePlanAds({ care = "baby" }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 3,
                justifyContent: "center",
                bgcolor: "primary.main",
                py: 10,
            }}
        >
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 3,
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        width: { xs: "100%", md: "40%" },
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                    }}
                    textAlign={"center"}
                    mt={2}
                >
                    <Typography
                        variant="h6"
                        fontFamily={"Righteous"}
                        fontSize={26}
                        letterSpacing={1.2}
                        mb={1}
                    >
                        Need a Helping Hand at Home?
                    </Typography>
                    <Typography variant="body1">
                        Our trusted nanny care service provides warm,
                        professional support for your little ones — giving you
                        peace of mind and your child the care they deserve. Let
                        Hearty Aid be part of your family’s journey.
                    </Typography>
                    <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={() => router.get(route("care.start"))}
                        target="_blank"
                        rel="noopener"
                    >
                        Get Care Now
                    </Button>
                </Box>

                <Box
                    sx={{
                        width: { xs: "100%", md: "40%" },
                        borderRadius: 3,
                        overflow: "hidden",
                        mb: { xs: 2, md: 0 },
                    }}
                >
                    {care == "baby" ? (
                        <img
                            src="/images/carePlan/baby_care.png"
                            alt="Get Care Now"
                            style={{ width: "100%", objectFit: "cover" }}
                        />
                    ) : (
                        <img
                            src="/images/carePlan/elder-care.png"
                            alt="Get Care Now"
                            style={{ width: "100%", objectFit: "cover" }}
                        />
                    )}
                </Box>
            </Container>
        </Box>
    );
}

export default CarePlanAds;
