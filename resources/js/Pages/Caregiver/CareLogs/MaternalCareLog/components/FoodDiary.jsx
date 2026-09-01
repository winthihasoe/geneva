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
    FormControlLabel,
    Switch,
    Chip,
} from "@mui/material";
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Add as AddFoodIcon,
    Remove as RemoveFoodIcon,
} from "@mui/icons-material";
import {
    handleNonNegativeNumberChange,
    nonNegativeNumberFieldProps,
} from "@/utils/nonNegativeNumberField";

const FoodDiary = ({
    strings,
    formData,
    handleInputChange,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
    entryRefs,
}) => {
    const mealTypes = [
        { value: "breakfast", label: "Breakfast" },
        { value: "mid_morning_snack", label: "Mid-morning Snack" },
        { value: "lunch", label: "Lunch" },
        { value: "afternoon_snack", label: "Afternoon Snack" },
        { value: "dinner", label: "Dinner" },
        { value: "evening_snack", label: "Evening Snack" },
    ];

    const amountUnits = [
        { value: "ml", label: "ml" },
        { value: "oz", label: "oz" },
        { value: "l", label: "l" },
    ];

    const volumeUnits = [
        { value: "ml", label: "ml" },
        { value: "l", label: "l" },
    ];

    const fluidUnits = [
        { value: "l", label: "l" },
        { value: "ml", label: "ml" },
        { value: "cup", label: "cup" },
    ];

    const dehydrationSigns = [
        { value: "none", label: "None" },
        { value: "dry_mouth", label: "Dry Mouth" },
        { value: "dizziness", label: "Dizziness" },
        { value: "other", label: "Other" },
    ];

    const bowelOptions = [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
    ];

    const urineCopylors = [
        { value: "pale_yellow", label: "Pale Yellow" },
        { value: "yellow", label: "Yellow" },
        { value: "dark_yellow", label: "Dark Yellow" },
        { value: "amber", label: "Amber" },
        { value: "brown", label: "Brown" },
        { value: "red", label: "Red" },
        { value: "other", label: "Other" },
    ];

    const bowelConsistencies = [
        { value: "normal", label: "Normal" },
        { value: "soft", label: "Soft" },
        { value: "hard", label: "Hard" },
        { value: "loose", label: "Loose" },
        { value: "watery", label: "Watery" },
        { value: "constipated", label: "Constipated" },
    ];

    // Handle food items for intake entries
    const addFoodItem = (intakeIndex) => {
        const updatedIntake = [...formData.intake];
        if (!updatedIntake[intakeIndex].food_items) {
            updatedIntake[intakeIndex].food_items = [];
        }
        updatedIntake[intakeIndex].food_items.push("");
        handleInputChange("intake", updatedIntake);
    };

    const removeFoodItem = (intakeIndex, foodIndex) => {
        const updatedIntake = [...formData.intake];
        if (
            updatedIntake[intakeIndex].food_items &&
            updatedIntake[intakeIndex].food_items.length > 1
        ) {
            updatedIntake[intakeIndex].food_items.splice(foodIndex, 1);
            handleInputChange("intake", updatedIntake);
        }
    };

    const handleFoodItemChange = (intakeIndex, foodIndex, value) => {
        const updatedIntake = [...formData.intake];
        if (!updatedIntake[intakeIndex].food_items) {
            updatedIntake[intakeIndex].food_items = [];
        }
        updatedIntake[intakeIndex].food_items[foodIndex] = value;
        handleInputChange("intake", updatedIntake);
    };

    return (
        <Card sx={{ borderRadius: 2, bgcolor: "transparent" }}>
            <CardContent>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={3}
                    color="primary"
                >
                    {strings.foodDiary.sectionTitle}
                </Typography>

                {/* Intake Section */}
                <Box sx={{ mb: 4 }}>
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
                        <Typography variant="subtitle1" fontWeight="bold">
                            Intake Entries
                        </Typography>
                        <Button
                            startIcon={<AddIcon />}
                            onClick={() =>
                                addArrayItem("intake", {
                                    meal_type: "",
                                    meal_time: "",
                                    food_items: [""],
                                    amount: "",
                                    amount_unit: "oz",
                                    assistance_needed: false,
                                    intake_notes: "",
                                })
                            }
                            variant="outlined"
                            size="small"
                        >
                            Add Intake Entry
                        </Button>
                    </Box>

                    {formData.intake.map((item, index) => (
                        <Box
                            key={index}
                            ref={(el) => {
                                if (entryRefs) {
                                    entryRefs.current[`intake-${index}`] = el;
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
                                    Intake Entry {index + 1}
                                </Typography>
                                <IconButton
                                    onClick={() =>
                                        removeArrayItem("intake", index)
                                    }
                                    color="error"
                                    size="small"
                                    disabled={formData.intake.length === 1}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>

                            <Grid2 container spacing={2} sx={{ mb: 3 }}>
                                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel>Meal/Snack Type</InputLabel>
                                        <Select
                                            value={item.meal_type}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    "intake",
                                                    index,
                                                    "meal_type",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {mealTypes.map((type) => (
                                                <MenuItem
                                                    key={type.value}
                                                    value={type.value}
                                                >
                                                    {type.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid2>

                                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label="Time"
                                        type="time"
                                        value={item.meal_time}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "intake",
                                                index,
                                                "meal_time",
                                                e.target.value
                                            )
                                        }
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid2>

                                <Grid2 size={{ xs: 6, sm: 3, md: 2 }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label="Amount"
                                        {...nonNegativeNumberFieldProps()}
                                        value={item.amount}
                                        onChange={handleNonNegativeNumberChange(
                                            (value) =>
                                                handleArrayChange(
                                                    "intake",
                                                    index,
                                                    "amount",
                                                    value
                                                )
                                        )}
                                        placeholder="250"
                                    />
                                </Grid2>

                                <Grid2 size={{ xs: 6, sm: 3, md: 2 }}>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel>Unit</InputLabel>
                                        <Select
                                            value={item.amount_unit}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    "intake",
                                                    index,
                                                    "amount_unit",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {amountUnits.map((unit) => (
                                                <MenuItem
                                                    key={unit.value}
                                                    value={unit.value}
                                                >
                                                    {unit.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid2>

                                <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={item.assistance_needed}
                                                onChange={(e) =>
                                                    handleArrayChange(
                                                        "intake",
                                                        index,
                                                        "assistance_needed",
                                                        e.target.checked
                                                    )
                                                }
                                                size="small"
                                            />
                                        }
                                        label="Assistance Needed"
                                        sx={{ mt: 2 }}
                                    />
                                </Grid2>

                                {/* Food Items List */}
                                <Grid2 size={{ xs: 12 }}>
                                    <Box sx={{ mb: 2 }}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                mb: 2,
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                fontWeight="bold"
                                            >
                                                Food/Drink Items
                                            </Typography>
                                            <Button
                                                size="small"
                                                startIcon={<AddFoodIcon />}
                                                onClick={() =>
                                                    addFoodItem(index)
                                                }
                                                variant="contained"
                                            >
                                                Add Food/Drink
                                            </Button>
                                        </Box>

                                        {(item.food_items || [""]).map(
                                            (foodItem, foodIndex) => (
                                                <Box
                                                    key={foodIndex}
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mb: 1,
                                                    }}
                                                >
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        variant="standard"
                                                        label={`Item ${
                                                            foodIndex + 1
                                                        }`}
                                                        value={foodItem}
                                                        onChange={(e) =>
                                                            handleFoodItemChange(
                                                                index,
                                                                foodIndex,
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="e.g., Rice, Chicken soup, Water"
                                                    />
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={() =>
                                                            removeFoodItem(
                                                                index,
                                                                foodIndex
                                                            )
                                                        }
                                                        disabled={
                                                            (
                                                                item.food_items ||
                                                                []
                                                            ).length === 1
                                                        }
                                                    >
                                                        <RemoveFoodIcon />
                                                    </IconButton>
                                                </Box>
                                            )
                                        )}
                                    </Box>
                                </Grid2>

                                <Grid2 size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label="Intake Notes"
                                        value={item.intake_notes}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "intake",
                                                index,
                                                "intake_notes",
                                                e.target.value
                                            )
                                        }
                                        multiline
                                        maxRows={3}
                                        placeholder="Preferences, issues, appetite, cooperation..."
                                    />
                                </Grid2>
                            </Grid2>

                            {index < formData.intake.length - 1 && (
                                <Divider sx={{ mb: 3 }} />
                            )}
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default FoodDiary;
