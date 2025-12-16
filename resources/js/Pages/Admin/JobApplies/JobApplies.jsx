import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import {
    Box,
    Container,
    Pagination,
    Typography,
    Button,
    TextField,
    Collapse,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
} from "@mui/material";
import React, { useState } from "react";
import AdminJobApplyTable from "./components/AdminJobApplyTable";
import NoData from "@/Components/util/NoData";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

function JobApplies({ jobApplies, count, filters: initialFilters = {} }) {
    const handlePageChange = (event, value) => {
        router.get(route("admin.job.apply"), { page: value });
    };

    const [search, setSearch] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        status: initialFilters.status || "",
        service_area: initialFilters.service_area || "",
    });

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("search", search);

        router.get(route("admin.job.apply.search"), { search: search.trim() });
    };

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleApplyFilters = () => {
        const params = {};
        if (filters.status) params.status = filters.status;
        if (filters.service_area) params.service_area = filters.service_area;

        router.get(route("admin.job.apply"), params);
    };

    const handleClearFilters = () => {
        setFilters({
            status: "",
            service_area: "",
        });
        router.get(route("admin.job.apply"));
    };

    const handleServiceAreaClick = (area) => {
        if (filters.service_area === area) {
            setFilters((prev) => ({
                ...prev,
                service_area: "",
            }));

            const params = {};
            if (filters.status) params.status = filters.status;

            router.get(route("admin.job.apply"), params);
        } else {
            setFilters((prev) => ({
                ...prev,
                service_area: area,
            }));

            const params = { ...filters, service_area: area };
            router.get(route("admin.job.apply"), params);
        }
    };

    const hasActiveFilters = filters.status || filters.service_area;

    return (
        <AdminLayout>
            <Container maxWidth="lg" sx={{ pb: 4, px: { xs: 0 } }}>
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
                            gap: 2,
                        }}
                    >
                        <Typography
                            fontWeight="bold"
                            color="primary"
                            mb={1}
                            variant="h4"
                            fontFamily={"Roboto Slab"}
                        >
                            Job Applies
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

                {/* Filter section */}
                <Box
                    sx={{
                        mb: 2,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: {
                            xs: "space-between",
                            sm: "flex-start",
                            md: "flex-start",
                        },
                        alignItems: "center",
                        gap: { xs: 0, sm: 2, md: 3 },
                    }}
                >
                    <Button
                        startIcon={<FilterListIcon />}
                        endIcon={
                            filterOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />
                        }
                        onClick={() => setFilterOpen(!filterOpen)}
                        variant="outlined"
                        size="small"
                    >
                        Filters{" "}
                        {hasActiveFilters &&
                            `(${
                                Object.values(filters).filter(Boolean).length
                            })`}
                    </Button>
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
                </Box>

                <Collapse in={filterOpen}>
                    <Box
                        sx={{
                            my: 2,
                            p: 2,
                            border: "1px solid #939393ff",
                            borderRadius: 2,
                            bgcolor: "paper.main",
                        }}
                    >
                        <Box>
                            <FormControl
                                size="small"
                                sx={{
                                    minWidth: { xs: "100%", sm: 200 },
                                    mb: 1,
                                }}
                            >
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={filters.status}
                                    label="Status"
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "status",
                                            e.target.value
                                        )
                                    }
                                >
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="Contacted">
                                        Contacted
                                    </MenuItem>
                                    <MenuItem value="Uncontactable">
                                        Uncontactable
                                    </MenuItem>
                                    <MenuItem value="Refuse Job">
                                        Refuse Job
                                    </MenuItem>
                                </Select>
                            </FormControl>

                            {hasActiveFilters && (
                                <Box
                                    sx={{
                                        mb: 2,
                                        display: "flex",
                                        gap: 1,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    {filters.status && (
                                        <Chip
                                            label={`Status: ${filters.status}`}
                                            onDelete={() =>
                                                handleFilterChange("status", "")
                                            }
                                            size="small"
                                        />
                                    )}
                                    {filters.service_area && (
                                        <Chip
                                            label={`Service Area: ${filters.service_area}`}
                                            onDelete={() =>
                                                handleFilterChange(
                                                    "service_area",
                                                    ""
                                                )
                                            }
                                            size="small"
                                        />
                                    )}
                                </Box>
                            )}

                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 1,
                                    justifyContent: {
                                        xs: "center",
                                        sm: "flex-start",
                                    },
                                    alignItems: "center",
                                    flex: 1,
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={handleApplyFilters}
                                    size="small"
                                >
                                    Apply
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={handleClearFilters}
                                    size="small"
                                    disabled={!hasActiveFilters}
                                >
                                    Clear
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Collapse>

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
