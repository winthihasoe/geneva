import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import BabyInfo from "./BabyInfo";
import CareSchedule from "./CareSchedule";
import ChooseSkills from "./ChooseSkills";
import Preferences from "./Preferences";
import ProgressBar from "@/Pages/CustomizedCare/components/ProgressBar";

// Dummy components for each step of the form
const Step1 = () => <Typography>Step 1: Baby's Basic Info</Typography>;
const Step2 = () => <Typography>Step 2: Care Schedule</Typography>;
const Step3 = () => <Typography>Step 3: Services Needed</Typography>;
const Step4 = () => <Typography>Step 4: Nanny Preferences</Typography>;
const Step5 = () => <Typography>Step 5: Our Recommendations</Typography>;

// List of components representing each step
const stepsComponents = [Step1, Step2, Step3, Step4, Step5];

const MultiStepForm = ({ service }) => {
    const [activeStep, setActiveStep] = useState(0);

    // Go to the next step
    const handleNext = () => {
        if (activeStep < stepsComponents.length - 1) {
            setActiveStep((prev) => prev + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Go to the previous step
    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((prev) => prev - 1);
        }
    };

    // Function to handle clicking on a specific step in the progress bar
    const handleStepClick = (step) => {
        if (step <= activeStep) {
            setActiveStep(step);
        }
    };

    // Dynamically render the current step's component
    const CurrentStepComponent = stepsComponents[activeStep];

    return (
        <Box sx={{ padding: 3 }}>
            {/* Step Progress Bar */}
            <ProgressBar
                activeStep={activeStep}
                onStepClick={handleStepClick}
            />

            {/* Current Step Content */}
            <Box sx={{ marginY: 4 }}>
                {activeStep == 0 && <BabyInfo />}
                {activeStep == 1 && <CareSchedule service={service} />}
                {activeStep == 2 && <ChooseSkills />}
                {activeStep == 3 && <Preferences />}
            </Box>

            {/* Navigation Buttons */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    px: { xs: 0, sm: 2, md: 5 },
                    my: 3,
                }}
            >
                <Button
                    variant="contained"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    sx={{ bgcolor: "#F5F5F5", borderRadius: 20 }}
                >
                    <Typography
                        color="primary"
                        fontFamily={"Kavoon"}
                        fontSize={25}
                    >
                        Previous
                    </Typography>
                </Button>
                <Button
                    variant="contained"
                    sx={{ borderRadius: 20 }}
                    onClick={handleNext}
                    disabled={activeStep === stepsComponents.length - 1}
                >
                    <Typography fontFamily={"Kavoon"} fontSize={25}>
                        Next
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
};

export default MultiStepForm;
