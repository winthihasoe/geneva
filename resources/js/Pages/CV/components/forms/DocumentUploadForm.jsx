import React, { useEffect, useState } from "react";
import { Box, Button, Typography, LinearProgress, Grid } from "@mui/material";
import Compressor from "compressorjs";
import Subtitle from "@/Components/Typo/Subtitle";
import TinyText from "@/Components/Typo/TinyText";

const DocumentUploadForm = ({ data, setData, oldPassport, oldEduCert }) => {
    const [passportPreview, setPassportPreview] = useState(
        oldPassport ? oldPassport : null
    );

    const [eduCertPreview, setEduCertPreview] = useState(
        oldEduCert ? oldEduCert : null
    );

    const [passportUploading, setPassportUploading] = useState(false);
    const [eduCertUploading, setEduCertUploading] = useState(false);
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
                        setUploading(false); // Hide the progress bar on error
                    }

                    setPassportUploading(false);
                },
                error(err) {
                    console.error("Compression error:", err.message);
                    setPassportUploading(false);
                },
            });
        }
    };

    const handleEducationCertificateChange = (event) => {
        const file = event.target.files[0];
        setError(null);

        if (file) {
            setEduCertUploading(true);

            // Compress the image using Compressor.js
            new Compressor(file, {
                quality: 0.6, // Adjust the quality as needed (0 to 1)
                maxWidth: 600, // Resize to a maximum width of 600px
                success(compressedFile) {
                    if (compressedFile instanceof Blob) {
                        setEduCertPreview(URL.createObjectURL(compressedFile));
                        setData((prevData) => ({
                            ...prevData,
                            education_certificate: compressedFile,
                        }));
                    } else {
                        console.error("Compressed file is not a valid Blob");
                    }
                    setEduCertUploading(false);
                },
                error(err) {
                    console.error("Compression error:", err.message);
                    setEduCertUploading(false);
                },
            });
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

    useEffect(() => {
        if (
            data.education_certificate &&
            data.education_certificate instanceof Blob
        ) {
            const newEduCertPreview = URL.createObjectURL(
                data.education_certificate
            );
            setEduCertPreview(newEduCertPreview);

            // Clean up the object URL when the component unmounts
            return () => {
                URL.revokeObjectURL(newEduCertPreview);
            };
        }
    }, [data.education_certificate]);

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

            <Grid
                container
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 1,
                }}
            >
                <Grid item xs={4}>
                    <Box
                        sx={{
                            mb: 2,
                            textAlign: "center",
                        }}
                    >
                        <Subtitle>Passport</Subtitle>
                        {data.passport !== null || oldPassport ? (
                            <img
                                src={
                                    passportPreview
                                        ? passportPreview
                                        : oldPassport
                                }
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    border: "2px solid #1c90a9",
                                    borderRadius: 3,
                                    objectFit: "cover",
                                    objectPosition: "center",
                                    margin: "auto",
                                }}
                            />
                        ) : (
                            <Box
                                sx={{
                                    width: "100px",
                                    height: "100px",
                                    border: "2px solid gray",
                                    borderRadius: 3,
                                    margin: "auto",
                                }}
                            />
                        )}
                        {passportUploading && (
                            <Box sx={{ width: "100px", mb: 2 }}>
                                <LinearProgress />
                                <Typography
                                    fontSize={12}
                                    sx={{ textAlign: "center" }}
                                >
                                    Compressing...
                                </Typography>
                            </Box>
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
                                Choose file
                            </Typography>
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={7}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        <Subtitle>Educational Certificate</Subtitle>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                flexWrap: "wrap",
                                alignItems: "flex-start",
                            }}
                        >
                            {(data.education_certificate !== null ||
                                oldEduCert) && (
                                <Box>
                                    <img
                                        src={
                                            eduCertPreview
                                                ? eduCertPreview
                                                : oldEduCert
                                        }
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            border: "2px solid gray",
                                            borderRadius: "12px",
                                            objectFit: "cover",
                                            objectPosition: "center",
                                            margin: "auto",
                                            overflow: "hidden",
                                        }}
                                    />
                                </Box>
                            )}

                            <Box textAlign={"center"}>
                                <Box
                                    sx={{
                                        width: "100px",
                                        height: "100px",
                                        border: "2px solid gray",
                                        borderRadius: 3,
                                        margin: "auto",
                                    }}
                                />

                                {eduCertUploading && (
                                    <Box sx={{ width: "100px", my: 1 }}>
                                        <LinearProgress />
                                        <Typography
                                            fontSize={12}
                                            sx={{ textAlign: "center" }}
                                        >
                                            Compressing...
                                        </Typography>
                                    </Box>
                                )}
                                <Button
                                    variant="contained"
                                    sx={{ mt: 2 }}
                                    size="small"
                                    component="label"
                                >
                                    <Typography
                                        textAlign={"center"}
                                        fontSize={12}
                                    >
                                        Choose file
                                    </Typography>
                                    <input
                                        type="file"
                                        accept=".jpg, .jpeg, .png"
                                        onChange={
                                            handleEducationCertificateChange
                                        }
                                        hidden
                                    />
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Box textAlign={"center"}>
                <TinyText>Accept .jpg, .jpeg, .png file type.</TinyText>
            </Box>
        </Box>
    );
};

export default DocumentUploadForm;
