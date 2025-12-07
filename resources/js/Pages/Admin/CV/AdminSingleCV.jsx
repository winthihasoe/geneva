import NoData from "@/Components/util/NoData";
import { Head, router, useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Divider,
    Grid2,
    Button,
    Card,
    CardContent,
    IconButton,
    Container,
    Alert,
} from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle";
import AdminLayout from "@/Layouts/AdminLayout";
import EditLevel from "./components/EditLevel";
import EditApprove from "./components/EditApprove";
import Certificates from "./components/Certificates";
import CVdetail from "./components/CVdetail";
import BackButton from "@/Components/BackButton";
import Experiences from "./components/Experiences";
import TitleCenter from "@/Components/Typo/TitleCenter";
import PassportDisplay from "./components/PassportDisplay";
import CitenzenshipID from "./components/CitenzenshipID";
import FamilyMemberRecord from "./components/FamilyMemberRecord";
import FormText from "@/Components/Typo/FormText";
import OldCV from "./components/OldCV";
import ChangeCircleRoundedIcon from "@mui/icons-material/ChangeCircleRounded";
import EditCVstatus from "./components/EditCVstatus";
import CreateCertificate from "./components/CreateCertificate";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Compressor from "compressorjs";

const AdminSingleCV = ({ cv }) => {
    const renderStars = (count) => {
        const stars = [];
        const starCount = Math.round(count / 2);
        for (let i = 0; i < starCount; i++) {
            stars.push(" * ");
        }
        return stars;
    };

    const [newCV, setNewCV] = useState(true);

    // For Certificate form
    const [isAdding, setIsAdding] = useState(false);
    const [preview, setPreview] = useState(null);
    const { data, setData, post, processing, errors, setError } = useForm({
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
                setPreview(previewUrl);
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
        // Validate the qualification_type field
        if (!data.qualification_type) {
            setError("qualification_type", "Qualification type is required.");
            return;
        }
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
        post(route("admin.certificate.store", cv.id), {
            data: formData,
            forceFormData: true, // Required by Inertia for FormData submissions
            onSuccess: () => {
                console.log("Certificate saved successfully!");
                setIsAdding(false); // Close the form after successful submission
            },
            onError: (errors) => {
                console.error("Error saving certificate:", errors);
                setError(errors);
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
        <AdminLayout>
            <Head title="Single CV" />
            <Container maxWidth="lg" sx={{ pb: 3, px: 0 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <BackButton />
                    <Box>
                        <Button
                            sx={{ gap: 1 }}
                            onClick={() => setNewCV(!newCV)}
                        >
                            <Typography
                                fontSize={{
                                    xs: 12,
                                    sm: 13,
                                    md: 15,
                                }}
                                fontWeight={600}
                            >
                                Change layout{" "}
                            </Typography>
                            <ChangeCircleRoundedIcon />
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ fontSize: "0.8rem" }}
                            onClick={() =>
                                router.get(route("admin.cv.edit", cv.id))
                            }
                        >
                            Edit CV
                        </Button>
                    </Box>
                </Box>
                <Box position={"relative"}>
                    {cv == null && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "70vh",
                            }}
                        >
                            <NoData />
                        </Box>
                    )}

                    {cv !== null && newCV === false && <OldCV cv={cv} />}
                    {cv !== null && newCV === true && <CVdetail cv={cv} />}
                </Box>
                <Divider sx={{ my: 3 }} />
                {cv.is_approved ? (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        This caregiver's CV has been approved.
                    </Alert>
                ) : (
                    <Alert severity="warning" sx={{ mb: 2 }}>
                        This caregiver's CV is not yet approved.
                    </Alert>
                )}
                <Alert severity="info" sx={{ mb: 3 }}>
                    Below are more details of the caregiver's CV including
                    certificates, documents, job preferences, medical history,
                    and personal info.
                </Alert>

                {/* Certificates  */}
                <Box textAlign={"center"}>
                    <TitleCenter>Certificates</TitleCenter>
                    {cv.certificates && cv.certificates?.length > 0 ? (
                        <Certificates certificates={cv.certificates} />
                    ) : (
                        <Typography variant="body1" align="center" mb={4}>
                            No certificates available.
                        </Typography>
                    )}
                    <Button
                        variant="contained"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={() => setIsAdding(!isAdding)}
                        size="small"
                    >
                        {isAdding ? "Cancel" : "Add New"}
                    </Button>
                    {isAdding && (
                        <Box
                            sx={{
                                display: "flex",

                                justifyContent: "center",
                                my: 3,
                            }}
                        >
                            <CreateCertificate
                                data={data}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                                errors={errors}
                                preview={preview}
                                setPreview={setPreview}
                            />
                        </Box>
                    )}
                </Box>

                <Divider sx={{ my: 2 }} />

                <TitleCenter>Documents</TitleCenter>

                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        gap: 2,
                        mb: 4,
                    }}
                >
                    <CitenzenshipID
                        citizenship_certificate={cv.citizenship_certificate}
                    />
                    <FamilyMemberRecord
                        family_member_record={cv.family_member_record}
                    />
                </Box>

                <Divider sx={{ my: 3 }} />
                <Box>
                    <TitleCenter>Job Preference</TitleCenter>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                            justifyContent: "center",
                        }}
                    >
                        <Card sx={{ width: 250 }}>
                            <CardContent>
                                <Subtitle>Type of Care:</Subtitle>
                                <FormText>
                                    {cv.services.length > 0
                                        ? cv.services.join(", ")
                                        : "N/A"}
                                </FormText>
                            </CardContent>
                        </Card>

                        {/* <Card sx={{ width: 250 }}>
                            <CardContent>
                                <Subtitle>Type of Baby Handled:</Subtitle>
                                <FormText>
                                    {cv?.types_of_babies_handled?.length > 0
                                        ? cv.types_of_babies_handled.join(", ")
                                        : "N/A"}
                                </FormText>
                            </CardContent>
                        </Card> */}

                        {/* <Card sx={{ width: 250 }}>
                            <CardContent>
                                <Subtitle>Type of Patient Handled:</Subtitle>
                                <FormText>
                                    {cv?.types_of_patients_handled?.length > 0
                                        ? cv.types_of_patients_handled.join(
                                              ", "
                                          )
                                        : "N/A"}
                                </FormText>
                            </CardContent>
                        </Card> */}

                        {/* <Card sx={{ width: 250 }}>
                            <CardContent>
                                <Subtitle>Current location:</Subtitle>
                                <FormText>
                                    {cv?.current_location || "N/A"}
                                </FormText>
                                <Divider sx={{ mb: 1 }} />
                                <Subtitle>
                                    Work in Thai before:{" "}
                                    {cv?.worked_in_thailand || "N/A"}
                                </Subtitle>
                            </CardContent>
                        </Card> */}
                        <Card sx={{ width: 250 }}>
                            <CardContent>
                                <FormText>
                                    How long can you contract with an employer:{" "}
                                    {cv?.package_duration?.length > 0
                                        ? cv.package_duration.join(", ")
                                        : "N/A"}
                                </FormText>

                                <Divider sx={{ mb: 1 }} />
                                <Subtitle>
                                    Can: {cv?.package.join(", ") || "N/A"}
                                </Subtitle>
                            </CardContent>
                        </Card>

                        {/* <Card sx={{ width: 250 }}>
                            <CardContent>
                                <Subtitle>Service area:</Subtitle>
                                <FormText>{cv?.service_area || "N/A"}</FormText>
                            </CardContent>
                        </Card> */}
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <TitleCenter>Medical History</TitleCenter>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        justifyContent: "center",
                    }}
                >
                    <Card sx={{ width: 250 }}>
                        <CardContent>
                            <Subtitle>Past Illnesses</Subtitle>
                            <FormText>
                                {cv?.past_illnesses &&
                                cv?.past_illnesses.length > 0
                                    ? cv?.past_illnesses.join(", ")
                                    : "N/A"}
                            </FormText>
                        </CardContent>
                    </Card>
                    <Card sx={{ width: 250 }}>
                        <CardContent>
                            <Subtitle>Food handling:</Subtitle>
                            <FormText>
                                {cv?.food_handling &&
                                cv?.food_handling.length > 0
                                    ? cv?.food_handling.join(", ")
                                    : "N/A"}
                            </FormText>
                            <Divider sx={{ mb: 1 }} />
                            <Subtitle>Dietary Restriction:</Subtitle>
                            <FormText>
                                {cv?.dietary_restrictions &&
                                cv?.dietary_restrictions.length > 0
                                    ? cv?.dietary_restrictions.join(", ")
                                    : "N/A"}
                            </FormText>
                        </CardContent>
                    </Card>

                    <Card sx={{ width: 250 }}>
                        <CardContent>
                            <Subtitle>Allergies:</Subtitle>
                            <FormText>{cv?.allergies || "N/A"}</FormText>
                        </CardContent>
                    </Card>

                    <Card sx={{ width: 250 }}>
                        <CardContent>
                            <Subtitle>Physical Disabilities:</Subtitle>
                            <FormText>
                                {cv?.physical_disability || "N/A"}
                            </FormText>
                        </CardContent>
                    </Card>
                </Box>

                <Divider sx={{ my: 3 }} />

                <TitleCenter>Personal Info</TitleCenter>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        justifyContent: "center",
                    }}
                >
                    <Card sx={{ width: 250 }}>
                        <CardContent>
                            <Subtitle>Contact:</Subtitle>
                            <FormText>Phone: {cv?.phone || "N/A"}</FormText>
                            <Subtitle>Emergency Contact:</Subtitle>
                            <FormText>
                                Phone: {cv?.emergency_contact || "N/A"}
                            </FormText>
                            <FormText>Email: {cv?.email || "N/A"}</FormText>
                        </CardContent>
                    </Card>

                    <Card sx={{ width: 250 }}>
                        <CardContent>
                            <Subtitle>Marital status:</Subtitle>
                            <FormText>{cv?.marital_status || "N/A"}</FormText>
                            {cv?.number_of_children && (
                                <FormText>{cv.number_of_children}</FormText>
                            )}
                            <Divider sx={{ mb: 1 }} />
                            <Subtitle>No. of siblings:</Subtitle>
                            <FormText>
                                {cv?.number_of_siblings || "N/A"}
                            </FormText>
                        </CardContent>
                    </Card>
                </Box>

                <Divider sx={{ my: 3 }} />
                <Box>
                    <Experiences experiences={cv.experiences} cvId={cv.id} />
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Edit caregiver level and approved status  */}
                <Grid2 container sx={{ my: 5 }} spacing={3}>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                        <Card sx={{ mb: 3 }}>
                            <CardContent>
                                {/* <EditLevel cv={cv} /> */}
                                <EditApprove cv={cv} />
                            </CardContent>
                        </Card>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                        <Card sx={{ mb: 3 }}>
                            <CardContent>
                                <EditCVstatus cv={cv} />
                            </CardContent>
                        </Card>
                    </Grid2>
                </Grid2>
            </Container>
        </AdminLayout>
    );
};

export default AdminSingleCV;
