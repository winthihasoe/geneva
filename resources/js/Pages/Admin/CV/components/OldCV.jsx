import React from "react";
import { Box, Typography, Divider, Grid2, Button } from "@mui/material";
import LongText from "@/Components/Typo/LongText";
import Subtitle from "@/Components/Typo/Subtitle";
import logo from "../../../../../../public/images/logo/logo.png";
function OldCV({ cv }) {
    const renderStars = (count) => {
        const stars = [];
        const starCount = Math.round(count / 2);
        for (let i = 0; i < starCount; i++) {
            stars.push(" * ");
        }
        return stars;
    };
    return (
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
                    bgcolor: "#e6d8fdff",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <Box bgcolor={"#fff"} width={"100%"} height={100} />
                <Box
                    sx={{
                        width: { xs: "100%", sm: "90%" },
                        bgcolor: "#937ac0ff",
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
                                height: { xs: 180, sm: 250, md: 300 },
                            }}
                        >
                            <img
                                src={`/storage/${cv.profile_photo}`}
                                alt="Profile"
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundColor: "gray",
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
                                bgcolor: "#875cd1",
                            }}
                        >
                            <Typography sx={styles.sectionTitle} color="#fff">
                                PERSONAL DETAILS
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box mt={1} color={"#fff"}>
                                <Typography sx={styles.sectionText}>
                                    ID -{cv.geneva_id}
                                </Typography>
                                <Typography sx={styles.sectionText}>
                                    <strong>Date of Birth:</strong>{" "}
                                    {cv.date_of_birth}
                                </Typography>

                                <Typography sx={styles.sectionText}>
                                    <strong>Marital Status:</strong>{" "}
                                    {cv.marital_status}
                                </Typography>

                                <Typography sx={styles.sectionText}>
                                    <strong>Religion:</strong> {cv.religion}
                                </Typography>
                                <Typography sx={styles.sectionText}>
                                    <strong>Weight & Height:</strong> <br />
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
                            {/* Relevant course  */}
                            {cv.certificates && cv.certificates?.length > 0 ? (
                                <>
                                    <Typography sx={styles.sectionTitle}>
                                        RELEVANT QUALIFICATIONS
                                    </Typography>
                                    <Divider sx={{ my: 1 }} />
                                    <Box>
                                        {cv?.certificates &&
                                            cv?.certificates.length > 0 &&
                                            cv.certificates.map((cert) => (
                                                <Typography
                                                    sx={styles.sectionText}
                                                    key={cert.id}
                                                >
                                                    {cert.qualification_type
                                                        ? `${cert.qualification_type} in `
                                                        : ""}
                                                    {cert.course} /{" "}
                                                    {cert.training_center_name}{" "}
                                                    /{" "}
                                                    {new Date(
                                                        cert.start_date
                                                    ).getFullYear()}
                                                </Typography>
                                            ))}
                                    </Box>
                                </>
                            ) : (
                                <Box>
                                    <Typography sx={styles.sectionTitle}>
                                        RELEVANT QUALIFICATIONS
                                    </Typography>
                                    <Divider sx={{ my: 1 }} />

                                    <Typography sx={styles.sectionText}>
                                        {cv.caregiver_qualification}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Grid2>

            <Grid2 size={7} sx={{ p: { xs: 1, sm: 3, md: 4 } }}>
                <Typography
                    variant="h3"
                    fontSize={{ xs: 17, sm: 30, md: 35 }}
                    lineHeight={1.1}
                    fontWeight="bold"
                    fontFamily={"Roboto Slab"}
                    color="secondary.main"
                    mt={3}
                    mb={2}
                >
                    {cv.full_name.toUpperCase()}
                </Typography>
                {/* <Box mb={1}>
                   
                    <Typography
                        fontSize={{ xs: 10, sm: 20, md: 23 }}
                        variant="h6"
                        color="text.secondary"
                    >
                        {cv?.newborn_care_level?.toUpperCase()}
                    </Typography>

                 
                    <Typography
                        fontSize={{ xs: 10, sm: 20, md: 23 }}
                        variant="h6"
                        color="text.secondary"
                    >
                        {cv?.nanny_care_level?.toUpperCase()}
                    </Typography>
                    
                    <Typography
                        fontSize={{ xs: 10, sm: 20, md: 23 }}
                        variant="h6"
                        color="text.secondary"
                    >
                        {cv?.level?.toUpperCase()}
                    </Typography>
                </Box> */}
                {/* <LongText fontSize={{ xs: 12, sm: 14, md: 15 }} limit={150}>
                    {cv.introduction}
                </LongText> */}

                {/* Contact Information */}
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        borderTop: "2px solid",
                        borderBottom: "2px solid",
                        borderColor: "primary.main",
                        py: 1,
                    }}
                >
                    <Typography sx={styles.sectionTitle}>CONTACT</Typography>
                    <Box display="flex" flexDirection="column" gap={0.5}>
                        <Typography sx={styles.sectionText}>
                            📞 09970006670 | 09980160003
                        </Typography>

                        <Typography
                            sx={[
                                styles.sectionText,
                                {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                },
                            ]}
                        >
                            <img
                                src="/images/social/viber.png"
                                style={{ width: 24, height: 24 }}
                                alt="Viber"
                            />
                            09970006670
                        </Typography>
                    </Box>
                </Box>
                <Typography
                    sx={styles.sectionTitle}
                    bgcolor={"#875cd1"}
                    display={"inline-block"}
                    p={1}
                    color="#fff"
                >
                    WORK EXPERIENCES
                </Typography>
                <Box sx={{ my: 2, pl: { xs: 0, sm: 2 } }}>
                    {cv?.newborn_experience_years && (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 0.5,
                            }}
                        >
                            <img
                                src="/images/green_mark.png"
                                style={{
                                    width: 15,
                                    height: 15,
                                    marginRight: "3px",
                                }}
                                alt="mark"
                            />
                            <Typography sx={styles.sectionText}>
                                <strong>Newborn care experience:</strong>{" "}
                                {cv?.newborn_experience_years}
                            </Typography>
                        </Box>
                    )}
                    {cv?.nanny_experience_years && (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 0.5,
                            }}
                        >
                            <img
                                src="/images/green_mark.png"
                                style={{
                                    width: 15,
                                    height: 15,
                                    marginRight: "3px",
                                }}
                                alt="mark"
                            />
                            <Typography sx={styles.sectionText}>
                                <strong>Nanny care experience:</strong>{" "}
                                {cv?.nanny_experience_years}
                            </Typography>
                        </Box>
                    )}
                    {cv?.elder_experience_years && (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 0.5,
                            }}
                        >
                            <img
                                src="/images/green_mark.png"
                                style={{
                                    width: 15,
                                    height: 15,
                                    marginRight: "3px",
                                }}
                                alt="mark"
                            />
                            <Typography sx={styles.sectionText}>
                                <strong>Elder care experience:</strong>{" "}
                                {cv?.elder_experience_years}
                            </Typography>
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
                        sx={styles.sectionTitle}
                        bgcolor={"#875cd1"}
                        color={"#fff"}
                        display={"inline-block"}
                        py={1}
                        px={2}
                    >
                        SKILLS
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {cv?.nursing_skills_for_child?.length > 0 && (
                            <Box>
                                <Subtitle>Baby care</Subtitle>
                                {cv?.nursing_skills_for_child.map(
                                    (skill, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: "flex",
                                                alignItems: "flex-start",
                                                gap: 0.5,
                                                mb: 0.5,
                                            }}
                                        >
                                            <img
                                                src="/images/green_mark.png"
                                                style={{
                                                    width: 13,
                                                    height: 13,
                                                    marginRight: "2px",
                                                    marginTop: "5px",
                                                }}
                                                alt="mark"
                                            />
                                            <Typography sx={styles.sectionText}>
                                                {skill}
                                            </Typography>
                                        </Box>
                                    )
                                )}
                            </Box>
                        )}
                        {cv?.nursing_skills_for_elder?.length > 0 && (
                            <Box>
                                <Subtitle>Elder care</Subtitle>
                                {cv?.nursing_skills_for_elder.map(
                                    (skill, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: "flex",
                                                alignItems: "flex-start",
                                                gap: 0.5,
                                                mb: 0.5,
                                            }}
                                        >
                                            <img
                                                src="/images/green_mark.png"
                                                style={{
                                                    width: 13,
                                                    height: 13,
                                                    marginRight: "2px",
                                                    marginTop: "၂px",
                                                }}
                                                alt="mark"
                                            />
                                            <Typography sx={styles.sectionText}>
                                                {skill}
                                            </Typography>
                                        </Box>
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
                <img src={logo} alt="Geneva Logo" style={{ width: "10%" }} />
            </Box>
        </Grid2>
    );
}

export default OldCV;

const styles = {
    sectionTitle: {
        fontSize: {
            xs: 11,
            sm: 15,
            md: 20,
        },
        fontWeight: 600,
        fontFamily: "Roboto Slab",
    },
    sectionText: {
        fontSize: {
            xs: 10,
            sm: 13,
            md: 16,
        },
    },
};
