import PhotoUploadField from "@/Components/Forms/Media/PhotoUploadField";
import { Box, Typography } from "@mui/material";
import React from "react";

export default function ProfileUploadForm({ oldPhoto }) {
    return (
        <Box sx={{ maxWidth: 300, margin: "0 auto" }}>
            <Typography
                variant="subtitle1"
                fontWeight="bold"
                textAlign={"center"}
                gutterBottom
            >
                Upload profile photo
            </Typography>
            <PhotoUploadField oldPhoto={oldPhoto} />
        </Box>
    );
}
