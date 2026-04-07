import React from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import GuestCareLogLayout from "@/Layouts/GuestCareLogLayout";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Grid2 as Grid,
    IconButton,
    Paper,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import {
    Add as AddIcon,
    CalendarToday as CalendarIcon,
    ChildCare as ChildCareIcon,
    Elderly as ElderlyIcon,
    Person as PersonIcon,
    PregnantWoman as PregnantIcon,
} from "@mui/icons-material";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

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
            return "info";
        case "elder":
            return "warning";
        case "maternal":
            return "success";
        default:
            return "default";
    }
};

export default function PublicCareLogHistory() {
    const { uuid, careLogs, flash = {} } = usePage().props;
    const fillUrl = route("public.care-log.show", { uuid });

    const rows = careLogs?.data ?? [];
    const lastPage = careLogs?.last_page ?? 1;
    const currentPage = careLogs?.current_page ?? 1;
    const totalLogs = careLogs?.total ?? rows.length;

    const formatDate = (dateString) =>
        dateString
            ? new Date(dateString).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
              })
            : "—";

    const openDetails = (logId) => {
        router.get(
            route("public.care-log.history.show", {
                uuid,
                careLogId: logId,
            }),
        );
    };

    const handlePageChange = (event, page) => {
        router.get(
            route("public.care-log.history", { uuid }),
            { page },
            { preserveState: true, preserveScroll: true },
        );
    };

    return (
        <>
            <Head title="Care log history" />
            <GuestCareLogLayout hideChrome>
                <Box sx={{ pb: 4, minHeight: "70vh" }}>
                    {flash?.success ? (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            {flash.success}
                        </Alert>
                    ) : null}

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
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: 1.5,
                                mt: 2,
                            }}
                        >
                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                color="primary"
                                component="h1"
                            >
                                Carelog History
                            </Typography>
                            <Box
                                component="span"
                                aria-label={`${totalLogs} care logs in history`}
                                sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 44,
                                    height: 44,
                                    borderRadius: "50%",
                                    bgcolor: "error.main",
                                    color: "error.contrastText",
                                    fontSize:
                                        totalLogs > 99
                                            ? "0.7rem"
                                            : totalLogs > 9
                                              ? "0.85rem"
                                              : "1rem",
                                    fontWeight: 700,
                                    lineHeight: 1,
                                    flexShrink: 0,
                                }}
                            >
                                {totalLogs > 99 ? "99+" : totalLogs}
                            </Box>
                        </Box>
                    </Box>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2, maxWidth: 560 }}
                    >
                        Open a care log to view the full report and download a
                        PDF from the footer.
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                            gap: 2,
                        }}
                    >
                        <Button
                            variant="contained"
                            component={Link}
                            href={fillUrl}
                            startIcon={<AddIcon />}
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
                            New care log
                        </Button>
                    </Box>

                    {rows.length > 0 ? (
                        <>
                            <TableContainer
                                sx={{ mt: 1 }}
                                component={Paper}
                                elevation={0}
                            >
                                <Table>
                                    <TableHead>
                                        <TableRow
                                            sx={{
                                                backgroundColor: (theme) =>
                                                    theme.palette.primary.main,
                                            }}
                                        >
                                            <TableCell sx={{ color: "#fff" }}>
                                                Date
                                            </TableCell>
                                            <TableCell sx={{ color: "#fff" }}>
                                                Name
                                            </TableCell>
                                            <TableCell sx={{ color: "#fff" }}>
                                                Age
                                            </TableCell>
                                            <TableCell sx={{ color: "#fff" }}>
                                                Care type
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((log) => (
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
                                                onClick={() =>
                                                    openDetails(log.id)
                                                }
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
                                                        <CalendarIcon
                                                            fontSize="small"
                                                            sx={{
                                                                display: {
                                                                    xs: "none",
                                                                    md: "block",
                                                                },
                                                                color: "action.active",
                                                            }}
                                                        />
                                                        {formatDate(
                                                            log.care_date,
                                                        )}
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography fontWeight="medium">
                                                        {[
                                                            log.first_name,
                                                            log.last_name,
                                                        ]
                                                            .filter(Boolean)
                                                            .join(" ") || "—"}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    {log.age_display ?? "—"}
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        icon={getCareTypeIcon(
                                                            log.care_type,
                                                        )}
                                                        label={log.care_type}
                                                        color={getCareTypeColor(
                                                            log.care_type,
                                                        )}
                                                        size="small"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {lastPage > 1 ? (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        mt: 3,
                                    }}
                                >
                                    <Pagination
                                        count={lastPage}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        color="primary"
                                    />
                                </Box>
                            ) : null}
                        </>
                    ) : (
                        <Box sx={{ textAlign: "center", py: 8 }}>
                            <Typography
                                variant="h6"
                                color="textSecondary"
                                gutterBottom
                            >
                                No care logs yet
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                sx={{ mb: 3 }}
                            >
                                Submit a care log to see it listed here.
                            </Typography>
                            <Button
                                variant="contained"
                                component={Link}
                                href={fillUrl}
                                startIcon={<AddIcon />}
                                sx={{
                                    background:
                                        "linear-gradient(45deg, #4caf50 30%, #81c784 90%)",
                                    "&:hover": {
                                        background:
                                            "linear-gradient(45deg, #388e3c 30%, #66bb6a 90%)",
                                    },
                                }}
                            >
                                New care log
                            </Button>
                        </Box>
                    )}
                </Box>
            </GuestCareLogLayout>
        </>
    );
}
