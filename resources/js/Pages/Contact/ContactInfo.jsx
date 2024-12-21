import Shape from "@/Components/Fancy/Shape";
import ThreeArrows from "@/Components/Fancy/ThreeArrows";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";

export default function ContactInfo() {
    return (
        <AppLayout>
            <Head title="Contact Information" />
            <Box
                sx={{
                    bgcolor: "#E0F4EC",
                    position: "relative",
                    height: { xs: 320, sm: 500 },
                    overflow: "hidden",
                }}
            >
                <ThreeArrows top={0} left={10} />
                <Box
                    sx={{
                        maxWidth: 500,
                        margin: "auto",
                        position: "relative",
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: 70,
                            left: 30,
                            width: { xs: 150, sm: 250 },
                        }}
                    >
                        <img
                            src="/images/contact/welcome.png"
                            alt="arrow"
                            style={{
                                width: "100%",
                            }}
                        />
                    </Box>
                    <Box
                        component="img"
                        src="/images/contact/caregiver.png"
                        alt="Caregiver"
                        sx={{
                            width: { xs: "100%", sm: "100%", md: "100%" },
                        }}
                    />
                </Box>
            </Box>
            <Container maxWidth="md" sx={{ position: "relative" }}>
                {/* Office Address  */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: "center",
                        py: 4,
                    }}
                >
                    <Box
                        component="img"
                        src="/images/contact/location.svg"
                        alt="Location"
                        sx={{
                            width: { xs: "70%", sm: 150 },
                        }}
                    />
                    <Box>
                        <Typography
                            fontFamily={"Lilita One"}
                            fontSize={{ xs: 35, sm: 40, md: 45 }}
                            textAlign={{ xs: "center", sm: "left" }}
                            sx={{
                                wordWrap: "break-word",
                                mb: 2,
                                color: "primary.main",
                                textShadow:
                                    "3px 3px 0 #FFFFFF, -3px -3px 0 #FFFFFF, 3px -3px 0 #FFFFFF, -3px 3px 0 #FFFFFF, 4px 4px 10px rgba(0, 0, 0, 0.5)", // White stroke and subtle shadow
                            }}
                        >
                            Office Address
                        </Typography>
                        <Typography
                            fontFamily={"Livvic"}
                            fontSize={{ xs: 20, sm: 30 }}
                            textAlign={{ xs: "center", sm: "left" }}
                        >
                            283/39, 41 Homeplace office building, Thong Lo 13
                            Alley, Klongtan Nua, Watthana,Bangkok 10110
                        </Typography>
                    </Box>
                </Box>

                {/* Phone Number  */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: "center",
                        py: 4,
                    }}
                >
                    <Box
                        component="img"
                        src="/images/contact/phone_call.svg"
                        alt="Phone Call"
                        sx={{
                            width: { xs: "70%", sm: 150 },
                        }}
                    />
                    <Box textAlign={"center"}>
                        <Typography
                            fontFamily={"Lilita One"}
                            fontSize={{ xs: 35, sm: 40, md: 45 }}
                            textAlign={{ xs: "center", sm: "left" }}
                            sx={{
                                wordWrap: "break-word",
                                mb: 2,
                                color: "primary.main",
                                textShadow:
                                    "3px 3px 0 #FFFFFF, -3px -3px 0 #FFFFFF, 3px -3px 0 #FFFFFF, -3px 3px 0 #FFFFFF, 4px 4px 10px rgba(0, 0, 0, 0.5)", // White stroke and subtle shadow
                            }}
                        >
                            Phone Number
                        </Typography>
                        <Button
                            onClick={() => {
                                window.open(`tel:${"+66620908578"}`, "_self");
                            }}
                        >
                            <Typography
                                fontFamily={"Livvic"}
                                color="#000"
                                fontSize={{ xs: 20, sm: 30 }}
                                textAlign={{ xs: "center", sm: "left" }}
                            >
                                06 20 90 85 78
                            </Typography>
                        </Button>
                        <br />
                        <Button
                            onClick={() => {
                                window.open(`tel:${"+66829021957"}`, "_self");
                            }}
                        >
                            <Typography
                                fontFamily={"Livvic"}
                                fontSize={{ xs: 20, sm: 30 }}
                                color="#000"
                                textAlign={{ xs: "center", sm: "left" }}
                            >
                                08 29 02 19 57
                            </Typography>
                        </Button>
                    </Box>
                </Box>

                {/* Email Address  */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: "center",
                        py: 4,
                    }}
                >
                    <Box
                        component="img"
                        src="/images/contact/email.png"
                        alt="Email"
                        sx={{
                            width: { xs: "70%", sm: 150 },
                        }}
                    />
                    <Box>
                        <Typography
                            fontFamily={"Lilita One"}
                            fontSize={{ xs: 35, sm: 40, md: 45 }}
                            textAlign={{ xs: "center", sm: "left" }}
                            sx={{
                                wordWrap: "break-word",
                                mb: 2,
                                color: "primary.main",
                                textShadow:
                                    "3px 3px 0 #FFFFFF, -3px -3px 0 #FFFFFF, 3px -3px 0 #FFFFFF, -3px 3px 0 #FFFFFF, 4px 4px 10px rgba(0, 0, 0, 0.5)", // White stroke and subtle shadow
                            }}
                        >
                            Email Address
                        </Typography>
                        <Typography
                            fontFamily={"Livvic"}
                            fontSize={{ xs: 20, sm: 30 }}
                            textAlign={{ xs: "center", sm: "left" }}
                        >
                            heartyaidbkk@gmail.com
                        </Typography>
                    </Box>
                </Box>

                {/* Line Id  */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: "center",
                        py: 4,
                    }}
                >
                    <Box
                        component="img"
                        src="/images/contact/line.svg"
                        alt="Email"
                        sx={{
                            width: { xs: "70%", sm: 150 },
                        }}
                    />
                    <Box>
                        <Typography
                            fontFamily={"Lilita One"}
                            fontSize={{ xs: 35, sm: 40, md: 45 }}
                            textAlign={{ xs: "center", sm: "left" }}
                            sx={{
                                wordWrap: "break-word",
                                mb: 2,
                                color: "primary.main",
                                textShadow:
                                    "3px 3px 0 #FFFFFF, -3px -3px 0 #FFFFFF, 3px -3px 0 #FFFFFF, -3px 3px 0 #FFFFFF, 4px 4px 10px rgba(0, 0, 0, 0.5)", // White stroke and subtle shadow
                            }}
                        >
                            Line ID
                        </Typography>
                        <a
                            href="line://ti/p/heartyaid" // Use your Line ID here
                            style={{ textDecoration: "none", color: "inherit" }}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Typography
                                fontFamily={"Livvic"}
                                fontSize={{ xs: 20, sm: 30 }}
                                textAlign={{ xs: "center", sm: "left" }}
                                sx={{ cursor: "pointer" }}
                            >
                                heartyaid
                            </Typography>
                        </a>
                    </Box>
                </Box>
                <Shape bottom={"20%"} right={20} />
            </Container>
        </AppLayout>
    );
}
