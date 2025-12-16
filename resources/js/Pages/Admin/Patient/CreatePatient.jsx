import React from "react";
import { Head, useForm } from "@inertiajs/react";
import {
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    Box,
    Container,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import AdminLayout from "@/Layouts/AdminLayout";
import TitleCenter from "@/Components/Typo/TitleCenter";
import BackButton from "@/Components/BackButton";
import { Label } from "@mui/icons-material";

const CreatePatient = () => {
    const { data, setData, post, processing, errors } = useForm({
        type: "Elder", // Default value
        first_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "Male", // Default value
        weight_kg: "",
        height_cm: "",
        blood_type: "",
        allergies: "",
        medical_conditions: "",
        emergency_contact_name: "",
        emergency_contact_relationship: "",
        emergency_contact_phone: "",
        address: "",
        service_area: "",
        notes: "",
        created_by: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.patient.store"));
    };

    return (
        <AdminLayout>
            <Head title="Create Patient" />
            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                <BackButton />
                <Box
                    sx={{
                        maxWidth: 500,
                        margin: "auto",
                        padding: { xs: 1, sm: 2, md: 3 },
                        borderRadius: 3,
                        boxShadow: 2,
                    }}
                >
                    <TitleCenter>Create Patient</TitleCenter>

                    <form onSubmit={handleSubmit}>
                        {/* Patient Type */}
                        <Box sx={{ marginBottom: 3 }}>
                            <FormControl size="small" sx={{ width: "100%" }}>
                                <InputLabel id="type-label">
                                    Patient Type
                                </InputLabel>
                                <Select
                                    variant="standard"
                                    labelId="type-label"
                                    value={data.type}
                                    onChange={(e) =>
                                        setData("type", e.target.value)
                                    }
                                >
                                    <MenuItem value="Elder">Elder</MenuItem>
                                    <MenuItem value="Baby">Baby</MenuItem>
                                    <MenuItem value="Newborn">Newborn</MenuItem>
                                </Select>
                                {errors.type && (
                                    <Typography color="error" variant="body2">
                                        {errors.type}
                                    </Typography>
                                )}
                            </FormControl>
                        </Box>

                        {/* First Name */}
                        <Box sx={{ marginBottom: 3 }}>
                            <TextField
                                label="First Name"
                                variant="outlined"
                                size="small"
                                value={data.first_name}
                                onChange={(e) =>
                                    setData("first_name", e.target.value)
                                }
                                error={!!errors.first_name}
                                helperText={errors.first_name}
                                sx={{ width: "100%" }}
                                required
                            />
                        </Box>

                        {/* Last Name */}
                        <Box sx={{ marginBottom: 3 }}>
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                size="small"
                                value={data.last_name}
                                onChange={(e) =>
                                    setData("last_name", e.target.value)
                                }
                                error={!!errors.last_name}
                                helperText={errors.last_name}
                                sx={{ width: "100%" }}
                            />
                        </Box>

                        {/* Date of Birth */}
                        <Box sx={{ marginBottom: 3 }}>
                            <TextField
                                label="Date of Birth"
                                type="date"
                                variant="outlined"
                                size="small"
                                value={data.date_of_birth}
                                onChange={(e) =>
                                    setData("date_of_birth", e.target.value)
                                }
                                InputLabelProps={{ shrink: true }}
                                error={!!errors.date_of_birth}
                                helperText={errors.date_of_birth}
                                sx={{ width: "100%" }}
                            />
                        </Box>

                        {/* Gender */}
                        <Box sx={{ marginBottom: 3 }}>
                            <FormControl size="small" sx={{ width: "100%" }}>
                                <InputLabel id="gender-label">
                                    Gender
                                </InputLabel>
                                <Select
                                    variant="standard"
                                    labelId="gender-label"
                                    value={data.gender}
                                    onChange={(e) =>
                                        setData("gender", e.target.value)
                                    }
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                                {errors.gender && (
                                    <Typography color="error" variant="body2">
                                        {errors.gender}
                                    </Typography>
                                )}
                            </FormControl>
                        </Box>

                        {/* Weight */}
                        <Box sx={{ marginBottom: 3 }}>
                            <TextField
                                label="Weight (kg)"
                                type="number"
                                variant="outlined"
                                size="small"
                                value={data.weight_kg}
                                onChange={(e) =>
                                    setData("weight_kg", e.target.value)
                                }
                                error={!!errors.weight_kg}
                                helperText={errors.weight_kg}
                                sx={{ width: "100%" }}
                            />
                        </Box>

                        {/* Height */}
                        <Box sx={{ marginBottom: 3 }}>
                            <TextField
                                label="Height (cm)"
                                type="number"
                                variant="outlined"
                                size="small"
                                value={data.height_cm}
                                onChange={(e) =>
                                    setData("height_cm", e.target.value)
                                }
                                error={!!errors.height_cm}
                                helperText={errors.height_cm}
                                sx={{ width: "100%" }}
                            />
                        </Box>

                        {/* Blood Type */}
                        <Box sx={{ marginBottom: 3 }}>
                            <FormControl size="small" sx={{ width: "100%" }}>
                                <InputLabel id="blood-type-label">
                                    Blood Type
                                </InputLabel>
                                <Select
                                    variant="standard"
                                    labelId="blood-type-label"
                                    value={data.blood_type}
                                    onChange={(e) =>
                                        setData("blood_type", e.target.value)
                                    }
                                >
                                    <MenuItem value="A+">A+</MenuItem>
                                    <MenuItem value="A-">A-</MenuItem>
                                    <MenuItem value="B+">B+</MenuItem>
                                    <MenuItem value="B-">B-</MenuItem>
                                    <MenuItem value="O+">O+</MenuItem>
                                    <MenuItem value="O-">O-</MenuItem>
                                    <MenuItem value="AB+">AB+</MenuItem>
                                    <MenuItem value="AB-">AB-</MenuItem>
                                </Select>
                                {errors.blood_type && (
                                    <Typography color="error" variant="body2">
                                        {errors.blood_type}
                                    </Typography>
                                )}
                            </FormControl>
                        </Box>

                        {/* Allergies */}
                        <Box sx={{ marginBottom: 3 }}>
                            <TextField
                                label="Allergies"
                                variant="outlined"
                                size="small"
                                multiline
                                value={data.allergies}
                                onChange={(e) =>
                                    setData("allergies", e.target.value)
                                }
                                error={!!errors.allergies}
                                helperText={errors.allergies}
                                sx={{ width: "100%" }}
                            />
                        </Box>

                        {/* Medical Conditions */}
                        <Box sx={{ marginBottom: 3 }}>
                            <TextField
                                label="Medical Conditions"
                                variant="outlined"
                                size="small"
                                multiline
                                value={data.medical_conditions}
                                onChange={(e) =>
                                    setData(
                                        "medical_conditions",
                                        e.target.value
                                    )
                                }
                                error={!!errors.medical_conditions}
                                helperText={errors.medical_conditions}
                                sx={{ width: "100%" }}
                            />
                        </Box>

                        {/* Emergency Contact Name */}
                        <Box sx={{ marginBottom: 3 }}>
                            <TextField
                                label="Emergency Contact Name"
                                variant="outlined"
                                size="small"
                                value={data.emergency_contact_name}
                                onChange={(e) =>
                                    setData(
                                        "emergency_contact_name",
                                        e.target.value
                                    )
                                }
                                error={!!errors.emergency_contact_name}
                                helperText={errors.emergency_contact_name}
                                sx={{ width: "100%" }}
                            />
                        </Box>

                        {/* Emergency Contact Relationship */}
                        <Box sx={{ marginBottom: 3 }}>
                            <TextField
                                label="Emergency Contact Relationship"
                                variant="outlined"
                                size="small"
                                value={data.emergency_contact_relationship}
                                onChange={(e) =>
                                    setData(
                                        "emergency_contact_relationship",
                                        e.target.value
                                    )
                                }
                                error={!!errors.emergency_contact_relationship}
                                helperText={
                                    errors.emergency_contact_relationship
                                }
                                sx={{ width: "100%" }}
                            />
                        </Box>

                        {/* Emergency Contact Phone */}
                        <Box sx={{ marginBottom: 3 }}>
                            <TextField
                                label="Emergency Contact Phone"
                                variant="outlined"
                                size="small"
                                type="tel"
                                value={data.emergency_contact_phone}
                                onChange={(e) =>
                                    setData(
                                        "emergency_contact_phone",
                                        e.target.value
                                    )
                                }
                                error={!!errors.emergency_contact_phone}
                                helperText={errors.emergency_contact_phone}
                                sx={{ width: "100%" }}
                            />
                        </Box>

                        {/* Address */}
                        <Box sx={{ marginBottom: 3 }}>
                            <TextField
                                label="Address"
                                variant="outlined"
                                size="small"
                                multiline
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                error={!!errors.address}
                                helperText={errors.address}
                                sx={{ width: "100%" }}
                            />
                        </Box>

                        {/* Service Area  */}
                        <FormControl
                            sx={{
                                mb: 3,
                            }}
                            required
                        >
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                Service Area
                            </Typography>
                            <RadioGroup
                                aria-label="service-area"
                                row
                                value={data.service_area}
                                onChange={(e) =>
                                    setData("service_area", e.target.value)
                                }
                                name="service_area"
                            >
                                <FormControlLabel
                                    value="Mandalay"
                                    control={<Radio />}
                                    label={
                                        <Typography variant="body2">
                                            Mandalay
                                        </Typography>
                                    }
                                />
                                <FormControlLabel
                                    value="Yangon"
                                    control={<Radio />}
                                    label={
                                        <Typography variant="body2">
                                            Yangon
                                        </Typography>
                                    }
                                />
                            </RadioGroup>
                            {errors.service_area && (
                                <Typography color="error" variant="caption">
                                    {errors.service_area}
                                </Typography>
                            )}
                        </FormControl>

                        {/* Notes */}
                        <Box sx={{ marginBottom: 3 }}>
                            <TextField
                                label="Notes"
                                variant="outlined"
                                size="small"
                                multiline
                                rows={3}
                                value={data.notes}
                                onChange={(e) =>
                                    setData("notes", e.target.value)
                                }
                                error={!!errors.notes}
                                helperText={errors.notes}
                                sx={{ width: "100%" }}
                            />
                        </Box>

                        {/* Submit Button */}
                        <Box sx={{ textAlign: "center", mb: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={processing}
                                sx={{
                                    fontSize: { xs: "0.9rem", sm: "1.2rem" },
                                }}
                            >
                                Save Patient
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Container>
        </AdminLayout>
    );
};

export default CreatePatient;
