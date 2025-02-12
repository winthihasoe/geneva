import BackButton from "@/Components/BackButton";
import ECG from "@/Components/Fancy/ECG";
import AppLayout from "@/Layouts/AppLayout";
import { Head, router } from "@inertiajs/react";
import { Box, Container, Grid2, Typography } from "@mui/material";
import React from "react";

const Topics = [
    {
        content: "Heart Health",
        image: "heart.png",
        link: "blog.elder.health.heart",
    },
    {
        content: "Liver Health",
        image: "liver.png",
        link: "blog.elder.health.liver",
    },
    {
        content: "Kidney Health",
        image: "kidney.png",
        link: "blog.elder.health.kidney",
    },
    {
        content: "Lungs Health",
        image: "lungs.png",
        link: "blog.elder.health.lungs",
    },
    {
        content: "Bone Health",
        image: "bone.png",
        link: "blog.elder.health.bone",
    },
    {
        content: "Digestive Health",
        image: "digestive.png",
        link: "blog.elder.health.digestive",
    },
    {
        content: "Brain & Mental Health",
        image: "brain.png",
        link: "blog.elder.health.brain",
    },
    {
        content: "Eye Health",
        image: "eye.png",
        link: "blog.elder.health.eye",
    },
    {
        content: "Diabetes Management",
        image: "glucose.png",
        link: "blog.elder.health.diabetes",
    },
    {
        content: "Hypertension",
        image: "blood.png",
        link: "blog.elder.health.hypertension",
    },
    {
        content: "Hearing Health",
        image: "ear.png",
        link: "blog.elder.health.hearing",
    },
    {
        content: "Cancer",
        image: "virus.png",
        link: "blog.elder.health.cancer",
    },
    {
        content: "Physical Exercise",
        image: "exercise.png",
        link: "blog.elder.health.physical",
    },
    {
        content: "Nutrition & Diet",
        image: "nutrition.png",
        link: "blog.elder.health.nutrition",
    },
    {
        content: "Dental Health",
        image: "teeth.png",
        link: "blog.elder.health.dental",
    },
    {
        content: "Drug & Medication",
        image: "drugs.png",
        link: "blog.elder.health.drug",
    },
];

const Block = ({ content, image, link }) => (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center", margin: "auto" }}>
        <Box
            sx={{
                backgroundImage: `url(/images/elderBlogs/${image})`,
                height: { xs: 60, sm: 60, md: 70 },
                width: { xs: 60, sm: 60, md: 70 },
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
            }}
        />
        <Box
            sx={{
                border: "1px solid #21875C",
                borderRadius: 7,
                boxShadow: 2,
                px: 3,
                py: 1,
                width: { xs: 250, sm: 250 },
                height: 70,
                mb: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                bgcolor: "white",
            }}
            component={"button"}
            onClick={() => router.get(route(link))}
        >
            <Typography
                textAlign={"center"}
                fontFamily={"Livvic"}
                fontSize={{ xs: 16, sm: 17, md: 18 }}
                color="primary"
                fontWeight={600}
            >
                {content}
            </Typography>
        </Box>
    </Box>
);

function ElderHealthBlogs() {
    return (
        <AppLayout>
            <Head title="Elder Health Blogs" />
            <Container maxWidth="lg">
                <BackButton />
                <Box
                    sx={{
                        textAlign: "center",
                        position: "relative",
                        mb: 3,
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
                            Elder Health Blogs
                        </Typography>
                        <ECG right={-100} top={8} />
                    </Box>
                </Box>
                <Box>
                    <Grid2 container rowGap={2}>
                        {Topics.map((skill, index) => (
                            <Grid2
                                size={{ xs: 12, sm: 6 }}
                                display={"flex"}
                                justifyContent={"center"}
                                key={index}
                            >
                                <Block
                                    content={skill.content}
                                    image={skill.image}
                                    link={skill.link}
                                />
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>
            </Container>
            <Box
                sx={{
                    backgroundImage: "url(/images/elderBlogs/elders.png)",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: { xs: 400, sm: 500, md: 600 },
                    width: { xs: "100%", sm: "70%", md: "70%" },
                    position: "relative",
                    mt: 3,
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: 50,
                        right: { xs: -20, sm: -50, md: -100 },
                        width: 250,
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: "Lilita One",
                            fontSize: { xs: 25, sm: 28 },
                            fontWeight: 600,
                            textAlign: "center",
                            bgcolor: "rgba(255, 255, 255, 0.4)",
                            borderRadius: 8,
                            p: 2,
                        }}
                    >
                        "Aging is just another word for living wisely."
                    </Typography>
                </Box>
            </Box>
        </AppLayout>
    );
}

export default ElderHealthBlogs;
