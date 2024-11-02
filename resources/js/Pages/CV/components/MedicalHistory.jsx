import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import PastIllnessesForm from "./forms/PastIllnessesForm";
import AllergiesPhysicalDisabilitiesForm from "./forms/AllergiesPhysicalDisabilitiesForm";
import DietaryFoodHandlingForm from "./forms/DietaryFoodHandlingForm";
import TitleCenterForCvForm from "@/Components/Typo/TitleCenterForCvForm";

const MedicalHistory = ({ data, onNext, handleBack, handleChange }) => {
    const [step, setStep] = useState(1);
    const totalSteps = 3;
    // These next steps functions are only use in this component, not from parent component
    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            onNext();
        }
    };

    const handlePrevious = () => {
        if (step > 1) {
            setStep(step - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            handleBack();
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
                    boxShadow: 2,
                    borderRadius: 2,
                    p: 3,
                    maxWidth: 500,
                    margin: "auto",
                    border: "2px solid",
                    borderColor: "primary.main",
                }}
            >
                {step == 1 && (
                    <PastIllnessesForm
                        data={data}
                        handleChange={handleChange}
                    />
                )}

                {step == 2 && (
                    <AllergiesPhysicalDisabilitiesForm
                        data={data}
                        handleChange={handleChange}
                    />
                )}

                {step == 3 && (
                    <DietaryFoodHandlingForm
                        data={data}
                        handleChange={handleChange}
                    />
                )}
            </Box>

            <Box
                sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}
            >
                <Button
                    variant="outlined"
                    onClick={handlePrevious}
                    size="small"
                >
                    <Typography
                        fontFamily={"Lilita One"}
                        fontWeight={500}
                        fontSize={17}
                    >
                        Previous
                    </Typography>
                </Button>
                <Button variant="contained" onClick={handleNext} size="small">
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
