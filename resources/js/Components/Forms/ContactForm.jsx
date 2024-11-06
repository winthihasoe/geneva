import {
    Box,
    Button,
    TextareaAutosize,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";

function ContactForm() {
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
                pb: 10,
                mx: { xs: 2, sm: 10 },
            }}
        >
            <Box textAlign={"center"}>
                <Typography fontFamily={"Abel"} fontWeight={16}>
                    Have Question?
                </Typography>
                <Typography
                    sx={{
                        bgcolor: "primary.main",
                        px: 3,
                        mx: { xs: 2, sm: 4, md: 9 },
                        mb: 3,
                        borderRadius: 5,
                        fontFamily: "Abhaya Libre",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 30,
                    }}
                >
                    Get in Touch Here
                </Typography>
            </Box>
            <Box sx={{ px: 4, mt: 5 }}>
                {["Name", "Email", "Phone Number"].map((item) => (
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
                <Box
                    sx={{
                        display: "flex",
                        gap: 3,
                        alignItems: "flex-start",
                        justifyContent: "center",
                        mt: 2,
                    }}
                >
                    <Typography
                        fontSize={20}
                        fontFamily={"Afacad"}
                        width={"60%"}
                    >
                        Message.
                    </Typography>
                    <TextareaAutosize
                        cols={60}
                        minRows={2}
                        style={{
                            width: "100%",
                            padding: "10px",
                            border: "none",
                            outline: "none",
                            resize: "none",
                            backgroundImage:
                                "linear-gradient(to bottom, transparent 95%, #aaa 95%)",
                            backgroundSize: "100% 40px", // Adjust line height here
                            lineHeight: "40px", // Line height matching the background size
                        }}
                    />
                </Box>
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
        </Box>
    );
}

export default ContactForm;
