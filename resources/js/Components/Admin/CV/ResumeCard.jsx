import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid2 as Grid,
    IconButton,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { router } from "@inertiajs/react";
import AgeCalculator from "@/Components/util/AgeCalculator";
import ReusableModal from "@/Components/util/ReusableModal";
import YesOrNoModal from "@/Components/util/YesOrNoModal";

export default function ResumeCard({ resume }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleApprove = () => {
        router.put(route("admin.cv.approve", resume.id));
        handleClose();
    };
    return (
        <Card
            sx={{
                width: { xs: 140, sm: 160, md: 180 },
                height: "100%",
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                },
            }}
        >
            <CardMedia sx={{ height: { xs: 150, sm: 180 } }}>
                {resume.profile_photo ? (
                    <Box
                        sx={{
                            height: "100%",
                            overflow: "hidden",
                            borderRadius: "12px 12px 0 0",
                        }}
                    >
                        <img
                            src={`/storage/${resume.profile_photo}`}
                            alt={resume.full_name}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                            background:
                                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            borderRadius: "12px 12px 0 0",
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                color: "white",
                                fontWeight: 600,
                            }}
                        >
                            {resume.full_name?.charAt(0)?.toUpperCase()}
                        </Typography>
                    </Box>
                )}
            </CardMedia>
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                }}
            >
                <Typography
                    fontWeight={700}
                    fontFamily={"Roboto Slab"}
                    fontSize={"1.1rem"}
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {resume.full_name}
                </Typography>

                <Typography fontSize={12} color="text.secondary">
                    Age: <AgeCalculator date={resume.date_of_birth} /> yrs
                </Typography>
                <Typography fontSize={12} color="text.secondary">
                    {resume.service_area || "Please update service area"}
                </Typography>

                <Button
                    variant="contained"
                    size="medium"
                    onClick={() =>
                        router.get(route("admin.cv.single", resume.id))
                    }
                    sx={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        textTransform: "none",
                        borderRadius: 2,
                        py: { xs: 0.5, sm: 1 },
                        mt: "auto",
                    }}
                    fullWidth
                >
                    Details
                </Button>
            </CardContent>
        </Card>
    );
}
