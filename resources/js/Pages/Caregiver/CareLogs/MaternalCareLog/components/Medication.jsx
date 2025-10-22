import React from "react";
import {
    Typography,
    TextField,
    Button,
    IconButton,
    Card,
    CardContent,
    Box,
    Grid2,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

const Medication = ({
    data,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
    entryRefs,
}) => {
    const routes = [
        { value: "PO", label: "PO (Oral)" },
        { value: "SC", label: "SC (Subcutaneous)" },
        { value: "IV", label: "IV (Intravenous)" },
        { value: "IM", label: "IM (Intramuscular)" },
        { value: "Inhale", label: "Inhale" },
        { value: "Local", label: "Local (Topical)" },
        { value: "Rectal", label: "Rectal" },
        { value: "Sublingual", label: "Sublingual" },
    ];

    return (
        <Card sx={{ borderRadius: 2, bgcolor: "transparent" }}>
            <CardContent>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                >
                    <Typography variant="h6" fontWeight="bold" color="primary">
                        2. Medication Administration
                    </Typography>
                    <Button
                        startIcon={<AddIcon />}
                        onClick={() =>
                            addArrayItem("medication", {
                                time: "",
                                medication: "",
                                dosage: "",
                                route: "",
                                notes: "",
                            })
                        }
                        variant="outlined"
                        size="small"
                    >
                        Add Entry
                    </Button>
                </Box>

                {data.map((item, index) => (
                    <Box
                        key={index}
                        ref={(el) => {
                            if (entryRefs) {
                                entryRefs.current[`medication-${index}`] = el;
                            }
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                            >
                                Entry {index + 1}
                            </Typography>
                            <IconButton
                                onClick={() =>
                                    removeArrayItem("medication", index)
                                }
                                color="error"
                                size="small"
                                disabled={data.length === 1}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>

                        <Grid2 container spacing={2} sx={{ mb: 3 }}>
                            <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Time"
                                    type="time"
                                    value={item.time}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "medication",
                                            index,
                                            "time",
                                            e.target.value
                                        )
                                    }
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Medication"
                                    value={item.medication}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "medication",
                                            index,
                                            "medication",
                                            e.target.value.slice(0, 255)
                                        )
                                    }
                                    placeholder="e.g., Metformin, Aspirin"
                                    inputProps={{ maxLength: 255 }}
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Dosage"
                                    value={item.dosage}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "medication",
                                            index,
                                            "dosage",
                                            e.target.value.slice(0, 255)
                                        )
                                    }
                                    placeholder="e.g., 250mg, 500mg"
                                    inputProps={{ maxLength: 255 }}
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
                                <FormControl fullWidth variant="standard">
                                    <InputLabel>Route</InputLabel>
                                    <Select
                                        value={item.route}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "medication",
                                                index,
                                                "route",
                                                e.target.value
                                            )
                                        }
                                    >
                                        {routes.map((route) => (
                                            <MenuItem
                                                key={route.value}
                                                value={route.value}
                                            >
                                                {route.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 12, md: 3 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Notes"
                                    value={item.notes}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "medication",
                                            index,
                                            "notes",
                                            e.target.value.slice(0, 255)
                                        )
                                    }
                                    multiline
                                    maxRows={5}
                                    placeholder="Client response, side effects, cooperation..."
                                    inputProps={{ maxLength: 255 }}
                                />
                            </Grid2>
                        </Grid2>

                        {index < data.length - 1 && <Divider sx={{ mb: 3 }} />}
                    </Box>
                ))}
            </CardContent>
        </Card>
    );
};

export default Medication;
