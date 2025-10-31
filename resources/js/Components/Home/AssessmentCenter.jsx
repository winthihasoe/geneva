import { router } from "@inertiajs/react";
import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import React from "react";

function AssessmentCenter() {
    return (
        <Box sx={{ bgcolor: "grey.100", py: 7 }}>
            <Container maxWidth="lg" sx={{ padding: 0 }}>
                <Grid2
                    container
                    columnSpacing={10}
                    rowSpacing={2}
                    sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        flexWrap: "wrap-reverse",
                    }}
                >
                    <Grid2
                        item
                        size={{
                            xs: 9,
                            sm: 8,
                            md: 4,
                        }}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: { xs: "center", md: "flex-end" },
                            justifyContent: "center",
                            gap: 2,
                        }}
                    >
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{
                                fontSize: {
                                    xs: "1.5rem",
                                    sm: "2rem",
                                    md: "2.5rem",
                                },
                                fontFamily: "Righteous",
                                fontWeight: 500,
                                maxWidth: 400,
                                textAlign: { xs: "center", md: "right" },
                            }}
                        >
                            Assess Your Skills
                            <br /> Get Certified by
                        </Typography>
                        <Typography
                            variant="h3"
                            gutterBottom
                            sx={{
                                fontSize: {
                                    xs: "1.5rem",
                                    sm: "2rem",
                                    md: "2.5rem",
                                },
                                fontFamily: "Righteous",
                                fontWeight: 500,
                                maxWidth: 400,
                                textAlign: { xs: "center", md: "right" },
                                color: "primary.main",
                            }}
                        >
                            Hearty Aid
                            <br />
                            Assessment Center
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => router.get(route("assessment.show"))}
                        >
                            Take Test Now
                        </Button>
                        {/* <Button size="small" color="primary">
                            Learn More
                        </Button> */}
                    </Grid2>
                    <Grid2 item size={{ xs: 9, sm: 8, md: 4 }}>
                        <img
                            src="/images/explore/assessment.png"
                            alt="Assessment Center"
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "8px",
                            }}
                        />
                    </Grid2>
                </Grid2>
            </Container>
        </Box>
    );
}

export default AssessmentCenter;
