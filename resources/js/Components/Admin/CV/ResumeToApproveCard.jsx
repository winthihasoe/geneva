import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { router } from "@inertiajs/react";
import AgeCalculator from "@/Components/util/AgeCalculator";
import ReusableModal from "@/Components/util/ReusableModal";
import YesOrNoModal from "@/Components/util/YesOrNoModal";

export default function ResumeToApproveCard({ resume }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleApprove = () => {
        router.put(route("admin.cv.approve", resume.id));
        handleClose();
    };
    return (
        <Box
            sx={{
                width: 300,
                p: 1,
                borderWidth: 2,
                borderColor: "primary",
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            {/* Top line  */}

            <Typography
                fontWeight={600}
                gutterBottom
                variant="h6"
                textAlign="center"
            >
                {resume.full_name}
            </Typography>
            <Typography
                fontSize={{ xs: 12, sm: 13, md: 14 }}
                textAlign="center"
                color="text.secondary"
            >
                Nickname: <strong>{resume.nickname}</strong>
            </Typography>
            {/* Middle line  */}
            <Grid container justifyContent="space-between" p={1}>
                <Grid item xs={6}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Typography fontSize={11}>
                            ID: <strong>{resume.ha_id}</strong>
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
                            Level: <strong>{resume.level} </strong>
                        </Typography>

                        <Typography fontSize={11}>
                            Location: <strong>{resume.current_location}</strong>
                        </Typography>
                    </Box>
                    {/* Lower line: expreience  */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            mt: 1,
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleOpen}
                            size="small"
                        >
                            <Typography variant="body2">Approve</Typography>
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={() =>
                                router.get(route("admin.cv.single", resume.id))
                            }
                        >
                            <Typography variant="body2">Detail</Typography>
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={5}>
                    {resume.profile_photo ? (
                        <img
                            src={`/storage/${resume.profile_photo}`}
                            alt="Profile"
                            style={{
                                height: "150px",
                                width: "100%",
                                objectFit: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundColor: "orange",
                                borderRadius: 18,
                            }}
                        />
                    ) : (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                p: 2,
                                height: 150,
                                borderRadius: 3,
                                border: "1px solid #ddd",
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                textAlign={"center"}
                            >
                                No Profile Photo
                            </Typography>
                        </Box>
                    )}
                </Grid>
            </Grid>
            <YesOrNoModal
                open={open}
                onClose={handleClose}
                title="Approve Resume"
                onConfirm={handleApprove}
            />
        </Box>
    );
}
