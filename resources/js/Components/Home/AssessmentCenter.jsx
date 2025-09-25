import { router } from "@inertiajs/react";
import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import React from "react";

function AssessmentCenter() {
    return (
        <Box sx={{ bgcolor: "grey.100", py: 7 }}>
            <Container maxWidth="lg" sx={{ padding: 0 }}>
                <Grid2
                    container
                    sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        flexWrap: "wrap-reverse",
                        gap: 10,
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
                            fontFamily={"Righteous"}
                            fontWeight={500}
                            gutterBottom
                            textAlign={{ xs: "center", md: "right" }}
                            maxWidth={400}
                        >
                            Assess Your Skills
                            <br /> Get Certified by
                        </Typography>
                        <Typography
                            variant="h3"
                            fontFamily={"Righteous"}
                            fontWeight={500}
                            gutterBottom
                            textAlign={{ xs: "center", md: "right" }}
                            color="primary.main"
                            maxWidth={400}
                        >
                            Singapore Caregiving Academy
                        </Typography>
                        <Button
                            size="large"
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
