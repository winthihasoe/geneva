import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    TextField,
    Typography,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import CvContext from "@/Context/CvContext";

const years = Array.from(
    new Array(100),
    (val, index) => new Date().getFullYear() - index
);
const months = Array.from(new Array(12), (val, index) => index + 1);
const days = Array.from(new Array(31), (val, index) => index + 1);

const calculateAge = (year, month, day) => {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

const StepOne = () => {
    const { data, handleChange } = useContext(CvContext);
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedDay, setSelectedDay] = useState("");
    const [age, setAge] = useState("");

    // Set local state based on initial `data.date_of_birth`
    useEffect(() => {
        if (data.date_of_birth) {
            const [year, month, day] = data.date_of_birth.split("-");
            setSelectedYear(year);
            setSelectedMonth(parseInt(month, 10));
            setSelectedDay(parseInt(day, 10));
            setAge(calculateAge(year, parseInt(month, 10), parseInt(day, 10)));
        }
    }, [data.date_of_birth]);

    // Update `date_of_birth` in context only when all date fields are selected
    useEffect(() => {
        if (selectedYear && selectedMonth && selectedDay) {
            const dateOfBirth = `${selectedYear}-${String(
                selectedMonth
            ).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;
            // Avoid calling `handleChange` directly in render cycle
            setTimeout(
                () =>
                    handleChange("date_of_birth")({
                        target: { value: dateOfBirth },
                    }),
                0
            );
        }
    }, [selectedYear, selectedMonth, selectedDay]);

    // Handle individual date changes and calculate age
    const handleYearChange = (event) => {
        const year = event.target.value;
        setSelectedYear(year);
        if (year && selectedMonth && selectedDay) {
            setAge(calculateAge(year, selectedMonth, selectedDay));
        }
    };

    const handleMonthChange = (event) => {
        const month = event.target.value;
        setSelectedMonth(month);
        if (selectedYear && month && selectedDay) {
            setAge(calculateAge(selectedYear, month, selectedDay));
        }
    };

    const handleDayChange = (event) => {
        const day = event.target.value;
        setSelectedDay(day);
        if (selectedYear && selectedMonth && day) {
            setAge(calculateAge(selectedYear, selectedMonth, day));
        }
    };

    return (
        <Box sx={{ margin: "auto", maxWidth: 350 }}>
            <Box
                sx={{
                    mb: 3,
                }}
            >
                <Typography variant="subtitle1" fontWeight="bold">
                    Name in English
                </Typography>
                <TextField
                    size="small"
                    value={data.full_name}
                    onChange={handleChange("full_name")}
                    sx={{ flexGrow: 1 }}
                    fullWidth
                    placeholder="Enter caregiver's name"
                />
            </Box>
            <Box
                sx={{
                    mb: 3,
                    gap: 2,
                }}
            >
                <Typography variant="subtitle1" fontWeight="bold">
                    Nickname (English name) (optional)
                </Typography>
                <TextField
                    size="small"
                    value={data.nickname}
                    onChange={handleChange("nickname")}
                    sx={{ flexGrow: 1 }}
                    fullWidth
                />
            </Box>
            <FormControl
                component="fieldset"
                sx={{
                    mb: 3,
                }}
            >
                <Typography variant="subtitle1" fontWeight="bold">
                    Gender
                </Typography>

                <RadioGroup
                    row
                    value={data.gender}
                    onChange={handleChange("gender")}
                >
                    <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Male"
                    />
                    <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        label="Female"
                    />
                </RadioGroup>
            </FormControl>
            {/* <ProfileUploadForm /> */}

            <Typography variant="subtitle1" fontWeight="bold">
                Date of Birth
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    my: 2,
                }}
            >
                {/* Day input  */}
                <FormControl sx={{ minWidth: 100 }}>
                    <InputLabel>
                        <Typography fontSize={13}>Day</Typography>
                    </InputLabel>
                    <Select
                        value={selectedDay}
                        onChange={handleDayChange}
                        size="small"
                    >
                        {days.map((day) => (
                            <MenuItem key={day} value={day}>
                                {day}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/* Month input  */}
                <FormControl sx={{ minWidth: 100 }}>
                    <InputLabel>
                        <Typography fontSize={13}>Month</Typography>
                    </InputLabel>
                    <Select
                        value={selectedMonth}
                        onChange={handleMonthChange}
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
                    <InputLabel>
                        <Typography fontSize={13}>Year</Typography>
                    </InputLabel>
                    <Select
                        value={selectedYear}
                        onChange={handleYearChange}
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
            <Box textAlign={"center"}>
                <Typography variant="body2">
                    Age: {age || "auto calculated"}
                </Typography>
            </Box>
        </Box>
    );
};

export default StepOne;
