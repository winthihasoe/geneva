import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid2,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import { useForm } from "@inertiajs/react";

function EditPatient({ open, onClose, patient }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        type: patient?.type || "",
        first_name: patient?.first_name || "",
        last_name: patient?.last_name || "",
        date_of_birth: patient?.date_of_birth || "",
        gender: patient?.gender || "",
        weight_kg: patient?.weight_kg || "",
        height_cm: patient?.height_cm || "",
        blood_type: patient?.blood_type || "",
        allergies: patient?.allergies || "",
        medical_conditions: patient?.medical_conditions || "",
        emergency_contact_name: patient?.emergency_contact_name || "",
        emergency_contact_relationship:
            patient?.emergency_contact_relationship || "",
        emergency_contact_phone: patient?.emergency_contact_phone || "",
        address: patient?.address || "",
        notes: patient?.notes || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.patient.update", patient.id), {
            onSuccess: () => {
                onClose();
                reset();
            },
        });
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 2 },
            }}
        >
            <DialogTitle
                sx={{
                    fontWeight: "bold",
                    fontFamily: "Roboto Slab",
                    color: "primary.main",
                }}
            >
                Edit Patient Details
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 12, sm: 6 }}>
                            <FormControl
                                fullWidth
                                error={!!errors.type}
                                variant="standard"
                            >
                                <InputLabel>Type *</InputLabel>
                                <Select
                                    value={data.type}
                                    onChange={(e) =>
                                        setData("type", e.target.value)
                                    }
                                    required
                                    label="Type *"
                                >
                                    <MenuItem value="Elder">Elder</MenuItem>
                                    <MenuItem value="Baby">Baby</MenuItem>
                                    <MenuItem value="Newborn">Newborn</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid2>

                        <Grid2 size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="First Name"
                                value={data.first_name}
                                onChange={(e) =>
                                    setData("first_name", e.target.value)
                                }
                                error={!!errors.first_name}
                                helperText={errors.first_name}
                                variant="standard"
                                required
                            />
                        </Grid2>

                        <Grid2 size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                value={data.last_name}
                                onChange={(e) =>
                                    setData("last_name", e.target.value)
                                }
                                error={!!errors.last_name}
                                helperText={errors.last_name}
                                variant="standard"
                            />
                        </Grid2>

                        <Grid2 size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Date of Birth"
                                type="date"
                                value={data.date_of_birth}
                                onChange={(e) =>
                                    setData("date_of_birth", e.target.value)
                                }
                                InputLabelProps={{ shrink: true }}
                                error={!!errors.date_of_birth}
                                helperText={errors.date_of_birth}
                                variant="standard"
                            />
                        </Grid2>

                        <Grid2 size={{ xs: 12, sm: 6 }}>
                            <FormControl
                                fullWidth
                                error={!!errors.gender}
                                variant="standard"
                            >
                                <InputLabel>Gender *</InputLabel>
                                <Select
                                    value={data.gender}
                                    onChange={(e) =>
                                        setData("gender", e.target.value)
                                    }
                                    required
                                    label="Gender *"
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid2>

                        <Grid2 size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Weight (kg)"
                                type="number"
                                value={data.weight_kg}
                                onChange={(e) =>
                                    setData("weight_kg", e.target.value)
                                }
                                error={!!errors.weight_kg}
                                helperText={errors.weight_kg}
                                variant="standard"
                            />
                        </Grid2>

                        <Grid2 size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Height (cm)"
                                type="number"
                                value={data.height_cm}
                                onChange={(e) =>
                                    setData("height_cm", e.target.value)
                                }
                                error={!!errors.height_cm}
                                helperText={errors.height_cm}
                                variant="standard"
                            />
                        </Grid2>

                        <Grid2 size={{ xs: 12, sm: 6 }}>
                            <FormControl fullWidth variant="standard">
                                <InputLabel>Blood Type</InputLabel>
                                <Select
                                    value={data.blood_type}
                                    onChange={(e) =>
                                        setData("blood_type", e.target.value)
                                    }
                                    label="Blood Type"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="A+">A+</MenuItem>
                                    <MenuItem value="A-">A-</MenuItem>
                                    <MenuItem value="B+">B+</MenuItem>
                                    <MenuItem value="B-">B-</MenuItem>
                                    <MenuItem value="O+">O+</MenuItem>
                                    <MenuItem value="O-">O-</MenuItem>
                                    <MenuItem value="AB+">AB+</MenuItem>
                                    <MenuItem value="AB-">AB-</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid2>

                        <Grid2 size={12}>
                            <TextField
                                fullWidth
                                label="Allergies"
                                multiline
                                rows={2}
                                value={data.allergies}
                                onChange={(e) =>
                                    setData("allergies", e.target.value)
                                }
                                error={!!errors.allergies}
                                helperText={errors.allergies}
                                variant="standard"
                            />
                        </Grid2>

                        <Grid2 size={12}>
                            <TextField
                                fullWidth
                                label="Medical Conditions"
                                multiline
                                rows={2}
                                value={data.medical_conditions}
                                onChange={(e) =>
                                    setData(
                                        "medical_conditions",
                                        e.target.value
                                    )
                                }
                                error={!!errors.medical_conditions}
                                helperText={errors.medical_conditions}
                                variant="standard"
                            />
                        </Grid2>

                        <Grid2 size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Emergency Contact Name"
                                value={data.emergency_contact_name}
                                onChange={(e) =>
                                    setData(
                                        "emergency_contact_name",
                                        e.target.value
                                    )
                                }
                                error={!!errors.emergency_contact_name}
                                helperText={errors.emergency_contact_name}
                                variant="standard"
                            />
                        </Grid2>

                        <Grid2 size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Emergency Contact Relationship"
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
                                variant="standard"
                            />
                        </Grid2>

                        <Grid2 size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Emergency Contact Phone"
                                value={data.emergency_contact_phone}
                                onChange={(e) =>
                                    setData(
                                        "emergency_contact_phone",
                                        e.target.value
                                    )
                                }
                                error={!!errors.emergency_contact_phone}
                                helperText={errors.emergency_contact_phone}
                                variant="standard"
                            />
                        </Grid2>

                        <Grid2 size={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                multiline
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                error={!!errors.address}
                                helperText={errors.address}
                                variant="standard"
                            />
                        </Grid2>
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

                        <Grid2 size={12}>
                            <TextField
                                fullWidth
                                label="Notes"
                                multiline
                                variant="standard"
                                value={data.notes}
                                onChange={(e) =>
                                    setData("notes", e.target.value)
                                }
                                error={!!errors.notes}
                                helperText={errors.notes}
                            />
                        </Grid2>
                    </Grid2>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button
                        onClick={handleClose}
                        disabled={processing}
                        sx={{ borderRadius: 20 }}
                        size="small"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={processing}
                        sx={{ borderRadius: 20 }}
                        size="small"
                    >
                        {processing ? "Updating..." : "Save"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default EditPatient;
