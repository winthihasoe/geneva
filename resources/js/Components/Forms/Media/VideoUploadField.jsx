import React, { useState } from "react";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useForm } from "@inertiajs/react";
import BodyText from "@/Components/Typo/BodyText";
import VideoPlayer from "@/Components/Util/VideoPlayer";

const VideoUploadField = ({ data, setData, oldVideo }) => {
    const [videoURL, setVideoURL] = useState(null);
    const [videoSizeExceeded, setVideoSizeExceeded] = useState(false);
    console.log("video upload field", data);
    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileSizeInMB = file.size / (1024 * 1024); // Convert size to MB
            if (fileSizeInMB > 100) {
                setVideoSizeExceeded(true);
                setData({ video: null }); // Reset the video data
                setVideoURL(null); // Clear video preview
            } else {
                setVideoSizeExceeded(false);
                setVideoURL(URL.createObjectURL(file));
                setData((prevData) => ({ ...prevData, video: file }));
            }
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 2,
            }}
        >
            {oldVideo && (
                <>
                    <VideoPlayer videoURL={oldVideo} />
                </>
            )}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    my: 1,
                }}
            >
                <Box
                    sx={{
                        width: "300px", // Adjust width as needed
                        height: "170px", // Maintain 16:9 aspect ratio
                        border: "2px dashed gray",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        my: 1,
                        backgroundImage: videoURL ? `url(${videoURL})` : "none", // Wrap the URL in `url()`
                        backgroundSize: "cover", // Ensure the image covers the whole box
                        backgroundPosition: "center", // Center the image
                        overflow: "hidden",
                    }}
                >
                    {!videoURL && (
                        <Button variant="text" component="label">
                            Add your introduction video
                            <input
                                type="file"
                                accept="video/*"
                                hidden
                                onChange={handleVideoChange}
                            />
                        </Button>
                    )}
                    {videoURL && <VideoPlayer videoURL={videoURL} />}
                </Box>

                {videoSizeExceeded && (
                    <Typography
                        color="error"
                        fontSize={12}
                        textAlign={"center"}
                    >
                        The video exceeds the 100 MB size limit. Please upload a
                        smaller video.
                    </Typography>
                )}
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    alignItems: "center",
                    my: 2,
                }}
            >
                {data.video && (
                    <Button
                        variant="outlined"
                        component="label"
                        onClick={() => {
                            setVideoURL(null);
                            setData((prevData) => ({ ...prevData, video: "" }));
                        }}
                    >
                        Remove Video
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default VideoUploadField;
