import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const YesOrNoModal = ({
    open,
    onClose,
    title,
    onConfirm,
    confirming = false,
    confirmingLabel = "Deleting...",
}) => {
    return (
        <Modal open={open} onClose={confirming ? () => {} : onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 300,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 3,
                }}
            >
                <Typography
                    variant="h6"
                    fontSize={20}
                    fontFamily={"Madimi One"}
                    sx={{ mb: 2 }}
                >
                    {title}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                    <Button
                        size="small"
                        sx={{ borderRadius: 20 }}
                        variant="contained"
                        onClick={onConfirm}
                        disabled={confirming}
                    >
                        <Typography fontSize={12}>
                            {confirming ? confirmingLabel : "Yes"}
                        </Typography>
                    </Button>
                    <Button
                        size="small"
                        sx={{ borderRadius: 20 }}
                        variant="outlined"
                        onClick={onClose}
                        disabled={confirming}
                    >
                        <Typography fontSize={12}>No</Typography>
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default YesOrNoModal;
