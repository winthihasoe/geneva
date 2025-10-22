import React, { useState, useEffect } from "react";
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
import { generateCareLogPDF } from "@/utils/pdfGenerator";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import BackButton from "@/Components/BackButton";

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
    const { flash, careLogs, stats, recentLogs, filters } = props;

    const [showPDFDialog, setShowPDFDialog] = useState(false);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [careLogData, setCareLogData] = useState(null);
    const [showCareTypeDialog, setShowCareTypeDialog] = useState(false);

    // Filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCareType, setSelectedCareType] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    // Check for flash messages when component mounts
    useEffect(() => {
        if (flash?.success && flash?.show_pdf_prompt && flash?.care_log_data) {
            setCareLogData(flash.care_log_data);
            setShowSuccessAlert(true);
            setShowPDFDialog(true);
        }
    }, [flash]);

    const handleClosePDFDialog = () => {
        setShowPDFDialog(false);
        setShowSuccessAlert(false);
    };

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm);
        if (selectedCareType) params.append("care_type", selectedCareType);
        if (dateFrom) params.append("date_from", dateFrom);
        if (dateTo) params.append("date_to", dateTo);

        router.get(route("cg.mycarelogs.filter"), Object.fromEntries(params));
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCareType("");
        setDateFrom("");
        setDateTo("");
        router.get(route("cg.mycarelogs"));
    };

    const getCareTypeIcon = (careType) => {
        switch (careType) {
            case "newborn":
            case "baby":
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
            case "baby":
                return "secondary";
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

    return (
        <AppLayout>
            <Container maxWidth="lg" sx={{ pb: 4 }}>
                {/* Success Alert */}
                <Snackbar
                    open={showSuccessAlert}
                    autoHideDuration={6000}
                    onClose={() => setShowSuccessAlert(false)}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert
                        severity="success"
                        onClose={() => setShowSuccessAlert(false)}
                        sx={{ width: "100%" }}
                    >
                        {flash?.success}
                    </Alert>
                </Snackbar>

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
                        <BackButton /> My Care Logs
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleNewCareLogClick}
                        sx={{
                            background:
                                "linear-gradient(45deg, #4caf50 30%, #81c784 90%)",
                            "&:hover": {
                                background:
                                    "linear-gradient(45deg, #388e3c 30%, #66bb6a 90%)",
                            },
                        }}
                    >
                        New Care Log
                    </Button>
                </Box>

                {/* Statistics Cards */}
                {stats && (
                    <Box>
                        <Grid container spacing={1} mb={2}>
                            <Grid item size={{ xs: 4, sm: 4, md: 4 }}>
                                <Card>
                                    <CardContent>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            gutterBottom
                                        >
                                            Total Logs
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
                            <Grid item size={{ xs: 4, sm: 4, md: 4 }}>
                                <Card>
                                    <CardContent>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            gutterBottom
                                        >
                                            This Month
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
                            <Grid item size={{ xs: 4, sm: 4, md: 4 }}>
                                <Card>
                                    <CardContent>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            gutterBottom
                                        >
                                            This Week
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
                {/* <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                            }}
                        >
                            <Button
                                startIcon={<FilterIcon />}
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                {showFilters ? "Hide Filters" : "Show Filters"}
                            </Button>
                        </Box>

                        <Grid container spacing={2}>
                            <Grid item size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    label="Search"
                                    placeholder="Search by baby name or notes..."
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
                                    <Grid item size={{ xs: 12, md: 4 }}>
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
                                                {filters?.care_types?.map(
                                                    (type) => (
                                                        <MenuItem
                                                            key={type}
                                                            value={type}
                                                        >
                                                            {type
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                type.slice(1)}
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
                                            onChange={(e) =>
                                                setDateFrom(e.target.value)
                                            }
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>

                                    <Grid item size={{ xs: 12, md: 4 }}>
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

                            <Grid item size={{ xs: 12, md: 4 }}>
                                <Stack direction="row" spacing={1}>
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
                </Card> */}

                {/* Care Logs Table */}

                <Typography variant="h6" gutterBottom>
                    Care Logs
                </Typography>

                {careLogs?.data?.length > 0 ? (
                    <>
                        <TableContainer component={Paper} elevation={0}>
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
                                    onChange={(event, page) => {
                                        router.get(route("cg.mycarelogs"), {
                                            page,
                                        });
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
