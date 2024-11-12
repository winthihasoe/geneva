import DateFormatter from "@/Components/util/DateFormatter";
import { CarePlanContext } from "@/Context/CarePlanContext";
import {
    Box,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";

function InterviewForm({ data, setData, cv }) {
    const { carePlanData } = useContext(CarePlanContext);
    const [Mode, setMode] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "alt_time" || name == "time") {
            const selectedTime = new Date(`1970-01-01T${value}:00`);
            const minTime = new Date("1970-01-01T08:00:00");
            const maxTime = new Date("1970-01-01T17:00:00");

            if (selectedTime < minTime || selectedTime > maxTime) {
                alert("Please select a time between 8:00 AM and 5:00 PM.");
                return;
            }
        }
        setData({
            ...data,
            [name]: value,
        });
    };
    const handleModeChange = (e) => {
        setMode(e.target.value);
        setData({
            ...data,
            mode: e.target.value,
        });
    };

    return (
        <Box>
            <Typography
                fontSize={{ xs: 17, sm: 23, md: 30 }}
                fontFamily={"Kavoon"}
            >
                Interview Details
            </Typography>
            <Typography
                variant="h6"
                fontSize={{ xs: 15, sm: 17, md: 17 }}
                fontWeight={600}
                mb={1}
                mr={1}
                color="primary"
                fontFamily={"Karma"}
            >
                Preferred interview date & time
            </Typography>
            <Box sx={{ display: "flex", gap: 3, my: 1, alignItems: "center" }}>
                <Typography
                    sx={{
                        fontFamily: "Karma",
                        fontSize: { xs: 15, sm: 17, md: 22 },
                    }}
                >
                    Date
                </Typography>
                <TextField
                    type="date"
                    value={data.date}
                    onChange={handleChange}
                    name="date"
                />
            </Box>
            <Box sx={{ display: "flex", gap: 3, my: 2, alignItems: "center" }}>
                <Typography
                    sx={{
                        fontFamily: "Karma",
                        fontSize: { xs: 15, sm: 17, md: 22 },
                    }}
                >
                    Time
                </Typography>
                <TextField
                    type="time"
                    value={data.time}
                    onChange={handleChange}
                    name="time"
                    inputProps={{
                        min: "08:00",
                        max: "17:00",
                    }}
                />
            </Box>

            <Typography
                variant="h6"
                fontSize={{ xs: 15, sm: 17, md: 17 }}
                fontWeight={600}
                mb={1}
                mr={1}
                color="primary"
                fontFamily={"Karma"}
            >
                Alternate Date and Time{" "}
                <span style={{ color: "#aaa" }}>
                    (if preferred date is unavailable)
                </span>
            </Typography>
            <Box sx={{ display: "flex", gap: 3, my: 1, alignItems: "center" }}>
                <Typography
                    sx={{
                        fontFamily: "Karma",
                        fontSize: { xs: 15, sm: 17, md: 22 },
                    }}
                >
                    Date
                </Typography>
                <TextField
                    type="date"
                    value={data.alt_date}
                    onChange={handleChange}
                    name="alt_date"
                />
            </Box>
            <Box sx={{ display: "flex", gap: 3, my: 2, alignItems: "center" }}>
                <Typography
                    sx={{
                        fontFamily: "Karma",
                        fontSize: { xs: 15, sm: 17, md: 22 },
                    }}
                >
                    Time
                </Typography>
                <TextField
                    type="time"
                    value={data.alt_time}
                    onChange={handleChange}
                    name="alt_time"
                    inputProps={{
                        min: "08:00",
                        max: "17:00",
                    }}
                />
            </Box>

            <Typography
                variant="h6"
                fontSize={{ xs: 15, sm: 17, md: 17 }}
                fontWeight={600}
                mb={1}
                mr={1}
                color="primary"
                fontFamily={"Karma"}
            >
                Interview Mode
            </Typography>
            <RadioGroup row value={data.mode} onChange={handleModeChange}>
                <FormControlLabel
                    value="In Person"
                    control={<Radio size="small" />}
                    label={
                        <Typography
                            sx={{
                                fontFamily: "Karma",

                                fontSize: 13,
                            }}
                        >
                            In Person
                        </Typography>
                    }
                />
                <FormControlLabel
                    value="Virtual"
                    control={<Radio size="small" />}
                    label={
                        <Typography
                            sx={{
                                fontFamily: "Karma",

                                fontSize: 13,
                            }}
                        >
                            Virtual{" "}
                            <span style={{ color: "#aaa" }}>(online)</span>
                        </Typography>
                    }
                />
            </RadioGroup>
            {Mode == "In Person" && (
                <Box p={2}>
                    <Typography
                        sx={{
                            fontFamily: "Karma",
                            fontSize: { xs: 15, sm: 17, md: 22 },
                        }}
                    >
                        Location
                    </Typography>
                    <TextField
                        fullWidth
                        value={data.location || ""}
                        onChange={handleChange}
                        name="location"
                    />
                    <Typography
                        variant="h6"
                        fontSize={{ xs: 15, sm: 17, md: 17 }}
                        fontWeight={600}
                        my={1}
                        mr={1}
                        color="primary"
                        fontFamily={"Karma"}
                        textAlign={"center"}
                    >
                        "In-person interview fee: 500 THB."
                    </Typography>
                </Box>
            )}
            {Mode == "Virtual" && (
                <Box sx={{ p: 2 }}>
                    <RadioGroup
                        row
                        value={data.online}
                        onChange={handleChange}
                        name="online"
                    >
                        <FormControlLabel
                            value="Zoom"
                            control={<Radio size="small" />}
                            label={
                                <Typography
                                    sx={{
                                        fontFamily: "Karma",

                                        fontSize: 13,
                                    }}
                                >
                                    Zoom
                                </Typography>
                            }
                        />
                        <FormControlLabel
                            value="Google Meet"
                            control={<Radio size="small" />}
                            label={
                                <Typography
                                    sx={{
                                        fontFamily: "Karma",

                                        fontSize: 13,
                                    }}
                                >
                                    Google Meet
                                </Typography>
                            }
                        />
                        <FormControlLabel
                            value="Microsoft Teams"
                            control={<Radio size="small" />}
                            label={
                                <Typography
                                    sx={{
                                        fontFamily: "Karma",

                                        fontSize: 13,
                                    }}
                                >
                                    Microsoft Teams
                                </Typography>
                            }
                        />
                    </RadioGroup>
                    <Typography
                        variant="h6"
                        fontSize={{ xs: 15, sm: 17, md: 17 }}
                        fontWeight={600}
                        my={1}
                        color="primary"
                        fontFamily={"Karma"}
                        textAlign={"center"}
                    >
                        "Virtual interview fee: 200 THB."
                    </Typography>
                </Box>
            )}

            {/* Show Care Plan detail  */}
            <Box my={3}>
                <Typography
                    fontSize={{ xs: 17, sm: 23, md: 30 }}
                    fontFamily={"Kavoon"}
                >
                    Job Details
                </Typography>
                <Box width={"100%"} my={2} p={1}>
                    <Typography
                        sx={{
                            fontFamily: "Karma",
                            fontSize: { xs: 13, sm: 18, md: 22 },
                            fontWeight: 600,
                            mb: { xs: 1, sm: 2, md: 3 },
                        }}
                    >
                        Start Date : {carePlanData.start_date}
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Karma",
                            fontSize: { xs: 13, sm: 18, md: 22 },
                            fontWeight: 600,
                            mb: { xs: 1, sm: 2, md: 3 },
                        }}
                    >
                        Care Timing :{" "}
                        {carePlanData.schedule.package == "Live-in"
                            ? "24 hours (Live-in)"
                            : carePlanData.schedule.duty_time}
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Karma",
                            fontSize: { xs: 13, sm: 18, md: 22 },
                            fontWeight: 600,
                            mb: { xs: 1, sm: 2, md: 3 },
                        }}
                    >
                        Care Program Duration :{" "}
                        {carePlanData.duration == 1
                            ? "1 year"
                            : `${carePlanData.duration} months`}
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Karma",
                            fontSize: { xs: 13, sm: 18, md: 22 },
                            fontWeight: 600,
                            mb: { xs: 1, sm: 2, md: 3 },
                        }}
                    >
                        Caregiver level :{" "}
                        {carePlanData.service_type == "Newborn Care" &&
                            cv.newborn_care_level}
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Karma",
                            fontSize: { xs: 13, sm: 18, md: 22 },
                            fontWeight: 600,
                            mb: { xs: 1, sm: 2, md: 3 },
                        }}
                    >
                        Monthly Salary : 23000 THB (1 month advanced payment)
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Karma",
                            fontSize: { xs: 13, sm: 18, md: 22 },
                            fontWeight: 600,
                            mb: { xs: 1, sm: 2, md: 3 },
                        }}
                    >
                        Hearty Aid Service Fees : 10000 THB (One time payment)
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default InterviewForm;
