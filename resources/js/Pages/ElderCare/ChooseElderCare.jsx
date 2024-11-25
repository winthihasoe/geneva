import Noodle from "@/Components/Fancy/Noodle";
import ThreeLeaves from "@/Components/Fancy/ThreeLeaves";
import AppLayout from "@/Layouts/AppLayout";
import { Head, router } from "@inertiajs/react";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";

function ChooseElderCare() {
    return (
        <AppLayout>
            <Head title="Choose Options" />
            <Container
                maxWidth="lg"
                sx={{
                    position: "relative",
                    minHeight: "70vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <Typography
                    fontFamily={"Kavoon"}
                    fontWeight={400}
                    fontSize={{ xs: 20, sm: 30, md: 35 }}
                    textAlign={"center"}
                    color="primary"
                    my={3}
                >
                    "Would you like your caregiver to assist with household
                    tasks?"
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap-reverse",
                        p: 1,
                        justifyContent: "center",
                        gap: 4,
                        my: 5,
                    }}
                >
                    <Box>
                        <img
                            src="/images/elderCare/maid.png"
                            alt="Maid"
                            style={{ width: 300 }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            gap: 3,
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                px: 4,
                                py: 2,
                                bgcolor: "#21875C",
                                borderRadius: 5,
                            }}
                            onClick={() =>
                                router.get(route("care.caregiver.start"))
                            }
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Kavivanar",
                                    fontWeight: 400,
                                    fontSize: { xs: 20, sm: 25 },
                                }}
                            >
                                I choose{" "}
                                <strong style={{ fontFamily: "Kavoon" }}>
                                    Caregiver Service Only !
                                </strong>
                            </Typography>
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                px: 4,
                                py: 2,
                                bgcolor: "#F77957",
                                borderRadius: 5,
                            }}
                            onClick={() =>
                                router.get(route("care.caregiver.maid.start"))
                            }
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Kavivanar",
                                    fontWeight: 400,
                                    fontSize: { xs: 20, sm: 25 },
                                }}
                            >
                                I choose{" "}
                                <strong style={{ fontFamily: "Kavoon" }}>
                                    Caregiver + Maid Service !
                                </strong>
                            </Typography>
                        </Button>
                    </Box>
                </Box>
                <Noodle top={10} right={5} />
                <Noodle bottom={0} left={10} />

                <ThreeLeaves bottom={90} left={-30} />
            </Container>
        </AppLayout>
    );
}

export default ChooseElderCare;
