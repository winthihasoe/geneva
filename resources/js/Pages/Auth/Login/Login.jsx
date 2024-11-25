import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid2,
    TextField,
    Typography,
} from "@mui/material";
import { useEmail } from "@/Context/EmailContext";

function Login() {
    const { data, setData, post, errors, processing } = useForm({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("login.attempt")); // Send data to 'signup.store' route
    };

    // Check if all required fields are filled
    const isFormValid = data.email && data.password;

    return (
        <AppLayout>
            <Head title="Login" />
            <Container
                maxWidth="md"
                sx={{
                    height: "70vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Grid2
                    container
                    sx={{
                        pt: 3,
                        display: "flex",
                        justifyContent: "center",
                        gap: 2,
                    }}
                >
                    <Grid2
                        size={{ xs: 0, sm: 0, md: 5 }}
                        sx={{ display: "flex", alignItems: "center" }}
                    >
                        <img
                            src="/images/pricing/nanny.png"
                            alt="Caregiver Photo"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </Grid2>
                    <Grid2
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        size={{ xs: 12, sm: 6, md: 6 }}
                    >
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                border: {
                                    xs: "none",
                                    sm: "2px solid #21875C",
                                    md: "2px solid #21875C",
                                },
                                borderRadius: 5,
                                bgcolor: "white",
                                py: 3,
                            }}
                        >
                            <Box textAlign={"center"}>
                                <Typography
                                    fontFamily={"Abel"}
                                    fontWeight={16}
                                    mb={2}
                                >
                                    Welcome
                                </Typography>
                                <Typography
                                    sx={{
                                        bgcolor: "primary.main",
                                        px: 3,
                                        mx: { xs: 2, sm: 4, md: 6 },
                                        borderRadius: 5,
                                        fontFamily: "Abhaya Libre",
                                        color: "white",
                                        fontWeight: "bold",
                                        fontSize: 30,
                                        mb: 4,
                                    }}
                                >
                                    Log In
                                </Typography>
                            </Box>

                            <Box sx={{ px: 4, mt: 2 }}>
                                {[
                                    { label: "Email", key: "email" },
                                    {
                                        label: "Password",
                                        key: "password",
                                        type: "password",
                                    },
                                ].map((item) => (
                                    <Box key={item.key}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                gap: 1,
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Typography
                                                fontSize={20}
                                                fontFamily={"Afacad"}
                                                width={"60%"}
                                            >
                                                {item.label}
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                type={item.type || "text"}
                                                value={data[item.key]}
                                                onChange={(e) =>
                                                    setData(
                                                        item.key,
                                                        e.target.value
                                                    )
                                                }
                                                sx={{ mb: 1 }}
                                            />
                                        </Box>
                                        <Typography
                                            textAlign={"right"}
                                            fontSize={12}
                                            color="error"
                                        >
                                            {errors[item.key]}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>

                            <Link href={route("signup")}>
                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        fontFamily: "ADLaM Display",
                                        textAlign: "center",
                                        my: 2,
                                    }}
                                >
                                    Create new account
                                </Typography>
                            </Link>
                            <Link href={route("password.request")}>
                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        fontFamily: "ADLaM Display",
                                        textAlign: "center",
                                        my: 2,
                                    }}
                                >
                                    Forgot Password?
                                </Typography>
                            </Link>

                            {/* Submit Button */}
                            <Box textAlign={"center"} mt={2}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    type="submit"
                                    sx={{ borderRadius: 20 }}
                                    disabled={!isFormValid}
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
                    </Grid2>
                </Grid2>
            </Container>
        </AppLayout>
    );
}

export default Login;
