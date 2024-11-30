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

const BabyCare = ({ data, setData, setComplete }) => {
    const [position, setPosition] = useState("Baby Home Care Service");
    const [newborn, setNewborn] = useState(null);
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [startMonth, setStartMonth] = useState("");
    const [startYear, setStartYear] = useState("");
    const [endMonth, setEndMonth] = useState("");
    const [endYear, setEndYear] = useState("");

    // Helper function to calculate age description
    const calculateAgeDescription = () => {
        if (age > 12) {
            const yearsOld = Math.floor(age / 12); // Calculate full years
            const remainingMonths = age % 12; // Calculate remaining months
            return `${yearsOld} year${yearsOld > 1 ? "s" : ""} ${
                remainingMonths
                    ? `${remainingMonths} month${
                          remainingMonths > 1 ? "s" : ""
                      }`
                    : ""
            } old ${gender.toLowerCase()}`;
        }
        return `${age} month${age > 1 ? "s" : ""} old ${gender.toLowerCase()}`;
    };

    // Combine all fields into a string and set it in the parent `data.experience`
    useEffect(() => {
        if (
            position &&
            (newborn || age) &&
            gender &&
            startMonth &&
            startYear &&
            endMonth &&
            endYear
        ) {
            const ageDescription = newborn
                ? `newborn ${gender.toLowerCase()}`
                : calculateAgeDescription();

            const experienceString = `${position} / ${ageDescription} / ${startMonth} ${startYear} - ${endMonth} ${endYear}`;
            setData((prev) => ({ ...prev, experience: experienceString }));
            setComplete(true);
        }
    }, [
        position,
        newborn,
        age,
        gender,
        startMonth,
        startYear,
        endMonth,
        endYear,
    ]);

    return (
        <>
            <FormControl component="fieldset">
                <Subtitle>Gender</Subtitle>

                <RadioGroup
                    row
                    value={gender}
                    onChange={(e) => {
                        setGender(e.target.value);
                    }}
                >
                    <FormControlLabel
                        value="Baby boy"
                        control={<Radio size="small" />}
                        label={<BodyText>Baby boy</BodyText>}
                    />
                    <FormControlLabel
                        value="Baby girl"
                        control={<Radio size="small" />}
                        label={<BodyText>Baby girl</BodyText>}
                    />
                </RadioGroup>
            </FormControl>

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    columnGap: 3,
                    rowGap: 2,
                    mt: 2,
                }}
            >
                <Box sx={{ bgcolor: "grey.200", p: 2 }}>
                    <TinyText>
                        If you care for a baby older than 1 month, select Age
                        and fills age of the baby in months{" "}
                    </TinyText>

                    <RadioGroup
                        row
                        value={newborn}
                        onChange={(e) => {
                            setNewborn(JSON.parse(e.target.value));
                        }}
                    >
                        <FormControlLabel
                            value={true}
                            control={<Radio size="small" />}
                            label={<BodyText>Newborn</BodyText>}
                        />

                        <FormControlLabel
                            value={false}
                            control={<Radio size="small" />}
                            label={<BodyText>Age</BodyText>}
                        />
                        {newborn == false && (
                            <Box>
                                <TextField
                                    size="small"
                                    sx={{ width: 150 }}
                                    type="number"
                                    value={age}
                                    disabled={newborn}
                                    onChange={(e) => setAge(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <Typography fontSize={12}>
                                                months
                                            </Typography>
                                        ),
                                    }}
                                />
                            </Box>
                        )}
                    </RadioGroup>
                </Box>
                <Box
                    sx={{
                        border: "1px dashed",
                        p: 2,
                        borderColor: "primary.main",
                    }}
                >
                    <Subtitle>Duty Started date</Subtitle>
                    <Box sx={{ display: "flex", gap: 4, mt: 2 }}>
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
        </>
    );
};

export default BabyCare;
