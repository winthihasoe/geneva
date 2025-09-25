import Subtitle from "@/Components/Typo/Subtitle";
import TitleCenter from "@/Components/Typo/TitleCenter";
import { useEmail } from "@/Context/EmailContext";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Box,
    Button,
    Container,
    Grid2,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect } from "react";

function VerifyOTP() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        OTP: "",
    });

    const { email } = useEmail();
    // Set the email field when the component mounts
    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            email: email,
        }));
    }, [email]);

    const handleOtpVerification = (e) => {
        e.preventDefault();
        post(route("signup.OTP.verify"), data);
    };

    return (
        <AppLayout>
            <Head title="Verify Account" />
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
                    Almost There!
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
                            src="/images/pricing/super_nanny.png"
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
                            onSubmit={handleOtpVerification}
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
                            <Box sx={{ mb: 2 }}>
                                <Box sx={{ px: 4, mt: 2 }}>
                                    <Typography variant="body1">
                                        Enter 6-digit Code
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        required
                                        disabled={processing}
                                        onChange={(e) =>
                                            setData("OTP", e.target.value)
                                        }
                                        value={data.OTP}
                                        placeholder="Enter code form your email inbox"
                                    />
                                </Box>
                                {errors && (
                                    <Typography
                                        fontSize={12}
                                        color="error"
                                        mt={1}
                                    >
                                        {errors.OTP}
                                    </Typography>
                                )}
                            </Box>

                            <Link href={route("login")}>
                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        color: "info.main",
                                        textAlign: "center",
                                        my: 2,
                                    }}
                                >
                                    Already have an account?
                                </Typography>
                            </Link>
                            {/* Submit Button */}
                            <Box textAlign={"center"} mt={2}>
                                <Button
                                    variant="contained"
                                    sx={{ borderRadius: 10 }}
                                    type="submit"
                                    disabled={processing || !data.OTP}
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
                {/* <Box
                    sx={{
                        maxWidth: 350,
                        border: { xs: "none", sm: "2px solid #21875C" },
                        borderRadius: 5,
                        py: 3,
                        px: { xs: 0, sm: 2, md: 2 },
                    }}
                >
                    <form onSubmit={handleOtpVerification}>
                        <TitleCenter>Enter OTP to verify account</TitleCenter>
                        <Subtitle>
                            Get OTP from your email inbox and paste it.
                        </Subtitle>
                        <Box>
                            <TextField
                                sx={{ my: 1 }}
                                fullWidth
                                placeholder="x x x x x x"
                                required
                                disabled={processing}
                                onChange={(e) => setData("OTP", e.target.value)}
                                value={data.OTP}
                            />
                            {errors && (
                                <Typography fontSize={12} color="error" mt={1}>
                                    {errors.OTP}
                                </Typography>
                            )}
                        </Box>
                        <Box sx={{ textAlign: "center", mt: 2 }}>
                            <Button
                                variant="contained"
                                sx={{ borderRadius: 10 }}
                                type="submit"
                                disabled={processing}
                            >
                                <Typography
                                    fontFamily={"Lilita One"}
                                    fontWeight={500}
                                    fontSize={20}
                                >
                                    Submit
                                </Typography>
                            </Button>
                        </Box>
                    </form>
                </Box> */}
            </Container>
        </AppLayout>
    );
}

export default VerifyOTP;
