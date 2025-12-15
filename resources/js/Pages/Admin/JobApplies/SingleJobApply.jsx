import BackButton from "@/Components/BackButton";
import AgeCalculator from "@/Components/util/AgeCalculator";
import ImageDialog from "@/Components/util/ImageDialog";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import {
    Box,
    Typography,
    FormControl,
    Select,
    MenuItem,
    Button,
    Chip,
} from "@mui/material";
import React, { useState } from "react";

function SingleJobApply({ apply }) {
    const [openImage, setOpenImage] = useState(false);
    const handleOpenImage = () => setOpenImage(true);
    const handleCloseImage = () => setOpenImage(false);

    const [selectedImage, setSelectedImage] = useState("");
    const [status, setStatus] = useState(apply.status || "Pending");

    const handleStatusUpdate = () => {
        router.put(
            route("admin.job.apply.update.status", apply.id),
            { status },
            {
                preserveScroll: true,
            }
        );
    };

    const InfoRow = ({ label, value }) => (
        <Box
            sx={{
                display: "flex",
                mb: 2,
                borderBottom: "1px solid #e0e0e0",
                pb: 1,
            }}
        >
            <Typography
                sx={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "text.secondary",
                    minWidth: "140px",
                }}
            >
                {label}:
            </Typography>
            <Typography
                sx={{
                    fontSize: "0.875rem",
                    color: "text.primary",
                    flex: 1,
                }}
            >
                {value || "N/A"}
            </Typography>
        </Box>
    );

    return (
        <AdminLayout>
            <Head title={apply.name} />
            <BackButton />
            <Box
                sx={{
                    maxWidth: 700,
                    boxShadow: 3,
                    p: { xs: 2, sm: 3, md: 4 },
                    borderRadius: 2,
                    margin: "auto",
                    my: 2,
                    bgcolor: "background.paper",
                }}
            >
                <Typography
                    sx={{
                        textAlign: "center",
                        fontFamily: "Roboto Slab",
                        fontSize: { xs: "1.25rem", sm: "1.5rem" },
                        fontWeight: "bold",
                        color: "primary.main",
                        mb: 3,
                    }}
                >
                    Job Application Details
                </Typography>

                {/* Status Update Section */}
                <Box
                    sx={{
                        mb: 4,
                        p: 2,
                        bgcolor: "grey.50",
                        borderRadius: 2,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            mb: 2,
                            color: "text.secondary",
                        }}
                    >
                        Application Status
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            alignItems: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <FormControl size="small" sx={{ minWidth: 180 }}>
                            <Select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Contacted">Contacted</MenuItem>
                                <MenuItem value="Uncontactable">
                                    Uncontactable
                                </MenuItem>
                                <MenuItem value="Refuse job">
                                    Refuse Job
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleStatusUpdate}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>

                {/* Personal Information */}
                <Typography
                    sx={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        mb: 2,
                        color: "primary.main",
                    }}
                >
                    Personal Information
                </Typography>

                <InfoRow label="Name" value={apply.name} />
                <InfoRow
                    label="Date of Birth"
                    value={apply.date_of_birth ? apply.date_of_birth : "N/A"}
                />
                <InfoRow label="Gender" value={apply.gender} />
                <InfoRow
                    label="Height"
                    value={apply.height ? `${apply.height} cm` : null}
                />
                <InfoRow
                    label="Weight"
                    value={apply.weight ? `${apply.weight} kg` : null}
                />
                <InfoRow label="Race" value={apply.ethnicity} />
                <InfoRow label="Religion" value={apply.religion} />

                {/* Contact Information */}
                <Typography
                    sx={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        mb: 2,
                        mt: 3,
                        color: "primary.main",
                    }}
                >
                    Contact Information
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        mb: 2,
                        borderBottom: "1px solid #e0e0e0",
                        pb: 1,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            color: "text.secondary",
                            minWidth: "140px",
                        }}
                    >
                        Phone Number:
                    </Typography>
                    <Typography
                        component="a"
                        href={`tel:${apply.phone}`}
                        sx={{
                            fontSize: "0.875rem",
                            color: "primary.main",
                            flex: 1,
                            textDecoration: "none",
                            cursor: "pointer",
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        {apply.phone || "N/A"}
                    </Typography>
                </Box>
                <InfoRow label="Email" value={apply.email} />
                <InfoRow label="Viber" value={apply.viber} />
                <InfoRow
                    label="Current Address"
                    value={apply.current_address}
                />

                {/* Service Area */}
                <Typography
                    sx={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        mb: 2,
                        mt: 3,
                        color: "primary.main",
                    }}
                >
                    Service Preferences
                </Typography>

                <InfoRow label="Service Area" value={apply.service_area} />

                {apply.available_townships &&
                    apply.available_townships.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                            <Typography
                                sx={{
                                    fontSize: "0.875rem",
                                    fontWeight: 600,
                                    color: "text.secondary",
                                    mb: 1,
                                }}
                            >
                                Available Townships:
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 1,
                                }}
                            >
                                {apply.available_townships.map(
                                    (township, index) => (
                                        <Chip
                                            key={index}
                                            label={township}
                                            size="small"
                                            variant="outlined"
                                        />
                                    )
                                )}
                            </Box>
                        </Box>
                    )}

                {/* Professional Information */}
                <Typography
                    sx={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        mb: 2,
                        mt: 3,
                        color: "primary.main",
                    }}
                >
                    Professional Information
                </Typography>

                <InfoRow label="Experience" value={apply.experience} />
                <InfoRow
                    label="Qualifications"
                    value={apply.certificate_details}
                />

                {/* Documents */}
                <Typography
                    sx={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        mb: 2,
                        mt: 3,
                        color: "primary.main",
                    }}
                >
                    Documents
                </Typography>

                {/* National ID */}
                <Box sx={{ mb: 3 }}>
                    <Typography
                        sx={{
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            color: "text.secondary",
                            mb: 1,
                        }}
                    >
                        National ID
                    </Typography>
                    {apply.passport ? (
                        <Box
                            onClick={() => {
                                setSelectedImage(apply.passport);
                                handleOpenImage();
                            }}
                            sx={{ cursor: "pointer" }}
                        >
                            <img
                                src={`/storage/${apply.passport}`}
                                alt="Passport"
                                style={{
                                    width: "200px",
                                    height: "auto",
                                    borderRadius: "8px",
                                    border: "1px solid #e0e0e0",
                                }}
                            />
                        </Box>
                    ) : (
                        <Typography sx={{ fontSize: "0.875rem" }}>
                            No ID Uploaded
                        </Typography>
                    )}
                </Box>

                {/* Family Member Record */}
                <Box sx={{ mb: 3 }}>
                    <Typography
                        sx={{
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            color: "text.secondary",
                            mb: 1,
                        }}
                    >
                        Family Member Record
                    </Typography>
                    {apply.visa ? (
                        <Box
                            onClick={() => {
                                setSelectedImage(apply.visa);
                                handleOpenImage();
                            }}
                            sx={{ cursor: "pointer" }}
                        >
                            <img
                                src={`/storage/${apply.visa}`}
                                alt="Visa"
                                style={{
                                    width: "200px",
                                    height: "auto",
                                    borderRadius: "8px",
                                    border: "1px solid #e0e0e0",
                                }}
                            />
                        </Box>
                    ) : (
                        <Typography sx={{ fontSize: "0.875rem" }}>
                            No Record Uploaded
                        </Typography>
                    )}
                </Box>

                {/* Certificates */}
                <Box sx={{ mb: 3 }}>
                    <Typography
                        sx={{
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            color: "text.secondary",
                            mb: 1,
                        }}
                    >
                        Certificates
                    </Typography>
                    {apply.certificates && apply.certificates.length > 0 ? (
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 2,
                            }}
                        >
                            {apply.certificates.map((src, index) => (
                                <Box
                                    onClick={() => {
                                        setSelectedImage(src);
                                        handleOpenImage();
                                    }}
                                    key={index}
                                    sx={{ cursor: "pointer" }}
                                >
                                    <img
                                        src={`/storage/${src}`}
                                        alt={`Certificate ${index + 1}`}
                                        style={{
                                            width: "120px",
                                            height: "120px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                            border: "1px solid #e0e0e0",
                                        }}
                                    />
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        <Typography sx={{ fontSize: "0.875rem" }}>
                            No Certificates Uploaded
                        </Typography>
                    )}
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
