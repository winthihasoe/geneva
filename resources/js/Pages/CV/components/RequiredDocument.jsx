import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import ProfileUploadForm from "./forms/ProfileUploadForm";
import DocumentUploadForm from "./forms/DocumentUploadForm";
import PersonalIDUploadForm from "./forms/PersonalIDUploadForm";
import TitleCenterForCvForm from "@/Components/Typo/TitleCenterForCvForm";
import CvContext from "@/Context/CvContext";

export default function RequiredDocuments({
    resumeId,
    oldPhoto,
    oldPassport,
    oldEduCert,
    oldId,
    oldFamilyRecord,
    oldRefLetter,
}) {
    const [step, setStep] = useState(1);
    const {
        handleNext: onNext,
        handleBack: onBack,
        saveData,
        data,
    } = useContext(CvContext);
    const totalSteps = 3;
    // These next steps functions are only use in this component, not from parent component
    const handleNext = async () => {
        if (step < totalSteps) {
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

    // Validation function for each step
    const validateStep = () => {
        switch (step) {
            case 1:
                return data.profile_photo;
            case 2:
                return data.passport && data.passport_number && data.visa_type;
            case 3:
                return (
                    data.citizenship_certificate && data.family_member_record
                );

            default:
                return true;
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
                    boxShadow: { xs: 0, sm: 2 },
                    borderRadius: 10,
                    p: { xs: 1, sm: 3 },
                    maxWidth: 500,
                    margin: "auto",
                    border: {
                        xs: "none",
                        sm: "2px solid #21875C",
                        md: "2px solid #21875C",
                    },
                }}
            >
                {step == 1 && (
                    <ProfileUploadForm
                        resumeId={resumeId}
                        oldPhoto={oldPhoto}
                    />
                )}

                {step == 2 && (
                    <DocumentUploadForm
                        oldPassport={oldPassport}
                        oldEduCert={oldEduCert}
                    />
                )}

                {step == 3 && (
                    <PersonalIDUploadForm
                        oldId={oldId}
                        oldFamilyRecord={oldFamilyRecord}
                        oldRefLetter={oldRefLetter}
                    />
                )}
            </Box>

            <Box
                sx={{ display: "flex", mt: 4, justifyContent: "space-between" }}
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
                    sx={{ borderRadius: 20 }}
                    variant="contained"
                    onClick={handleNext}
                    size="small"
                    disabled={!validateStep()}
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
}
