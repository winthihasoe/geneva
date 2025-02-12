import BackButton from "@/Components/BackButton";
import ECG from "@/Components/Fancy/ECG";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { Box, Container, Grid2, Typography } from "@mui/material";
import React from "react";

const Skills = [
    {
        content: "Vital Signs",
        image: "heart.png",
    },
    {
        content: "Hygiene & Grooming",
        image: "head.png",
    },
    {
        content: "Blood Glucose",
        image: "syringe.png",
    },
    {
        content: "Transferring & Mobility Aids",
        image: "body.png",
    },
    {
        content: "Respiratory Support",
        image: "mask.png",
    },
    {
        content: "Feeding Assistance",
        image: "feeding.png",
    },
    {
        content: "Wound Care",
        image: "wound.png",
    },
    {
        content: "CPR & Choking",
        image: "cpr.png",
    },
    {
        content: "Tube Feeding",
        image: "tubeFeeding.png",
    },
    {
        content: "Catheter Care",
        image: "drip.png",
    },
    {
        content: "Colostomy",
        image: "colon.png",
    },
    {
        content: "Suctioning & Tracheostomy",
        image: "care.png",
    },
];

const Block = ({ content, image }) => (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center", margin: "auto" }}>
        <Box
            sx={{
                backgroundImage: `url(/images/elderSkills/${image})`,
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
                height: 90,
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

function ElderCaregivingSkills() {
    return (
        <AppLayout>
            <Head title="Elder Caregiving Skills" />
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
                            Elder Caregiving Skills
                        </Typography>
                        <ECG right={-100} top={8} />
                    </Box>
                </Box>
                <Box>
                    <Grid2 container rowGap={2}>
                        {Skills.map((skill, index) => (
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
                    backgroundImage:
                        "url(/images/elderSkills/elderAndCaregiver.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: 600,
                    width: { xs: "90%", sm: "70%", md: "60%" },
                    position: "relative",
                    mt: 3,
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: 50,
                        right: 50,
                        width: 300,
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
                        "The skills of caregiving are not just practical; they
                        are the art of showing empathy in action."
                    </Typography>
                </Box>
            </Box>
        </AppLayout>
    );
}

export default ElderCaregivingSkills;
