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

const HygieneSection = ({
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
                        5. Hygiene & Grooming
                    </Typography>
                    <Button
                        startIcon={<AddIcon />}
                        onClick={() =>
                            addArrayItem("hygiene", {
                                time: "",
                                activity: "",
                                products: "",
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
                                entryRefs.current[`hygiene-${index}`] = el;
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
                                    removeArrayItem("hygiene", index)
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
                                            "hygiene",
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
                                    <InputLabel>Activity</InputLabel>
                                    <Select
                                        value={item.activity}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "hygiene",
                                                index,
                                                "activity",
                                                e.target.value
                                            )
                                        }
                                        label="Activity"
                                    >
                                        <MenuItem value="Bath">Bath</MenuItem>
                                        <MenuItem value="Nail Trim">
                                            Nail Trim
                                        </MenuItem>
                                        <MenuItem value="Hair Care">
                                            Hair Care
                                        </MenuItem>
                                        <MenuItem value="Wash Face">
                                            Wash Face
                                        </MenuItem>
                                        <MenuItem value="Oral Care">
                                            Oral Care
                                        </MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Products Used"
                                    value={item.products}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "hygiene",
                                            index,
                                            "products",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Products used"
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Notes"
                                    value={item.notes}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "hygiene",
                                            index,
                                            "notes",
                                            e.target.value
                                        )
                                    }
                                    multiline
                                    maxRows={3}
                                    placeholder="Any observations..."
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

export default HygieneSection;
