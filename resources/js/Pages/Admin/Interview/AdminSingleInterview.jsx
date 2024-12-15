import Subtitle from "@/Components/Typo/Subtitle";
import TinyText from "@/Components/Typo/TinyText";
import Title from "@/Components/Typo/Title";
import AgeCalculator from "@/Components/util/AgeCalculator";
import DateTimeFormatter from "@/Components/util/DateTimeFormatter";
import AdminLayout from "@/Layouts/AdminLayout";
import MainTitle from "@/Pages/CustomizedCare/components/MainTitle";
import { Head, router } from "@inertiajs/react";
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import CVcard from "./components/CVcard";
import DateFormatter from "@/Components/util/DateFormatter";
import ReusableModal from "@/Components/util/ReusableModal";
import BackButton from "@/Components/BackButton";
import PatientInfo from "./components/PatientInfo";
import BabyInfo from "./components/BabyInfo";

function AdminSingleInterview({ interview }) {
    const patient = interview.care_plan.care_recipient_info;
    const guardian = interview.care_plan.contact_info;
    const preferences = interview.care_plan.preferences;

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const [selectedStatus, setSelectedStatus] = useState(interview.status);

    const handleSubmitStatus = () => {
        router.put(
            route("admin.interview.status.update", interview.id),
            {
                status: selectedStatus,
            },
            {
                onSuccess: () => {
                    handleClose();
                },
            }
        );
    };
    return (
        <AdminLayout>
            <Head title="Interview" />
            <Title>
                <BackButton />
                Interview Detail
            </Title>
            {/* Interveiw detail  */}
            <Box
                sx={{
                    border: "4px solid",
                    borderColor: "primary.main",
                    p: { xs: 2, sm: 3 },
                    borderRadius: 10,

                    maxWidth: 600,
                    margin: "20px auto",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                    }}
                >
                    <Box sx={{ width: 250 }}>
                        <Subtitle>Interview Time: {interview.time}</Subtitle>
                    </Box>
                    <Box sx={{ width: 250 }}>
                        <Subtitle>Interview Date: {interview.date}</Subtitle>
                    </Box>
                    {interview.alt_time && (
                        <Box sx={{ width: 250 }}>
                            <Subtitle>
                                Altenate Time: {interview.alt_time}
                            </Subtitle>
                        </Box>
                    )}
                    {interview.alt_date && (
                        <Box sx={{ width: 250 }}>
                            <Subtitle>
                                Alternate Date: {interview.alt_date}
                            </Subtitle>
                        </Box>
                    )}
                    <Box sx={{ width: 250 }}>
                        <Subtitle>Interview Mode: {interview.mode}</Subtitle>
                    </Box>
                    {interview.mode == "Virtual" && (
                        <Box sx={{ width: 250 }}>
                            <Subtitle>Platform: {interview.online}</Subtitle>
                        </Box>
                    )}
                    {interview.location && (
                        <Box sx={{ width: 250 }}>
                            <Subtitle>Location: {interview.location}</Subtitle>
                        </Box>
                    )}
                    <Box sx={{ width: 250 }}>
                        <Subtitle>
                            Interview Status: {interview.status}
                        </Subtitle>
                    </Box>
                    {interview.approved_by && (
                        <Box sx={{ width: 250 }}>
                            <Subtitle>
                                Approved By: {interview.approved_by}
                            </Subtitle>
                        </Box>
                    )}
                    {interview.approved_at && (
                        <Box sx={{ width: 400 }}>
                            <Subtitle>
                                Approved At:{" "}
                                <DateTimeFormatter
                                    dateTime={interview.approved_at}
                                />
                            </Subtitle>
                        </Box>
                    )}
                </Box>
                <Box textAlign={"center"}>
                    <Button
                        onClick={() => setOpen(true)}
                        variant="contained"
                        sx={{ borderRadius: 10 }}
                    >
                        <Typography
                            fontFamily={"Karma"}
                            fontSize={{ xs: 13, sm: 14, md: 15 }}
                        >
                            Change Status
                        </Typography>
                    </Button>
                </Box>

                <Divider sx={{ mt: 4 }}>
                    <TinyText>Duty Preferences</TinyText>
                </Divider>
                <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
                    <Subtitle>
                        Service type: {interview.care_plan.service_type}
                    </Subtitle>
                    <Subtitle>
                        Package: {interview.care_plan.schedule.package}
                    </Subtitle>
                    {interview.care_plan.schedule.package == "Live-out" && (
                        <Box sx={{ width: 250 }}>
                            <Subtitle>
                                Duty hour:{" "}
                                {interview.care_plan.schedule.duty_time}
                            </Subtitle>
                        </Box>
                    )}
                    <Subtitle>
                        Start Date:{" "}
                        <DateFormatter date={interview.care_plan.start_date} />
                    </Subtitle>
                    {interview?.care_plan?.additional_notes && (
                        <Subtitle>
                            Notes:{" "}
                            <span
                                style={{
                                    fontStyle: "italic",
                                    fontWeight: 500,
                                }}
                            >
                                {interview?.care_plan?.additional_notes}
                            </span>
                        </Subtitle>
                    )}
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    columnGap: 2,
                }}
            >
                {/* Patient Info */}
                {interview.care_plan.care_type == "Elder" ? (
                    <PatientInfo
                        patient={patient}
                        guardian={guardian}
                        interview={interview}
                    />
                ) : (
                    <BabyInfo
                        patient={patient}
                        guardian={guardian}
                        interview={interview}
                    />
                )}
                {/* CG Info */}
                <Box
                    sx={{
                        p: { xs: 2, sm: 3 },
                        maxWidth: 600,
                    }}
                >
                    <MainTitle>Caregiver Info</MainTitle>
                    <CVcard resume={interview.cv} />
                    <Divider sx={{ my: 2 }}>
                        <TinyText>Preferences</TinyText>
                    </Divider>
                    {preferences.age && (
                        <Box sx={{ width: 250 }}>
                            <Subtitle>Age: {preferences.age}</Subtitle>
                        </Box>
                    )}
                    {preferences.religion && (
                        <Box sx={{ width: 250 }}>
                            <Subtitle>
                                Religion: {preferences.religion}
                            </Subtitle>
                        </Box>
                    )}
                    {preferences.experience && (
                        <Box sx={{ width: 250 }}>
                            <Subtitle>
                                Experience: {preferences.experience}
                            </Subtitle>
                        </Box>
                    )}
                    {preferences.language && (
                        <Box sx={{ width: 250 }}>
                            <Subtitle>
                                Language: {preferences.language}
                            </Subtitle>
                        </Box>
                    )}
                    {preferences.nationality && (
                        <Box sx={{ width: 250 }}>
                            <Subtitle>
                                Nationality: {preferences.nationality}
                            </Subtitle>
                        </Box>
                    )}
                    {preferences.communication && (
                        <Box sx={{ width: 250 }}>
                            <Subtitle>
                                Level of ommunication:{" "}
                                {preferences.communication}
                            </Subtitle>
                        </Box>
                    )}
                    {interview?.care_plan?.services?.length > 0 && (
                        <Subtitle>
                            Needs:{" "}
                            <span
                                style={{
                                    fontStyle: "italic",
                                    fontWeight: 500,
                                }}
                            >
                                {interview?.care_plan?.services.join(", ")}
                            </span>
                        </Subtitle>
                    )}
                </Box>
            </Box>
            <ReusableModal
                title={"Change Status"}
                open={open}
                onClose={handleClose}
            >
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="status"
                        name="status"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <FormControlLabel
                            value="pending"
                            control={<Radio />}
                            label="Pending"
                        />
                        <FormControlLabel
                            value="accepted"
                            control={<Radio />}
                            label="Accepted"
                        />
                        <FormControlLabel
                            value="declined"
                            control={<Radio />}
                            label="Declined"
                        />
                        <FormControlLabel
                            value="rescheduled"
                            control={<Radio />}
                            label="Rescheduled"
                        />
                    </RadioGroup>
                </FormControl>
                <Box mt={2} textAlign={"center"}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmitStatus}
                        sx={{ borderRadius: 20 }}
                    >
                        <Typography
                            fontFamily={"Karma"}
                            fontSize={{ xs: 13, sm: 14, md: 15 }}
                        >
                            Submit
                        </Typography>
                    </Button>
                </Box>
            </ReusableModal>
        </AdminLayout>
    );
}

export default AdminSingleInterview;
