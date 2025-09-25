import React from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Typography,
    Paper,
    Avatar,
    Divider,
    List,
    Grid2,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Breadcrumbs,
    Link as MuiLink,
} from "@mui/material";
import {
    ArrowBack as ArrowBackIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    Star as StarIcon,
    StarBorder as StarBorderIcon,
    School as SchoolIcon,
    Schedule as ScheduleIcon,
    Language as LanguageIcon,
    Category as CategoryIcon,
    Person as PersonIcon,
    AttachMoney as AttachMoneyIcon,
    PlayCircleOutline as PlayCircleOutlineIcon,
    DateRange as DateRangeIcon,
    AccessTime as AccessTimeIcon,
    Group as GroupIcon,
    NavigateNext as NavigateNextIcon,
} from "@mui/icons-material";
import { Link, router } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function AdminSingleTrainingCourse({
    auth,
    course,
    relatedCourses,
}) {
    const isAdmin = auth.user?.is_admin;

    const toggleActive = () => {
        router.patch(route("training-courses.toggle-active", course.slug));
    };

    const toggleFeatured = () => {
        router.patch(route("training-courses.toggle-featured", course.slug));
    };

    const deleteCourse = () => {
        if (confirm(`Are you sure you want to delete "${course.title}"?`)) {
            router.delete(route("training-courses.destroy", course.slug));
        }
    };

    const formatDuration = (minutes) => {
        if (!minutes) return "Not specified";
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    const formatSchedule = () => {
        if (!course.schedule_days || course.schedule_days.length === 0)
            return "No schedule set";

        const days = course.schedule_days.join(", ");
        const startTime = course.daily_start_time
            ? new Date(
                  `2000-01-01T${course.daily_start_time}`
              ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "";
        const endTime = course.daily_end_time
            ? new Date(
                  `2000-01-01T${course.daily_end_time}`
              ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "";

        if (startTime && endTime) {
            return `${days} (${startTime} - ${endTime})`;
        }
        return days;
    };

    const formatDateRange = () => {
        if (!course.start_date && !course.end_date) return "Flexible schedule";

        const startDate = course.start_date
            ? new Date(course.start_date).toLocaleDateString()
            : "";
        const endDate = course.end_date
            ? new Date(course.end_date).toLocaleDateString()
            : "";

        if (startDate && endDate) {
            return `${startDate} - ${endDate}`;
        } else if (startDate) {
            return `From ${startDate}`;
        } else if (endDate) {
            return `Until ${endDate}`;
        }
        return "Flexible schedule";
    };

    return (
        <AdminLayout>
            <Head title={course.title} />

            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Breadcrumbs */}
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    sx={{ mb: 3 }}
                >
                    <MuiLink
                        component={Link}
                        href={
                            isAdmin
                                ? route("admin.training-courses.index")
                                : route("training-courses.index")
                        }
                        underline="hover"
                        color="inherit"
                    >
                        {isAdmin
                            ? "Admin Training Courses"
                            : "Training Courses"}
                    </MuiLink>
                    <Typography color="text.primary">{course.title}</Typography>
                </Breadcrumbs>

                <Grid2 container spacing={4}>
                    {/* Main Content */}
                    <Grid2 size={{ xs: 12, sm: 12, md: 8 }}>
                        {/* Hero Section */}
                        <Card sx={{ mb: 4, overflow: "hidden" }}>
                            {course.image && (
                                <Box
                                    sx={{
                                        height: 300,
                                        backgroundImage: `url(/storage/${course.image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        position: "relative",
                                        display: "flex",
                                        alignItems: "flex-end",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            background:
                                                "linear-gradient(transparent, rgba(0,0,0,0.8))",
                                            width: "100%",
                                            p: 3,
                                            color: "white",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                gap: 1,
                                                mb: 2,
                                                flexWrap: "wrap",
                                            }}
                                        >
                                            <Chip
                                                label={
                                                    course.is_active
                                                        ? "Active"
                                                        : "Inactive"
                                                }
                                                color={
                                                    course.is_active
                                                        ? "success"
                                                        : "error"
                                                }
                                                size="small"
                                                sx={{
                                                    color: "white",
                                                    backgroundColor:
                                                        course.is_active
                                                            ? "success.main"
                                                            : "error.main",
                                                }}
                                            />
                                            {course.is_featured && (
                                                <Chip
                                                    label="Featured"
                                                    color="warning"
                                                    size="small"
                                                    icon={<StarIcon />}
                                                    sx={{
                                                        color: "white",
                                                        backgroundColor:
                                                            "warning.main",
                                                    }}
                                                />
                                            )}
                                            {course.level && (
                                                <Chip
                                                    label={course.level}
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        color: "white",
                                                        borderColor: "white",
                                                    }}
                                                />
                                            )}
                                        </Box>
                                        <Typography
                                            variant="h4"
                                            component="h1"
                                            fontWeight="bold"
                                        >
                                            {course.title}
                                        </Typography>
                                    </Box>
                                </Box>
                            )}

                            {!course.image && (
                                <CardContent sx={{ py: 4 }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 1,
                                            mb: 2,
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        <Chip
                                            label={
                                                course.is_active
                                                    ? "Active"
                                                    : "Inactive"
                                            }
                                            color={
                                                course.is_active
                                                    ? "success"
                                                    : "error"
                                            }
                                            size="small"
                                        />
                                        {course.is_featured && (
                                            <Chip
                                                label="Featured"
                                                color="warning"
                                                size="small"
                                                icon={<StarIcon />}
                                            />
                                        )}
                                        {course.level && (
                                            <Chip
                                                label={course.level}
                                                color="primary"
                                                variant="outlined"
                                                size="small"
                                            />
                                        )}
                                    </Box>
                                    <Typography
                                        variant="h4"
                                        component="h1"
                                        fontWeight="bold"
                                        gutterBottom
                                    >
                                        {course.title}
                                    </Typography>
                                </CardContent>
                            )}
                        </Card>

                        {/* Description */}
                        {course.description && (
                            <Card sx={{ mb: 4 }}>
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                    >
                                        <SchoolIcon color="primary" />
                                        Course Description
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            whiteSpace: "pre-wrap",
                                            lineHeight: 1.8,
                                        }}
                                    >
                                        {course.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        )}

                        {/* Course Details */}
                        <Card sx={{ mb: 4 }}>
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <CategoryIcon color="primary" />
                                    Course Information
                                </Typography>
                                <Grid2 container spacing={3}>
                                    <Grid2 xs={12} sm={6}>
                                        <List dense>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <PersonIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Instructor"
                                                    secondary={
                                                        course.instructor ||
                                                        "Not assigned"
                                                    }
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <CategoryIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Category"
                                                    secondary={
                                                        course.category ||
                                                        "Uncategorized"
                                                    }
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <LanguageIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Language"
                                                    secondary={
                                                        course.language ||
                                                        "English"
                                                    }
                                                />
                                            </ListItem>
                                        </List>
                                    </Grid2>
                                    <Grid2 xs={12} sm={6}>
                                        <List dense>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <AttachMoneyIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Price"
                                                    secondary={`฿${course.price.toLocaleString()}`}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <AccessTimeIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Duration"
                                                    secondary={formatDuration(
                                                        course.duration
                                                    )}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <GroupIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Enrollments"
                                                    secondary={`${
                                                        course.enrollment_count ||
                                                        0
                                                    } students`}
                                                />
                                            </ListItem>
                                        </List>
                                    </Grid2>
                                </Grid2>
                            </CardContent>
                        </Card>

                        {/* Schedule */}
                        <Card sx={{ mb: 4 }}>
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <ScheduleIcon color="primary" />
                                    Schedule Information
                                </Typography>
                                <Grid2 container spacing={3}>
                                    <Grid2 xs={12} sm={6}>
                                        <Box
                                            sx={{
                                                p: 2,
                                                backgroundColor: "grey.50",
                                                borderRadius: 1,
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                color="primary"
                                                gutterBottom
                                            >
                                                Course Duration
                                            </Typography>
                                            <Typography variant="body1">
                                                {formatDateRange()}
                                            </Typography>
                                        </Box>
                                    </Grid2>
                                    <Grid2 xs={12} sm={6}>
                                        <Box
                                            sx={{
                                                p: 2,
                                                backgroundColor: "grey.50",
                                                borderRadius: 1,
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                color="primary"
                                                gutterBottom
                                            >
                                                Weekly Schedule
                                            </Typography>
                                            <Typography variant="body1">
                                                {formatSchedule()}
                                            </Typography>
                                        </Box>
                                    </Grid2>
                                </Grid2>
                            </CardContent>
                        </Card>

                        {/* Media Links */}
                        {(course.video_url || course.certificate_url) && (
                            <Card sx={{ mb: 4 }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Course Resources
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 2,
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        {course.video_url && (
                                            <Button
                                                variant="outlined"
                                                startIcon={
                                                    <PlayCircleOutlineIcon />
                                                }
                                                href={course.video_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Watch Video
                                            </Button>
                                        )}
                                        {course.certificate_url && (
                                            <Button
                                                variant="outlined"
                                                href={course.certificate_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View Certificate
                                            </Button>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        )}
                    </Grid2>

                    {/* Sidebar */}
                    <Grid2 size={{ xs: 12, sm: 12, md: 3 }}>
                        {/* Admin Actions */}
                        {isAdmin && (
                            <Paper sx={{ p: 3, mb: 3 }}>
                                <Typography variant="h6" gutterBottom>
                                    Admin Actions
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 2,
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        startIcon={<EditIcon />}
                                        component={Link}
                                        href={route(
                                            "training-courses.edit",
                                            course.slug
                                        )}
                                        fullWidth
                                    >
                                        Edit Course
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={
                                            course.is_active ? (
                                                <VisibilityOffIcon />
                                            ) : (
                                                <VisibilityIcon />
                                            )
                                        }
                                        onClick={toggleActive}
                                        color={
                                            course.is_active
                                                ? "error"
                                                : "success"
                                        }
                                        fullWidth
                                    >
                                        {course.is_active
                                            ? "Deactivate"
                                            : "Activate"}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={
                                            course.is_featured ? (
                                                <StarIcon />
                                            ) : (
                                                <StarBorderIcon />
                                            )
                                        }
                                        onClick={toggleFeatured}
                                        color="warning"
                                        fullWidth
                                    >
                                        {course.is_featured
                                            ? "Remove Featured"
                                            : "Mark Featured"}
                                    </Button>
                                    <Divider />
                                    <Button
                                        variant="outlined"
                                        startIcon={<DeleteIcon />}
                                        onClick={deleteCourse}
                                        color="error"
                                        fullWidth
                                    >
                                        Delete Course
                                    </Button>
                                </Box>
                            </Paper>
                        )}

                        {/* Course Stats */}
                        <Paper sx={{ p: 3, mb: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Course Statistics
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Total Enrollments
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        fontWeight="bold"
                                    >
                                        {course.enrollment_count || 0}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Created
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        fontWeight="bold"
                                    >
                                        {new Date(
                                            course.created_at
                                        ).toLocaleDateString()}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Last Updated
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        fontWeight="bold"
                                    >
                                        {new Date(
                                            course.updated_at
                                        ).toLocaleDateString()}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Status
                                    </Typography>
                                    <Chip
                                        label={
                                            course.is_active
                                                ? "Active"
                                                : "Inactive"
                                        }
                                        color={
                                            course.is_active
                                                ? "success"
                                                : "error"
                                        }
                                        size="small"
                                    />
                                </Box>
                            </Box>
                        </Paper>

                        {/* Related Courses */}
                        {relatedCourses && relatedCourses.length > 0 && (
                            <Paper sx={{ p: 3 }}>
                                <Typography variant="h6" gutterBottom>
                                    Related Courses
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 2,
                                    }}
                                >
                                    {relatedCourses.map((relatedCourse) => (
                                        <Card
                                            key={relatedCourse.id}
                                            variant="outlined"
                                        >
                                            <CardContent
                                                sx={{
                                                    p: 2,
                                                    "&:last-child": { pb: 2 },
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    fontWeight="bold"
                                                    gutterBottom
                                                >
                                                    {relatedCourse.title}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    gutterBottom
                                                >
                                                    {relatedCourse.instructor ||
                                                        "No instructor"}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                        alignItems: "center",
                                                        mt: 1,
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body2"
                                                        color="primary"
                                                        fontWeight="bold"
                                                    >
                                                        ฿
                                                        {relatedCourse.price.toLocaleString()}
                                                    </Typography>
                                                    <Button
                                                        size="small"
                                                        component={Link}
                                                        href={route(
                                                            "training-courses.show",
                                                            relatedCourse.slug
                                                        )}
                                                    >
                                                        View
                                                    </Button>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Box>
                            </Paper>
                        )}
                    </Grid2>
                </Grid2>
            </Container>
        </AdminLayout>
    );
}
