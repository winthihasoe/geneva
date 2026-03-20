import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Rating,
    Avatar,
    Chip,
    Button,
    TextField,
    Grid2 as Grid,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Pagination,
    FormControl,
    InputLabel,
    Select,
    Paper,
} from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import BlockIcon from "@mui/icons-material/Block";
import ClearIcon from "@mui/icons-material/Clear";

function AdminReviews({ reviews, stats, filters = {} }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || "");
    const [filterStatus, setFilterStatus] = useState(filters.status || "all");
    const [filterRating, setFilterRating] = useState(filters.rating || "all");
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedReview, setSelectedReview] = useState(null);

    console.log("reviews", reviews);
    console.log("stats", stats);

    const handleMenuOpen = (event, review) => {
        setAnchorEl(event.currentTarget);
        setSelectedReview(review);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedReview(null);
    };

    const handleApprove = (reviewId) => {
        router.post(route("admin.review.approve", reviewId));
        handleMenuClose();
    };

    const handleReject = (reviewId) => {
        router.post(route("admin.review.reject", reviewId));
        handleMenuClose();
    };

    const handleDelete = (reviewId) => {
        if (confirm("Are you sure you want to delete this review?")) {
            router.delete(route("admin.review.delete", reviewId));
        }
        handleMenuClose();
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("admin.reviews"),
            {
                search: searchTerm,
                rating: filterRating !== "all" ? filterRating : undefined,
                status: filterStatus !== "all" ? filterStatus : undefined,
            },
            {
                preserveState: true,
            },
        );
    };

    const handleFilterChange = () => {
        router.get(
            route("admin.reviews"),
            {
                search: searchTerm || undefined,
                status: filterStatus !== "all" ? filterStatus : undefined,
                rating: filterRating !== "all" ? filterRating : undefined,
            },
            {
                preserveState: true,
            },
        );
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "approved":
                return "success";
            case "pending":
                return "warning";
            case "rejected":
                return "error";
            default:
                return "default";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "approved":
                return <CheckCircleIcon fontSize="small" />;
            case "pending":
                return <PendingIcon fontSize="small" />;
            case "rejected":
                return <BlockIcon fontSize="small" />;
            default:
                return null;
        }
    };

    return (
        <AdminLayout>
            <Head title="Reviews Management" />
            <Container maxWidth="lg" sx={{ pb: 4, px: { xs: 0 } }}>
                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 4,
                    }}
                >
                    <Typography
                        variant="h4"
                        color="primary"
                        fontFamily="Roboto Slab"
                        fontWeight="bold"
                    >
                        Customer Reviews
                    </Typography>
                </Box>

                {/* Search and Filters */}
                <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                            <form onSubmit={handleSearch}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Search by Patient's name..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    InputProps={{
                                        startAdornment: (
                                            <SearchIcon sx={{ mr: 1 }} />
                                        ),
                                        endAdornment: searchTerm && (
                                            <IconButton
                                                size="small"
                                                onClick={() => {
                                                    setSearchTerm("");
                                                    router.get(
                                                        route("admin.reviews"),
                                                        {
                                                            rating:
                                                                filterRating !==
                                                                "all"
                                                                    ? filterRating
                                                                    : undefined,
                                                            status:
                                                                filterStatus !==
                                                                "all"
                                                                    ? filterStatus
                                                                    : undefined,
                                                        },
                                                        {
                                                            preserveState: true,
                                                        },
                                                    );
                                                }}
                                            >
                                                <ClearIcon fontSize="small" />
                                            </IconButton>
                                        ),
                                    }}
                                />
                            </form>
                        </Grid>

                        <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Rating</InputLabel>
                                <Select
                                    variant="standard"
                                    value={filterRating}
                                    label="Rating"
                                    onChange={(e) =>
                                        setFilterRating(e.target.value)
                                    }
                                >
                                    <MenuItem value="all">All Ratings</MenuItem>
                                    <MenuItem value="5">5 Stars</MenuItem>
                                    <MenuItem value="4">4 Stars</MenuItem>
                                    <MenuItem value="3">3 Stars</MenuItem>
                                    <MenuItem value="2">2 Stars</MenuItem>
                                    <MenuItem value="1">1 Star</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item size={{ xs: 12, sm: 12, md: 4 }}>
                            <Button
                                fullWidth
                                size="small"
                                variant="outlined"
                                onClick={handleFilterChange}
                                startIcon={<FilterListIcon />}
                                sx={{
                                    fontFamily: "Roboto Slab",
                                }}
                            >
                                Apply
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Reviews List */}
                <Box sx={{ mb: 3 }}>
                    {reviews?.data?.length > 0 ? (
                        reviews.data.map((review) => (
                            <Card
                                key={review.id}
                                sx={{ mb: 2, position: "relative" }}
                                elevation={2}
                            >
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "flex-start",
                                            mb: 2,
                                        }}
                                    >
                                        <Box sx={{ display: "flex", gap: 2 }}>
                                            <Avatar
                                                src={review.patient?.avatar}
                                                alt={
                                                    review.patient
                                                        ? review.patient
                                                              .first_name +
                                                          (review.patient
                                                              .last_name
                                                              ? " " +
                                                                review.patient
                                                                    .last_name
                                                              : "")
                                                        : "Anonymous"
                                                }
                                                onClick={() =>
                                                    router.get(
                                                        route(
                                                            "admin.patient",
                                                            review.patient.id,
                                                        ),
                                                    )
                                                }
                                                sx={{ cursor: "pointer" }}
                                            >
                                                <PersonIcon />
                                            </Avatar>
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    fontWeight="bold"
                                                    onClick={() =>
                                                        router.get(
                                                            route(
                                                                "admin.patient",
                                                                review.patient
                                                                    .id,
                                                            ),
                                                        )
                                                    }
                                                    sx={{
                                                        cursor: "pointer",
                                                        fontSize: {
                                                            xs: "1rem",
                                                            sm: "1rem",
                                                        },
                                                    }}
                                                >
                                                    {review?.patient
                                                        ? review.patient
                                                              .first_name +
                                                          (review.patient
                                                              .last_name
                                                              ? " " +
                                                                review.patient
                                                                    .last_name
                                                              : "")
                                                        : "Anonymous"}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mb: 1,
                                                    }}
                                                >
                                                    <Rating
                                                        value={review.rating}
                                                        readOnly
                                                        size="small"
                                                    />
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        <CalendarTodayIcon
                                                            sx={{
                                                                fontSize: 14,
                                                                mr: 0.5,
                                                            }}
                                                        />
                                                        {new Date(
                                                            review.created_at,
                                                        ).toLocaleDateString()}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        {/* <IconButton
                                            onClick={(e) =>
                                                handleMenuOpen(e, review)
                                            }
                                        >
                                            <MoreVertIcon />
                                        </IconButton> */}
                                    </Box>
                                    <Divider sx={{ my: 2 }} />
                                    {/* show review.tags here if any  */}
                                    {review.tags?.length > 0 && (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: 1,
                                                my: 2,
                                            }}
                                        >
                                            {review.tags.map((tag) => (
                                                <Chip
                                                    key={tag.id}
                                                    label={
                                                        <Typography
                                                            fontSize={{
                                                                xs: "0.7rem",
                                                                sm: "0.9rem",
                                                                md: "0.9rem",
                                                            }}
                                                        >
                                                            {tag}
                                                        </Typography>
                                                    }
                                                    size="small"
                                                />
                                            ))}
                                        </Box>
                                    )}
                                    {review.comment && (
                                        <Typography
                                            variant="body2"
                                            sx={{ mb: 2 }}
                                            color="text.primary"
                                            fontSize={{
                                                xs: "0.8rem",
                                                sm: "0.9rem",
                                            }}
                                        >
                                            "{review.comment}"
                                        </Typography>
                                    )}
                                    {review.cv && (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                                p: 1,
                                                bgcolor: "background.paper",
                                                borderRadius: 1,
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                Review for:
                                            </Typography>
                                            <Chip
                                                label={review.cv?.full_name}
                                                size="small"
                                                variant="outlined"
                                                onClick={() =>
                                                    router.get(
                                                        route(
                                                            "admin.cv.single",
                                                            review.cv.id,
                                                        ),
                                                    )
                                                }
                                            />
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Paper
                            sx={{
                                p: 4,
                                textAlign: "center",
                                bgcolor: "background.paper",
                            }}
                        >
                            <Typography
                                variant="h6"
                                color="text.secondary"
                                mb={1}
                            >
                                No reviews found
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Reviews will appear here once submitted
                            </Typography>
                        </Paper>
                    )}
                </Box>

                {/* Pagination */}
                {reviews?.last_page > 1 && (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Pagination
                            count={reviews.last_page}
                            page={reviews.current_page}
                            onChange={(e, page) =>
                                router.get(route("admin.reviews"), {
                                    page,
                                    search: searchTerm || undefined,
                                    rating:
                                        filterRating !== "all"
                                            ? filterRating
                                            : undefined,
                                    status:
                                        filterStatus !== "all"
                                            ? filterStatus
                                            : undefined,
                                })
                            }
                            color="primary"
                        />
                    </Box>
                )}

                {/* Action Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    {selectedReview?.status !== "approved" && (
                        <MenuItem
                            onClick={() => handleApprove(selectedReview?.id)}
                        >
                            <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
                            Approve
                        </MenuItem>
                    )}
                    {selectedReview?.status !== "rejected" && (
                        <MenuItem
                            onClick={() => handleReject(selectedReview?.id)}
                        >
                            <BlockIcon fontSize="small" sx={{ mr: 1 }} />
                            Reject
                        </MenuItem>
                    )}
                    <Divider />
                    <MenuItem
                        onClick={() => handleDelete(selectedReview?.id)}
                        sx={{ color: "error.main" }}
                    >
                        Delete
                    </MenuItem>
                </Menu>
            </Container>
        </AdminLayout>
    );
}

export default AdminReviews;
