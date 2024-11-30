import Subtitle from "@/Components/Typo/Subtitle";
import TinyText from "@/Components/Typo/TinyText";
import {
    Box,
    TextField,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import React, { useState, useEffect } from "react";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const years = Array.from(
    { length: 30 },
    (_, i) => new Date().getFullYear() - i
);

const HospitalCare = ({ data, setData, setComplete }) => {
    const [position, setPosition] = useState("");
    const [workplace, setWorkplace] = useState("");
    const [startMonth, setStartMonth] = useState("");
    const [startYear, setStartYear] = useState("");
    const [endMonth, setEndMonth] = useState("");
    const [endYear, setEndYear] = useState("");

    // Combine all fields into a string and set it in the parent `data.experience`
    useEffect(() => {
        if (
            position &&
            workplace &&
            startMonth &&
            startYear &&
            endMonth &&
            endYear
        ) {
            const experienceString = `${position} / ${workplace} / ${startMonth} ${startYear} - ${endMonth} ${endYear}`;
            setData((prev) => ({ ...prev, experience: experienceString }));
            setComplete(true);
        }
    }, [position, workplace, startMonth, startYear, endMonth, endYear]);

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                columnGap: 3,
                rowGap: 2,
            }}
        >
            <Box
                sx={{
                    bgcolor: "grey.200",
                    display: "flex",
                    flexWrap: "wrap",
                    columnGap: 3,
                    rowGap: 2,
                    px: { xs: 1, sm: 2 },
                    pb: 1,
                }}
            >
                <Box>
                    <TextField
                        value={position}
                        onChange={(e) => {
                            setPosition(e.target.value);
                        }}
                        required
                        multiline
                    />
                    <Subtitle>Position</Subtitle>
                    <TinyText>(HCA / Caregiver / Nurse Aid etc.)</TinyText>
                </Box>{" "}
                <Box>
                    <TextField
                        value={workplace}
                        onChange={(e) => setWorkplace(e.target.value)}
                        required
                        multiline
                    />
                    <Subtitle>Work place name</Subtitle>
                </Box>{" "}
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Box
                    sx={{
                        border: "1px dashed",
                        p: 2,
                        borderColor: "primary.main",
                    }}
                >
                    <Subtitle>Duty started date</Subtitle>
                    <Box sx={{ display: "flex", gap: 4 }}>
                        <FormControl fullWidth>
                            <InputLabel>Month</InputLabel>
                            <Select
                                variant="standard"
                                sx={{ width: 100 }}
                                value={startMonth}
                                onChange={(e) => setStartMonth(e.target.value)}
                            >
                                {months.map((month) => (
                                    <MenuItem key={month} value={month}>
                                        {month}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Year</InputLabel>
                            <Select
                                variant="standard"
                                sx={{ width: 100 }}
                                value={startYear}
                                onChange={(e) => setStartYear(e.target.value)}
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

                <Box
                    sx={{
                        border: "1px dashed",
                        p: 2,
                        borderColor: "primary.main",
                    }}
                >
                    <Subtitle>End date</Subtitle>
                    <Box sx={{ display: "flex", gap: 4 }}>
                        <FormControl fullWidth>
                            <InputLabel>Month</InputLabel>
                            <Select
                                variant="standard"
                                value={endMonth}
                                sx={{ width: 100 }}
                                onChange={(e) => setEndMonth(e.target.value)}
                            >
                                {months.map((month) => (
                                    <MenuItem key={month} value={month}>
                                        {month}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Year</InputLabel>
                            <Select
                                variant="standard"
                                value={endYear}
                                sx={{ width: 100 }}
                                onChange={(e) => setEndYear(e.target.value)}
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
            </Box>
        </Box>
    );
};

export default HospitalCare;
