import {
    Box,
    Button,
    Grid2 as Grid,
    IconButton,
    Typography,
} from "@mui/material";
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
                fontFamily={"Roboto Slab"}
                gutterBottom
                variant="h6"
                textAlign="center"
            >
                {resume.full_name}
            </Typography>

            {/* Middle line  */}
            <Grid container justifyContent="space-between" p={1} spacing={2}>
                <Grid item size={6}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
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
                            sx={{ fontSize: "0.7rem" }}
                        >
                            Approve
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={() =>
                                router.get(route("admin.cv.single", resume.id))
                            }
                            sx={{ fontSize: "0.7rem" }}
                        >
                            Detail
                        </Button>
                    </Box>
                </Grid>
                <Grid item size={6}>
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
