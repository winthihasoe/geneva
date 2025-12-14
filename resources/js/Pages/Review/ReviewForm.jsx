import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Rating,
    TextField,
    Button,
    Card,
    Avatar,
    Chip,
    Alert,
    Container,
} from "@mui/material";
import { useForm, Head } from "@inertiajs/react";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Footer from "@/Components/Footer";
import AppLayout from "@/Layouts/AppLayout";

// Predefined review tags
const POSITIVE_TAGS = [
    "Arrived on time",
    "Very skillful",
    "Good hygiene",
    "Professional",
    "Patient & gentle",
    "Reliable",
    "Good communication",
];

const NEGATIVE_TAGS = [
    "Often late",
    "Lacks skills",
    "Poor hygiene",
    "Unprofessional",
    "Poor communication",
    "Impatient",
    "Unreliable",
    "Needs more training",
];

export default function ReviewForm({ patient, caregiver, existingReview }) {
    const { data, setData, post, processing, errors } = useForm({
        patient_id: patient.id,
        cv_id: caregiver.id,
        rating: existingReview?.rating || 0,
        tags: existingReview?.tags || [],
        comment: existingReview?.comment || "",
    });

    const [selectedTags, setSelectedTags] = useState(
        existingReview?.tags || []
    );
    const [showSuccess, setShowSuccess] = useState(false);

    // Get tags based on rating
    const availableTags = data.rating === 5 ? POSITIVE_TAGS : NEGATIVE_TAGS;
    const shouldShowTags = data.rating > 0;

    useEffect(() => {
        // Reset selected tags when rating changes
        if (!existingReview) {
            setSelectedTags([]);
            setData("tags", []);
        }
    }, [data.rating]);

    const handleTagToggle = (tag) => {
        const newTags = selectedTags.includes(tag)
            ? selectedTags.filter((t) => t !== tag)
            : [...selectedTags, tag];

        setSelectedTags(newTags);
        setData("tags", newTags);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("review.store"), {
            onSuccess: () => {
                setShowSuccess(true);
            },
        });
    };

    return (
        <AppLayout>
            <Box sx={{ bgcolor: "grey.100" }}>
                <Container maxWidth="md">
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            bgcolor: "grey.100",
                            minHeight: "90vh",
                            pt: { xs: 2, sm: 3, md: 4 },
                            pb: 4,
                        }}
                    >
                        <Head title="Review Caregiver" />
                        <Card sx={{ maxWidth: 700, width: "100%", p: 4 }}>
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                gutterBottom
                            >
                                {existingReview
                                    ? "Your Review"
                                    : "Review Caregiver"}
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                mb={3}
                                display="block"
                            >
                                {existingReview
                                    ? "Thank you for your feedback!"
                                    : "Please provide your feedback to help us improve our services."}
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    mb: 3,
                                    p: 2,
                                    bgcolor: "grey.50",
                                    borderRadius: 2,
                                }}
                            >
                                <Avatar
                                    src={`/storage/${caregiver.profile_photo}`}
                                    alt={caregiver.full_name}
                                    sx={{ width: 64, height: 64 }}
                                />
                                <Box>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                    >
                                        {caregiver.full_name}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        ID: {caregiver.geneva_id}
                                    </Typography>
                                </Box>
                            </Box>

                            {showSuccess && (
                                <Alert severity="success" sx={{ mb: 3 }}>
                                    Thank you! Your review has been submitted
                                    successfully.
                                </Alert>
                            )}

                            {existingReview ? (
                                <Box>
                                    <Alert severity="info" sx={{ mb: 3 }}>
                                        You have already submitted a review for
                                        this caregiver.
                                    </Alert>

                                    <Box
                                        sx={{
                                            p: { xs: 0, sm: 2, md: 3 },
                                            bgcolor: {
                                                xs: "transparent",
                                                sm: "grey.100",
                                            },
                                            borderRadius: 2,
                                        }}
                                    >
                                        <Box mb={3}>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                mb={1}
                                            >
                                                Your Rating
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1,
                                                }}
                                            >
                                                <Rating
                                                    value={
                                                        existingReview.rating
                                                    }
                                                    readOnly
                                                    size="large"
                                                />
                                                <Typography
                                                    variant="h6"
                                                    color="primary"
                                                    fontWeight="bold"
                                                >
                                                    {existingReview.rating}/5
                                                </Typography>
                                            </Box>
                                        </Box>

                                        {existingReview.tags &&
                                            existingReview.tags.length > 0 && (
                                                <Box mb={3}>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        mb={1}
                                                    >
                                                        Selected Tags
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexWrap: "wrap",
                                                            gap: 1,
                                                        }}
                                                    >
                                                        {existingReview.tags.map(
                                                            (tag, index) => (
                                                                <Chip
                                                                    key={index}
                                                                    label={tag}
                                                                    color={
                                                                        existingReview.rating ===
                                                                        5
                                                                            ? "success"
                                                                            : "warning"
                                                                    }
                                                                    icon={
                                                                        <CheckCircleIcon />
                                                                    }
                                                                    sx={{
                                                                        fontSize:
                                                                            "0.8rem",
                                                                        height: 28,
                                                                        cursor: "pointer",
                                                                    }}
                                                                    size="small"
                                                                />
                                                            )
                                                        )}
                                                    </Box>
                                                </Box>
                                            )}

                                        {existingReview.comment && (
                                            <Box>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    mb={1}
                                                >
                                                    Your Comment
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        p: 2,
                                                        bgcolor: "white",
                                                        borderRadius: 1,
                                                        border: "1px solid",
                                                        borderColor: "grey.300",
                                                        color: "text.secondary",
                                                    }}
                                                >
                                                    {existingReview.comment}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    {/* Rating Section */}
                                    <Box mb={4}>
                                        <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            mb={1}
                                        >
                                            How would you rate this caregiver? *
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2,
                                                p: 2,
                                                bgcolor:
                                                    data.rating > 0
                                                        ? "primary.50"
                                                        : "grey.50",
                                                borderRadius: 2,
                                                border: "2px solid",
                                                borderColor:
                                                    data.rating > 0
                                                        ? "primary.main"
                                                        : "grey.300",
                                            }}
                                        >
                                            <Rating
                                                value={data.rating}
                                                onChange={(e, newValue) =>
                                                    setData("rating", newValue)
                                                }
                                                size={"large"}
                                                icon={
                                                    <StarIcon
                                                        fontSize="inherit"
                                                        sx={{ fontSize: 40 }}
                                                    />
                                                }
                                                emptyIcon={
                                                    <StarIcon
                                                        fontSize="inherit"
                                                        sx={{ fontSize: 40 }}
                                                    />
                                                }
                                            />
                                            {/* {data.rating > 0 && (
                                    <Typography
                                        variant="h5"
                                        color="primary"
                                        fontWeight="bold"
                                    >
                                        {data.rating}/5
                                    </Typography>
                                )} */}
                                        </Box>
                                        {errors.rating && (
                                            <Typography
                                                variant="caption"
                                                color="error"
                                                sx={{ mt: 1, display: "block" }}
                                            >
                                                {errors.rating}
                                            </Typography>
                                        )}
                                    </Box>

                                    {/* Tags Section */}
                                    {shouldShowTags && (
                                        <Box mb={4}>
                                            <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                mb={1}
                                            >
                                                {data.rating === 5
                                                    ? "What did you like?"
                                                    : "What needs improvement?"}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                mb={2}
                                            >
                                                Select all that apply
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                    gap: 1.5,

                                                    bgcolor: "grey.50",
                                                    borderRadius: 2,
                                                }}
                                            >
                                                {availableTags.map((tag) => (
                                                    <Chip
                                                        key={tag}
                                                        label={tag}
                                                        size="small"
                                                        onClick={() =>
                                                            handleTagToggle(tag)
                                                        }
                                                        color={
                                                            selectedTags.includes(
                                                                tag
                                                            )
                                                                ? data.rating ===
                                                                  5
                                                                    ? "success"
                                                                    : "warning"
                                                                : "default"
                                                        }
                                                        variant={
                                                            selectedTags.includes(
                                                                tag
                                                            )
                                                                ? "filled"
                                                                : "outlined"
                                                        }
                                                        icon={
                                                            selectedTags.includes(
                                                                tag
                                                            ) ? (
                                                                <CheckCircleIcon />
                                                            ) : undefined
                                                        }
                                                        sx={{
                                                            fontSize: "0.8rem",
                                                            height: 28,
                                                            cursor: "pointer",
                                                            transition:
                                                                "all 0.2s",
                                                            "&:hover": {
                                                                transform:
                                                                    "scale(1.05)",
                                                            },
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                            {errors.tags && (
                                                <Typography
                                                    variant="caption"
                                                    color="error"
                                                    sx={{
                                                        mt: 1,
                                                        display: "block",
                                                    }}
                                                >
                                                    {errors.tags}
                                                </Typography>
                                            )}
                                        </Box>
                                    )}

                                    {/* Comment Section */}
                                    <Box mb={4}>
                                        <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            mb={1}
                                        >
                                            Additional Comments
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            multiline
                                            value={data.comment}
                                            onChange={(e) =>
                                                setData(
                                                    "comment",
                                                    e.target.value
                                                )
                                            }
                                            error={!!errors.comment}
                                            helperText={errors.comment}
                                            placeholder="Share more details about your experience with this caregiver..."
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    bgcolor: "white",
                                                },
                                                // change fontsize fo placeholder
                                                "& .MuiInputBase-input::placeholder":
                                                    {
                                                        fontSize: "0.9rem",
                                                        lineHeight: 1.3,
                                                    },
                                            }}
                                        />
                                    </Box>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        size="large"
                                        disabled={
                                            processing || data.rating === 0
                                        }
                                        sx={{
                                            borderRadius: 3,
                                            py: 1.5,
                                            fontSize: "1rem",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {processing
                                            ? "Submitting..."
                                            : "Submit Review"}
                                    </Button>

                                    {data.rating === 0 && (
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{
                                                mt: 1,
                                                display: "block",
                                                textAlign: "center",
                                            }}
                                        >
                                            Please select a rating to submit
                                            your review
                                        </Typography>
                                    )}
                                </form>
                            )}
                        </Card>
                    </Box>
                </Container>
            </Box>
        </AppLayout>
    );
}
