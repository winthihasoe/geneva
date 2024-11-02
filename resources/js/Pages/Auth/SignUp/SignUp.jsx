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
        is_employer: false,
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
            <Container maxWidth="md">
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
                                height: "70%",
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
                                <Typography fontFamily={"Abel"} fontWeight={16}>
                                    Get Started for free
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
                                    }}
                                >
                                    Sign Up
                                </Typography>
                            </Box>

                            <Box sx={{ px: 4, mt: 2 }}>
                                {[
                                    { label: "Name", key: "name" },
                                    { label: "Email", key: "email" },
                                    {
                                        label: "Password",
                                        key: "password",
                                        type: "password",
                                    },
                                    {
                                        label: "Confirm Password",
                                        key: "password_confirmation",
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

                            {/* Choose Account Type: Caregiver or Employer */}
                            <Typography
                                sx={{
                                    fontFamily: "Abel",
                                    color: "primary.main",
                                    fontWeight: 800,
                                    fontSize: 16,
                                    px: 2,
                                    mt: 2,
                                }}
                            >
                                Please select one for your{" "}
                                <span style={{ color: "#000" }}>
                                    Account type.
                                </span>
                            </Typography>
                            <Box
                                sx={{
                                    mb: 1,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: 2,
                                    p: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        p: 3,
                                        height: 80,
                                        borderRadius: 3,
                                        boxShadow: 2,
                                        width: "100%",
                                        bgcolor: "primary.main",
                                        border:
                                            data.is_employer === true
                                                ? "4px solid orange"
                                                : "none",
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
                                        fontFamily={"Mali"}
                                        fontSize={15}
                                        fontWeight={600}
                                        color={"#fff"}
                                    >
                                        Find a Caregiver
                                    </Typography>
                                    <Typography
                                        textAlign={"center"}
                                        fontFamily={"Abel"}
                                        fontSize={15}
                                        fontWeight={600}
                                        color={"#ddd"}
                                    >
                                        (For employer)
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        p: 3,
                                        height: 80,
                                        borderRadius: 10,
                                        boxShadow: 2,
                                        width: "100%",
                                        border:
                                            data.is_caregiver === true
                                                ? "4px solid orange"
                                                : "none",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        overflow: "hidden",
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
                                        fontFamily={"Mali"}
                                        fontSize={17}
                                        fontWeight={600}
                                        color={"grey.700"}
                                    >
                                        Get a Job
                                    </Typography>
                                </Box>
                            </Box>
                            <Box textAlign={"center"}>
                                <Typography fontSize={13} fontFamily={"Mina"}>
                                    {data.is_employer && "I'm an employer."}
                                    {data.is_caregiver && "I'm a caregiver."}
                                </Typography>
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
                                        <Typography
                                            fontSize={12}
                                            fontFamily={"Mina"}
                                        >
                                            I agree to the Terms and Conditions
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
                                        fontFamily: "ADLaM Display",
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

export default SignUp;
