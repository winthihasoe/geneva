import React, { useState } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import {
    Container,
    Typography,
    Alert,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Snackbar,
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
    IconButton,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Pagination,
    Stack,
    Divider,
    Tooltip,
    Avatar,
} from "@mui/material";
import {
    Close as CloseIcon,
    Search as SearchIcon,
    FilterList as FilterIcon,
    Add as AddIcon,
    Elderly as ElderlyIcon,
    Person as PersonIcon,
    CalendarToday as CalendarIcon,
    PregnantWoman as PregnantIcon,
} from "@mui/icons-material";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

// Add this function near the top of your component, after the imports
const getDetailsRoute = (careType) => {
    switch (careType) {
        case "newborn":
            return "cg.carelog.newborn.details";
        case "maternal":
            return "cg.carelog.maternal.details";
        case "elder":
            return "cg.carelog.elder.details";
        default:
            return "cg.carelog.newborn.details"; // fallback
    }
};

const MyCareLogs = () => {
    const { props } = usePage();
    const { flash, careLogs, stats, filters } = props;

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showCareTypeDialog, setShowCareTypeDialog] = useState(false);

    // Filter states
    const [searchTerm, setSearchTerm] = useState(filters?.search || "");
    const [selectedCareType, setSelectedCareType] = useState(
        filters?.care_type || ""
    );
    const [dateFrom, setDateFrom] = useState(filters?.date_from || "");
    const [dateTo, setDateTo] = useState(filters?.date_to || "");
    const [showFilters, setShowFilters] = useState(false);

    // Search handler (same as admin)
    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm);
        if (selectedCareType) params.append("care_type", selectedCareType);
        if (dateFrom) params.append("date_from", dateFrom);
        if (dateTo) params.append("date_to", dateTo);

        router.get(route("cg.mycarelogs.filter"), Object.fromEntries(params));
    };

    // Clear filters
    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCareType("");
        setDateFrom("");
        setDateTo("");
        router.get(route("cg.mycarelogs"));
    };

    const handlePageChange = (event, page) => {
        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm);
        if (selectedCareType) params.append("care_type", selectedCareType);
        if (dateFrom) params.append("date_from", dateFrom);
        if (dateTo) params.append("date_to", dateTo);
        params.set("page", page);

        // Use filter route if any filter is active
        const isFiltered = searchTerm || selectedCareType || dateFrom || dateTo;
        const routeName = isFiltered ? "cg.mycarelogs.filter" : "cg.mycarelogs";

        router.get(route(routeName), Object.fromEntries(params));
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

    const handleNewCareLogClick = () => {
        setShowCareTypeDialog(true);
    };

    const handleCareTypeSelect = (routeName) => {
        setShowCareTypeDialog(false);
        router.get(route(routeName));
    };

    // Check if any filter is applied via URL query string
    const hasFilter =
        !!searchTerm ||
        !!selectedCareType ||
        !!dateFrom ||
        !!dateTo ||
        window.location.search.length > 1;

    return (
        <AppLayout>
            <Container maxWidth="lg" sx={{ pb: 4 }}>
                {/* Care Type Selection Dialog */}
                <Dialog
                    open={showCareTypeDialog}
                    onClose={() => setShowCareTypeDialog(false)}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold">
                                Choose Care Log Type
                            </Typography>
                        </Box>
                    </DialogTitle>

                    <DialogContent sx={{ pt: 1 }}>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ mb: 3 }}
                        >
                            Select the type of care log you want to create:
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}
                        >
                            {/* Newborn Care Log */}
                            <Card
                                sx={{
                                    cursor: "pointer",
                                    borderRadius: 2,
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                                    transition: "all 0.2s ease",
                                    border: "2px solid #FCE4EC",
                                    "&:hover": {
                                        transform: "translateX(5px)",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                        border: "2px solid #E91E63",
                                    },
                                }}
                                onClick={() =>
                                    handleCareTypeSelect("cg.carelogs.newborn")
                                }
                            >
                                <CardContent sx={{ p: 2 }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: 2,
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                bgcolor: "#FCE4EC",
                                                color: "#E91E63",
                                                width: 50,
                                                height: 50,
                                            }}
                                        >
                                            <ChildCareIcon
                                                sx={{ fontSize: 24 }}
                                            />
                                        </Avatar>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography
                                                variant="h6"
                                                fontWeight="bold"
                                                mb={0.5}
                                            >
                                                Create Newborn Care Logs
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    display: {
                                                        xs: "none",
                                                        sm: "block",
                                                        md: "block",
                                                    },
                                                }}
                                            >
                                                Track feeding, sleeping, diaper
                                                changing, and activities.
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>

                            {/* Maternal Care Log */}
                            <Card
                                sx={{
                                    cursor: "pointer",
                                    borderRadius: 2,
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                                    transition: "all 0.2s ease",
                                    border: "2px solid #F3E5F5",
                                    "&:hover": {
                                        transform: "translateX(5px)",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                        border: "2px solid #9C27B0",
                                    },
                                }}
                                onClick={() =>
                                    handleCareTypeSelect("cg.carelogs.maternal")
                                }
                            >
                                <CardContent sx={{ p: 2 }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: 2,
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                bgcolor: "#F3E5F5",
                                                color: "#9C27B0",
                                                width: 50,
                                                height: 50,
                                            }}
                                        >
                                            <PregnantIcon
                                                sx={{ fontSize: 24 }}
                                            />
                                        </Avatar>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography
                                                variant="h6"
                                                fontWeight="bold"
                                                mb={0.5}
                                            >
                                                Create Maternal Care Logs
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    display: {
                                                        xs: "none",
                                                        sm: "block",
                                                        md: "block",
                                                    },
                                                }}
                                            >
                                                Monitor postnatal recovery and
                                                wellness
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>

                            {/* Elder Care Log */}
                            <Card
                                sx={{
                                    cursor: "pointer",
                                    borderRadius: 2,
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                                    transition: "all 0.2s ease",
                                    border: "2px solid #ECEFF1",
                                    "&:hover": {
                                        transform: "translateX(5px)",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                        border: "2px solid #607D8B",
                                    },
                                }}
                                onClick={() =>
                                    handleCareTypeSelect("cg.carelogs.elderly")
                                }
                            >
                                <CardContent sx={{ p: 3 }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: 2,
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                bgcolor: "#ECEFF1",
                                                color: "#607D8B",
                                                width: 50,
                                                height: 50,
                                            }}
                                        >
                                            <ElderlyIcon
                                                sx={{ fontSize: 24 }}
                                            />
                                        </Avatar>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography
                                                variant="h6"
                                                fontWeight="bold"
                                                mb={0.5}
                                            >
                                                Create Elderly Care Logs
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    display: {
                                                        xs: "none",
                                                        sm: "block",
                                                        md: "block",
                                                    },
                                                }}
                                            >
                                                Manage health and activities
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </DialogContent>

                    <DialogActions sx={{ p: 2 }}>
                        <Button
                            onClick={() => setShowCareTypeDialog(false)}
                            variant="outlined"
                            startIcon={<CloseIcon />}
                            size="small"
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        alignItems: "center",
                        mb: 4,
                        rowGap: 2,
                    }}
                >
                    <Typography
                        variant="h4"
                        mt={2}
                        fontWeight="bold"
                        color="primary"
                    >
                        <IconButton
                            sx={{ mr: 1 }}
                            onClick={() => router.get(route("cg.dashboard"))}
                        >
                            <ArrowCircleLeftOutlinedIcon />
                        </IconButton>
                        My Care Logs
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={handleNewCareLogClick}
                        sx={{
                            background:
                                "linear-gradient(45deg, #4caf50 30%, #81c784 90%)",
                            "&:hover": {
                                background:
                                    "linear-gradient(45deg, #388e3c 30%, #66bb6a 90%)",
                            },
                        }}
                        size="small"
                    >
                        New Care Log
                    </Button>
                    <Button
                        startIcon={<FilterIcon />}
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        {showFilters ? "Hide Filters " : "Show Filters "}
                    </Button>
                </Box>
                {/* Filters & Statistics Card*/}
                {showFilters && (
                    <Card sx={{ mb: 3, mt: 1 }}>
                        <CardContent>
                            <>
                                {/* Statistics Cards */}
                                {stats && (
                                    <Box sx={{ mb: 2 }}>
                                        <Grid
                                            container
                                            sx={{ mt: 1 }}
                                            spacing={1}
                                        >
                                            <Grid
                                                item
                                                size={{ xs: 4, sm: 4, md: 4 }}
                                            >
                                                <Card>
                                                    <CardContent>
                                                        <Typography
                                                            variant="body2"
                                                            color="textSecondary"
                                                            gutterBottom
                                                        >
                                                            Total
                                                            <br /> Logs
                                                        </Typography>
                                                        <Typography
                                                            variant="h4"
                                                            component="div"
                                                            color="primary"
                                                        >
                                                            {stats.total_logs}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid
                                                item
                                                size={{ xs: 4, sm: 4, md: 4 }}
                                            >
                                                <Card>
                                                    <CardContent>
                                                        <Typography
                                                            variant="body2"
                                                            color="textSecondary"
                                                            gutterBottom
                                                        >
                                                            This <br /> Month
                                                        </Typography>
                                                        <Typography
                                                            variant="h4"
                                                            component="div"
                                                            color="secondary"
                                                        >
                                                            {stats.this_month}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid
                                                item
                                                size={{ xs: 4, sm: 4, md: 4 }}
                                            >
                                                <Card>
                                                    <CardContent>
                                                        <Typography
                                                            variant="body2"
                                                            color="textSecondary"
                                                            gutterBottom
                                                        >
                                                            This <br />
                                                            Week
                                                        </Typography>
                                                        <Typography
                                                            variant="h4"
                                                            component="div"
                                                            color="success.main"
                                                        >
                                                            {stats.this_week}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                )}

                                {/* Filters */}
                                <form onSubmit={handleSearch}>
                                    <Grid container spacing={2}>
                                        <Grid item size={{ xs: 12, md: 4 }}>
                                            <TextField
                                                fullWidth
                                                variant="standard"
                                                label="Search"
                                                placeholder="Search by name..."
                                                value={searchTerm}
                                                onChange={(e) =>
                                                    setSearchTerm(
                                                        e.target.value
                                                    )
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

                                        <Grid item size={{ xs: 12, md: 4 }}>
                                            <FormControl fullWidth>
                                                <InputLabel>
                                                    Care Type
                                                </InputLabel>
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
                                                    {filters?.care_types?.map(
                                                        (type) => (
                                                            <MenuItem
                                                                key={type}
                                                                value={type}
                                                            >
                                                                {type
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                    type.slice(
                                                                        1
                                                                    )}
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item size={{ xs: 12, md: 4 }}>
                                            <TextField
                                                fullWidth
                                                type="date"
                                                label="Date From"
                                                value={dateFrom}
                                                variant="standard"
                                                onChange={(e) =>
                                                    setDateFrom(e.target.value)
                                                }
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>

                                        <Grid item size={{ xs: 12, md: 4 }}>
                                            <TextField
                                                fullWidth
                                                type="date"
                                                label="Date To"
                                                value={dateTo}
                                                variant="standard"
                                                onChange={(e) =>
                                                    setDateTo(e.target.value)
                                                }
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>

                                        <Grid
                                            item
                                            size={{ xs: 12 }}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                mt: 1,
                                            }}
                                        >
                                            <Stack direction="row" spacing={1}>
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
                            </>
                        </CardContent>
                    </Card>
                )}

                {hasFilter && (
                    <Alert severity="info" sx={{ my: 1 }}>
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
                        <TableContainer
                            sx={{ mt: 3 }}
                            component={Paper}
                            elevation={0}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Age</TableCell>
                                        <TableCell>Care Type</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {careLogs.data.map((log) => (
                                        <TableRow
                                            key={log.id}
                                            hover
                                            sx={{
                                                cursor: "pointer",
                                                "&:hover": {
                                                    backgroundColor:
                                                        "rgba(0, 0, 0, 0.04)",
                                                },
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
                                                    <CalendarIcon
                                                        fontSize="small"
                                                        sx={{
                                                            display: {
                                                                xs: "none",
                                                                md: "block",
                                                            },
                                                        }}
                                                    />
                                                    {formatDate(log.care_date)}
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
                                                    label={log.care_type}
                                                    color={getCareTypeColor(
                                                        log.care_type
                                                    )}
                                                    size="small"
                                                />
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
                                    onChange={handlePageChange}
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
                            sx={{ mb: 3 }}
                        >
                            Start by creating your first care log
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleNewCareLogClick}
                        >
                            Create Care Log
                        </Button>
                    </Box>
                )}
            </Container>
        </AppLayout>
    );
};

export default MyCareLogs;
