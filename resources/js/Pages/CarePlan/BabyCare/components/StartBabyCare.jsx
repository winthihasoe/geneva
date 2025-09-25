import React, { useContext, useEffect, useState } from "react";
import {
    Typography,
    Box,
    Container,
    Button,
    CircularProgress,
    LinearProgress,
} from "@mui/material";
import StepOneBC from "./StepOneBC";
import StepTwoBC from "./StepTwoBC";
import StepThreeBC from "./StepThreeBC";
import StepFourBC from "./StepFourBC";
import StepFiveBC from "./StepFiveBC";
import StepSixBC from "./StepSixBC";
import { CarePlanContext } from "@/Context/CarePlanContext";
import { router } from "@inertiajs/react";

function StartBabyCare() {
    const { carePlanData, updateCarePlan, responseMessage } =
        useContext(CarePlanContext);

    useEffect(() => {
        updateCarePlan("care_type", "Baby");
    }, []);

    const totalSteps = 6;
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Calculate progress percentage
    const progress = (step / totalSteps) * 100;

    // Validation function for each step
    const validateStep = () => {
        switch (step) {
            case 1:
                return (
                    carePlanData.service_type &&
                    carePlanData.schedule?.package &&
                    carePlanData.start_date &&
                    carePlanData.duration
                );
            case 2:
                return (
                    carePlanData.services && carePlanData.services.length > 0
                );
            case 3:
                return (
                    carePlanData.care_recipient_info?.name &&
                    carePlanData.care_recipient_info?.age &&
                    carePlanData.care_recipient_info?.gender &&
                    carePlanData.care_recipient_info?.home_address &&
                    carePlanData.contact_info?.name &&
                    carePlanData.contact_info?.relationship &&
                    carePlanData.contact_info?.phone_number &&
                    carePlanData.contact_info?.email
                );
            case 4:
                return carePlanData.preferences?.age;
            case 5:
                return carePlanData.preferred_language;
            case 6:
                return (
                    carePlanData.preferences?.qualification &&
                    carePlanData.preferences?.experience
                );
            default:
                return true;
        }
    };

    const handleNext = async () => {
        if (step === totalSteps) {
            // Final step - submit the care plan
            setIsLoading(true);
            try {
                // Add current step to the data
                const submissionData = {
                    ...carePlanData,
                    current_step: totalSteps,
                };

                // Use Inertia router instead of fetch for better CSRF handling
                router.post(route("plan.store"), submissionData, {
                    onSuccess: (response) => {
                        // Success - redirect to CV display page

                        router.visit(
                            route("care.cv.shows", {
                                care_plan_id: response.props.care_plan_id,
                            })
                        );
                    },
                    onError: (errors) => {
                        console.error("Error saving care plan:", errors);
                        setIsLoading(false);
                    },
                    onFinish: () => {
                        setIsLoading(false);
                    },
                });
            } catch (error) {
                console.error("Error submitting care plan:", error);
                setIsLoading(false);
            }
        } else {
            // Regular step progression
            setStep(step + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handlePrevious = () => {
        if (step > 1) {
            setStep(step - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ maxWidth: 800, margin: "8px auto" }}>
                {/* Progress Bar Section */}
                <Box sx={{ maxWidth: 400, margin: "8px auto" }}>
                    <Typography
                        variant="h4"
                        mb={2}
                        color="white"
                        textAlign="center"
                        fontFamily={"Righteous"}
                        fontWeight={500}
                    >
                        Customize Baby Care Plan
                    </Typography>
                    {/* Progress bar with gradient */}
                    <Box sx={{ position: "relative", mb: 1 }}>
                        {/* Progress percentage text */}
                        <Typography
                            variant="body2"
                            color="white"
                            mb={1}
                            textAlign="center"
                        >
                            {Math.round(progress)}% completed
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                                height: 4,
                                borderRadius: 4,
                                backgroundColor: "grey.100",
                                "& .MuiLinearProgress-bar": {
                                    borderRadius: 4,
                                    background:
                                        "linear-gradient(90deg, #FFC547 0%, #FFC547 100%)",
                                },
                            }}
                        />
                    </Box>
                </Box>

                {/* Response message */}
                <Box sx={{ height: "5px", mb: 2 }}>
                    {responseMessage && (
                        <Typography
                            variant="body2"
                            textAlign={"center"}
                            color={
                                responseMessage.includes("Failed")
                                    ? "error"
                                    : "success.main"
                            }
                        >
                            {responseMessage}
                        </Typography>
                    )}
                    {isLoading && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <CircularProgress
                                size={16}
                                sx={{ color: "white" }}
                            />
                            <Typography variant="body2" color="white">
                                Saving care plan and finding caregivers...
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>

            <Box sx={{ px: 1, pt: 2, pb: 3, maxWidth: 800, margin: "auto" }}>
                {/* Form components */}
                {step === 1 && <StepOneBC />}
                {step === 2 && <StepTwoBC />}
                {step === 3 && <StepThreeBC />}
                {step === 4 && <StepFourBC />}
                {step === 5 && <StepFiveBC />}
                {step === 6 && <StepSixBC />}

                {/* Next and Previous buttons */}
                <Box
                    sx={{
                        mt: 3,
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handlePrevious}
                        disabled={step === 1 || isLoading}
                        size="small"
                    >
                        <Typography color="white">Previous</Typography>
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleNext}
                        size="small"
                        disabled={!validateStep() || isLoading}
                        endIcon={
                            isLoading ? (
                                <CircularProgress size={16} color="inherit" />
                            ) : null
                        }
                    >
                        {isLoading
                            ? "Saving..."
                            : step === totalSteps
                            ? "Submit & Find Caregivers"
                            : "Next"}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default StartBabyCare;
