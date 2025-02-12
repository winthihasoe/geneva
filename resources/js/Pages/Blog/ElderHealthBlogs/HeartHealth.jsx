import BackButton from "@/Components/BackButton";
import ECG from "@/Components/Fancy/ECG";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { Box, Container, Grid2, Typography } from "@mui/material";
import React from "react";
import BlogCard from "../components/BlogCard";

const BlogContents = [
    {
        title: "Hair Washing in Bed",
        image: "hair_washing.jpeg",
        content:
            "Hair washing for bedridden elderly requires gentle handling, proper support, and specialized equipment like inflatable wash basins. Warm water, mild shampoo, and careful rinsing maintain hygiene and comfort. Consider elevating their head",
    },
    {
        title: "Osteoporosis in Eldery",
        image: "osteoporosis.jpeg",
        content:
            "Osteoporosis is a condition characterized by the weakening of bones, making them more fragile likely to break. It primarily affects older adults, particularly women after menopause, due to decreased estrogen levels",
    },
    {
        title: "Hair Washing in Bed",
        image: "hair_washing.jpeg",
        content:
            "Hair washing for bedridden elderly requires gentle handling, proper support, and specialized equipment like inflatable wash basins. Warm water, mild shampoo, and careful rinsing maintain hygiene and comfort. Consider elevating their head",
    },
    {
        title: "Osteoporosis in Eldery",
        image: "osteoporosis.jpeg",
        content:
            "Osteoporosis is a condition characterized by the weakening of bones, making them more fragile likely to break. It primarily affects older adults, particularly women after menopause, due to decreased estrogen levels",
    },
];

function HeartHealth() {
    return (
        <AppLayout>
            <Head title="Heart Health" />
            <Container maxWidth="lg">
                <BackButton />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            backgroundImage:
                                "url(/images/elderBlogs/heart.png)",
                            height: { xs: 60, sm: 60, md: 70 },
                            width: { xs: 60, sm: 60, md: 70 },
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                        }}
                    />
                    <Typography
                        fontFamily={"Lilita One"}
                        fontSize={{ xs: 30, sm: 35, md: 50 }}
                        sx={{
                            wordWrap: "break-word",
                            color: "primary.main",
                            fontWeight: 800,
                        }}
                    >
                        Heart Health
                    </Typography>
                </Box>
                <Box
                    sx={{
                        textAlign: "center",
                        position: "relative",
                        mb: 3,
                        ml: { xs: 10, sm: 20, md: 30 },
                    }}
                >
                    <Box display={"inline-block"} position={"relative"}>
                        <Typography
                            fontFamily={"Lilita One"}
                            fontSize={{ xs: 25, sm: 30, md: 35 }}
                            sx={{
                                wordWrap: "break-word",
                                mb: 2,
                                color: "white",
                                textShadow:
                                    "3px 3px 0 #21875C, -3px -3px 0 #21875C, 3px -3px 0 #21875C, -3px 3px 0 #21875C, 4px 4px 10px rgba(0, 0, 0, 0.5)", // White stroke and subtle shadow
                            }}
                        >
                            Elder Health Blogs
                        </Typography>
                        <ECG right={-100} top={8} />
                    </Box>
                </Box>
                <Box
                    my={3}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 3,
                    }}
                >
                    {BlogContents.map((blog, index) => (
                        <BlogCard
                            title={blog.title}
                            image={blog.image}
                            content={blog.content}
                        />
                    ))}
                </Box>
            </Container>
        </AppLayout>
    );
}

export default HeartHealth;
