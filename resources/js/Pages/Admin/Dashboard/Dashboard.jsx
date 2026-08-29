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
} from "@mui/material";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CareLogSection from "./components/CareLogSection";

function Dashboard({
    totalCaregivers,
    totalJobApplies,
    totalPatients,
    totalContactMessages,
    totalCareLogs,
    recentCareLogs = [],
    missingCareLogWarnings = [],
    recentCareLogDays = 3,
}) {
    const stats = [
        {
            title: "Total Caregivers",
            value: totalCaregivers,
            icon: <PeopleAltIcon sx={{ fontSize: { xs: 22, sm: 32, lg: 40 } }} />,
            color: "#4CAF50",
            bgColor: "#E8F5E8",
            route: "admin.cv.all",
        },
        {
            title: "Job Applications",
            value: totalJobApplies,
            icon: <WorkIcon sx={{ fontSize: { xs: 22, sm: 32, lg: 40 } }} />,
            color: "#2196F3",
            bgColor: "#E3F2FD",
            route: "admin.job.apply",
        },
        {
            title: "Total Care Logs",
            value: totalCareLogs,
            icon: <AssignmentIcon sx={{ fontSize: { xs: 22, sm: 32, lg: 40 } }} />,
            color: "#FF9800",
            bgColor: "#FFF3E0",
            route: "admin.care.logs",
        },
        {
            title: "Messages",
            value: totalContactMessages,
            icon: <MessageIcon sx={{ fontSize: { xs: 22, sm: 32, lg: 40 } }} />,
            color: "#9C27B0",
            bgColor: "#F3E5F5",
            route: "admin.messages",
        },
        // {
        //     title: "Total Patients",
        //     value: totalPatients,
        //     icon: <PersonIcon sx={{ fontSize: 40 }} />,
        //     color: "#FF9800",
        //     bgColor: "#FFF3E0",
        //     route: "admin.patients",
        // },
    ];

    return (
        <AdminLayout>
            <Head title="Dashboard" />
            <Container maxWidth="lg" sx={{ pb: 3, px: { xs: 0 } }}>
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    mb={4}
                    color="primary"
                >
                    Admin Dashboard
                </Typography>

                <Grid2 container spacing={{ xs: 1.5, sm: 2, lg: 3 }} mb={4}>
                    {stats.map((stat, index) => (
                        <Grid2 key={index} size={{ xs: 6, lg: 3 }}>
                            <Card
                                sx={{
                                    cursor: "pointer",
                                    height: "100%",
                                    borderRadius: 3,
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        transform: "translateY(-5px)",
                                        boxShadow:
                                            "0 8px 30px rgba(0,0,0,0.12)",
                                    },
                                }}
                                onClick={() => router.get(route(stat.route))}
                            >
                                <CardContent
                                    sx={{ p: { xs: 1.5, sm: 2, lg: 3 } }}
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
                                                bgcolor: stat.bgColor,
                                                color: stat.color,
                                                width: { xs: 40, sm: 52, lg: 60 },
                                                height: { xs: 40, sm: 52, lg: 60 },
                                                mr: { xs: 1, sm: 2 },
                                            }}
                                        >
                                            {stat.icon}
                                        </Avatar>
                                        <Box>
                                            <Typography
                                                variant="h3"
                                                fontWeight="bold"
                                                color={stat.color}
                                                sx={{
                                                    fontSize: {
                                                        xs: "1.5rem",
                                                        sm: "2rem",
                                                        lg: "3rem",
                                                    },
                                                }}
                                            >
                                                {stat.value}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                        fontWeight={500}
                                        sx={{
                                            fontSize: {
                                                xs: "0.85rem",
                                                sm: "1rem",
                                                lg: "1.25rem",
                                            },
                                        }}
                                    >
                                        {stat.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>

                <CareLogSection
                    recentCareLogs={recentCareLogs}
                    missingCareLogWarnings={missingCareLogWarnings}
                    recentCareLogDays={recentCareLogDays}
                />

                {/* Additional Dashboard Content */}
                <Grid2 container spacing={3}>
                    <Grid2 size={{ xs: 12, md: 8 }}>
                        <Paper
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold" mb={2}>
                                Quick Actions
                            </Typography>
                            <Grid2 container spacing={2}>
                                <Grid2 size={6}>
                                    <Box
                                        sx={{
                                            p: 2,
                                            bgcolor: "gray.100",
                                            borderRadius: 2,
                                            cursor: "pointer",
                                            "&:hover": { bgcolor: "#EEEEEE" },
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
                                            bgcolor: "gray.100",
                                            borderRadius: 2,
                                            cursor: "pointer",
                                            "&:hover": { bgcolor: "#EEEEEE" },
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
                        <Paper
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                            }}
                        >
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
