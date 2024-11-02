import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import ProfileUploadForm from "./forms/ProfileUploadForm";
import DocumentUploadForm from "./forms/DocumentUploadForm";
import PersonalIDUploadForm from "./forms/PersonalIDUploadForm";
import ExperienceForm from "./forms/ExperienceForm";
import SummaryForm from "./forms/SummaryForm";
import TitleCenterForCvForm from "@/Components/Typo/TitleCenterForCvForm";

export default function RequiredDocuments({
    data,
    resumeId,
    onNext,
    handleBack,
    handleChange,
    oldPhoto,
    oldVideo,
    oldPassport,
    oldEduCert,
    oldId,
    oldFamilyRecord,
    oldRefLetter,
    setData,
}) {
    const [step, setStep] = useState(1);
    const totalSteps = 5;
    // These next steps functions are only use in this component, not from parent component
    const handleNext = () => {
        if (step < 5) {
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
                Required Documents{" "}
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
                    <ProfileUploadForm
                        data={data}
                        resumeId={resumeId}
                        handleChange={handleChange}
                        oldPhoto={oldPhoto}
                        setData={setData}
                    />
                )}

                {step == 2 && (
                    <DocumentUploadForm
                        data={data}
                        setData={setData}
                        handleChange={handleChange}
                        oldPassport={oldPassport}
                        oldEduCert={oldEduCert}
                    />
                )}

                {step == 3 && (
                    <PersonalIDUploadForm
                        data={data}
                        setData={setData}
                        handleChange={handleChange}
                        oldId={oldId}
                        oldFamilyRecord={oldFamilyRecord}
                        oldRefLetter={oldRefLetter}
                    />
                )}
                {step == 4 && (
                    <ExperienceForm data={data} handleChange={handleChange} />
                )}

                {step == 5 && (
                    <SummaryForm data={data} handleChange={handleChange} />
                )}
            </Box>

            <Box
                sx={{ display: "flex", mt: 4, justifyContent: "space-between" }}
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
}
