import { careTypeLabel, patientDisplayName } from "@/utils/careTypeLabel";
import { Link, router } from "@inertiajs/react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";

function patientLabel(patient) {
    const name = patientDisplayName(patient) || "this patient";
    return patient?.pt_id ? `${name} (${patient.pt_id})` : name;
}

function PatientResult({ patient, onLink, linkingId }) {
    const name = patientDisplayName(patient);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 1.5,
                py: 1.25,
                borderBottom: "1px solid",
                borderColor: "divider",
            }}
        >
            <Box sx={{ minWidth: 0 }}>
                <Typography variant="body2" fontWeight={700}>
                    {name}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                    {[patient.pt_id, careTypeLabel(patient.type), patient.emergency_contact_phone]
                        .filter(Boolean)
                        .join(" · ")}
                </Typography>
            </Box>
            <Button
                size="small"
                variant="outlined"
                disabled={linkingId === patient.id}
                onClick={() => onLink(patient)}
            >
                {linkingId === patient.id ? "Linking" : "Link"}
            </Button>
        </Box>
    );
}

export default function CasePatientPanel({
    record,
    matchingPatients = [],
}) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState(matchingPatients);
    const [searching, setSearching] = useState(false);
    const [linkingId, setLinkingId] = useState(null);
    const [pendingPatient, setPendingPatient] = useState(null);
    const [confirmUnlink, setConfirmUnlink] = useState(false);
    const [unlinking, setUnlinking] = useState(false);

    useEffect(() => {
        setResults(matchingPatients);
    }, [matchingPatients]);

    if (!record?.id) {
        return null;
    }

    const linked = record.patient;
    const canLink =
        !linked &&
        (record.status === "confirmed" || record.status === "on_duty");

    if (!linked && !canLink) {
        return null;
    }

    const runSearch = async (value) => {
        setSearching(true);
        try {
            const url = route("admin.cases.patients.search", record.id);
            const response = await fetch(`${url}?q=${encodeURIComponent(value)}`, {
                headers: { Accept: "application/json" },
            });
            if (!response.ok) {
                return;
            }
            const data = await response.json();
            setResults(Array.isArray(data) ? data : []);
        } finally {
            setSearching(false);
        }
    };

    const handleLink = (patientId) => {
        setLinkingId(patientId);
        router.post(
            route("admin.cases.link-patient", record.id),
            { patient_id: patientId },
            {
                onFinish: () => setLinkingId(null),
                onSuccess: () => {
                    setPendingPatient(null);
                    setOpen(false);
                },
            }
        );
    };

    const handleUnlink = () => {
        setUnlinking(true);
        router.delete(route("admin.cases.unlink-patient", record.id), {
            onFinish: () => setUnlinking(false),
            onSuccess: () => setConfirmUnlink(false),
        });
    };

    return (
        <Box
            sx={{
                mt: 2,
                mb: 1,
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                bgcolor: "background.paper",
            }}
        >
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 0.5 }}>
                Patient
            </Typography>
            {linked ? (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1.5,
                        flexWrap: "wrap",
                    }}
                >
                    <Typography variant="body2">
                        Linked to{" "}
                        <Box
                            component={Link}
                            href={route("admin.patient", linked.id)}
                            sx={{
                                color: "primary.main",
                                fontWeight: 700,
                                textDecoration: "none",
                                "&:hover": { textDecoration: "underline" },
                            }}
                        >
                            {patientDisplayName(linked)}
                        </Box>
                        {linked.pt_id ? (
                            <Typography component="span" color="text.secondary">
                                {" "}
                                ({linked.pt_id})
                            </Typography>
                        ) : null}
                    </Typography>
                    <Button
                        size="small"
                        color="inherit"
                        onClick={() => setConfirmUnlink(true)}
                    >
                        Unlink
                    </Button>
                </Box>
            ) : (
                <>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                        This case is confirmed. Create a patient or link one that
                        already exists.
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() =>
                                router.get(route("admin.patient.create"), {
                                    case_id: record.id,
                                })
                            }
                        >
                            Create patient
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => {
                                setQuery("");
                                setResults(matchingPatients);
                                setOpen(true);
                            }}
                        >
                            Link existing patient
                        </Button>
                    </Box>
                </>
            )}

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Link existing patient</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        onSubmit={(event) => {
                            event.preventDefault();
                            runSearch(query.trim());
                        }}
                        sx={{ mt: 0.5 }}
                    >
                        <TextField
                            size="small"
                            fullWidth
                            placeholder="Search by name, ID, or phone"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box sx={{ mt: 1.5 }}>
                        {searching ? (
                            <Typography variant="body2" color="text.secondary">
                                Searching...
                            </Typography>
                        ) : results.length === 0 ? (
                            <Typography variant="body2" color="text.secondary">
                                No matching patients. Create a new patient instead.
                            </Typography>
                        ) : (
                            results.map((patient) => (
                                <PatientResult
                                    key={patient.id}
                                    patient={patient}
                                    onLink={setPendingPatient}
                                    linkingId={linkingId}
                                />
                            ))
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={Boolean(pendingPatient)}
                onClose={() => {
                    if (!linkingId) {
                        setPendingPatient(null);
                    }
                }}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle>Link this patient?</DialogTitle>
                <DialogContent>
                    <Typography variant="body2">
                        Link {patientLabel(pendingPatient)} to{" "}
                        {record.name || "this case"}. You can unlink them later
                        if this is the wrong patient.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setPendingPatient(null)}
                        disabled={Boolean(linkingId)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        disabled={!pendingPatient || Boolean(linkingId)}
                        onClick={() => handleLink(pendingPatient.id)}
                    >
                        {linkingId ? "Linking" : "Link"}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={confirmUnlink}
                onClose={() => {
                    if (!unlinking) {
                        setConfirmUnlink(false);
                    }
                }}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle>Unlink this patient?</DialogTitle>
                <DialogContent>
                    <Typography variant="body2">
                        Remove the link to {patientLabel(linked)}. The patient
                        stays in the patient list. You can link a different one
                        afterward.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setConfirmUnlink(false)}
                        disabled={unlinking}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="inherit"
                        disabled={unlinking}
                        onClick={handleUnlink}
                    >
                        {unlinking ? "Unlinking" : "Unlink"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
