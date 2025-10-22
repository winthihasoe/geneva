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
    MenuItem,
    FormControl,
    InputLabel,
    Select,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

const AccidentEmergency = ({
    data,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
    entryRefs,
}) => {
    const severityOptions = ["Low", "Medium", "High", "Critical"];

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
                        11. Accident & Emergency Situations
                    </Typography>
                    <Button
                        startIcon={<AddIcon />}
                        onClick={() =>
                            addArrayItem("accident", {
                                time: "",
                                description: "",
                                severity: "Medium",
                                action: "",
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
                                entryRefs.current[`accident-${index}`] = el;
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
                                    removeArrayItem("accident", index)
                                }
                                color="error"
                                size="small"
                                disabled={data.length === 1}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>

                        <Grid2 container spacing={2} sx={{ mb: 3 }}>
                            {/* Time */}
                            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Time"
                                    type="time"
                                    value={item.time}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "accident",
                                            index,
                                            "time",
                                            e.target.value
                                        )
                                    }
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid2>

                            {/* Severity */}
                            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                <FormControl fullWidth variant="standard">
                                    <InputLabel>Severity</InputLabel>
                                    <Select
                                        value={item.severity || "Medium"}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "accident",
                                                index,
                                                "severity",
                                                e.target.value
                                            )
                                        }
                                        label="Severity"
                                    >
                                        {severityOptions.map((option) => (
                                            <MenuItem
                                                key={option}
                                                value={option}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid2>

                            {/* Incident Description */}
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Incident Description"
                                    value={item.description}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "accident",
                                            index,
                                            "description",
                                            e.target.value
                                        )
                                    }
                                    multiline
                                    maxRows={5}
                                    placeholder="Describe the incident in detail..."
                                />
                            </Grid2>

                            {/* Actions Taken */}
                            <Grid2 size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Actions Taken"
                                    value={item.action}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "accident",
                                            index,
                                            "action",
                                            e.target.value
                                        )
                                    }
                                    multiline
                                    maxRows={5}
                                    placeholder="Describe what actions were taken in response to the incident..."
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

export default AccidentEmergency;
