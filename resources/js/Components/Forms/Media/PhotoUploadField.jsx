import React, { useContext, useEffect, useState } from "react";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import Compressor from "compressorjs";
import CvContext from "@/Context/CvContext";

const PhotoUploadField = ({ oldPhoto }) => {
    const { data, setData } = useContext(CvContext);

    // Display either the current photo or a previously saved photo URL
    const initialPhotoURL =
        typeof data.profile_photo === "string" && data.profile_photo !== ""
            ? `/storage/${data.profile_photo}`
            : oldPhoto || null;
    const [photoURL, setPhotoURL] = useState(initialPhotoURL);
    const [uploading, setUploading] = useState(false);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setUploading(true);

            // Compress the image using Compressor.js
            new Compressor(file, {
                quality: 0.6,
                maxWidth: 600,
                success(compressedFile) {
                    if (compressedFile instanceof Blob) {
                        // Create a URL for the compressed image
                        setPhotoURL(URL.createObjectURL(compressedFile));
                        // Set the compressed image to the form data (don't upload immediately)
                        setData((prevData) => ({
                            ...prevData,
                            profile_photo: compressedFile,
                        }));
                    } else {
                        console.error("Compressed file is not a valid Blob");
                    }
                    setUploading(false);
                },
                error(err) {
                    console.error("Compression error:", err.message);
                    setUploading(false);
                },
            });
        }
    };

    useEffect(() => {
        if (data.profile_photo && data.profile_photo instanceof Blob) {
            const newPhotoURL = URL.createObjectURL(data.profile_photo);
            setPhotoURL(newPhotoURL);

            // Clean up the object URL when the component unmounts
            return () => {
                URL.revokeObjectURL(newPhotoURL);
            };
        }
    }, [data.profile_photo]);

    // Check if we have a valid photo to display
    const hasPhoto =
        (data.profile_photo && data.profile_photo !== "") ||
        photoURL ||
        oldPhoto;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {hasPhoto ? (
                <img
                    src={photoURL || oldPhoto}
                    alt="Profile Photo"
                    style={{
                        width: "200px",
                        height: "280px",
                        border: "2px dashed gray",
                        borderRadius: "8px",
                        objectFit: "cover",
                        objectPosition: "center",
                        marginBottom: "1rem",
                    }}
                />
            ) : (
                <Box
                    sx={{
                        width: "200px",
                        height: "280px",
                        border: "2px dashed gray",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "grey.50",
                        marginBottom: "1rem",
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        No photo selected
                    </Typography>
                </Box>
            )}

            {/* Status Bar for Compression */}
            {uploading && (
                <>
                    <Typography variant="body2" sx={{ marginBottom: 1 }}>
                        Compressing photo...
                    </Typography>
                    <LinearProgress
                        sx={{ width: "200px", marginBottom: "1rem" }}
                    />
                </>
            )}

            {!hasPhoto && !uploading && (
                <Button
                    variant="outlined"
                    component="label"
                    sx={{ fontSize: 12, px: 2, py: 1 }}
                >
                    Add photo
                    <input
                        type="file"
                        accept=".jpg, .jpeg, .png, .heic"
                        hidden
                        onChange={handlePhotoChange}
                    />
                </Button>
            )}

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    alignItems: "center",
                }}
            >
                {hasPhoto && !uploading && (
                    <Button variant="outlined" component="label" size="small">
                        Change Photo
                        <input
                            type="file"
                            accept=".jpg, .jpeg, .png, .heic"
                            hidden
                            onChange={handlePhotoChange}
                        />
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default PhotoUploadField;
