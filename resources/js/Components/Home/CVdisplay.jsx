import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import React from "react";
import CaregiverCardMini from "./CaregiverCardMini";
import NoData from "../util/NoData";
import { router } from "@inertiajs/react";

function CVdisplay({ CVs }) {
    return (
        <Container maxWidth="lg" sx={{ padding: 0 }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    alignItems: "center",
                    bgcolor: "grey.100",
                    my: { xs: 0, sm: 5, md: 7 },
                    borderRadius: { xs: 0, sm: 2, md: 5 },
                    py: 6,
                    px: { xs: 1, sm: 2, md: 4 },
                }}
            >
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            color: "primary.main",
                            fontWeight: "bold",
                            textAlign: "center",
                            fontSize: {
                                xs: "1.6rem",
                                sm: "1.9rem",
                                md: "2.2rem",
                            },
                            fontFamily: "Righteous",
                            mb: 2,
                        }}
                    >
                        Welcome to Hearty Aid
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "0.9rem",
                            color: "text.secondary",
                            textAlign: "center",
                        }}
                    >
                        We're thrilled to have compassionate caregivers like you
                        join our team. Together, we'll make a real difference in
                        the lives of those we care for.{" "}
                        <i>Your journey with us starts here!</i>
                    </Typography>
                </Box>
                <Box
                    sx={{
                        position: "relative",
                        textAlign: "center",
                        overflow: "visible",
                    }}
                >
                    <Box
                        sx={{
                            backgroundImage: "url(/images/pointing-arrow.png)",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            position: "absolute",
                            top: -15,
                            right: -30,
                            width: { xs: 30 },
                            height: { xs: 30 },
                        }}
                    />
                    <Button
                        onClick={() => router.get(route("job.apply"))}
                        size="medium"
                        variant="contained"
                        color="secondary"
                    >
                        Apply Job
                    </Button>
                </Box>
                <Grid2 container sx={{ justifyContent: "center" }} spacing={2}>
                    {CVs && CVs.length > 0 ? (
                        CVs.map((cv, index) => (
                            <Grid2
                                key={index}
                                item
                                size={{ xs: 6, sm: 4, md: 3 }}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <CaregiverCardMini cv={cv} />
                            </Grid2>
                        ))
                    ) : (
                        <NoData />
                    )}
                </Grid2>
            </Box>
        </Container>
    );
}

export default CVdisplay;
