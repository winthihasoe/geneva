import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Button,
    Typography,
    LinearProgress,
    Grid,
    Grid2,
    TextField,
    Divider,
} from "@mui/material";
import Compressor from "compressorjs";
import Subtitle from "@/Components/Typo/Subtitle";
import TinyText from "@/Components/Typo/TinyText";
import CvContext from "@/Context/CvContext";

const DocumentUploadForm = ({ oldPassport }) => {
    const { data, setData, handleChange } = useContext(CvContext);

    const [passportPreview, setPassportPreview] = useState(
        oldPassport
            ? oldPassport
            : typeof data.passport === "string"
            ? `/storage/${data.passport}`
            : null
    );

    const [passportUploading, setPassportUploading] = useState(false);
    const [error, setError] = useState(null);

    const handlePassportChange = (event) => {
        const file = event.target.files[0];
        setError(null);

        if (file) {
            setPassportUploading(true);

            // Compress the image using Compressor.js
            new Compressor(file, {
                quality: 0.6, // Adjust the quality as needed (0 to 1)
                maxWidth: 600, // Resize to a maximum width of 600px
                success(compressedFile) {
                    if (compressedFile instanceof Blob) {
                        setPassportPreview(URL.createObjectURL(compressedFile));
                        setData((prevData) => ({
                            ...prevData,
                            passport: compressedFile,
                        }));
                    } else {
                        console.error("Compression error:", err.message);
                    }

                    setPassportUploading(false);
                    uploadPhoto(compressedFile);
                    console.log("save photo");
                },
                error(err) {
                    console.error("Compression error:", err.message);
                    setPassportUploading(false);
                },
            });
        }
    };

    const [uploadMessage, setUploadMessage] = useState("");
    // Function to handle the photo upload
    const uploadPhoto = async (photoFile) => {
        const formData = new FormData();
        formData.append("passport", photoFile, photoFile.name);

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
        } finally {
            setPassportUploading(false); // Stop uploading indicator
        }
    };

    useEffect(() => {
        if (data.passport && data.passport instanceof Blob) {
            const newPassportPreview = URL.createObjectURL(data.passport);
            setPassportPreview(newPassportPreview);

            // Clean up the object URL when the component unmounts
            return () => {
                URL.revokeObjectURL(newPassportPreview);
            };
        }
    }, [data.passport]);

    return (
        <Box sx={{ mb: 3, maxWidth: 400, margin: "0 auto" }}>
            <Typography
                sx={{
                    mb: 4,
                    fontSize: 13,
                    fontWeight: "bold",
                    textAlign: "center",
                }}
            >
                Other documents to be uploaded for system keep record / not to
                be shown to public
            </Typography>

            {error && (
                <Typography color="error" fontSize={12} textAlign="center">
                    {error}
                </Typography>
            )}

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Subtitle>Passport</Subtitle>
                {data.passport !== null || oldPassport ? (
                    <img
                        src={passportPreview ? passportPreview : oldPassport}
                        style={{
                            width: "200px",
                            height: "200px",
                            border: "2px solid #1c90a9",
                            borderRadius: "40px",
                            objectFit: "cover",
                            objectPosition: "center",
                            margin: "auto",
                        }}
                    />
                ) : (
                    <Box
                        sx={{
                            width: "200px",
                            height: "200px",
                            border: "2px solid gray",
                            borderRadius: 10,
                            margin: "auto",
                        }}
                    />
                )}
                {passportUploading && (
                    <Box sx={{ width: "100px", mb: 2 }}>
                        <LinearProgress />
                        <Typography fontSize={12} sx={{ textAlign: "center" }}>
                            Compressing...
                        </Typography>
                    </Box>
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
                <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    size="small"
                    component="label"
                >
                    <input
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={handlePassportChange}
                        hidden
                    />
                    <Typography fontSize={12} textAlign={"center"}>
                        Choose
                    </Typography>
                </Button>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                        mt: 2,
                    }}
                >
                    <Subtitle>Passport Number</Subtitle>
                    <TextField
                        value={data.passport_number}
                        onChange={handleChange("passport_number")}
                        size="small"
                    />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                        mt: 2,
                    }}
                >
                    <Subtitle>Passport type</Subtitle>
                    <TextField
                        value={data.passport_type}
                        onChange={handleChange("passport_type")}
                        size="small"
                    />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                        my: 2,
                    }}
                >
                    <Subtitle>Visa type</Subtitle>
                    <TextField
                        value={data.visa_type}
                        onChange={handleChange("visa_type")}
                        size="small"
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default DocumentUploadForm;
