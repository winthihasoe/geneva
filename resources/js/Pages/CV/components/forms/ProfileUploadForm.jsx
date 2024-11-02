import PhotoUploadField from "@/Components/Forms/Media/PhotoUploadField";
import Subtitle from "@/Components/Typo/Subtitle";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";

export default function ProfileUploadForm({ data, oldPhoto, setData }) {
    return (
        <Box sx={{ maxWidth: 300, margin: "0 auto" }}>
            <Subtitle>Upload profile photo</Subtitle>
            <PhotoUploadField
                oldPhoto={oldPhoto}
                setData={setData}
                data={data}
            />
        </Box>
    );
}
