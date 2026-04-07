import React, { useState } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    Container,
    Typography,
    Button,
    Box,
    Card,
    CardContent,
    Grid2 as Grid,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Pagination,
    Stack,
    Avatar,
    Alert,
} from "@mui/material";
import {
    Search as SearchIcon,
    FilterList as FilterIcon,
    Elderly as ElderlyIcon,
    Person as PersonIcon,
    PregnantWoman as PregnantIcon,
} from "@mui/icons-material";
import ChildCareIcon from "@mui/icons-material/ChildCare";

function AdminCareLogs() {
    const { props } = usePage();
    const { careLogs, filters } = props;
    const careTypeCounts = props.careTypeCounts || {};

    // Filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCareType, setSelectedCareType] = useState("");
    const [selectedCaregiver, setSelectedCaregiver] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm);
        if (selectedCareType) params.append("care_type", selectedCareType);
        if (selectedCaregiver) params.append("caregiver", selectedCaregiver);
        if (dateFrom) params.append("date_from", dateFrom);
        if (dateTo) params.append("date_to", dateTo);

        router.get(route("admin.care.logs"), Object.fromEntries(params));
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCareType("");
        setSelectedCaregiver("");
        setDateFrom("");
        setDateTo("");
        router.get(route("admin.care.logs"));
    };

    const getCareTypeIcon = (careType) => {
        switch (careType) {
            case "newborn":
                return <ChildCareIcon />;
            case "elder":
                return <ElderlyIcon />;
            case "maternal":
                return <PregnantIcon />;
            default:
                return <PersonIcon />;
        }
    };

    const getCareTypeColor = (careType) => {
        switch (careType) {
            case "newborn":
                return "primary";
            case "elder":
                return "warning";
            case "maternal":
                return "secondary";
            default:
                return "default";
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const getDetailsRoute = (careType) => {
        switch (careType) {
            case "baby":
                return "admin.carelog.baby.details";
            case "newborn":
                return "admin.carelog.newborn.details";
            case "maternal":
                return "admin.carelog.maternal.details";
            case "elder":
                return "admin.carelog.elderly.details";
            default:
                return "admin.carelog.newborn.details";
        }
    };

    // Check if any filter is applied via URL query string
    const hasFilter =
        !!searchTerm ||
        !!selectedCareType ||
        !!selectedCaregiver ||
        !!dateFrom ||
        !!dateTo ||
        window.location.search.length > 1;

    return (
        <AdminLayout>
            <Head title="Care Logs Management" />

            <Container maxWidth="lg" sx={{ pb: 4, px: { xs: 0 } }}>
                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <Typography variant="h4" fontWeight="bold" color="primary">
                        Care Logs
                    </Typography>
                </Box>

                {/* Filters */}

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <Typography variant="body1" color="textSecondary">
                        Total: {careLogs?.total || 0} logs
                    </Typography>

                    <Button
                        startIcon={<FilterIcon />}
                        onClick={() => setShowFilters(!showFilters)}
                        variant="outlined"
                        size="small"
                    >
                        {showFilters ? "Hide Filters" : "Show Filters"}
                    </Button>
                </Box>
                {showFilters && (
                    <Grid container spacing={1} mb={3}>
                        <Grid size={{ xs: 4 }}>
                            <Card
                                onClick={() => {
                                    router.get(route("admin.care.logs"), {
                                        care_type: "newborn",
                                    });
                                }}
                                sx={{ cursor: "pointer" }}
                            >
                                <CardContent sx={{ textAlign: "center" }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: "#e3f2fd",
                                            color: "#1976d2",
                                            mx: "auto",
                                            mb: 1,
                                        }}
                                    >
                                        <ChildCareIcon />
                                    </Avatar>
                                    <Typography variant="h6" color="primary">
                                        {careTypeCounts.newborn || 0}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Newborn Care Logs
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 4 }}>
                            <Card
                                onClick={() => {
                                    router.get(route("admin.care.logs"), {
                                        care_type: "maternal",
                                    });
                                }}
                                sx={{ cursor: "pointer" }}
                            >
                                <CardContent sx={{ textAlign: "center" }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: "#f3e5f5",
                                            color: "#9c27b0",
                                            mx: "auto",
                                            mb: 1,
                                        }}
                                    >
                                        <PersonIcon />
                                    </Avatar>
                                    <Typography variant="h6" color="secondary">
                                        {careTypeCounts.maternal || 0}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Maternal Care Logs
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 4 }}>
                            <Card
                                onClick={() => {
                                    router.get(route("admin.care.logs"), {
                                        care_type: "elder",
                                    });
                                }}
                                sx={{ cursor: "pointer" }}
                            >
                                <CardContent sx={{ textAlign: "center" }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: "#fff3e0",
                                            color: "#f57c00",
                                            mx: "auto",
                                            mb: 1,
                                        }}
                                    >
                                        <ElderlyIcon />
                                    </Avatar>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: "#f57c00",
                                        }}
                                    >
                                        {careTypeCounts.elder || 0}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Elderly Care Logs
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                )}

                <form onSubmit={handleSearch}>
                    <Grid container spacing={2} mb={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                variant="standard"
                                label="Search"
                                placeholder="Search by patient name, caregiver..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <SearchIcon
                                            sx={{
                                                mr: 1,
                                                color: "action.active",
                                            }}
                                        />
                                    ),
                                }}
                            />
                        </Grid>

                        {showFilters && (
                            <>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <FormControl fullWidth>
                                        <InputLabel>Care Type</InputLabel>
                                        <Select
                                            value={selectedCareType}
                                            onChange={(e) =>
                                                setSelectedCareType(
                                                    e.target.value
                                                )
                                            }
                                            label="Care Type"
                                        >
                                            <MenuItem value="">
                                                All Types
                                            </MenuItem>
                                            <MenuItem value="newborn">
                                                Newborn
                                            </MenuItem>
                                            <MenuItem value="maternal">
                                                Maternal
                                            </MenuItem>
                                            <MenuItem value="elder">
                                                Elder
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        label="Date From"
                                        variant="standard"
                                        value={dateFrom}
                                        onChange={(e) =>
                                            setDateFrom(e.target.value)
                                        }
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        label="Date To"
                                        variant="standard"
                                        value={dateTo}
                                        onChange={(e) =>
                                            setDateTo(e.target.value)
                                        }
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                            </>
                        )}

                        <Grid size={{ xs: 12 }}>
                            <Stack
                                direction="row"
                                spacing={1}
                                justifyContent="flex-end"
                            >
                                <Button
                                    variant="contained"
                                    type="submit"
                                    size="small"
                                    disabled={
                                        !dateFrom &&
                                        !dateTo &&
                                        !searchTerm &&
                                        !selectedCareType
                                    }
                                >
                                    Search
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={clearFilters}
                                    size="small"
                                >
                                    Clear
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </form>

                {/* Show Alert if filter applied */}
                {hasFilter && (
                    <Alert severity="info" sx={{ mb: 1 }}>
                        Filters are applied. To see all the care logs, please{" "}
                        <span
                            onClick={clearFilters}
                            style={{
                                cursor: "pointer",
                                color: "blue",
                                textDecoration: "underline",
                            }}
                        >
                            clear the filters.
                        </span>
                    </Alert>
                )}
                {/* Care Logs Table */}

                {careLogs?.data?.length > 0 ? (
                    <>
                        <TableContainer component={Paper} elevation={0}>
                            <Table>
                                <TableHead
                                    sx={{
                                        bgcolor: "primary.main",
                                    }}
                                >
                                    <TableRow>
                                        <TableCell sx={{ color: "#fff" }}>
                                            Date
                                        </TableCell>
                                        <TableCell sx={{ color: "#fff" }}>
                                            Patient Name
                                        </TableCell>
                                        <TableCell sx={{ color: "#fff" }}>
                                            Age
                                        </TableCell>
                                        <TableCell sx={{ color: "#fff" }}>
                                            Care Type
                                        </TableCell>
                                        <TableCell sx={{ color: "#fff" }}>
                                            Caregiver
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {careLogs.data.map((log, idx) => (
                                        <TableRow
                                            key={log.id}
                                            hover
                                            sx={{
                                                backgroundColor:
                                                    idx % 2 === 0
                                                        ? "background.paper"
                                                        : "gray.100", // alternate color
                                                "&:hover": {
                                                    backgroundColor:
                                                        "rgba(0, 0, 0, 0.04)",
                                                },
                                                cursor: "pointer",
                                            }}
                                            onClick={() => {
                                                const routeName =
                                                    getDetailsRoute(
                                                        log.care_type
                                                    );
                                                router.get(
                                                    route(routeName, log.id)
                                                );
                                            }}
                                        >
                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                    }}
                                                >
                                                    {formatDate(log.care_date)}
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    fontWeight="medium"
                                                    variant="body2"
                                                >
                                                    {log.first_name}{" "}
                                                    {log.last_name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                {log.age_display}
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    icon={getCareTypeIcon(
                                                        log.care_type
                                                    )}
                                                    label={log.care_type}
                                                    color={getCareTypeColor(
                                                        log.care_type
                                                    )}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {log.caregiver_name ||
                                                        "Not specified"}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Pagination */}
                        {careLogs.last_page > 1 && (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    mt: 3,
                                }}
                            >
                                <Pagination
                                    count={careLogs.last_page}
                                    page={careLogs.current_page}
                                    onChange={(event, page) => {
                                        const params = new URLSearchParams(
                                            window.location.search
                                        );
                                        params.set("page", page);
                                        router.get(
                                            route("admin.care.logs") +
                                                "?" +
                                                params.toString()
                                        );
                                    }}
                                    color="primary"
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
