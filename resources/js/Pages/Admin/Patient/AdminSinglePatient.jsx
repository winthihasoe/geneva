import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    IconButton,
    Card,
    CardMedia,
    CardActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid2,
    Divider,
    Container,
} from "@mui/material";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Title from "@/Components/Typo/Title";
import BackButton from "@/Components/BackButton";
import CloseIcon from "@mui/icons-material/Close";
import Subtitle from "@/Components/Typo/Subtitle";
import CarePlanPhoto from "./components/CarePlanPhoto";
import NoData from "@/Components/util/NoData";
import Avatar from "@mui/material/Avatar";
import ReviewLinkButton from "@/Components/ReviewLinkButton";
import { Edit } from "@mui/icons-material";
import EditPatient from "./components/EditPatient";

function AdminSinglePatient({
    patient,
    caregivers,
    currentAssignment,
    history,
    reviewedCaregiverIds = [],
}) {
    const [previews, setPreviews] = useState([]);
    const [endDialogOpen, setEndDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const { data, setData, post, processing, reset } = useForm({
        patient_id: patient.id,
        photos: [],
    });

    const handleUpdatePatient = () => {
        setEditDialogOpen(true);
    };

    // Assignment form
    const assignmentForm = useForm({
        patient_id: patient.id,
        cv_id: "",
        start_date: "",
        end_date: "",
        assignment_reason: "",
    });

    // End assignment form
    const endAssignmentForm = useForm({
        end_reason: "",
    });

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        files.forEach((file) => {
            setData("photos", [...data.photos, file]);
            setPreviews((prev) => [...prev, URL.createObjectURL(file)]);
        });
    };

    const handleRemovePhoto = (index) => {
        const updatedPhotos = data.photos.filter((_, i) => i !== index);
        const updatedPreviews = previews.filter((_, i) => i !== index);

        setData("photos", updatedPhotos);
        setPreviews(updatedPreviews);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append("patient_id", data.patient_id);
        data.photos.forEach((photo) => {
            formData.append("photos[]", photo);
        });

        post(route("admin.carePlan.photo.upload", patient.id), {
            data: formData,
            processData: false,
            contentType: false,
            onSuccess: () => {
                reset();
                setPreviews([]);
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    const handleAssignCaregiver = (e) => {
        e.preventDefault();
        assignmentForm.post(route("admin.patient.caregiver.assign"), {
            onSuccess: () => {
                assignmentForm.reset();
            },
        });
    };

    const handleEndAssignment = () => {
        if (endAssignmentForm.data.end_reason.trim()) {
            endAssignmentForm.put(
                route("admin.patient.caregiver.end", currentAssignment.id),
                {
                    onSuccess: () => {
                        setEndDialogOpen(false);
                        endAssignmentForm.reset();
                    },
                }
            );
        }
    };

    // Helper function to format date
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    // Helper function to format value (handles dates)
    const formatValue = (key, value) => {
        if (!value) return "-";

        // Check if the key suggests it's a date field
        const dateFields = [
            "date_of_birth",
            "created_at",
            "updated_at",
            "phone_verify_at",
        ];

        if (dateFields.includes(key)) {
            return formatDate(value);
        }

        // Check if value looks like a date string (YYYY-MM-DD or ISO format)
        if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
            return formatDate(value);
        }

        return value;
    };

    if (!patient) {
        return (
            <AdminLayout>
                <Box
                    sx={{
                        maxWidth: 800,
                        margin: "auto",
                        padding: 3,
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h5">
                        Error: Patient data could not be loaded.
                    </Typography>
                </Box>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Head title="Patient Detail" />
                <BackButton />
                <Grid2 container spacing={2} mb={3} mt={1}>
                    <Grid2 item size={{ xs: 12, sm: 6 }}>
                        {/* Caregiver Assignment Section */}
                        <Box
                            sx={{
                                maxWidth: 600,
                                margin: "auto",
                                padding: 2,
                                boxShadow: 3,
                                borderRadius: 4,
                                mb: 3,
                                bgcolor: "success.50",
                            }}
                        >
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                mb={2}
                                fontFamily={"Roboto Slab"}
                                color="primary"
                            >
                                Caregiver Assignment
                            </Typography>

                            {/* Current Assignment Display */}
                            {currentAssignment ? (
                                <Box
                                    sx={{
                                        mb: 3,
                                        p: 2,
                                        bgcolor: "white",
                                        borderBottom: "1px solid",
                                        borderColor: "gray.300",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            mb: 1,
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            fontWeight="bold"
                                        >
                                            Currently Assigned
                                        </Typography>
                                        <Chip
                                            label="Active"
                                            color="success"
                                            size="small"
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 2,
                                            mb: 2,
                                        }}
                                    >
                                        <Avatar
                                            src={
                                                currentAssignment.caregiver
                                                    .profile_photo
                                            }
                                            alt={
                                                currentAssignment.caregiver
                                                    .full_name
                                            }
                                            sx={{ width: 56, height: 56 }}
                                        />
                                        <Box>
                                            <Typography
                                                variant="body2"
                                                sx={{ mb: 0.5 }}
                                            >
                                                <strong>Name:</strong>{" "}
                                                {
                                                    currentAssignment.caregiver
                                                        .full_name
                                                }
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{ mb: 0.5 }}
                                            >
                                                <strong> ID:</strong>{" "}
                                                {
                                                    currentAssignment.caregiver
                                                        .geneva_id
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        sx={{ mb: 0.5 }}
                                    >
                                        <strong>Start Date:</strong>{" "}
                                        {formatDate(
                                            currentAssignment.start_date
                                        )}
                                    </Typography>
                                    {currentAssignment.assignment_reason && (
                                        <Typography
                                            variant="body2"
                                            sx={{ mb: 0.5 }}
                                        >
                                            <strong>Reason:</strong>{" "}
                                            {
                                                currentAssignment.assignment_reason
                                            }
                                        </Typography>
                                    )}
                                    {/* Add Review Link Button */}
                                    <Box sx={{ mt: 2, mb: 2 }}>
                                        <ReviewLinkButton
                                            patientSlug={patient.slug}
                                            caregiverSlug={
                                                currentAssignment.caregiver.slug
                                            }
                                            isReviewed={reviewedCaregiverIds.includes(
                                                currentAssignment.caregiver.id
                                            )}
                                        />
                                    </Box>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={() => setEndDialogOpen(true)}
                                        disabled={assignmentForm.processing}
                                        sx={{ borderRadius: 20 }}
                                    >
                                        End Assignment
                                    </Button>
                                    {/* <Divider sx={{ my: 2 }} /> */}
                                </Box>
                            ) : (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 2 }}
                                >
                                    No caregiver currently assigned
                                </Typography>
                            )}

                            {/* Assignment History */}
                            {history && history.length > 0 && (
                                <Box>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                        sx={{ mb: 2 }}
                                    >
                                        Assignment History
                                    </Typography>
                                    {history.map((assignment) => (
                                        <Box
                                            key={assignment.id}
                                            sx={{
                                                mb: 2,
                                                p: 2,
                                                bgcolor: "grey.50",
                                                borderRadius: 2,
                                                border: "1px solid",
                                                borderColor: "grey.300",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 2,
                                                    mb: 1,
                                                }}
                                            >
                                                <Avatar
                                                    src={
                                                        assignment.caregiver
                                                            .profile_photo
                                                    }
                                                    alt={
                                                        assignment.caregiver
                                                            .full_name
                                                    }
                                                    sx={{
                                                        width: 40,
                                                        height: 40,
                                                    }}
                                                />
                                                <Box>
                                                    <Typography
                                                        variant="body2"
                                                        fontWeight="bold"
                                                    >
                                                        {
                                                            assignment.caregiver
                                                                .full_name
                                                        }
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {
                                                            assignment.caregiver
                                                                .geneva_id
                                                        }
                                                    </Typography>
                                                </Box>
                                                <Chip
                                                    label="Ended"
                                                    color="default"
                                                    size="small"
                                                    sx={{ ml: "auto" }}
                                                />
                                            </Box>
                                            <Typography
                                                variant="caption"
                                                display="block"
                                                sx={{ mb: 0.5 }}
                                            >
                                                <strong>Period:</strong>{" "}
                                                {formatDate(
                                                    assignment.start_date
                                                )}{" "}
                                                -{" "}
                                                {formatDate(
                                                    assignment.end_date
                                                )}
                                            </Typography>
                                            {assignment.assignment_reason && (
                                                <Typography
                                                    variant="caption"
                                                    display="block"
                                                    sx={{ mb: 0.5 }}
                                                >
                                                    <strong>
                                                        Assignment Reason:
                                                    </strong>{" "}
                                                    {
                                                        assignment.assignment_reason
                                                    }
                                                </Typography>
                                            )}
                                            {assignment.end_reason && (
                                                <Typography
                                                    variant="caption"
                                                    display="block"
                                                    color="error.main"
                                                >
                                                    <strong>End Reason:</strong>{" "}
                                                    {assignment.end_reason}
                                                </Typography>
                                            )}

                                            {/* Add Review Link Button for history */}
                                            <Box sx={{ mt: 1 }}>
                                                <ReviewLinkButton
                                                    patientSlug={patient.slug}
                                                    caregiverSlug={
                                                        assignment.caregiver
                                                            .slug
                                                    }
                                                    isReviewed={reviewedCaregiverIds.includes(
                                                        assignment.caregiver.id
                                                    )}
                                                />
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            )}

                            {/* Assignment Form */}
                            <form onSubmit={handleAssignCaregiver}>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                    sx={{ mb: 2, mt: 3 }}
                                >
                                    {currentAssignment
                                        ? "Assign New Caregiver (Replace Current)"
                                        : "Assign Caregiver"}
                                </Typography>

                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel>Select Caregiver</InputLabel>
                                    <Select
                                        value={assignmentForm.data.cv_id}
                                        onChange={(e) =>
                                            assignmentForm.setData(
                                                "cv_id",
                                                e.target.value
                                            )
                                        }
                                        error={!!assignmentForm.errors.cv_id}
                                        required
                                        renderValue={(selected) => {
                                            const caregiver = caregivers?.find(
                                                (c) => c.id === selected
                                            );
                                            if (!caregiver) return "";
                                            return (
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                    }}
                                                >
                                                    <Avatar
                                                        src={
                                                            caregiver.profile_photo
                                                        }
                                                        alt={
                                                            caregiver.full_name
                                                        }
                                                        sx={{
                                                            width: 32,
                                                            height: 32,
                                                        }}
                                                    />
                                                    <Typography>
                                                        {caregiver.full_name} (
                                                        {caregiver.geneva_id})
                                                    </Typography>
                                                </Box>
                                            );
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>Choose a caregiver</em>
                                        </MenuItem>
                                        {caregivers?.map((caregiver) => (
                                            <MenuItem
                                                key={caregiver.id}
                                                value={caregiver.id}
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 2,
                                                    }}
                                                >
                                                    <Avatar
                                                        src={
                                                            caregiver.profile_photo
                                                        }
                                                        alt={
                                                            caregiver.full_name
                                                        }
                                                        sx={{
                                                            width: 40,
                                                            height: 40,
                                                        }}
                                                    />
                                                    <Box>
                                                        <Typography variant="body1">
                                                            {
                                                                caregiver.full_name
                                                            }
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                        >
                                                            {
                                                                caregiver.geneva_id
                                                            }{" "}
                                                            -{" "}
                                                            {
                                                                caregiver.service_area
                                                            }
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {assignmentForm.errors.cv_id && (
                                        <Typography
                                            variant="caption"
                                            color="error"
                                        >
                                            {assignmentForm.errors.cv_id}
                                        </Typography>
                                    )}
                                </FormControl>

                                <TextField
                                    fullWidth
                                    label="Start Date"
                                    type="date"
                                    value={assignmentForm.data.start_date}
                                    onChange={(e) =>
                                        assignmentForm.setData(
                                            "start_date",
                                            e.target.value
                                        )
                                    }
                                    InputLabelProps={{ shrink: true }}
                                    error={!!assignmentForm.errors.start_date}
                                    helperText={
                                        assignmentForm.errors.start_date
                                    }
                                    sx={{ mb: 2 }}
                                    required
                                />

                                <TextField
                                    fullWidth
                                    label="End Date (Optional)"
                                    type="date"
                                    value={assignmentForm.data.end_date}
                                    onChange={(e) =>
                                        assignmentForm.setData(
                                            "end_date",
                                            e.target.value
                                        )
                                    }
                                    InputLabelProps={{ shrink: true }}
                                    error={!!assignmentForm.errors.end_date}
                                    helperText={assignmentForm.errors.end_date}
                                    sx={{ mb: 2 }}
                                />

                                <TextField
                                    fullWidth
                                    label="Reason (Optional)"
                                    multiline
                                    rows={2}
                                    value={
                                        assignmentForm.data.assignment_reason
                                    }
                                    onChange={(e) =>
                                        assignmentForm.setData(
                                            "assignment_reason",
                                            e.target.value
                                        )
                                    }
                                    error={
                                        !!assignmentForm.errors
                                            .assignment_reason
                                    }
                                    helperText={
                                        assignmentForm.errors.assignment_reason
                                    }
                                    sx={{ mb: 2 }}
                                    placeholder="e.g., Regular assignment, Replacement, etc."
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={assignmentForm.processing}
                                    sx={{ borderRadius: 20 }}
                                    fullWidth
                                >
                                    {assignmentForm.processing
                                        ? "Assigning..."
                                        : currentAssignment
                                        ? "Assign & Replace"
                                        : "Assign Caregiver"}
                                </Button>
                            </form>
                        </Box>

                        {/* Edit Patient Dialog */}
                        <EditPatient
                            open={editDialogOpen}
                            onClose={() => setEditDialogOpen(false)}
                            patient={patient}
                        />

                        {/* End Assignment Dialog */}
                        <Dialog
                            open={endDialogOpen}
                            onClose={() => setEndDialogOpen(false)}
                        >
                            <DialogTitle>End Assignment</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Reason for ending assignment"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={endAssignmentForm.data.end_reason}
                                    onChange={(e) =>
                                        endAssignmentForm.setData(
                                            "end_reason",
                                            e.target.value
                                        )
                                    }
                                    placeholder="e.g., Patient no longer needs care, caregiver requested change, etc."
                                    required
                                    error={
                                        !!endAssignmentForm.errors.end_reason
                                    }
                                    helperText={
                                        endAssignmentForm.errors.end_reason
                                    }
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    sx={{ fontSize: { xs: 12, sm: 14 } }}
                                    onClick={() => {
                                        setEndDialogOpen(false);
                                        endAssignmentForm.reset();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleEndAssignment}
                                    variant="contained"
                                    color="error"
                                    disabled={
                                        !endAssignmentForm.data.end_reason.trim() ||
                                        endAssignmentForm.processing
                                    }
                                    sx={{ fontSize: { xs: 12, sm: 14 } }}
                                >
                                    {endAssignmentForm.processing
                                        ? "Ending..."
                                        : "End Assignment"}
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Grid2>

                    <Grid2 item size={{ xs: 12, sm: 6 }}>
                        {/* Patient Detail Section  */}
                        <Box
                            sx={{
                                maxWidth: 600,
                                margin: "auto",
                                padding: 2,
                                boxShadow: 3,
                                borderRadius: 4,
                                mb: 3,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 2,
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    fontFamily={"Roboto Slab"}
                                    color="primary"
                                >
                                    Patient Details
                                </Typography>
                                <IconButton
                                    sx={{ bgcolor: "grey.300" }}
                                    size="small"
                                    onClick={handleUpdatePatient}
                                >
                                    <Edit fontSize="small" color="info" />
                                </IconButton>
                            </Box>

                            <Box>
                                {Object.entries(patient)
                                    .filter(
                                        ([key]) =>
                                            ![
                                                "id",
                                                "slug",
                                                "care_plan_photos",
                                            ].includes(key)
                                    )
                                    .map(([key, value]) => (
                                        <Box
                                            key={key}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                marginBottom: 1.5,
                                                p: { xs: 0, sm: 1 },
                                                borderBottom: "1px solid",
                                                borderColor: "divider",
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    fontWeight: "bold",
                                                    fontSize: {
                                                        xs: "0.7rem",
                                                        sm: "1rem",
                                                    },
                                                }}
                                            >
                                                {formatKey(key)}:{" "}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    fontSize: {
                                                        xs: "0.7rem",
                                                        sm: "0.9rem",
                                                    },
                                                }}
                                            >
                                                {formatValue(key, value)}
                                            </Typography>
                                        </Box>
                                    ))}
                            </Box>
                        </Box>
                    </Grid2>
                </Grid2>

                {/* Care Plan Photo Upload Section */}
                <Box
                    sx={{
                        maxWidth: 600,
                        margin: "auto",
                        mb: 3,
                    }}
                >
                    <Box textAlign={"left"} mb={2}>
                        <Button
                            size="small"
                            sx={{ borderRadius: 20 }}
                            variant="outlined"
                            component="label"
                        >
                            <Typography
                                variant="h6"
                                fontSize={{ xs: "0.8rem", sm: "1rem" }}
                                fontWeight={600}
                                color="grey.800"
                            >
                                Upload Photos
                            </Typography>
                            <input
                                type="file"
                                hidden
                                accept="image/*,.heic,.heif"
                                multiple
                                onChange={handleFileChange}
                            />
                        </Button>
                    </Box>

                    {previews.length > 0 && (
                        <Box
                            my={2}
                            sx={{
                                maxWidth: 600,
                                margin: "auto",
                                padding: 2,
                                border: "1px solid",
                                borderColor: "primary.main",
                                borderRadius: 4,
                                mb: 3,
                            }}
                        >
                            <Subtitle>Selected Photos</Subtitle>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 1,
                                    mb: 1,
                                }}
                            >
                                {previews.map((preview, index) => (
                                    <Card
                                        key={index}
                                        sx={{ width: 90, position: "relative" }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={preview}
                                            alt={`Selected photo ${index + 1}`}
                                            sx={{
                                                height: 90,
                                                objectFit: "cover",
                                            }}
                                        />
                                        <CardActions
                                            sx={{
                                                position: "absolute",
                                                top: 0,
                                                right: 0,
                                            }}
                                        >
                                            <IconButton
                                                size="small"
                                                color="error"
                                                sx={{ bgcolor: "#fff" }}
                                                onClick={() =>
                                                    handleRemovePhoto(index)
                                                }
                                            >
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                ))}
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleUpload}
                                disabled={processing}
                                sx={{
                                    borderRadius: 20,
                                    fontSize: { xs: 12, sm: 14 },
                                }}
                            >
                                {processing ? "Uploading..." : "Save Photos"}
                            </Button>
                        </Box>
                    )}
                </Box>

                {/* Care Plan Photos Section */}
                <Box
                    sx={{
                        maxWidth: 600,
                        margin: "auto",
                        padding: 2,
                        border: "1px solid",
                        borderColor: "primary.main",
                        borderRadius: 4,
                        mb: 3,
                    }}
                >
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        mb={2}
                        fontFamily={"Roboto Slab"}
                        color="primary"
                    >
                        Uploaded Care Plans
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            gap: 1,
                        }}
                    >
                        {patient?.care_plan_photos.length > 0 ? (
                            patient.care_plan_photos.map((item, index) => (
                                <CarePlanPhoto key={index} photo={item} />
                            ))
                        ) : (
                            <NoData />
                        )}
                    </Box>
                </Box>
            </Container>
        </AdminLayout>
    );
}

function formatKey(key) {
    return key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default AdminSinglePatient;
