import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import NameAndDOBForm from "./forms/NameAndDOBForm";
import GenderHeightWeightForm from "./forms/GenderHeightWeightForm";
import PlaceOfBirthForm from "./forms/PlaceOfBirthForm";
import AddressForm from "./forms/AddressForm";
import ContactForm from "./forms/ContactForm";
import EmailLanguageForm from "./forms/EmailLanguageForm";
import ReligionHobbiesForm from "./forms/ReligionHobbiesForm";
import EducationQualificationForm from "./forms/EducationQualificationForm";
import MaritalStatusForm from "./forms/MaritalStatusForm";
import SiblingsAndGlassesForm from "./forms/SiblingsAndGlassesForm";
import TattooAndHabitsForm from "./forms/TattooAndHabitsForm";
import TitleCenterForCvForm from "@/Components/Typo/TitleCenterForCvForm";
import CvContext from "@/Context/CvContext";
import TinyText from "@/Components/Typo/TinyText";

const PersonalInfo = () => {
    const { handleNext: onNext, saveData, data, error } = useContext(CvContext);
    const [step, setStep] = useState(1);
    const totalSteps = 11;

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
        }
    };

    // Validation function for each step
    const validateStep = () => {
        switch (step) {
            case 1:
                return (
                    data.full_name &&
                    data.nickname &&
                    data.introduction &&
                    data.date_of_birth &&
                    data.gender &&
                    data.profile_photo
                );
            case 2:
                return (
                    data.height &&
                    data.weight &&
                    data.nationality &&
                    data.religion
                );
            case 3:
                return (
                    data.passport &&
                    data.passport_number &&
                    data.visa_type &&
                    data.passport_expiry_date
                );
            // Case 4 is about to add Certificate
            case 5:
                return data.language;
            case 6:
                return data.services;
            // Case 7 is about to add experience

            default:
                return true;
        }
    };

    return (
        <>
            <TitleCenterForCvForm>
                Personal Information{" "}
                <span style={{ fontSize: 11 }}>{`${step}/${totalSteps}`}</span>
            </TitleCenterForCvForm>
            {error && <TinyText textAlign="center">{error}</TinyText>}
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
                {step === 1 && <NameAndDOBForm />}
                {step === 2 && <GenderHeightWeightForm />}
                {step === 3 && <PlaceOfBirthForm />}
                {step === 4 && <AddressForm />}
                {step === 5 && <ContactForm />}
                {step === 6 && <EmailLanguageForm />}
                {step === 7 && <ReligionHobbiesForm />}
                {step === 8 && <EducationQualificationForm />}
                {step === 9 && <MaritalStatusForm />}
                {step === 10 && <SiblingsAndGlassesForm />}
                {step === 11 && <TattooAndHabitsForm />}
            </Box>
            <Box
                sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}
            >
                <Button
                    variant="outlined"
                    onClick={handlePrevious}
                    disabled={step === 1}
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
};

export default PersonalInfo;
