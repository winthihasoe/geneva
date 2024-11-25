import React, { useContext, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import BabyInfo from "./BabyInfo";
import CareSchedule from "./CareSchedule";
import ChooseSkills from "./ChooseSkills";
import Preferences from "./Preferences";
import ProgressBar from "@/Pages/CustomizedCare/components/ProgressBar";
import OurRecommendations from "./OurRecommendations";
import { CarePlanContext } from "@/Context/CarePlanContext";
import Corner from "@/Components/Fancy/Corner";

const MultiStepForm = ({ service, basicSkills, advSkills }) => {
    const { carePlanData, updateCarePlan } = useContext(CarePlanContext);
    const [activeStep, setActiveStep] = useState(carePlanData.current_step);

    // Go to the next step
    const handleNext = () => {
        setActiveStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
        updateCarePlan("current_step", activeStep);
    };

    // Go to the previous step
    const handleBack = () => {
        if (activeStep > 0) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActiveStep((prev) => prev - 1);
        }
    };

    // Function to handle clicking on a specific step in the progress bar
    const handleStepClick = (step) => {
        if (step <= activeStep) {
            setActiveStep(step);
        }
    };

    return (
        <Box sx={{ padding: 3, position: "relative" }}>
            {/* Step Progress Bar */}
            <ProgressBar
                activeStep={activeStep}
                onStepClick={handleStepClick}
            />

            <Corner top={0} right={0} />

            {/* Current Step Content */}
            <Box sx={{ marginY: 4 }}>
                {activeStep == 0 && <BabyInfo />}
                {activeStep == 1 && <CareSchedule service={service} />}
                {activeStep == 2 && (
                    <ChooseSkills
                        basicSkills={basicSkills}
                        advSkills={advSkills}
                    />
                )}
                {activeStep == 3 && <Preferences />}
                {activeStep == 4 && <OurRecommendations />}
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
                        fontSize={{ xs: 20, sm: 25 }}
                    >
                        Previous
                    </Typography>
                </Button>

                {activeStep !== 4 && (
                    <Button
                        variant="contained"
                        sx={{ borderRadius: 20 }}
                        onClick={handleNext}
                    >
                        <Typography
                            fontFamily={"Kavoon"}
                            fontSize={{ xs: 20, sm: 25 }}
                        >
                            Next
                        </Typography>
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default MultiStepForm;
