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

const PRIORITIES = ["low", "medium", "high", "urgent"];

const RequestedSuppliesSection = ({
    data,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
    entryRefs,
    strings,
}) => {
    const s = strings.supplies;
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
                        {s.sectionTitle}
                    </Typography>
                    <Button
                        startIcon={<AddIcon />}
                        onClick={() =>
                            addArrayItem("requestedSupplies", {
                                item: "",
                                quantity: "",
                                purpose: "",
                                priority: "medium",
                            })
                        }
                        variant="outlined"
                        size="small"
                    >
                        {c.addItem}
                    </Button>
                </Box>

                {data.map((item, index) => (
                    <Box
                        key={index}
                        ref={(el) => {
                            if (entryRefs) {
                                entryRefs.current[
                                    `requestedSupplies-${index}`
                                ] = el;
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
                                {c.itemN(index + 1)}
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
                                    label={s.requestedItems}
                                    value={item.item}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "requestedSupplies",
                                            index,
                                            "item",
                                            e.target.value
                                        )
                                    }
                                    placeholder={s.itemPlaceholder}
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label={s.quantity}
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "requestedSupplies",
                                            index,
                                            "quantity",
                                            e.target.value
                                        )
                                    }
                                    placeholder={s.qtyPlaceholder}
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label={s.purpose}
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
                                    placeholder={s.purposePlaceholder}
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                <FormControl fullWidth variant="standard">
                                    <InputLabel>{s.priority}</InputLabel>
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
                                        label={s.priority}
                                    >
                                        {PRIORITIES.map((key) => (
                                            <MenuItem key={key} value={key}>
                                                {o.priority[key]}
                                            </MenuItem>
                                        ))}
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
