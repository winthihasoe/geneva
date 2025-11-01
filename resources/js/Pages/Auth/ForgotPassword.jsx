import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm } from "@inertiajs/react";
import {
    Box,
    Button,
    Container,
    Grid2,
    TextField,
    Typography,
} from "@mui/material";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors, setError } = useForm({
        email: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <AppLayout>
            <Head title="Forgot Password" />
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
                            src="/images/pricing/super_nanny.png"
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
                        size={{ xs: 12, sm: 6, md: 4 }}
                    >
                        <Box
                            sx={{
                                border: {
                                    xs: "none",
                                    sm: "2px solid #21875C",
                                    md: "2px solid #21875C",
                                },
                                borderRadius: 5,
                                bgcolor: "white",
                                py: 3,
                                px: { xs: 4, sm: 2, md: 3 },
                                boxShadow: 1,
                            }}
                        >
                            <Typography variant="h6" mb={2}>
                                Forgot password?
                            </Typography>
                            <Typography variant="body2">
                                Just let us know your email address and we will
                                email you a password reset link that will allow
                                you to choose a new one.
                            </Typography>

                            <form onSubmit={handleSubmit}>
                                <Box mt={3} mb={2}>
                                    <Typography fontSize={20} width={"60%"}>
                                        Email
                                    </Typography>
                                    <TextField
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => {
                                            setData("email", e.target.value);
                                            setError("email", null);
                                        }}
                                        fullWidth
                                        placeholder="Enter your email"
                                        variant="standard"
                                    />
                                    {errors && (
                                        <Typography fontSize={12} color="error">
                                            {errors.email}
                                        </Typography>
                                    )}
                                </Box>

                                <Box textAlign={"center"} mt={3}>
                                    <Button
                                        disabled={
                                            processing ||
                                            !data.email ||
                                            errors.email
                                        }
                                        variant="contained"
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Grid2>
                </Grid2>
            </Container>
        </AppLayout>
    );
}
