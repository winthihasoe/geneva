import BackButton from "@/Components/BackButton";
import Subtitle from "@/Components/Typo/Subtitle";
import AgeCalculator from "@/Components/util/AgeCalculator";
import ImageDialog from "@/Components/util/ImageDialog";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";

function SingleJobApply({ apply }) {
    const [openImage, setOpenImage] = useState(false); // State for image modal
    const handleOpenImage = () => setOpenImage(true); // Open image modal
    const handleCloseImage = () => setOpenImage(false); // Close image modal

    const [selectedImage, setSelectedImage] = useState("");

    return (
        <AdminLayout>
            <Head title={apply.name} />
            <BackButton />
            <Box
                sx={{
                    maxWidth: 450,
                    border: { xs: "none", sm: "4px solid" },
                    borderColor: { xs: "", sm: "primary.main" },
                    p: { xs: 2, sm: 3, md: 4 },
                    borderRadius: 10,
                    margin: "auto",
                }}
            >
                <Typography
                    sx={{
                        textAlign: "center",
                        fontFamily: "Abhaya Libre",
                        fontSize: { xs: 25, sm: 20, md: 25 },
                        fontWeight: "bold",
                        color: "primary.main",
                        mb: 2,
                    }}
                >
                    Job Application Details
                </Typography>

                {/* Display Name */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Name as per Passport</Subtitle>
                    <Typography>{apply.name || "N/A"}</Typography>
                </Box>

                {/* Display Date of Birth */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Date of Birth</Subtitle>
                    <Typography>
                        {apply.date_of_birth || "N/A"} (
                        <AgeCalculator date={apply?.date_of_birth} /> yrs)
                    </Typography>
                </Box>

                {/* Display Gender */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Gender</Subtitle>
                    <Typography>{apply.gender || "N/A"}</Typography>
                </Box>

                {/* Display Height */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Height</Subtitle>
                    <Typography>
                        {apply.height ? `${apply.height} cm` : "N/A"}
                    </Typography>
                </Box>

                {/* Display Weight */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Weight</Subtitle>
                    <Typography>
                        {apply.weight ? `${apply.weight} kg` : "N/A"}
                    </Typography>
                </Box>

                {/* Display Nationality */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Nationality</Subtitle>
                    <Typography>{apply.nationality || "N/A"}</Typography>
                </Box>

                {/* Display Religion */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Religion</Subtitle>
                    <Typography>{apply.religion || "N/A"}</Typography>
                </Box>

                {/* Display Phone */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Phone Number</Subtitle>
                    <Typography>{apply.phone || "N/A"}</Typography>
                </Box>

                {/* Display Email */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Email</Subtitle>
                    <Typography>{apply.email || "N/A"}</Typography>
                </Box>

                {/* Display Line */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Line ID</Subtitle>
                    <Typography>{apply.line || "N/A"}</Typography>
                </Box>

                {/* Display Current Address */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Current Address</Subtitle>
                    <Typography>{apply.current_address || "N/A"}</Typography>
                </Box>

                {/* Display Experience */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Experience</Subtitle>
                    <Typography>{apply.experience || "N/A"}</Typography>
                </Box>

                {/* Display Passport */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Passport</Subtitle>
                    {apply.passport ? (
                        <Box
                            onClick={() => {
                                setSelectedImage(apply.passport);
                                handleOpenImage();
                            }}
                        >
                            <img
                                src={`/storage/${apply.passport}`}
                                alt="Passport"
                                style={{
                                    marginTop: "10px",
                                    width: "100%",
                                    borderRadius: "8px",
                                }}
                            />
                        </Box>
                    ) : (
                        <Typography>No Passport Uploaded</Typography>
                    )}
                </Box>

                {/* Display Visa */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Visa</Subtitle>
                    {apply.visa ? (
                        <Box
                            onClick={() => {
                                setSelectedImage(apply.visa);
                                handleOpenImage();
                            }}
                        >
                            <img
                                src={`/storage/${apply.visa}`}
                                alt="Visa"
                                style={{
                                    marginTop: "10px",
                                    width: "100%",
                                    borderRadius: "8px",
                                }}
                            />
                        </Box>
                    ) : (
                        <Typography>No Visa Uploaded</Typography>
                    )}
                </Box>

                {/* Display Certificates */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Certificates</Subtitle>
                    {apply.certificates && apply.certificates.length > 0 ? (
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "10px",
                                marginTop: "10px",
                            }}
                        >
                            {apply.certificates.map((src, index) => (
                                <Box
                                    onClick={() => {
                                        setSelectedImage(src);
                                        handleOpenImage();
                                    }}
                                    key={index}
                                >
                                    <img
                                        src={`/storage/${src}`}
                                        alt={`Certificate ${index + 1}`}
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                        }}
                                    />
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        <Typography>No Certificates Uploaded</Typography>
                    )}
                </Box>

                {/* Display Language */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Languages</Subtitle>
                    <Typography>{apply.language || "N/A"}</Typography>
                </Box>

                {/* Display Certificate Details */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Certificate/Diploma/Degree Details</Subtitle>
                    <Typography>
                        {apply.certificate_details || "N/A"}
                    </Typography>
                </Box>
            </Box>
            <BackButton />
            {/* Image Dialog */}
            <ImageDialog
                open={openImage}
                onClose={handleCloseImage}
                imageSrc={`/storage/${selectedImage}`}
            />
        </AdminLayout>
    );
}

export default SingleJobApply;
