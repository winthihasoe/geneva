import ResumeCard from "@/Components/Admin/CV/ResumeCard";
import NoData from "@/Components/util/NoData";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import {
    Badge,
    Box,
    Button,
    Chip,
    Container,
    Divider,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Pagination,
    Popover,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import CvListSheet from "./components/CvListSheet";

const EMPTY_FILTERS = {
    status: "",
    service_area: "",
    services: "",
};

function filtersFromProps(source = {}) {
    return {
        status: source.status || "",
        service_area: source.service_area || "",
        services: source.services || "",
    };
}

function filtersToQuery(source, page) {
    const params = {};

    if (source.status) {
        params.status = source.status;
    }
    if (source.services) {
        params.services = source.services;
    }
    if (source.service_area) {
        params.service_area = source.service_area;
    }
    if (page && page > 1) {
        params.page = page;
    }

    return params;
}

function activeFilterCount(source) {
    return [source.status, source.service_area, source.services].filter(Boolean)
        .length;
}

const EMPTY_LIST = {
    data: [],
    current_page: 1,
    last_page: 1,
    from: 1,
};

export default function AdminCVs({
    cvs,
    cvCount,
    filters: initialFilters = {},
    listCvs = EMPTY_LIST,
    byArea = {},
}) {
    const appliedFilters = filtersFromProps(initialFilters);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState(appliedFilters);
    const [anchorEl, setAnchorEl] = useState(null);
    const [viewMode, setViewMode] = useState(() => {
        return localStorage.getItem("cvViewMode") || "card";
    });

    const filterOpen = Boolean(anchorEl);
    const appliedCount = activeFilterCount(appliedFilters);
    const listPage = listCvs?.data ? listCvs : EMPTY_LIST;

    useEffect(() => {
        localStorage.setItem("cvViewMode", viewMode);
    }, [viewMode]);

    useEffect(() => {
        setFilters(filtersFromProps(initialFilters));
    }, [
        initialFilters.status,
        initialFilters.service_area,
        initialFilters.services,
    ]);

    const requestedList = useRef(false);

    useEffect(() => {
        if (
            requestedList.current ||
            viewMode !== "list" ||
            initialFilters.view === "list"
        ) {
            return;
        }

        requestedList.current = true;
        router.get(
            route("admin.cv.all"),
            {
                ...filtersToQuery(appliedFilters),
                view: "list",
            },
            { preserveState: true, replace: true },
        );
    }, [viewMode, initialFilters.view]);

    const visitList = (nextFilters, page) => {
        const params = filtersToQuery(nextFilters, page);

        if (viewMode === "list") {
            params.view = "list";
        }

        router.get(route("admin.cv.all"), params, {
            preserveState: true,
            preserveScroll: !page,
        });
    };

    const openList = () => {
        requestedList.current = true;
        setViewMode("list");
        router.get(
            route("admin.cv.all"),
            {
                ...filtersToQuery(appliedFilters),
                view: "list",
            },
            { preserveState: true, replace: true },
        );
    };

    const handlePageChange = (event, value) => {
        visitList(appliedFilters, value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const term = search.trim();
        if (!term) {
            return;
        }
        router.get(route("admin.cv.search"), { search: term });
    };

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleApplyFilters = () => {
        visitList(filters);
        setAnchorEl(null);
    };

    const handleClearFilters = () => {
        setFilters(EMPTY_FILTERS);
        setAnchorEl(null);
        const params = viewMode === "list" ? { view: "list" } : {};
        router.get(route("admin.cv.all"), params, { preserveState: true });
    };

    const handleServiceAreaClick = (area) => {
        const nextArea = filters.service_area === area ? "" : area;
        const nextFilters = {
            ...filters,
            service_area: nextArea,
        };

        setFilters(nextFilters);
        visitList(nextFilters);
    };

    const removeAppliedFilter = (field) => {
        visitList({
            ...appliedFilters,
            [field]: "",
        });
    };

    return (
        <AdminLayout>
            <Head title="CV" />
            <Container
                maxWidth={false}
                sx={{
                    pb: viewMode === "list" ? 0 : 4,
                    px: { xs: 0, sm: 2 },
                    minWidth: 0,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                        mb: 2.5,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.25,
                        }}
                    >
                        <Typography
                            variant="h4"
                            color="primary"
                            fontFamily="Roboto Slab"
                            fontWeight="bold"
                        >
                            CV
                        </Typography>
                        <Chip
                            label={cvCount || 0}
                            size="small"
                            color="primary"
                            sx={{ fontWeight: 700, minWidth: 36 }}
                        />
                    </Box>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => router.get(route("admin.cv.create"))}
                    >
                        Create CV
                    </Button>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1.5,
                        flexWrap: "wrap",
                        mb: 2,
                    }}
                >
                    <Box
                        component="form"
                        onSubmit={handleSearchSubmit}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flex: 1,
                            minWidth: { xs: "100%", sm: 320 },
                            maxWidth: 480,
                        }}
                    >
                        <TextField
                            fullWidth
                            placeholder="Search caregiver name"
                            size="small"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    height: 40,
                                    borderRadius: "10px",
                                    borderBottom: "none",
                                    bgcolor: "background.paper",
                                    "& fieldset": {
                                        border: "1px solid",
                                        borderColor: "divider",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "primary.main",
                                    },
                                    "&.Mui-focused": {
                                        borderBottom: "none",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderWidth: "1px",
                                        borderColor: "primary.main",
                                    },
                                },
                                "& .MuiInputBase-input": {
                                    py: 0,
                                    height: "auto",
                                    fontSize: "0.95rem",
                                },
                                "& .MuiInputBase-input::placeholder": {
                                    fontSize: "0.95rem",
                                    opacity: 1,
                                    color: "text.secondary",
                                },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon
                                            fontSize="small"
                                            sx={{ color: "text.secondary" }}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <IconButton
                            type="button"
                            aria-label="Open filters"
                            aria-expanded={filterOpen}
                            onClick={(event) =>
                                setAnchorEl(event.currentTarget)
                            }
                            sx={{
                                width: 40,
                                height: 40,
                                flexShrink: 0,
                                borderRadius: "10px",
                                border: "1px solid",
                                borderColor:
                                    filterOpen || appliedCount
                                        ? "primary.main"
                                        : "divider",
                                color:
                                    filterOpen || appliedCount
                                        ? "primary.main"
                                        : "text.primary",
                                bgcolor:
                                    filterOpen || appliedCount
                                        ? "rgba(135, 92, 209, 0.1)"
                                        : "background.paper",
                            }}
                        >
                            <Badge
                                color="primary"
                                badgeContent={appliedCount}
                                invisible={appliedCount === 0}
                            >
                                <FilterListIcon fontSize="small" />
                            </Badge>
                        </IconButton>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: "10px",
                            bgcolor: "background.paper",
                            overflow: "hidden",
                        }}
                    >
                        <IconButton
                            aria-label="Card view"
                            onClick={() => {
                                setViewMode("card");
                                if (initialFilters.view === "list") {
                                    router.get(
                                        route("admin.cv.all"),
                                        filtersToQuery(
                                            appliedFilters,
                                            cvs?.current_page,
                                        ),
                                        { preserveState: true, replace: true },
                                    );
                                }
                            }}
                            color={viewMode === "card" ? "primary" : "default"}
                            size="small"
                            sx={{ borderRadius: 0, width: 40, height: 40 }}
                        >
                            <ViewModuleIcon fontSize="small" />
                        </IconButton>
                        <Divider orientation="vertical" flexItem />
                        <IconButton
                            aria-label="List view"
                            onClick={() => openList()}
                            color={viewMode === "list" ? "primary" : "default"}
                            size="small"
                            sx={{ borderRadius: 0, width: 40, height: 40 }}
                        >
                            <ViewListIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>

                <Popover
                    open={filterOpen}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    disableScrollLock
                    slotProps={{
                        paper: {
                            elevation: 8,
                            sx: {
                                mt: 1,
                                p: 2,
                                width: 320,
                                maxWidth: "calc(100vw - 24px)",
                                borderRadius: 2,
                                border: "1px solid",
                                borderColor: "divider",
                            },
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 1.5,
                            bgcolor: "transparent",
                        }}
                    >
                        <Typography fontWeight={700}>Filters</Typography>
                        <IconButton
                            size="small"
                            aria-label="Close filters"
                            onClick={() => setAnchorEl(null)}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Box>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", mb: 1, fontWeight: 600 }}
                    >
                        Service area
                    </Typography>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 1,
                            mb: 2,
                            bgcolor: "transparent",
                        }}
                    >
                        {["Mandalay", "Yangon"].map((area) => {
                            const selected = filters.service_area === area;
                            return (
                                <Button
                                    key={area}
                                    size="small"
                                    variant={
                                        selected ? "contained" : "outlined"
                                    }
                                    color="primary"
                                    onClick={() => handleServiceAreaClick(area)}
                                    sx={{
                                        color: selected
                                            ? "#fff"
                                            : "primary.main",
                                        borderColor: "primary.main",
                                        bgcolor: selected
                                            ? "primary.main"
                                            : "transparent",
                                    }}
                                >
                                    {area}
                                </Button>
                            );
                        })}
                    </Box>

                    <FormControl fullWidth size="small" sx={{ mb: 1.5 }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={filters.status}
                            label="Status"
                            onChange={(event) =>
                                handleFilterChange("status", event.target.value)
                            }
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Available">Available</MenuItem>
                            <MenuItem value="Occupied">Occupied</MenuItem>
                            <MenuItem value="Leave">Leave</MenuItem>
                            <MenuItem value="Resigned">Resigned</MenuItem>
                            <MenuItem value="Blacklisted">Blacklisted</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                        <InputLabel>Care type</InputLabel>
                        <Select
                            value={filters.services}
                            label="Care type"
                            onChange={(event) =>
                                handleFilterChange(
                                    "services",
                                    event.target.value,
                                )
                            }
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Elder Care">Elderly Care</MenuItem>
                            <MenuItem value="Newborn & Baby Care">
                                Newborn & Baby Care
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 1,
                            bgcolor: "transparent",
                        }}
                    >
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={handleClearFilters}
                            disabled={
                                appliedCount === 0 &&
                                activeFilterCount(filters) === 0
                            }
                        >
                            Clear
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleApplyFilters}
                        >
                            Apply
                        </Button>
                    </Box>
                </Popover>

                {appliedCount > 0 && (
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            flexWrap: "wrap",
                            mb: 2,
                            bgcolor: "transparent",
                        }}
                    >
                        {appliedFilters.service_area && (
                            <Chip
                                size="small"
                                color="primary"
                                variant="outlined"
                                label={appliedFilters.service_area}
                                onDelete={() =>
                                    removeAppliedFilter("service_area")
                                }
                            />
                        )}
                        {appliedFilters.status && (
                            <Chip
                                size="small"
                                color="primary"
                                variant="outlined"
                                label={`Status: ${appliedFilters.status}`}
                                onDelete={() => removeAppliedFilter("status")}
                            />
                        )}
                        {appliedFilters.services && (
                            <Chip
                                size="small"
                                color="primary"
                                variant="outlined"
                                label={appliedFilters.services}
                                onDelete={() => removeAppliedFilter("services")}
                            />
                        )}
                    </Box>
                )}

                {viewMode === "list" ? (
                    <Box sx={{ minWidth: 0 }}>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                flexWrap: "wrap",
                                mb: 1.5,
                                alignItems: "center",
                            }}
                        >
                            {["Yangon", "Mandalay"].map((area) => (
                                <Button
                                    key={area}
                                    size="small"
                                    variant={
                                        appliedFilters.service_area === area
                                            ? "contained"
                                            : "outlined"
                                    }
                                    onClick={() => handleServiceAreaClick(area)}
                                >
                                    {area} ({byArea[area] || 0})
                                </Button>
                            ))}
                        </Box>
                        <CvListSheet
                            key={`${listPage.current_page}-${appliedFilters.service_area}-${appliedFilters.status}-${appliedFilters.services}`}
                            cvs={listPage.data}
                            startNo={listPage.from || 1}
                        />
                        {listPage.last_page > 1 && (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    mt: 1.5,
                                    mb: 0,
                                }}
                            >
                                <Pagination
                                    count={listPage.last_page}
                                    page={listPage.current_page}
                                    onChange={handlePageChange}
                                    color="primary"
                                />
                            </Box>
                        )}
                    </Box>
                ) : cvs?.data.length > 0 ? (
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "center",
                                columnGap: 1,
                                rowGap: 1,
                                mb: 3,
                                mt: 1,
                                bgcolor: "transparent",
                            }}
                        >
                            {cvs.data.map((cv) => (
                                <ResumeCard key={cv.id} resume={cv} />
                            ))}
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 2,
                                my: 3,
                                bgcolor: "transparent",
                            }}
                        >
                            <Pagination
                                count={cvs.last_page}
                                page={cvs.current_page}
                                onChange={handlePageChange}
                                color="primary"
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
