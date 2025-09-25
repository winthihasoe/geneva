import AppLayout from "@/Layouts/AppLayout";
import React from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Divider,
} from "@mui/material";
import { useForm } from "@inertiajs/react";
import CircularProgress from "@mui/material/CircularProgress";

function SkillAssessment() {
    const { data, setData, post, processing, errors } = useForm({
        fullName: "",
        dateOfBirth: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        education: "",
        certifications: "",
        experienceYears: "",
        experienceDetails: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("assessment.submit"));
    };

    return (
        <AppLayout>
            <Box
                sx={{
                    maxWidth: 600,
                    mx: "auto",
                    my: 4,
                    p: 3,
                    bgcolor: "background.paper",
                    boxShadow: 3,
                    borderRadius: 2,
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    mb={2}
                    textAlign="center"
                    color="primary"
                >
                    Caregiver Skill Assessment
                </Typography>
                <Divider sx={{ my: 2 }} />
                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        {/* Personal Info */}
                        <Typography variant="h6">
                            Personal Information
                        </Typography>
                        <Box>
                            <Typography variant="body2" color="textSecondary">
                                Name *
                            </Typography>
                            <TextField
                                name="fullName"
                                value={data.fullName}
                                onChange={handleChange}
                                required
                                fullWidth
                                variant="filled"
                            />
                            {errors?.fullName && (
                                <Typography fontSize={12} color="error">
                                    {errors.fullName}
                                </Typography>
                            )}
                        </Box>
                        <Box>
                            <Typography variant="body2" color="textSecondary">
                                Date of Birth *
                            </Typography>
                            <TextField
                                name="dateOfBirth"
                                type="date"
                                value={data.dateOfBirth}
                                onChange={handleChange}
                                required
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                variant="filled"
                            />
                            {errors?.dateOfBirth && (
                                <Typography fontSize={12} color="error">
                                    {errors.dateOfBirth}
                                </Typography>
                            )}
                        </Box>
                        <FormControl fullWidth required error={!!errors.gender}>
                            <InputLabel>Gender</InputLabel>
                            <Select
                                name="gender"
                                value={data.gender}
                                label="Gender"
                                onChange={handleChange}
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        {errors?.gender && (
                            <Typography fontSize={12} color="error">
                                {errors.gender}
                            </Typography>
                        )}
                        <Box>
                            <Typography variant="body2" color="textSecondary">
                                Phone Number *
                            </Typography>
                            <TextField
                                name="phone"
                                variant="filled"
                                value={data.phone}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                            {errors?.phone && (
                                <Typography fontSize={12} color="error">
                                    {errors.phone}
                                </Typography>
                            )}
                        </Box>

                        <Box>
                            <Typography variant="body2" color="textSecondary">
                                Email Address *
                            </Typography>
                            <TextField
                                name="email"
                                variant="filled"
                                type="email"
                                value={data.email}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                            {errors?.email && (
                                <Typography fontSize={12} color="error">
                                    {errors.email}
                                </Typography>
                            )}
                        </Box>

                        <Box>
                            <Typography variant="body2" color="textSecondary">
                                Current Address *
                            </Typography>
                            <TextField
                                name="address"
                                variant="filled"
                                value={data.address}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                            {errors?.address && (
                                <Typography fontSize={12} color="error">
                                    {errors.address}
                                </Typography>
                            )}
                        </Box>

                        {/* Qualifications */}
                        <Typography variant="h6">Qualifications</Typography>
                        <Box>
                            <Typography variant="body2" color="textSecondary">
                                Education *
                            </Typography>
                            <TextField
                                name="education"
                                variant="filled"
                                value={data.education}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                            {errors?.education && (
                                <Typography fontSize={12} color="error">
                                    {errors.education}
                                </Typography>
                            )}
                        </Box>
                        <Box>
                            <Typography variant="body2" color="textSecondary">
                                Certifications *
                            </Typography>
                            <TextField
                                name="certifications"
                                variant="filled"
                                value={data.certifications}
                                onChange={handleChange}
                                fullWidth
                            />
                            {errors?.certifications && (
                                <Typography fontSize={12} color="error">
                                    {errors.certifications}
                                </Typography>
                            )}
                        </Box>

                        {/* Experience */}
                        <Typography variant="h6">Experience</Typography>

                        <Box>
                            <Typography variant="body2" color="textSecondary">
                                Years of Experience *
                            </Typography>
                            <TextField
                                name="experienceYears"
                                variant="filled"
                                value={data.experienceYears}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                            {errors?.experienceYears && (
                                <Typography fontSize={12} color="error">
                                    {errors.experienceYears}
                                </Typography>
                            )}
                        </Box>
                        <Box>
                            <Typography variant="body2" color="textSecondary">
                                Experience Details *
                            </Typography>
                            <TextField
                                name="experienceDetails"
                                variant="filled"
                                value={data.experienceDetails}
                                onChange={handleChange}
                                multiline
                                minRows={3}
                                fullWidth
                            />
                            {errors?.experienceDetails && (
                                <Typography fontSize={12} color="error">
                                    {errors.experienceDetails}
                                </Typography>
                            )}
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={processing}
                            startIcon={
                                processing ? (
                                    <CircularProgress
                                        size={18}
                                        color="inherit"
                                    />
                                ) : null
                            }
                        >
                            {processing ? "Submitting..." : "Submit"}
                        </Button>
                    </Stack>
                </form>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    mt={2}
                    textAlign={"center"}
                >
                    Note. The Admin will review your submission and get back to
                    you.
                </Typography>
            </Box>
        </AppLayout>
    );
}

export default SkillAssessment;
