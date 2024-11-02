import React, { useEffect, useState } from "react";
import {
    Stepper,
    Step,
    StepLabel,
    Typography,
    Box,
    Divider,
    StepButton,
    Container,
} from "@mui/material";
import { Head, router, useForm } from "@inertiajs/react";
import PersonalInfo from "@/Pages/CV/components/PersonalInfo";
import MedicalHistory from "@/Pages/CV/components/MedicalHistory";
import RequiredDocuments from "@/Pages/CV/components/RequiredDocument";
import JobPreference from "@/Pages/CV/components/JobPreference";
import AppLayout from "@/Layouts/AppLayout";
import Title from "@/Components/Typo/Title";

const steps = [
    "Personal Information",
    "Medical History/Dietary Restrictions",
    "Required Documents",
    "Job Preference",
];

function CreateCV({
    resume,
    photoUrl,
    videoUrl,
    passportUrl,
    eduCertUrl,
    idUrl,
    familyRecordUrl,
    refLetterUrl,
}) {
    const [completedSteps, setCompletedSteps] = useState({});

    const { data, setData, post, errors, processing } = useForm({
        currentStep: 0,
        // ----- PersonalInfo.jsx --------
        // NameAndDOBForm component
        full_name: "",
        date_of_birth: "",
        //GenderHeightWeightForm
        gender: "",
        height: "",
        weight: "",
        // PlaceOfBirthForm
        place_of_birth: "",
        nationality: "",
        // AddressRepatriationForm
        residential_address: "",
        repatriation_port: "",
        // ContactForm
        emergency_contact: "",
        whatsapp_number: "",
        // EmailLanguageForm
        email: "",
        language: [],
        // ReligionHobbiesForm
        religion: "",
        hobbies: [],
        other_hobbies: "",
        // EducationQualificationForm
        education_level: "",
        caregiver_qualification: "",
        // MaritalStatusForm
        marital_status: "",
        number_of_children: "", // Number of children and how old are they?
        // SiblingsAndGlassesForm
        number_of_siblings: "",
        wears_glasses: "",
        // NursingSkillsAndDiagnosisForm
        nursing_skills: [],
        diagnosis: [],
        // TattooAndHabitsForm
        has_tattoo: "",
        habits: [],
        other_habits: "",
        // LocationAndWorkForm
        current_location: "",

        worked_in_singapore: "",
        // ExperienceForm
        experience: "",
        transfer_form: "",
        years_experience: "",
        months_experience: "",
        // SummaryForm
        summary: "",
        salary: null,
        // ----- End of PersonalInfo -------
        // ----- Medical Histories --------
        // PastIllnessesForm
        past_illnesses: [],
        other_illness: "",
        // AllergiesPhysicalDisabilitiesForm
        allergies: "",
        physical_disability: "",
        // DietaryFoodHandlingForm
        dietary_restrictions: [],
        other_dietary_restrictions: "",
        food_handling: [],
        other_food_handling: "",
        // ----- End of Medical Histories -----
        // ----- RequiredDocuments -------
        // ProfileUploadForm
        photo: null, // profile photo is handled by uploadPhoto in CaregiverController, route is cgUploadPhoto
        video: null, // introduction videos is handled by uploadVideo in CaregiverController, route is cgUploadVideo
        // passport and personal id upload to storage foler and handle by uploadDocument and uploadPersonalID in caregiver controller
        passport: null,
        education_certificate: null,
        citizenship_certificate: null,
        family_member_record: null,
        reference_letter: null,
        // ----- End of Required documents -----
        // ----- JobPreference --------
        // RestDayPreferenceForm
        preferred_rest_days_per_month: "",
        preferred_rest_day: "",
        // PreferredAnnualLeaveForm
        annual_leave: "",
        leave_remarks: "",
        // GenderPatientConditionForm
        gender_of_patient: "",
        patient_conditions: [],
    });

    useEffect(() => {
        if (resume) {
            setData({
                ...data,
                full_name: resume.full_name || "",
                date_of_birth: resume.date_of_birth || "",
                gender: resume.gender || "",
                height: resume.height || "",
                weight: resume.weight || "",
                place_of_birth: resume.place_of_birth || "",
                nationality: resume.nationality || "",
                residential_address: resume.residential_address || "",
                repatriation_port: resume.repatriation_port || "",
                emergency_contact: resume.emergency_contact || "",
                whatsapp_number: resume.whatsapp_number || "",
                email: resume.email || "",
                language: resume.language || [],
                religion: resume.religion || "",
                hobbies: resume.hobbies || [],
                other_hobbies: resume.other_hobbies || "",
                education_level: resume.education_level || "",
                caregiver_qualification: resume.caregiver_qualification || "",
                marital_status: resume.marital_status || "",
                number_of_children: resume.number_of_children || "",
                number_of_siblings: resume.number_of_siblings || "",
                wears_glasses: resume.wears_glasses || "",
                nursing_skills: resume.nursing_skills || [],
                diagnosis: resume.diagnosis || [],
                has_tattoo: resume.has_tattoo || "",
                habits: resume.habits || [],
                other_habits: resume.other_habits || "",
                current_location: resume.current_location || "",
                worked_in_singapore: resume.worked_in_singapore || "",
                experience: resume.experience || "",
                transfer_form: resume.transfer_form || "",
                years_experience: resume.years_experience || "",
                months_experience: resume.months_experience || "",
                summary: resume.summary || "",
                salary: resume.salary || "",
                past_illnesses: resume.past_illnesses || [],
                other_illness: resume.other_illness || "",
                allergies: resume.allergies || "",
                physical_disability: resume.physical_disability || "",
                dietary_restrictions: resume.dietary_restrictions || [],
                other_dietary_restrictions:
                    resume.other_dietary_restrictions || "",
                food_handling: resume.food_handling || [],
                other_food_handling: resume.other_food_handling || "",
                photo: resume.photo || null,
                video: resume.video || null,
                passport: resume.passport || null,
                education_certificate: resume.education_certificate || null,
                citizenship_certificate: resume.citizenship_certificate || null,
                family_member_record: resume.family_member_record || null,
                reference_letter: resume.reference_letter || null,
                preferred_rest_days_per_month:
                    resume.preferred_rest_days_per_month || "",
                preferred_rest_day: resume.preferred_rest_day || "",
                annual_leave: resume.annual_leave || "",
                leave_remarks: resume.leave_remarks || "",
                gender_of_patient: resume.gender_of_patient || "",
                patient_conditions: resume.patient_conditions || [],
            });
        }

        // Mark previous steps as completed if current_step is greater than 0
        if (resume?.current_step > 0) {
            const completed = {};
            for (let i = 0; i <= resume.current_step; i++) {
                completed[i] = true; // Mark step as completed
            }
            setCompletedSteps(completed);
        }
    }, []);

    // Mark the current step as completed
    const markStepAsCompleted = (step) => {
        setCompletedSteps((prevCompleted) => ({
            ...prevCompleted,
            [step]: true,
        }));
    };

    const handleChange = (field) => (event) => {
        setData((prevData) => ({
            ...prevData,
            [field]: event.target.value,
        }));
    };

    const handlePhoneChange = (name, phone) => {
        setData((prevData) => ({
            ...prevData,
            [name]: phone,
        }));
    };

    const handleNext = async () => {
        await saveData();
        setData((prevData) => ({
            ...prevData,
            currentStep: prevData.currentStep + 1,
        }));

        // Mark the step as completed
        markStepAsCompleted(data.currentStep);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBack = () => {
        setData((prevData) => ({
            ...prevData,
            currentStep: prevData.currentStep - 1,
        }));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleStep = (step) => () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setData((prevData) => ({ ...prevData, currentStep: step }));
    };

    const handleFormSubmit = async (data) => {
        await saveData();
    };

    const saveData = async () => {
        try {
            post(route("saveData"), data);
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    const renderStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return (
                    <PersonalInfo
                        onNext={handleNext}
                        data={data}
                        setData={setData}
                        handleChange={handleChange}
                        handlePhoneChange={handlePhoneChange}
                    />
                );

            case 1:
                return (
                    <MedicalHistory
                        onNext={handleNext}
                        onBack={handleBack}
                        handleChange={handleChange}
                        data={data}
                        handleBack={handleBack}
                    />
                );

            case 2:
                return (
                    <RequiredDocuments
                        onNext={handleNext}
                        onBack={handleBack}
                        onFormSubmit={handleFormSubmit}
                        data={data}
                        setData={setData}
                        handleBack={handleBack}
                        handleChange={handleChange}
                        oldPhoto={photoUrl}
                        oldVideo={videoUrl}
                        oldPassport={passportUrl}
                        oldEduCert={eduCertUrl}
                        oldId={idUrl}
                        oldFamilyRecord={familyRecordUrl}
                        oldRefLetter={refLetterUrl}
                    />
                );

            case 3:
                return (
                    <JobPreference
                        onNext={handleNext}
                        onBack={handleBack}
                        onFormSubmit={handleFormSubmit}
                        data={data}
                        setData={setData}
                        handleBack={handleBack}
                        handleChange={handleChange}
                    />
                );

            default:
                return;
        }
    };
    return (
        <AppLayout>
            <Head title="Fill CV form" />
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Title>Fill Your CV</Title>
                <Stepper
                    nonLinear
                    activeStep={data.currentStep}
                    alternativeLabel
                    sx={{
                        display: { xs: "none", sm: "none", md: "flex" },
                        mb: 3,
                    }}
                >
                    {steps.map((label, index) => (
                        <Step
                            key={label}
                            completed={completedSteps[index] || false}
                        >
                            <StepButton
                                color="inherit"
                                onClick={handleStep(index)}
                            >
                                <Typography
                                    fontFamily={"Abel"}
                                    fontSize={14}
                                    fontWeight={"bold"}
                                >
                                    {label}
                                </Typography>
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <Box sx={{ px: 2 }}>
                    {renderStepContent(data.currentStep)}
                    {data.currentStep == 4 && (
                        <Box sx={{ textAlign: "center" }}>
                            <TitleCenter>
                                You have completed all steps in creating Resume.
                            </TitleCenter>
                            <BodyText>
                                Wait for admin to approve your resume.
                            </BodyText>
                        </Box>
                    )}
                </Box>
            </Container>
        </AppLayout>
    );
}

export default CreateCV;
