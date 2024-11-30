import { Box, Grid2, Typography } from "@mui/material";
import React from "react";
import logo from "../../../public/images/logo/logo.png"; // Adjust the path to your logo

function Footer() {
    return (
        <Grid2
            container
            sx={{
                bgcolor: "white",
                p: { xs: 2, sm: 3, md: 4 },
                rowGap: 3,
                border: "1px solid",
                borderColor: "primary.main",
            }}
        >
            <Grid2
                size={{ xs: 12, sm: 6, md: 5 }}
                sx={{ display: "flex", gap: 2, alignItems: "center" }}
            >
                <img
                    src={logo}
                    alt="Hearty Aid Logo"
                    style={{ width: 50, height: 50 }}
                />
                <Box>
                    <Typography
                        fontSize={{ xs: 14, sm: 15, md: 16 }}
                        fontFamily={"Livvic"}
                        color="primary"
                    >
                        Address: Roma IX Rd, Huai Khwang, Bangkok 10310
                    </Typography>
                    <Typography
                        fontSize={{ xs: 14, sm: 15, md: 16 }}
                        fontFamily={"Livvic"}
                        color="primary"
                    >
                        Phone : +66 06 20 90 8578
                    </Typography>
                    <Typography
                        fontSize={{ xs: 14, sm: 15, md: 16 }}
                        fontFamily={"Livvic"}
                        color="primary"
                    >
                        Email: heartyaidbkk@gmail.com
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
                <img
                    src="/images/social/tiktok.png"
                    style={{ width: 50, height: 50 }}
                    alt="Tiktok"
                />
                <img
                    src="/images/social/instagram.png"
                    style={{ width: 50, height: 50 }}
                    alt="Instagram"
                />
                <img
                    src="/images/social/facebook.png"
                    style={{ width: 50, height: 50 }}
                    alt="Facebook"
                />
                <img
                    src="/images/social/line.png"
                    style={{ width: 50, height: 50 }}
                    alt="Line"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 3 }} textAlign={"center"} mt={1}>
                <Typography
                    fontSize={{ xs: 14, sm: 15, md: 16 }}
                    fontFamily={"Livvic"}
                    color="primary"
                >
                    Copy Right <strong>@ 2024 Heartyaid Co.,ltd</strong>
                </Typography>
                <Typography
                    fontSize={{ xs: 14, sm: 15, md: 16 }}
                    fontFamily={"Livvic"}
                    color="primary"
                >
                    Empowered by <strong>IHTechno Co.,ltd</strong>
                </Typography>
            </Grid2>
        </Grid2>
    );
}

export default Footer;
