import { Box, Grid2, Typography } from "@mui/material";
import React from "react";
import { router } from "@inertiajs/react";
import AgeCalculator from "@/Components/util/AgeCalculator";

export default function CVcard({ resume }) {
    return (
        <Box
            sx={{
                width: 300,
                p: 1,
                borderWidth: 2,
                borderColor: "primary",
                borderRadius: 3,
                boxShadow: 3,
            }}
            onClick={() => router.get(route("admin.cv.single", resume.id))}
        >
            {/* Top line  */}

            <Typography
                fontWeight={600}
                fontFamily={"Karma"}
                variant="h6"
                textAlign="center"
            >
                {resume.full_name}
            </Typography>
            <Typography
                fontSize={{ xs: 12, sm: 13, md: 14 }}
                textAlign="center"
            >
                Nickname: <strong>{resume.nickname}</strong>
            </Typography>
            {/* Middle line  */}
            <Grid2 container justifyContent="space-between" p={1}>
                <Grid2 size={6}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: 0.5,
                        }}
                    >
                        <Typography fontSize={11}>
                            ID: <strong>{resume.geneva_id}</strong>
                        </Typography>
                        <Typography fontSize={11}>
                            Age:{" "}
                            <strong>
                                <AgeCalculator date={resume.date_of_birth} />{" "}
                                yrs
                            </strong>
                        </Typography>
                        <Typography fontSize={11}>
                            Gender: <strong>{resume.gender}</strong>
                        </Typography>
                        <Typography fontSize={11}>
                            Weight: <strong>{resume.weight} kg</strong>
                        </Typography>
                        <Typography fontSize={11}>
                            Height: <strong>{resume.height} cm</strong>
                        </Typography>
                        <Typography fontSize={11}>
                            Level: <strong>{resume.level} </strong>
                        </Typography>

                        <Typography fontSize={11}>
                            Location: <strong>{resume.current_location}</strong>
                        </Typography>
                    </Box>
                </Grid2>
                <Grid2 size={5}>
                    <Box
                        sx={{
                            backgroundImage: `url(/storage/${resume.profile_photo})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            height: 150,
                            borderRadius: 3,
                            border: "1px solid #ddd",
                        }}
                    />
                </Grid2>
            </Grid2>
        </Box>
    );
}
