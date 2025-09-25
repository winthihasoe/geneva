import React, { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid2,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Paper,
    Chip,
    IconButton,
    Alert,
} from "@mui/material";
import {
    ArrowBack as ArrowBackIcon,
    Save as SaveIcon,
    Cancel as CancelIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
} from "@mui/icons-material";
import { Link, useForm } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function AdminCreateTrainingCourse({
    categories,
    levels,
    languages,
    daysOfWeek,
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        instructor: "",
        category: "",
        price: 0,
        duration: "",
        is_featured: false,
        is_active: true,
        start_date: "",
        end_date: "",
        daily_start_time: "",
        daily_end_time: "",
        schedule_days: [],
        image: null,
        video_url: "",
        level: "",
        language: "English",
        certificate_url: "",
        order: 0,
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [selectedDays, setSelectedDays] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (key === "schedule_days") {
                formData.append(key, JSON.stringify(selectedDays));
            } else if (key === "image" && data[key]) {
                formData.append(key, data[key]);
            } else if (data[key] !== null && data[key] !== "") {
                formData.append(key, data[key]);
            }
        });

        post(route("training-courses.store"), {
            data: formData,
            forceFormData: true,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleDayToggle = (day) => {
        const updatedDays = selectedDays.includes(day)
            ? selectedDays.filter((d) => d !== day)
            : [...selectedDays, day];
        setSelectedDays(updatedDays);
        setData("schedule_days", updatedDays);
    };

    const formatDuration = (minutes) => {
        if (!minutes) return "";
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    return (
        <AdminLayout>
            <Head title="Create Training Course" />

            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ mb: 4 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mb: 2,
                        }}
                    >
                        <IconButton
                            component={Link}
                            href={route("admin.training-courses.index")}
                            color="primary"
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h4" component="h1">
                            Create Training Course
                        </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                        Fill out the form below to create a new training course.
                    </Typography>
                </Box>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <Grid2 container spacing={3}>
                        {/* Basic Information */}
                        <Grid2 item size={{ xs: 12, sm: 12, md: 6 }}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Basic Information
                                    </Typography>

                                    <Grid2 container spacing={3}>
                                        <Grid2 item size={{ xs: 12, sm: 12 }}>
                                            <Typography variant="subtitle1">
                                                Course Title
                                            </Typography>
                                            <TextField
                                                variant="filled"
                                                fullWidth
                                                value={data.title}
                                                onChange={(e) =>
                                                    setData(
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                                error={!!errors.title}
                                                helperText={errors.title}
                                                required
                                            />
                                        </Grid2>

                                        <Grid2 item size={{ xs: 12, sm: 12 }}>
                                            <Typography variant="subtitle1">
                                                Course Description
                                            </Typography>
                                            <TextField
                                                variant="filled"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                value={data.description}
                                                onChange={(e) =>
                                                    setData(
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                error={!!errors.description}
                                                helperText={errors.description}
                                            />
                                        </Grid2>

                                        <Grid2 item size={{ xs: 12, sm: 12 }}>
                                            <Typography variant="subtitle1">
                                                Instructor
                                            </Typography>
                                            <TextField
                                                variant="filled"
                                                fullWidth
                                                value={data.instructor}
                                                onChange={(e) =>
                                                    setData(
                                                        "instructor",
                                                        e.target.value
                                                    )
                                                }
                                                error={!!errors.instructor}
                                                helperText={errors.instructor}
                                            />
                                        </Grid2>

                                        <Grid2 item size={{ xs: 12, sm: 12 }}>
                                            <Typography variant="subtitle1">
                                                Category
                                            </Typography>
                                            <TextField
                                                variant="filled"
                                                fullWidth
                                                value={data.category}
                                                onChange={(e) =>
                                                    setData(
                                                        "category",
                                                        e.target.value
                                                    )
                                                }
                                                error={!!errors.category}
                                                helperText={errors.category}
                                            />
                                        </Grid2>

                                        <Grid2
                                            item
                                            size={{ xs: 12, sm: 12, md: 6 }}
                                        >
                                            <FormControl fullWidth>
                                                <InputLabel>Level</InputLabel>
                                                <Select
                                                    value={data.level}
                                                    label="Level"
                                                    onChange={(e) =>
                                                        setData(
                                                            "level",
                                                            e.target.value
                                                        )
                                                    }
                                                    error={!!errors.level}
                                                >
                                                    <MenuItem value="">
                                                        Select Level
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
                                        </Grid2>

                                        <Grid2
                                            item
                                            size={{ xs: 12, sm: 12, md: 6 }}
                                        >
                                            <FormControl fullWidth>
                                                <InputLabel>
                                                    Language
                                                </InputLabel>
                                                <Select
                                                    value={data.language}
                                                    label="Language"
                                                    onChange={(e) =>
                                                        setData(
                                                            "language",
                                                            e.target.value
                                                        )
                                                    }
                                                    error={!!errors.language}
                                                >
                                                    {languages.map(
                                                        (language) => (
                                                            <MenuItem
                                                                key={language}
                                                                value={language}
                                                            >
                                                                {language}
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </Grid2>
                                    </Grid2>
                                </CardContent>
                            </Card>
                        </Grid2>

                        {/* Media */}
                        <Grid2
                            item
                            size={{ xs: 12, sm: 12, md: 6 }}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                            }}
                        >
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Media & Links
                                    </Typography>

                                    <Grid2 container spacing={3}>
                                        <Grid2 item size={{ xs: 12, sm: 12 }}>
                                            <Box>
                                                <Typography
                                                    variant="subtitle2"
                                                    gutterBottom
                                                >
                                                    Course Image
                                                </Typography>
                                                <input
                                                    accept="image/*"
                                                    type="file"
                                                    onChange={handleImageChange}
                                                    style={{
                                                        marginBottom: "1rem",
                                                    }}
                                                />
                                                {imagePreview && (
                                                    <Box sx={{ mt: 2 }}>
                                                        <img
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            style={{
                                                                maxWidth:
                                                                    "100%",
                                                                maxHeight: 200,
                                                                borderRadius: 8,
                                                            }}
                                                        />
                                                    </Box>
                                                )}
                                                {errors.image && (
                                                    <Typography
                                                        variant="caption"
                                                        color="error"
                                                    >
                                                        {errors.image}
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Grid2>

                                        <Grid2 item size={{ xs: 12, sm: 12 }}>
                                            <TextField
                                                variant="filled"
                                                fullWidth
                                                label="Video URL"
                                                value={data.video_url}
                                                onChange={(e) =>
                                                    setData(
                                                        "video_url",
                                                        e.target.value
                                                    )
                                                }
                                                error={!!errors.video_url}
                                                helperText={
                                                    errors.video_url ||
                                                    "YouTube, Vimeo, or direct video link"
                                                }
                                                sx={{ mb: 2 }}
                                            />

                                            <TextField
                                                variant="filled"
                                                fullWidth
                                                label="Certificate URL"
                                                value={data.certificate_url}
                                                onChange={(e) =>
                                                    setData(
                                                        "certificate_url",
                                                        e.target.value
                                                    )
                                                }
                                                error={!!errors.certificate_url}
                                                helperText={
                                                    errors.certificate_url ||
                                                    "Link to course completion certificate"
                                                }
                                            />
                                        </Grid2>
                                    </Grid2>
                                </CardContent>
                            </Card>

                            {/* Pricing & Duration */}
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Pricing & Duration
                                    </Typography>

                                    <Grid2 container spacing={3}>
                                        <Grid2 item size={{ xs: 12, sm: 12 }}>
                                            <TextField
                                                fullWidth
                                                type="number"
                                                value={data.price}
                                                onChange={(e) =>
                                                    setData(
                                                        "price",
                                                        parseInt(
                                                            e.target.value
                                                        ) || 0
                                                    )
                                                }
                                                error={!!errors.price}
                                                helperText={errors.price}
                                                inputProps={{ min: 0 }}
                                                InputProps={{
                                                    endAdornment: (
                                                        <Typography>
                                                            THB
                                                        </Typography>
                                                    ),
                                                }}
                                                variant="filled"
                                            />
                                        </Grid2>

                                        <Grid2 item size={{ xs: 12, sm: 12 }}>
                                            <TextField
                                                fullWidth
                                                label="Duration (minutes)"
                                                type="number"
                                                value={data.duration}
                                                onChange={(e) =>
                                                    setData(
                                                        "duration",
                                                        parseInt(
                                                            e.target.value
                                                        ) || ""
                                                    )
                                                }
                                                error={!!errors.duration}
                                                helperText={
                                                    errors.duration ||
                                                    (data.duration
                                                        ? `≈ ${formatDuration(
                                                              data.duration
                                                          )}`
                                                        : "")
                                                }
                                                inputProps={{ min: 1 }}
                                                variant="filled"
                                            />
                                        </Grid2>
                                    </Grid2>
                                </CardContent>
                            </Card>
                        </Grid2>

                        {/* Schedule */}
                        <Grid2 item size={{ xs: 12, sm: 12 }} md={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Schedule
                                    </Typography>

                                    <Grid2 container spacing={3}>
                                        <Grid2
                                            item
                                            size={{ xs: 12, sm: 12, md: 6 }}
                                        >
                                            <Typography variant="body2">
                                                Start Date
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                type="date"
                                                value={data.start_date}
                                                onChange={(e) =>
                                                    setData(
                                                        "start_date",
                                                        e.target.value
                                                    )
                                                }
                                                error={!!errors.start_date}
                                                helperText={errors.start_date}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="filled"
                                            />
                                        </Grid2>

                                        <Grid2
                                            item
                                            size={{ xs: 12, sm: 12, md: 6 }}
                                        >
                                            <Typography variant="body2">
                                                End Date
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                type="date"
                                                value={data.end_date}
                                                onChange={(e) =>
                                                    setData(
                                                        "end_date",
                                                        e.target.value
                                                    )
                                                }
                                                error={!!errors.end_date}
                                                helperText={errors.end_date}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="filled"
                                            />
                                        </Grid2>

                                        <Grid2
                                            item
                                            size={{ xs: 12, sm: 12, md: 6 }}
                                        >
                                            <Typography variant="body2">
                                                Daily Start Time
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                type="time"
                                                value={data.daily_start_time}
                                                onChange={(e) =>
                                                    setData(
                                                        "daily_start_time",
                                                        e.target.value
                                                    )
                                                }
                                                error={
                                                    !!errors.daily_start_time
                                                }
                                                helperText={
                                                    errors.daily_start_time
                                                }
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="filled"
                                            />
                                        </Grid2>

                                        <Grid2
                                            item
                                            size={{ xs: 12, sm: 12, md: 6 }}
                                        >
                                            <Typography variant="body2">
                                                Daily End Time
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                type="time"
                                                value={data.daily_end_time}
                                                onChange={(e) =>
                                                    setData(
                                                        "daily_end_time",
                                                        e.target.value
                                                    )
                                                }
                                                error={!!errors.daily_end_time}
                                                helperText={
                                                    errors.daily_end_time
                                                }
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="filled"
                                            />
                                        </Grid2>

                                        <Grid2 item size={{ xs: 12, sm: 12 }}>
                                            <FormLabel component="legend">
                                                Schedule Days
                                            </FormLabel>
                                            <Box sx={{ mt: 1 }}>
                                                {daysOfWeek.map((day) => (
                                                    <Chip
                                                        key={day}
                                                        label={day}
                                                        onClick={() =>
                                                            handleDayToggle(day)
                                                        }
                                                        color={
                                                            selectedDays.includes(
                                                                day
                                                            )
                                                                ? "primary"
                                                                : "default"
                                                        }
                                                        variant={
                                                            selectedDays.includes(
                                                                day
                                                            )
                                                                ? "filled"
                                                                : "outlined"
                                                        }
                                                        sx={{ mr: 1, mb: 1 }}
                                                    />
                                                ))}
                                            </Box>
                                            {errors.schedule_days && (
                                                <Typography
                                                    variant="caption"
                                                    color="error"
                                                >
                                                    {errors.schedule_days}
                                                </Typography>
                                            )}
                                        </Grid2>
                                    </Grid2>
                                </CardContent>
                            </Card>
                        </Grid2>

                        {/* Settings */}
                        <Grid2 item size={{ xs: 12, sm: 12 }}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Course Settings
                                    </Typography>

                                    <FormGroup row>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={data.is_active}
                                                    onChange={(e) =>
                                                        setData(
                                                            "is_active",
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            }
                                            label="Active (visible to users)"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={data.is_featured}
                                                    onChange={(e) =>
                                                        setData(
                                                            "is_featured",
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            }
                                            label="Featured (highlighted course)"
                                        />
                                    </FormGroup>
                                </CardContent>
                            </Card>
                        </Grid2>

                        {/* Form Actions */}
                        <Grid2 item size={{ xs: 12, sm: 12 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    component={Link}
                                    href={route("admin.training-courses.index")}
                                    startIcon={<CancelIcon />}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={processing}
                                    startIcon={<SaveIcon />}
                                >
                                    {processing
                                        ? "Creating..."
                                        : "Create Course"}
                                </Button>
                            </Box>
                        </Grid2>
                    </Grid2>
                </form>
            </Container>
        </AdminLayout>
    );
}
