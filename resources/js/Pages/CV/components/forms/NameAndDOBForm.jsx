import React, { useEffect, useState } from "react";
import {
    Box,
    TextField,
    Typography,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle";

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

const NameAndDOBForm = ({ data, handleChange }) => {
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedDay, setSelectedDay] = useState("");
    const [age, setAge] = useState("");

    useEffect(() => {
        if (data.date_of_birth) {
            const [year, month, day] = data.date_of_birth.split("-");
            setSelectedYear(year);
            setSelectedMonth(parseInt(month, 10));
            setSelectedDay(parseInt(day, 10));
            setAge(calculateAge(year, parseInt(month, 10), parseInt(day, 10)));
        }
    }, [data.date_of_birth]);

    useEffect(() => {
        if (selectedYear && selectedMonth && selectedDay) {
            const dateOfBirth = `${selectedYear}-${String(
                selectedMonth
            ).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;
            handleChange("date_of_birth")({ target: { value: dateOfBirth } });
        }
    }, [selectedYear, selectedMonth, selectedDay]);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
        if (selectedMonth && selectedDay) {
            setAge(
                calculateAge(event.target.value, selectedMonth, selectedDay)
            );
        }
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
        if (selectedYear && selectedDay) {
            setAge(calculateAge(selectedYear, event.target.value, selectedDay));
        }
    };

    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
        if (selectedYear && selectedMonth) {
            setAge(
                calculateAge(selectedYear, selectedMonth, event.target.value)
            );
        }
    };

    return (
        <Box sx={{ margin: "auto" }}>
            <Box
                sx={{
                    mb: 3,
                    gap: 2,
                }}
            >
                <Subtitle>Name as per Passport</Subtitle>
                <TextField
                    size="small"
                    value={data.full_name}
                    onChange={handleChange("full_name")}
                    sx={{ flexGrow: 1 }}
                    fullWidth
                    placeholder="Enter your name"
                />
            </Box>
            <Subtitle>Date of Birth</Subtitle>
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
                <Subtitle>Age: {age || "auto calculated"}</Subtitle>
            </Box>
        </Box>
    );
};

export default NameAndDOBForm;
