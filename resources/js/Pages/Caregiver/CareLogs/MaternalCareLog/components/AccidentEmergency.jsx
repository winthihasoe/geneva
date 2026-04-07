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

const SEVERITY_KEYS = ["Low", "Medium", "High", "Critical"];

const AccidentEmergency = ({
    strings,
    data,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
    entryRefs,
}) => {
    const c = strings.common;
    const a = strings.accident;
    const opt = strings.options.severity;

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
                        {a.sectionTitle}
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
                        {c.addEntry}
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
                                {c.entry(index + 1)}
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
                            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label={c.time}
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

                            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                <FormControl fullWidth variant="standard">
                                    <InputLabel>{c.severity}</InputLabel>
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
                                        label={c.severity}
                                    >
                                        {SEVERITY_KEYS.map((key) => (
                                            <MenuItem key={key} value={key}>
                                                {opt[key]}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid2>

                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label={c.incidentDescription}
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
                                    placeholder={a.descriptionPlaceholder}
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label={c.actionsTaken}
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
                                    placeholder={a.actionPlaceholder}
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
