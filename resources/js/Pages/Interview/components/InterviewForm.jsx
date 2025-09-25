import DateFormatter from "@/Components/util/DateFormatter";
import { CarePlanContext } from "@/Context/CarePlanContext";
import {
    Box,
    Button,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

function InterviewForm({
    data,
    setData,
    cv,
    processing,
    handleSubmit,
    // selectedSalary,
    // serviceFees,
    carePlan,
}) {
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
            <Typography variant="h3" mb={2}>
                Interview Details
            </Typography>
            <Typography
                variant="h5"
                fontWeight={600}
                mb={1}
                mr={1}
                color="primary"
            >
                Preferred interview date & time
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 3,
                    my: 1,
                    alignItems: "center",
                }}
            >
                <Typography variant="h6">Date</Typography>
                <TextField
                    type="date"
                    value={data.date}
                    onChange={handleChange}
                    name="date"
                    sx={{
                        bgcolor: "#f5f5f5",
                        borderRadius: 20,
                        px: 1,
                        width: 200,
                    }}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 3,
                    my: 1,
                    alignItems: "center",
                }}
            >
                <Typography variant="h6">Time</Typography>
                <TextField
                    type="time"
                    value={data.time}
                    onChange={handleChange}
                    name="time"
                    inputProps={{
                        min: "08:00",
                        max: "17:00",
                    }}
                    sx={{
                        bgcolor: "#f5f5f5",
                        borderRadius: 20,
                        px: 1,
                        width: 200,
                    }}
                />
            </Box>

            <Typography variant="h5" fontWeight={600} mt={4} color="primary">
                Alternate Date and Time
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
                (if preferred date is unavailable)
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 3,
                    my: 1,
                }}
            >
                <Typography variant="h6" color="text.secondary">
                    Date
                </Typography>
                <TextField
                    sx={{
                        bgcolor: "#f5f5f5",
                        borderRadius: 20,
                        px: 1,
                        width: 200,
                    }}
                    type="date"
                    value={data.alt_date}
                    onChange={handleChange}
                    name="alt_date"
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 3,
                    my: 1,
                    alignItems: "center",
                }}
            >
                <Typography variant="h6" color="text.secondary">
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
                    sx={{
                        bgcolor: "#f5f5f5",
                        borderRadius: 20,
                        px: 1,
                        width: 200,
                    }}
                />
            </Box>

            <Typography
                variant="h5"
                fontWeight={600}
                mb={1}
                mt={4}
                color="primary"
            >
                Interview Mode
            </Typography>
            <RadioGroup row value={data.mode} onChange={handleModeChange}>
                <FormControlLabel
                    value="In Person"
                    control={<Radio size="small" />}
                    label={<Typography variant="body2">In Person</Typography>}
                />
                <FormControlLabel
                    value="Virtual"
                    control={<Radio size="small" />}
                    label={
                        <Typography variant="body2">
                            Virtual{" "}
                            <span style={{ color: "#aaa" }}>(online)</span>
                        </Typography>
                    }
                />
            </RadioGroup>
            {Mode == "In Person" && (
                <Box p={2}>
                    <Typography variant="body2">Location</Typography>
                    <TextField
                        fullWidth
                        value={data.location || ""}
                        onChange={handleChange}
                        name="location"
                        multiline
                        variant="filled"
                    />
                    <Typography
                        variant="h6"
                        fontSize={{ xs: 15, sm: 17, md: 17 }}
                        fontWeight={600}
                        my={1}
                        mr={1}
                        color="primary"
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
                                <Typography variant="body2">Zoom</Typography>
                            }
                        />
                        <FormControlLabel
                            value="Google Meet"
                            control={<Radio size="small" />}
                            label={
                                <Typography variant="body2">
                                    Google Meet
                                </Typography>
                            }
                        />
                        <FormControlLabel
                            value="Microsoft Teams"
                            control={<Radio size="small" />}
                            label={
                                <Typography variant="body2">
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
                        textAlign={"center"}
                    >
                        " Virtual interview fee: 300 THB."
                    </Typography>
                </Box>
            )}

            {/* Show Care Plan detail  */}
            <Box my={3}>
                <Typography
                    variant="h5"
                    fontWeight={600}
                    mb={1}
                    color="primary"
                >
                    Assign Duty:
                </Typography>
                <Box width={"100%"} my={2} p={1}>
                    <Typography variant="body1" fontWeight={600} mb={1}>
                        Start Date : {carePlan.start_date}
                    </Typography>
                    <Typography variant="body1" fontWeight={600} mb={1}>
                        Care Timing :{" "}
                        {carePlan.schedule.package == "Live in (24-hour)"
                            ? "Live in (24-hour)"
                            : `${carePlan.schedule.duty} duty`}
                    </Typography>
                    <Typography variant="body1" fontWeight={600} mb={1}>
                        Care Program Duration :{" "}
                        {carePlan.duration == 12
                            ? "1 year"
                            : carePlan.duration == 1
                            ? `${carePlan.duration} month`
                            : `${carePlan.duration} months`}
                    </Typography>
                    {/* <Typography variant="body1" fontWeight={600} mb={1}>
                        Caregiver level :{" "}
                        {carePlan.service_type == "Newborn Care" &&
                            cv.newborn_care_level}
                        {(carePlan.service_type == "Nanny Service" ||
                            carePlan.service_type ==
                                "Nanny Care + Maid Service") &&
                            cv.newborn_care_level}
                        {(carePlan.service_type == "Elder Care" ||
                            carePlan.service_type ==
                                "Elder Care + Maid Service") &&
                            cv.level}
                    </Typography> */}
                    {/* <Typography
                        sx={{
                            fontFamily: "Karma",
                            fontSize: { xs: 13, sm: 18, md: 22 },
                            fontWeight: 600,
                            mb: { xs: 1, sm: 2, md: 3 },
                        }}
                    >
                        Monthly Salary : {selectedSalary?.amount} THB{" "}
                        <span style={{ color: "#b3b3b3" }}>
                            (1 month advanced payment)
                        </span>
                    </Typography> */}
                    {/* <Typography
                        sx={{
                            fontFamily: "Karma",
                            fontSize: { xs: 13, sm: 18, md: 22 },
                            fontWeight: 600,
                            mb: { xs: 1, sm: 2, md: 3 },
                        }}
                    >
                        Hearty Aid Service Fees : {serviceFees[0].fee} THB{" "}
                        <span style={{ color: "#b3b3b3" }}>
                            (One time payment)
                        </span>
                    </Typography> */}
                </Box>
            </Box>

            <Box textAlign={"center"} mt={4}>
                <Button
                    variant="contained"
                    sx={{ borderRadius: 20 }}
                    onClick={handleSubmit}
                    disabled={processing}
                    fullWidth
                >
                    <Typography fontSize={{ xs: 18, sm: 20, md: 25 }}>
                        Confirm
                    </Typography>
                </Button>
                <Typography
                    fontSize={{ xs: 12, sm: 17, md: 17 }}
                    mt={2}
                    color="primary"
                >
                    "Interview fees will be collected prior to the start of the
                    interview session."
                </Typography>
                <Typography
                    fontSize={{ xs: 12, sm: 17, md: 17 }}
                    color="primary"
                >
                    It will be deducted upon confirmation of the job hire.
                </Typography>
            </Box>
        </Box>
    );
}

export default InterviewForm;
