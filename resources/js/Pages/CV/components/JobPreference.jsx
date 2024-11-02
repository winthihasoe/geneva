import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import GenderPatientConditionForm from "./forms/GenderPatientConditionForm";
import TitleCenterForCvForm from "@/Components/Typo/TitleCenterForCvForm";

const JobPreference = ({
    data,
    handleChange,
    onFormSubmit,
    onNext,
    handleBack,
}) => {
    const [step, setStep] = useState(1);
    const totalSteps = 1;
    // These next steps functions are only use in this component, not from parent component
    const handleNext = () => {
        if (step == 1) {
            onFormSubmit();
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
                Job Preference{" "}
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
                    <GenderPatientConditionForm
                        data={data}
                        handleChange={handleChange}
                    />
                )}
            </Box>

            <Box
                sx={{ display: "flex", mt: 3, justifyContent: "space-between" }}
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
                        {step == 1 ? "Finish" : "Next"}
                    </Typography>
                </Button>
            </Box>
        </>
    );
};

export default JobPreference;
