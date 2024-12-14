import React from "react";
import { Box, Divider } from "@mui/material";
import AgeCalculator from "@/Components/util/AgeCalculator";
import Subtitle from "@/Components/Typo/Subtitle";
import MainTitle from "@/Pages/CustomizedCare/components/MainTitle";
import TinyText from "@/Components/Typo/TinyText";

function PatientInfo({ patient, guardian, interview }) {
    return (
        <Box
            sx={{
                borderRight: {
                    xs: "none",
                    sm: "none",
                    md: "4px solid #21875C",
                },
                borderBottom: {
                    xs: "4px solid #21875C",
                    sm: "4px solid #21875C",
                    md: "none",
                },
                p: { xs: 2, sm: 3 },
                maxWidth: 600,
            }}
        >
            <MainTitle>Patient Info</MainTitle>
            <Subtitle>Name: {patient.name} </Subtitle>
            <Subtitle>
                Age: <AgeCalculator date={patient.date_of_birth} /> years
            </Subtitle>
            <Subtitle>Gender: {patient.gender} </Subtitle>
            <Subtitle>Weight: {patient?.weight} kg </Subtitle>
            <Subtitle>Height: {patient?.height} cm </Subtitle>
            <Subtitle>Address: {patient?.home_address}</Subtitle>
            {patient.phone_number && (
                <Box sx={{ width: 250 }}>
                    <Subtitle>Phone: {patient?.phone_number}</Subtitle>
                </Box>
            )}
            <Divider sx={{ my: 2 }}>
                <TinyText>Medical Info</TinyText>
            </Divider>

            {interview.care_plan?.medical_conditions.length > 0 && (
                <Subtitle>
                    Medical Conditions:{" "}
                    {interview.care_plan?.medical_conditions.join(", ")}
                </Subtitle>
            )}
            {interview.care_plan?.other_medical_conditions && (
                <Subtitle>
                    Other Medical Conditions:{" "}
                    {interview.care_plan?.other_medical_conditions}
                </Subtitle>
            )}

            {interview.care_plan?.mobilities && (
                <Subtitle>Mobility: {interview.care_plan?.mobilities}</Subtitle>
            )}

            {interview.care_plan?.memory && (
                <Subtitle>
                    Memory status: {interview.care_plan?.memory}
                </Subtitle>
            )}

            {interview.care_plan?.alertness && (
                <Subtitle>
                    Alertness & orientation: {interview.care_plan?.alertness}
                </Subtitle>
            )}

            <Divider sx={{ my: 2 }}>
                <TinyText>Contact</TinyText>
            </Divider>

            <Subtitle>Gurdian Name: {guardian?.name} </Subtitle>
            <Subtitle>Relationship: {guardian?.relationship} </Subtitle>
            {guardian.phone_number && (
                <Box sx={{ width: 250 }}>
                    <Subtitle>Gurdian Phone: {guardian.phone_number}</Subtitle>
                </Box>
            )}
            {guardian.email && (
                <Box sx={{ width: 250 }}>
                    <Subtitle>Gurdian Email: {guardian.email}</Subtitle>
                </Box>
            )}
            {guardian.line_id && (
                <Box sx={{ width: 250 }}>
                    <Subtitle>Gurdian Line Id: {guardian.line_id}</Subtitle>
                </Box>
            )}
        </Box>
    );
}

export default PatientInfo;
