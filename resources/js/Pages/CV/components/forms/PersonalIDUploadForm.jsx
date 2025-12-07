import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, LinearProgress, Button } from "@mui/material";
import Compressor from "compressorjs";
import Subtitle from "@/Components/Typo/Subtitle";
import TinyText from "@/Components/Typo/TinyText";
import CvContext from "@/Context/CvContext";

const PersonalIDUploadForm = ({ oldId, oldFamilyRecord }) => {
    const { data, setData } = useContext(CvContext);
    const [idPreview, setidPreview] = useState(
        oldId
            ? oldId
            : typeof data.citizenship_certificate === "string"
            ? `/storage/${data.citizenship_certificate}`
            : null
    );

    const [familyRecordPreview, setFamilyRecordPreview] = useState(
        oldFamilyRecord
            ? oldFamilyRecord
            : typeof data.family_member_record === "string"
            ? `/storage/${data.family_member_record}`
            : null
    );

    console.log("id preview", idPreview);

    const [idUploading, setIdUploading] = useState(false);
    const [familyRecordUploading, setFamilyRecordUploading] = useState(false);
    const [error, setError] = useState(null);

    const handleIdChange = (event) => {
        const file = event.target.files[0];
        setError(null);

        if (file) {
            setIdUploading(true);

            // Compress the image using Compressor.js
            new Compressor(file, {
                quality: 0.6, // Adjust the quality as needed (0 to 1)
                maxWidth: 600, // Resize to a maximum width of 600px
                success(compressedFile) {
                    if (compressedFile instanceof Blob) {
                        setidPreview(URL.createObjectURL(compressedFile));
                        setData((prevData) => ({
                            ...prevData,
                            citizenship_certificate: compressedFile,
                        }));
                    } else {
                        console.error("Compression error:", err.message);
                    }

                    setIdUploading(false);
                    uploadIdPhoto(compressedFile);
                },
                error(err) {
                    console.error("Compression error:", err.message);
                    setPassportUploading(false);
                    setError(err);
                },
            });
        }
    };

    const handleFamilyRecordChange = (event) => {
        const file = event.target.files[0];
        setError(null);

        if (file) {
            setFamilyRecordUploading(true);

            // Compress the image using Compressor.js
            new Compressor(file, {
                quality: 0.6, // Adjust the quality as needed (0 to 1)
                maxWidth: 600, // Resize to a maximum width of 600px
                success(compressedFile) {
                    if (compressedFile instanceof Blob) {
                        setFamilyRecordPreview(
                            URL.createObjectURL(compressedFile)
                        );
                        setData((prevData) => ({
                            ...prevData,
                            family_member_record: compressedFile,
                        }));
                    } else {
                        console.error("Compression error:", err.message);
                    }

                    setFamilyRecordUploading(false);
                    uploadFamilyRecordPhoto(compressedFile);
                },
                error(err) {
                    console.error("Compression error:", err.message);
                    setPassportUploading(false);
                    setError(err);
                },
            });
        }
    };

    const [uploadIdMessage, setUploadIdMessage] = useState("");
    const [uploadFamilyRecordMessage, setUploadFamilyRecordMessage] =
        useState("");

    // Function to handle the photo upload
    const uploadIdPhoto = async (photoFile) => {
        const formData = new FormData();
        formData.append("citizenship_certificate", photoFile, photoFile.name);

        try {
            const response = await axios.post(route("cv.store"), formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setUploadIdMessage(response.data.message);
            setTimeout(() => setUploadIdMessage(""), 2000); // Clear message after 2 seconds
        } catch (error) {
            console.error("Error uploading photo:", error);
            setUploadIdMessage("Failed to upload photo.");
            setTimeout(() => setUploadIdMessage(""), 2000); // Clear message after 2 seconds
        } finally {
            setIdUploading(false); // Stop uploading indicator
        }
    };

    // Function to handle the photo upload
    const uploadFamilyRecordPhoto = async (photoFile) => {
        const formData = new FormData();
        formData.append("family_member_record", photoFile, photoFile.name);

        try {
            const response = await axios.post(route("cv.store"), formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setUploadFamilyRecordMessage(response.data.message);
            setTimeout(() => setUploadFamilyRecordMessage(""), 2000); // Clear message after 2 seconds
        } catch (error) {
            console.error("Error uploading photo:", error);
            setUploadFamilyRecordMessage("Failed to upload photo.");
            setTimeout(() => setUploadFamilyRecordMessage(""), 2000); // Clear message after 2 seconds
        } finally {
            setFamilyRecordUploading(false); // Stop uploading indicator
        }
    };

    useEffect(() => {
        if (
            data.citizenship_certificate &&
            data.citizenship_certificate instanceof Blob
        ) {
            const newIdPreview = URL.createObjectURL(
                data.citizenship_certificate
            );
            setidPreview(newIdPreview);

            // Clean up the object URL when the component unmounts
            return () => {
                URL.revokeObjectURL(newIdPreview);
            };
        }
    }, [data.citizenship_certificate]);

    useEffect(() => {
        if (
            data.family_member_record &&
            data.family_member_record instanceof Blob
        ) {
            const newFamilyRecord = URL.createObjectURL(
                data.family_member_record
            );
            setFamilyRecordPreview(newFamilyRecord);

            // Clean up the object URL when the component unmounts
            return () => {
                URL.revokeObjectURL(newFamilyRecord);
            };
        }
    }, [data.family_member_record]);

    return (
        <Box sx={{ mb: 3, maxWidth: 500, margin: "0 auto" }}>
            {/* <Typography fontWeight="bold" fontSize={13} sx={{ mb: 2 }}>
                Other documents to be uploaded for system keep record / not to
                be shown to public
            </Typography> */}

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                    justifyContent: "center",
                    mb: 4,
                    borderBottom: "1px solid #ccc",
                    pb: 3,
                }}
            >
                {/* Citizenship Certificate */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: { xs: 140, sm: 170, md: 200 },
                    }}
                >
                    <Typography variant="body1" fontWeight="bold" mb={2}>
                        National Identification
                    </Typography>

                    {(data.citizenship_certificate &&
                        data.citizenship_certificate !== "") ||
                    oldId ? (
                        <img
                            src={idPreview ? idPreview : oldId}
                            style={{
                                width: "140px",
                                height: "130px",
                                border: "2px solid #1c90a9",
                                borderRadius: "16px",
                                objectFit: "cover",
                                objectPosition: "center",
                                margin: "auto",
                            }}
                        />
                    ) : (
                        <Box
                            sx={{
                                width: "140px",
                                height: "130px",
                                border: "2px solid gray",
                                borderRadius: 3,
                                margin: "auto",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "grey.50",
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                No photo
                            </Typography>
                        </Box>
                    )}
                    {idUploading && (
                        <Box sx={{ width: "100px", mb: 1 }}>
                            <LinearProgress />
                            <Typography
                                fontSize={12}
                                sx={{ textAlign: "center" }}
                            >
                                Compressing...
                            </Typography>
                        </Box>
                    )}
                    {uploadIdMessage && (
                        <Typography
                            fontSize={{ xs: 11, sm: 12, md: 13 }}
                            fontWeight={600}
                            mb={2}
                        >
                            {uploadIdMessage}
                        </Typography>
                    )}
                    <Button
                        variant="outlined"
                        sx={{ mt: 2 }}
                        size="small"
                        component="label"
                    >
                        <input
                            type="file"
                            accept=".jpg, .jpeg, .png, .heic"
                            onChange={handleIdChange}
                            hidden
                        />
                        <Typography fontSize={13}>Choose</Typography>
                    </Button>
                </Box>

                {/* Family Member Record */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: { xs: 140, sm: 170, md: 200 },
                    }}
                >
                    <Typography variant="body1" fontWeight="bold" mb={2}>
                        Family Member Record
                    </Typography>

                    {(data.family_member_record &&
                        data.family_member_record !== "") ||
                    oldFamilyRecord ? (
                        <img
                            src={
                                familyRecordPreview
                                    ? familyRecordPreview
                                    : oldFamilyRecord
                            }
                            style={{
                                width: "140px",
                                height: "130px",
                                border: "2px solid #1c90a9",
                                borderRadius: "16px",
                                objectFit: "cover",
                                objectPosition: "center",
                                margin: "auto",
                            }}
                        />
                    ) : (
                        <Box
                            sx={{
                                width: "140px",
                                height: "130px",
                                border: "2px solid gray",
                                borderRadius: 3,
                                margin: "auto",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "grey.50",
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                No photo
                            </Typography>
                        </Box>
                    )}
                    {familyRecordUploading && (
                        <Box sx={{ width: "100px", mb: 1 }}>
                            <LinearProgress />
                            <Typography
                                fontSize={12}
                                sx={{ textAlign: "center" }}
                            >
                                Compressing...
                            </Typography>
                        </Box>
                    )}
                    {uploadFamilyRecordMessage && (
                        <Typography
                            fontSize={{ xs: 11, sm: 12, md: 13 }}
                            fontWeight={600}
                            mb={2}
                        >
                            {uploadFamilyRecordMessage}
                        </Typography>
                    )}
                    <Button
                        variant="outlined"
                        sx={{ mt: 2 }}
                        size="small"
                        component="label"
                    >
                        <input
                            type="file"
                            accept=".jpg, .jpeg, .png, .heic"
                            onChange={handleFamilyRecordChange}
                            hidden
                        />
                        <Typography fontSize={13}>Choose</Typography>
                    </Button>
                </Box>
            </Box>
            <Box textAlign={"center"}>
                <TinyText>Accept .jpg, .jpeg, .png file type.</TinyText>
            </Box>
        </Box>
    );
};

export default PersonalIDUploadForm;
