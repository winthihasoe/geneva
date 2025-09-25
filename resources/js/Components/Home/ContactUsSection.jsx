import { Box, Container, Grid2, Typography } from "@mui/material";
import React from "react";
import ContactForm from "../Forms/ContactForm";

function ContactUsSection() {
    return (
        <Container maxWidth="lg" sx={{ padding: 0, py: 5 }}>
            <Grid2 container spacing={2} justifyContent="center">
                <Grid2 item size={{ xs: 12, sm: 6 }} sx={{ px: 1 }}>
                    <ContactForm />
                </Grid2>
                <Grid2
                    item
                    size={{ xs: 10, sm: 5 }}
                    sx={{ display: "flex", justifyContent: "center", m: 1 }}
                >
                    <Box
                        sx={{
                            width: 300,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            gap: 2,
                        }}
                    >
                        <Typography
                            textAlign={"center"}
                            variant="h3"
                            fontFamily={"Righteous"}
                            fontWeight={500}
                            gutterBottom
                        >
                            Hiring A Nanny or A Caregiver
                        </Typography>
                        <Typography
                            textAlign={"center"}
                            variant="h6"
                            fontFamily={"Righteous"}
                            fontWeight={500}
                            color="primary.main"
                            gutterBottom
                        >
                            How it works?
                        </Typography>
                        <Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 2,
                                    mt: 2,
                                }}
                            >
                                <img
                                    src="/images/1.png"
                                    alt="1"
                                    style={{
                                        width: "50px",
                                        height: "auto",
                                        objectFit: "cover",
                                    }}
                                />
                                <Typography variant="h6">
                                    Select Care Type
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 2,
                                    mt: 2,
                                }}
                            >
                                <img
                                    src="/images/2.png"
                                    alt="1"
                                    style={{
                                        width: "50px",
                                        height: "auto",
                                        objectFit: "cover",
                                    }}
                                />
                                <Typography variant="h6">
                                    Provide Care Info
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 2,
                                    mt: 2,
                                }}
                            >
                                <img
                                    src="/images/3.png"
                                    alt="1"
                                    style={{
                                        width: "50px",
                                        height: "auto",
                                        objectFit: "cover",
                                    }}
                                />
                                <Typography variant="h6">
                                    Choose a Caregiver
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 2,
                                    mt: 2,
                                }}
                            >
                                <img
                                    src="/images/4.png"
                                    alt="1"
                                    style={{
                                        width: "50px",
                                        height: "auto",
                                        objectFit: "cover",
                                    }}
                                />
                                <Typography variant="h6">
                                    Book Your Schedule
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid2>
            </Grid2>
        </Container>
    );
}

export default ContactUsSection;
