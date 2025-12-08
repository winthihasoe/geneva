import { Box, Container, Grid2, Typography } from "@mui/material";
import React from "react";
import logo from "../../../public/images/logo/logo.png"; // Adjust the path to your logo
import { usePage } from "@inertiajs/react";

function Footer() {
    const socialMediaLinks = usePage().props.socialMediaLinks || {};
    const lineId = usePage().props.lineId; // Make sure you pass this from backend

    const iconMap = {
        Facebook: "/images/social/facebook.png",
        Instagram: "/images/social/instagram.png",
        LINE: "/images/social/line.png",
        TikTok: "/images/social/tiktok.png",
        Viber: "/images/social/viber.png",
    };

    return (
        <Box sx={{ borderTop: "1px solid", borderColor: "primary.main" }}>
            <Container maxWidth="xl">
                <Grid2
                    container
                    sx={{
                        bgcolor: "white",
                        p: { xs: 2, sm: 3, md: 4 },
                        rowGap: 3,
                    }}
                >
                    <Grid2
                        size={{ xs: 12, sm: 6, md: 5 }}
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2,
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={logo}
                            alt="Geneva Logo"
                            style={{ width: 80, height: "auto" }}
                        />
                        <Box>
                            <Typography
                                variant="body2"
                                color="primary"
                                gutterBottom
                            >
                                <b>Mandalay Address:</b> 65st, 33st, Chan Aye
                                Tharsan Twp, Mandalay.
                            </Typography>
                            <Typography
                                variant="body2"
                                color="primary"
                                gutterBottom
                            >
                                <b>Yangon Address:</b> Kharmar Thi Road, North
                                Okkala, Yangon.
                            </Typography>

                            <Typography
                                variant="body2"
                                color="primary"
                                gutterBottom
                            >
                                <b>Phone:</b> 09970006670 | 09980160003
                            </Typography>
                            <Typography variant="body2" color="primary">
                                genevacaregivertraining@gmail.com
                            </Typography>
                        </Box>
                    </Grid2>
                    <Grid2
                        size={{ xs: 12, sm: 6, md: 4 }}
                        sx={{
                            display: "flex",
                            gap: 2,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {Object.entries(socialMediaLinks).map(
                            ([url, platform]) => {
                                // Special handling for LINE
                                if (platform === "LINE" && lineId) {
                                    return (
                                        <a
                                            key="LINE"
                                            href={`https://line.me/ti/p/${lineId}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ display: "inline-block" }}
                                        >
                                            <img
                                                src={iconMap["LINE"]}
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                }}
                                                alt="LINE"
                                            />
                                        </a>
                                    );
                                }
                                // Normal platforms
                                const iconSrc =
                                    iconMap[platform] ||
                                    "/images/social/default.png";
                                return (
                                    <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ display: "inline-block" }}
                                    >
                                        <img
                                            src={iconSrc}
                                            style={{ width: 50, height: 50 }}
                                            alt={platform}
                                        />
                                    </a>
                                );
                            }
                        )}
                    </Grid2>
                    <Grid2
                        size={{ xs: 12, sm: 12, md: 3 }}
                        textAlign={"center"}
                        mt={1}
                    >
                        <Typography
                            variant="body2"
                            color="primary"
                            gutterBottom
                        >
                            Copy Right <strong>@ 2025 Geneva Co.,ltd</strong>
                        </Typography>
                        <Typography
                            variant="body2"
                            fontSize={12}
                            color="primary"
                        >
                            Empowered by <strong>IHTechno Co.,ltd</strong>
                        </Typography>
                    </Grid2>
                </Grid2>
            </Container>
        </Box>
    );
}

export default Footer;
