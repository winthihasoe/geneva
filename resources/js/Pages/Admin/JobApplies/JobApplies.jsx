import Subtitle from "@/Components/Typo/Subtitle";
import AgeCalculator from "@/Components/util/AgeCalculator";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import {
    Box,
    Container,
    Pagination,
    Paper,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    Table,
    TableBody,
    TextField,
} from "@mui/material";
import React, { useState } from "react";
import AdminJobApplyTable from "./components/AdminJobApplyTable";
import NoData from "@/Components/util/NoData";

function JobApplies({ jobApplies, count }) {
    const handlePageChange = (event, value) => {
        router.get(route("admin.job.apply"), { page: value });
    };

    const [search, setSearch] = useState("");

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("search", search);

        router.get(route("admin.job.apply.search"), { search: search.trim() });
    };
    return (
        <AdminLayout>
            <Container maxWidth="lg">
                <Head title="Job Applies" />
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
                        <Subtitle>Job Applies list</Subtitle>
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
                    <form onSubmit={handleSearchSubmit}>
                        <TextField
                            placeholder="Search by name"
                            size="small"
                            value={search}
                            onChange={handleSearchChange}
                        />
                        <Button type="submit">Search</Button>
                    </form>
                </Box>
                {jobApplies.data.length > 0 ? (
                    <>
                        <AdminJobApplyTable applications={jobApplies.data} />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                my: 3,
                            }}
                        >
                            <Pagination
                                count={jobApplies.last_page}
                                page={jobApplies.current_page}
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

export default JobApplies;
