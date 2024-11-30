import BodyText from "@/Components/Typo/BodyText";
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
    RadioGroup,
    FormControlLabel,
    Radio,
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

const ElderCare = ({ data, setData, setComplete }) => {
    const [position, setPosition] = useState("Elder Home Care Service");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [startMonth, setStartMonth] = useState("");
    const [startYear, setStartYear] = useState("");
    const [endMonth, setEndMonth] = useState("");
    const [endYear, setEndYear] = useState("");

    // Combine all fields into a string and set it in the parent `data.experience`
    useEffect(() => {
        if (
            age &&
            gender &&
            diagnosis &&
            startMonth &&
            startYear &&
            endMonth &&
            endYear
        ) {
            const experienceString = `${position} / ${age} years old ${gender} patient with ${diagnosis} / ${startMonth} ${startYear} - ${endMonth} ${endYear}`;
            setData((prev) => ({ ...prev, experience: experienceString }));
            setComplete(true);
        }
    }, [age, gender, diagnosis, startMonth, startYear, endMonth, endYear]);

    return (
        <Box
            sx={{
                mt: 2,
                display: "flex",
                flexWrap: "wrap",
                columnGap: 5,
            }}
        >
            <Box>
                <Subtitle>Patient Age</Subtitle>

                <Box sx={{ mb: 2 }}>
                    <TextField
                        size="small"
                        sx={{ width: 200 }}
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        InputProps={{
                            endAdornment: <Typography>years</Typography>,
                        }}
                    />
                    <TinyText>Only number</TinyText>
                </Box>
            </Box>

            <Box>
                <Subtitle>Gender</Subtitle>

                <RadioGroup
                    row
                    value={gender}
                    onChange={(e) => {
                        setGender(e.target.value);
                    }}
                >
                    <FormControlLabel
                        value="male"
                        control={<Radio size="small" />}
                        label={<BodyText>Male</BodyText>}
                    />
                    <FormControlLabel
                        value="female"
                        control={<Radio size="small" />}
                        label={<BodyText>Female</BodyText>}
                    />
                </RadioGroup>
            </Box>

            <Box mb={3}>
                <Subtitle>Diagnosis</Subtitle>

                <TextField
                    size="small"
                    fullWidth
                    multiline
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    inputProps={{ maxLength: 60 }}
                />
                <TinyText> "Only 60 characters"</TinyText>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    columnGap: 2,
                    rowGap: 2,
                }}
            >
                <Box
                    sx={{
                        border: "1px dashed",
                        p: 2,
                        borderColor: "primary.main",
                    }}
                >
                    <Subtitle>Duty Started date</Subtitle>
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
                    <Subtitle>Duty Ended date</Subtitle>
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

export default ElderCare;
