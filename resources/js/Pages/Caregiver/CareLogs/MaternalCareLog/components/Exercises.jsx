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
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

const Exercises = ({
    data,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
    entryRefs,
}) => {
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
                        4. Mobility & Exercise
                    </Typography>
                    <Button
                        startIcon={<AddIcon />}
                        onClick={() =>
                            addArrayItem("mobility", {
                                time: "",
                                duration: "",
                                activity: "",
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
                                entryRefs.current[`mobility-${index}`] = el;
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
                                    removeArrayItem("mobility", index)
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
                                    label="Time"
                                    type="time"
                                    value={item.time}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "mobility",
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
                                    label="Duration"
                                    value={item.duration}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "mobility",
                                            index,
                                            "duration",
                                            e.target.value
                                        )
                                    }
                                    placeholder="e.g., 30 minutes, 15 mins"
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Mobility Assistance/Exercises"
                                    value={item.activity}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "mobility",
                                            index,
                                            "activity",
                                            e.target.value
                                        )
                                    }
                                    multiline
                                    rows={3}
                                    maxRows={6}
                                    placeholder="Describe mobility assistance provided or exercises performed (e.g., walking assistance with walker, range of motion exercises for arms, transfer assistance from bed to wheelchair, physical therapy exercises)"
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Notes"
                                    value={item.notes}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "mobility",
                                            index,
                                            "notes",
                                            e.target.value
                                        )
                                    }
                                    multiline
                                    maxRows={3}
                                    placeholder="Client cooperation, discomfort, improvements, limitations, safety concerns..."
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

export default Exercises;
