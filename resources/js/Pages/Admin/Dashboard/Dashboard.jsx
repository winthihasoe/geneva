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
} from "@mui/material";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";

function Dashboard({
    totalCaregivers,
    totalJobApplies,
    totalPatients,
    totalContactMessages,
}) {
    const stats = [
        {
            title: "Total Caregivers",
            value: totalCaregivers,
            icon: <PeopleAltIcon sx={{ fontSize: 40 }} />,
            color: "#4CAF50",
            bgColor: "#E8F5E8",
            route: "admin.cv.all",
        },
        {
            title: "Job Applications",
            value: totalJobApplies,
            icon: <WorkIcon sx={{ fontSize: 40 }} />,
            color: "#2196F3",
            bgColor: "#E3F2FD",
            route: "admin.job.apply",
        },
        {
            title: "Total Patients",
            value: totalPatients,
            icon: <PersonIcon sx={{ fontSize: 40 }} />,
            color: "#FF9800",
            bgColor: "#FFF3E0",
            route: "admin.patients",
        },
        {
            title: "Messages",
            value: totalContactMessages,
            icon: <MessageIcon sx={{ fontSize: 40 }} />,
            color: "#9C27B0",
            bgColor: "#F3E5F5",
            route: "admin.messages",
        },
    ];

    return (
        <AdminLayout>
            <Head title="Dashboard" />
            <Box sx={{ p: 3 }}>
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    mb={4}
                    color="primary"
                >
                    Dashboard Overview
                </Typography>

                <Grid2 container spacing={3} mb={4}>
                    {stats.map((stat, index) => (
                        <Grid2 key={index} size={{ xs: 12, sm: 6, md: 3 }}>
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
                                <CardContent sx={{ p: 3 }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mb: 2,
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                bgcolor: stat.bgColor,
                                                color: stat.color,
                                                width: 60,
                                                height: 60,
                                                mr: 2,
                                            }}
                                        >
                                            {stat.icon}
                                        </Avatar>
                                        <Box>
                                            <Typography
                                                variant="h3"
                                                fontWeight="bold"
                                                color={stat.color}
                                            >
                                                {stat.value}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                        fontWeight={500}
                                    >
                                        {stat.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>

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
                                            bgcolor: "#F5F5F5",
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
                                            bgcolor: "#F5F5F5",
                                            borderRadius: 2,
                                            cursor: "pointer",
                                            "&:hover": { bgcolor: "#EEEEEE" },
                                        }}
                                        onClick={() =>
                                            router.get(route("admin.patients"))
                                        }
                                    >
                                        <Typography
                                            variant="body1"
                                            fontWeight={500}
                                        >
                                            View Patients
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
            </Box>
        </AdminLayout>
    );
}

export default Dashboard;
