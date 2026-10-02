import AdminLayout from "@/Layouts/AdminLayout";
import { PATIENT_TYPE_OPTIONS, careTypeLabel } from "@/utils/careTypeLabel";
import { Head, router } from "@inertiajs/react";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import {
    Badge,
    Box,
    Button,
    Chip,
    Container,
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
import React, { useEffect, useState } from "react";
import FeedbackSheet from "./components/FeedbackSheet";

const EMPTY_FILTERS = {
    search: "",
    service_area: "",
    type: "",
};

const searchFieldSx = {
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
};

function filtersFromProps(source = {}) {
    return {
        search: source.search || "",
        service_area: source.service_area || "",
        type: source.type || "",
    };
}

function filtersToQuery(source, page) {
    const params = {};

    if (source.search) {
        params.search = source.search;
    }
    if (source.service_area) {
        params.service_area = source.service_area;
    }
    if (source.type) {
        params.type = source.type;
    }
    if (page && page > 1) {
        params.page = page;
    }

    return params;
}

function activeFilterCount(source) {
    return [Boolean(source.service_area), Boolean(source.type)].filter(Boolean)
        .length;
}

const EMPTY_LIST = {
    data: [],
    current_page: 1,
    last_page: 1,
    total: 0,
    from: 1,
};

export default function AdminFeedbacks({
    patients = EMPTY_LIST,
    columns = [],
    filters: initialFilters = {},
}) {
    const appliedFilters = filtersFromProps(initialFilters);
    const [search, setSearch] = useState(appliedFilters.search);
    const [filters, setFilters] = useState(appliedFilters);
    const [anchorEl, setAnchorEl] = useState(null);
    const filterOpen = Boolean(anchorEl);
    const appliedCount = activeFilterCount(appliedFilters);
    const list = patients?.data ? patients : EMPTY_LIST;

    useEffect(() => {
        const next = filtersFromProps(initialFilters);
        setFilters(next);
        setSearch(next.search);
    }, [
        initialFilters.search,
        initialFilters.service_area,
        initialFilters.type,
    ]);

    const visit = (nextFilters, page) => {
        router.get(
            route("admin.patient.feedbacks"),
            filtersToQuery(nextFilters, page),
            {
                preserveState: true,
                preserveScroll: !page,
            },
        );
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        visit({
            ...appliedFilters,
            search: search.trim(),
        });
    };

    const handleApplyFilters = () => {
        visit({
            ...filters,
            search: search.trim(),
        });
        setAnchorEl(null);
    };

    const handleClearFilters = () => {
        const next = {
            ...EMPTY_FILTERS,
            search: search.trim(),
        };
        setFilters(next);
        setAnchorEl(null);
        visit(next);
    };

    const handleServiceAreaClick = (area) => {
        const nextArea = filters.service_area === area ? "" : area;
        setFilters((current) => ({
            ...current,
            service_area: nextArea,
        }));
    };

    const removeAppliedFilter = (field) => {
        visit({
            ...appliedFilters,
            [field]: "",
        });
    };

    return (
        <AdminLayout>
            <Head title="Feedbacks" />
            <Container
                maxWidth={false}
                sx={{
                    pb: 2,
                    px: { xs: 0, sm: 2 },
                    minWidth: 0,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.25,
                        mb: 2.5,
                    }}
                >
                    <Typography
                        variant="h4"
                        color="primary"
                        fontFamily={"Roboto Slab"}
                        fontWeight="bold"
                    >
                        Feedbacks
                    </Typography>
                    <Chip
                        label={list.total || 0}
                        size="small"
                        color="primary"
                        sx={{ fontWeight: 700, minWidth: 36 }}
                    />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
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
                            placeholder="Search patient name"
                            size="small"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            sx={searchFieldSx}
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

                    <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                        <InputLabel>Care type</InputLabel>
                        <Select
                            value={filters.type}
                            label="Care type"
                            onChange={(event) =>
                                setFilters((current) => ({
                                    ...current,
                                    type: event.target.value,
                                }))
                            }
                        >
                            <MenuItem value="">All</MenuItem>
                            {PATIENT_TYPE_OPTIONS.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 1,
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

                {appliedCount > 0 || appliedFilters.search ? (
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            flexWrap: "wrap",
                            mb: 2,
                        }}
                    >
                        {appliedFilters.search && (
                            <Chip
                                size="small"
                                color="primary"
                                variant="outlined"
                                label={appliedFilters.search}
                                onDelete={() => {
                                    setSearch("");
                                    removeAppliedFilter("search");
                                }}
                            />
                        )}
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
                        {appliedFilters.type && (
                            <Chip
                                size="small"
                                color="primary"
                                variant="outlined"
                                label={careTypeLabel(appliedFilters.type)}
                                onDelete={() => removeAppliedFilter("type")}
                            />
                        )}
                    </Box>
                ) : null}

                <FeedbackSheet
                    patients={list.data}
                    columns={columns}
                    startNo={list.from || 1}
                />

                {list.last_page > 1 && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 1.5,
                        }}
                    >
                        <Pagination
                            count={list.last_page}
                            page={list.current_page}
                            onChange={(event, value) =>
                                visit(appliedFilters, value)
                            }
                            color="primary"
                        />
                    </Box>
                )}
            </Container>
        </AdminLayout>
    );
}
