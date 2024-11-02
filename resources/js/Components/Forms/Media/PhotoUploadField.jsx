import React, { useEffect, useState } from "react";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import Compressor from "compressorjs";

const PhotoUploadField = ({ oldPhoto, setData, data }) => {
    const [photoURL, setPhotoURL] = useState(oldPhoto ? oldPhoto : null);
    const [uploading, setUploading] = useState(false); // For tracking compression status

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Show the progress bar when compression starts
            setUploading(true);

            // Compress the image using Compressor.js
            new Compressor(file, {
                quality: 0.6, // Adjust the quality as needed (0 to 1)
                maxWidth: 600, // Resize to a maximum width of 600px
                success(compressedFile) {
                    if (compressedFile instanceof Blob) {
                        // Create a URL for the compressed image
                        setPhotoURL(URL.createObjectURL(compressedFile));
                        // Set the compressed image to the form data
                        setData((prevData) => ({
                            ...prevData,
                            photo: compressedFile,
                        }));
                    } else {
                        console.error("Compressed file is not a valid Blob");
                    }

                    // Hide the progress bar after compression
                    setUploading(false);
                },
                error(err) {
                    console.error("Compression error:", err.message);
                    setUploading(false); // Hide the progress bar on error
                },
            });
        }
    };

    useEffect(() => {
        if (data.photo && data.photo instanceof Blob) {
            const newPhotoURL = URL.createObjectURL(data.photo);
            setPhotoURL(newPhotoURL);

            // Clean up the object URL when the component unmounts
            return () => {
                URL.revokeObjectURL(newPhotoURL);
            };
        }
    }, [data.photo]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {data.photo !== null || oldPhoto ? (
                <img
                    src={photoURL ? photoURL : oldPhoto}
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
                    }}
                />
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

            {!data.photo && !uploading && (
                <Button variant="text" component="label">
                    Add your photo
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
                {(data.photo || photoURL) && !uploading && (
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
