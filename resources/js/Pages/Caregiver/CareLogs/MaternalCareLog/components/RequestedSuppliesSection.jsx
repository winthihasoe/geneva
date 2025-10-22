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

const RequestedSuppliesSection = ({
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
                        Requested Supplies
                    </Typography>
                    <Button
                        startIcon={<AddIcon />}
                        onClick={() =>
                            addArrayItem("supplies", {
                                item: "",
                                quantity: "",
                                purpose: "",
                                priority: "medium", // Changed: Set default to match database default
                            })
                        }
                        variant="outlined"
                        size="small"
                    >
                        Add Item
                    </Button>
                </Box>

                {data.map((item, index) => (
                    <Box
                        key={index}
                        ref={(el) => {
                            if (entryRefs) {
                                entryRefs.current[`supplies-${index}`] = el;
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
                                Item {index + 1}
                            </Typography>
                            <IconButton
                                onClick={() =>
                                    removeArrayItem("requestedSupplies", index)
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
                                    label="Requested Items"
                                    value={item.item}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "requestedSupplies",
                                            index,
                                            "item",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Item name"
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Quantity"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "requestedSupplies",
                                            index,
                                            "quantity",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Qty"
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Purpose"
                                    value={item.purpose}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "requestedSupplies",
                                            index,
                                            "purpose",
                                            e.target.value
                                        )
                                    }
                                    multiline
                                    maxRows={2}
                                    placeholder="Purpose for this item"
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                <FormControl fullWidth variant="standard">
                                    <InputLabel>Priority</InputLabel>
                                    <Select
                                        value={item.priority}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "requestedSupplies",
                                                index,
                                                "priority",
                                                e.target.value
                                            )
                                        }
                                        label="Priority"
                                    >
                                        <MenuItem value="low">Low</MenuItem>
                                        <MenuItem value="medium">
                                            Medium
                                        </MenuItem>
                                        <MenuItem value="high">High</MenuItem>
                                        <MenuItem value="urgent">
                                            Urgent
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid2>
                        </Grid2>

                        {index < data.length - 1 && <Divider sx={{ mb: 3 }} />}
                    </Box>
                ))}
            </CardContent>
        </Card>
    );
};

export default RequestedSuppliesSection;
