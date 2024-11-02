import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    LinearProgress,
    Divider,
    Button,
} from "@mui/material";
import BodyText from "@/Components/Typo/BodyText";
import UnderlinedText from "@/Components/Typo/UnderlinedText";
import Compressor from "compressorjs";
import Subtitle from "@/Components/Typo/Subtitle";
import TinyText from "@/Components/Typo/TinyText";

const PersonalIDUploadForm = ({
    data,
    setData,
    oldId,
    oldFamilyRecord,
    oldRefLetter,
}) => {
    const [idUrl, setIdUrl] = useState(oldId ? oldId : null);
    const [familyRecordUrl, setFamilyRecordUrl] = useState(
        oldFamilyRecord ? oldFamilyRecord : null
    );
    const [refLetterUrl, setRefLetterUrl] = useState(
        oldRefLetter ? oldRefLetter : null
    );
    const [idUploading, setIdUploading] = useState(false);
    const [familyRecordUploading, setFamilyRecordUploading] = useState(false);
    const [refLetterUploading, setRefLetterUploading] = useState(false);

    useEffect(() => {
        if (
            data.citizenship_certificate &&
            data.citizenship_certificate instanceof Blob
        ) {
            const newIdPreview = URL.createObjectURL(
                data.citizenship_certificate
            );
            setIdUrl(newIdPreview);

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
            setFamilyRecordUrl(newFamilyRecord);

            // Clean up the object URL when the component unmounts
            return () => {
                URL.revokeObjectURL(newFamilyRecord);
            };
        }
    }, [data.family_member_record]);

    useEffect(() => {
        if (data.reference_letter && data.reference_letter instanceof Blob) {
            const newRefLetter = URL.createObjectURL(data.reference_letter);
            setRefLetterUrl(newRefLetter);

            // Clean up the object URL when the component unmounts
            return () => {
                URL.revokeObjectURL(newRefLetter);
            };
        }
    }, [data.reference_letter]);

    const handleFileChange = (event, type, setUrl, setUploading) => {
        const file = event.target.files[0];
        if (file) {
            setUploading(true);
            // Check if the file is an image

            // Compress the image using Compressor.js
            new Compressor(file, {
                quality: 0.6, // Adjust the quality as needed (0 to 1)
                maxWidth: 600, // Resize to a maximum width of 600px
                success(compressedFile) {
                    if (compressedFile instanceof Blob) {
                        setUrl(URL.createObjectURL(compressedFile));
                        setData((prevData) => ({
                            ...prevData,
                            [type]: compressedFile,
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

    return (
        <Box sx={{ mb: 3, maxWidth: 400, margin: "0 auto" }}>
            <Typography fontWeight="bold" fontSize={13} sx={{ mb: 2 }}>
                Other documents to be uploaded for system keep record / not to
                be shown to public
            </Typography>

            <Box
                sx={{
                    mt: 3,
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: { xs: "wrap", sm: "none" },
                }}
            >
                {/* Citizenship Certificate */}
                <Box
                    sx={{
                        mb: 3,
                        width: 120,
                        textAlign: "center",
                    }}
                >
                    <Subtitle>Citizenship Certificate</Subtitle>

                    {idUrl ? (
                        <img
                            src={idUrl}
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
                                border: "2px solid #1c90a9",
                                borderRadius: 3,
                                margin: "auto",
                            }}
                        />
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
                    <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        size="small"
                        component="label"
                    >
                        <input
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={(e) =>
                                handleFileChange(
                                    e,
                                    "citizenship_certificate",
                                    setIdUrl,
                                    setIdUploading
                                )
                            }
                            hidden
                        />
                        <Typography fontSize={13}>Choose photo</Typography>
                    </Button>
                </Box>

                {/* Family Member Record */}
                <Box
                    sx={{
                        mb: 3,
                        width: 120,
                        textAlign: "center",
                    }}
                >
                    <Subtitle>Family Member Record</Subtitle>

                    {familyRecordUrl ? (
                        <img
                            src={familyRecordUrl}
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
                                border: "2px solid #1c90a9",
                                borderRadius: 3,
                                margin: "auto",
                            }}
                        />
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
                    <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        size="small"
                        component="label"
                    >
                        <input
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={(e) =>
                                handleFileChange(
                                    e,
                                    "family_member_record",
                                    setFamilyRecordUrl,
                                    setFamilyRecordUploading
                                )
                            }
                            hidden
                        />
                        <Typography fontSize={13}>Choose photo</Typography>
                    </Button>
                </Box>

                {/* Reference Letter */}
                <Box sx={{ textAlign: "center", width: 110 }}>
                    <Subtitle>Reference Letter</Subtitle>
                    {refLetterUrl ? (
                        <img
                            src={refLetterUrl}
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
                                border: "2px solid #1c90a9",
                                borderRadius: 3,
                                margin: "auto",
                            }}
                        />
                    )}
                    {refLetterUploading && (
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
                    <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        size="small"
                        component="label"
                    >
                        <input
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={(e) =>
                                handleFileChange(
                                    e,
                                    "reference_letter",
                                    setRefLetterUrl,
                                    setRefLetterUploading
                                )
                            }
                            hidden
                        />
                        <Typography fontSize={13}>Choose photo</Typography>
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
