import { Box, Grid2, IconButton, Typography } from "@mui/material";
import React from "react";
import DataSaverOnOutlinedIcon from "@mui/icons-material/DataSaverOnOutlined";

function StartBlog() {
    return (
        <Grid2 container sx={{ my: 5, columnGap: 1 }}>
            <Grid2 size={{ xs: 2, sm: 2, md: 3 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: { xs: 250, sm: 300, md: 320 }, // Adjust the height based on your needs
                        backgroundColor: "primary.main", // Your background color
                        borderRadius: 3, // Rounded corners like your image
                        width: "50px", // Make sure the width fits your design
                        margin: "auto",
                        border: "1px solid #fff",
                    }}
                >
                    <Typography
                        sx={{
                            transform: "rotate(-90deg)", // Rotate the text back to normal
                            color: "white",
                            whiteSpace: "nowrap", // Prevent text from breaking into multiple lines
                            fontSize: { xs: 13, sm: 14, md: 16 }, // Adjust font size
                            fontFamily: "Abyssinica SIL",
                        }}
                    >
                        Join Our Health Knowledge Sessions!
                    </Typography>
                </Box>
            </Grid2>
            <Grid2
                size={{ xs: 4, sm: 4, md: 4 }}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        height: { xs: 100, sm: 120, md: 150 },
                        width: { xs: 100, sm: 120, md: 150 },
                        bgcolor: "#E39FB6",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 5,
                        position: "relative",
                    }}
                >
                    <IconButton sx={{ position: "absolute", top: 0, right: 0 }}>
                        <DataSaverOnOutlinedIcon />
                    </IconButton>
                    <img
                        src="/images/blogs/elder_health.png"
                        alt="Elder health"
                        style={{ height: 80 }}
                    />
                    <Typography
                        fontFamily={"ADLaM Display"}
                        color="white"
                        fontSize={{ xs: 12, sm: 14, md: 16 }}
                    >
                        Elder Health
                    </Typography>
                </Box>
                <Box
                    sx={{
                        height: { xs: 100, sm: 120, md: 150 },
                        width: { xs: 100, sm: 120, md: 150 },
                        bgcolor: "#F17255",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 5,
                        position: "relative",
                    }}
                >
                    <IconButton sx={{ position: "absolute", top: 0, right: 0 }}>
                        <DataSaverOnOutlinedIcon />
                    </IconButton>
                    <img
                        src="/images/blogs/Maternity.png"
                        alt="Elder health"
                        style={{ height: 80 }}
                    />
                    <Typography
                        fontFamily={"ADLaM Display"}
                        color="white"
                        fontSize={{ xs: 12, sm: 14, md: 16 }}
                    >
                        Maternity
                    </Typography>
                </Box>
            </Grid2>
            <Grid2
                size={{ xs: 4, sm: 4, md: 4 }}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        height: { xs: 100, sm: 120, md: 150 },
                        width: { xs: 100, sm: 120, md: 150 },
                        bgcolor: "#FAD179",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 5,
                        position: "relative",
                    }}
                >
                    <IconButton sx={{ position: "absolute", top: 0, right: 0 }}>
                        <DataSaverOnOutlinedIcon />
                    </IconButton>
                    <img
                        src="/images/blogs/baby_health.png"
                        alt="Elder health"
                        style={{ height: 80 }}
                    />
                    <Typography
                        fontFamily={"ADLaM Display"}
                        color="white"
                        fontSize={{ xs: 12, sm: 14, md: 16 }}
                    >
                        Baby Health
                    </Typography>
                </Box>
                <Box
                    sx={{
                        height: { xs: 100, sm: 120, md: 150 },
                        width: { xs: 100, sm: 120, md: 150 },
                        bgcolor: "#9D614F",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 5,
                        position: "relative",
                    }}
                >
                    <IconButton sx={{ position: "absolute", top: 0, right: 0 }}>
                        <DataSaverOnOutlinedIcon />
                    </IconButton>
                    <img
                        src="/images/blogs/first_aid.png"
                        alt="Elder health"
                        style={{ height: 80 }}
                    />
                    <Typography
                        fontFamily={"ADLaM Display"}
                        color="white"
                        fontSize={{ xs: 12, sm: 14, md: 16 }}
                    >
                        First Aid
                    </Typography>
                </Box>
            </Grid2>
        </Grid2>
    );
}

export default StartBlog;
