import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm } from "@inertiajs/react";
import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import React from "react";
import InterviewForm from "./components/InterviewForm";
import CVSmall from "./components/CVSmall";

function CreateInterview({ cv, carePlan }) {
    const { data, setData, post, errors, setError, processing } = useForm({
        cv_id: cv.id,
        care_plan_id: carePlan.id,
        date: "",
        time: "",
        alt_date: "",
        alt_time: "",
        mode: "", // In person or virtual
        location: "",
        online: "",
    });

    const handleSubmit = () => {
        post(route("interview.create"), {
            data,
        });
    };

    return (
        <AppLayout>
            <Head title="Create Interview" />
            <Container maxWidth="lg" sx={{ pt: 1, pb: 3 }}>
                <Grid2
                    container
                    sx={{ display: "flex", flexWrap: "wrap-reverse", gap: 2 }}
                >
                    <Grid2
                        size={{ xs: 12, sm: 6, md: 6 }}
                        sx={{ px: { xs: 1, sm: 3 }, py: 2 }}
                    >
                        {/* <CVDetail cv={cv} /> */}
                        <CVSmall cv={cv} />
                    </Grid2>
                    <Grid2
                        size={{ xs: 12, sm: 6, md: 5 }}
                        sx={{ p: { xs: 1, sm: 2, md: 3 }, py: 2 }}
                    >
                        <InterviewForm
                            data={data}
                            setData={setData}
                            carePlan={carePlan}
                            cv={cv}
                            processing={processing}
                            handleSubmit={handleSubmit}
                            // serviceFees={serviceFees}
                            // selectedSalary={selectedSalary}
                        />
                    </Grid2>
                </Grid2>
            </Container>
        </AppLayout>
    );
}

export default CreateInterview;
