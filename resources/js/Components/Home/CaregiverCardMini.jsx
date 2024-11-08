import { Box, Button, Typography } from "@mui/material";
import React from "react";
import AgeCalculator from "../util/AgeCalculator";

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
                    <Typography
                        fontSize={16}
                        fontFamily={"ADLaM Display"}
                        mb={1}
                    >
                        {cv.nickname}
                    </Typography>
                    <Typography
                        fontSize={12}
                        fontFamily={"Actor"}
                        fontWeight={400}
                    >
                        Age: <AgeCalculator date={cv.date_of_birth} /> years old
                    </Typography>
                    <Typography fontSize={12} fontFamily={"Actor"}>
                        Nationality: {cv.nationality}
                    </Typography>

                    <Typography fontSize={12} fontFamily={"Actor"}>
                        Language:{" "}
                        {cv?.language
                            ?.map((lang) => lang.split(" ")[0])
                            .join(" / ")}
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
