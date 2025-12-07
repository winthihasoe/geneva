import React, { useContext } from "react";
import {
    Stepper,
    Step,
    Typography,
    Box,
    StepButton,
    Container,
    Divider,
} from "@mui/material";
import PersonalInfo from "@/Pages/CV/components/PersonalInfo";
import MedicalHistory from "@/Pages/CV/components/MedicalHistory";
import RequiredDocuments from "@/Pages/CV/components/RequiredDocument";
import JobPreference from "@/Pages/CV/components/JobPreference";
import Title from "@/Components/Typo/Title";
import CvContext from "@/Context/CvContext";

const steps = [
    "Personal Information",
    "Medical History/Dietary Restrictions",
    "Required Documents",
    "Job Preference",
];

function StartCreateCVOld() {
    const { data, completedSteps, responseMessage, handleStep } =
        useContext(CvContext);

    const renderStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return <PersonalInfo />;

            case 1:
                return <MedicalHistory />;

            case 2:
                return <RequiredDocuments />;

            case 3:
                return <JobPreference />;

            default:
                return <PersonalInfo />;
        }
    };
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Title>Fill Your CV</Title>
                {responseMessage && (
                    <Box>
                        <Typography
                            fontSize={{ xs: 11, sm: 12, md: 13 }}
                            fontWeight={600}
                            fontFamily={"Mina"}
                            mb={2}
                        >
                            {responseMessage}
                        </Typography>
                    </Box>
                )}
            </Box>
            <Stepper
                nonLinear
                activeStep={data.current_step}
                alternativeLabel
                sx={{
                    display: { xs: "none", sm: "none", md: "flex" },
                    mb: 3,
                }}
            >
                {steps.map((label, index) => (
                    <Step
                        key={label}
                        completed={completedSteps[index] || false}
                    >
                        <StepButton color="inherit" onClick={handleStep(index)}>
                            <Typography
                                fontFamily={"Abel"}
                                fontSize={14}
                                fontWeight={"bold"}
                            >
                                {label}
                            </Typography>
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{ px: 2, mt: 3, mb: 2 }}>
                {renderStepContent(data.current_step)}
                {data.current_step == 4 && (
                    <Box sx={{ textAlign: "center" }}>
                        <Title>
                            You have completed all steps in creating Resume.
                        </Title>
                        <Typography>
                            Wait for admin to approve your resume.
                        </Typography>
                    </Box>
                )}
            </Box>

            <Divider sx={{ mt: 5 }} />
        </Container>
    );
}

export default StartCreateCVOld;
