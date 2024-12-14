import Title from "@/Components/Typo/Title";
import NoData from "@/Components/util/NoData";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import {
    Box,
    Button,
    Container,
    TextField,
    Pagination,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import InterviewTable from "./components/InterviewTable";

export default function AdminInterviews({ interviews, count }) {
    const handlePageChange = (event, value) => {
        router.get(route("admin.interviews"), { page: value });
    };

    const [search, setSearch] = useState("");

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get(route("admin.interview.search"), { search: search.trim() });
    };

    return (
        <AdminLayout>
            <Head title="Interviews" />
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <Title>Interviews</Title>
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
                                {count || 0}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        flexWrap: "wrap",
                        justifyContent: "flex-end",
                        mb: 2,
                    }}
                >
                    <form onSubmit={handleSearchSubmit}>
                        <TextField
                            placeholder="Pt or Cg Name"
                            size="small"
                            value={search}
                            onChange={handleSearchChange}
                        />
                        <Button type="submit">Search</Button>
                    </form>
                </Box>

                {interviews.data.length > 0 ? (
                    <>
                        <InterviewTable interviews={interviews.data} />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                my: 3,
                            }}
                        >
                            <Pagination
                                count={interviews.last_page}
                                page={interviews.current_page}
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
