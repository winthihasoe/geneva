// PersonalInfo.js
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import NameAndDOBForm from "./forms/NameAndDOBForm";
import TitleCenter from "@/Components/Typo/TitleCenter";
import GenderHeightWeightForm from "./forms/GenderHeightWeightForm";
import PlaceOfBirthForm from "./forms/PlaceOfBirthForm";
import AddressForm from "./forms/AddressForm";
import ContactForm from "./forms/ContactForm";
import EmailLanguageForm from "./forms/EmailLanguageForm";
import ReligionHobbiesForm from "./forms/ReligionHobbiesForm";
import EducationQualificationForm from "./forms/EducationQualificationForm";
import MaritalStatusForm from "./forms/MaritalStatusForm";
import SiblingsAndGlassesForm from "./forms/SiblingsAndGlassesForm";
import NursingSkillsForm from "./forms/NursingSkillsForm";
import TattooAndHabitsForm from "./forms/TattooAndHabitsForm";
import LocationAndWorkForm from "./forms/LocationAndWorkForm";
import CaseHandleForm from "./forms/CaseHandleForm";
import TitleCenterForCvForm from "@/Components/Typo/TitleCenterForCvForm";

const PersonalInfo = ({
    onNext,
    data,
    setData,
    handleChange,
    handleCheckboxChange,
    saveData,
}) => {
    const [step, setStep] = useState(1);
    const totalSteps = 14;

    // These next steps functions are only use in this component, not from parent component
    const handleNext = () => {
        if (step < 14) {
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
            onBack();
        }
    };

    return (
        <>
            <TitleCenterForCvForm>
                Personal Information{" "}
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
                    <NameAndDOBForm data={data} handleChange={handleChange} />
                )}
                {step == 2 && (
                    <GenderHeightWeightForm
                        data={data}
                        handleChange={handleChange}
                        handleCheckboxChange={handleCheckboxChange}
                    />
                )}
                {step == 3 && (
                    <PlaceOfBirthForm data={data} handleChange={handleChange} />
                )}

                {step == 4 && (
                    <AddressForm data={data} handleChange={handleChange} />
                )}

                {step == 5 && (
                    <ContactForm data={data} handleChange={handleChange} />
                )}

                {step == 6 && (
                    <EmailLanguageForm
                        data={data}
                        setData={setData}
                        handleChange={handleChange}
                    />
                )}

                {step == 7 && (
                    <ReligionHobbiesForm
                        data={data}
                        handleChange={handleChange}
                    />
                )}

                {step == 8 && (
                    <EducationQualificationForm
                        data={data}
                        handleChange={handleChange}
                    />
                )}

                {step == 9 && (
                    <MaritalStatusForm
                        data={data}
                        handleChange={handleChange}
                    />
                )}

                {step == 10 && (
                    <SiblingsAndGlassesForm
                        data={data}
                        handleChange={handleChange}
                    />
                )}

                {step == 11 && (
                    <NursingSkillsForm
                        data={data}
                        handleChange={handleChange}
                    />
                )}
                {step == 12 && (
                    <CaseHandleForm data={data} handleChange={handleChange} />
                )}

                {step == 13 && (
                    <TattooAndHabitsForm
                        data={data}
                        handleChange={handleChange}
                    />
                )}

                {step == 14 && (
                    <LocationAndWorkForm
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
