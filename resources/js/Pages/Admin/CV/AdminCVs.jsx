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
    Collapse,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Rating,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";

export default function AdminCVs({
    cvs,
    cvCount,
    filters: initialFilters = {},
}) {
    const handlePageChange = (event, value) => {
        router.get(route("admin.cv.all"), { page: value });
    };

    const [search, setSearch] = useState("");

    const [filterOpen, setFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        status: initialFilters.status || "",
        service_area: initialFilters.service_area || "",
    });

    // Initialize viewMode from localStorage, default to "card"
    const [viewMode, setViewMode] = useState(() => {
        return localStorage.getItem("cvViewMode") || "card";
    });

    // Save viewMode to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cvViewMode", viewMode);
    }, [viewMode]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get(route("admin.cv.search"), { search: search.trim() });
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
        // if (filters.caregiverLevel) params.level = filters.caregiverLevel;
        // if (filters.nannyLevel) params.nanny_care_level = filters.nannyLevel;
        if (filters.service_area) params.service_area = filters.service_area;

        router.get(route("admin.cv.all"), params);
    };

    const handleClearFilters = () => {
        setFilters({
            status: "",
            caregiverLevel: "",
            nannyLevel: "",
        });
        router.get(route("admin.cv.all"));
    };

    const handleServiceAreaClick = (area) => {
        // If clicking the same area that's already selected, clear it
        if (filters.service_area === area) {
            setFilters((prev) => ({
                ...prev,
                service_area: "",
            }));

            // Keep other filters but remove service_area
            const params = {};
            if (filters.status) params.status = filters.status;

            router.get(route("admin.cv.all"), params);
        } else {
            // Set the new area
            setFilters((prev) => ({
                ...prev,
                service_area: area,
            }));

            // Keep all existing filters and add/update service_area
            const params = { ...filters, service_area: area };
            router.get(route("admin.cv.all"), params);
        }
    };

    const hasActiveFilters = filters.status || filters.service_area;

    console.log("cvs", cvs.data);

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
                        mb: { xs: 1, sm: 2, md: 3 },
                    }}
                >
                    <Typography
                        variant="h4"
                        color="primary"
                        fontFamily={"Roboto Slab"}
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

                {/* Total CV and Search  */}
                <Box
                    sx={{
                        display: "flex",
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
                            placeholder="Caregiver name"
                            size="small"
                            value={search}
                            onChange={handleSearchChange}
                            variant="standard"
                        />
                        <Button type="submit">Search</Button>
                    </form>
                </Box>

                {/* Filter section */}
                <Box
                    sx={{
                        mb: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
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

                    {/* View Toggle Buttons */}
                    <Box>
                        <IconButton
                            onClick={() => setViewMode("card")}
                            color={viewMode === "card" ? "primary" : "default"}
                            size="small"
                        >
                            <ViewModuleIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => setViewMode("list")}
                            color={viewMode === "list" ? "primary" : "default"}
                            size="small"
                        >
                            <ViewListIcon />
                        </IconButton>
                    </Box>
                </Box>

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

                <Collapse in={filterOpen}>
                    <Box
                        sx={{
                            mt: 2,
                            p: 2,
                            border: "1px solid #939393ff",
                            borderRadius: 2,
                            bgcolor: "paper.main",
                        }}
                    >
                        <Box>
                            <FormControl
                                size="small"
                                sx={{ minWidth: 200, mb: 1 }}
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
                                    <MenuItem value="Available">
                                        Available
                                    </MenuItem>
                                    <MenuItem value="Occupied">
                                        Occupied
                                    </MenuItem>
                                    <MenuItem value="Leave">Leave</MenuItem>
                                    <MenuItem value="Resigned">
                                        Resigned
                                    </MenuItem>
                                    <MenuItem value="Blacklisted">
                                        Blacklisted
                                    </MenuItem>
                                </Select>
                            </FormControl>

                            {/* Caregiver Level  */}
                            {/* <FormControl
                                size="small"
                                sx={{ minWidth: 180 }}
                            >
                                <InputLabel>Caregiver Level</InputLabel>
                                <Select
                                    value={filters.caregiverLevel}
                                    label="Caregiver Level"
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "caregiverLevel",
                                            e.target.value
                                        )
                                    }
                                >
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="Caregiver">
                                        Caregiver
                                    </MenuItem>
                                    <MenuItem value="Advanced Caregiver">
                                        Advanced Caregiver
                                    </MenuItem>
                                </Select>
                            </FormControl> */}

                            {/* Nanny Level   */}
                            {/* <FormControl
                                size="small"
                                sx={{ minWidth: 150 }}
                            >
                                <InputLabel>Nanny Level</InputLabel>
                                <Select
                                    value={filters.nannyLevel}
                                    label="Nanny Level"
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "nannyLevel",
                                            e.target.value
                                        )
                                    }
                                >
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="Nanny">Nanny</MenuItem>
                                    <MenuItem value="Super Nanny">
                                        Super Nanny
                                    </MenuItem>
                                </Select>
                            </FormControl> */}

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
                                    {/* {filters.caregiverLevel && (
                                        <Chip
                                            label={`Caregiver: ${filters.caregiverLevel}`}
                                            onDelete={() =>
                                                handleFilterChange(
                                                    "caregiverLevel",
                                                    ""
                                                )
                                            }
                                            size="small"
                                        />
                                    )}
                                    {filters.nannyLevel && (
                                        <Chip
                                            label={`Nanny: ${filters.nannyLevel}`}
                                            onDelete={() =>
                                                handleFilterChange(
                                                    "nannyLevel",
                                                    ""
                                                )
                                            }
                                            size="small"
                                        />
                                    )} */}
                                </Box>
                            )}

                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 1,
                                    justifyContent: "center",
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

                {/* Show CVs  */}
                {cvs?.data.length > 0 ? (
                    <>
                        {viewMode === "card" ? (
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
                        ) : (
                            <TableContainer
                                component={Paper}
                                sx={{ mb: 3, mt: 2 }}
                            >
                                <Table>
                                    <TableHead sx={{ bgcolor: "gray.200" }}>
                                        <TableRow>
                                            <TableCell
                                                sx={{
                                                    fontSize: "0.8rem",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Name
                                            </TableCell>

                                            <TableCell
                                                sx={{
                                                    fontSize: "0.8rem",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Location
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    fontSize: "0.8rem",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Phone
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cvs?.data.map((cv) => (
                                            <TableRow
                                                key={cv.id}
                                                hover
                                                sx={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    router.visit(
                                                        route(
                                                            "admin.cv.single",
                                                            { cvId: cv.id }
                                                        )
                                                    )
                                                }
                                            >
                                                <TableCell
                                                    sx={{
                                                        fontSize: {
                                                            xs: "0.7rem",
                                                            sm: "0.7rem",
                                                            md: "0.8rem",
                                                        },
                                                    }}
                                                >
                                                    <Box>
                                                        <Typography
                                                            sx={{
                                                                fontSize: {
                                                                    xs: "0.7rem",
                                                                    sm: "0.7rem",
                                                                    md: "0.8rem",
                                                                },
                                                                fontWeight: 500,
                                                            }}
                                                        >
                                                            {cv.full_name}
                                                        </Typography>
                                                        {cv.reviews_count >
                                                            0 && (
                                                            <Box
                                                                sx={{
                                                                    display:
                                                                        "flex",
                                                                    alignItems:
                                                                        "center",
                                                                    gap: 0.5,
                                                                    mt: 0.5,
                                                                }}
                                                            >
                                                                <Rating
                                                                    value={
                                                                        cv.reviews_avg_rating ||
                                                                        0
                                                                    }
                                                                    readOnly
                                                                    size="small"
                                                                    precision={
                                                                        0.5
                                                                    }
                                                                    sx={{
                                                                        fontSize:
                                                                            "0.9rem",
                                                                    }}
                                                                />
                                                                <Typography
                                                                    variant="caption"
                                                                    color="text.secondary"
                                                                    sx={{
                                                                        fontSize:
                                                                            "0.65rem",
                                                                    }}
                                                                >
                                                                    (
                                                                    {
                                                                        cv.reviews_count
                                                                    }
                                                                    )
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                </TableCell>

                                                <TableCell
                                                    sx={{
                                                        fontSize: "0.7rem",
                                                    }}
                                                >
                                                    {cv.service_area}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontSize: "0.7rem",
                                                    }}
                                                >
                                                    {/* when click, phone call  */}
                                                    <a href={`tel:${cv.phone}`}>
                                                        {cv.phone}
                                                    </a>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
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
