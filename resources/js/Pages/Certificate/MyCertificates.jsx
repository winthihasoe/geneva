import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import CertificateForm from "./components/CertificateForm";
import { Box, Button, Container, Typography } from "@mui/material";
import Title from "@/Components/Typo/Title";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Compressor from "compressorjs";
import Certificate from "./components/Certificate";
import NoData from "@/Components/util/NoData";

function MyCertificates({ certificates }) {
    console.log(certificates);

    const [isAdding, setIsAdding] = useState(false);
    const { data, setData, post, processing } = useForm({
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();

        // Append form fields
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
        post(route("certificates.store"), {
            data: formData,
            forceFormData: true, // Required by Inertia for FormData submissions
            onSuccess: () => {
                console.log("Certificate saved successfully!");
                setIsAdding(false); // Close the form after successful submission
            },
            onError: (errors) => {
                console.error("Error saving certificate:", errors);
            },
        });
    };

    // to clear certificate form if isAdding state changed
    useEffect(() => {
        setData({
            training_center_name: "",
            start_date: "",
            duration: "",
            certificateImage: null,
        });
    }, [isAdding]);

    return (
        <AppLayout>
            <Head title="My Certificates" />
            <Container maxWidth="md" sx={{ py: 3 }}>
                <Title>Certificates</Title>
                <Button
                    variant="contained"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => setIsAdding(!isAdding)}
                    sx={{ borderRadius: 10 }}
                >
                    <Typography fontFamily={"Lilita One"} fontSize={15}>
                        {isAdding ? "Cancel" : "Add New"}
                    </Typography>
                </Button>
                {isAdding && (
                    <Box
                        sx={{
                            display: "flex",

                            justifyContent: "center",
                            my: 3,
                        }}
                    >
                        <CertificateForm
                            data={data}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                        />
                    </Box>
                )}
                {(!certificates || certificates.length == 0) && <NoData />}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: { xs: "center", sm: "flex-start" },
                        flexWrap: "wrap",
                        columnGap: 2,
                        rowGap: 3,
                        my: 3,
                    }}
                >
                    {certificates &&
                        certificates.length > 0 &&
                        certificates.map((certificate) => (
                            <Certificate certificate={certificate} />
                        ))}
                </Box>
            </Container>
        </AppLayout>
    );
}

export default MyCertificates;
