import PhotoUploadField from "@/Components/Forms/Media/PhotoUploadField";
import Subtitle from "@/Components/Typo/Subtitle";
import CvContext from "@/Context/CvContext";
import { Box, Typography } from "@mui/material";
import React, { useContext, useState } from "react";

export default function ProfileUploadForm({ oldPhoto }) {
    return (
        <Box sx={{ maxWidth: 300, margin: "0 auto" }}>
            <Subtitle>Upload profile photo</Subtitle>
            <PhotoUploadField oldPhoto={oldPhoto} />
        </Box>
    );
}
