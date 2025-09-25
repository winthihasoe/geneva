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

function SignUp() {
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        is_caregiver: false,
        is_employer: true,
        agree_terms: false,
    });

    const { setEmail } = useEmail();

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmail(data.email);
        post(route("signup.store")); // Send data to 'signup.store' route
    };

    // Check if all required fields are filled
    const isFormValid =
        data.name &&
        data.email &&
        data.password &&
        data.password_confirmation &&
        (data.is_caregiver || data.is_employer) &&
        data.agree_terms;

    return (
        <AppLayout>
            <Head title="Sign Up" />
            <Container maxWidth="lg">
                <Typography
                    variant="h4"
                    sx={{
                        my: 3,
                        fontWeight: 500,
                        textAlign: "center",
                        fontFamily: "Righteous",
                    }}
                >
                    Sign Up for Free
                </Typography>

                {/* Select your account type to get started */}
                <Box
                    sx={{
                        mb: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 6,
                        p: 2,
                        maxWidth: 600,
                        mx: "auto",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <Box
                            sx={{
                                p: 1,
                                borderRadius: 3,
                                border: "3px solid",
                                borderColor: "grey.300",
                                width: "100%",
                                bgcolor:
                                    data.is_employer === true
                                        ? "primary.main"
                                        : "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                setData({
                                    ...data,
                                    is_caregiver: false,
                                    is_employer: true,
                                });
                            }}
                        >
                            <Typography
                                textAlign={"center"}
                                fontFamily={"Righteous"}
                                fontWeight={500}
                                color={
                                    data.is_employer === true
                                        ? "white"
                                        : "black"
                                }
                            >
                                Find a Caregiver
                            </Typography>
                        </Box>
                        {/* Dot indicator */}
                        <Box
                            sx={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                bgcolor:
                                    data.is_employer === true
                                        ? "grey.600"
                                        : "transparent",
                                mt: 1,
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <Box
                            sx={{
                                p: 1,
                                borderRadius: 3,
                                border: "3px solid",
                                borderColor: "grey.300",
                                width: "100%",
                                bgcolor:
                                    data.is_caregiver === true
                                        ? "primary.main"
                                        : "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                setData({
                                    ...data,
                                    is_caregiver: true,
                                    is_employer: false,
                                });
                            }}
                        >
                            <Typography
                                textAlign={"center"}
                                fontFamily={"Righteous"}
                                fontWeight={500}
                                color={
                                    data.is_caregiver === true
                                        ? "white"
                                        : "black"
                                }
                            >
                                To be a Caregiver
                            </Typography>
                        </Box>
                        {/* Dot indicator */}
                        <Box
                            sx={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                bgcolor:
                                    data.is_caregiver === true
                                        ? "grey.600"
                                        : "transparent",
                                mt: 1,
                            }}
                        />
                    </Box>
                </Box>

                {data.is_employer ? (
                    <Grid2
                        container
                        sx={{
                            pt: 3,
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            gap: 5,
                            mb: 4,
                        }}
                    >
                        <Grid2 size={{ xs: 12, sm: 6, md: 5 }}>
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                sx={{
                                    border: {
                                        xs: "none",
                                        sm: "2px solid #21875C",
                                        md: "2px solid #21875C",
                                    },
                                    borderRadius: 4,
                                    bgcolor: "white",
                                    py: 3,
                                    boxShadow: 1,
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    textAlign={"center"}
                                    mb={4}
                                >
                                    {data.is_employer && "I'm an employer."}
                                    {data.is_caregiver && "I'm a caregiver."}
                                </Typography>

                                <Box sx={{ px: 4, mt: 2 }}>
                                    {[
                                        {
                                            label: "Name",
                                            key: "name",
                                            placeholder: "Enter your name",
                                        },
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
                                        {
                                            label: "Confirm Password",
                                            key: "password_confirmation",
                                            type: "password",
                                            placeholder:
                                                "Confirm your password",
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
                                                    placeholder={
                                                        item.placeholder
                                                    }
                                                />
                                            </Box>
                                            <Typography
                                                fontSize={12}
                                                color="error"
                                            >
                                                {errors[item.key]}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>

                                {/* Agree to Terms and Conditions */}
                                <Box sx={{ px: 4, mt: 2 }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={data.agree_terms}
                                                onChange={(e) =>
                                                    setData(
                                                        "agree_terms",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        }
                                        label={
                                            <Typography fontSize={12}>
                                                I agree to the Terms and
                                                Conditions
                                            </Typography>
                                        }
                                    />
                                    {errors.agree_terms && (
                                        <Typography color="error" fontSize={12}>
                                            {errors.agree_terms}
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
                        <Grid2
                            size={{ xs: 0, sm: 0, md: 5 }}
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <img
                                src="/images/courses/ads.png"
                                alt="Caregiver Photo"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </Grid2>
                    </Grid2>
                ) : (
                    <Grid2
                        container
                        sx={{
                            pt: 3,
                            display: "flex",
                            justifyContent: "center",
                            gap: 2,
                            mb: 4,
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
                                    height: "70%",
                                    objectFit: "cover",
                                }}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6, md: 5 }}>
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                sx={{
                                    border: {
                                        xs: "none",
                                        sm: "2px solid #21875C",
                                        md: "2px solid #21875C",
                                    },
                                    borderRadius: 4,
                                    bgcolor: "white",
                                    py: 3,
                                    boxShadow: 1,
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    textAlign={"center"}
                                    mb={4}
                                >
                                    {data.is_employer && "I'm an employer."}
                                    {data.is_caregiver && "I'm a caregiver."}
                                </Typography>

                                <Box sx={{ px: 4, mt: 2 }}>
                                    {[
                                        {
                                            label: "Name",
                                            key: "name",
                                            placeholder: "Enter your name",
                                        },
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
                                        {
                                            label: "Confirm Password",
                                            key: "password_confirmation",
                                            type: "password",
                                            placeholder:
                                                "Confirm your password",
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
                                                    placeholder={
                                                        item.placeholder
                                                    }
                                                />
                                            </Box>
                                            <Typography
                                                fontSize={12}
                                                color="error"
                                            >
                                                {errors[item.key]}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>

                                {/* Agree to Terms and Conditions */}
                                <Box sx={{ px: 4, mt: 2 }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={data.agree_terms}
                                                onChange={(e) =>
                                                    setData(
                                                        "agree_terms",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        }
                                        label={
                                            <Typography fontSize={12}>
                                                I agree to the Terms and
                                                Conditions
                                            </Typography>
                                        }
                                    />
                                    {errors.agree_terms && (
                                        <Typography color="error" fontSize={12}>
                                            {errors.agree_terms}
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
                )}
            </Container>
        </AppLayout>
    );
}

export default SignUp;
