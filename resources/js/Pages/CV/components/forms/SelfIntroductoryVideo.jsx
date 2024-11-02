import VideoUploadField from "@/Components/Forms/Media/VideoUploadField";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";

export default function SelfIntroductoryVideo({ data, setData, oldVideo }) {
    return (
        <Box sx={{ maxWidth: 300, margin: "0 auto" }}>
            <Typography
                textAlign="center"
                fontSize={14}
                gutterBottom
                fontWeight={600}
            >
                Self-Introduction Video
            </Typography>

            <VideoUploadField
                data={data}
                setData={setData}
                oldVideo={oldVideo}
            />

            <Typography textAlign="center" fontSize={11}>
                sample provided
            </Typography>
        </Box>
    );
}
