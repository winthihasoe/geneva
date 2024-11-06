import React, { useContext, useEffect, useState } from "react";
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

const NameAndDOBForm = () => {
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
            <Box
                sx={{
                    mb: 3,
                    gap: 2,
                }}
            >
                <Subtitle>Nickname to show in CV</Subtitle>
                <TextField
                    size="small"
                    value={data.nickname}
                    onChange={handleChange("nickname")}
                    sx={{ flexGrow: 1 }}
                    fullWidth
                />
            </Box>
            <Box sx={{ margin: "10px auto" }}>
                <Subtitle>Introduction about yourself to show in CV</Subtitle>
                <TextField
                    size="small"
                    placeholder="Hello, my name is ..."
                    multiline
                    value={data.introduction}
                    onChange={handleChange("introduction")}
                    fullWidth
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
