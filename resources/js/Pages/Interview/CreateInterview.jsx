import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm } from "@inertiajs/react";
import { Box, Button, Grid2, Typography } from "@mui/material";
import React from "react";
import CVDetail from "./components/CVDetail";
import InterviewForm from "./components/InterviewForm";

function CreateInterview({ cv, carePlan, serviceFees, selectedSalary }) {
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

            <Grid2 container>
                <Grid2
                    size={{ xs: 12, sm: 6, md: 6 }}
                    sx={{ px: { xs: 1, sm: 3 }, py: 2 }}
                >
                    <CVDetail cv={cv} />
                </Grid2>
                <Grid2
                    size={{ xs: 12, sm: 6, md: 6 }}
                    sx={{ p: { xs: 1, sm: 2, md: 3 }, py: 2 }}
                >
                    <InterviewForm
                        data={data}
                        setData={setData}
                        carePlan={carePlan}
                        cv={cv}
                        serviceFees={serviceFees}
                        selectedSalary={selectedSalary}
                    />
                </Grid2>
            </Grid2>
            <Box textAlign={"center"} my={2}>
                <Button
                    variant="contained"
                    sx={{ borderRadius: 20 }}
                    onClick={handleSubmit}
                    disabled={processing}
                >
                    <Typography
                        fontSize={{ xs: 18, sm: 20, md: 25 }}
                        fontFamily={"Kavoon"}
                    >
                        Confirm to book an interview
                    </Typography>
                </Button>
                <Typography
                    fontFamily={"Kavivanar"}
                    fontSize={{ xs: 12, sm: 17, md: 17 }}
                    mt={2}
                    color="primary"
                >
                    "Interview fees will be collected prior to the start of the
                    interview session."
                </Typography>
                <Typography
                    fontFamily={"Kavivanar"}
                    fontSize={{ xs: 12, sm: 17, md: 17 }}
                    color="primary"
                >
                    It will be deducted upon confirmation of the job hire.
                </Typography>
            </Box>
        </AppLayout>
    );
}

export default CreateInterview;
