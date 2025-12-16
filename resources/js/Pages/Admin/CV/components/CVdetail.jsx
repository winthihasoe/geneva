import { Box, Divider, Grid2, Typography } from "@mui/material";
import React from "react";
import logo from "../../../../../../public/images/logo/logo.png";
import AgeCalculator from "@/Components/util/AgeCalculator";

const ResumeText = ({ children }) => (
    <Typography
        fontWeight={300}
        mb={{ xs: 0.8, sm: 1, md: 1 }}
        fontSize={{ xs: 8, sm: 12, md: 15 }}
    >
        {children}
    </Typography>
);

const ResumeItalic = ({ children }) => (
    <Typography
        fontWeight={300}
        fontStyle="italic"
        mb={1}
        fontSize={{ xs: 8, sm: 12, md: 15 }}
    >
        {children}
    </Typography>
);

function CVdetail({ cv }) {
    const hasElderSkills = cv?.nursing_skills_for_elder?.length > 0;
    const hasChildSkills = cv?.nursing_skills_for_child?.length > 0;
    return (
        <Box
            sx={{
                maxWidth: 800,
                margin: "10px auto",
                boxShadow: 3,
                borderRadius: 3,
                p: 1,
            }}
        >
            {/* Wrapper Box for A4 Scaling */}
            <Box
                sx={{
                    backgroundColor: "white",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <Grid2 container>
                    <Grid2 size={{ xs: 5, sm: 4, md: 4 }}>
                        {/* Profile photo */}
                        <Box sx={{ m: { xs: 0.5, sm: 2, md: 3 } }}>
                            <Box
                                sx={{
                                    height: { xs: 160, sm: 250, md: 280 },
                                    backgroundColor: "primary.main",
                                    borderColor: "primary.main",
                                    borderWidth: 5,
                                    borderStyle: "solid",
                                    borderRadius: 6,
                                    overflow: "hidden",
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
                            <Typography
                                textAlign={"center"}
                                sx={styles.sectionText}
                            >
                                ID - <span>{cv.geneva_id}</span>
                            </Typography>
                        </Box>
                    </Grid2>

                    {/* Nickname and personal information */}
                    <Grid2 size={{ xs: 7, sm: 7, md: 8 }}>
                        <Box
                            sx={{
                                m: { xs: 1, sm: 2, md: 3 },
                            }}
                        >
                            <Typography
                                variant="h3"
                                fontSize={{ xs: 17, sm: 30, md: 35 }}
                                lineHeight={1.1}
                                fontWeight="bold"
                                fontFamily={"Roboto Slab"}
                                color="secondary.main"
                                mt={3}
                                mb={1}
                            >
                                {cv.full_name.toUpperCase()}
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mx: { xs: 0, sm: 1, md: 2 },
                                    mb: { xs: 0, sm: 1, md: 2 },
                                }}
                            >
                                <Typography
                                    sx={[
                                        styles.sectionTitle,
                                        { color: "primary.main", mr: 1 },
                                    ]}
                                >
                                    PROFILE
                                </Typography>

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "100%",
                                    }}
                                >
                                    {/* First part of the Divider (80% width, 1px thickness) */}
                                    <Box
                                        sx={{
                                            flex: 4, // 80% of the width
                                            borderBottom: "1px solid", // 1px thickness
                                            borderColor: "primary.main",
                                        }}
                                    />

                                    {/* Second part of the Divider (20% width, 2px thickness) */}
                                    <Box
                                        sx={{
                                            flex: 2, // 20% of the width
                                            borderBottom: "4px solid", // 2px thickness
                                            borderColor: "primary.main",
                                        }}
                                    />
                                </Box>
                            </Box>

                            {/* Profile box  */}
                            <Grid2
                                container
                                sx={{
                                    bgcolor: "#f1e9ffff",
                                    p: { xs: 0.3, sm: 1, md: 2 },
                                    columnGap: 0.5,
                                }}
                            >
                                <Grid2 size={5}>
                                    <Typography sx={styles.sectionText}>
                                        Age:{" "}
                                        <AgeCalculator
                                            date={cv?.date_of_birth}
                                        />{" "}
                                        YEARS
                                    </Typography>
                                    <Typography sx={styles.sectionText}>
                                        Gender:{" "}
                                        {cv?.gender == "Male" ? "M" : "F"}
                                    </Typography>
                                    <Typography sx={styles.sectionText}>
                                        Height: {cv?.height} CM
                                    </Typography>
                                </Grid2>
                                <Grid2 size={5}>
                                    <Typography sx={styles.sectionText}>
                                        Marital Status: {cv?.marital_status}
                                    </Typography>
                                    <Typography sx={styles.sectionText}>
                                        Religion: {cv?.religion}
                                    </Typography>
                                    <Typography sx={styles.sectionText}>
                                        Weight: {cv?.weight}
                                        KG
                                    </Typography>
                                </Grid2>
                            </Grid2>
                            <Box
                                sx={{
                                    p: { xs: 0.3, sm: 1, md: 2 },
                                }}
                            >
                                <Typography
                                    sx={styles.sectionText}
                                    letterSpacing={1}
                                >
                                    Hotline: 📞 09970006670 | 09980160003
                                </Typography>
                            </Box>
                        </Box>
                    </Grid2>
                </Grid2>
                <Grid2
                    container
                    sx={{ columnGap: 2, px: { xs: 1, sm: 2, md: 3 } }}
                >
                    <Grid2 size={{ xs: 5, sm: 5, md: 4 }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",

                                mb: { xs: 1, sm: 1, md: 2 },
                            }}
                        >
                            <Typography
                                sx={[
                                    styles.sectionTitle,
                                    { color: "primary.main", mr: 1 },
                                ]}
                            >
                                QUALIFICATION
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                }}
                            >
                                {/* First part of the Divider (80% width, 1px thickness) */}
                                <Box
                                    sx={{
                                        flex: 4, // 80% of the width
                                        borderBottom: "1px solid", // 1px thickness
                                        borderColor: "primary.main",
                                    }}
                                />

                                {/* Second part of the Divider (20% width, 2px thickness) */}
                                <Box
                                    sx={{
                                        flex: 2, // 20% of the width
                                        borderBottom: "4px solid", // 2px thickness
                                        borderColor: "primary.main",
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box>
                            {/* Relevant course  */}
                            {cv.certificates && cv.certificates?.length > 0 ? (
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
                                                {cert.training_center_name} /{" "}
                                                {new Date(
                                                    cert.start_date
                                                ).getFullYear()}
                                            </Typography>
                                        ))}
                                </Box>
                            ) : (
                                <Box>
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
                        </Box>
                    </Grid2>
                    <Grid2 size={{ xs: 6, sm: 6, md: 7 }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: { xs: 1, sm: 1, md: 2 },
                            }}
                        >
                            <Typography
                                sx={[
                                    styles.sectionTitle,
                                    { color: "primary.main", mr: 1 },
                                ]}
                            >
                                WORK_EXPERIENCE
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                }}
                            >
                                {/* First part of the Divider (80% width, 1px thickness) */}
                                <Box
                                    sx={{
                                        flex: 1, // 80% of the width
                                        borderBottom: "1px solid", // 1px thickness
                                        borderColor: "primary.main",
                                    }}
                                />

                                {/* Second part of the Divider (20% width, 2px thickness) */}
                                <Box
                                    sx={{
                                        flex: 2, // 20% of the width
                                        borderBottom: "4px solid", // 2px thickness
                                        borderColor: "primary.main",
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box>
                            {cv?.experiences &&
                                cv?.experiences.length > 0 &&
                                cv.experiences
                                    .sort((a, b) => {
                                        if (a.order === b.order) {
                                            // Secondary sort by `id` if `order` is the same
                                            return a.id - b.id;
                                        }
                                        return a.order - b.order; // Primary sort by `order`
                                    })
                                    .map((exp) => (
                                        <Typography
                                            key={exp.id}
                                            sx={styles.sectionText}
                                        >
                                            {exp.experience}
                                        </Typography>
                                    ))}
                        </Box>
                    </Grid2>
                </Grid2>

                {/* Dotted divider  */}
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        my: 2,
                        justifyContent: "center",
                    }}
                >
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <Box
                            key={item}
                            sx={{
                                width: 10,
                                height: 10,
                                borderRadius: 20,
                                bgcolor: "primary.main",
                            }}
                        />
                    ))}
                </Box>

                <Box
                    sx={{
                        bgcolor: "#f1e9ff",
                        m: { xs: 1, sm: 2, md: 3 },
                        p: { xs: 1, sm: 2, md: 3 },
                        borderRadius: { xs: 3, sm: 5, md: 10 },
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: { xs: 1, sm: 2 },
                        justifyContent: "center",
                    }}
                >
                    {hasChildSkills && (
                        <Box
                            sx={{
                                flex: hasElderSkills ? "1" : "0 0 100%", // Full width if no elder skills
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography
                                    sx={[
                                        styles.sectionTitle,
                                        { color: "primary.main", mr: 1 },
                                    ]}
                                >
                                    Baby Care
                                </Typography>
                                <Box
                                    sx={{
                                        display: {
                                            xs: "none",
                                            sm: "flex",
                                            md: "flex",
                                        },
                                        width: 25,
                                        ml: 1,
                                    }}
                                >
                                    <img
                                        src="/images/heart.png"
                                        alt="Hearty Aid Logo"
                                        style={{ width: "100%" }}
                                    />
                                </Box>
                            </Box>
                            <ResumeText>SKILLS</ResumeText>
                            <Box sx={{ ml: 1 }}>
                                {cv?.nursing_skills_for_child.map(
                                    (skill, index) => (
                                        <Typography
                                            sx={styles.sectionText}
                                            mb={0.5}
                                            key={index}
                                        >
                                            <img
                                                src="/images/dot.png"
                                                style={{
                                                    width: 8,
                                                    height: 8,
                                                    marginRight: "3px",
                                                }}
                                                alt="Line"
                                            />{" "}
                                            {skill}
                                        </Typography>
                                    )
                                )}
                            </Box>
                        </Box>
                    )}

                    {hasElderSkills && (
                        <Box
                            sx={{
                                flex: hasChildSkills ? "1" : "0 0 100%", // Full width if no child skills
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography
                                    sx={[
                                        styles.sectionTitle,
                                        { color: "primary.main", mr: 1 },
                                    ]}
                                >
                                    Elderly Care
                                </Typography>
                                <Box
                                    sx={{
                                        display: {
                                            xs: "none",
                                            sm: "flex",
                                            md: "flex",
                                        },
                                        width: 25,
                                        ml: 1,
                                    }}
                                >
                                    <img
                                        src="/images/heart.png"
                                        alt="Heart Logo"
                                        style={{ width: "100%" }}
                                    />
                                </Box>
                            </Box>
                            <ResumeText>SKILLS</ResumeText>
                            <Box sx={{ ml: 1 }}>
                                {cv?.nursing_skills_for_elder.map(
                                    (skill, index) => (
                                        <Typography
                                            sx={styles.sectionText}
                                            key={index}
                                            mb={0.5}
                                        >
                                            <img
                                                src="/images/dot.png"
                                                style={{
                                                    width: 8,
                                                    height: 8,
                                                    marginRight: "3px",
                                                }}
                                                alt="Dot"
                                            />{" "}
                                            {skill}
                                        </Typography>
                                    )
                                )}
                            </Box>
                        </Box>
                    )}
                </Box>
                <Box
                    sx={{
                        top: 5,
                        right: 8,
                        position: "absolute",
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <img src={logo} alt="Geneva Logo" style={{ width: "8%" }} />
                </Box>
            </Box>
        </Box>
    );
}

export default CVdetail;

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
            xs: 8,
            sm: 12,
            md: 15,
        },
        fontWeight: 400,
    },
};
