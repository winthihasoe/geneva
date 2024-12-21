import React, { useContext, useEffect, useState } from "react";
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
    const [activeStep, setActiveStep] = useState(0);

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

    const validateStep = () => {
        switch (activeStep) {
            case 0:
                return (
                    carePlanData.care_recipient_info.name &&
                    carePlanData.care_recipient_info.date_of_birth &&
                    carePlanData.care_recipient_info.age &&
                    carePlanData.care_recipient_info.gender &&
                    carePlanData.contact_info.name &&
                    carePlanData.contact_info.relationship &&
                    carePlanData.contact_info.phone_number &&
                    carePlanData.care_recipient_info.home_address
                );
            case 1:
                return (
                    carePlanData.start_date &&
                    carePlanData.schedule.package &&
                    carePlanData.duration &&
                    (carePlanData.schedule.package !== "Live-out" ||
                        carePlanData.schedule.duty_time)
                );
            case 2:
                return carePlanData.services.length > 0;
            case 3:
                return (
                    carePlanData.preferences.age &&
                    carePlanData.preferences.nationality
                );
            case 4:
                return carePlanData.residential_address;

            default:
                return true;
        }
    };

    return (
        <Box
            sx={{
                padding: { xs: 1, sm: 2 },
                position: "relative",
            }}
        >
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
                        disabled={!validateStep()}
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
