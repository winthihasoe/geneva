import Title from "@/Components/Typo/Title";
import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm } from "@inertiajs/react";
import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import ExperienceForm from "./components/ExperienceForm";
import NoData from "@/Components/util/NoData";
import ExperienceCard from "./components/ExperienceCard";
import TinyText from "@/Components/Typo/TinyText";

function MyExperiences({ experiences }) {
    const { data, setData, post, setError } = useForm({
        experience: "",
        detail: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("experience.store"), {
            onError: (errors) => {
                setError(errors);
            },
            onSuccess: () => {
                setData({
                    experience: "",
                    detail: "",
                });
            },
        });
    };

    return (
        <AppLayout>
            <Head title="My Certificates" />

            <Box
                sx={{
                    bgcolor: "primary.main",
                    color: "#fff",
                    px: { xs: 0, sm: 3 },
                    pb: 3,
                    py: 3,
                }}
            >
                <Typography
                    variant="h4"
                    textAlign={"center"}
                    fontFamily={"Livvic"}
                >
                    My Experiences
                </Typography>
                {experiences && experiences.length > 0 ? (
                    <Box p={{ xs: 1, sm: 2, md: 3 }} m={2}>
                        {experiences.map((exp) => (
                            <ExperienceCard exp={exp} />
                        ))}
                    </Box>
                ) : (
                    <NoData />
                )}

                <TinyText textAlign={"center"}>
                    Experiences are appeared in CV. So, caregiver needs to
                    describe experience clearly and short to the point.
                </TinyText>
            </Box>
            <Container maxWidth="md" sx={{ py: 3 }}>
                <Title>Create New Experience</Title>
                {experiences && experiences.length < 5 && (
                    <ExperienceForm
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                    />
                )}
            </Container>
        </AppLayout>
    );
}

export default MyExperiences;
