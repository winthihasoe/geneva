import React, { useContext, useEffect, useState } from "react";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import Compressor from "compressorjs";
import CvContext from "@/Context/CvContext";

const PhotoUploadField = ({ oldPhoto }) => {
    const { data, setData } = useContext(CvContext);

    // Display either the current photo or a previously saved photo URL
    // Determine the initial preview URL: use string URL if available, otherwise null
    const initialPhotoURL =
        typeof data.profile_photo === "string"
            ? `/storage/${data.profile_photo}`
            : oldPhoto || null;
    const [photoURL, setPhotoURL] = useState(initialPhotoURL);
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
                            profile_photo: compressedFile,
                        }));
                    } else {
                        console.error("Compressed file is not a valid Blob");
                    }

                    // Hide the progress bar after compression
                    setUploading(false);
                    uploadPhoto(compressedFile);
                },
                error(err) {
                    console.error("Compression error:", err.message);
                    setUploading(false); // Hide the progress bar on error
                },
            });
        }
    };

    const [uploadMessage, setUploadMessage] = useState("");
    // Function to handle the photo upload
    const uploadPhoto = async (photoFile) => {
        const formData = new FormData();
        formData.append("profile_photo", photoFile, photoFile.name);

        try {
            const response = await axios.post(route("cv.store"), formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setUploadMessage(response.data.message);
            setTimeout(() => setUploadMessage(""), 2000); // Clear message after 2 seconds
        } catch (error) {
            console.error("Error uploading photo:", error);
            setUploadMessage("Failed to upload photo.");
            setTimeout(() => setUploadMessage(""), 2000); // Clear message after 2 seconds
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

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {data.profile_photo !== null || oldPhoto ? (
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

            {!data.profile_photo && !uploading && (
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

            {uploadMessage && (
                <Typography
                    fontSize={{ xs: 11, sm: 12, md: 13 }}
                    fontWeight={600}
                    fontFamily={"Mina"}
                    mb={2}
                >
                    {uploadMessage}
                </Typography>
            )}

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    alignItems: "center",
                }}
            >
                {(data.profile_photo || photoURL) && !uploading && (
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
