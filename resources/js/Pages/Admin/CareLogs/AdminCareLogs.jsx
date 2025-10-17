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
} from "@mui/material";
import {
    Search as SearchIcon,
    FilterList as FilterIcon,
    Elderly as ElderlyIcon,
    Person as PersonIcon,
    CalendarToday as CalendarIcon,
    Visibility as ViewIcon,
} from "@mui/icons-material";
import ChildCareIcon from "@mui/icons-material/ChildCare";

function AdminCareLogs() {
    const { props } = usePage();
    const { careLogs, filters } = props;

    // Filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCareType, setSelectedCareType] = useState("");
    const [selectedCaregiver, setSelectedCaregiver] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = () => {
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
                return <PersonIcon />;
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
                return "success";
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
            case "newborn":
                return "admin.carelog.newborn.details";
            case "maternal":
                return "admin.carelog.maternal.details";
            case "elder":
                return "admin.carelog.elder.details";
            default:
                return "admin.carelog.newborn.details";
        }
    };

    return (
        <AdminLayout>
            <Head title="Care Logs Management" />

            <Container maxWidth="xl" sx={{ py: 4 }}>
                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 4,
                    }}
                >
                    <Typography variant="h4" fontWeight="bold" color="primary">
                        Care Logs Management
                    </Typography>
                    <Chip
                        label={`Total: ${careLogs?.total || 0} logs`}
                        color="primary"
                        variant="outlined"
                    />
                </Box>

                {/* Statistics Overview */}
                <Grid container spacing={3} mb={3}>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card>
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
                                    {careLogs?.data?.filter(
                                        (log) => log.care_type === "newborn"
                                    ).length || 0}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Newborn Logs
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card>
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
                                    {careLogs?.data?.filter(
                                        (log) => log.care_type === "maternal"
                                    ).length || 0}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Maternal Logs
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card>
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
                                    sx={{ color: "#f57c00" }}
                                >
                                    {careLogs?.data?.filter(
                                        (log) => log.care_type === "elder"
                                    ).length || 0}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Elder Logs
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card>
                            <CardContent sx={{ textAlign: "center" }}>
                                <Avatar
                                    sx={{
                                        bgcolor: "#e8f5e8",
                                        color: "#388e3c",
                                        mx: "auto",
                                        mb: 1,
                                    }}
                                >
                                    <CalendarIcon />
                                </Avatar>
                                <Typography
                                    variant="h6"
                                    sx={{ color: "#388e3c" }}
                                >
                                    {careLogs?.total || 0}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Total Logs
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Filters */}
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <Button
                                startIcon={<FilterIcon />}
                                onClick={() => setShowFilters(!showFilters)}
                                variant="outlined"
                                size="small"
                            >
                                {showFilters ? "Hide Filters" : "Show Filters"}
                            </Button>
                        </Box>

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    label="Search"
                                    placeholder="Search by patient name, caregiver..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
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
                                    <Grid size={{ xs: 12, md: 2 }}>
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

                                    <Grid size={{ xs: 12, md: 3 }}>
                                        <TextField
                                            fullWidth
                                            type="date"
                                            label="Date From"
                                            value={dateFrom}
                                            onChange={(e) =>
                                                setDateFrom(e.target.value)
                                            }
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 3 }}>
                                        <TextField
                                            fullWidth
                                            type="date"
                                            label="Date To"
                                            value={dateTo}
                                            onChange={(e) =>
                                                setDateTo(e.target.value)
                                            }
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                </>
                            )}

                            <Grid size={{ xs: 12, md: showFilters ? 12 : 8 }}>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    justifyContent="flex-end"
                                >
                                    <Button
                                        variant="contained"
                                        onClick={handleSearch}
                                        size="small"
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
                    </CardContent>
                </Card>

                {/* Care Logs Table */}
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Care Logs ({careLogs?.total || 0})
                        </Typography>

                        {careLogs?.data?.length > 0 ? (
                            <>
                                <TableContainer component={Paper} elevation={0}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Date</TableCell>
                                                <TableCell>
                                                    Patient Name
                                                </TableCell>
                                                <TableCell>Age</TableCell>
                                                <TableCell>Care Type</TableCell>
                                                <TableCell>Caregiver</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {careLogs.data.map((log) => (
                                                <TableRow
                                                    key={log.id}
                                                    hover
                                                    sx={{
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
                                                            route(
                                                                routeName,
                                                                log.id
                                                            )
                                                        );
                                                    }}
                                                >
                                                    <TableCell>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                gap: 1,
                                                            }}
                                                        >
                                                            <CalendarIcon fontSize="small" />
                                                            {formatDate(
                                                                log.care_date
                                                            )}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography fontWeight="medium">
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
                                                            label={
                                                                log.care_type
                                                            }
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
                                                router.get(
                                                    route("admin.care.logs"),
                                                    { page }
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
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Care logs will appear here once caregivers
                                    start submitting them.
                                </Typography>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Container>
        </AdminLayout>
    );
}

export default AdminCareLogs;
