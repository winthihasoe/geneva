import { Box, Grid2, IconButton, Typography } from "@mui/material";
import React from "react";
import DataSaverOnOutlinedIcon from "@mui/icons-material/DataSaverOnOutlined";
import { router } from "@inertiajs/react";

function StartBlog() {
    return (
        <Grid2
            container
            sx={{
                my: 5,
            }}
        >
            <Grid2
                size={{ xs: 2, sm: 2, md: 2 }}
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: { xs: 250, sm: 300, md: 350 },
                        backgroundColor: "primary.main",
                        borderRadius: 5,
                        width: { xs: 50, sm: 60, md: 80 },
                        margin: "auto",
                        border: "1px solid #fff",
                    }}
                >
                    <Typography
                        sx={{
                            transform: "rotate(-90deg)", // Rotate the text back to normal
                            color: "white",
                            whiteSpace: "nowrap", // Prevent text from breaking into multiple lines
                            fontSize: { xs: 13, sm: 14, md: 18 }, // Adjust font size
                            fontFamily: "Abyssinica SIL",
                        }}
                    >
                        Join Our Health Knowledge Sessions!
                    </Typography>
                </Box>
            </Grid2>
            <Grid2
                size={{ xs: 5, sm: 4, md: 5 }}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    rowGap: 2,
                    p: 1,
                }}
            >
                <Box
                    sx={{
                        height: { xs: "100%", sm: "70%", md: "80%" },
                        width: { xs: "100%", sm: "70%", md: "80%" },
                        bgcolor: "#E39FB6",

                        borderRadius: 5,
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <IconButton
                        onClick={() => router.get(route("blog.elder"))}
                        sx={{ position: "absolute", top: 0, right: 0 }}
                    >
                        <DataSaverOnOutlinedIcon fontSize="large" />
                    </IconButton>
                    <Box
                        sx={{
                            backgroundImage:
                                "url(/images/blogs/elder_health.png)",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            height: "80%",
                            width: "80%",
                            margin: "auto",
                        }}
                    />

                    <Typography
                        fontFamily={"ADLaM Display"}
                        color="white"
                        textAlign={"center"}
                        fontSize={{ xs: 12, sm: 14, md: 16 }}
                    >
                        Elder Health
                    </Typography>
                </Box>
                <Box
                    sx={{
                        height: { xs: "100%", sm: "70%", md: "80%" },
                        width: { xs: "100%", sm: "70%", md: "80%" },
                        bgcolor: "#F17255",
                        borderRadius: 5,
                        position: "relative",
                    }}
                >
                    <IconButton sx={{ position: "absolute", top: 0, right: 0 }}>
                        <DataSaverOnOutlinedIcon fontSize="large" />
                    </IconButton>
                    <Box
                        sx={{
                            backgroundImage: "url(/images/blogs/maternity.png)",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            height: "80%",
                            width: "80%",
                            margin: "auto",
                        }}
                    />

                    <Typography
                        fontFamily={"ADLaM Display"}
                        color="white"
                        fontSize={{ xs: 12, sm: 14, md: 16 }}
                        textAlign={"center"}
                    >
                        Maternity
                    </Typography>
                </Box>
            </Grid2>
            <Grid2
                size={{ xs: 5, sm: 4, md: 5 }}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    rowGap: 2,
                    p: 1,
                }}
            >
                <Box
                    sx={{
                        height: { xs: "100%", sm: "70%", md: "80%" },
                        width: { xs: "100%", sm: "70%", md: "80%" },
                        bgcolor: "#FAD179",

                        borderRadius: 5,
                        position: "relative",
                    }}
                >
                    <IconButton sx={{ position: "absolute", top: 0, right: 0 }}>
                        <DataSaverOnOutlinedIcon fontSize="large" />
                    </IconButton>

                    <Box
                        sx={{
                            backgroundImage:
                                "url(/images/blogs/baby_health.png)",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            height: "80%",
                            width: "80%",
                            margin: "auto",
                        }}
                    />

                    <Typography
                        fontFamily={"ADLaM Display"}
                        color="white"
                        fontSize={{ xs: 12, sm: 14, md: 16 }}
                        textAlign={"center"}
                    >
                        Baby Health
                    </Typography>
                </Box>
                <Box
                    sx={{
                        height: { xs: "100%", sm: "70%", md: "80%" },
                        width: { xs: "100%", sm: "70%", md: "80%" },
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
                        <DataSaverOnOutlinedIcon fontSize="large" />
                    </IconButton>
                    <Box
                        sx={{
                            backgroundImage: "url(/images/blogs/first_aid.png)",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            height: "80%",
                            width: "80%",
                            margin: "auto",
                        }}
                    />

                    <Typography
                        fontFamily={"ADLaM Display"}
                        color="white"
                        fontSize={{ xs: 12, sm: 14, md: 16 }}
                        textAlign={"center"}
                    >
                        First Aid
                    </Typography>
                </Box>
            </Grid2>
        </Grid2>
    );
}

export default StartBlog;
