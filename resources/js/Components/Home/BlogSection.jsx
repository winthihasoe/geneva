import { router } from "@inertiajs/react";
import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import React from "react";

function BlogSection() {
    return (
        <Box sx={{ bgcolor: "secondary.main", py: 7 }}>
            <Container maxWidth="lg">
                <Grid2
                    container
                    spacing={2}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Grid2
                        item
                        size={{ xs: 12, sm: 12, md: 5 }}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Box
                            sx={{
                                width: { xs: "100%", sm: "80%" },
                                bgcolor: "gray.200",
                                borderRadius: 4,
                                boxShadow: 5,
                                px: 2,
                                pb: 5,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src="/images/blogs/baby.png"
                                alt="Blog Hero"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    borderRadius: "8px",
                                }}
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    mt: 2,
                                    width: "80%",
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    fontFamily={"Righteous"}
                                    fontWeight={500}
                                    color="primary.main"
                                    textAlign={"center"}
                                >
                                    Baby & Maternal Health
                                </Typography>
                                <Typography variant="body2">
                                    Nurture every stage of motherhood from
                                    pregnancy to newborn care.{" "}
                                    <b>
                                        Discover baby health tips, feeding
                                        guidance, and maternal wellness
                                    </b>{" "}
                                    advice.
                                </Typography>
                                <Button
                                    onClick={() =>
                                        // router.get(
                                        //     route(
                                        //         "blog.maternal.baby.healthcare"
                                        //     )
                                        // )
                                        router.get(route("coming.soon"))
                                    }
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                >
                                    Explore Baby & Maternal Tips
                                </Button>
                            </Box>
                        </Box>
                    </Grid2>
                    <Grid2
                        item
                        size={{ xs: 12, sm: 10, md: 6 }}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                p: 2,
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: { xs: "wrap-reverse", sm: "nowrap" },
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                    mt: 2,
                                    width: { xs: "100%", sm: "60%" },
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: {
                                            xs: "1.5rem",
                                            sm: "2rem",
                                            md: "2.5rem",
                                        },
                                        fontWeight: 500,
                                        color: "white",
                                        textAlign: "center",
                                        fontFamily: "Righteous",
                                    }}
                                >
                                    Elder Health
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ textAlign: "center", mt: 1 }}
                                >
                                    Support your loved ones in aging gracefully.
                                    Read about chronic disease care, mental
                                    wellness, daily mobility, and nutrition for
                                    elders.
                                </Typography>
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 1 }}
                                    // onClick={() =>
                                    //     router.get(route("blog.elder.health"))
                                    // }
                                    onClick={() =>
                                        router.get(route("coming.soon"))
                                    }
                                >
                                    Explore Elder Health Guides
                                </Button>
                            </Box>
                            <Box sx={{ width: { xs: "100%", sm: "40%" } }}>
                                <img
                                    src="/images/blogs/exercise.png"
                                    alt="blog image"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        margin: "auto",
                                        borderRadius: "8px",
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                p: 2,
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: { xs: "wrap-reverse", sm: "nowrap" },
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                    mt: 2,
                                    width: { xs: "100%", sm: "60%" },
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: {
                                            xs: "1.5rem",
                                            sm: "2rem",
                                            md: "2.5rem",
                                        },
                                        fontWeight: 500,
                                        color: "white",
                                        textAlign: "center",
                                        fontFamily: "Righteous",
                                    }}
                                >
                                    First Aid & <br />
                                    Emergency Care
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ textAlign: "center", mt: 1 }}
                                >
                                    Be ready when it matters most. Learn
                                    essential first-aid techniques, how to
                                    handle common home emergencies, and
                                    caregiver safety tips.
                                </Typography>
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 1 }}
                                    // onClick={() =>
                                    //     router.get(
                                    //         route("blog.emergency.health")
                                    //     )
                                    // }
                                    onClick={() =>
                                        router.get(route("coming.soon"))
                                    }
                                >
                                    Learn First Aid Essentials
                                </Button>
                            </Box>
                            <Box sx={{ width: { xs: "100%", sm: "40%" } }}>
                                <img
                                    src="/images/blogs/firstaid.png"
                                    alt="blog image"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        margin: "auto",
                                        borderRadius: "8px",
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>
                        </Box>
                    </Grid2>
                </Grid2>
            </Container>
        </Box>
    );
}

export default BlogSection;
