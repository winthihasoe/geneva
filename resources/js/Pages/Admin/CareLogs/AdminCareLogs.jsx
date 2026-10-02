import React, { useState } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import CareLogTable from "./components/CareLogTable";
import {
    Container,
    Typography,
    Button,
    Box,
    TextField,
    FormControl,
    Select,
    MenuItem,
    Pagination,
    InputAdornment,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const SERVICE_AREAS = ["Mandalay", "Yangon"];

const CARE_TYPES = [
    { value: "newborn", label: "Newborn" },
    { value: "maternal", label: "Maternal" },
    { value: "elder", label: "Elder" },
];

const outlineBorderColor = (theme) =>
    theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.23)"
        : "rgba(0, 0, 0, 0.23)";

const matchingOutlineSx = {
    borderBottom: "none",
    "& fieldset": {
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: outlineBorderColor,
    },
    "&:hover fieldset": {
        borderColor: outlineBorderColor,
    },
    "&.Mui-focused fieldset": {
        borderWidth: "1px",
        borderColor: (theme) => theme.palette.primary.main,
    },
};

const typeFieldSx = {
    width: { xs: 118, sm: 136 },
    flex: "0 0 auto",
    "& .MuiOutlinedInput-root": {
        height: 36,
        ...matchingOutlineSx,
    },
    "& .MuiSelect-select": {
        py: 0,
        display: "flex",
        alignItems: "center",
        fontSize: 13,
    },
};

const dateFieldSx = {
    width: { xs: "calc(50% - 4px)", sm: 122 },
    flex: { xs: "1 1 calc(50% - 4px)", sm: "0 0 auto" },
    "& .MuiOutlinedInput-root": {
        height: 36,
        ...matchingOutlineSx,
    },
    "& .MuiOutlinedInput-input": {
        py: 0,
        fontSize: 13,
    },
    "& .MuiInputLabel-root": {
        fontSize: 13,
    },
};

const searchActionSx = {
    minWidth: 0,
    px: { xs: 0.75, sm: 1.1 },
    py: 0.15,
    fontSize: 12,
    lineHeight: 1.4,
    textTransform: "none",
    boxShadow: "none",
};

