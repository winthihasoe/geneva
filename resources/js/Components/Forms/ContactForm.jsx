import { useForm } from "@inertiajs/inertia-react";
import {
    Box,
    Button,
    TextareaAutosize,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";

function ContactForm() {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        email: "",
        phone_number: "",
        message: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("message.store"), {
            onSuccess: () => reset(),
        });
    };

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
                <Typography
                    fontFamily={"Abel"}
                    fontWeight={200}
                    fontSize={{ xs: 20, sm: 25 }}
                    mb={2}
                >
                    Have Questions?
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
            <form onSubmit={handleSubmit}>
                <Box sx={{ px: 4, mt: 5 }}>
                    <Box
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
                            Name
                        </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            margin="normal"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            error={!!errors.name}
                            helperText={errors.name}
                            required
                        />
                    </Box>

                    <Box
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
                            Email
                        </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            margin="normal"
                            required
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </Box>

                    <Box
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
                            Phone Number
                        </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            margin="normal"
                            value={data.phone_number}
                            onChange={(e) =>
                                setData("phone_number", e.target.value)
                            }
                            error={!!errors.phone_number}
                            helperText={errors.phone_number}
                        />
                    </Box>

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
                            onChange={(e) => setData("message", e.target.value)}
                            required
                        />
                        {errors.message && (
                            <p style={{ color: "red", marginTop: "5px" }}>
                                {errors.message}
                            </p>
                        )}
                    </Box>
                    <Box textAlign={"center"} mt={5}>
                        <Button
                            variant="contained"
                            size="small"
                            type="submit"
                            disabled={processing}
                            sx={{ borderRadius: 20, px: 3 }}
                        >
                            <Typography
                                fontFamily={"Lilita One"}
                                fontWeight={500}
                                fontSize={{ xs: 20, sm: 30 }}
                            >
                                SUBMIT
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </form>
        </Box>
    );
}

export default ContactForm;
