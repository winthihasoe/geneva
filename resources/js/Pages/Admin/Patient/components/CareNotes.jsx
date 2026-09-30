import { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export function AssignmentNotes({ assignmentId, notes = [] }) {
    const form = useForm({
        kind: "feedback",
        body: "",
    });
    const [pendingDelete, setPendingDelete] = useState(null);

    const save = (event) => {
        event.preventDefault();
        form.post(route("admin.patient.caregiver.notes.store", assignmentId), {
            preserveScroll: true,
            onSuccess: () => form.reset("body"),
        });
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                Feedback or complaint
            </Typography>
            <NoteList
                notes={notes}
                emptyText="No feedback or complaint for this caregiver yet."
                onDelete={setPendingDelete}
            />
            <Box component="form" onSubmit={save} sx={{ mt: 1.5 }}>
                <ToggleButtonGroup
                    exclusive
                    size="small"
                    value={form.data.kind}
                    onChange={(_, value) => {
                        if (value) {
                            form.setData("kind", value);
                        }
                    }}
                    sx={{ mb: 1.5 }}
                >
                    <ToggleButton value="feedback">Feedback</ToggleButton>
                    <ToggleButton value="complaint">Complaint</ToggleButton>
                </ToggleButtonGroup>
                <TextField
                    fullWidth
                    placeholder="Write feedback or a complaint about this caregiver"
                    multiline
                    minRows={3}
                    value={form.data.body}
                    onChange={(event) =>
                        form.setData("body", event.target.value)
                    }
                    error={!!form.errors.body || !!form.errors.kind}
                    helperText={form.errors.body || form.errors.kind}
                />
                <Button
                    type="submit"
                    variant="outlined"
                    size="small"
                    disabled={form.processing || !form.data.body.trim()}
                    sx={{ mt: 1, borderRadius: 20 }}
                >
                    {form.processing ? "Saving..." : "Save"}
                </Button>
            </Box>
            <DeleteNoteDialog
                note={pendingDelete}
                onClose={() => setPendingDelete(null)}
                onConfirm={() => {
                    router.delete(
                        route(
                            "admin.patient.caregiver.notes.destroy",
                            pendingDelete.id,
                        ),
                        {
                            preserveScroll: true,
                            onFinish: () => setPendingDelete(null),
                        },
                    );
                }}
            />
        </Box>
    );
}

const FEEDBACK_FOLLOW_UPS = {
    daily: [
        { value: "after_1_duty", label: "After 1 duty" },
        {
            value: "one_day_before_completion",
            label: "1 day before duty completion",
        },
        { value: "after_duty_finished", label: "After duty is finished" },
    ],
    monthly: [
        { value: "after_1_duty", label: "After 1 duty" },
        {
            value: "three_days_before_month",
            label: "3 days before 1 month",
        },
        { value: "after_duty_finished", label: "After duty is finished" },
    ],
};

export function PatientFeedbackNotes({ patientId, notes = [] }) {
    const form = useForm({
        feedback_type: "",
        follow_up: "",
        body: "",
    });
    const [pendingDelete, setPendingDelete] = useState(null);
    const followUps = FEEDBACK_FOLLOW_UPS[form.data.feedback_type] ?? [];

    const save = (event) => {
        event.preventDefault();
        form.post(route("admin.patient.feedbacks.store", patientId), {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    };

    return (
        <Box>
            <NoteList
                notes={notes.map((note) => ({ ...note, kind: "feedback" }))}
                emptyText="No feedback yet."
                onDelete={setPendingDelete}
            />
            <Box component="form" onSubmit={save} sx={{ mt: 1.5 }}>
                <ToggleButtonGroup
                    exclusive
                    size="small"
                    value={form.data.feedback_type || null}
                    onChange={(_, value) => {
                        if (!value) {
                            return;
                        }
                        const stillValid = (
                            FEEDBACK_FOLLOW_UPS[value] ?? []
                        ).some((option) => option.value === form.data.follow_up);
                        form.setData({
                            ...form.data,
                            feedback_type: value,
                            follow_up: stillValid ? form.data.follow_up : "",
                        });
                    }}
                    sx={{ mb: 1.5 }}
                >
                    <ToggleButton value="daily">Daily feedback</ToggleButton>
                    <ToggleButton value="monthly">Monthly feedback</ToggleButton>
                </ToggleButtonGroup>
                {form.errors.feedback_type && (
                    <Typography
                        variant="caption"
                        color="error"
                        display="block"
                        sx={{ mb: 1 }}
                    >
                        {form.errors.feedback_type}
                    </Typography>
                )}
                <FormControl
                    fullWidth
                    size="small"
                    disabled={!form.data.feedback_type}
                    error={!!form.errors.follow_up}
                    sx={{ mb: 1.5 }}
                >
                    <InputLabel id="patient-feedback-follow-up">
                        Follow up
                    </InputLabel>
                    <Select
                        labelId="patient-feedback-follow-up"
                        label="Follow up"
                        value={form.data.follow_up}
                        onChange={(event) =>
                            form.setData("follow_up", event.target.value)
                        }
                    >
                        {followUps.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {form.errors.follow_up && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                            {form.errors.follow_up}
                        </Typography>
                    )}
                </FormControl>
                <TextField
                    fullWidth
                    label=""
                    placeholder="Continue the duty, or any other feedback from the patient"
                    multiline
                    minRows={3}
                    value={form.data.body}
                    onChange={(event) =>
                        form.setData("body", event.target.value)
                    }
                    error={!!form.errors.body}
                    helperText={form.errors.body}
                />
                <Button
                    type="submit"
                    variant="outlined"
                    size="small"
                    disabled={
                        form.processing ||
                        !form.data.feedback_type ||
                        !form.data.follow_up ||
                        !form.data.body.trim()
                    }
                    sx={{ mt: 1, borderRadius: 20 }}
                >
                    {form.processing ? "Saving..." : "Save feedback"}
                </Button>
            </Box>
            <DeleteNoteDialog
                note={pendingDelete}
                onClose={() => setPendingDelete(null)}
                onConfirm={() => {
                    router.delete(
                        route(
                            "admin.patient.feedbacks.destroy",
                            pendingDelete.id,
                        ),
                        {
                            preserveScroll: true,
                            onFinish: () => setPendingDelete(null),
                        },
                    );
                }}
            />
        </Box>
    );
}

function NoteList({ notes, emptyText, onDelete }) {
    if (notes.length === 0) {
        return (
            <Typography variant="body2" color="text.secondary">
                {emptyText}
            </Typography>
        );
    }

    return notes.map((note) => (
        <Box
            key={note.id}
            sx={{
                mb: 1,
                p: 1.5,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.default",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.75,
                        flexWrap: "wrap",
                    }}
                >
                    <Chip
                        size="small"
                        label={
                            note.feedback_type_label ||
                            (note.kind === "complaint" ? "Complaint" : "Feedback")
                        }
                        color={note.kind === "complaint" ? "warning" : "primary"}
                        variant="outlined"
                    />
                    {note.follow_up_label && (
                        <Chip
                            size="small"
                            label={note.follow_up_label}
                            variant="outlined"
                        />
                    )}
                </Box>
                <IconButton
                    size="small"
                    aria-label={`Delete ${note.kind === "complaint" ? "complaint" : "feedback"}`}
                    onClick={() => onDelete(note)}
                >
                    <DeleteOutlineIcon fontSize="small" />
                </IconButton>
            </Box>
            <Typography variant="body2" sx={{ mt: 1, whiteSpace: "pre-wrap" }}>
                {note.body}
            </Typography>
            <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mt: 0.5 }}
            >
                {[note.staff_name, note.recorded_at]
                    .filter(Boolean)
                    .join(" · ")}
            </Typography>
        </Box>
    ));
}

function DeleteNoteDialog({ note, onClose, onConfirm }) {
    const label = note?.kind === "complaint" ? "complaint" : "feedback";

    return (
        <Dialog open={Boolean(note)} onClose={onClose}>
            <DialogTitle>Delete this {label}?</DialogTitle>
            <DialogContent>
                <Typography variant="body2">
                    This removes the saved {label}. This cannot be undone.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onConfirm} color="error" variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
