import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";

function YouTubeChannel() {
    return (
        <Box
            sx={{
                bgcolor: "gray.200",
                py: { xs: 5, md: 10 },
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 5,
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        width: { xs: "100%", md: "40%" },
                        aspectRatio: "16/9",
                        borderRadius: 3,
                        overflow: "hidden",
                        mb: { xs: 2, md: 0 },
                    }}
                >
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/x0yuS_b84z4?si=V3qMoA66zqKQ2gsR" // Change the video link here
                        title="Hearty Aid YouTube Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                            borderRadius: 12,
                            width: "100%",
                            height: "100%",
                        }}
                    ></iframe>
                </Box>
                <Box
                    sx={{
                        width: { xs: "100%", md: "40%" },
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        justifyContent: "center",
                        alignItems: "center",
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
                        Watch and Learn with Hearty Aid
                    </Typography>
                    <Typography variant="body1">
                        Explore our YouTube channel for helpful videos on
                        maternal and baby care, health tips, and real-life
                        caregiving advice. Learn visually, anytime — right from
                        the heart.
                    </Typography>
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        href="https://youtube.com/@dr.gracevlog?si=mNut0yXmpex2mvCe" // Change here
                        target="_blank"
                        rel="noopener"
                    >
                        Hearty Aid YouTube Channel
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

export default YouTubeChannel;
