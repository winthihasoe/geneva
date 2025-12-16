import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Compressor from "compressorjs";
import CertificateForm from "@/Pages/Certificate/components/CertificateForm";

function StepFour({ certificates }) {
    const [isAdding, setIsAdding] = useState(false);
    const [preview, setPreview] = useState(null);

    const { data, setData, post, processing, errors, setError, reset } =
        useForm({
            qualification_type: "",
            training_center_name: "",
            course: "",
            start_date: "",
            duration: "",
            certificate_photo: null,
        });

    // Function to handle image compression and resizing
    const resizeImage = (file) => {
        return new Promise((resolve, reject) => {
            new Compressor(file, {
                quality: 0.6, // Adjust the quality (0 to 1) for compression level
                maxWidth: 600, // Max width in pixels
                success: (compressedResult) => {
                    resolve(compressedResult);
                },
                error: (err) => {
                    console.error("Image compression error:", err);
                    reject(err);
                },
            });
        });
    };

    // Handle form data change, including file input
    const handleChange = async (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file" && files[0]) {
            try {
                const resizedImage = await resizeImage(files[0]); // Resize the selected file
                setData((prevData) => ({
                    ...prevData,
                    certificateImage: resizedImage, // Store the resized file
                }));
                const previewUrl = URL.createObjectURL(files[0]);
                setPreview(previewUrl); // Set the preview URL
            } catch (error) {
                console.error("Failed to resize image:", error);
            }
        } else {
            setData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    // Clear form function
    const clearForm = () => {
        reset(); // Reset form data to initial state
        setError({}); // Clear any errors
        setPreview(null); // Clear the preview image
        window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate the qualification_type field
        if (!data.qualification_type) {
            setError("qualification_type", "Qualification type is required.");
            return;
        }

        const formData = new FormData();

        // Append form fields
        formData.append("qualification_type", data.qualification_type);
        formData.append("training_center_name", data.training_center_name);
        formData.append("course", data.course);
        formData.append("start_date", data.start_date);
        formData.append("duration", data.duration);

        // Append the compressed image if it exists
        if (data.certificate_photo) {
            formData.append(
                "certificate_photo",
                data.certificate_photo,
                data.certificate_photo.name
            );
        }

        // Submit using Inertia's post method
        post(route("certificate.store"), {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                clearForm(); // Clear form and scroll to top
                // Optional: Show success message
            },
            onError: (errors) => {
                console.error("Error saving certificate:", errors);
                setError(errors);
            },
        });
    };

    return (
        <Box sx={{ margin: "auto", maxWidth: 400 }}>
            {/* <CertificateForm
                data={data}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                errors={errors}
                preview={preview}
                setPreview={setPreview}
            /> */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    height: 300,
                }}
            >
                <Typography textAlign={"center"} variant="h6" sx={{ mb: 2 }}>
                    Qualification can be added after creating CV.
                </Typography>
                <Typography
                    textAlign={"center"}
                    variant="body2"
                    color="text.secondary"
                >
                    Please proceed to the next step.
                </Typography>
            </Box>
        </Box>
    );
}

export default StepFour;
