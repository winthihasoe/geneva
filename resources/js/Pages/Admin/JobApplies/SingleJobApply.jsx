import BackButton from "@/Components/BackButton";
import ImageDialog from "@/Components/util/ImageDialog";
import AdminLayout from "@/Layouts/AdminLayout";
import JobApplyCvPanel from "@/Pages/Admin/JobApplies/components/JobApplyCvPanel";
import JobApplyPipelineFields, {
    interviewerNames,
} from "@/Pages/Admin/JobApplies/components/JobApplyPipelineFields";
import { Head, useForm } from "@inertiajs/react";
import { Box, Typography, Button, Chip } from "@mui/material";
import React, { useState } from "react";

function SingleJobApply({
    apply,
    branches = [],
    genders = [],
    staff = [],
    decisions = [],
    matchingCvs = [],
}) {
    const [openImage, setOpenImage] = useState(false);
    const handleOpenImage = () => setOpenImage(true);
    const handleCloseImage = () => setOpenImage(false);

    const [selectedImage, setSelectedImage] = useState("");
    const listUrl =
        (typeof window !== "undefined" &&
            sessionStorage.getItem("admin.job.apply.return")) ||
        route("admin.job.apply");
    const { data, setData, put, processing, errors } = useForm({
        name: apply.name || "",
        service_area: apply.service_area || "Yangon",
        phone: apply.phone || "",
        gender: apply.gender || "",
        date_of_birth: apply.date_of_birth || "",
        coordinated_by: apply.coordinated_by || "",
        interviewed_by: interviewerNames(apply.interviewed_by),
        cv_reported_date: apply.cv_reported_date || "",
        interview_date: apply.interview_date || "",
        training_start_date: apply.training_start_date || "",
        assessment_date: apply.assessment_date || "",
        interview_score: apply.interview_score || "",
        interview_score_note: apply.interview_score_note || "",
        interview_note: apply.interview_note || "",
        decision: apply.decision || "pending",
        assessment_score: apply.assessment_score || "",
        training_note: apply.training_note || "",
        assessment_note: apply.assessment_note || "",
        notes: apply.notes || "",
    });

    const handlePipelineSubmit = (event) => {
        event.preventDefault();
        if (event.target !== event.currentTarget) {
            return;
        }
        put(route("admin.job.apply.update", apply.id), {
            preserveScroll: true,
        });
    };

    const InfoRow = ({ label, value }) => (
        <Box
            sx={{
                display: "flex",
                mb: 1.25,
                borderBottom: "1px solid #e0e0e0",
                pb: 0.75,
                gap: 1,
            }}
        >
            <Typography
                sx={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "text.secondary",
                    minWidth: "128px",
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
            <BackButton route={listUrl} label="Job Applies" />
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "minmax(280px, 0.9fr) minmax(0, 1.15fr)",
                    },
                    gap: 2,
                    alignItems: "start",
                    my: 2,
                }}
            >
            <Box
                sx={{
                    order: { xs: 2, lg: 1 },
                    boxShadow: 3,
                    p: { xs: 2, sm: 2.5 },
                    borderRadius: 2,
                    bgcolor: "background.paper",
                    minWidth: 0,
                }}
            >
                <Typography
                    sx={{
                        textAlign: "center",
                        fontFamily: "Roboto Slab",
                        fontSize: { xs: "1.15rem", sm: "1.3rem" },
                        fontWeight: "bold",
                        color: "primary.main",
                        mb: 2,
                    }}
                >
                    Job Application Details
                </Typography>

                {/* Personal Information */}
                <Typography
                    sx={{
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        mb: 1.25,
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
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        mb: 1.25,
                        mt: 2.5,
                        color: "primary.main",
                    }}
                >
                    Contact Information
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        mb: 1.25,
                        borderBottom: "1px solid #e0e0e0",
                        pb: 0.75,
                        gap: 1,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            color: "text.secondary",
                            minWidth: "128px",
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
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        mb: 1.25,
                        mt: 2.5,
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
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        mb: 1.25,
                        mt: 2.5,
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
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        mb: 1.25,
                        mt: 2.5,
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

            <Box
                component="form"
                onSubmit={handlePipelineSubmit}
                autoComplete="off"
                sx={{
                    order: { xs: 1, lg: 2 },
                    boxShadow: 3,
                    p: { xs: 2, sm: 2.5 },
                    borderRadius: 2,
                    bgcolor: "background.paper",
                    minWidth: 0,
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "Roboto Slab",
                        fontSize: { xs: "1.1rem", sm: "1.25rem" },
                        fontWeight: "bold",
                        color: "primary.main",
                        mb: 1,
                    }}
                >
                    Recruitment process
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                >
                    Interview, status, training, and assessment stay on this
                    same record.
                </Typography>
                <JobApplyPipelineFields
                    data={data}
                    setData={setData}
                    errors={errors}
                    branches={branches}
                    genders={genders}
                    staff={staff}
                    decisions={decisions}
                    includeProfile
                    afterStatus={
                        <JobApplyCvPanel
                            apply={apply}
                            matchingCvs={matchingCvs}
                            embedded
                        />
                    }
                />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: { xs: "stretch", sm: "flex-end" },
                        pt: 3,
                        borderTop: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={processing}
                        sx={{
                            width: { xs: "100%", sm: "auto" },
                            minWidth: { sm: 180 },
                        }}
                    >
                        Save process
                    </Button>
                </Box>
            </Box>
            </Box>
            <BackButton route={listUrl} label="Job Applies" />

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
