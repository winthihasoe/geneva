import { router } from "@inertiajs/react";
import { Box, Typography, Button } from "@mui/material";
import React from "react";

function BlogCard({ image, title, content }) {
    return (
        <Box
            sx={{
                width: 220,
                flexShrink: 0,
                bgcolor: "background.paper",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "none",
                transition: "box-shadow 0.3s ease-in",
                ":hover": {
                    boxShadow: 3,
                },
                display: "flex",
                flexDirection: "column",
                pb: 3,
                cursor: "pointer",
            }}
            onClick={() => router.get(route("blog.single", title))}
        >
            <Box
                sx={{
                    width: "100%",
                    height: 160,
                    overflow: "hidden",
                    borderTopRightRadius: 3,
                    borderTopLeftRadius: 3,
                }}
            >
                <img
                    src={image}
                    alt={title}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </Box>
            <Box
                sx={{ flex: 1, p: 2, display: "flex", flexDirection: "column" }}
            >
                <Typography variant="h6" fontWeight="bold" mb={1} noWrap>
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        mb: 3,
                        minHeight: "4.8em",
                    }}
                >
                    {content}
                </Typography>
                <Box>
                    <Button variant="contained" color="secondary" size="small">
                        See More
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default BlogCard;
