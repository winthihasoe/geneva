import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid2 as Grid,
    IconButton,
    Rating,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { router } from "@inertiajs/react";
import AgeCalculator from "@/Components/util/AgeCalculator";
import ReusableModal from "@/Components/util/ReusableModal";
import YesOrNoModal from "@/Components/util/YesOrNoModal";

export default function ResumeCard({ resume }) {
    return (
        <Card
            sx={{
                width: { xs: 140, sm: 160, md: 180 },
                height: "100%",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                },
                cursor: "pointer",
            }}
            onClick={() =>
                router.visit(route("admin.cv.single", { cvId: resume.id }))
            }
        >
            <CardMedia sx={{ height: { xs: 120, sm: 150 } }}>
                {resume.profile_photo ? (
                    <Box
                        sx={{
                            height: "100%",
                            overflow: "hidden",
                            borderRadius: "8px 8px 0 0",
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
                            borderRadius: "8px 8px 0 0",
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
                    p: { xs: 0.5, sm: 2 },
                }}
            >
                <Typography
                    fontWeight={700}
                    fontFamily={"Roboto Slab"}
                    fontSize={{ xs: "0.7rem", sm: "1rem", md: "1rem" }}
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}
                >
                    {resume.full_name}
                </Typography>

                <Typography
                    fontSize={{ xs: "0.6rem", sm: "0.8rem", md: "0.8rem" }}
                    color="text.secondary"
                >
                    <AgeCalculator date={resume.date_of_birth} /> yrs |{" "}
                    {resume.weight} kg | {resume.height} cm
                </Typography>
                <Typography
                    fontSize={{ xs: "0.6rem", sm: "0.8rem", md: "0.8rem" }}
                    color="text.secondary"
                >
                    {resume.service_area || "Service area?"}
                </Typography>
                {resume.reviews_count > 0 && (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            mt: 0.5,
                        }}
                    >
                        <Rating
                            value={resume.reviews_avg_rating || 0}
                            readOnly
                            size="small"
                            precision={0.5}
                            sx={{
                                fontSize: "0.9rem",
                            }}
                        />
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                fontSize: "0.65rem",
                            }}
                        >
                            ({resume.reviews_count})
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}
