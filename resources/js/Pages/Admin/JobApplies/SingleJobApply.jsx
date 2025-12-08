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
                    boxShadow: 3,
                    p: { xs: 2, sm: 3, md: 4 },
                    borderRadius: 2,
                    margin: "auto",
                    my: 2,
                }}
            >
                <Typography
                    sx={{
                        textAlign: "center",
                        fontFamily: "Roboto Slab",
                        fontSize: { xs: 25, sm: 20, md: 25 },
                        fontWeight: "bold",
                        color: "primary.main",
                        mb: 3,
                    }}
                >
                    Job Application Details
                </Typography>

                {/* Display Name */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Name as per Passport</Subtitle>
                    <Typography variant="body2">
                        {apply.name || "N/A"}
                    </Typography>
                </Box>

                {/* Display Date of Birth */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Date of Birth</Subtitle>
                    <Typography variant="body2">
                        {apply.date_of_birth || "N/A"} (
                        <AgeCalculator date={apply?.date_of_birth} /> yrs)
                    </Typography>
                </Box>

                {/* Display Gender */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Gender</Subtitle>
                    <Typography variant="body2">
                        {apply.gender || "N/A"}
                    </Typography>
                </Box>

                {/* Display Height */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Height</Subtitle>
                    <Typography variant="body2">
                        {apply.height ? `${apply.height} cm` : "N/A"}
                    </Typography>
                </Box>

                {/* Display Weight */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Weight</Subtitle>
                    <Typography variant="body2">
                        {apply.weight ? `${apply.weight} kg` : "N/A"}
                    </Typography>
                </Box>

                {/* Display Race */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Race</Subtitle>
                    <Typography variant="body2">
                        {apply.ethnicity || "N/A"}
                    </Typography>
                </Box>

                {/* Display Religion */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Religion</Subtitle>
                    <Typography variant="body2">
                        {apply.religion || "N/A"}
                    </Typography>
                </Box>

                {/* Display Phone */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Phone Number</Subtitle>
                    <Typography variant="body2">
                        {apply.phone || "N/A"}
                    </Typography>
                </Box>

                {/* Display Email */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Email</Subtitle>
                    <Typography variant="body2">
                        {apply.email || "N/A"}
                    </Typography>
                </Box>

                {/* Display Viber */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Viber</Subtitle>
                    <Typography variant="body2">
                        {apply.viber || "N/A"}
                    </Typography>
                </Box>

                {/* Display Current Address */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Current Address</Subtitle>
                    <Typography variant="body2">
                        {apply.current_address || "N/A"}
                    </Typography>
                </Box>

                {/* Display Experience */}
                <Box sx={{ mb: 3 }}>
                    <Subtitle>Experience</Subtitle>
                    <Typography variant="body2">
                        {apply.experience || "N/A"}
                    </Typography>
                </Box>

                {/* Display Passport */}
                {/* <Box sx={{ mb: 3 }}>
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
                </Box> */}

                {/* Display Visa */}
                {/* <Box sx={{ mb: 3 }}>
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
                </Box> */}

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
                {/* <Box sx={{ mb: 3 }}>
                    <Subtitle>Languages</Subtitle>
                    <Typography>{apply.language || "N/A"}</Typography>
                </Box> */}

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
