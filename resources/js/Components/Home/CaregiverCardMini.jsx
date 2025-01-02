import { Box, Button, Chip, Typography } from "@mui/material";
import React from "react";
import AgeCalculator from "../util/AgeCalculator";

function CaregiverCardMini({ cv }) {
    return (
        <Box
            sx={{
                width: { xs: "100%", sm: "50%", md: "50%" },
                m: "10px auto",
                pl: 10,
            }}
        >
            <Box
                sx={{
                    width: "90%",
                    maxWidth: 230,
                    bgcolor: "#fff",
                    borderRadius: 5,
                    position: "relative",
                    m: "10px auto",
                    p: 1,
                    boxShadow: 1,
                }}
            >
                {cv?.status == "Blacklisted" && (
                    <Box
                        sx={{
                            backgroundImage: "url(/images/blacklisted.png)",
                            backgroundSize: "contain",
                            height: "40%",
                            width: "40%",
                            backgroundRepeat: "no-repeat",
                            position: "absolute",
                            left: -20,
                            top: 60,
                            transform: `rotate(-20deg)`,
                            zIndex: 1000,
                        }}
                    />
                )}
                <Box
                    sx={{
                        width: { xs: 130, sm: 130, md: 100, lg: 130 },
                        height: { xs: 130, sm: 130, md: 100, lg: 130 },
                        position: "absolute",
                        left: -80,
                    }}
                >
                    <img
                        src={`/storage/${cv?.profile_photo}`}
                        alt="Caretiver photo"
                        style={{
                            objectFit: "cover",
                            borderRadius: "50%",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "white",
                            padding: "8px",
                        }}
                    />
                </Box>
                <Box pl={{ xs: 6, sm: 6, md: 2, lg: 6 }} position={"relative"}>
                    {cv?.status == "Available" && (
                        <Chip
                            variant="containe"
                            color="success"
                            label={
                                <Typography fontSize={10}>Available</Typography>
                            }
                            size="small"
                            sx={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                            }}
                        />
                    )}
                    {cv?.status == "Occupied" && (
                        <Chip
                            variant="containe"
                            color="error"
                            label={
                                <Typography fontSize={10}>Occupied</Typography>
                            }
                            size="small"
                            sx={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                            }}
                        />
                    )}
                    <Typography fontSize={16} fontFamily={"ADLaM Display"}>
                        {cv.nickname}
                    </Typography>

                    <Typography
                        fontSize={11}
                        fontFamily={"ADLaM Display"}
                        color="primary"
                    >
                        {cv?.nanny_care_level?.toUpperCase()}
                    </Typography>
                    <Typography
                        fontSize={11}
                        fontFamily={"ADLaM Display"}
                        mb={1}
                        color="primary"
                    >
                        {cv?.level?.toUpperCase()}
                    </Typography>
                    <Typography
                        fontSize={12}
                        fontFamily={"Actor"}
                        fontWeight={400}
                    >
                        Age: <AgeCalculator date={cv.date_of_birth} /> years
                    </Typography>

                    {/* <Typography fontSize={12} fontFamily={"Actor"}>
                        {cv?.detail_experience?.substring(0, 80)} ...
                    </Typography> */}
                    {cv?.experiences &&
                        cv?.experiences.length > 0 &&
                        cv?.experiences
                            .sort((a, b) => {
                                if (a.order === b.order) {
                                    // Secondary sort by `id` if `order` is the same
                                    return a.id - b.id;
                                }
                                return a.order - b.order; // Primary sort by `order`
                            })
                            .slice(0, 1)
                            .map((exp, index) => (
                                <Typography
                                    key={index}
                                    fontFamily={"Actor"}
                                    fontSize={10}
                                    color="primary"
                                    fontWeight={600}
                                    sx={{
                                        display: "-webkit-box", // Required for line clamping
                                        WebkitBoxOrient: "vertical", // Required for line clamping
                                        overflow: "hidden", // Hide overflowing text
                                        WebkitLineClamp: 2, // Limit text to 2 lines
                                    }}
                                >
                                    {exp.experience}
                                </Typography>
                            ))}
                    {/* <Typography
                        fontFamily={"Actor"}
                        fontSize={10}
                        color="primary"
                        fontWeight={600}
                    >
                        {cv.newborn_experience_years !== "None" &&
                            cv.newborn_experience_years !== null &&
                            `${cv.newborn_experience_years} in Newborn care`}
                        {cv.newborn_experience_years !== "None" &&
                            cv.newborn_experience_years !== null && <br />}

            
                        {cv.elder_experience_years !== "None" &&
                            cv.elder_experience_years !== null &&
                            `${cv.elder_experience_years} in Elder care`}
                    </Typography> */}

                    <Typography fontSize={12} fontFamily={"Actor"}>
                        Nationality: {cv.nationality}
                    </Typography>

                    <Typography
                        fontSize={12}
                        color="primary"
                        fontFamily={"Actor"}
                    >
                        ID: {cv.ha_id}
                    </Typography>
                </Box>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ borderRadius: 20, px: 2, mt: 1 }}
                    disabled
                >
                    <Typography
                        fontSize={14}
                        fontFamily={"Actor"}
                        fontWeight={"bold"}
                    >
                        Book an interview
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
}

export default CaregiverCardMini;
