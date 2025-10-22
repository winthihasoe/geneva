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
                border: "1px solid",
                borderColor: "primary.main",
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
                                        backgroundColor: "orange",
                                    }}
                                />
                            </Box>
                            <Typography
                                textAlign={"center"}
                                fontSize={{ xs: 10, sm: 14, md: 16 }}
                                fontWeight={600}
                            >
                                ID <span>{cv.ha_id}</span>
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
                                fontSize={{ xs: 25, sm: 35, md: 50 }}
                                fontWeight="bold"
                                mb={{ xs: 1, sm: 2, mb: 3 }}
                                noWrap
                            >
                                {cv.nickname.toUpperCase()}
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
                                    sx={{
                                        color: "primary.main",
                                        fontWeight: "bold",
                                        mr: 1,
                                        fontSize: { xs: 13, sm: 15, md: 17 },
                                    }}
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
                                    bgcolor: "#cfefe0",
                                    p: { xs: 0.3, sm: 1, md: 2 },
                                    columnGap: 0.5,
                                }}
                            >
                                <Grid2 size={5}>
                                    <ResumeText>
                                        AGE:{" "}
                                        <AgeCalculator
                                            date={cv?.date_of_birth}
                                        />{" "}
                                        YEARS
                                    </ResumeText>
                                    <ResumeText>
                                        GENDER:{" "}
                                        {cv?.gender == "Male" ? "M" : "F"}
                                    </ResumeText>
                                    <ResumeText>
                                        HEIGHT: {cv?.height}
                                        CM
                                    </ResumeText>
                                    <ResumeText>
                                        WEIGHT: {cv?.weight}
                                        KG
                                    </ResumeText>
                                </Grid2>
                                <Grid2 size={5}>
                                    <ResumeText>
                                        MARITAL STATUS: {cv?.marital_status}
                                    </ResumeText>
                                    <ResumeText>
                                        RELIGION: {cv?.religion}
                                    </ResumeText>
                                    <ResumeText>
                                        NATIONALITY: {cv?.nationality}
                                    </ResumeText>
                                </Grid2>
                            </Grid2>
                            <Grid2
                                container
                                sx={{
                                    bgcolor: "gray.100",
                                    p: { xs: 0.3, sm: 1, md: 2 },
                                }}
                                spacing={1}
                            >
                                <Grid2 size={5}>
                                    <Typography
                                        fontSize={{
                                            xs: 12,
                                            sm: 13,
                                            md: 15,
                                        }}
                                    >
                                        📞 +66 82 902 1957
                                    </Typography>
                                </Grid2>
                                <Grid2 size={6}>
                                    <Typography
                                        fontSize={{
                                            xs: 12,
                                            sm: 13,
                                            md: 15,
                                        }}
                                    >
                                        📧 heartyaidbkk@gmail.com
                                    </Typography>
                                </Grid2>
                            </Grid2>
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
                                sx={{
                                    color: "primary.main",
                                    fontWeight: "bold",
                                    mr: 1,
                                    fontSize: { xs: 10, sm: 15, md: 17 },
                                }}
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
                                                fontSize={{
                                                    xs: 8,
                                                    sm: 12,
                                                    md: 15,
                                                }}
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
                                sx={{
                                    color: "primary.main",
                                    fontWeight: "bold",
                                    mr: 1,
                                    fontSize: { xs: 9, sm: 15, md: 17 },
                                }}
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
                                        <ResumeItalic key={exp.id}>
                                            {exp.experience}
                                        </ResumeItalic>
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
                        bgcolor: "#bdf5dc",
                        m: { xs: 1, sm: 2, md: 3 },
                        p: { xs: 1, sm: 2, md: 3 },
                        borderRadius: { xs: 3, sm: 5, md: 10 },
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: { xs: 1, sm: 2 },
                        justifyContent: "center",
                    }}
                >
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
                                    sx={{
                                        color: "primary.main",
                                        fontWeight: "bold",
                                        mr: 0.5,
                                        fontSize: { xs: 11, sm: 14, md: 16 },
                                    }}
                                >
                                    ADVANCED CAREGIVER
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
                                {cv?.nursing_skills_for_elder.map(
                                    (skill, index) => (
                                        <ResumeItalic key={index}>
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
                                        </ResumeItalic>
                                    )
                                )}
                            </Box>
                        </Box>
                    )}

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
                                    sx={{
                                        color: "primary.main",
                                        fontWeight: "bold",
                                        mr: 1,
                                        fontSize: { xs: 11, sm: 14, md: 16 },
                                    }}
                                >
                                    NEWBORN NANNY
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
                                        <ResumeItalic key={index}>
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
                                        </ResumeItalic>
                                    )
                                )}
                            </Box>
                        </Box>
                    )}
                </Box>
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
            </Box>
        </Box>
    );
}

export default CVdetail;
