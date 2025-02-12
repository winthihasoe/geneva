import BackButton from "@/Components/BackButton";
import ECG from "@/Components/Fancy/ECG";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { Box, Container, Grid2, Typography } from "@mui/material";
import React from "react";

const UpperTopics = [
    {
        content: "Aging Process",
        image: "elders.png",
    },
    {
        content: "Nutrition & Hydration",
        image: "vegetable.png",
    },
    {
        content: "Common Elder Diseases",
        image: "disease.png",
    },
];

const LowerTopics = [
    {
        content: "Mental Health Awareness",
        image: "mental.png",
    },
    {
        content: "Communication Strategies",
        image: "communication.png",
    },
    {
        content: "Basic Pharmacology",
        image: "pharma.png",
    },
    {
        content: "Basic Anatomy",
        image: "anatomy.png",
    },
    {
        content: "Sleep Disorder",
        image: "sleep.png",
    },
    {
        content: "Palliative Care",
        image: "palliative.png",
    },
    {
        content: "Ethic & Rights",
        image: "ethics.png",
    },
    {
        content: "Self-Care for Caregivers",
        image: "selfcare.png",
    },
    {
        content: "Medical Terms & Abbreviations",
        image: "terms.png",
    },

    {
        content: "Medical Emergencies",
        image: "emergency.png",
    },
];

const Block = ({ content, image }) => (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center", margin: "auto" }}>
        <Box
            sx={{
                backgroundImage: `url(/images/elderKnowledge/${image})`,
                height: { xs: 60, sm: 60, md: 70 },
                width: { xs: 60, sm: 60, md: 70 },
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
            }}
        />
        <Box
            sx={{
                border: "1px solid #21875C",
                borderRadius: 8,
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

function ElderCaregivingKnowledge() {
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
                    <Grid2 container rowGap={2} mb={2}>
                        <Grid2
                            size={{ xs: 12, sm: 6 }}
                            display={"flex"}
                            flexDirection={"column"}
                            justifyContent={"center"}
                            rowGap={2}
                        >
                            {UpperTopics.map((skill, index) => (
                                <Block
                                    key={index}
                                    content={skill.content}
                                    image={skill.image}
                                />
                            ))}
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6 }}>
                            <Box
                                sx={{
                                    backgroundImage:
                                        "url(/images/elderKnowledge/caregiver.png)",
                                    height: 280,
                                    width: "100%",
                                    backgroundSize: "contain",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                }}
                            />
                        </Grid2>
                    </Grid2>
                    <Grid2 container rowGap={2}>
                        {LowerTopics.map((skill, index) => (
                            <Grid2
                                size={{ xs: 12, sm: 6 }}
                                display={"flex"}
                                justifyContent={"center"}
                                key={index}
                            >
                                <Block
                                    content={skill.content}
                                    image={skill.image}
                                />
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>
            </Container>

            <Box
                sx={{
                    maxWidth: 400,
                    margin: "50px auto",
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "Lilita One",
                        fontSize: { xs: 25, sm: 28 },
                        fontWeight: 600,
                        textAlign: "center",
                    }}
                >
                    "Knowledge has to be improved, challenged, and increased
                    constantly, or it vanishes."
                </Typography>
            </Box>
        </AppLayout>
    );
}

export default ElderCaregivingKnowledge;
