import AppLayout from "@/Layouts/AppLayout";
import React from "react";
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Stack,
    Divider,
} from "@mui/material";
import { Head } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

function EditProfile({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("employer.profile.update"));
    };

    const handleCancel = () => {
        window.history.back();
    };

    return (
        <AppLayout>
            <Head title="Edit Profile" />
            <Container maxWidth="sm" sx={{ py: 4 }}>
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    mb={4}
                    textAlign="center"
                >
                    Edit Profile
                </Typography>

                <Card sx={{ borderRadius: 2 }}>
                    <CardContent sx={{ p: 3 }}>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={3}>
                                {/* Full Name */}
                                <Box>
                                    <Typography variant="h6" mb={1}>
                                        Full Name
                                    </Typography>
                                    <TextField
                                        variant="filled"
                                        fullWidth
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        error={!!errors.name}
                                        helperText={errors.name}
                                        required
                                    />
                                </Box>

                                {/* Email */}
                                <Box>
                                    <Typography variant="h6" mb={1}>
                                        Email Address
                                    </Typography>
                                    <TextField
                                        variant="filled"
                                        type="email"
                                        fullWidth
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        required
                                    />
                                </Box>

                                {/* Phone */}
                                <Box>
                                    <Typography variant="h6" mb={1}>
                                        Phone Number
                                    </Typography>
                                    <TextField
                                        variant="filled"
                                        fullWidth
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                        error={!!errors.phone}
                                        helperText={errors.phone}
                                    />
                                </Box>

                                {/* Address */}
                                <Box>
                                    <Typography variant="h6" mb={1}>
                                        Address
                                    </Typography>
                                    <TextField
                                        variant="filled"
                                        fullWidth
                                        multiline
                                        rows={3}
                                        value={data.address}
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                        error={!!errors.address}
                                        helperText={errors.address}
                                    />
                                </Box>

                                <Divider />

                                {/* Change Password Section */}
                                <Typography
                                    variant="h5"
                                    fontWeight="bold"
                                    color="primary"
                                >
                                    Change Password
                                </Typography>

                                {/* Current Password */}
                                <Box>
                                    <Typography variant="h6" mb={1}>
                                        Current Password
                                    </Typography>
                                    <TextField
                                        variant="filled"
                                        type="password"
                                        fullWidth
                                        value={data.current_password}
                                        onChange={(e) =>
                                            setData(
                                                "current_password",
                                                e.target.value
                                            )
                                        }
                                        error={!!errors.current_password}
                                        helperText={errors.current_password}
                                    />
                                </Box>

                                {/* New Password */}
                                <Box>
                                    <Typography variant="h6" mb={1}>
                                        New Password
                                    </Typography>
                                    <TextField
                                        variant="filled"
                                        type="password"
                                        fullWidth
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        error={!!errors.password}
                                        helperText={errors.password}
                                    />
                                </Box>

                                {/* Confirm New Password */}
                                <Box>
                                    <Typography variant="h6" mb={1}>
                                        Confirm New Password
                                    </Typography>
                                    <TextField
                                        variant="filled"
                                        type="password"
                                        fullWidth
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        error={!!errors.password_confirmation}
                                        helperText={
                                            errors.password_confirmation
                                        }
                                    />
                                </Box>

                                {/* Action Buttons */}
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    justifyContent="center"
                                    mt={3}
                                >
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="small"
                                        startIcon={<SaveIcon />}
                                        disabled={processing}
                                    >
                                        {processing
                                            ? "Saving..."
                                            : "Save Changes"}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        startIcon={<CancelIcon />}
                                        onClick={handleCancel}
                                        disabled={processing}
                                    >
                                        Cancel
                                    </Button>
                                </Stack>
                            </Stack>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </AppLayout>
    );
}

export default EditProfile;
