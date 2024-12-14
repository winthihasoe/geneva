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
                border: { xs: "none", sm: "8px solid #fff" },
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
                        width: "80%",
                    }}
                />
                <Typography
                    fontFamily={"Abel"}
                    fontSize={{ sm: 16, md: 25 }}
                    fontWeight={400}
                    color="#fff"
                    mb={1}
                >
                    Join Our Team ?
                </Typography>
                <Button
                    variant="contained"
                    sx={{ bgcolor: "#fff", borderRadius: 20, px: 5, m: 1 }}
                >
                    <Typography
                        sx={{
                            fontFamily: "Abhaya Libre",
                            color: "primary.main",
                            fontWeight: "bold",
                            fontSize: { xs: 20, sm: 30, md: 30 },
                        }}
                        onClick={() => router.get(route("job.apply"))}
                    >
                        Upload Your CV Form
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
}

export default StartCVForm;
