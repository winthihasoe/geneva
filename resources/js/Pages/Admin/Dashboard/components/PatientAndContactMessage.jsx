import { router } from "@inertiajs/react";
import { Card, CardContent, CardMedia, Grid2, Typography } from "@mui/material";
import React from "react";

function PatientAndContactMessage({ totalPatients, totalContactMessages }) {
    return (
        <Grid2
            container
            px={{ xs: 0, sm: 1 }}
            mb={2}
            rowSpacing={1}
            justifyContent="space-around"
            maxWidth={600}
        >
            <Grid2 size={6} sx={{ p: 1 }}>
                <Card
                    sx={{ cursor: "pointer" }}
                    onClick={() => router.get(route("admin.patients"))}
                >
                    <CardMedia>
                        <img
                            src="/images/dashboard/patient.jpg"
                            alt="Total Caregiver"
                            style={{
                                width: "100%",
                                backgroundColor: "#eee",
                                borderRadius: "5px",
                                height: "140px",
                                objectFit: "cover",
                            }}
                        />
                    </CardMedia>
                    <CardContent sx={{ textAlign: "center" }}>
                        <Typography
                            fontSize={{ xs: 13, sm: 15, md: 16 }}
                            fontFamily={"Karma"}
                            color={"secondary"}
                        >
                            Total Patients
                        </Typography>
                        <Typography
                            fontSize={30}
                            fontFamily={"Karma"}
                            color={"primary"}
                        >
                            {totalPatients}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid2>

            <Grid2 size={6} sx={{ p: 1 }}>
                <Card
                    sx={{ cursor: "pointer" }}
                    onClick={() => router.get(route("admin.messages"))}
                >
                    <CardMedia>
                        <img
                            src="/images/dashboard/message.jpg"
                            alt="Total Job Applies"
                            style={{
                                width: "100%",
                                backgroundColor: "#4CC9FE",
                                borderRadius: "5px",
                                height: "140px",
                                objectFit: "cover",
                            }}
                        />
                    </CardMedia>
                    <CardContent sx={{ textAlign: "center" }}>
                        <Typography
                            fontSize={{ xs: 13, sm: 15, md: 16 }}
                            fontFamily={"Karma"}
                            color="primary"
                        >
                            Total Messages
                        </Typography>
                        <Typography
                            fontSize={30}
                            fontFamily={"Karma"}
                            color={"grey.600"}
                        >
                            {totalContactMessages}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid2>
        </Grid2>
    );
}

export default PatientAndContactMessage;
