import { Box, Button, Typography } from "@mui/material";
import React from "react";
import AgeCalculator from "../util/AgeCalculator";
import LongText from "../Typo/LongText";

function CaregiverCardMini({ cv }) {
    return (
        <Box pl={9}>
            <Box
                sx={{
                    width: 230,
                    bgcolor: "white",
                    borderRadius: 5,
                    position: "relative",
                    m: 2,
                    p: 1,
                }}
            >
                <img
                    src={`/storage/${cv?.profile_photo}`}
                    alt="Caretiver photo"
                    style={{
                        width: 130,
                        height: 130,
                        objectFit: "cover",
                        borderRadius: "50%",
                        position: "absolute",
                        left: -80,
                        backgroundColor: "white",
                        padding: "8px",
                    }}
                />
                <Box pl={6}>
                    <Typography fontSize={16} fontFamily={"ADLaM Display"}>
                        {cv.nickname}
                    </Typography>
                    <Typography
                        fontSize={11}
                        fontFamily={"ADLaM Display"}
                        color="primary"
                    >
                        {cv?.newborn_care_level?.toUpperCase()}
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
                    <Typography
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

                        {cv.nanny_experience_years !== "None" &&
                            cv.nanny_experience_years !== null &&
                            `${cv.nanny_experience_years} in Nanny care`}
                        {cv.nanny_experience_years !== "None" &&
                            cv.nanny_experience_years !== null && <br />}

                        {cv.elder_experience_years !== "None" &&
                            cv.elder_experience_years !== null &&
                            `${cv.elder_experience_years} in Elder care`}
                    </Typography>

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
