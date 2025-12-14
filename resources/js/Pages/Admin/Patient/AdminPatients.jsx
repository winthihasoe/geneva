import AdminResumeTable from "@/Components/Admin/CV/AdminResumeTable";
import ResumeToApproveCard from "@/Components/Admin/CV/ResumeCard";
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
import PatientTable from "./components/PatientTable";

export default function AdminPatients({ patients, count }) {
    const handlePageChange = (event, value) => {
        router.get(route("admin.patients"), { page: value });
    };

    const [search, setSearch] = useState("");

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get(route("admin.patient.search"), { search: search.trim() });
    };

    return (
        <AdminLayout>
            <Head title="Patients" />
            <Container maxWidth="lg" sx={{ pb: 4, px: { xs: 0 } }}>
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
                        <Typography
                            variant="h4"
                            color="primary"
                            fontFamily={"Roboto Slab"}
                            fontWeight="bold"
                            mb={2}
                        >
                            Patients
                        </Typography>
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
                    <Button
                        onClick={() =>
                            router.get(route("admin.patient.create"))
                        }
                        size="small"
                        variant="contained"
                        sx={{
                            borderRadius: 20,
                            mb: 3,
                            fontSize: { xs: "0.8rem", sm: "1rem" },
                        }}
                    >
                        Create Patient
                    </Button>
                </Box>

                {/* Patient list */}

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
                            placeholder="Name"
                            size="small"
                            value={search}
                            onChange={handleSearchChange}
                        />
                        <Button type="submit">Search</Button>
                    </form>
                </Box>

                {patients.data.length > 0 ? (
                    <>
                        <PatientTable patients={patients.data} />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                my: 3,
                            }}
                        >
                            <Pagination
                                count={patients.last_page}
                                page={patients.current_page}
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
