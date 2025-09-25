import NoData from "@/Components/util/NoData";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import {
    Box,
    Typography,
    Divider,
    Grid2,
    Button,
    Card,
    CardContent,
    IconButton,
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

    return (
        <AdminLayout>
            <Head title="Single CV" />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <BackButton />
                <Button sx={{ gap: 1 }} onClick={() => setNewCV(!newCV)}>
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

            {/* Certificates  */}
            <Box>
                {cv.certificates && cv.certificates?.length > 0 && (
                    <Certificates certificates={cv.certificates} />
                )}
            </Box>

            <Divider sx={{ my: 2 }} />
            {/* Experiences  */}

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
                <PassportDisplay
                    passport={cv.passport}
                    passport_number={cv.passport_number}
                    passport_type={cv.passport_type}
                    visa_type={cv.visa_type}
                />
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
                            <Subtitle>Gender of patient:</Subtitle>
                            <FormText>{cv.gender_of_patient || "N/A"}</FormText>
                        </CardContent>
                    </Card>

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

                    <Card sx={{ width: 250 }}>
                        <CardContent>
                            <Subtitle>Type of Baby Handled:</Subtitle>
                            <FormText>
                                {cv?.types_of_babies_handled?.length > 0
                                    ? cv.types_of_babies_handled.join(", ")
                                    : "N/A"}
                            </FormText>
                        </CardContent>
                    </Card>

                    <Card sx={{ width: 250 }}>
                        <CardContent>
                            <Subtitle>Type of Patient Handled:</Subtitle>
                            <FormText>
                                {cv?.types_of_patients_handled?.length > 0
                                    ? cv.types_of_patients_handled.join(", ")
                                    : "N/A"}
                            </FormText>
                        </CardContent>
                    </Card>

                    <Card sx={{ width: 250 }}>
                        <CardContent>
                            <Subtitle>Current location:</Subtitle>
                            <FormText>{cv?.current_location || "N/A"}</FormText>
                            <Divider sx={{ mb: 1 }} />
                            <Subtitle>
                                Work in Thai before:{" "}
                                {cv?.worked_in_thailand || "N/A"}
                            </Subtitle>
                        </CardContent>
                    </Card>
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

                    <Card sx={{ width: 250 }}>
                        <CardContent>
                            <Subtitle>Service area:</Subtitle>
                            <FormText>{cv?.service_area || "N/A"}</FormText>
                        </CardContent>
                    </Card>
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
                            {cv?.past_illnesses && cv?.past_illnesses.length > 0
                                ? cv?.past_illnesses.join(", ")
                                : "N/A"}
                        </FormText>
                    </CardContent>
                </Card>
                <Card sx={{ width: 250 }}>
                    <CardContent>
                        <Subtitle>Food handling:</Subtitle>
                        <FormText>
                            {cv?.food_handling && cv?.food_handling.length > 0
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
                        <FormText>{cv?.physical_disability || "N/A"}</FormText>
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
                        <FormText>
                            Phone: {cv?.emergency_contact || "N/A"}
                        </FormText>
                        <FormText>Email: {cv?.email || "N/A"}</FormText>
                        <FormText>Line ID: {cv?.line || "N/A"}</FormText>
                    </CardContent>
                </Card>

                {/* Language  */}
                <Card sx={{ width: 250 }}>
                    <CardContent>
                        <Subtitle>Language spoken:</Subtitle>

                        {cv?.language.map((lang, index) => {
                            // Split language and number
                            const [language, level] = lang.split(" ");
                            const starCount = parseInt(level, 10);

                            return (
                                <Box
                                    key={index}
                                    display="flex"
                                    flexWrap={"wrap"}
                                >
                                    <Typography
                                        fontSize={{
                                            xs: 12,
                                            sm: 13,
                                            md: 15,
                                        }}
                                    >
                                        • {language}
                                    </Typography>

                                    <Box display="flex" pl={1}>
                                        {renderStars(starCount)}
                                    </Box>
                                </Box>
                            );
                        })}
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
                        <FormText>{cv?.number_of_siblings || "N/A"}</FormText>
                    </CardContent>
                </Card>

                <Card sx={{ width: 250 }}>
                    <CardContent>
                        <Subtitle>
                            Wear glasses: {cv?.wears_glasses || "N/A"}
                        </Subtitle>
                        <Subtitle>Tattoo: {cv?.has_tattoo || "N/A"}</Subtitle>
                    </CardContent>
                </Card>
            </Box>

            <Divider sx={{ my: 3 }} />
            <Box>
                <Experiences experiences={cv.experiences} cvId={cv.id} />
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Edit caregiver level and approved status  */}
            <Grid2 container sx={{ my: 5 }} rowGap={3}>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <EditLevel cv={cv} />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <EditApprove cv={cv} />
                    <EditCVstatus cv={cv} />
                </Grid2>
            </Grid2>
            <BackButton />
        </AdminLayout>
    );
};

export default AdminSingleCV;
