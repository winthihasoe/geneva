import Subtitle from "@/Components/Typo/Subtitle";
import TitleCenter from "@/Components/Typo/TitleCenter";
import { useEmail } from "@/Context/EmailContext";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { Refresh, AccessTime } from "@mui/icons-material";
import {
    Alert,
    Box,
    Button,
    Chip,
    Container,
    Grid2,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";

function VerifyOTP() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        OTP: "",
    });

    const { email } = useEmail();
    const { flash } = usePage().props;

    // State for resend countdown
    const [countdown, setCountdown] = useState(0);
    const [canResend, setCanResend] = useState(true);
    const [resendProcessing, setResendProcessing] = useState(false);

    // Set the email field when the component mounts
    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            email: email,
        }));
    }, [email]);

    // Countdown timer effect
    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        setCanResend(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [countdown]);

    // Format countdown time
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const handleOtpVerification = (e) => {
        e.preventDefault();
        post(route("signup.OTP.verify"), data);
    };

    const handleResendOtp = () => {
        if (!canResend || resendProcessing) return;

        setResendProcessing(true);
        setCanResend(false);
        setCountdown(120); // 2 minutes countdown

        router.post(
            route("signup.resend.otp"),
            {
                email: data.email,
            },
            {
                onSuccess: () => {
                    setResendProcessing(false);
                },
                onError: () => {
                    setResendProcessing(false);
                    setCanResend(true);
                    setCountdown(0);
                },
            }
        );
    };

    return (
        <AppLayout>
            <Head title="Verify Account" />
            <Container maxWidth="lg">
                <Typography
                    sx={{
                        textAlign: "center",
                        fontFamily: "Roboto Slab",
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
                        minHeight: "60vh",
                    }}
                >
                    <Grid2
                        size={{ xs: 0, sm: 0, md: 5 }}
                        sx={{ display: "flex", alignItems: "center" }}
                    >
                        <img
                            src="/images/register/two-caregivers.png"
                            alt="Caregiver Photo"
                            style={{
                                width: "80%",
                                height: "auto",
                                objectFit: "cover",
                            }}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
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
                                boxShadow: 1,
                            }}
                        >
                            <Box sx={{ px: 4, my: 2 }}>
                                {/* Success Message */}
                                {flash?.success && (
                                    <Alert severity="success" sx={{ mb: 3 }}>
                                        {flash.success}
                                    </Alert>
                                )}

                                {/* Error Message */}
                                {flash?.error && (
                                    <Alert severity="error" sx={{ mb: 3 }}>
                                        {flash.error}
                                    </Alert>
                                )}
                                <form onSubmit={handleOtpVerification}>
                                    <Typography variant="h6" gutterBottom>
                                        Enter 6-digit Code
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        We have sent a verification code to your
                                        email address.
                                    </Typography>

                                    <TextField
                                        name="otp"
                                        value={data.OTP}
                                        onChange={(e) =>
                                            setData("OTP", e.target.value)
                                        }
                                        placeholder="X X X X X X"
                                        fullWidth
                                        required
                                        inputProps={{
                                            maxLength: 6,
                                            pattern: "[0-9]{6}",
                                            inputMode: "numeric",
                                            style: {
                                                textAlign: "center",
                                                fontSize: "1.2rem",
                                                letterSpacing: "0.5rem",
                                                fontWeight: "bold",
                                            },
                                        }}
                                        error={!!errors.otp}
                                        helperText={errors.otp}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                height: "60px",
                                            },
                                        }}
                                        disabled={processing}
                                    />
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
                                    <Button
                                        variant="contained"
                                        sx={{
                                            borderRadius: 10,
                                            mx: "auto",
                                            display: "block",
                                        }}
                                        type="submit"
                                        disabled={processing || !data.OTP}
                                    >
                                        <Typography
                                            variant="h6"
                                            fontFamily={"Roboto Slab"}
                                            fontWeight={500}
                                            fontSize={"0.9rem"}
                                        >
                                            {processing
                                                ? "Verifying..."
                                                : "Verify OTP"}
                                        </Typography>
                                    </Button>
                                </form>
                            </Box>

                            {/* Submit Button */}
                            <Box textAlign={"center"} mt={2}></Box>

                            {/* Resend OTP Section with improved UI */}
                            <Box
                                sx={{
                                    textAlign: "center",
                                    p: 2,
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 2 }}
                                >
                                    Didn't receive the code?
                                </Typography>

                                {countdown > 0 && (
                                    <Box sx={{ mb: 2 }}>
                                        <Chip
                                            icon={<AccessTime />}
                                            label={`Resend available in ${formatTime(
                                                countdown
                                            )}`}
                                            color="primary"
                                            variant="outlined"
                                            size="small"
                                        />
                                    </Box>
                                )}

                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    onClick={handleResendOtp}
                                    disabled={!canResend || resendProcessing}
                                    startIcon={<Refresh />}
                                    sx={{
                                        textTransform: "none",
                                        fontWeight: 600,
                                    }}
                                >
                                    {resendProcessing
                                        ? "Sending..."
                                        : canResend
                                        ? "Resend OTP"
                                        : "Please wait..."}
                                </Button>
                            </Box>
                        </Box>
                    </Grid2>
                </Grid2>
            </Container>
        </AppLayout>
    );
}

export default VerifyOTP;
