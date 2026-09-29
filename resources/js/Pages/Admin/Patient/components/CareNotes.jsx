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
    IconButton,
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

export function PatientFeedbackNotes({ patientId, notes = [] }) {
    const form = useForm({ body: "" });
    const [pendingDelete, setPendingDelete] = useState(null);

    const save = (event) => {
        event.preventDefault();
        form.post(route("admin.patient.feedbacks.store", patientId), {
            preserveScroll: true,
            onSuccess: () => form.reset("body"),
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
                    disabled={form.processing || !form.data.body.trim()}
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
                <Chip
                    size="small"
                    label={note.kind === "complaint" ? "Complaint" : "Feedback"}
                    color={note.kind === "complaint" ? "warning" : "primary"}
                    variant="outlined"
                />
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
