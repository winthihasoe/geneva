import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import React from "react";
import CourseCard from "../CourseCard";

function OurPopularCourses({ courses }) {
    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {/* Title  */}

                <Typography
                    variant="h3"
                    sx={{
                        fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                    }}
                    textAlign="center"
                >
                    Our Popular Courses
                </Typography>

                {/* Courses  */}
                <Grid2
                    container
                    spacing={2}
                    sx={{
                        width: "100%",
                        p: 1,
                        alignItems: "flex-end",
                    }}
                >
                    {/* Show image and description  */}
                    <Grid2 item size={{ xs: 12, sm: 12, md: 6 }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <img
                                src="/images/courses/ads.png"
                                alt="Course"
                                style={{
                                    maxWidth: "300px",
                                    height: "auto",
                                    borderRadius: 8,
                                    objectFit: "contain",
                                }}
                            />
                            <Typography
                                variant="h6"
                                color="primary.main"
                                width={300}
                                textAlign="center"
                            >
                                Advance Your Career in Caregiving
                            </Typography>
                            <Typography
                                variant="body2"
                                width={300}
                                textAlign="center"
                            >
                                Elevate your professional journey with our
                                specialized training. Earning your certification
                                not only enhances your capabilities but also
                                opens doors to more opportunities and career
                                growth within the caregiving field.
                            </Typography>
                        </Box>
                    </Grid2>
                    {/* Show course contents  */}
                    <Grid2 item size={{ xs: 12, sm: 12, md: 6 }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 2,
                                px: { xs: 0, md: 2 },
                                py: 2,
                            }}
                        >
                            {courses.map((course, index) => (
                                <CourseCard key={index} course={course} />
                            ))}
                        </Box>
                        {/* <Box sx={{ textAlign: "center", mt: 2 }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                href="#"
                                size="small"
                            >
                                View All Courses
                            </Button>
                        </Box> */}
                    </Grid2>
                </Grid2>
            </Box>
        </Container>
    );
}

export default OurPopularCourses;
