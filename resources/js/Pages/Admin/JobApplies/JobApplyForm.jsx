import AdminLayout from "@/Layouts/AdminLayout";
import BackButton from "@/Components/BackButton";
import JobApplyPipelineFields, {
    interviewerNames,
} from "@/Pages/Admin/JobApplies/components/JobApplyPipelineFields";
import { Head, useForm } from "@inertiajs/react";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";

const emptyRecord = {
    service_area: "Yangon",
    name: "",
    phone: "",
    gender: "",
    date_of_birth: "",
    coordinated_by: "",
    interviewed_by: [],
    cv_reported_date: "",
    interview_date: "",
    training_start_date: "",
    assessment_date: "",
    interview_score: "",
    interview_score_note: "",
    interview_note: "",
    decision: "pending",
    assessment_score: "",
    training_note: "",
    assessment_note: "",
    notes: "",
};

export default function JobApplyForm({
    record = null,
    branches = [],
    genders = [],
    staff = [],
    decisions = [],
}) {
    const { data, setData, post, processing, errors } = useForm({
        ...emptyRecord,
        ...(record || {}),
        interviewed_by: interviewerNames(record?.interviewed_by),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.job.apply.store"));
    };

    return (
        <AdminLayout>
            <Head title="Add candidate" />
            <Container maxWidth="md" sx={{ px: { xs: 0 }, mb: 6 }}>
                <BackButton
                    route={route("admin.job.apply")}
                    label="Job Applies"
                />
                <Box sx={{ maxWidth: 720, mx: "auto" }}>
                    <Typography
                        fontSize={{ xs: 22, sm: 26 }}
                        fontWeight={600}
                        fontFamily="Livvic"
                        color="text.primary"
                    >
                        Add candidate
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        autoComplete="off"
                    >
                        <JobApplyPipelineFields
                            data={data}
                            setData={setData}
                            errors={errors}
                            branches={branches}
                            genders={genders}
                            staff={staff}
                            decisions={decisions}
                            includeProfile
                        />

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: {
                                    xs: "stretch",
                                    sm: "flex-end",
                                },
                                pt: 3,
                                borderTop: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={processing}
                                sx={{
                                    width: { xs: "100%", sm: "auto" },
                                    minWidth: { sm: 180 },
                                }}
                            >
                                Save candidate
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </AdminLayout>
    );
}
