import AdminResumeTable from "@/Components/Admin/CV/AdminResumeTable";
import ResumeToApproveCard from "@/Components/Admin/CV/ResumeToApproveCard";
import ResumeText from "@/Components/Typo/ResumeText";
import Subtitle from "@/Components/Typo/Subtitle";
import Title from "@/Components/Typo/Title";
import NoData from "@/Components/util/NoData";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import {
    Box,
    Button,
    Container,
    Divider,
    TextField,
    Pagination,
    Typography,
    Alert,
} from "@mui/material";
import React, { useState } from "react";

export default function AdminCVs({
    resumes,
    resumeNeedToApprove,
    resumeCount,
}) {
    const ResumeNeedToApprove = Object.values(resumeNeedToApprove);
    const needToApproveResumeCount = ResumeNeedToApprove.length;
    const handlePageChange = (event, value) => {
        router.get(route("admin.cv.all"), { page: value });
    };

    const [search, setSearch] = useState("");

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("search", search);

        router.get(route("admin.cv.search"), { search: search.trim() });
    };

    return (
        <AdminLayout>
            <Head title="Resumes" />
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        mb: 3,
                        gap: 1,
                    }}
                >
                    <Title>Resumes</Title>
                </Box>

                {/* Resume list */}

                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        mb: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Subtitle>Approved Resume list</Subtitle>
                        <Box
                            sx={{
                                bgcolor: "red",
                                width: 30,
                                height: 30,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "50%",
                                display: "flex",
                                mb: 1,
                            }}
                        >
                            <Typography fontSize={11} color={"#fff"}>
                                {resumeCount || 0}
                            </Typography>
                        </Box>
                    </Box>
                    <form onSubmit={handleSearchSubmit}>
                        <TextField
                            placeholder="Nickname or Full name"
                            size="small"
                            value={search}
                            onChange={handleSearchChange}
                        />
                        <Button type="submit">Search</Button>
                    </form>
                </Box>

                {resumes.data.length > 0 ? (
                    <>
                        <AdminResumeTable resumes={resumes.data} />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                my: 3,
                            }}
                        >
                            <Pagination
                                count={resumes.last_page}
                                page={resumes.current_page}
                                onChange={handlePageChange}
                            />
                        </Box>
                        <Alert
                            severity="warning"
                            sx={{
                                ml: "auto",
                                mt: 1,
                            }}
                        >
                            <ResumeText>Tips!</ResumeText>
                            <ResumeText>
                                Caregiver status will be green if caregivers use
                                their account within 2 hours. After 2 hours away
                                from platform, it turns red.
                            </ResumeText>
                        </Alert>
                    </>
                ) : (
                    <NoData />
                )}

                <Divider sx={{ my: 3 }} />

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Subtitle>To approve</Subtitle>
                    <Box
                        sx={{
                            bgcolor: "red",
                            width: 30,
                            height: 30,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "50%",
                            display: "flex",
                            mb: 1,
                        }}
                    >
                        <Typography fontSize={11} color={"#fff"}>
                            {ResumeNeedToApprove.length || 0}
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        columnGap: 2,
                        rowGap: 1,
                        mb: 3,
                        mt: 2,
                    }}
                >
                    {ResumeNeedToApprove.length > 0 ? (
                        ResumeNeedToApprove.map((resume) => (
                            <ResumeToApproveCard
                                key={resume.id}
                                resume={resume}
                            />
                        ))
                    ) : (
                        <NoData />
                    )}
                </Box>
            </Container>
        </AdminLayout>
    );
}
