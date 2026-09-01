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
import {
    handleNonNegativeNumberChange,
    nonNegativeNumberFieldProps,
} from "@/utils/nonNegativeNumberField";

const FEEDING_TYPES = ["Breastmilk", "Formula", "Juice", "Water"];
const MEAL_TIMES = [
    "Breakfast",
    "Morning Snack",
    "Lunch",
    "Afternoon Snack",
    "Dinner",
];
const TEXTURES = [
    "Puree",
    "Mashed",
    "Soft Chunks",
    "Finger Food",
    "Regular",
];

const FeedingSection = ({
    data,
    foodOfferedData,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
    entryRefs,
    strings,
}) => {
    const f = strings.feeding;
    const c = strings.common;
    const o = strings.options;

    return (
        <>
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
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="primary"
                        >
                            {f.sectionTitle}
                        </Typography>
                        <Button
                            startIcon={<AddIcon />}
                            onClick={() =>
                                addArrayItem("feeding", {
                                    time: "",
                                    type: "",
                                    amount: "",
                                    amount_unit: "oz",
                                    notes: "",
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
                                    entryRefs.current[`feeding-${index}`] = el;
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
                                        removeArrayItem("feeding", index)
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
                                        label={c.time}
                                        type="time"
                                        value={item.time}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "feeding",
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
                                        <InputLabel>{c.type}</InputLabel>
                                        <Select
                                            value={item.type}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    "feeding",
                                                    index,
                                                    "type",
                                                    e.target.value
                                                )
                                            }
                                            label={c.type}
                                        >
                                            {FEEDING_TYPES.map((key) => (
                                                <MenuItem key={key} value={key}>
                                                    {o.feedingType[key]}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid2>

                                <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label={c.amount}
                                        {...nonNegativeNumberFieldProps({
                                            step: "1",
                                        })}
                                        value={item.amount}
                                        onChange={handleNonNegativeNumberChange(
                                            (value) =>
                                                handleArrayChange(
                                                    "feeding",
                                                    index,
                                                    "amount",
                                                    value
                                                )
                                        )}
                                        placeholder="120"
                                    />
                                </Grid2>

                                <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel>{c.unit}</InputLabel>
                                        <Select
                                            value={item.amount_unit || "ml"}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    "feeding",
                                                    index,
                                                    "amount_unit",
                                                    e.target.value
                                                )
                                            }
                                            label={c.unit}
                                        >
                                            <MenuItem value="ml">
                                                {o.amountUnit.ml}
                                            </MenuItem>
                                            <MenuItem value="oz">
                                                {o.amountUnit.oz}
                                            </MenuItem>
                                            <MenuItem value="l">
                                                {o.amountUnit.l}
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid2>

                                <Grid2 size={{ xs: 12, md: 3 }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label={c.notes}
                                        value={item.notes}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "feeding",
                                                index,
                                                "notes",
                                                e.target.value
                                            )
                                        }
                                        multiline
                                        maxRows={3}
                                        placeholder={f.notesPlaceholder}
                                    />
                                </Grid2>
                            </Grid2>

                            {index < data.length - 1 && (
                                <Divider sx={{ mb: 3 }} />
                            )}
                        </Box>
                    ))}

                    <Divider sx={{ mb: 3 }} />

                    <Box sx={{ mt: 4 }}>
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
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                color="primary"
                            >
                                {f.foodOfferedTitle}
                            </Typography>
                            <Button
                                startIcon={<AddIcon />}
                                onClick={() =>
                                    addArrayItem("foodOffered", {
                                        mealTime: "",
                                        foodOffer: "",
                                        quantity: "",
                                        texture: "",
                                        reaction: "",
                                    })
                                }
                                variant="outlined"
                                size="small"
                            >
                                {c.addEntry}
                            </Button>
                        </Box>

                        {foodOfferedData.map((item, index) => (
                            <Box
                                key={index}
                                ref={(el) => {
                                    if (entryRefs) {
                                        entryRefs.current[
                                            `foodOffered-${index}`
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
                                        {c.entry(index + 1)}
                                    </Typography>
                                    <IconButton
                                        onClick={() =>
                                            removeArrayItem(
                                                "foodOffered",
                                                index
                                            )
                                        }
                                        color="error"
                                        size="small"
                                        disabled={foodOfferedData.length === 1}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>

                                <Grid2 container spacing={2} sx={{ mb: 3 }}>
                                    <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                        <FormControl
                                            fullWidth
                                            variant="standard"
                                        >
                                            <InputLabel>{f.mealTime}</InputLabel>
                                            <Select
                                                value={item.mealTime}
                                                onChange={(e) =>
                                                    handleArrayChange(
                                                        "foodOffered",
                                                        index,
                                                        "mealTime",
                                                        e.target.value
                                                    )
                                                }
                                                label={f.mealTime}
                                            >
                                                {MEAL_TIMES.map((key) => (
                                                    <MenuItem
                                                        key={key}
                                                        value={key}
                                                    >
                                                        {o.mealTime[key]}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid2>

                                    <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            label={f.foodOfferedLabel}
                                            value={item.foodOffer}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    "foodOffered",
                                                    index,
                                                    "foodOffer",
                                                    e.target.value
                                                )
                                            }
                                            placeholder={f.foodOfferPlaceholder}
                                        />
                                    </Grid2>

                                    <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            label={f.quantity}
                                            value={item.quantity}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    "foodOffered",
                                                    index,
                                                    "quantity",
                                                    e.target.value
                                                )
                                            }
                                            placeholder={f.quantityPlaceholder}
                                        />
                                    </Grid2>

                                    <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
                                        <FormControl
                                            fullWidth
                                            variant="standard"
                                        >
                                            <InputLabel>{f.texture}</InputLabel>
                                            <Select
                                                value={item.texture}
                                                onChange={(e) =>
                                                    handleArrayChange(
                                                        "foodOffered",
                                                        index,
                                                        "texture",
                                                        e.target.value
                                                    )
                                                }
                                                label={f.texture}
                                            >
                                                {TEXTURES.map((key) => (
                                                    <MenuItem
                                                        key={key}
                                                        value={key}
                                                    >
                                                        {o.texture[key]}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid2>

                                    <Grid2 size={{ xs: 12, md: 2 }}>
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            label={f.reactionNotes}
                                            value={item.reaction}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    "foodOffered",
                                                    index,
                                                    "reaction",
                                                    e.target.value
                                                )
                                            }
                                            multiline
                                            maxRows={3}
                                            placeholder={f.foodNotesPlaceholder}
                                        />
                                    </Grid2>
                                </Grid2>

                                {index < foodOfferedData.length - 1 && (
                                    <Divider sx={{ mb: 3 }} />
                                )}
                            </Box>
                        ))}
                    </Box>
                </CardContent>
            </Card>
        </>
    );
};

export default FeedingSection;
