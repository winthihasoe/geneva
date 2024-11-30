import React from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import { maxHeight, styled } from "@mui/system";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

const PREFIX = "ReusableModal";

const classes = {
    modal: `${PREFIX}-modal`,
    modalContent: `${PREFIX}-modalContent`,
    modalHeader: `${PREFIX}-modalHeader`,
    modalBody: `${PREFIX}-modalBody`,
    modalFooter: `${PREFIX}-modalFooter`,
};

const StyledModal = styled(Modal)(({ theme }) => ({
    [`& .${classes.modalContent}`]: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 300,
        maxHeight: "90vh",
        overflowY: "auto",
        backgroundColor: theme.palette.background.paper,
        borderRadius: 10,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    [`& .${classes.modalHeader}`]: {
        marginBottom: theme.spacing(2),
    },
    [`& .${classes.modalBody}`]: {
        marginBottom: theme.spacing(2),
    },
    [`& .${classes.modalFooter}`]: {
        display: "flex",
        justifyContent: "flex-end",
    },
}));

const ReusableModal = ({ open, onClose, title, children, onConfirm }) => {
    return (
        <StyledModal open={open} onClose={onClose}>
            <Box className={classes.modalContent}>
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", top: 0, right: 0 }}
                >
                    <HighlightOffRoundedIcon />
                </IconButton>
                <Box className={classes.modalHeader}>
                    <Typography variant="h6">{title}</Typography>
                </Box>
                <Box className={classes.modalBody}>{children}</Box>
                <Box className={classes.modalFooter}>
                    <Button onClick={onClose} sx={{ mr: 1 }}>
                        Cancel
                    </Button>
                    {onConfirm && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onConfirm}
                        >
                            Confirm
                        </Button>
                    )}
                </Box>
            </Box>
        </StyledModal>
    );
};

export default ReusableModal;
