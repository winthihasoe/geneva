import {
    Box,
    Button,
    TextareaAutosize,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";

function CVForm() {
    return (
        <Box
            sx={{
                margin: 5,
                border: "1px solid",
                borderColor: "primary.main",
                borderRadius: 5,
                pt: 3,
                bgcolor: "white",
                boxShadow: 2,
                pb: 8,
                mx: 10,
                position: "relative",
            }}
        >
            <Box textAlign={"center"}>
                <Typography fontFamily={"Abel"} fontWeight={16}>
                    Join Our Team?
                </Typography>
                <Typography
                    sx={{
                        bgcolor: "white",
                        border: "1px solid",
                        borderColor: "primary.main",
                        px: 3,
                        mx: 5,
                        mb: 3,
                        borderRadius: 5,
                        fontFamily: "Abhaya Libre",
                        color: "primary.main",
                        fontWeight: "bold",
                        fontSize: 30,
                        boxShadow: 1,
                    }}
                >
                    Upload Your CV Form
                </Typography>
            </Box>
            <Box sx={{ px: 4 }}>
                <Typography fontSize={20} fontFamily={"Advent Pro"}>
                    Personal Information
                </Typography>
                {[
                    "Full Name",
                    "Date of birth",
                    "Gender",
                    "Nationality",
                    "Address",
                    "Phone Number",
                    "Email Address",
                ].map((item) => (
                    <Box
                        key={item}
                        sx={{
                            display: "flex",
                            gap: 3,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography
                            fontSize={20}
                            fontFamily={"Afacad"}
                            width={"60%"}
                        >
                            {item}.{" "}
                        </Typography>
                        <TextField fullWidth />
                    </Box>
                ))}
            </Box>
            <Box textAlign={"center"} mt={5}>
                <Button
                    variant="contained"
                    size="small"
                    sx={{ borderRadius: 20 }}
                >
                    <Typography
                        fontFamily={"Lilita One"}
                        fontWeight={500}
                        fontSize={20}
                    >
                        SUBMIT
                    </Typography>
                </Button>
            </Box>
            <img
                src="/images/good.png"
                alt="Fill your CV"
                style={{
                    width: 130,
                    height: 130,
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                }}
            />
        </Box>
    );
}

export default CVForm;
