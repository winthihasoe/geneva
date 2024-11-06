// ImageDialog.js
import React from "react";
import { Dialog, Box } from "@mui/material";

function ImageDialog({ open, onClose, imageSrc }) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <Box
                component="img"
                src={imageSrc}
                alt="Enlarged view"
                sx={{ width: "100%", height: "auto" }}
            />
        </Dialog>
    );
}

export default ImageDialog;
