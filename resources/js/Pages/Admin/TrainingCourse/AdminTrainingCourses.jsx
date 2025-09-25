import React, { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Container,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
    Tooltip,
    CardActions,
    Grid2,
    Collapse,
} from "@mui/material";
import {
    Add as AddIcon,
    Search as SearchIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    Star as StarIcon,
    StarBorder as StarBorderIcon,
    ContentCopy as ContentCopyIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
    FilterList as FilterListIcon,
} from "@mui/icons-material";
import { Link, router } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Title from "@/Components/Typo/Title";

export default function AdminTrainingCourses({
    auth,
    courses,
    filters,
    categories,
    levels,
    totalCourses,
    activeCourses,
    featuredCourses,
}) {
    const [searchTerm, setSearchTerm] = useState(filters.search || "");
    const [showFilters, setShowFilters] = useState(false); // Add this state

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("admin.training-courses.index"), {
            ...filters,
            search: searchTerm,
        });
    };

    const handleFilterChange = (filterName, value) => {
        router.get(route("admin.training-courses.index"), {
            ...filters,
            [filterName]: value,
        });
    };

    const toggleActive = (slug) => {
        router.patch(route("training-courses.toggle-active", slug));
    };

    const toggleFeatured = (slug) => {
        router.patch(route("training-courses.toggle-featured", slug));
    };

    const deleteCourse = (slug, title) => {
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
            router.delete(route("training-courses.destroy", slug));
        }
    };

    const duplicateCourse = (slug) => {
        router.post(route("training-courses.duplicate", slug));
    };

    return (
        <AdminLayout>
            <Head title="Admin Training Courses" />

            <Container maxWidth="lg">
                {/* Header Section */}
                <Box sx={{ mb: 4 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            mb: 3,
                        }}
                    >
                        <Title>Training Courses</Title>
                        <Button
                            variant="contained"
                            color="primary"
                            component={Link}
                            href={route("training-courses.create")}
                        >
                            Create Course
                        </Button>
                    </Box>

                    {/* Stats Cards - Make them more compact on mobile */}
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={4} sm={4} md={3}>
                            <Paper
                                sx={{
                                    p: { xs: 1, sm: 2 },
                                    textAlign: "center",
                                }}
                            >
                                <Typography
                                    variant={{ xs: "h5", sm: "h4" }}
                                    color="primary"
                                    fontWeight="bold"
                                >
                                    {totalCourses}{" "}
                                </Typography>
                                <Typography
                                    variant={{ xs: "caption", sm: "body2" }}
                                    color="text.secondary"
                                >
                                    Total
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={4} sm={4} md={3}>
                            <Paper
                                sx={{
                                    p: { xs: 1, sm: 2 },
                                    textAlign: "center",
                                }}
                            >
                                <Typography
                                    variant={{ xs: "h5", sm: "h4" }}
                                    color="success.main"
                                    fontWeight="bold"
                                >
                                    {activeCourses}{" "}
                                </Typography>
                                <Typography
                                    variant={{ xs: "caption", sm: "body2" }}
                                    color="text.secondary"
                                >
                                    Active
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={4} sm={4} md={3}>
                            <Paper
                                sx={{
                                    p: { xs: 1, sm: 2 },
                                    textAlign: "center",
                                }}
                            >
                                <Typography
                                    variant={{ xs: "h5", sm: "h4" }}
                                    color="warning.main"
                                    fontWeight="bold"
                                >
                                    {featuredCourses}{" "}
                                </Typography>
                                <Typography
                                    variant={{ xs: "caption", sm: "body2" }}
                                    color="text.secondary"
                                >
                                    Featured
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* Compact Search and Filters */}
                    <Paper sx={{ p: 2 }}>
                        {/* Always visible search bar with filter toggle */}
                        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                            <Box
                                component="form"
                                onSubmit={handleSearch}
                                sx={{ flexGrow: 1 }}
                            >
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Search courses..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    type="submit"
                                                    size="small"
                                                >
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => setShowFilters(!showFilters)}
                                startIcon={<FilterListIcon />}
                                endIcon={
                                    showFilters ? (
                                        <ExpandLessIcon />
                                    ) : (
                                        <ExpandMoreIcon />
                                    )
                                }
                            >
                                Filters
                            </Button>
                        </Box>

                        {/* Collapsible filters */}
                        <Collapse in={showFilters}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={3}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                            value={filters.category || ""}
                                            label="Category"
                                            onChange={(e) =>
                                                handleFilterChange(
                                                    "category",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <MenuItem value="">
                                                All Categories
                                            </MenuItem>
                                            {categories.map((category) => (
                                                <MenuItem
                                                    key={category}
                                                    value={category}
                                                >
                                                    {category}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Level</InputLabel>
                                        <Select
                                            value={filters.level || ""}
                                            label="Level"
                                            onChange={(e) =>
                                                handleFilterChange(
                                                    "level",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <MenuItem value="">
                                                All Levels
                                            </MenuItem>
                                            {levels.map((level) => (
                                                <MenuItem
                                                    key={level}
                                                    value={level}
                                                >
                                                    {level}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Status</InputLabel>
                                        <Select
                                            value={filters.status || ""}
                                            label="Status"
                                            onChange={(e) =>
                                                handleFilterChange(
                                                    "status",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <MenuItem value="">
                                                All Status
                                            </MenuItem>
                                            <MenuItem value="active">
                                                Active
                                            </MenuItem>
                                            <MenuItem value="inactive">
                                                Inactive
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Featured</InputLabel>
                                        <Select
                                            value={filters.featured || ""}
                                            label="Featured"
                                            onChange={(e) =>
                                                handleFilterChange(
                                                    "featured",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <MenuItem value="">All</MenuItem>
                                            <MenuItem value="yes">
                                                Featured
                                            </MenuItem>
                                            <MenuItem value="no">
                                                Not Featured
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Collapse>
                    </Paper>
                </Box>

                {/* Courses Grid */}
                <Grid2 container spacing={3}>
                    {courses.data.map((course) => (
                        <Grid2
                            item
                            size={{ xs: 12, sm: 6, md: 4, lg: 4 }}
                            key={course.id}
                        >
                            <Card
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    transition: "transform 0.2s",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                    },
                                }}
                            >
                                {/* Course Image */}
                                {course.image ? (
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={`/storage/${course.image}`}
                                        alt={course.title}
                                        sx={{ objectFit: "cover" }}
                                    />
                                ) : (
                                    <Box
                                        sx={{
                                            height: 200,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "grey.100",
                                            color: "text.secondary",
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            No Course Image
                                        </Typography>
                                    </Box>
                                )}

                                <CardContent sx={{ flexGrow: 1 }}>
                                    {/* Status Chips */}
                                    <Box
                                        sx={{
                                            mb: 2,
                                            display: "flex",
                                            gap: 1,
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
                                    </Box>

                                    {/* Course Title */}
                                    <Typography
                                        variant="h6"
                                        component="h2"
                                        gutterBottom
                                    >
                                        {course.title}
                                    </Typography>

                                    {/* Course Info */}
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        Instructor:{" "}
                                        {course.instructor || "Not assigned"}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        Category:{" "}
                                        {course.category || "Uncategorized"}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        Level: {course.level || "Not specified"}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Price: ฿{course.price.toLocaleString()}
                                    </Typography>
                                </CardContent>

                                <CardActions
                                    sx={{
                                        justifyContent: "space-between",

                                        p: 2,
                                    }}
                                >
                                    <Box>
                                        <Button
                                            onClick={() =>
                                                router.get(
                                                    route(
                                                        "training-courses.show",
                                                        course.slug
                                                    )
                                                )
                                            }
                                            size="small"
                                            variant="outlined"
                                        >
                                            View
                                        </Button>

                                        <Tooltip title="Edit Course">
                                            <IconButton
                                                component={Link}
                                                href={route(
                                                    "training-courses.edit",
                                                    course.slug
                                                )}
                                                color="primary"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Duplicate Course">
                                            <IconButton
                                                onClick={() =>
                                                    duplicateCourse(course.slug)
                                                }
                                                color="info"
                                            >
                                                <ContentCopyIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                    <Box>
                                        <Tooltip
                                            title={`${
                                                course.is_active
                                                    ? "Deactivate"
                                                    : "Activate"
                                            } Course`}
                                        >
                                            <IconButton
                                                onClick={() =>
                                                    toggleActive(course.slug)
                                                }
                                                color={
                                                    course.is_active
                                                        ? "error"
                                                        : "success"
                                                }
                                            >
                                                {course.is_active ? (
                                                    <VisibilityOffIcon />
                                                ) : (
                                                    <VisibilityIcon />
                                                )}
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip
                                            title={`${
                                                course.is_featured
                                                    ? "Remove from"
                                                    : "Add to"
                                            } Featured`}
                                        >
                                            <IconButton
                                                onClick={() =>
                                                    toggleFeatured(course.slug)
                                                }
                                                color="warning"
                                            >
                                                {course.is_featured ? (
                                                    <StarIcon />
                                                ) : (
                                                    <StarBorderIcon />
                                                )}
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete Course">
                                            <IconButton
                                                onClick={() =>
                                                    deleteCourse(
                                                        course.slug,
                                                        course.title
                                                    )
                                                }
                                                color="error"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </CardActions>
                            </Card>
                        </Grid2>
                    ))}

                    {/* No Results */}
                    {courses.data.length === 0 && (
                        <Paper sx={{ p: 4, textAlign: "center", mt: 4 }}>
                            <Typography variant="h6" color="text.secondary">
                                No training courses found.
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 2 }}
                            >
                                Try adjusting your search criteria or create a
                                new course.
                            </Typography>
                            <Button
                                variant="contained"
                                component={Link}
                                href={route("training-courses.create")}
                                startIcon={<AddIcon />}
                            >
                                Create First Course
                            </Button>
                        </Paper>
                    )}
                </Grid2>
            </Container>
        </AdminLayout>
    );
}
