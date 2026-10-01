import { Link, router } from "@inertiajs/react";
import SearchIcon from "@mui/icons-material/Search";
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
import React, { useEffect, useState } from "react";

function cvLabel(cv) {
    const name = cv?.full_name || "this CV";
    return cv?.geneva_id ? `${name} (${cv.geneva_id})` : name;
}

function CvResult({ cv, onLink, linkingId }) {
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
                    {cv.full_name || "CV"}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                    {[cv.geneva_id, cv.gender, cv.phone].filter(Boolean).join(" · ")}
                </Typography>
                {cv.linked_candidate ? (
                    <Typography variant="caption" color="warning.main" display="block">
                        Linked to another candidate
                        {cv.linked_candidate.name
                            ? ` (${cv.linked_candidate.name})`
                            : ""}
                    </Typography>
                ) : null}
            </Box>
            <Button
                type="button"
                size="small"
                variant="outlined"
                disabled={Boolean(cv.linked_candidate) || linkingId === cv.id}
                onClick={() => {
                    if (!cv.linked_candidate) {
                        onLink(cv);
                    }
                }}
            >
                {linkingId === cv.id ? "Linking" : "Link"}
            </Button>
        </Box>
    );
}

export default function JobApplyCvPanel({
    apply,
    matchingCvs = [],
    embedded = false,
}) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState(matchingCvs);
    const [searching, setSearching] = useState(false);
    const [linkingId, setLinkingId] = useState(null);
    const [pendingCv, setPendingCv] = useState(null);
    const [confirmUnlink, setConfirmUnlink] = useState(false);
    const [unlinking, setUnlinking] = useState(false);

    useEffect(() => {
        if (query.trim() !== "") {
            return;
        }
        setResults(matchingCvs);
    }, [matchingCvs, query]);

    if (!apply?.id) {
        return null;
    }

    const linked = apply.cv;
    const canLink = !linked && apply.status === "recruit";

    if (!linked && !canLink) {
        return null;
    }

    const runSearch = async (value) => {
        const term = value.trim();
        setQuery(term);
        setSearching(true);
        try {
            const url = route("admin.job.apply.cvs.search", apply.id);
            const response = await fetch(`${url}?q=${encodeURIComponent(term)}`, {
                headers: {
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
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

    const submitSearch = (event) => {
        event.preventDefault();
        event.stopPropagation();
        runSearch(query);
    };

    const handleLink = (cvId) => {
        setLinkingId(cvId);
        router.post(
            route("admin.job.apply.link-cv", apply.id),
            { cv_id: cvId },
            {
                onFinish: () => setLinkingId(null),
                onSuccess: () => {
                    setPendingCv(null);
                    setOpen(false);
                },
            }
        );
    };

    const handleUnlink = () => {
        setUnlinking(true);
        router.delete(route("admin.job.apply.unlink-cv", apply.id), {
            onFinish: () => setUnlinking(false),
            onSuccess: () => setConfirmUnlink(false),
        });
    };

    return (
        <Box
            sx={
                embedded
                    ? {
                          mt: 0.5,
                          p: 1.5,
                          borderRadius: 1.5,
                          bgcolor: "action.hover",
                      }
                    : {
                          maxWidth: 720,
                          margin: "auto",
                          mt: 2,
                          mb: 1,
                          p: 2,
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 2,
                          bgcolor: "background.paper",
                      }
            }
        >
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 0.5 }}>
                CV
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
                            href={route("admin.cv.single", linked.id)}
                            sx={{
                                color: "primary.main",
                                fontWeight: 700,
                                textDecoration: "none",
                                "&:hover": { textDecoration: "underline" },
                            }}
                        >
                            {linked.full_name || "CV"}
                        </Box>
                        {linked.geneva_id ? (
                            <Typography component="span" color="text.secondary">
                                {" "}
                                ({linked.geneva_id})
                            </Typography>
                        ) : null}
                    </Typography>
                    <Button
                        type="button"
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
                        This candidate is recruited. You can create a CV or link
                        one that already exists. Saving does not require a CV.
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        <Button
                            type="button"
                            variant="contained"
                            size="small"
                            onClick={() =>
                                router.get(route("admin.cv.create"), {
                                    job_apply_id: apply.id,
                                })
                            }
                        >
                            Create CV
                        </Button>
                        <Button
                            type="button"
                            variant="outlined"
                            size="small"
                            onClick={() => {
                                setQuery("");
                                setResults(matchingCvs);
                                setOpen(true);
                            }}
                        >
                            Link existing CV
                        </Button>
                    </Box>
                </>
            )}

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
                maxWidth="sm"
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        event.stopPropagation();
                    }
                }}
            >
                <DialogTitle>Link existing CV</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        onSubmit={submitSearch}
                        sx={{ mt: 0.5 }}
                    >
                        <TextField
                            size="small"
                            fullWidth
                            placeholder="Search by name, Geneva ID, or phone"
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
                                No matching CVs. Create a new CV instead.
                            </Typography>
                        ) : (
                            results.map((cv) => (
                                <CvResult
                                    key={cv.id}
                                    cv={cv}
                                    onLink={setPendingCv}
                                    linkingId={linkingId}
                                />
                            ))
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button type="button" onClick={() => setOpen(false)}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={Boolean(pendingCv)}
                onClose={() => {
                    if (!linkingId) {
                        setPendingCv(null);
                    }
                }}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle>Link this CV?</DialogTitle>
                <DialogContent>
                    <Typography variant="body2">
                        Link {cvLabel(pendingCv)} to {apply.name || "this candidate"}.
                        You can unlink it later if this is the wrong CV.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        type="button"
                        onClick={() => setPendingCv(null)}
                        disabled={Boolean(linkingId)}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="contained"
                        disabled={!pendingCv || Boolean(linkingId)}
                        onClick={() => handleLink(pendingCv.id)}
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
                <DialogTitle>Unlink this CV?</DialogTitle>
                <DialogContent>
                    <Typography variant="body2">
                        Remove the link to {cvLabel(linked)}. The CV stays in the
                        CV list. You can link a different one afterward.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        type="button"
                        onClick={() => setConfirmUnlink(false)}
                        disabled={unlinking}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
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
