import { typedNameMatches } from "@/utils/typedNameMatches";
import { router } from "@inertiajs/react";
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export default function ConfirmTypedNameDeleteDialog({
    open,
    expectedName = "",
    subject,
    nameKind,
    deleteUrl,
    onClose,
}) {
    const [step, setStep] = useState("type");
    const [typedName, setTypedName] = useState("");
    const [error, setError] = useState("");
    const [confirming, setConfirming] = useState(false);
    const nameMatches = typedNameMatches(expectedName, typedName);
    const displayName = String(expectedName ?? "").trim();

    useEffect(() => {
        if (!open) {
            return;
        }

        setStep("type");
        setTypedName("");
        setError("");
        setConfirming(false);
    }, [open, expectedName]);

    const handleClose = () => {
        if (confirming) {
            return;
        }

        onClose();
    };

    const continueToWarning = () => {
        if (!nameMatches) {
            setError(`Type the ${nameKind} exactly as shown.`);
            return;
        }

        setError("");
        setStep("confirm");
    };

    const confirmDelete = () => {
        if (!nameMatches || confirming) {
            setError(`Type the ${nameKind} exactly as shown.`);
            setStep("type");
            return;
        }

        if (!deleteUrl) {
            console.error("Delete was requested without a delete URL.", {
                subject,
                expectedName: displayName,
            });
            setError("Could not delete this record. Please try again.");
            return;
        }

        let succeeded = false;
        let failedMessage = "";
        setConfirming(true);
        setError("");

        try {
            router.delete(deleteUrl, {
                data: { confirm_name: typedName.trim() },
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    succeeded = true;
                    onClose();
                },
                onError: (errors) => {
                    const message = errors?.confirm_name;
                    failedMessage = Array.isArray(message)
                        ? message[0]
                        : message ||
                          "Could not delete this record. Please try again.";
                    setError(failedMessage);
                },
                onFinish: () => {
                    setConfirming(false);
                    if (!succeeded && !failedMessage) {
                        setError(
                            "Could not delete this record. Please try again.",
                        );
                    }
                },
            });
        } catch (deleteError) {
            console.error(`Failed to delete ${subject}.`, deleteError);
            setConfirming(false);
            setError("Could not delete this record. Please try again.");
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="xs"
            disableEscapeKeyDown={confirming}
        >
            {step === "type" ? (
                <>
                    <DialogTitle>Delete {subject}</DialogTitle>
                    <DialogContent>
                        <Typography variant="body2" sx={{ mb: 1.5 }}>
                            Type the {nameKind} to confirm.
                        </Typography>
                        <Box
                            sx={{
                                mb: 2,
                                px: 1.5,
                                py: 1,
                                borderRadius: 1,
                                bgcolor: "action.hover",
                            }}
                        >
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ textTransform: "capitalize" }}
                            >
                                {nameKind}
                            </Typography>
                            <Typography fontWeight={700}>
                                {displayName || "-"}
                            </Typography>
                        </Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            fontWeight={700}
                        >
                            {`Type the ${nameKind} exactly as shown.`}
                        </Typography>
                        <TextField
                            autoFocus
                            fullWidth
                            variant="standard"
                            size="small"
                            value={typedName}
                            error={Boolean(error)}
                            helperText={
                                error ||
                                (typedName && !nameMatches
                                    ? `Type the ${nameKind} exactly as shown.`
                                    : " ")
                            }
                            onChange={(event) => {
                                setTypedName(event.target.value);
                                setError("");
                            }}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    event.preventDefault();
                                    continueToWarning();
                                }
                            }}
                        />
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 2 }}>
                        <Button onClick={handleClose} disabled={confirming}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={continueToWarning}
                            disabled={!nameMatches}
                        >
                            Continue
                        </Button>
                    </DialogActions>
                </>
            ) : (
                <>
                    <DialogTitle>
                        Permanently delete this {subject}?
                    </DialogTitle>
                    <DialogContent>
                        <Alert severity="error">
                            This will permanently delete {displayName}. You
                            cannot undo this.
                        </Alert>
                        {error && (
                            <Typography
                                variant="body2"
                                color="error"
                                sx={{ mt: 1.5 }}
                            >
                                {error}
                            </Typography>
                        )}
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 2 }}>
                        <Button
                            onClick={() => {
                                setError("");
                                setStep("type");
                            }}
                            disabled={confirming}
                        >
                            Back
                        </Button>
                        <Button
                            color="error"
                            variant="contained"
                            onClick={confirmDelete}
                            disabled={confirming || !nameMatches}
                        >
                            {confirming ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
}
