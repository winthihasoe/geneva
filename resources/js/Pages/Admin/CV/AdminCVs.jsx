import AdminResumeTable from "@/Components/Admin/CV/AdminResumeTable";
import ResumeCard from "@/Components/Admin/CV/ResumeCard";
import Subtitle from "@/Components/Typo/Subtitle";
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

export default function AdminCVs({ cvs, cvCount }) {
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
            <Container maxWidth="lg" sx={{ pb: 4, px: { xs: 0 } }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 2,
                        mb: 3,
                    }}
                >
                    <Typography
                        variant="h4"
                        color="primary"
                        fontWeight="bold"
                        mb={2}
                    >
                        CV
                    </Typography>
                    <Button
                        size="small"
                        variant="contained"
                        sx={{ fontSize: "0.9rem" }}
                        onClick={() => router.get(route("admin.cv.create"))}
                    >
                        Create CV
                    </Button>
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
                        <Subtitle>Total CV</Subtitle>
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
                                {cvCount || 0}
                            </Typography>
                        </Box>
                    </Box>
                    <form onSubmit={handleSearchSubmit}>
                        <TextField
                            placeholder="Nickname or Full name"
                            size="small"
                            value={search}
                            onChange={handleSearchChange}
                            variant="standard"
                        />
                        <Button type="submit">Search</Button>
                    </form>
                </Box>

                {/* {resumes.data.length > 0 ? (
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
                            severity="info"
                            sx={{
                                ml: "auto",
                                mt: 1,
                            }}
                        >
                            <Typography variant="body2">
                                Caregiver status will be green if caregivers use
                                their account within 2 hours. After 2 hours away
                                from platform, it turns red.
                            </Typography>
                        </Alert>
                    </>
                ) : (
                    <NoData />
                )} */}

                {cvs?.data.length > 0 ? (
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "center",
                                columnGap: 1,
                                rowGap: 1,
                                mb: 3,
                                mt: 2,
                            }}
                        >
                            {cvs?.data.map((cv) => (
                                <ResumeCard key={cv.id} resume={cv} />
                            ))}
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                my: 3,
                            }}
                        >
                            <Pagination
                                count={cvs.last_page}
                                page={cvs.current_page}
                                onChange={handlePageChange}
                            />
                        </Box>
                    </>
                ) : (
                    <NoData />
                )}
            </Container>
        </AdminLayout>
    );
}
