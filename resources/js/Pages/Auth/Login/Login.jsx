import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";
import {
    Box,
    Button,
    Container,
    Grid2,
    TextField,
    Typography,
} from "@mui/material";

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
            <Container maxWidth="lg">
                <Typography
                    sx={{
                        textAlign: "center",
                        fontFamily: "Righteous",
                        fontWeight: 500,
                        mt: 5,
                    }}
                    variant="h3"
                    color="primary.main"
                >
                    Login
                </Typography>

                <Grid2
                    container
                    sx={{
                        pt: 3,
                        display: "flex",
                        justifyContent: "center",
                        gap: 2,
                        mb: 5,
                        alignItems: "center",
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
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
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
                                boxShadow: 1,
                            }}
                        >
                            <Box sx={{ px: 4, mt: 2 }}>
                                {[
                                    {
                                        label: "Email",
                                        key: "email",
                                        placeholder: "Enter your email",
                                    },
                                    {
                                        label: "Password",
                                        key: "password",
                                        type: "password",
                                        placeholder: "Enter your password",
                                    },
                                ].map((item) => (
                                    <Box sx={{ mb: 2 }} key={item.key}>
                                        <Box>
                                            <Typography variant="body1">
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
                                                placeholder={item.placeholder}
                                            />
                                        </Box>
                                        <Typography fontSize={12} color="error">
                                            {errors[item.key]}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>

                            <Link href={route("password.request")}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        textAlign: "center",
                                        my: 2,
                                        color: "black",
                                        fontWeight: 600,
                                    }}
                                >
                                    Forgot Password?
                                </Typography>
                            </Link>
                            <Link href={route("signup")}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        textAlign: "center",
                                        my: 2,
                                        color: "info.main",
                                        fontWeight: 600,
                                    }}
                                >
                                    Create New Account
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
                                        variant="h6"
                                        fontFamily={"Righteous"}
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
