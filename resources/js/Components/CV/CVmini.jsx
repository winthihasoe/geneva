import React, { useContext } from "react";
import { Box, Typography, Divider, Grid2 } from "@mui/material";
import { router } from "@inertiajs/react";
import { CarePlanContext } from "@/Context/CarePlanContext";

const CVmini = ({ cv }) => {
    const { handleSubmit } = useContext(CarePlanContext);
    const handleSelect = () => {
        handleSubmit();
        router.get(route("care.cv.shows", cv.slug));
    };
    return (
        <Box
            position={"relative"}
            sx={{ width: 250, cursor: "pointer" }}
            onClick={handleSelect}
        >
            <Box
                sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    position: "absolute",
                    top: -15,
                    right: -15,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000,
                }}
            >
                <Typography
                    textAlign={"center"}
                    fontSize={13}
                    fontFamily={"Kavoon"}
                    color="#fff"
                >
                    ID <br />
                    {cv.ha_id}
                </Typography>
            </Box>
            {cv !== null && (
                <Grid2
                    container
                    sx={{
                        minHeight: 280,
                        margin: "auto",
                        borderRadius: 5,
                        overflow: "hidden",
                        position: "relative",
                        boxShadow: 3,
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
                                height: 200,
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
                                            height: 100,
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
                                        p: { xs: 1, sm: 1 },
                                        bgcolor: "#85e1ba",
                                    }}
                                >
                                    <Typography fontSize={7} fontWeight={600}>
                                        PERSONAL DETAILS
                                    </Typography>

                                    <Box mt={1}>
                                        <Typography fontSize={5} mb={0.5}>
                                            <strong>Date of Birth:</strong>{" "}
                                            {cv.date_of_birth}
                                        </Typography>
                                        <Typography fontSize={5} mb={0.5}>
                                            <strong>Nationality:</strong>{" "}
                                            {cv.nationality}
                                        </Typography>
                                        <Typography fontSize={5} mb={0.5}>
                                            <strong>Marital Status:</strong>{" "}
                                            {cv.marital_status}
                                        </Typography>

                                        <Typography fontSize={5} mb={0.5}>
                                            <strong>Religion:</strong>{" "}
                                            {cv.religion}
                                        </Typography>
                                        <Typography fontSize={5}>
                                            <strong>Weight & Height:</strong>{" "}
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
                                        p: { xs: 1, sm: 1 },
                                    }}
                                >
                                    <Typography fontSize={7} fontWeight={600}>
                                        EDUCATION
                                    </Typography>

                                    <Typography fontSize={5} mb={1}>
                                        {cv.education_level}
                                    </Typography>
                                    <Typography fontSize={5}>
                                        {cv.caregiver_qualification}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid2>

                    <Grid2 size={7} sx={{ p: { xs: 1, sm: 3, md: 4 } }}>
                        <Typography
                            variant="h3"
                            fontSize={14}
                            fontWeight="bold"
                            color="primary"
                        >
                            {cv.nickname.toUpperCase()}
                        </Typography>
                        <Box mb={1}>
                            {/* Showing Newborn care Level  */}
                            <Typography
                                fontSize={7}
                                variant="h6"
                                color="text.secondary"
                            >
                                {cv?.newborn_care_level?.toUpperCase()}
                            </Typography>

                            {/* Showing Nanny care Level  */}
                            <Typography
                                fontSize={7}
                                variant="h6"
                                color="text.secondary"
                            >
                                {cv?.nanny_care_level?.toUpperCase()}
                            </Typography>
                            {/* Showing Elder care level  */}
                            <Typography
                                fontSize={7}
                                variant="h6"
                                color="text.secondary"
                            >
                                {cv?.level?.toUpperCase()}
                            </Typography>
                        </Box>

                        {/* Contact Information */}
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                                borderTop: "2px solid",
                                borderBottom: "2px solid",
                                borderColor: "primary.main",
                            }}
                        >
                            <Box
                                display="flex"
                                flexDirection="column"
                                gap={0.5}
                            >
                                <Typography fontSize={6}>
                                    📞 +66 620 90 8578
                                </Typography>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                borderBottom: "2px solid",
                                borderColor: "primary.main",
                            }}
                        >
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                bgcolor={"#85e1ba"}
                                display={"inline-block"}
                                p={1}
                                fontSize={7}
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
                                        <Typography
                                            fontWeight={"bold"}
                                            fontSize={9}
                                        >
                                            Baby care
                                        </Typography>
                                        {cv?.nursing_skills_for_child
                                            ?.slice(0, 4)
                                            .map((skill, index) => (
                                                <Typography
                                                    key={index}
                                                    fontSize={7}
                                                    mb={0.5}
                                                >
                                                    {skill}
                                                </Typography>
                                            ))}
                                    </Box>
                                )}
                                {cv?.nursing_skills_for_elder?.length > 0 && (
                                    <Box>
                                        <Typography
                                            fontWeight={"bold"}
                                            fontSize={9}
                                        >
                                            Elder care
                                        </Typography>
                                        {cv?.nursing_skills_for_elder
                                            ?.slice(0, 4)
                                            .map((skill, index) => (
                                                <Typography
                                                    key={index}
                                                    fontSize={7}
                                                    mb={0.5}
                                                >
                                                    {skill}
                                                </Typography>
                                            ))}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Grid2>
                </Grid2>
            )}
        </Box>
    );
};

export default CVmini;
