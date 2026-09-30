import React, { useState } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    Button,
    IconButton,
    FormControl,
    FormHelperText,
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
    Collapse,
} from "@mui/material";
import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Title from "@/Components/Typo/Title";
import BackButton from "@/Components/BackButton";
import CloseIcon from "@mui/icons-material/Close";
import PatientDocumentSection from "./components/PatientDocumentSection";
import UnsavedPhotosDialog from "@/Components/util/UnsavedPhotosDialog";
import Avatar from "@mui/material/Avatar";
import ReviewLinkButton from "@/Components/ReviewLinkButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditPatient from "./components/EditPatient";
import PatientBanner from "./components/PatientBanner";
import PatientDetails from "./components/PatientDetails";
import { careTypeLabel } from "@/utils/careTypeLabel";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { AssignmentNotes, PatientFeedbackNotes } from "./components/CareNotes";
import { Edit } from "@mui/icons-material";

const caregiverLevels = ["Skilled", "Advanced", "Special Nurse"];
const assignmentDurations = ["Daily", "Monthly"];
const assignmentDuties = ["Day", "Night", "24 hr"];

const caseStatusLabel = {
    open: "Open",
    cv_sent: "CV sent",
    interviewing: "Interviewing",
    confirmed: "Confirmed",
    on_duty: "On duty",
    cancelled: "Cancelled",
};

