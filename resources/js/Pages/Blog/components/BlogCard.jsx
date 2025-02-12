import { router } from "@inertiajs/react";
import { Box, Typography } from "@mui/material";
import React from "react";

function BlogCard({ title, image, content }) {
    return (
        <Box
            sx={{
                width: { xs: "100%", sm: 500 },
                height: { xs: 250, sm: 300 },
                p: 2,
                bgcolor: "transparent",
                border: "none",
                cursor: "pointer",
            }}
            component={"button"}
            onClick={() => {
                router.get(route("blog.single"));
            }}
        >
            <Box
                sx={{
                    width: "95%",
                    height: "100%",
                    borderRadius: 10,
                    border: "1px solid",
                    borderColor: "primary.main",
                    position: "relative",
                    bgcolor: "#f5f5f5",
                    display: "flex",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: -1,
                        right: -35,
                        px: 1,
                        py: 2,
                        borderRadius: 6,
                        bgcolor: "primary.main",
                        border: "1px solid #000",
                        width: "80%",
                        boxShadow: 2,
                        zIndex: 2,
                    }}
                >
                    <Typography
                        color="white"
                        fontFamily={"Lilita One"}
                        fontStyle={"italic"}
                        textAlign={"center"}
                        fontSize={25}
                    >
                        {title}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: "40%",
                        height: "100%",
                        bgcolor: "red",
                        borderTopLeftRadius: 40,
                        borderBottomLeftRadius: 40,
                        overflow: "hidden",
                        zIndex: 3,

                        backgroundImage: `url(/images/blogContent/${image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                ></Box>
                <Box
                    sx={{
                        width: "60%",
                        height: "100%",
                        bgcolor: "white",
                        borderBottomRightRadius: 40,
                        zIndex: 1,
                        position: "relative",
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: "Livvic",
                            fontSize: 13,
                            position: "absolute",
                            top: 90,
                            left: 10,
                            right: 10,
                        }}
                    >
                        {content}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default BlogCard;
