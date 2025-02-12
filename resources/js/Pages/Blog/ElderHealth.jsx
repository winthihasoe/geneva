import AppLayout from "@/Layouts/AppLayout";
import { Head, router } from "@inertiajs/react";
import { Box, Container, Typography } from "@mui/material";
import React from "react";
import ECG from "@/Components/Fancy/ECG";
import BlogCard from "./components/BlogCard";
import BackButton from "@/Components/BackButton";

const Capsule = ({ title, image, link }) => (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            p: 1,
            py: 2,
            border: "1px solid #21875C",
            borderRadius: 30,
            width: 168,
            bgcolor: "white",
            cursor: "pointer",
        }}
        component="button"
        onClick={() => router.get(route(link))}
    >
        <Typography
            sx={{
                fontFamily: "Lilita One",
                color: "primary.main",
                fontSize: 24,
                p: 2,
                textAlign: "center",
            }}
        >
            {title}
        </Typography>
        <Box
            component="img"
            src={`/images/elderHealth/${image}`}
            sx={{
                height: 150,
                width: 150,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
            }}
        />
    </Box>
);

const Items = [
    {
        title: "Caregiving Skills",
        image: "caregiving_skills.png",
        link: "blog.elder.caregiving.skills",
    },

    {
        title: "Elder Health Blogs",
        image: "elder_health_blogs.png",
        link: "blog.elder.health",
    },
    {
        title: "Caregiving Knowledge",
        image: "caregiving_knowledge.png",
        link: "blog.elder.caregiving.knlowledge",
    },
];

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
function ElderHealth() {
    return (
        <AppLayout>
            <Head title="Elder Health" />
            <Container maxWidth="lg">
                <BackButton />
                <Box
                    sx={{
                        textAlign: "center",
                        my: 3,
                        position: "relative",
                    }}
                >
                    <Box display={"inline-block"} position={"relative"}>
                        <Typography
                            fontFamily={"Lilita One"}
                            fontSize={{ xs: 35, sm: 40, md: 45 }}
                            sx={{
                                wordWrap: "break-word",
                                mb: 2,
                                color: "white",
                                textShadow:
                                    "3px 3px 0 #21875C, -3px -3px 0 #21875C, 3px -3px 0 #21875C, -3px 3px 0 #21875C, 4px 4px 10px rgba(0, 0, 0, 0.5)", // White stroke and subtle shadow
                            }}
                        >
                            Elder Care
                        </Typography>
                        <ECG right={-100} top={8} />
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: 5,
                    }}
                >
                    {Items.map((item, index) => (
                        <Box key={index} sx={{ mt: index == 1 ? 6 : 0 }}>
                            <Capsule
                                title={item.title}
                                image={item.image}
                                link={item.link}
                            />
                        </Box>
                    ))}
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

export default ElderHealth;
