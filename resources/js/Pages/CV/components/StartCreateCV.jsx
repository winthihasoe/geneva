import React, { useContext, useState } from "react";
import {
    Typography,
    Box,
    Container,
    Button,
    Divider,
    IconButton,
    CircularProgress,
    LinearProgress,
} from "@mui/material";

import CvContext from "@/Context/CvContext";
import NameAndDOBForm from "./forms/NameAndDOBForm";
import GenderHeightWeightForm from "./forms/GenderHeightWeightForm";
import StepOne from "./forms/StepOne";
import StepTwo from "./forms/StepTwo";
import StepThree from "./forms/StepThree";
import StepFour from "./forms/StepFour";
import StepFive from "./forms/StepFive";
import StepSix from "./forms/StepSix";
import StepSeven from "./forms/StepSeven";
import StepEight from "./forms/StepEight";
import StepNine from "./forms/StepNine";
import StepTen from "./forms/StepTen";
import StepEleven from "./forms/StepEleven";
import { Check, ChevronLeft, ChevronRight } from "@mui/icons-material";
import StepTwelve from "./forms/StepTwelve";
import StepThirteen from "./forms/StepThirteen";

function StartCreateCV() {
    const { data, setData, saveData, responseMessage, handleStep } =
        useContext(CvContext);

    const totalSteps = 13;
    const step = data.current_step || 1;
    const [isLoading, setIsLoading] = useState(false);

    // Calculate progress percentage
    const progress = (step / totalSteps) * 100;

    // Validation function for each step
    const validateStep = () => {
        switch (step) {
            case 1:
                return (
                    data.full_name &&
                    data.nickname &&
                    data.date_of_birth &&
                    data.gender
                );
            case 2:
                return (
                    data.height &&
                    data.weight &&
                    data.nationality &&
                    data.religion &&
                    data.profile_photo
                );
            case 3:
                return (
                    data.passport &&
                    data.passport_number &&
                    data.visa_type &&
                    data.passport_expiry_date
                );
            case 4:
                // Certificate step - might be optional
                return true;
            case 5:
                return data.phone && data.language && data.language.length > 0;
            case 6:
                return data.services && data.services.length > 0;
            case 7:
                // Experience step - might be optional
                return true;
            case 8:
                return data.package && data.package.length > 0;
            case 9:
                // Skills step
                return true;
            case 10:
                // Medical conditions step
                return true;
            case 12:
                return data.agree_to_terms;
            case 13:
                return data.training_or_assessment;
            default:
                return true;
        }
    };

    const handleNext = async () => {
        if (isLoading) return;

        setIsLoading(true);
        if (step < totalSteps) {
            try {
                setData((prevData) => ({
                    ...prevData,
                    current_step: step + 1,
                }));
                const res = await saveData();

                if (res == "success") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }
            } catch (error) {
                console.error("Error saving data:", error);
                setData((prevData) => ({
                    ...prevData,
                    current_step: step,
                }));
            } finally {
                setIsLoading(false);
            }
        } else if (step === totalSteps) {
            // Final step - redirect to finish page
            await saveData();
            window.location.href = route("cv.finish");
        } else {
            console.warn("Invalid step:", step);
        }
    };

    const handlePrevious = () => {
        if (isLoading) return;

        if (step > 1) {
            setData((prevData) => ({
                ...prevData,
                current_step: step - 1,
            }));
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ maxWidth: 800, margin: "20px auto 10px auto" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <IconButton
                        onClick={handlePrevious}
                        disabled={step === 1 || isLoading}
                        sx={{
                            bgcolor: "grey.100",
                            "&:hover": { bgcolor: "grey.200" },
                            "&:disabled": { bgcolor: "grey.50" },
                        }}
                    >
                        <ChevronLeft />
                    </IconButton>

                    <Typography variant="h4" textAlign={"center"}>
                        Create CV
                    </Typography>

                    <IconButton
                        onClick={handleNext}
                        disabled={isLoading || !validateStep()}
                        sx={{
                            bgcolor: "primary.main",
                            color: "white",
                            "&:hover": { bgcolor: "primary.dark" },
                            "&:disabled": { bgcolor: "grey.300" },
                        }}
                    >
                        {isLoading ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : step === totalSteps ? (
                            <Check />
                        ) : (
                            <ChevronRight />
                        )}
                    </IconButton>
                </Box>
                {/* Progress Bar Section */}
                <Box sx={{ maxWidth: 400, margin: "10px auto" }}>
                    {/* Progress bar with gradient */}
                    <Box sx={{ position: "relative", mb: 1 }}>
                        {/* Progress percentage text */}
                        <Typography
                            variant="body2"
                            color="text.secondary"
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
                                        "linear-gradient(90deg, #548d75ff 0%, #21875C 100%)",
                                },
                            }}
                        />
                    </Box>

                    {/* Mini step indicators */}
                    {/* <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mt: 1,
                        }}
                    >
                        {Array.from({ length: totalSteps }, (_, index) => (
                            <Box
                                key={index}
                                sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    backgroundColor:
                                        index < step ? "grey.500" : "grey.200",
                                    transition: "all 0.3s ease",
                                    transform:
                                        index + 1 === step
                                            ? "scale(1.2)"
                                            : "scale(1)",
                                }}
                            />
                        ))}
                    </Box> */}
                </Box>
                {/* Response message  */}
                <Box sx={{ height: "5px" }}>
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
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                Saving data...
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>

            <Box sx={{ px: 1, pt: 2, pb: 3, maxWidth: 800, margin: "auto" }}>
                {/* Form components */}
                {step === 1 && <StepOne />}
                {step === 2 && <StepTwo />}
                {step === 3 && <StepThree />}
                {step === 4 && <StepFour />}
                {step === 5 && <StepFive />}
                {step === 6 && <StepSix />}
                {step === 7 && <StepSeven />}
                {step === 8 && <StepEight />}
                {step === 9 && <StepNine />}
                {step === 10 && <StepTen />}
                {step === 11 && <StepEleven />}
                {step === 12 && <StepTwelve />}
                {step === 13 && <StepThirteen />}

                {/* Next and Previous buttons - Hidden for steps 4 and 7 */}
                {step !== 4 && step !== 7 && (
                    <Box
                        sx={{
                            mt: 3,
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={handlePrevious}
                            disabled={step === 1 || isLoading}
                            size="small"
                            startIcon={
                                isLoading ? (
                                    <CircularProgress size={16} />
                                ) : null
                            }
                        >
                            Previous
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleNext}
                            size="small"
                            disabled={isLoading || !validateStep()}
                            endIcon={
                                isLoading ? (
                                    <CircularProgress
                                        size={16}
                                        color="inherit"
                                    />
                                ) : null
                            }
                        >
                            {isLoading
                                ? "Saving..."
                                : step === totalSteps
                                ? "Finish"
                                : "Next"}
                        </Button>
                    </Box>
                )}
            </Box>
        </Container>
    );
}

export default StartCreateCV;
