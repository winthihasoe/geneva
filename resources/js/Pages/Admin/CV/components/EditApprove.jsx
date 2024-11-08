import Subtitle from "@/Components/Typo/Subtitle";
import TitleCenter from "@/Components/Typo/TitleCenter";
import DateTimeFormatter from "@/Components/util/DateTimeFormatter";
import YesOrNoModal from "@/Components/util/YesOrNoModal";
import { router } from "@inertiajs/react";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";

function EditApprove({ cv }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleApprove = () => {
        router.put(
            route("admin.cv.approve", cv.id),
            {},
            {
                preserveScroll: true,
            }
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
            {
                preserveScroll: true,
            }
        );
        handleCloseUnapprove();
    };
    return (
        <>
            <TitleCenter>Caregiver Status:</TitleCenter>
            <Box sx={{ margin: "auto", width: 280 }}>
                <Subtitle>
                    Status: {cv.is_approved ? "Approved" : "Unapporved"}
                </Subtitle>
                {cv.is_approved ? (
                    <>
                        <Subtitle>Approved by: {cv.approved_by}</Subtitle>
                        <Subtitle>
                            Approved at:{" "}
                            <DateTimeFormatter dateTime={cv.approved_at} />
                        </Subtitle>
                    </>
                ) : (
                    ""
                )}
                {cv.is_approved ? (
                    <Button
                        onClick={handleOpenUnapprove}
                        variant="contained"
                        color="error"
                        sx={{ borderRadius: 20 }}
                    >
                        <Typography fontSize={13} fontFamily={"Mina"}>
                            Unapprove
                        </Typography>
                    </Button>
                ) : (
                    <Button
                        sx={{ borderRadius: 20 }}
                        onClick={handleOpen}
                        variant="contained"
                    >
                        <Typography
                            variant="contained"
                            fontWeight={"bold"}
                            fontSize={14}
                            fontFamily={"Mina"}
                        >
                            Approve
                        </Typography>
                    </Button>
                )}
            </Box>

            <YesOrNoModal
                open={open}
                onClose={handleClose}
                title="Approve Resume"
                onConfirm={handleApprove}
            />

            <YesOrNoModal
                open={openUnapprove}
                onClose={handleCloseUnapprove}
                title="Unpprove Resume"
                onConfirm={handleUnApprove}
            />
        </>
    );
}

export default EditApprove;
