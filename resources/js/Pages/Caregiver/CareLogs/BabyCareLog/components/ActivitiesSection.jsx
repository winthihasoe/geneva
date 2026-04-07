import React from "react";
import {
    Typography,
    TextField,
    Button,
    IconButton,
    FormControl,
    Select,
    MenuItem,
    Card,
    CardContent,
    Box,
    Grid2,
    Divider,
    InputLabel,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

const ACTIVITY_OPTIONS = [
    "Tummy Time",
    "Walk",
    "Play",
    "Massage",
    "Reading",
    "Singing",
    "Other",
];

const ActivitiesSection = ({
    data,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
    entryRefs,
    strings,
}) => {
    const a = strings.activities;
    const c = strings.common;
    const o = strings.options;

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
                            addArrayItem("activities", {
                                time: "",
                                activity: "",
                                duration: "",
                                details: "",
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
                                entryRefs.current[`activities-${index}`] = el;
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
                                    removeArrayItem("activities", index)
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
                                            "activities",
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
                                    <InputLabel>{c.activity}</InputLabel>
                                    <Select
                                        value={item.activity}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "activities",
                                                index,
                                                "activity",
                                                e.target.value
                                            )
                                        }
                                        label={c.activity}
                                    >
                                        {ACTIVITY_OPTIONS.map((key) => (
                                            <MenuItem key={key} value={key}>
                                                {o.babyActivity[key]}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label={c.duration}
                                    value={item.duration}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "activities",
                                            index,
                                            "duration",
                                            e.target.value
                                        )
                                    }
                                    placeholder={a.durationPlaceholder}
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label={c.notes}
                                    value={item.details}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "activities",
                                            index,
                                            "details",
                                            e.target.value
                                        )
                                    }
                                    multiline
                                    maxRows={3}
                                    placeholder={a.detailsPlaceholder}
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

export default ActivitiesSection;
