import React, { useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle";
import BodyText from "@/Components/Typo/BodyText";
import { router } from "@inertiajs/react";

const TransferForm = () => {
    const [showForm, setShowForm] = useState(false);
    const [fileName, setFileName] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            setSelectedFile(file);
            setError(null); // Reset error when a new file is selected
        }
    };

    const handleFileUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("transfer_form", selectedFile);

            router.post(route("storeTransferForm"), formData, {
                forceFormData: true,
                onSuccess: () => {
                    alert("Transfer file uploaded successfully.");
                    setSelectedFile(null); // Clear selected file after upload
                },
                onError: (errors) => {
                    setError(errors);
                    console.log(errors);
                },
            });
        } else {
            setError({ transfer_form: "Please select a file to upload." });
        }
    };

    return (
        <>
            {!showForm ? (
                <Box sx={{ mt: 4 }}>
                    <Divider sx={{ my: 2 }} />
                    <Subtitle>
                        I'm in Singapore now and My Employer agree to my
                        Transfer
                    </Subtitle>
                    {fileName && (
                        <Typography fontSize={12} sx={{ mb: 2 }}>
                            File name: {fileName}
                        </Typography>
                    )}
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2,
                            mb: 2,
                        }}
                    >
                        {/* <Box>
                            <Button
                                variant="contained"
                                color="primary"
                                component="label"
                                sx={{
                                    backgroundColor: "#90CAF9",
                                    color: "black",
                                }}
                                size="small"
                            >
                                Select Transfer Form
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*, .pdf"
                                    onChange={handleFileChange}
                                />
                            </Button>{" "}
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleFileUpload}
                                size="small"
                                disabled={!selectedFile} // Disable upload button if no file is selected
                            >
                                Upload
                            </Button>
                        </Box> */}

                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => setShowForm(true)}
                            size="small"
                        >
                            I want to submit later
                        </Button>
                    </Box>

                    {error?.transfer_form && (
                        <Typography fontSize={11} color="error">
                            {error.transfer_form}
                        </Typography>
                    )}
                    <Typography fontSize={11} color="textSecondary">
                        Accept .JPG, .JPEG, .PNG, .PDF
                    </Typography>
                </Box>
            ) : (
                <Box>
                    <Box sx={{ border: "1px solid #ddd", p: 2 }}>
                        <Subtitle>Reminder</Subtitle>
                        <BodyText>
                            You may continue with this application. We will only
                            contact you after the Transfer Form is submitted.
                        </BodyText>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            width: 300,
                            margin: "20px auto",
                        }}
                    >
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() =>
                                window.open(
                                    "https://form.jotform.com/203047254200036",
                                    "_blank"
                                )
                            }
                        >
                            Get Transfer Form
                        </Button>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default TransferForm;
