import { router } from "@inertiajs/react";
import {
    Box,
    Button,
    TextareaAutosize,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";

function StartCVForm() {
    return (
        <Box
            sx={{
                margin: 5,
                border: { xs: "none", sm: "2px solid #fff" },
                borderRadius: 5,
                pt: 3,
                boxShadow: 2,
                pb: 8,
                mx: { xs: 2, sm: 10 },
                position: "relative",
            }}
        >
            <Box textAlign={"center"}>
                <img
                    src="/images/join_team.png"
                    alt="Fill your CV"
                    style={{
                        width: "100%",
                    }}
                />
                <Typography fontFamily={"Abel"} fontWeight={16}>
                    Join Our Team ?
                </Typography>
                <Typography
                    sx={{
                        bgcolor: "white",
                        border: "1px solid",
                        borderColor: "primary.main",
                        px: 3,
                        py: { xs: 1, sm: 0 },
                        mx: 5,
                        mb: 3,
                        borderRadius: 5,
                        fontFamily: "Abhaya Libre",
                        color: "primary.main",
                        fontWeight: "bold",
                        fontSize: { xs: 16, sm: 30, md: 25 },
                        boxShadow: 1,
                        cursor: "pointer",
                    }}
                    onClick={() => router.get(route("job.apply"))}
                >
                    Upload Your CV Form
                </Typography>
            </Box>
        </Box>
    );
}

export default StartCVForm;