function localDateInputValue(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function dateInputValue(value) {
    if (!value) {
        return undefined;
    }
    const match = String(value).match(/^(\d{4}-\d{2}-\d{2})/);
    return match ? match[1] : undefined;
}

function AdminSinglePatient({
    patient,
    caregivers,
    currentAssignment,
    history,
    reviewedCaregiverIds = [],
    caseRecords = [],
    patientFeedbacks = [],
    documentPhotos = {
        care_plan: [],
        caregiver_agreement: [],
        caregiver_service_agreement: [],
    },
}) {
    const [showAdditionalForm, setShowAdditionalForm] = useState(false);
    const [endDialogOpen, setEndDialogOpen] = useState(false);
    const [editAssignmentOpen, setEditAssignmentOpen] = useState(false);
    const [selectedAssignmentToEdit, setSelectedAssignmentToEdit] =
        useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [publicCareLogLinkLoadingId, setPublicCareLogLinkLoadingId] =
        useState(null);
    const [publicCareLogLinkCopiedId, setPublicCareLogLinkCopiedId] =
        useState(null);
    const [publicCareLogLinkError, setPublicCareLogLinkError] = useState(null);
    const [selectedAssignmentToEnd, setSelectedAssignmentToEnd] =
        useState(null);

    const handleUpdatePatient = () => {
        setEditDialogOpen(true);
    };

    // Assignment form
    const assignmentForm = useForm({
        patient_id: patient.id,
        cv_id: "",
        start_date: "",
        end_date: "",
        assignment_reason: "", // Now it store the duty
    });

    // Additional assignment form
    const additionalAssignmentForm = useForm({
        patient_id: patient.id,
        cv_id: "",
        start_date: "",
        end_date: "",
        level: "",
        duration: "",
        assignment_reason: "",
    });

    // End assignment form. Date is chosen in the dialog; today is only the starting value.
    const endAssignmentForm = useForm({
        end_reason: "",
        end_date: localDateInputValue(),
    });

    const handleAssignCaregiver = (e) => {
        e.preventDefault();
        assignmentForm.post(route("admin.patient.caregiver.assign"), {
            onSuccess: () => {
                assignmentForm.reset();
            },
        });
    };

    const handleAssignAdditionalCaregiver = (e) => {
        e.preventDefault();
        additionalAssignmentForm.post(
            route("admin.patient.caregiver.assign.additional"),
            {
                onSuccess: () => {
                    additionalAssignmentForm.reset();
                    setShowAdditionalForm(false);
                },
            },
        );
    };

    const handleEndAssignment = () => {
        if (
            endAssignmentForm.data.end_reason.trim() &&
            endAssignmentForm.data.end_date &&
            selectedAssignmentToEnd
        ) {
            endAssignmentForm.put(
                route(
                    "admin.patient.caregiver.end",
                    selectedAssignmentToEnd.id,
                ),
                {
                    onSuccess: () => {
                        setEndDialogOpen(false);
                        setSelectedAssignmentToEnd(null);
                        endAssignmentForm.reset();
                    },
                },
            );
        }
    };

    const editAssignmentForm = useForm({
        start_date: "",
        level: "",
        duration: "",
        assignment_reason: "",
    });

    const knownOption = (value, options) =>
        options.includes(value) ? value : "";

    const openEditDialog = (assignment) => {
        setSelectedAssignmentToEdit(assignment);
        editAssignmentForm.clearErrors();
        editAssignmentForm.setData({
            start_date: dateInputValue(assignment.start_date) || "",
            level: knownOption(assignment.level, caregiverLevels),
            duration: knownOption(assignment.duration, assignmentDurations),
            assignment_reason: knownOption(
                assignment.assignment_reason,
                assignmentDuties,
            ),
        });
        setEditAssignmentOpen(true);
    };

    const handleUpdateAssignment = (e) => {
        e.preventDefault();
        if (!selectedAssignmentToEdit) {
            return;
        }

        editAssignmentForm.put(
            route(
                "admin.patient.caregiver.update",
                selectedAssignmentToEdit.id,
            ),
            {
                preserveScroll: true,
                onSuccess: () => {
                    setEditAssignmentOpen(false);
                    setSelectedAssignmentToEdit(null);
                },
            },
        );
    };

    const openEndDialog = (assignment) => {
        setSelectedAssignmentToEnd(assignment);
        endAssignmentForm.clearErrors();
        endAssignmentForm.setData({
            end_reason: "",
            end_date: localDateInputValue(),
        });
        setEndDialogOpen(true);
    };

    const handleCopyPublicCareLogLink = async (assignment) => {
        setPublicCareLogLinkError(null);
        setPublicCareLogLinkLoadingId(assignment.id);
        try {
            const { data } = await axios.post(
                route("admin.patient.public-care-log-link", {
                    patient: patient.id,
                    assignment: assignment.id,
                }),
                {},
                { headers: { Accept: "application/json" } },
            );
            await navigator.clipboard.writeText(data.url);
            setPublicCareLogLinkCopiedId(assignment.id);
            setTimeout(() => setPublicCareLogLinkCopiedId(null), 3000);
        } catch (err) {
            const message =
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Failed to create or copy the public care log link.";
            setPublicCareLogLinkError(message);
        } finally {
            setPublicCareLogLinkLoadingId(null);
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

    // Convert currentAssignment to array if it's not already
    const currentAssignments = Array.isArray(currentAssignment)
        ? currentAssignment
        : currentAssignment
          ? [currentAssignment]
          : [];

    const canAssignMore = currentAssignments.length < 3;

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
            <Container maxWidth="lg" sx={{ mb: 4, px: { xs: 0, sm: 2 } }}>
                <Head title="Patient Detail" />
                <BackButton />
                <PatientBanner patient={patient} />
                <Grid2 container spacing={2} mb={3}>
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

                            {/* Current Assignments Display */}
                            {currentAssignments.length > 0 ? (
                                <Box sx={{ mb: 3 }}>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                        sx={{ mb: 2 }}
                                    >
                                        Currently Assigned Caregivers (
                                        {currentAssignments.length}/3)
                                    </Typography>

                                    {currentAssignments.map(
                                        (assignment, index) => (
                                            <Box
                                                key={assignment.id}
                                                sx={{
                                                    mb: 2,
                                                    p: 2,
                                                    bgcolor: "background.paper",
                                                    borderRadius: 2,
                                                    border: "1px solid",
                                                    borderColor: "grey.300",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                        alignItems: "center",
                                                        mb: 1,
                                                    }}
                                                >
                                                    <Typography
                                                        variant="subtitle2"
                                                        fontWeight="bold"
                                                    >
                                                        Caregiver #{index + 1}
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            gap: 0.5,
                                                        }}
                                                    >
                                                        <IconButton
                                                            size="small"
                                                            aria-label="Edit assignment"
                                                            onClick={() =>
                                                                openEditDialog(
                                                                    assignment,
                                                                )
                                                            }
                                                            sx={{
                                                                border: "1px solid",
                                                                borderColor:
                                                                    "divider",
                                                                borderRadius: 1,
                                                            }}
                                                        >
                                                            <Edit
                                                                sx={{
                                                                    fontSize: 16,
                                                                }}
                                                            />
                                                        </IconButton>
                                                        <Chip
                                                            label="Active"
                                                            color="success"
                                                            size="small"
                                                        />
                                                    </Box>
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
                                                            assignment.caregiver
                                                                .profile_photo
                                                        }
                                                        alt={
                                                            assignment.caregiver
                                                                .full_name
                                                        }
                                                        sx={{
                                                            width: 56,
                                                            height: 56,
                                                        }}
                                                    />
                                                    <Box>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{ mb: 0.5 }}
                                                        >
                                                            <strong>
                                                                Name:
                                                            </strong>{" "}
                                                            {
                                                                assignment
                                                                    .caregiver
                                                                    .full_name
                                                            }
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{ mb: 0.5 }}
                                                        >
                                                            <strong>
                                                                Geneva ID:
                                                            </strong>{" "}
                                                            {
                                                                assignment
                                                                    .caregiver
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
                                                        assignment.start_date,
                                                    )}
                                                </Typography>
                                                {assignment.level && (
                                                    <Typography
                                                        variant="body2"
                                                        sx={{ mb: 0.5 }}
                                                    >
                                                        <strong>Level:</strong>{" "}
                                                        {assignment.level}
                                                    </Typography>
                                                )}
                                                {assignment.duration && (
                                                    <Typography
                                                        variant="body2"
                                                        sx={{ mb: 0.5 }}
                                                    >
                                                        <strong>
                                                            Duration:
                                                        </strong>{" "}
                                                        {assignment.duration}
                                                    </Typography>
                                                )}
                                                {assignment.assignment_reason && (
                                                    <Typography
                                                        variant="body2"
                                                        sx={{ mb: 0.5 }}
                                                    >
                                                        <strong>Assign:</strong>{" "}
                                                        {
                                                            assignment.assignment_reason
                                                        }
                                                    </Typography>
                                                )}
                                                <AssignmentNotes
                                                    assignmentId={assignment.id}
                                                    notes={
                                                        assignment.notes || []
                                                    }
                                                />
                                                <Box
                                                    sx={{
                                                        mt: 2,
                                                        mb: 2,
                                                        p: 2,
                                                        borderRadius: 2,
                                                        bgcolor: "primary.50",
                                                        border: "2px solid",
                                                        borderColor:
                                                            "primary.main",
                                                    }}
                                                >
                                                    <Typography
                                                        variant="subtitle2"
                                                        fontWeight="bold"
                                                        color="primary"
                                                        gutterBottom
                                                    >
                                                        Care log link
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{ mb: 2 }}
                                                    >
                                                        When duty starts, the
                                                        supervisor must send
                                                        this link to the
                                                        caregiver. They can
                                                        submit care logs without
                                                        signing in. The link
                                                        stops working when the
                                                        assignment ends.
                                                    </Typography>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="large"
                                                        fullWidth
                                                        onClick={() =>
                                                            handleCopyPublicCareLogLink(
                                                                assignment,
                                                            )
                                                        }
                                                        disabled={
                                                            publicCareLogLinkLoadingId ===
                                                            assignment.id
                                                        }
                                                        startIcon={
                                                            <ContentCopyIcon />
                                                        }
                                                        sx={{
                                                            py: 1.5,
                                                            fontWeight: 700,
                                                            fontSize: "1rem",
                                                            borderRadius: 2,
                                                            boxShadow: 3,
                                                            background:
                                                                "linear-gradient(45deg, #1565c0 30%, #42a5f5 90%)",
                                                            "&:hover": {
                                                                boxShadow: 6,
                                                                background:
                                                                    "linear-gradient(45deg, #0d47a1 30%, #1976d2 90%)",
                                                            },
                                                            "&.Mui-disabled": {
                                                                background:
                                                                    "action.disabledBackground",
                                                            },
                                                        }}
                                                    >
                                                        {publicCareLogLinkCopiedId ===
                                                        assignment.id
                                                            ? "Link copied!"
                                                            : publicCareLogLinkLoadingId ===
                                                                assignment.id
                                                              ? "Working…"
                                                              : "Copy CareLog Link"}
                                                    </Button>
                                                    {publicCareLogLinkError ? (
                                                        <Typography
                                                            variant="caption"
                                                            color="error"
                                                            display="block"
                                                            sx={{ mt: 1.5 }}
                                                        >
                                                            {
                                                                publicCareLogLinkError
                                                            }
                                                        </Typography>
                                                    ) : null}
                                                </Box>
                                                {/* Review link */}
                                                <Box sx={{ mt: 2, mb: 2 }}>
                                                    <ReviewLinkButton
                                                        patientSlug={
                                                            patient.slug
                                                        }
                                                        caregiverSlug={
                                                            assignment.caregiver
                                                                .slug
                                                        }
                                                        isReviewed={reviewedCaregiverIds.includes(
                                                            assignment.caregiver
                                                                .id,
                                                        )}
                                                    />
                                                </Box>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    size="small"
                                                    onClick={() =>
                                                        openEndDialog(
                                                            assignment,
                                                        )
                                                    }
                                                    disabled={
                                                        assignmentForm.processing
                                                    }
                                                    sx={{
                                                        mt: 2,
                                                        borderRadius: 20,
                                                    }}
                                                >
                                                    End Assignment
                                                </Button>
                                            </Box>
                                        ),
                                    )}

                                    {/* Assign More Caregiver Button */}
                                    {canAssignMore && (
                                        <Box sx={{ mt: 2 }}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<AddIcon />}
                                                onClick={() =>
                                                    setShowAdditionalForm(true)
                                                }
                                                sx={{ borderRadius: 20 }}
                                                size="small"
                                            >
                                                Assign More Caregiver
                                            </Button>
                                        </Box>
                                    )}
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
                            {/* Additional Assignment Form */}
                            <Collapse in={showAdditionalForm}>
                                <Box
                                    sx={{
                                        p: 2,
                                        mb: 3,
                                        bgcolor: "warning.50",
                                        borderRadius: 2,
                                        border: "2px solid",
                                        borderColor: "warning.main",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            mb: 2,
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            fontWeight="bold"
                                        >
                                            Assign Additional Caregiver
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                setShowAdditionalForm(false);
                                                additionalAssignmentForm.reset();
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Box>

                                    <form
                                        onSubmit={
                                            handleAssignAdditionalCaregiver
                                        }
                                    >
                                        <FormControl fullWidth sx={{ mb: 2 }}>
                                            <InputLabel>
                                                Select Additional Caregiver
                                            </InputLabel>
                                            <Select
                                                variant="standard"
                                                value={
                                                    additionalAssignmentForm
                                                        .data.cv_id
                                                }
                                                onChange={(e) =>
                                                    additionalAssignmentForm.setData(
                                                        "cv_id",
                                                        e.target.value,
                                                    )
                                                }
                                                error={
                                                    !!additionalAssignmentForm
                                                        .errors.cv_id
                                                }
                                                required
                                            >
                                                <MenuItem value="">
                                                    <em>Choose a caregiver</em>
                                                </MenuItem>
                                                {caregivers.map((caregiver) => (
                                                    <MenuItem
                                                        key={caregiver.id}
                                                        value={caregiver.id}
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
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
                                                                        caregiver.ha_id
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                        <TextField
                                            fullWidth
                                            label="Start Date"
                                            type="date"
                                            value={
                                                additionalAssignmentForm.data
                                                    .start_date
                                            }
                                            onChange={(e) =>
                                                additionalAssignmentForm.setData(
                                                    "start_date",
                                                    e.target.value,
                                                )
                                            }
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ mb: 2 }}
                                            required
                                        />

                                        <TextField
                                            fullWidth
                                            label="End Date (Optional)"
                                            type="date"
                                            value={
                                                additionalAssignmentForm.data
                                                    .end_date
                                            }
                                            onChange={(e) =>
                                                additionalAssignmentForm.setData(
                                                    "end_date",
                                                    e.target.value,
                                                )
                                            }
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ mb: 2 }}
                                        />

                                        <FormControl
                                            fullWidth
                                            sx={{ mb: 2 }}
                                            required
                                            error={
                                                !!additionalAssignmentForm
                                                    .errors.level
                                            }
                                        >
                                            <InputLabel>Level</InputLabel>
                                            <Select
                                                variant="standard"
                                                value={
                                                    additionalAssignmentForm
                                                        .data.level
                                                }
                                                onChange={(e) =>
                                                    additionalAssignmentForm.setData(
                                                        "level",
                                                        e.target.value,
                                                    )
                                                }
                                                label="Level"
                                            >
                                                <MenuItem value="">
                                                    <em>Choose a level</em>
                                                </MenuItem>
                                                {caregiverLevels.map(
                                                    (level) => (
                                                        <MenuItem
                                                            key={level}
                                                            value={level}
                                                        >
                                                            {level}
                                                        </MenuItem>
                                                    ),
                                                )}
                                            </Select>
                                            {additionalAssignmentForm.errors
                                                .level && (
                                                <FormHelperText>
                                                    {
                                                        additionalAssignmentForm
                                                            .errors.level
                                                    }
                                                </FormHelperText>
                                            )}
                                        </FormControl>

                                        <FormControl
                                            fullWidth
                                            sx={{ mb: 2 }}
                                            required
                                            error={
                                                !!additionalAssignmentForm
                                                    .errors.duration
                                            }
                                        >
                                            <InputLabel>Duration</InputLabel>
                                            <Select
                                                variant="standard"
                                                value={
                                                    additionalAssignmentForm
                                                        .data.duration
                                                }
                                                onChange={(e) =>
                                                    additionalAssignmentForm.setData(
                                                        "duration",
                                                        e.target.value,
                                                    )
                                                }
                                                label="Duration"
                                            >
                                                <MenuItem value="">
                                                    <em>Choose a duration</em>
                                                </MenuItem>
                                                {assignmentDurations.map(
                                                    (duration) => (
                                                        <MenuItem
                                                            key={duration}
                                                            value={duration}
                                                        >
                                                            {duration}
                                                        </MenuItem>
                                                    ),
                                                )}
                                            </Select>
                                            {additionalAssignmentForm.errors
                                                .duration && (
                                                <FormHelperText>
                                                    {
                                                        additionalAssignmentForm
                                                            .errors.duration
                                                    }
                                                </FormHelperText>
                                            )}
                                        </FormControl>

                                        <FormControl
                                            fullWidth
                                            sx={{ mb: 2 }}
                                            required
                                            error={
                                                !!additionalAssignmentForm
                                                    .errors.assignment_reason
                                            }
                                        >
                                            <InputLabel>Assign duty</InputLabel>
                                            <Select
                                                variant="standard"
                                                value={
                                                    additionalAssignmentForm
                                                        .data.assignment_reason
                                                }
                                                onChange={(e) =>
                                                    additionalAssignmentForm.setData(
                                                        "assignment_reason",
                                                        e.target.value,
                                                    )
                                                }
                                                label="Assign duty"
                                            >
                                                <MenuItem value="">
                                                    <em>Choose a duty</em>
                                                </MenuItem>
                                                {assignmentDuties.map(
                                                    (duty) => (
                                                        <MenuItem
                                                            key={duty}
                                                            value={duty}
                                                        >
                                                            {duty}
                                                        </MenuItem>
                                                    ),
                                                )}
                                            </Select>
                                            {additionalAssignmentForm.errors
                                                .assignment_reason && (
                                                <FormHelperText>
                                                    {
                                                        additionalAssignmentForm
                                                            .errors
                                                            .assignment_reason
                                                    }
                                                </FormHelperText>
                                            )}
                                        </FormControl>

                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            disabled={
                                                additionalAssignmentForm.processing
                                            }
                                            sx={{ borderRadius: 20 }}
                                            fullWidth
                                            size="small"
                                        >
                                            {additionalAssignmentForm.processing
                                                ? "Assigning..."
                                                : "Assign Additional Caregiver"}
                                        </Button>
                                    </form>
                                </Box>
                            </Collapse>

                            {/* Assignment History */}
                            {history && history.length > 0 && (
                                <Box>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                        sx={{ mb: 2 }}
                                    >
                                        Assignment History ({history.length})
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
                                                    assignment.start_date,
                                                )}{" "}
                                                -{" "}
                                                {formatDate(
                                                    assignment.end_date,
                                                )}
                                            </Typography>
                                            {assignment.level && (
                                                <Typography
                                                    variant="caption"
                                                    display="block"
                                                    sx={{ mb: 0.5 }}
                                                >
                                                    <strong>Level:</strong>{" "}
                                                    {assignment.level}
                                                </Typography>
                                            )}
                                            {assignment.duration && (
                                                <Typography
                                                    variant="caption"
                                                    display="block"
                                                    sx={{ mb: 0.5 }}
                                                >
                                                    <strong>Duration:</strong>{" "}
                                                    {assignment.duration}
                                                </Typography>
                                            )}
                                            {assignment.assignment_reason && (
                                                <Typography
                                                    variant="caption"
                                                    display="block"
                                                    color="error.main"
                                                    sx={{ mb: 0.5 }}
                                                >
                                                    <strong>
                                                        Assign Duty:
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
                                            <AssignmentNotes
                                                assignmentId={assignment.id}
                                                notes={assignment.notes || []}
                                            />

                                            {/* Add Review Link Button for history */}
                                            <Box sx={{ mt: 1 }}>
                                                <ReviewLinkButton
                                                    patientSlug={patient.slug}
                                                    caregiverSlug={
                                                        assignment.caregiver
                                                            .slug
                                                    }
                                                    isReviewed={reviewedCaregiverIds.includes(
                                                        assignment.caregiver.id,
                                                    )}
                                                />
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            )}

                            {/* Original Assignment Form - for first assignment or replacement */}
                            {currentAssignments.length === 0 && (
                                <form onSubmit={handleAssignCaregiver}>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                        sx={{ mt: 3 }}
                                    >
                                        Assign Caregiver
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ mb: 2, display: "block" }}
                                    >
                                        Caregivers with "Available" status will
                                        shown here.
                                    </Typography>

                                    {/* Original assignment form fields */}
                                    <FormControl fullWidth sx={{ mb: 2 }}>
                                        <InputLabel>
                                            Select Caregiver
                                        </InputLabel>
                                        <Select
                                            variant="standard"
                                            value={assignmentForm.data.cv_id}
                                            onChange={(e) =>
                                                assignmentForm.setData(
                                                    "cv_id",
                                                    e.target.value,
                                                )
                                            }
                                            error={
                                                !!assignmentForm.errors.cv_id
                                            }
                                            required
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
                                                            alignItems:
                                                                "center",
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
                                                                    caregiver.ha_id
                                                                }
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <TextField
                                        fullWidth
                                        label="Start Date"
                                        type="date"
                                        value={assignmentForm.data.start_date}
                                        onChange={(e) =>
                                            assignmentForm.setData(
                                                "start_date",
                                                e.target.value,
                                            )
                                        }
                                        InputLabelProps={{ shrink: true }}
                                        sx={{ mb: 3 }}
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
                                                e.target.value,
                                            )
                                        }
                                        InputLabelProps={{ shrink: true }}
                                        sx={{ mb: 2 }}
                                    />

                                    <TextField
                                        fullWidth
                                        label="Assign duty"
                                        multiline
                                        rows={2}
                                        value={
                                            assignmentForm.data
                                                .assignment_reason
                                        }
                                        onChange={(e) =>
                                            assignmentForm.setData(
                                                "assignment_reason",
                                                e.target.value,
                                            )
                                        }
                                        sx={{ mb: 2 }}
                                        placeholder="Live-out / Day duty"
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
                                            : "Assign Caregiver"}
                                    </Button>
                                </form>
                            )}
                        </Box>

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
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                mb={0.5}
                                fontFamily={"Roboto Slab"}
                                color="primary"
                            >
                                Feedback
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 2 }}
                            >
                                Notes from a customer service call. Label each
                                note as daily or monthly feedback, and when to
                                follow up.
                            </Typography>
                            <PatientFeedbackNotes
                                patientId={patient.id}
                                notes={patientFeedbacks}
                            />
                        </Box>

                        {/* Edit Patient Dialog */}
                        <EditPatient
                            open={editDialogOpen}
                            onClose={() => setEditDialogOpen(false)}
                            patient={patient}
                        />

                        <Dialog
                            open={editAssignmentOpen}
                            onClose={() => setEditAssignmentOpen(false)}
                            fullWidth
                            maxWidth="xs"
                            PaperProps={{
                                sx: {
                                    p: 2,
                                    bgcolor: "warning.50",
                                    borderRadius: 2,
                                    border: "2px solid",
                                    borderColor: "warning.main",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: 2,
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                >
                                    Edit Assignment
                                </Typography>
                                <IconButton
                                    size="small"
                                    aria-label="Close"
                                    onClick={() => setEditAssignmentOpen(false)}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                            {selectedAssignmentToEdit?.caregiver?.full_name && (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 2 }}
                                >
                                    {
                                        selectedAssignmentToEdit.caregiver
                                            .full_name
                                    }
                                </Typography>
                            )}
                            <form onSubmit={handleUpdateAssignment}>
                                <TextField
                                    fullWidth
                                    label="Start Date"
                                    type="date"
                                    value={editAssignmentForm.data.start_date}
                                    onChange={(e) =>
                                        editAssignmentForm.setData(
                                            "start_date",
                                            e.target.value,
                                        )
                                    }
                                    InputLabelProps={{ shrink: true }}
                                    error={
                                        !!editAssignmentForm.errors.start_date
                                    }
                                    helperText={
                                        editAssignmentForm.errors.start_date
                                    }
                                    sx={{ mb: 2 }}
                                    required
                                />

                                <FormControl
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    required
                                    error={!!editAssignmentForm.errors.level}
                                >
                                    <InputLabel>Level</InputLabel>
                                    <Select
                                        variant="standard"
                                        value={editAssignmentForm.data.level}
                                        onChange={(e) =>
                                            editAssignmentForm.setData(
                                                "level",
                                                e.target.value,
                                            )
                                        }
                                        label="Level"
                                    >
                                        <MenuItem value="">
                                            <em>Choose a level</em>
                                        </MenuItem>
                                        {caregiverLevels.map((level) => (
                                            <MenuItem key={level} value={level}>
                                                {level}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {editAssignmentForm.errors.level && (
                                        <FormHelperText>
                                            {editAssignmentForm.errors.level}
                                        </FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    required
                                    error={!!editAssignmentForm.errors.duration}
                                >
                                    <InputLabel>Duration</InputLabel>
                                    <Select
                                        variant="standard"
                                        value={editAssignmentForm.data.duration}
                                        onChange={(e) =>
                                            editAssignmentForm.setData(
                                                "duration",
                                                e.target.value,
                                            )
                                        }
                                        label="Duration"
                                    >
                                        <MenuItem value="">
                                            <em>Choose a duration</em>
                                        </MenuItem>
                                        {assignmentDurations.map((duration) => (
                                            <MenuItem
                                                key={duration}
                                                value={duration}
                                            >
                                                {duration}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {editAssignmentForm.errors.duration && (
                                        <FormHelperText>
                                            {editAssignmentForm.errors.duration}
                                        </FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    required
                                    error={
                                        !!editAssignmentForm.errors
                                            .assignment_reason
                                    }
                                >
                                    <InputLabel>Assign duty</InputLabel>
                                    <Select
                                        variant="standard"
                                        value={
                                            editAssignmentForm.data
                                                .assignment_reason
                                        }
                                        onChange={(e) =>
                                            editAssignmentForm.setData(
                                                "assignment_reason",
                                                e.target.value,
                                            )
                                        }
                                        label="Assign duty"
                                    >
                                        <MenuItem value="">
                                            <em>Choose a duty</em>
                                        </MenuItem>
                                        {assignmentDuties.map((duty) => (
                                            <MenuItem key={duty} value={duty}>
                                                {duty}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {editAssignmentForm.errors
                                        .assignment_reason && (
                                        <FormHelperText>
                                            {
                                                editAssignmentForm.errors
                                                    .assignment_reason
                                            }
                                        </FormHelperText>
                                    )}
                                </FormControl>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={editAssignmentForm.processing}
                                    sx={{ borderRadius: 20 }}
                                    fullWidth
                                    size="small"
                                >
                                    {editAssignmentForm.processing
                                        ? "Saving..."
                                        : "Save"}
                                </Button>
                            </form>
                        </Dialog>

                        {/* End Assignment Dialog */}
                        <Dialog
                            open={endDialogOpen}
                            onClose={() => setEndDialogOpen(false)}
                        >
                            <DialogTitle>End Assignment</DialogTitle>
                            <DialogContent>
                                <TextField
                                    variant="standard"
                                    margin="dense"
                                    label="End date"
                                    type="date"
                                    fullWidth
                                    required
                                    value={endAssignmentForm.data.end_date}
                                    onChange={(e) =>
                                        endAssignmentForm.setData(
                                            "end_date",
                                            e.target.value,
                                        )
                                    }
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{
                                        min: dateInputValue(
                                            selectedAssignmentToEnd?.start_date,
                                        ),
                                    }}
                                    error={!!endAssignmentForm.errors.end_date}
                                    helperText={
                                        endAssignmentForm.errors.end_date ||
                                        "Date this caregiver stopped. It can be earlier than today."
                                    }
                                    sx={{ mb: 1 }}
                                />
                                <TextField
                                    autoFocus
                                    variant="standard"
                                    margin="dense"
                                    label="Reason for ending assignment"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={endAssignmentForm.data.end_reason}
                                    onChange={(e) =>
                                        endAssignmentForm.setData(
                                            "end_reason",
                                            e.target.value,
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
                                        !endAssignmentForm.data.end_date ||
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
                        <PatientDetails
                            patient={patient}
                            onEdit={handleUpdatePatient}
                        />

                        {caseRecords.length > 0 ? (
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
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    fontFamily={"Roboto Slab"}
                                    color="primary"
                                    sx={{ mb: 2 }}
                                >
                                    Cases
                                </Typography>
                                {caseRecords.map((caseRecord) => (
                                    <Box
                                        key={caseRecord.id}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            gap: 1.5,
                                            mb: 1.5,
                                            pb: 1.5,
                                            borderBottom: "1px solid",
                                            borderColor: "divider",
                                            "&:last-of-type": {
                                                mb: 0,
                                                pb: 0,
                                                borderBottom: 0,
                                            },
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                variant="body2"
                                                fontWeight={700}
                                            >
                                                {caseRecord.inquiry_at || "-"}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                display="block"
                                            >
                                                {[
                                                    caseRecord.branch,
                                                    caseStatusLabel[
                                                        caseRecord.status
                                                    ] || caseRecord.status,
                                                    careTypeLabel(
                                                        caseRecord.care_type,
                                                    ),
                                                ]
                                                    .filter(Boolean)
                                                    .join(" · ")}
                                            </Typography>
                                        </Box>
                                        <Box
                                            component={Link}
                                            href={route(
                                                "admin.cases.edit",
                                                caseRecord.id,
                                            )}
                                            sx={{
                                                color: "primary.main",
                                                fontSize: 13,
                                                fontWeight: 600,
                                                textDecoration: "none",
                                                whiteSpace: "nowrap",
                                                "&:hover": {
                                                    textDecoration: "underline",
                                                },
                                            }}
                                        >
                                            Open case
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        ) : null}
                    </Grid2>
                </Grid2>

                <PatientDocumentSection
                    patientId={patient.id}
                    kind="care_plan"
                    title="Care Plan"
                    photos={documentPhotos.care_plan}
                />
                <PatientDocumentSection
                    patientId={patient.id}
                    kind="caregiver_agreement"
                    title="Caregiver Agreement"
                    photos={documentPhotos.caregiver_agreement}
                />
                <PatientDocumentSection
                    patientId={patient.id}
                    kind="caregiver_service_agreement"
                    title="Caregiver Service Agreement"
                    photos={documentPhotos.caregiver_service_agreement}
                />
                <UnsavedPhotosDialog />
            </Container>
        </AdminLayout>
    );
}

export default AdminSinglePatient;
