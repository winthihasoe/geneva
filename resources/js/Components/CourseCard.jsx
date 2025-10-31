import { router } from "@inertiajs/react";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

function CourseCard({ course }) {
    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 480,
                bgcolor: "#fff",
                borderRadius: 4,
                boxShadow: 4,
                py: 3,
                px: { xs: 1, sm: 2, md: 3 },
                display: "flex",
                flexDirection: "row",
                flexWrap: { xs: "wrap", sm: "nowrap" },
                alignItems: "center",
                gap: 2,
            }}
        >
            <img
                src={`storage/${course.image}`}
                alt={course.title}
                style={{
                    width: "150px",
                    height: "220px",
                    margin: "auto",
                    borderRadius: 5,
                    objectFit: "cover",
                    borderTopLeftRadius: "80px",
                    borderTopRightRadius: "80px",
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                }}
            />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexGrow: 1,
                    padding: 1,
                    gap: 2,
                }}
            >
                <Typography
                    variant="h6"
                    fontFamily={"Righteous"}
                    fontWeight={500}
                    color="primary.main"
                    textAlign={"center"}
                    sx={{ mt: 2 }}
                >
                    {course.title}
                </Typography>

                <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => router.get(route("coming.soon"))}
                >
                    Start A Course
                </Button>
                <Typography variant="body2">{course.description}</Typography>
            </Box>
        </Box>
    );
}

export default CourseCard;
