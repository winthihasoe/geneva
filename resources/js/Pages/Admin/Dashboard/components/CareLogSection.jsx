import { router } from "@inertiajs/react";
import {
    Alert,
    Box,
    Button,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Grid2,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import ElderlyIcon from "@mui/icons-material/Elderly";
import PersonIcon from "@mui/icons-material/Person";
import PregnantWomanIcon from "@mui/icons-material/PregnantWoman";

function getCareTypeIcon(careType) {
    switch (careType) {
        case "newborn":
        case "baby":
            return <ChildCareIcon />;
        case "elder":
            return <ElderlyIcon />;
        case "maternal":
            return <PregnantWomanIcon />;
        default:
            return <PersonIcon />;
    }
}

function getCareTypeColor(careType) {
    switch (careType) {
        case "newborn":
        case "baby":
            return "primary";
        case "elder":
            return "warning";
        case "maternal":
            return "secondary";
        default:
            return "default";
    }
}

function getDetailsRoute(careType) {
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
}

function CareLogSection({
    recentCareLogs = [],
    missingCareLogWarnings = [],
    recentCareLogDays = 3,
}) {
    return (
        <Grid2 container spacing={3} mb={4}>
            <Grid2 size={{ xs: 12, md: 7 }}>
                <Paper
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                        height: "100%",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 2,
                            gap: 1,
                            flexWrap: "wrap",
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <AssignmentIcon color="primary" />
                            <Typography variant="h6" fontWeight="bold">
                                Recent Care Logs
                            </Typography>
                        </Box>
                        <Button
                            size="small"
                            onClick={() => router.get(route("admin.care.logs"))}
                        >
                            View all
                        </Button>
                    </Box>

                    {recentCareLogs.length > 0 ? (
                        <TableContainer>
                            <Table size="small">
                                <TableHead sx={{ bgcolor: "primary.main" }}>
                                    <TableRow>
                                        <TableCell sx={{ color: "#fff" }}>
                                            Date
                                        </TableCell>
                                        <TableCell sx={{ color: "#fff" }}>
                                            Patient
                                        </TableCell>
                                        <TableCell sx={{ color: "#fff" }}>
                                            Type
                                        </TableCell>
                                        <TableCell sx={{ color: "#fff" }}>
                                            Caregiver
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {recentCareLogs.map((log, idx) => (
                                        <TableRow
                                            key={log.id}
                                            hover
                                            sx={{
                                                backgroundColor:
                                                    idx % 2 === 0
                                                        ? "background.paper"
                                                        : "grey.50",
                                                cursor: "pointer",
                                            }}
                                            onClick={() =>
                                                router.get(
                                                    route(
                                                        getDetailsRoute(
                                                            log.care_type
                                                        ),
                                                        log.id
                                                    )
                                                )
                                            }
                                        >
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {log.care_date || "—"}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant="body2"
                                                    fontWeight={500}
                                                >
                                                    {log.patient_name}
                                                </Typography>
                                                {log.age_display && (
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {log.age_display}
                                                    </Typography>
                                                )}
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
                                                    {log.caregiver_name}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            No care logs have been submitted yet.
                        </Typography>
                    )}
                </Paper>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 5 }}>
                <Paper
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                        height: "100%",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 2,
                        }}
                    >
                        <WarningAmberIcon color="warning" />
                        <Typography variant="h6" fontWeight="bold">
                            Missing Care Logs
                        </Typography>
                    </Box>

                    {missingCareLogWarnings.length > 0 ? (
                        <>
                            <Alert severity="warning" sx={{ mb: 2 }}>
                                {missingCareLogWarnings.length} assigned{" "}
                                {missingCareLogWarnings.length === 1
                                    ? "patient has"
                                    : "patients have"}{" "}
                                no care log in the last {recentCareLogDays}{" "}
                                days, or no care log at all.
                            </Alert>
                            <Box
                                sx={{
                                    maxHeight: 420,
                                    overflowY: "auto",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1.5,
                                }}
                            >
                                {missingCareLogWarnings.map((warning) => (
                                    <Box
                                        key={warning.id}
                                        onClick={() =>
                                            router.get(
                                                route(
                                                    "admin.patient",
                                                    warning.id
                                                )
                                            )
                                        }
                                        sx={{
                                            p: 1.5,
                                            borderRadius: 2,
                                            bgcolor:
                                                warning.warning_type === "none"
                                                    ? "#FFEBEE"
                                                    : "#FFF8E1",
                                            cursor: "pointer",
                                            "&:hover": {
                                                opacity: 0.9,
                                            },
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            fontWeight="bold"
                                        >
                                            {warning.patient_name}
                                            {warning.type
                                                ? ` (${warning.type})`
                                                : ""}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            display="block"
                                        >
                                            Caregiver:{" "}
                                            {warning.caregivers?.length
                                                ? warning.caregivers.join(", ")
                                                : "Assigned"}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color={
                                                warning.warning_type === "none"
                                                    ? "error.main"
                                                    : "warning.dark"
                                            }
                                            fontWeight={600}
                                        >
                                            {warning.warning_type === "none"
                                                ? "No care log at all"
                                                : `Last care log: ${warning.last_care_log_date} (${warning.days_since_last_log} days ago)`}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </>
                    ) : (
                        <Alert severity="success">
                            All patients with an assigned caregiver have a care
                            log from the last {recentCareLogDays} days.
                        </Alert>
                    )}
                </Paper>
            </Grid2>
        </Grid2>
    );
}

export default CareLogSection;
