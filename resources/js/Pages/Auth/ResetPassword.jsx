import { useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import {
    Box,
    Button,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid2,
    TextField,
    Typography,
} from "@mui/material";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });
    console.log(errors);

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("password.store"));
    };

    return (
        <AppLayout>
            <Head title="Reset Password" />
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
                            src="/images/pricing/senior_care.png"
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
                            sx={{
                                border: {
                                    xs: "none",
                                    sm: "2px solid #875cd1",
                                    md: "2px solid #875cd1",
                                },
                                borderRadius: 5,
                                bgcolor: "white",
                                py: 3,
                                px: { xs: 2, sm: 2, md: 3 },
                            }}
                        >
                            <Typography
                                fontSize={18}
                                mb={2}
                                fontFamily={"Livvic"}
                                fontWeight={"bold"}
                            >
                                Reset Password
                            </Typography>

                            <form onSubmit={submit}>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <FormLabel>
                                        <Typography fontSize={13}>
                                            Email
                                        </Typography>
                                    </FormLabel>
                                    <TextField
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="username"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <FormLabel>
                                        <Typography fontSize={13}>
                                            New Password
                                        </Typography>
                                    </FormLabel>
                                    <TextField
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                </FormControl>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <FormLabel>
                                        <Typography fontSize={13}>
                                            Confirm Password
                                        </Typography>
                                    </FormLabel>
                                    <TextField
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                    />
                                </FormControl>

                                {errors && (
                                    <Typography
                                        textAlign={"center"}
                                        fontSize={12}
                                        color="error"
                                    >
                                        {errors.email}
                                    </Typography>
                                )}

                                <Box textAlign={"center"} my={2}>
                                    <Button
                                        variant="contained"
                                        disabled={processing}
                                        type="submit"
                                    >
                                        Reset Password
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
