import Subtitle from "@/Components/Typo/Subtitle";
import TitleCenter from "@/Components/Typo/TitleCenter";
import { useEmail } from "@/Context/EmailContext";
import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm } from "@inertiajs/react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
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
            <Container
                maxWidth="md"
                sx={{
                    height: "70vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box
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
                </Box>
            </Container>
        </AppLayout>
    );
}

export default VerifyOTP;
