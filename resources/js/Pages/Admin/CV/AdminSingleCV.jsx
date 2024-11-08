import NoData from "@/Components/util/NoData";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, Grid2 } from "@mui/material";
import LongText from "@/Components/Typo/LongText";
import Subtitle from "@/Components/Typo/Subtitle";
import logo from "../../../../../public/images/logo/logo.png"; // Adjust the path to your logo
import AdminLayout from "@/Layouts/AdminLayout";
import EditLevel from "./components/EditLevel";

const AdminSingleCV = ({ cv }) => {
    const renderStars = (count) => {
        const stars = [];
        const starCount = Math.round(count / 2);
        for (let i = 0; i < starCount; i++) {
            stars.push(" * ");
        }
        return stars;
    };

    return (
        <AdminLayout>
            <Head title="Single CV" />
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
                {cv !== null && (
                    <Grid2
                        container
                        sx={{
                            maxWidth: 800,
                            minHeight: 1300,
                            margin: "auto",
                            border: "1px solid #ddd",
                            position: "relative",
                        }}
                    >
                        <Grid2
                            size={5}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                bgcolor: "#cfefe0",
                                overflow: "hidden",
                                position: "relative",
                            }}
                        >
                            <Box bgcolor={"#fff"} width={"100%"} height={100} />
                            <Box
                                sx={{
                                    width: { xs: "100%", sm: "90%" },
                                    bgcolor: "#85e1ba",
                                    height: 300,
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-end",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: {
                                                xs: "100%",
                                                sm: "90%",
                                                md: "70%",
                                            },
                                        }}
                                    >
                                        <img
                                            src={`/storage/${cv.profile_photo}`}
                                            alt="Profile"
                                            style={{
                                                height: 250,
                                                width: "100%",
                                                objectFit: "cover",
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: "center",
                                                backgroundColor: "orange",
                                            }}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            width: {
                                                xs: "100%",
                                                sm: "90%",
                                                md: "80%",
                                            },
                                            p: { xs: 1, sm: 2 },
                                            bgcolor: "#85e1ba",
                                        }}
                                    >
                                        <Typography
                                            fontSize={{
                                                xs: 13,
                                                sm: 15,
                                                md: 20,
                                            }}
                                            fontWeight={600}
                                        >
                                            PERSONAL DETAILS
                                        </Typography>
                                        <Divider sx={{ my: 1 }} />
                                        <Box mt={1}>
                                            <Typography
                                                fontFamily={"Kavoon"}
                                                mb={1}
                                            >
                                                ID{" "}
                                                <span style={{ fontSize: 14 }}>
                                                    {cv.ha_id}
                                                </span>
                                            </Typography>
                                            <Typography
                                                fontSize={{
                                                    xs: 12,
                                                    sm: 13,
                                                    md: 15,
                                                }}
                                                mb={1}
                                            >
                                                <strong>Date of Birth:</strong>{" "}
                                                {cv.date_of_birth}
                                            </Typography>
                                            <Typography
                                                fontSize={{
                                                    xs: 12,
                                                    sm: 13,
                                                    md: 15,
                                                }}
                                                mb={1}
                                            >
                                                <strong>Nationality:</strong>{" "}
                                                {cv.nationality}
                                            </Typography>
                                            <Typography
                                                fontSize={{
                                                    xs: 12,
                                                    sm: 13,
                                                    md: 15,
                                                }}
                                                mb={1}
                                            >
                                                <strong>Marital Status:</strong>{" "}
                                                {cv.marital_status}
                                            </Typography>
                                            <Typography
                                                fontSize={{
                                                    xs: 12,
                                                    sm: 13,
                                                    md: 15,
                                                }}
                                                mb={1}
                                            >
                                                <strong>Address:</strong>{" "}
                                                {cv.current_address}
                                            </Typography>
                                            <Typography
                                                fontSize={{
                                                    xs: 12,
                                                    sm: 13,
                                                    md: 15,
                                                }}
                                                mb={1}
                                            >
                                                <strong>Religion:</strong>{" "}
                                                {cv.religion}
                                            </Typography>
                                            <Typography
                                                fontSize={{
                                                    xs: 12,
                                                    sm: 13,
                                                    md: 15,
                                                }}
                                                mb={1}
                                            >
                                                <strong>
                                                    Weight & Height:
                                                </strong>{" "}
                                                <br />
                                                {cv.weight} kg | {cv.height} cm
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: {
                                                xs: "100%",
                                                sm: "90%",
                                                md: "80%",
                                            },
                                            p: { xs: 1, sm: 2 },
                                        }}
                                    >
                                        <Typography
                                            fontSize={{
                                                xs: 13,
                                                sm: 15,
                                                md: 20,
                                            }}
                                            fontWeight={600}
                                        >
                                            EDUCATION
                                        </Typography>
                                        <Divider sx={{ my: 1 }} />
                                        <Typography
                                            fontSize={{
                                                xs: 12,
                                                sm: 13,
                                                md: 15,
                                            }}
                                            mb={2}
                                        >
                                            {cv.education_level}
                                        </Typography>
                                        <Typography
                                            fontSize={{
                                                xs: 12,
                                                sm: 13,
                                                md: 15,
                                            }}
                                            mb={3}
                                        >
                                            {cv.caregiver_qualification}
                                        </Typography>

                                        {/* Relevant course  */}
                                        {cv.certificates &&
                                        cv.certificates?.length > 0 ? (
                                            <>
                                                <Typography fontWeight={600}>
                                                    RELEVANT COURSES
                                                </Typography>
                                                <Divider sx={{ my: 1 }} />
                                                {cv.certificates.map((cert) => (
                                                    <Box key={cert.id}>
                                                        <Typography
                                                            fontFamily={"Karma"}
                                                            fontSize={{
                                                                xs: 12,
                                                                sm: 13,
                                                                md: 18,
                                                            }}
                                                            fontWeight={"bold"}
                                                        >
                                                            {cert.course}
                                                        </Typography>
                                                        <Typography
                                                            fontSize={{
                                                                xs: 12,
                                                                sm: 13,
                                                                md: 15,
                                                            }}
                                                            mb={2}
                                                        >
                                                            Duration:{" "}
                                                            {cert.duration}{" "}
                                                            months
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </>
                                        ) : (
                                            <Box>
                                                <Typography fontWeight={600}>
                                                    RELEVANT COURSES
                                                </Typography>
                                                <Divider sx={{ my: 1 }} />

                                                <Typography
                                                    fontSize={{
                                                        xs: 12,
                                                        sm: 13,
                                                        md: 15,
                                                    }}
                                                    mb={1}
                                                >
                                                    {cv.caregiver_qualification}
                                                </Typography>
                                            </Box>
                                        )}

                                        <Divider sx={{ my: 3 }} />

                                        <Typography fontWeight={600}>
                                            LANGUAGES
                                        </Typography>
                                        <Box my={1}>
                                            {cv?.language.map((lang, index) => {
                                                // Split language and number
                                                const [language, level] =
                                                    lang.split(" ");
                                                const starCount = parseInt(
                                                    level,
                                                    10
                                                );

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

                                                        <Box
                                                            display="flex"
                                                            pl={1}
                                                        >
                                                            {renderStars(
                                                                starCount
                                                            )}
                                                        </Box>
                                                    </Box>
                                                );
                                            })}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid2>

                        <Grid2 size={7} sx={{ p: { xs: 1, sm: 3, md: 4 } }}>
                            <Typography
                                variant="h3"
                                fontSize={{ xs: 22, sm: 35, md: 45 }}
                                fontWeight="bold"
                                color="primary"
                            >
                                {cv.nickname.toUpperCase()}
                            </Typography>
                            <Typography
                                fontSize={{ xs: 15, sm: 26, md: 30 }}
                                variant="h6"
                                color="text.secondary"
                            >
                                {(cv.level || "CAREGIVER").toUpperCase()}
                            </Typography>
                            <LongText
                                fontSize={{ xs: 12, sm: 14, md: 15 }}
                                limit={150}
                            >
                                {cv.introduction}
                            </LongText>

                            {/* Contact Information */}
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 1,
                                    borderTop: "2px solid",
                                    borderBottom: "2px solid",
                                    borderColor: "primary.main",
                                    py: 2,
                                    mt: 2,
                                }}
                            >
                                <Typography
                                    fontSize={{ xs: 13, sm: 15, md: 20 }}
                                    variant="h6"
                                    fontWeight="bold"
                                >
                                    CONTACT
                                </Typography>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    gap={0.5}
                                >
                                    <Typography
                                        fontSize={{
                                            xs: 12,
                                            sm: 13,
                                            md: 15,
                                        }}
                                    >
                                        📞 +66 620 90 8578
                                    </Typography>
                                    <Typography
                                        fontSize={{
                                            xs: 12,
                                            sm: 13,
                                            md: 15,
                                        }}
                                    >
                                        📧 heartyaidbkk@gmail.com
                                    </Typography>
                                    <Typography
                                        fontSize={{
                                            xs: 12,
                                            sm: 13,
                                            md: 15,
                                        }}
                                    >
                                        <img
                                            src="/images/social/line.png"
                                            style={{ width: 12, height: 12 }}
                                            alt="Line"
                                        />{" "}
                                        heartyaidbkk
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography
                                variant="h6"
                                fontSize={{ xs: 13, sm: 15, md: 20 }}
                                fontWeight="bold"
                                bgcolor={"#85e1ba"}
                                display={"inline-block"}
                                p={1}
                            >
                                WORK EXPERIENCES
                            </Typography>
                            <Box sx={{ my: 2, pl: { xs: 0, sm: 2 } }}>
                                {cv?.newborn_experience_years !== "None" && (
                                    <Typography
                                        mb={1}
                                        fontSize={{ xs: 13, sm: 15, md: 17 }}
                                    >
                                        <img
                                            src="/images/green_mark.png"
                                            style={{
                                                width: 15,
                                                height: 15,
                                                marginRight: "3px",
                                            }}
                                            alt="mark"
                                        />{" "}
                                        <strong>
                                            Newborn care experience:
                                        </strong>{" "}
                                        {cv?.newborn_experience_years}
                                    </Typography>
                                )}
                                {cv?.nanny_experience_years !== "None" && (
                                    <Typography
                                        mb={1}
                                        fontSize={{ xs: 13, sm: 15, md: 17 }}
                                    >
                                        <img
                                            src="/images/green_mark.png"
                                            style={{
                                                width: 15,
                                                height: 15,
                                                marginRight: "3px",
                                            }}
                                            alt="mark"
                                        />{" "}
                                        <strong>Nanny care experience:</strong>{" "}
                                        {cv?.nanny_experience_years}
                                    </Typography>
                                )}
                                {cv?.elder_experience_years !== "None" && (
                                    <Typography
                                        mb={1}
                                        fontSize={{ xs: 13, sm: 15, md: 17 }}
                                    >
                                        <img
                                            src="/images/green_mark.png"
                                            style={{
                                                width: 15,
                                                height: 15,
                                                marginRight: "3px",
                                            }}
                                            alt="mark"
                                        />{" "}
                                        <strong>Elder care experience:</strong>{" "}
                                        {cv?.elder_experience_years}
                                    </Typography>
                                )}
                                {cv?.detail_experience && (
                                    <Box sx={{ my: 2 }}>
                                        <LongText
                                            fontSize={{
                                                xs: 13,
                                                sm: 16,
                                                md: 18,
                                            }}
                                            limit={200}
                                            fontFamily={"Mali"}
                                        >
                                            {cv?.detail_experience}
                                        </LongText>
                                    </Box>
                                )}
                            </Box>
                            <Box
                                sx={{
                                    borderTop: "2px solid",
                                    borderBottom: "2px solid",
                                    borderColor: "primary.main",
                                    my: 2,
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    bgcolor={"#85e1ba"}
                                    display={"inline-block"}
                                    p={1}
                                    mb={2}
                                    fontSize={{ xs: 13, sm: 15, md: 20 }}
                                >
                                    SKILLS
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        rowGap: 2,
                                    }}
                                >
                                    {cv?.nursing_skills_for_child?.length >
                                        0 && (
                                        <Box>
                                            <Subtitle>Baby care</Subtitle>
                                            {cv?.nursing_skills_for_child.map(
                                                (skill, index) => (
                                                    <Typography
                                                        key={index}
                                                        mb={1}
                                                        fontSize={{
                                                            xs: 12,
                                                            sm: 14,
                                                            md: 17,
                                                        }}
                                                    >
                                                        <img
                                                            src="/images/green_mark.png"
                                                            style={{
                                                                width: 15,
                                                                height: 15,
                                                                marginRight:
                                                                    "3px",
                                                            }}
                                                            alt="Line"
                                                        />{" "}
                                                        {skill}
                                                    </Typography>
                                                )
                                            )}
                                        </Box>
                                    )}
                                    {cv?.nursing_skills_for_elder?.length >
                                        0 && (
                                        <Box>
                                            <Subtitle>Elder care</Subtitle>
                                            {cv?.nursing_skills_for_elder.map(
                                                (skill, index) => (
                                                    <Typography
                                                        key={index}
                                                        mb={1}
                                                        fontSize={{
                                                            xs: 12,
                                                            sm: 14,
                                                            md: 17,
                                                        }}
                                                    >
                                                        <img
                                                            src="/images/green_mark.png"
                                                            style={{
                                                                width: 15,
                                                                height: 15,
                                                                marginRight:
                                                                    "3px",
                                                            }}
                                                            alt="Line"
                                                        />{" "}
                                                        {skill}
                                                    </Typography>
                                                )
                                            )}
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </Grid2>
                        <Box
                            sx={{
                                top: 5,
                                right: 5,
                                position: "absolute",
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <img
                                src={logo}
                                alt="Hearty Aid Logo"
                                style={{ width: "8%" }}
                            />
                        </Box>
                    </Grid2>
                )}
            </Box>
            <EditLevel cv={cv} />
        </AdminLayout>
    );
};

export default AdminSingleCV;
