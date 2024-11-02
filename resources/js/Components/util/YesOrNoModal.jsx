import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import { router } from "@inertiajs/react";

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

const YesOrNoModal = ({ open, onClose, title, confirmRoute, handleClose }) => {
    return (
        <StyledModal open={open} onClose={onClose}>
            <Box className={classes.modalContent}>
                <Box className={classes.modalHeader}>
                    <Typography
                        variant="h6"
                        fontSize={20}
                        fontFamily={"Madimi One"}
                    >
                        {title}
                    </Typography>
                </Box>
                <Box className={classes.modalBody}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 4,
                        }}
                    >
                        <Button
                            size="small"
                            sx={{ borderRadius: 20 }}
                            variant="contained"
                            onClick={() => {
                                router.post(route(confirmRoute));
                                handleClose();
                            }}
                        >
                            <Typography fontSize={12}>Yes</Typography>
                        </Button>
                        <Button
                            size="small"
                            sx={{ borderRadius: 20 }}
                            variant="outlined"
                            onClick={handleClose}
                        >
                            <Typography fontSize={12}>No</Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </StyledModal>
    );
};

export default YesOrNoModal;
