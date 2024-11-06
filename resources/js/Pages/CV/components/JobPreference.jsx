import React, { useContext, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import GenderPatientConditionForm from "./forms/GenderPatientConditionForm";
import TitleCenterForCvForm from "@/Components/Typo/TitleCenterForCvForm";
import CvContext from "@/Context/CvContext";
import { router } from "@inertiajs/react";
import CaseHandleForm from "./forms/CaseHandleForm";
import LocationAndWorkForm from "./forms/LocationAndWorkForm";
import ChildNursingSkillsForm from "./forms/ChildNursingSkillsForm";
import ElderNursingSkillsForm from "./forms/ElderNursingSkillsForm";
import ExperienceForm from "./forms/ExperienceForm";
import PackageAndPackageDurationForm from "./forms/PackageAndPackageDurationForm";
import ServiceAreaForm from "./forms/ServiceAreaForm";
import AgreeToTerms from "./forms/AgreeToTerms";

const JobPreference = () => {
    const { handleBack: onBack, data, saveData } = useContext(CvContext);
    const [step, setStep] = useState(1);
    const totalSteps = 9;

    const handleNext = async () => {
        if (step < totalSteps) {
            await saveData();
            setStep(step + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            handleSubmit();
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

    const handleSubmit = async () => {
        try {
            // Send the request using Axios
            const response = await axios.post(route("cv.store"), data);

            if (response.data.message === "Data saved...") {
                router.get(route("cv.finish"));
            }
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    // Validation function for each step
    const validateStep = () => {
        switch (step) {
            case 1:
                return data.gender_of_patient && data.services.length > 0;

            case 2:
                return data.nursing_skills_for_child.length > 2;
            case 3:
                return data.nursing_skills_for_elder.length > 2;
            case 4:
                return (
                    data.newborn_experience_years &&
                    data.nanny_experience_years &&
                    data.elder_experience_years
                );

            case 6:
                return data.current_location && data.worked_in_thailand;
            case 7:
                return (
                    data.package_duration.length > 0 && data.package.length > 0
                );
            case 8:
                return data.service_area;
            case 9:
                return data.agree_to_terms;

            default:
                return true;
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
                    boxShadow: { xs: 0, sm: 2 },
                    borderRadius: 10,
                    p: { xs: 1, sm: 2, md: 3 },
                    maxWidth: 500,
                    margin: "auto",
                    border: {
                        xs: "none",
                        sm: "2px solid #21875C",
                    },
                }}
            >
                {step == 1 && <GenderPatientConditionForm />}
                {step === 2 && <ChildNursingSkillsForm />}
                {step === 3 && <ElderNursingSkillsForm />}
                {step == 4 && <ExperienceForm />}
                {step === 5 && <CaseHandleForm />}
                {step === 6 && <LocationAndWorkForm />}
                {step === 7 && <PackageAndPackageDurationForm />}
                {step === 8 && <ServiceAreaForm />}
                {step === 9 && <AgreeToTerms />}
            </Box>

            <Box
                sx={{ display: "flex", mt: 3, justifyContent: "space-between" }}
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
                    onClick={handleNext}
                    size="small"
                    sx={{ borderRadius: 20 }}
                    disabled={!validateStep()}
                >
                    <Typography
                        fontFamily={"Lilita One"}
                        fontWeight={500}
                        fontSize={17}
                    >
                        {step < totalSteps ? "Next" : "Submit"}
                    </Typography>
                </Button>
            </Box>
        </>
    );
};

export default JobPreference;
