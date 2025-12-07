import AppLayout from "@/Layouts/AppLayout";
import { Head, router } from "@inertiajs/react";
import {
    Box,
    Button,
    Container,
    Typography,
    Card,
    CardContent,
    Grid2,
    Avatar,
    Paper,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LogoutIcon from "@mui/icons-material/Logout";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import PregnantWomanIcon from "@mui/icons-material/PregnantWoman";
import ElderlyIcon from "@mui/icons-material/Elderly";

const Menus = [
    {
        title: "My CV",
        routeName: "cv.show",
        icon: <PersonIcon sx={{ fontSize: 30 }} />,
        color: "#4CAF50",
        bgColor: "#E8F5E8",
    },
    {
        title: "Qualification",
        routeName: "certificates.show",
        icon: <SchoolIcon sx={{ fontSize: 30 }} />,
        color: "#2196F3",
        bgColor: "#E3F2FD",
    },
    {
        title: "Experience",
        routeName: "experiences.show",
        icon: <WorkIcon sx={{ fontSize: 30 }} />,
        color: "#FF9800",
        bgColor: "#FFF3E0",
    },
    {
        title: "Medical Checkup",
        routeName: "coming.soon",
        icon: <LocalHospitalIcon sx={{ fontSize: 30 }} />,
        color: "#f44336",
        bgColor: "#FFEBEE",
    },
];

const MyCares = [
    {
        title: "My Patient / Baby",
        routeName: "coming.soon",
        icon: <PersonIcon sx={{ fontSize: 30 }} />,
        color: "#9C27B0",
        bgColor: "#F3E5F5",
    },
    {
        title: "Care Plan",
        routeName: "coming.soon",
        icon: <WorkIcon sx={{ fontSize: 30 }} />,
        color: "#00BCD4",
        bgColor: "#E0F2F1",
    },
];

const CareLogTypes = [
    {
        title: "Newborn Care Logs",
        routeName: "cg.carelogs.newborn",
        icon: <ChildCareIcon sx={{ fontSize: 24 }} />,
        color: "#E91E63",
        bgColor: "#FCE4EC",
        description: "Track feeding, sleeping, and development",
    },
    {
        title: "Maternal Care Logs",
        routeName: "cg.carelogs.maternal",
        icon: <PregnantWomanIcon sx={{ fontSize: 24 }} />,
        color: "#9C27B0",
        bgColor: "#F3E5F5",
        description: "Monitor postnatal recovery and wellness",
    },
    {
        title: "Elderly Care Logs",
        routeName: "cg.carelogs.elderly",
        icon: <ElderlyIcon sx={{ fontSize: 24 }} />,
        color: "#607D8B",
        bgColor: "#ECEFF1",
        description: "Record medications, activities, and health",
    },
];

function CgDashboard({ hasCv, approvedCV }) {
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

    const handleLogout = () => {
        router.post(route("logout"));
    };

    const handleLogoutClick = () => {
        setLogoutDialogOpen(true);
    };

    const handleLogoutCancel = () => {
        setLogoutDialogOpen(false);
    };

    const handleLogoutConfirm = () => {
        setLogoutDialogOpen(false);
        handleLogout();
    };

    return (
        <AppLayout>
            <Head title="Caregiver Dashboard" />
            <Container maxWidth="lg" sx={{ py: 4, minHeight: "70vh" }}>
                {/* Header with Logout Button */}
                <Paper
                    sx={{
                        p: 3,
                        mb: 4,
                        borderRadius: 3,
                        background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "white",
                        position: "relative",
                    }}
                >
                    {/* Logout Button - Responsive positioning */}
                    <Box
                        sx={{
                            position: "absolute",
                            top: { xs: 8, sm: 16 },
                            right: { xs: 8, sm: 16 },
                            zIndex: 1,
                        }}
                    >
                        <Button
                            variant="outlined"
                            color="inherit"
                            startIcon={<LogoutIcon />}
                            onClick={handleLogoutClick}
                            size="small"
                            sx={{
                                color: "white",
                                borderColor: "white",
                                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                minWidth: { xs: "auto", sm: "64px" },
                                px: { xs: 1, sm: 2 },
                                "&:hover": {
                                    borderColor: "rgba(255,255,255,0.8)",
                                    bgcolor: "rgba(255,255,255,0.1)",
                                },
                                // Hide text on very small screens, show only icon
                                "& .MuiButton-startIcon": {
                                    marginRight: { xs: 0, sm: 1 },
                                },
                                "& .MuiButton-text": {
                                    display: { xs: "none", sm: "inline" },
                                },
                            }}
                        >
                            <Box
                                component="span"
                                sx={{ display: { xs: "none", sm: "inline" } }}
                            >
                                Logout
                            </Box>
                        </Button>
                    </Box>

                    {/* Welcome text with proper spacing */}
                    <Box>
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            textAlign="center"
                            sx={{
                                fontSize: { xs: "1.5rem", sm: "2.125rem" },
                                mb: { xs: 0.5, sm: 1 },
                            }}
                        >
                            Welcome to Your Dashboard
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            textAlign="center"
                            sx={{
                                fontSize: { xs: "0.875rem", sm: "1rem" },
                            }}
                        >
                            Manage your profile and care services
                        </Typography>
                    </Box>
                </Paper>

                {/* CV Status */}
                {/* <Box sx={{ mb: 4, textAlign: "center" }}>
                    {approvedCV ? (
                        <Chip
                            label="CV Approved ✓"
                            color="success"
                            size="large"
                            sx={{ fontSize: "1rem", px: 2, py: 1 }}
                        />
                    ) : (
                        <Chip
                            label={hasCv ? "CV Under Review" : "CV Not Created"}
                            color={hasCv ? "warning" : "error"}
                            size="large"
                            sx={{ fontSize: "1rem", px: 2, py: 1 }}
                        />
                    )}
                </Box> */}

                {/* Profile Management Section */}
                {/* <Typography
                    variant="h5"
                    fontWeight="bold"
                    mb={3}
                    color="primary"
                >
                    Profile Management
                </Typography> */}

                {/* <Grid2 container spacing={3} mb={5}>
                 
                    <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card
                            sx={{
                                cursor: "pointer",
                                height: "100%",
                                borderRadius: 3,
                                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                                },
                                opacity: approvedCV ? 0.6 : 1,
                            }}
                            onClick={() =>
                                !approvedCV && router.get(route("cv.create"))
                            }
                        >
                            <CardContent sx={{ p: 3, textAlign: "center" }}>
                                <Avatar
                                    sx={{
                                        bgcolor: "#E8F5E8",
                                        color: "#4CAF50",
                                        width: 60,
                                        height: 60,
                                        mx: "auto",
                                        mb: 2,
                                    }}
                                >
                                    <PersonIcon sx={{ fontSize: 30 }} />
                                </Avatar>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    mb={1}
                                >
                                    {hasCv ? "Edit CV" : "Create CV"}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {approvedCV
                                        ? "Contact admin to edit"
                                        : "Manage your profile"}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid2>

                
                    {Menus.map((item, index) => (
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
                                onClick={() =>
                                    router.get(route(item.routeName))
                                }
                            >
                                <CardContent sx={{ p: 3, textAlign: "center" }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: item.bgColor,
                                            color: item.color,
                                            width: 60,
                                            height: 60,
                                            mx: "auto",
                                            mb: 2,
                                        }}
                                    >
                                        {item.icon}
                                    </Avatar>
                                    <Typography variant="h6" fontWeight="bold">
                                        {item.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2> */}

                {/* My Care Section */}
                {/* <Typography
                    variant="h5"
                    fontWeight="bold"
                    mb={3}
                    color="primary"
                >
                    My Care Services
                </Typography> */}

                {/* <Grid2 container spacing={3} mb={4}>
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card
                            sx={{
                                height: "100%",
                                borderRadius: 3,
                                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                border: "2px solid #E3F2FD",
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Box textAlign="center" mb={3}>
                                    <Avatar
                                        sx={{
                                            bgcolor: "#ECEFF1",
                                            color: "#607D8B",
                                            width: 60,
                                            height: 60,
                                            mx: "auto",
                                            mb: 2,
                                        }}
                                    >
                                        <LocalHospitalIcon
                                            sx={{ fontSize: 30 }}
                                        />
                                    </Avatar>
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        mb={1}
                                    >
                                        New Care Log
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Start documenting care activities
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 2,
                                    }}
                                >
                                    {CareLogTypes.map((careType, index) => (
                                        <Card
                                            key={index}
                                            sx={{
                                                cursor: "pointer",
                                                borderRadius: 2,
                                                boxShadow:
                                                    "0 2px 8px rgba(0,0,0,0.06)",
                                                transition: "all 0.2s ease",
                                                "&:hover": {
                                                    transform:
                                                        "translateX(5px)",
                                                    boxShadow:
                                                        "0 4px 12px rgba(0,0,0,0.1)",
                                                },
                                            }}
                                            onClick={() =>
                                                router.get(
                                                    route(careType.routeName)
                                                )
                                            }
                                        >
                                            <CardContent sx={{ p: 2 }}>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 2,
                                                    }}
                                                >
                                                    <Avatar
                                                        sx={{
                                                            bgcolor:
                                                                careType.bgColor,
                                                            color: careType.color,
                                                            width: 40,
                                                            height: 40,
                                                        }}
                                                    >
                                                        {careType.icon}
                                                    </Avatar>
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography
                                                            variant="subtitle2"
                                                            fontWeight="bold"
                                                            sx={{
                                                                fontSize:
                                                                    "0.875rem",
                                                            }}
                                                        >
                                                            {careType.title}
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                            sx={{
                                                                fontSize:
                                                                    "0.75rem",
                                                            }}
                                                        >
                                                            {
                                                                careType.description
                                                            }
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card
                            sx={{
                                cursor: "pointer",
                                height: "100%",
                                borderRadius: 3,
                                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                transition: "all 0.3s ease",
                                border: "2px solid #E8F5E8",
                                "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                                    border: "2px solid #4CAF50",
                                },
                            }}
                            onClick={() => router.get(route("cg.mycarelogs"))}
                        >
                            <CardContent
                                sx={{
                                    p: 3,
                                    textAlign: "center",
                                    display: "flex",
                                    flexDirection: "column",
                                    height: "100%",
                                }}
                            >
                                <Avatar
                                    sx={{
                                        bgcolor: "#E8F5E8",
                                        color: "#4CAF50",
                                        width: 60,
                                        height: 60,
                                        mx: "auto",
                                        mb: 2,
                                    }}
                                >
                                    <LocalHospitalIcon sx={{ fontSize: 30 }} />
                                </Avatar>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    mb={1}
                                >
                                    My Care Logs
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    mb={2}
                                    sx={{ flexGrow: 1 }}
                                >
                                    View all your submitted care logs
                                </Typography>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Chip
                                        label="View History"
                                        color="success"
                                        size="large"
                                        sx={{ fontWeight: "bold", my: "auto" }}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid2>
                    {MyCares.map((item, index) => (
                        <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4 }}>
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
                                onClick={() =>
                                    router.get(route(item.routeName))
                                }
                            >
                                <CardContent sx={{ p: 3, textAlign: "center" }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: item.bgColor,
                                            color: item.color,
                                            width: 60,
                                            height: 60,
                                            mx: "auto",
                                            mb: 2,
                                        }}
                                    >
                                        {item.icon}
                                    </Avatar>
                                    <Typography variant="h6" fontWeight="bold">
                                        {item.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2> */}

                {/* Contact Admin Notice */}
                {/* {approvedCV && (
                    <Paper
                        sx={{
                            p: 3,
                            textAlign: "center",
                            borderRadius: 3,
                            bgcolor: "#FFF3E0",
                            border: "1px solid #FFB74D",
                        }}
                    >
                        <ContactMailIcon
                            sx={{ fontSize: 40, color: "#FF9800", mb: 1 }}
                        />
                        <Typography variant="h6" mb={1}>
                            Need to Update Your CV?
                        </Typography>
                        <Typography variant="body1" mb={2}>
                            Your CV is approved. To make changes, please contact
                            our admin team.
                        </Typography>
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={() =>
                                router.visit(route("contact.messages"))
                            }
                            sx={{ borderRadius: 2 }}
                        >
                            Contact Admin
                        </Button>
                    </Paper>
                )} */}

                {/* Logout Confirmation Dialog */}
                {/* <Dialog
                    open={logoutDialogOpen}
                    onClose={handleLogoutCancel}
                    aria-labelledby="logout-dialog-title"
                    aria-describedby="logout-dialog-description"
                >
                    <DialogTitle id="logout-dialog-title">
                        Confirm Logout
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="logout-dialog-description">
                            Are you sure you want to logout? You will need to
                            login again to access your dashboard.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleLogoutCancel} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleLogoutConfirm}
                            color="error"
                            variant="contained"
                            startIcon={<LogoutIcon />}
                        >
                            Logout
                        </Button>
                    </DialogActions>
                </Dialog> */}
            </Container>
        </AppLayout>
    );
}

export default CgDashboard;
