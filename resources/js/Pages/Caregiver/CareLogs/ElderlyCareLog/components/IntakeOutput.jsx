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
} from "@mui/material";
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Remove as RemoveFoodIcon,
} from "@mui/icons-material";

const MEAL_TYPE_ORDER = [
    "breakfast",
    "mid_morning_snack",
    "lunch",
    "afternoon_snack",
    "dinner",
    "evening_snack",
];

const IntakeOutput = ({
    strings,
    formData,
    handleInputChange,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
    entryRefs,
}) => {
    const c = strings.common;
    const io = strings.intakeOutput;
    const opt = strings.options;

    const mealTypes = MEAL_TYPE_ORDER.map((value) => ({
        value,
        label: opt.mealType[value],
    }));

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

    const dehydrationSigns = Object.keys(opt.dehydration).map((value) => ({
        value,
        label: opt.dehydration[value],
    }));

    const bowelOptions = Object.keys(opt.bowelYesNo).map((value) => ({
        value,
        label: opt.bowelYesNo[value],
    }));

    const urineColors = Object.keys(opt.urineColor).map((value) => ({
        value,
        label: opt.urineColor[value],
    }));

    const bowelConsistencies = Object.keys(opt.bowelConsistency).map(
        (value) => ({
            value,
            label: opt.bowelConsistency[value],
        })
    );

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
                    {io.sectionTitle}
                </Typography>

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
                            {io.intakeEntries}
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
                            {c.addIntakeEntry}
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
                                    {c.intakeEntry(index + 1)}
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
                                        <InputLabel>
                                            {c.mealSnackType}
                                        </InputLabel>
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
                                        label={c.time}
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
                                        label={c.amount}
                                        type="number"
                                        value={item.amount}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "intake",
                                                index,
                                                "amount",
                                                e.target.value
                                            )
                                        }
                                        placeholder={io.intakeAmountPlaceholder}
                                    />
                                </Grid2>

                                <Grid2 size={{ xs: 6, sm: 3, md: 2 }}>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel>{c.unit}</InputLabel>
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
                                        label={c.assistanceNeeded}
                                        sx={{ mt: 2 }}
                                    />
                                </Grid2>

                                <Grid2 size={{ xs: 12 }}>
                                    <Box sx={{ mb: 2 }}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                gap: 3,
                                                mb: 2,
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                fontWeight="bold"
                                            >
                                                {c.foodDrinkItems}
                                            </Typography>
                                            <Button
                                                size="small"
                                                onClick={() =>
                                                    addFoodItem(index)
                                                }
                                                variant="contained"
                                            >
                                                {c.addFoodDrink}
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
                                                        label={c.foodItem(
                                                            foodIndex + 1
                                                        )}
                                                        value={foodItem}
                                                        onChange={(e) =>
                                                            handleFoodItemChange(
                                                                index,
                                                                foodIndex,
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder={
                                                            io.foodPlaceholder
                                                        }
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
                                        label={c.intakeNotes}
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
                                        placeholder={
                                            io.intakeNotesPlaceholder
                                        }
                                    />
                                </Grid2>
                            </Grid2>

                            {index < formData.intake.length - 1 && (
                                <Divider sx={{ mb: 3 }} />
                            )}
                        </Box>
                    ))}
                </Box>
                <Typography my={3} textAlign={"center"}>
                    * * * *
                </Typography>

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
                            {io.outputEntries}
                        </Typography>
                        <Button
                            startIcon={<AddIcon />}
                            onClick={() =>
                                addArrayItem("output", {
                                    output_time: "",
                                    urine_volume: "",
                                    urine_volume_unit: "l",
                                    urine_color: "",
                                    bowel_movement: "",
                                    bowel_consistency: "",
                                    output_notes: "",
                                })
                            }
                            variant="outlined"
                            size="small"
                        >
                            {c.addOutputEntry}
                        </Button>
                    </Box>

                    {formData.output.map((item, index) => (
                        <Box
                            key={index}
                            ref={(el) => {
                                if (entryRefs) {
                                    entryRefs.current[`output-${index}`] = el;
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
                                    {c.outputEntry(index + 1)}
                                </Typography>
                                <IconButton
                                    onClick={() =>
                                        removeArrayItem("output", index)
                                    }
                                    color="error"
                                    size="small"
                                    disabled={formData.output.length === 1}
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
                                        value={item.output_time}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "output",
                                                index,
                                                "output_time",
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
                                        label={c.urineVolume}
                                        type="number"
                                        value={item.urine_volume}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "output",
                                                index,
                                                "urine_volume",
                                                e.target.value
                                            )
                                        }
                                        placeholder="500"
                                    />
                                </Grid2>

                                <Grid2 size={{ xs: 6, sm: 3, md: 1 }}>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel>{c.unit}</InputLabel>
                                        <Select
                                            value={item.urine_volume_unit}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    "output",
                                                    index,
                                                    "urine_volume_unit",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {volumeUnits.map((unit) => (
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

                                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel>{c.urineColor}</InputLabel>
                                        <Select
                                            value={item.urine_color}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    "output",
                                                    index,
                                                    "urine_color",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {urineColors.map((color) => (
                                                <MenuItem
                                                    key={color.value}
                                                    value={color.value}
                                                >
                                                    {color.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid2>

                                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel>
                                            {c.bowelMovement}
                                        </InputLabel>
                                        <Select
                                            value={item.bowel_movement}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    "output",
                                                    index,
                                                    "bowel_movement",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {bowelOptions.map((option) => (
                                                <MenuItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid2>

                                {item.bowel_movement === "yes" && (
                                    <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                        <FormControl
                                            fullWidth
                                            variant="standard"
                                        >
                                            <InputLabel>
                                                {c.bowelConsistency}
                                            </InputLabel>
                                            <Select
                                                value={item.bowel_consistency}
                                                onChange={(e) =>
                                                    handleArrayChange(
                                                        "output",
                                                        index,
                                                        "bowel_consistency",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                {bowelConsistencies.map(
                                                    (consistency) => (
                                                        <MenuItem
                                                            key={
                                                                consistency.value
                                                            }
                                                            value={
                                                                consistency.value
                                                            }
                                                        >
                                                            {consistency.label}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Grid2>
                                )}

                                <Grid2 size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label={c.outputNotes}
                                        value={item.output_notes}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "output",
                                                index,
                                                "output_notes",
                                                e.target.value
                                            )
                                        }
                                        multiline
                                        maxRows={3}
                                        placeholder={
                                            io.outputNotesPlaceholder
                                        }
                                    />
                                </Grid2>
                            </Grid2>

                            {index < formData.output.length - 1 && (
                                <Divider sx={{ mb: 3 }} />
                            )}
                        </Box>
                    ))}
                </Box>

                <Typography my={3} textAlign={"center"}>
                    * * * *
                </Typography>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="subtitle1" fontWeight="bold" mb={3}>
                        {c.dailyHydrationSummary}
                    </Typography>

                    <Grid2 container spacing={3}>
                        <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
                            <TextField
                                fullWidth
                                variant="standard"
                                label={c.totalFluidConsumed}
                                type="number"
                                value={formData.hydration.fluid_intake}
                                onChange={(e) =>
                                    handleInputChange("hydration", {
                                        ...formData.hydration,
                                        fluid_intake: e.target.value,
                                    })
                                }
                                placeholder={io.fluidPlaceholder}
                            />
                        </Grid2>

                        <Grid2 size={{ xs: 6, sm: 4, md: 2 }}>
                            <FormControl fullWidth variant="standard">
                                <InputLabel>{c.unit}</InputLabel>
                                <Select
                                    value={formData.hydration.fluid_intake_unit}
                                    onChange={(e) =>
                                        handleInputChange("hydration", {
                                            ...formData.hydration,
                                            fluid_intake_unit: e.target.value,
                                        })
                                    }
                                >
                                    {fluidUnits.map((unit) => (
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

                        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                            <FormControl fullWidth variant="standard">
                                <InputLabel>{c.signsOfDehydration}</InputLabel>
                                <Select
                                    value={formData.hydration.dehydration_signs}
                                    onChange={(e) =>
                                        handleInputChange("hydration", {
                                            ...formData.hydration,
                                            dehydration_signs: e.target.value,
                                            other_dehydration_signs:
                                                e.target.value !== "other"
                                                    ? ""
                                                    : formData.hydration
                                                          .other_dehydration_signs,
                                        })
                                    }
                                >
                                    {dehydrationSigns.map((sign) => (
                                        <MenuItem
                                            key={sign.value}
                                            value={sign.value}
                                        >
                                            {sign.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid2>

                        {formData.hydration.dehydration_signs === "other" && (
                            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label={c.otherDehydrationSigns}
                                    value={
                                        formData.hydration
                                            .other_dehydration_signs
                                    }
                                    onChange={(e) =>
                                        handleInputChange("hydration", {
                                            ...formData.hydration,
                                            other_dehydration_signs:
                                                e.target.value,
                                        })
                                    }
                                    placeholder={
                                        io.otherDehydrationPlaceholder
                                    }
                                />
                            </Grid2>
                        )}
                    </Grid2>
                </Box>
            </CardContent>
        </Card>
    );
};

export default IntakeOutput;
