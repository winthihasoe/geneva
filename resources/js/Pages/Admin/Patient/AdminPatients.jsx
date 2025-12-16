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
    Alert,
} from "@mui/material";
import React, { useState } from "react";
import PatientTable from "./components/PatientTable";

export default function AdminPatients({
    patients,
    count,
    filters: initialFilters = {},
}) {
    const handlePageChange = (event, value) => {
        const params = { page: value };
        if (filters.service_area) params.service_area = filters.service_area;
        router.get(route("admin.patients"), params);
    };

    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        service_area: initialFilters.service_area || "",
    });

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get(route("admin.patient.search"), { search: search.trim() });
    };

    const handleServiceAreaClick = (area) => {
        if (filters.service_area === area) {
            setFilters({
                service_area: "",
            });
            router.get(route("admin.patients"));
        } else {
            setFilters({
                service_area: area,
            });
            router.get(route("admin.patients"), { service_area: area });
        }
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
                        justifyContent: "space-between",
                        mb: 2,
                        alignItems: "center",
                    }}
                >
                    <Box>
                        <Button
                            variant={
                                filters.service_area === "Mandalay"
                                    ? "contained"
                                    : "outlined"
                            }
                            size="small"
                            onClick={() => handleServiceAreaClick("Mandalay")}
                        >
                            Mandalay
                        </Button>
                        <Button
                            variant={
                                filters.service_area === "Yangon"
                                    ? "contained"
                                    : "outlined"
                            }
                            size="small"
                            onClick={() => handleServiceAreaClick("Yangon")}
                            sx={{ ml: 1 }}
                        >
                            Yangon
                        </Button>
                    </Box>

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
