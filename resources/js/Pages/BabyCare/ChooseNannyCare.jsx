import Noodle from "@/Components/Fancy/Noodle";
import AppLayout from "@/Layouts/AppLayout";
import { Head, router } from "@inertiajs/react";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";

function ChooseNannyCare() {
    return (
        <AppLayout>
            <Head title="Choose Options" />
            <Container
                maxWidth="lg"
                sx={{
                    position: "relative",
                    minHeight: "80vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box>
                    <Box>
                        <Typography
                            fontFamily={"Kavoon"}
                            fontWeight={400}
                            fontSize={{ xs: 20, sm: 30, md: 35 }}
                            textAlign={"center"}
                            color="primary"
                            my={3}
                        >
                            "Would you like your nanny to assist with household
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
                                    src="/images/babyCare/maid.png"
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
                                        router.get(route("care.nanny.start"))
                                    }
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: "Kavivanar",
                                            fontWeight: 400,
                                            fontSize: { xs: 25, sm: 30 },
                                        }}
                                    >
                                        I choose{" "}
                                        <strong
                                            style={{ fontFamily: "Kavoon" }}
                                        >
                                            Nanny Service !
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
                                        router.get(
                                            route("care.nanny.maid.start")
                                        )
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
                                        <strong
                                            style={{ fontFamily: "Kavoon" }}
                                        >
                                            Nanny + Maid Service !
                                        </strong>
                                    </Typography>
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Noodle top={10} right={5} />
                <Noodle bottom={0} left={10} />
                <Box
                    sx={{
                        display: { xs: "none", sm: "none", md: "flex" },
                    }}
                >
                    <img
                        src="/images/three_leaves.png"
                        alt="leaves"
                        style={{
                            width: 120,
                            position: "absolute",
                            bottom: 90,
                            left: -30,
                        }}
                    />
                </Box>
            </Container>
        </AppLayout>
    );
}

export default ChooseNannyCare;
