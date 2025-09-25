import AppLayout from "@/Layouts/AppLayout";
import React, { useState } from "react";
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Grid2,
    Avatar,
    Button,
    Paper,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { Head, router } from "@inertiajs/react";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LogoutIcon from "@mui/icons-material/Logout";

function EmployerDashboard({ user, bookings = [] }) {
    console.log("bookings:", bookings);

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
            <Head title="Employer Dashboard" />
            <Box
                sx={{
                    minHeight: "100vh",
                    background:
                        "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                    py: 3,
                }}
            >
                <Container maxWidth="lg" sx={{ height: "100%" }}>
                    {/* Header */}
                    <Paper
                        sx={{
                            p: 3,
                            mb: 3,
                            borderRadius: 3,
                            background:
                                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "white",
                            position: "relative",
                        }}
                    >
                        {/* Logout Button */}
                        <Box
                            sx={{
                                position: "absolute",
                                top: { xs: 8, sm: 16 },
                                right: { xs: 8, sm: 16 },
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
                                    "&:hover": {
                                        borderColor: "rgba(255,255,255,0.8)",
                                        bgcolor: "rgba(255,255,255,0.1)",
                                    },
                                }}
                            >
                                <Box
                                    component="span"
                                    sx={{
                                        display: { xs: "none", sm: "inline" },
                                    }}
                                >
                                    Logout
                                </Box>
                            </Button>
                        </Box>

                        <Box sx={{ pr: { xs: 5, sm: 0 } }}>
                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                textAlign="center"
                                sx={{
                                    fontSize: { xs: "1.5rem", sm: "2.125rem" },
                                }}
                            >
                                Welcome Back, {user?.name || "Employer"}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                textAlign="center"
                                mt={1}
                            >
                                Manage your bookings and profile
                            </Typography>
                        </Box>
                    </Paper>

                    <Grid2
                        container
                        spacing={3}
                        sx={{ minHeight: "calc(100vh - 200px)" }}
                    >
                        {/* Profile Card */}
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Card
                                sx={{
                                    height: "100%",
                                    borderRadius: 3,
                                    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                                }}
                            >
                                <CardContent sx={{ p: 4 }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mb: 3,
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                bgcolor: "primary.main",
                                                mr: 3,
                                                fontSize: "2rem",
                                            }}
                                        >
                                            {user?.name?.charAt(0) || "E"}
                                        </Avatar>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography
                                                variant="h5"
                                                fontWeight="bold"
                                                mb={1}
                                            >
                                                {user?.name || "Employer Name"}
                                            </Typography>
                                            <Chip
                                                label="Employer"
                                                color="primary"
                                                size="small"
                                                sx={{ mb: 2 }}
                                            />
                                            <Button
                                                variant="outlined"
                                                onClick={() =>
                                                    router.get(
                                                        route(
                                                            "employer.profile.edit"
                                                        )
                                                    )
                                                }
                                                sx={{
                                                    borderRadius: 2,
                                                    display: "block",
                                                }}
                                                size="small"
                                            >
                                                Edit Profile
                                            </Button>
                                        </Box>
                                    </Box>

                                    <Divider sx={{ my: 3 }} />

                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        mb={2}
                                    >
                                        Contact Information
                                    </Typography>

                                    <List sx={{ p: 0 }}>
                                        <ListItem sx={{ px: 0, py: 1 }}>
                                            <ListItemIcon>
                                                <EmailIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Email"
                                                secondary={
                                                    user?.email ||
                                                    "email@example.com"
                                                }
                                            />
                                        </ListItem>
                                        <ListItem sx={{ px: 0, py: 1 }}>
                                            <ListItemIcon>
                                                <PhoneIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Phone"
                                                secondary={
                                                    user?.phone ||
                                                    "Not provided"
                                                }
                                            />
                                        </ListItem>
                                        <ListItem sx={{ px: 0, py: 1 }}>
                                            <ListItemIcon>
                                                <LocationOnIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Address"
                                                secondary={
                                                    user?.address ||
                                                    "Not provided"
                                                }
                                            />
                                        </ListItem>
                                        <ListItem sx={{ px: 0, py: 1 }}>
                                            <ListItemIcon>
                                                <CalendarTodayIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Member Since"
                                                secondary={
                                                    user?.created_at
                                                        ? new Date(
                                                              user.created_at
                                                          ).toLocaleDateString()
                                                        : "Recently"
                                                }
                                            />
                                        </ListItem>
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid2>

                        {/* My Bookings Card */}
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Card
                                sx={{
                                    height: "100%",
                                    borderRadius: 3,
                                    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                                }}
                            >
                                <CardContent sx={{ p: 4 }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mb: 3,
                                        }}
                                    >
                                        <BookmarkIcon
                                            sx={{
                                                fontSize: 40,
                                                color: "primary.main",
                                                mr: 2,
                                            }}
                                        />
                                        <Typography
                                            variant="h5"
                                            fontWeight="bold"
                                        >
                                            My Bookings
                                        </Typography>
                                    </Box>

                                    <Divider sx={{ mb: 3 }} />

                                    {bookings.length > 0 ? (
                                        <Box
                                            sx={{
                                                maxHeight: 600,
                                                overflowY: "auto",
                                            }}
                                        >
                                            {bookings.map(
                                                (interview, index) => (
                                                    <Paper
                                                        key={interview.id}
                                                        sx={{
                                                            p: 2,
                                                            mb: 2,
                                                            bgcolor: "grey.50",
                                                            borderRadius: 2,
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="subtitle1"
                                                            fontWeight="bold"
                                                        >
                                                            Interview with{" "}
                                                            {interview.cv
                                                                ?.nickname ||
                                                                "Caregiver"}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            Mode:{" "}
                                                            {interview.mode ||
                                                                "TBD"}
                                                        </Typography>
                                                        {interview.online && (
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                            >
                                                                Online via:{" "}
                                                                {
                                                                    interview.online
                                                                }
                                                            </Typography>
                                                        )}
                                                        {interview.location && (
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                            >
                                                                Address:{" "}
                                                                {
                                                                    interview.location
                                                                }
                                                            </Typography>
                                                        )}
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            Date:{" "}
                                                            {interview.date
                                                                ? new Date(
                                                                      interview.date
                                                                  ).toLocaleDateString()
                                                                : "TBD"}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            Status:
                                                            <Chip
                                                                label={
                                                                    interview.status ||
                                                                    "Pending"
                                                                }
                                                                size="small"
                                                                color={
                                                                    interview.status ===
                                                                    "confirmed"
                                                                        ? "success"
                                                                        : interview.status ===
                                                                          "cancelled"
                                                                        ? "error"
                                                                        : "warning"
                                                                }
                                                                sx={{ ml: 1 }}
                                                            />
                                                        </Typography>
                                                        {interview.notes && (
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                            >
                                                                Notes:{" "}
                                                                {
                                                                    interview.notes
                                                                }
                                                            </Typography>
                                                        )}
                                                    </Paper>
                                                )
                                            )}
                                        </Box>
                                    ) : (
                                        <Box
                                            sx={{ textAlign: "center", py: 4 }}
                                        >
                                            <BookmarkIcon
                                                sx={{
                                                    fontSize: 60,
                                                    color: "grey.300",
                                                    mb: 2,
                                                }}
                                            />
                                            <Typography
                                                variant="h6"
                                                color="text.secondary"
                                                mb={2}
                                            >
                                                No Bookings Yet
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                mb={3}
                                            >
                                                Start to create a customized
                                                care plan and choose a
                                                Caregiver.
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() =>
                                                    router.get(
                                                        route("care.start")
                                                    )
                                                }
                                                sx={{ borderRadius: 2 }}
                                            >
                                                Get Care Now
                                            </Button>
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid2>
                    </Grid2>

                    {/* Logout Confirmation Dialog */}
                    <Dialog
                        open={logoutDialogOpen}
                        onClose={handleLogoutCancel}
                        aria-labelledby="logout-dialog-title"
                    >
                        <DialogTitle id="logout-dialog-title">
                            Confirm Logout
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to logout? You will need
                                to login again to access your dashboard.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={handleLogoutCancel}
                                color="primary"
                            >
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
                    </Dialog>
                </Container>
            </Box>
        </AppLayout>
    );
}

export default EmployerDashboard;
