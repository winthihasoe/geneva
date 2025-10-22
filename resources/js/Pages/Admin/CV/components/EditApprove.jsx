import Subtitle from "@/Components/Typo/Subtitle";
import TitleCenter from "@/Components/Typo/TitleCenter";
import DateTimeFormatter from "@/Components/util/DateTimeFormatter";
import YesOrNoModal from "@/Components/util/YesOrNoModal";
import { router } from "@inertiajs/react";
import {
    Box,
    Button,
    Typography,
    Stack,
    Chip,
    Paper,
    Alert,
} from "@mui/material";
import React, { useState } from "react";

function EditApprove({ cv }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleApprove = () => {
        router.put(
            route("admin.cv.approve", cv.id),
            {},
            { preserveScroll: true }
        );
        handleClose();
    };

    const [openUnapprove, setOpenUnapprove] = useState(false);
    const handleOpenUnapprove = () => setOpenUnapprove(true);
    const handleCloseUnapprove = () => setOpenUnapprove(false);
    const handleUnApprove = () => {
        router.put(
            route("admin.cv.unapprove", cv.id),
            {},
            { preserveScroll: true }
        );
        handleCloseUnapprove();
    };

    return (
        <>
            <TitleCenter>Caregiver Status</TitleCenter>
            <Paper
                elevation={2}
                sx={{
                    maxWidth: 340,
                    mx: "auto",
                    mt: 2,
                    p: 3,
                    borderRadius: 3,
                    bgcolor: "gray.100",
                }}
            >
                <Stack spacing={2} alignItems="center">
                    <Typography variant="h5" fontWeight="bold">
                        {cv.is_approved ? "Approved" : "Unapproved"}
                    </Typography>

                    {cv.is_approved ? (
                        <Stack spacing={0.5} alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                                Approved by: <b>{cv.approved_by}</b>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Approved at:{" "}
                                <DateTimeFormatter dateTime={cv.approved_at} />
                            </Typography>
                        </Stack>
                    ) : (
                        <Alert severity="info">
                            This resume is not approved yet.
                        </Alert>
                    )}
                    <Box>
                        {cv.is_approved ? (
                            <Button
                                onClick={handleOpenUnapprove}
                                variant="outlined"
                                color="error"
                                sx={{ borderRadius: 20, minWidth: 120 }}
                            >
                                <Typography fontSize={14}>Unapprove</Typography>
                            </Button>
                        ) : (
                            <Button
                                sx={{ borderRadius: 20, minWidth: 120 }}
                                onClick={handleOpen}
                                variant="contained"
                                color="success"
                            >
                                <Typography fontWeight="bold" fontSize={14}>
                                    Approve
                                </Typography>
                            </Button>
                        )}
                    </Box>
                </Stack>
            </Paper>

            <YesOrNoModal
                open={open}
                onClose={handleClose}
                title="Approve Resume"
                onConfirm={handleApprove}
            />

            <YesOrNoModal
                open={openUnapprove}
                onClose={handleCloseUnapprove}
                title="Unapprove Resume"
                onConfirm={handleUnApprove}
            />
        </>
    );
}

export default EditApprove;
