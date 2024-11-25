import { router } from "@inertiajs/react";
import { Card, CardContent, CardMedia, Grid2, Typography } from "@mui/material";
import React from "react";

function CaregiverAndJobApplies({ totalCaregivers, totalJobApplies }) {
    return (
        <Grid2
            container
            px={{ xs: 0, sm: 1 }}
            mb={2}
            rowSpacing={1}
            justifyContent="space-around"
            maxWidth={650}
        >
            <Grid2 item xs={6} sm={6}>
                <Card
                    sx={{ pt: 1, maxWidth: 300, cursor: "pointer" }}
                    onClick={() => router.get(route("admin.cv.all"))}
                >
                    <CardMedia
                        sx={{
                            textAlign: "center",
                            mt: 1,
                        }}
                    >
                        <img
                            src="/images/dashboard/caregiver.png"
                            alt="Total Caregiver"
                            style={{
                                width: "77%",
                                backgroundColor: "#eee",
                                borderRadius: "5px",
                            }}
                        />
                    </CardMedia>
                    <CardContent sx={{ textAlign: "center" }}>
                        <Typography
                            fontSize={{ xs: 13, sm: 15, md: 16 }}
                            fontFamily={"Sansita"}
                            color={"primary"}
                        >
                            Total Caregivers
                        </Typography>
                        <Typography
                            fontSize={30}
                            fontFamily={"Sansita"}
                            color={"primary"}
                        >
                            {totalCaregivers}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid2>

            <Grid2 item xs={6} sm={6}>
                <Card
                    sx={{ pt: 1, maxWidth: 300, cursor: "pointer" }}
                    onClick={() => router.get(route("admin.job.apply"))}
                >
                    <CardMedia
                        sx={{
                            textAlign: "center",
                            mt: 1,
                        }}
                    >
                        <img
                            src="/images/dashboard/job_applies.png"
                            alt="Total Job Applies"
                            style={{
                                width: "80%",
                                backgroundColor: "#4CC9FE",
                                borderRadius: "5px",
                            }}
                        />
                    </CardMedia>
                    <CardContent sx={{ textAlign: "center" }}>
                        <Typography
                            fontSize={{ xs: 13, sm: 15, md: 16 }}
                            fontFamily={"Sansita"}
                        >
                            Total Job Applies
                        </Typography>
                        <Typography
                            fontSize={30}
                            fontFamily={"Sansita"}
                            color={"grey.600"}
                        >
                            {totalJobApplies}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid2>
        </Grid2>
    );
}

export default CaregiverAndJobApplies;
