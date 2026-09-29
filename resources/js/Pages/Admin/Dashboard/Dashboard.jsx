import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";
import {
    Grid2,
    Box,
    Typography,
    Card,
    CardContent,
    Paper,
    Avatar,
    Container,
    alpha,
} from "@mui/material";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AccessibleIcon from "@mui/icons-material/Accessible";
import CareLogSection from "./components/CareLogSection";
import MonthlyColumnChart from "./components/MonthlyColumnChart";
import RecentNotesSection from "./components/RecentNotesSection";
import { dashboardPaperSx, dashboardShadow } from "./dashboardSurface";

function Dashboard({
    occupiedCaregivers = 0,
    availableCaregivers = 0,
    recruitJobApplies = 0,
    pendingJobApplies = 0,
    openInquiries = 0,
    confirmedCases = 0,
    childCarePatients = 0,
    elderlyCarePatients = 0,
    recentCareLogs = [],
    missingCareLogWarnings = [],
    recentCareLogDays = 3,
    latestComplaints = [],
    latestFeedbacks = [],
    caseTrend = [],
    recruitmentTrend = [],
}) {
    const stats = [
        {
            title: "Caregivers",
            icon: <PeopleAltIcon sx={{ fontSize: { xs: 18, sm: 28 } }} />,
            color: "#2E7D32",
            darkColor: "#81C784",
            route: "admin.cv.all",
            metrics: [
                { label: "Occupied", value: occupiedCaregivers },
                { label: "Available", value: availableCaregivers },
            ],
        },
        {
            title: "Job Applications",
            icon: <WorkIcon sx={{ fontSize: { xs: 18, sm: 28 } }} />,
            color: "#1565C0",
            darkColor: "#64B5F6",
            route: "admin.job.apply",
            metrics: [
                { label: "Recruit", value: recruitJobApplies },
                { label: "Pending", value: pendingJobApplies },
            ],
        },
        {
            title: "Inquiries",
            icon: <AssignmentIndIcon sx={{ fontSize: { xs: 18, sm: 28 } }} />,
            color: "#EF6C00",
            darkColor: "#FFB74D",
            route: "admin.cases.index",
            metrics: [
                { label: "Open", value: openInquiries },
                { label: "Confirmed", value: confirmedCases },
            ],
        },
        {
            title: "Patients",
            icon: <AccessibleIcon sx={{ fontSize: { xs: 18, sm: 28 } }} />,
            color: "#7B1FA2",
            darkColor: "#CE93D8",
            route: "admin.patients",
            metrics: [
                { label: "Child Care", value: childCarePatients },
                { label: "Elderly Care", value: elderlyCarePatients },
            ],
        },
    ];

    return (
        <AdminLayout>
            <Head title="Dashboard" />
            <Container maxWidth="lg" sx={{ pb: 3, px: { xs: 0 } }}>
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    mb={{ xs: 2, sm: 4 }}
                    color="primary"
                    sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                >
                    Admin Dashboard
                </Typography>

                <Grid2 container spacing={{ xs: 1, sm: 2, lg: 3 }} mb={2}>
                    {stats.map((stat) => (
                        <Grid2 key={stat.title} size={{ xs: 6, lg: 3 }}>
                            <Card
                                sx={{
                                    ...dashboardPaperSx,
                                    cursor: "pointer",
                                    height: "100%",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow: (theme) =>
                                            dashboardShadow(theme, true),
                                    },
                                }}
                                onClick={() => router.get(route(stat.route))}
                            >
                                <CardContent
                                    sx={{
                                        p: { xs: 1.25, sm: 2.5 },
                                        "&:last-child": {
                                            pb: { xs: 1.25, sm: 2.5 },
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mb: { xs: 1, sm: 2 },
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                bgcolor: (theme) =>
                                                    alpha(
                                                        theme.palette.mode ===
                                                            "dark"
                                                            ? stat.darkColor
                                                            : stat.color,
                                                        theme.palette.mode ===
                                                            "dark"
                                                            ? 0.24
                                                            : 0.14,
                                                    ),
                                                color: (theme) =>
                                                    theme.palette.mode ===
                                                    "dark"
                                                        ? stat.darkColor
                                                        : stat.color,
                                                width: { xs: 28, sm: 48 },
                                                height: { xs: 28, sm: 48 },
                                                mr: { xs: 0.75, sm: 1.5 },
                                            }}
                                        >
                                            {stat.icon}
                                        </Avatar>
                                        <Typography
                                            fontWeight={600}
                                            color="text.primary"
                                            sx={{
                                                fontSize: {
                                                    xs: "0.78rem",
                                                    sm: "1.05rem",
                                                },
                                                lineHeight: 1.2,
                                            }}
                                        >
                                            {stat.title}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex" }}>
                                        {stat.metrics.map((metric, index) => (
                                            <Box
                                                key={metric.label}
                                                sx={{
                                                    flex: 1,
                                                    minWidth: 0,
                                                    pl: index === 0 ? 0 : { xs: 0.75, sm: 1.5 },
                                                    ml: index === 0 ? 0 : { xs: 0.75, sm: 1.5 },
                                                    borderLeft:
                                                        index === 0
                                                            ? "none"
                                                            : "1px solid",
                                                    borderColor: "divider",
                                                }}
                                            >
                                                <Typography
                                                    fontWeight={700}
                                                    sx={{
                                                        color: (theme) =>
                                                            theme.palette
                                                                .mode === "dark"
                                                                ? stat.darkColor
                                                                : stat.color,
                                                        fontSize: {
                                                            xs: "1.25rem",
                                                            sm: "2rem",
                                                        },
                                                        lineHeight: 1.1,
                                                    }}
                                                >
                                                    {metric.value}
                                                </Typography>
                                                <Typography
                                                    color="text.secondary"
                                                    sx={{
                                                        mt: 0.25,
                                                        fontSize: {
                                                            xs: "0.68rem",
                                                            sm: "0.85rem",
                                                        },
                                                        lineHeight: 1.2,
                                                    }}
                                                >
                                                    {metric.label}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>

                <Grid2 container spacing={{ xs: 1.5, sm: 2 }} mb={2}>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <MonthlyColumnChart
                            title="Inquiries and confirmations"
                            caption="Last 6 months. Percent is confirmed ÷ cases."
                            series={[
                                {
                                    key: "inquiries",
                                    label: "Inquiries",
                                    color: "#EF6C00",
                                },
                                {
                                    key: "confirmed",
                                    label: "Confirmed",
                                    color: "#875cd1",
                                },
                                {
                                    key: "cancelled",
                                    label: "Cancelled",
                                    color: "#9E9E9E",
                                },
                            ]}
                            months={caseTrend}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <MonthlyColumnChart
                            title="Recruitment and CVs"
                            caption="Last 6 months. Percent is the CV rate."
                            series={[
                                {
                                    key: "recruit",
                                    label: "Recruitment",
                                    color: "#2196F3",
                                },
                                {
                                    key: "cvs",
                                    label: "CV",
                                    color: "#4CAF50",
                                },
                            ]}
                            months={recruitmentTrend}
                        />
                    </Grid2>
                </Grid2>

                <RecentNotesSection
                    complaints={latestComplaints}
                    feedbacks={latestFeedbacks}
                />

                <CareLogSection
                    recentCareLogs={recentCareLogs}
                    missingCareLogWarnings={missingCareLogWarnings}
                    recentCareLogDays={recentCareLogDays}
                />

                {/* Additional Dashboard Content */}
                <Grid2 container spacing={2}>
                    <Grid2 size={{ xs: 12, md: 8 }}>
                        <Paper sx={{ ...dashboardPaperSx, p: { xs: 2, sm: 3 } }}>
                            <Typography variant="h6" fontWeight="bold" mb={2}>
                                Quick Actions
                            </Typography>
                            <Grid2 container spacing={2}>
                                <Grid2 size={6}>
                                    <Box
                                        sx={{
                                            p: 2,
                                            bgcolor: "action.hover",
                                            color: "text.primary",
                                            borderRadius: 2,
                                            cursor: "pointer",
                                            "&:hover": {
                                                bgcolor: "action.selected",
                                            },
                                        }}
                                        onClick={() =>
                                            router.get(route("admin.cv.all"))
                                        }
                                    >
                                        <Typography
                                            variant="body1"
                                            fontWeight={500}
                                        >
                                            Manage Caregivers
                                        </Typography>
                                    </Box>
                                </Grid2>
                                <Grid2 size={6}>
                                    <Box
                                        sx={{
                                            p: 2,
                                            bgcolor: "action.hover",
                                            color: "text.primary",
                                            borderRadius: 2,
                                            cursor: "pointer",
                                            "&:hover": {
                                                bgcolor: "action.selected",
                                            },
                                        }}
                                        onClick={() =>
                                            router.get(route("admin.care.logs"))
                                        }
                                    >
                                        <Typography
                                            variant="body1"
                                            fontWeight={500}
                                        >
                                            View Care Logs
                                        </Typography>
                                    </Box>
                                </Grid2>
                            </Grid2>
                        </Paper>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <Paper sx={{ ...dashboardPaperSx, p: { xs: 2, sm: 3 }, height: "100%" }}>
                            <Typography variant="h6" fontWeight="bold" mb={2}>
                                System Status
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 1,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: "50%",
                                        bgcolor: "#4CAF50",
                                        mr: 1,
                                    }}
                                />
                                <Typography variant="body2">
                                    All systems operational
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid2>
                </Grid2>
            </Container>
        </AdminLayout>
    );
}

export default Dashboard;