function AdminCareLogs() {
    const { props } = usePage();
    const { careLogs, filters = {} } = props;
    const careTypeCounts = props.careTypeCounts || {};

    // Filter states
    const [searchTerm, setSearchTerm] = useState(filters.search || "");
    const [selectedCareType, setSelectedCareType] = useState(
        filters.care_type || "",
    );
    const [dateFrom, setDateFrom] = useState(filters.date_from || "");
    const [dateTo, setDateTo] = useState(filters.date_to || "");
    const [selectedServiceArea, setSelectedServiceArea] = useState(
        filters.service_area || "",
    );

    const buildFilterParams = (overrides = {}) => {
        const params = {
            search: searchTerm,
            care_type: selectedCareType,
            date_from: dateFrom,
            date_to: dateTo,
            service_area: selectedServiceArea,
            ...overrides,
        };

        return Object.fromEntries(
            Object.entries(params).filter(([, value]) => Boolean(value)),
        );
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("admin.care.logs"), buildFilterParams());
    };

    const handleServiceAreaChange = (_event, nextArea) => {
        const area = nextArea || "";
        setSelectedServiceArea(area);
        router.get(
            route("admin.care.logs"),
            buildFilterParams({ service_area: area }),
        );
    };

    const searchDateRange = (nextFrom, nextTo) => {
        if (!nextFrom || !nextTo) {
            return;
        }

        router.get(
            route("admin.care.logs"),
            buildFilterParams({
                date_from: nextFrom,
                date_to: nextTo,
            }),
        );
    };

    const handleDateFromChange = (event) => {
        const nextFrom = event.target.value;
        setDateFrom(nextFrom);
        searchDateRange(nextFrom, dateTo);
    };

    const handleDateToChange = (event) => {
        const nextTo = event.target.value;
        setDateTo(nextTo);
        searchDateRange(dateFrom, nextTo);
    };

    const handleCareTypeChange = (event) => {
        const nextType = event.target.value;
        setSelectedCareType(nextType);
        router.get(
            route("admin.care.logs"),
            buildFilterParams({ care_type: nextType }),
        );
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCareType("");
        setDateFrom("");
        setDateTo("");
        setSelectedServiceArea("");
        router.get(route("admin.care.logs"));
    };

    return (
        <AdminLayout>
            <Head title="Care Logs Management" />

            <Container maxWidth={false} sx={{ pb: 0, px: { xs: 0, sm: 1 } }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                    }}
                >
                    <Typography
                        variant="h4"
                        color="primary"
                        fontFamily={"Roboto Slab"}
                        fontWeight="bold"
                    >
                        Care Logs
                    </Typography>
                    <Box
                        aria-label={`${careLogs?.total || 0} logs`}
                        sx={{
                            bgcolor: "red",
                            minWidth: 26,
                            height: 26,
                            px: 0.75,
                            borderRadius: "999px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <Typography
                            component="span"
                            sx={{
                                fontSize: 11,
                                color: "#fff",
                                fontWeight: 700,
                                lineHeight: 1,
                            }}
                        >
                            {careLogs?.total || 0}
                        </Typography>
                    </Box>
                </Box>

                <Box
                    component="form"
                    onSubmit={handleSearch}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.75,
                        flexWrap: "wrap",
                        mb: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.75,
                            flexWrap: "wrap",
                            flex: { xs: "1 1 100%", sm: "0 1 auto" },
                        }}
                    >
                        <ToggleButtonGroup
                            exclusive
                            size="small"
                            value={selectedServiceArea || null}
                            onChange={handleServiceAreaChange}
                            aria-label="Service area"
                            sx={{
                                height: 36,
                                "& .MuiToggleButton-root": {
                                    height: 36,
                                    px: { xs: 1.25, sm: 1.5 },
                                    py: 0,
                                    textTransform: "none",
                                    fontSize: { xs: 12, sm: 13 },
                                    lineHeight: 1.4,
                                    color: "text.primary",
                                    borderColor: outlineBorderColor,
                                    "&.Mui-selected": {
                                        color: "primary.contrastText",
                                        bgcolor: "primary.main",
                                        boxShadow: 3,
                                        zIndex: 1,
                                        "&:hover": {
                                            bgcolor: "primary.dark",
                                            boxShadow: 4,
                                        },
                                    },
                                },
                            }}
                        >
                            {SERVICE_AREAS.map((area) => (
                                <ToggleButton key={area} value={area}>
                                    {area}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                        <FormControl size="small" sx={typeFieldSx}>
                            <Select
                                value={selectedCareType}
                                displayEmpty
                                onChange={handleCareTypeChange}
                                inputProps={{ "aria-label": "Care type" }}
                                renderValue={(value) => {
                                    const type = CARE_TYPES.find(
                                        (item) => item.value === value,
                                    );

                                    return type ? type.label : "All";
                                }}
                            >
                                <MenuItem value="">All</MenuItem>
                                {CARE_TYPES.map((type) => (
                                    <MenuItem
                                        key={type.value}
                                        value={type.value}
                                    >
                                        {`${type.label} (${careTypeCounts[type.value] || 0})`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            size="small"
                            type="date"
                            label="From"
                            value={dateFrom}
                            onChange={handleDateFromChange}
                            InputLabelProps={{ shrink: true }}
                            sx={dateFieldSx}
                        />
                        <TextField
                            size="small"
                            type="date"
                            label="To"
                            value={dateTo}
                            onChange={handleDateToChange}
                            InputLabelProps={{ shrink: true }}
                            sx={dateFieldSx}
                        />
                    </Box>

                    <TextField
                        size="small"
                        placeholder="Patient or caregiver"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            flex: { xs: "1 1 100%", sm: "1 1 280px" },
                            minWidth: { xs: "100%", sm: 240 },
                            maxWidth: { sm: 440 },
                            ml: { sm: "auto" },
                            "& .MuiOutlinedInput-root": {
                                pr: 0.5,
                                height: 36,
                                ...matchingOutlineSx,
                            },
                            "& .MuiOutlinedInput-input": {
                                py: 0,
                                fontSize: 13,
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon
                                        sx={{
                                            fontSize: 18,
                                            color: "text.secondary",
                                        }}
                                    />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        type="submit"
                                        size="small"
                                        variant="contained"
                                        sx={searchActionSx}
                                    >
                                        Search
                                    </Button>
                                    <Button
                                        type="button"
                                        size="small"
                                        variant="outlined"
                                        onClick={clearFilters}
                                        sx={{
                                            ...searchActionSx,
                                            ml: 0.5,
                                        }}
                                    >
                                        Clear
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                {/* Care Logs Table */}

                {careLogs?.data?.length > 0 ? (
                    <>
                        <CareLogTable
                            logs={careLogs.data}
                            startNo={careLogs.from || 1}
                        />

                        {/* Pagination */}
                        {careLogs.last_page > 1 && (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    mt: 1.5,
                                    mb: 0,
                                }}
                            >
                                <Pagination
                                    count={careLogs.last_page}
                                    page={careLogs.current_page}
                                    onChange={(event, page) => {
                                        const params = new URLSearchParams(
                                            window.location.search,
                                        );
                                        params.set("page", page);
                                        router.get(
                                            route("admin.care.logs") +
                                                "?" +
                                                params.toString(),
                                        );
                                    }}
                                    color="primary"
                                    size="small"
                                    siblingCount={0}
                                />
                            </Box>
                        )}
                    </>
                ) : (
                    <Box sx={{ textAlign: "center", py: 8 }}>
                        <Typography
                            variant="h6"
                            color="textSecondary"
                            gutterBottom
                        >
                            No care logs found
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Care logs will appear here once caregivers start
                            submitting them.
                        </Typography>
                    </Box>
                )}
            </Container>
        </AdminLayout>
    );
}

export default AdminCareLogs;
