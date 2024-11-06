import React, { useContext, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import PastIllnessesForm from "./forms/PastIllnessesForm";
import AllergiesPhysicalDisabilitiesForm from "./forms/AllergiesPhysicalDisabilitiesForm";
import DietaryFoodHandlingForm from "./forms/DietaryFoodHandlingForm";
import TitleCenterForCvForm from "@/Components/Typo/TitleCenterForCvForm";
import CvContext from "@/Context/CvContext";

const MedicalHistory = () => {
    const {
        handleNext: onNext,
        handleBack: onBack,
        saveData,
    } = useContext(CvContext);
    const [step, setStep] = useState(1);
    const totalSteps = 3;
    // These next steps functions are only use in this component, not from parent component
    const handleNext = async () => {
        if (step < 3) {
            await saveData();
            setStep(step + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            await saveData();
            onNext();
        }
    };

    const handlePrevious = () => {
        if (step > 1) {
            setStep(step - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            onBack();
        }
    };

    return (
        <>
            <TitleCenterForCvForm>
                Your Medical History{" "}
                <span style={{ fontSize: 11 }}>{`${step}/${totalSteps}`}</span>
            </TitleCenterForCvForm>
            <Box
                sx={{
                    boxShadow: { xs: 0, sm: 2 },
                    borderRadius: 10,
                    p: { xs: 1, sm: 3 },
                    maxWidth: 500,
                    margin: "auto",
                    border: {
                        xs: "none",
                        sm: "2px solid #21875C",
                    },
                }}
            >
                {step == 1 && <PastIllnessesForm />}

                {step == 2 && <AllergiesPhysicalDisabilitiesForm />}

                {step == 3 && <DietaryFoodHandlingForm />}
            </Box>

            <Box
                sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}
            >
                <Button
                    variant="outlined"
                    onClick={handlePrevious}
                    size="small"
                    sx={{ borderRadius: 20 }}
                >
                    <Typography
                        fontFamily={"Lilita One"}
                        fontWeight={500}
                        fontSize={17}
                    >
                        Previous
                    </Typography>
                </Button>
                <Button
                    variant="contained"
                    sx={{ borderRadius: 20 }}
                    onClick={handleNext}
                    size="small"
                >
                    <Typography
                        fontFamily={"Lilita One"}
                        fontWeight={500}
                        fontSize={17}
                    >
                        Next
                    </Typography>
                </Button>
            </Box>
        </>
    );
};

export default MedicalHistory;
