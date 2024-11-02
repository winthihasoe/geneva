import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import PhotoUploadField from "../../FormComponents/PhotoUploadField";
import Subtitle from "@/Components/Typo/Subtitle";

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
