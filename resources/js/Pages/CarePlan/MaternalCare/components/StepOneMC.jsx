import { CarePlanContext } from "@/Context/CarePlanContext";
import {
    Box,
    Divider,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const years = Array.from(
    new Array(2),
    (val, index) => new Date().getFullYear() + index
);
const months = Array.from(new Array(12), (val, index) => index + 1);
const days = Array.from(new Array(31), (val, index) => index + 1);

// Custom styling for white checkboxes and radios
const whiteControlSx = {
    color: "white",
    "&.Mui-checked": {
        color: "white",
    },
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
};

function StepOneMC() {
    const { carePlanData, updateCarePlan, updateNestedField } =
        useContext(CarePlanContext);

    // Duration type state: "month" or "day"
    const [durationType, setDurationType] = useState(
        carePlanData.duration && carePlanData.duration % 30 === 0
            ? "month"
            : "day"
    );
    // For UI: months value
    const monthsValue = carePlanData.duration
        ? Math.round(carePlanData.duration / 30)
        : 1;
    // For UI: days value (min 7)
    const daysValue = durationType === "day" ? carePlanData.duration : 7;

    const handleDurationTypeChange = (e) => {
        const type = e.target.value;
        setDurationType(type);
        if (type === "month") {
            updateCarePlan("duration", 30); // default 1 month
        } else {
            updateCarePlan("duration", 7); // default 7 days
        }
    };

    const handleMonthChange = (e) => {
        const months = parseInt(e.target.value);
        updateCarePlan("duration", months * 30);
    };

    // Initialize date values from carePlanData or set defaults
    const startDate = carePlanData.start_date
        ? new Date(carePlanData.start_date)
        : new Date();
    const selectedDay = carePlanData.start_date ? startDate.getDate() : "";
    const selectedMonth = carePlanData.start_date
        ? startDate.getMonth() + 1
        : "";
    const selectedYear = carePlanData.start_date ? startDate.getFullYear() : "";

    // Handle date changes
    const handleDateChange = (type, value) => {
        const currentDate = carePlanData.start_date
            ? new Date(carePlanData.start_date)
            : new Date();

        if (type === "day") {
            currentDate.setDate(value);
        } else if (type === "month") {
            currentDate.setMonth(value - 1);
        } else if (type === "year") {
            currentDate.setFullYear(value);
        }

        updateCarePlan("start_date", currentDate.toISOString().split("T")[0]);
    };

    return (
        <Box>
            {/* Choose Service -> Service only or with maid service */}
            <FormControl
                component="fieldset"
                sx={{
                    mb: 3,
                    color: "white",
                }}
            >
                <Typography variant="h6" fontWeight="bold">
                    Choose either one *
                </Typography>

                <RadioGroup
                    row
                    value={carePlanData.service_type || ""}
                    onChange={(e) =>
                        updateCarePlan("service_type", e.target.value)
                    }
                >
                    <FormControlLabel
                        value="Maternal Care Service only"
                        control={<Radio sx={whiteControlSx} />}
                        label="Maternal Care Service only"
                    />
                    <FormControlLabel
                        value="Maternal Care Service + Maid Service"
                        control={<Radio sx={whiteControlSx} />}
                        label="Maternal Care Service + Maid Service"
                    />
                </RadioGroup>
            </FormControl>

            {/* Package  */}
            <FormControl
                component="fieldset"
                sx={{
                    mb: 3,
                    color: "white",
                }}
            >
                <Typography variant="h6" fontWeight="bold">
                    Choose one *
                </Typography>

                <RadioGroup
                    row
                    value={carePlanData.schedule?.package || ""}
                    onChange={(e) =>
                        updateNestedField("schedule", "package", e.target.value)
                    }
                >
                    <FormControlLabel
                        value="Live in (24-hour)"
                        control={<Radio sx={whiteControlSx} />}
                        label="Live in (24-hour)"
                    />
                    <FormControlLabel
                        value="Live out (10-hour service: Day or Night)"
                        control={<Radio sx={whiteControlSx} />}
                        label="Live out (10-hour service: Day or Night)"
                    />
                </RadioGroup>
                {/* Day/Night selection - Show only when Live out is selected */}
                {carePlanData.schedule?.package ===
                    "Live out (10-hour service: Day or Night)" && (
                    <FormControl
                        component="fieldset"
                        sx={{
                            color: "white",
                            mt: 1,
                        }}
                    >
                        <Typography variant="body1" fontWeight="bold">
                            Choose duty time
                        </Typography>

                        <RadioGroup
                            row
                            value={carePlanData.schedule?.duty || ""}
                            onChange={(e) =>
                                updateNestedField(
                                    "schedule",
                                    "duty",
                                    e.target.value
                                )
                            }
                        >
                            <FormControlLabel
                                value="Day"
                                control={<Radio sx={whiteControlSx} />}
                                label="Day Duty"
                            />
                            <FormControlLabel
                                value="Night"
                                control={<Radio sx={whiteControlSx} />}
                                label="Night Duty"
                            />
                        </RadioGroup>
                    </FormControl>
                )}

                <Typography fontSize={12} color="secondary" sx={{ mt: 1 }}>
                    For live-out services, clients are responsible for covering
                    transportation costs, which may vary based on distance.
                </Typography>
            </FormControl>

            <Box sx={{ mb: 4, color: "white" }}>
                <Typography variant="h6">Care starting Date: *</Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                        my: 1,
                    }}
                >
                    {/* Day input */}
                    <FormControl sx={{ minWidth: 100 }}>
                        <InputLabel sx={{ color: "white" }}>
                            <Typography fontSize={13}>Day</Typography>
                        </InputLabel>
                        <Select
                            value={selectedDay}
                            onChange={(e) =>
                                handleDateChange("day", e.target.value)
                            }
                            size="small"
                        >
                            {days.map((day) => (
                                <MenuItem key={day} value={day}>
                                    {day}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Month input */}
                    <FormControl sx={{ minWidth: 100 }}>
                        <InputLabel sx={{ color: "white" }}>
                            <Typography fontSize={13}>Month</Typography>
                        </InputLabel>
                        <Select
                            value={selectedMonth}
                            onChange={(e) =>
                                handleDateChange("month", e.target.value)
                            }
                            size="small"
                        >
                            {months.map((month) => (
                                <MenuItem key={month} value={month}>
                                    {month}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Year input */}
                    <FormControl sx={{ minWidth: 100 }}>
                        <InputLabel sx={{ color: "white" }}>
                            <Typography fontSize={13}>Year</Typography>
                        </InputLabel>
                        <Select
                            value={selectedYear}
                            onChange={(e) =>
                                handleDateChange("year", e.target.value)
                            }
                            size="small"
                        >
                            {years.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>
            {/* Duration */}
            <FormControl component="fieldset" sx={{ mb: 3, color: "white" }}>
                <Typography variant="h6" fontWeight="bold">
                    Care Duration *
                </Typography>
                <RadioGroup
                    row
                    value={durationType}
                    onChange={handleDurationTypeChange}
                >
                    <FormControlLabel
                        value="month"
                        control={<Radio sx={whiteControlSx} />}
                        label="By Month"
                    />
                    <FormControlLabel
                        value="day"
                        control={<Radio sx={whiteControlSx} />}
                        label="By Day"
                    />
                </RadioGroup>

                {durationType === "month" && (
                    <Box sx={{ mt: 2 }}>
                        <FormControl sx={{ minWidth: 200 }}>
                            <Typography sx={{ color: "white" }}>
                                Select Duration
                            </Typography>
                            <Select
                                value={monthsValue}
                                onChange={handleMonthChange}
                                size="small"
                                sx={{
                                    color: "white",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "white",
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline":
                                        {
                                            borderColor: "white",
                                        },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                        {
                                            borderColor: "white",
                                        },
                                }}
                            >
                                <MenuItem value={1}>1 month</MenuItem>
                                <MenuItem value={2}>2 months</MenuItem>
                                <MenuItem value={3}>3 months</MenuItem>
                                <MenuItem value={4}>4 months</MenuItem>
                                <MenuItem value={5}>5 months</MenuItem>
                                <MenuItem value={6}>6 months</MenuItem>
                                <MenuItem value={7}>7 months</MenuItem>
                                <MenuItem value={8}>8 months</MenuItem>
                                <MenuItem value={9}>9 months</MenuItem>
                                <MenuItem value={10}>10 months</MenuItem>
                                <MenuItem value={11}>11 months</MenuItem>
                                <MenuItem value={12}>
                                    12 months (1 year)
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                )}

                {durationType === "day" && (
                    <Box sx={{ mt: 2 }}>
                        <Typography
                            variant="body2"
                            color="white"
                            fontWeight="bold"
                        >
                            Minimum 7 days & maximum 29 days
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 3,
                                mt: 2,
                                p: 1,
                                border: "1px solid #aaa",
                            }}
                        >
                            <IconButton
                                onClick={() => {
                                    if (daysValue > 7) {
                                        updateCarePlan(
                                            "duration",
                                            daysValue - 1
                                        );
                                    }
                                }}
                                disabled={daysValue <= 7}
                                sx={{
                                    bgcolor: "gray.100",
                                    mr: 3,
                                }}
                            >
                                <RemoveIcon />
                            </IconButton>
                            <Typography
                                variant="h6"
                                color="white"
                                fontWeight="bold"
                            >
                                {daysValue}
                            </Typography>
                            <IconButton
                                onClick={() => {
                                    if (daysValue < 29) {
                                        updateCarePlan(
                                            "duration",
                                            daysValue + 1
                                        );
                                    }
                                }}
                                disabled={daysValue >= 29}
                                sx={{
                                    bgcolor: "gray.100",
                                    ml: 3,
                                }}
                            >
                                <AddIcon />
                            </IconButton>
                        </Box>
                    </Box>
                )}
            </FormControl>
        </Box>
    );
}

export default StepOneMC;
