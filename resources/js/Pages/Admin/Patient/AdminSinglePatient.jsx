import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    IconButton,
    Card,
    CardMedia,
    CardActions,
} from "@mui/material";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Title from "@/Components/Typo/Title";
import BackButton from "@/Components/BackButton";
import CloseIcon from "@mui/icons-material/Close";
import Subtitle from "@/Components/Typo/Subtitle";
import Compressor from "compressorjs";

function AdminSinglePatient({ patient }) {
    const [previews, setPreviews] = useState([]); // Separate state for preview URLs
    const { data, setData, post, processing, reset } = useForm({
        patient_id: patient.id,
        photos: [], // Only the files will be stored here
    });

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        files.forEach((file) => {
            // Compress each file
            new Compressor(file, {
                quality: 0.6, // Compression quality (0.1 to 1)
                maxWidth: 600, // Maximum width
                success: (compressedFile) => {
                    // Add the compressed file to the photos array
                    setData("photos", [...data.photos, compressedFile]);

                    // Generate preview URL and add to the previews array
                    setPreviews((prev) => [
                        ...prev,
                        URL.createObjectURL(compressedFile),
                    ]);
                },
                error: (err) => {
                    console.error("Error compressing file:", err);
                },
            });
        });
    };

    const handleRemovePhoto = (index) => {
        // Remove photo and preview by index
        const updatedPhotos = data.photos.filter((_, i) => i !== index);
        const updatedPreviews = previews.filter((_, i) => i !== index);

        setData("photos", updatedPhotos);
        setPreviews(updatedPreviews);
    };

    const handleUpload = () => {
        const formData = new FormData();

        // Append patient_id
        formData.append("patient_id", data.patient_id);

        // Append only the files to FormData
        data.photos.forEach((photo) => {
            formData.append("photos[]", photo);
        });

        // Send the form data using Inertia
        post(route("admin.carePlan.photo.upload", patient.id), {
            data: formData,
            processData: false,
            contentType: false,
            onSuccess: () => {
                reset();
                setPreviews([]); // Reset previews
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    if (!patient) {
        return (
            <AdminLayout>
                <Box
                    sx={{
                        maxWidth: 800,
                        margin: "auto",
                        padding: 3,
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h5">
                        Error: Patient data could not be loaded.
                    </Typography>
                </Box>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <Head title="Patient Detail" />
            <Box textAlign={"right"} mb={1}>
                <Button
                    size="small"
                    sx={{ borderRadius: 20 }}
                    variant="outlined"
                    component="label"
                >
                    Add Photos
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                    />
                </Button>
            </Box>

            {/* Preview Photos */}
            {previews.length > 0 && (
                <Box mb={1}>
                    <Subtitle>Selected Photos</Subtitle>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                            mb: 1,
                        }}
                    >
                        {previews.map((preview, index) => (
                            <Card
                                key={index}
                                sx={{ width: 90, position: "relative" }}
                            >
                                <CardMedia
                                    component="img"
                                    image={preview}
                                    alt={`Selected photo ${index + 1}`}
                                    sx={{ height: 90, objectFit: "cover" }}
                                />
                                <CardActions
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                    }}
                                >
                                    <IconButton
                                        size="small"
                                        color="error"
                                        sx={{ bgcolor: "#fff" }}
                                        onClick={() => handleRemovePhoto(index)}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        ))}
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpload}
                        disabled={processing}
                    >
                        {processing ? "Uploading..." : "Upload Photos"}
                    </Button>
                </Box>
            )}

            <Box
                sx={{
                    maxWidth: 600,
                    margin: "auto",
                    padding: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 4,
                    mb: 3,
                }}
            >
                <Title>
                    <BackButton />
                    Patient Details
                </Title>

                {/* Patient Data */}
                <Box>
                    {Object.entries(patient)
                        .filter(([key]) => !["id", "slug"].includes(key))
                        .map(([key, value]) => (
                            <Box
                                key={key}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginBottom: 1.5,
                                    p: { xs: 0, sm: 1 },
                                    borderBottom: "1px solid",
                                    borderColor: "divider",
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: "bold",
                                        fontSize: { xs: "0.7rem", sm: "1rem" },
                                    }}
                                >
                                    {formatKey(key)}:{" "}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: {
                                            xs: "0.7rem",
                                            sm: "0.9rem",
                                        },
                                    }}
                                >
                                    {value || "N/A"}
                                </Typography>
                            </Box>
                        ))}
                </Box>
            </Box>
        </AdminLayout>
    );
}

function formatKey(key) {
    return key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default AdminSinglePatient;
