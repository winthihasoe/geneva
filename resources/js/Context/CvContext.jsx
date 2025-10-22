import { router } from "@inertiajs/react";
import axios from "axios";
import React, { createContext, useState } from "react";

// Create the context
const CvContext = createContext();

// Create a provider component
export const CvProvider = ({
    children,
    initialData = {},
    newbornBasicCare,
    newbornAdvancedCare,
    nannyBasicCare,
    nannyAdvancedCare,
    elderBasicCare,
    elderAdvancedCare,
}) => {
    // Merge `initialData` with default values
    const [data, setData] = useState({
        ha_id: initialData.ha_id || "",
        // Personal Info
        full_name: initialData.full_name || "",
        nickname: initialData.nickname || "",
        introduction: initialData.introduction || "",
        date_of_birth: initialData.date_of_birth || "",
        gender: initialData.gender || "",
        height: initialData.height || null,
        weight: initialData.weight || null,
        place_of_birth: initialData.place_of_birth || "",
        nationality: initialData.nationality || "",
        other_nationality: initialData.other_nationality || "",
        religion: initialData.religion || "",
        language: initialData.language || [],
        hobbies: initialData.hobbies || [],
        other_hobbies: initialData.other_hobbies || "",
        wears_glasses: initialData.wears_glasses || "",
        has_tattoo: initialData.has_tattoo || "",
        habits: initialData.habits || [],
        other_habits: initialData.other_habits || "",
        personality: initialData.personality || "", // Newly added

        // Contact Information
        email: initialData.email || "",
        line: initialData.line || "",
        phone: initialData.phone || "",
        emergency_contact: initialData.emergency_contact || "",
        phone_verify_at: initialData.phone_verify_at || "",
        current_address: initialData.current_address || "",
        residential_address: initialData.residential_address || "",

        // Education and Certifications
        education_level: initialData.education_level || "",
        caregiver_qualification: initialData.caregiver_qualification || "",

        // Family and Marital Status
        marital_status: initialData.marital_status || "",
        number_of_children: initialData.number_of_children || "",
        number_of_siblings: initialData.number_of_siblings || "",
        current_location: initialData.current_location || "",
        worked_in_thailand: initialData.worked_in_thailand || "",

        // Medical History
        past_illnesses: initialData.past_illnesses || [],
        other_illness: initialData.other_illness || "",
        allergies: initialData.allergies || "",
        physical_disability: initialData.physical_disability || "",
        dietary_restrictions: initialData.dietary_restrictions || [],
        other_dietary_restrictions:
            initialData.other_dietary_restrictions || "",
        food_handling: initialData.food_handling || [],
        other_food_handling: initialData.other_food_handling || "",

        // Required Documents
        profile_photo: initialData.profile_photo || "",
        passport: initialData.passport || "",
        visa_stamp: initialData.visa_stamp || "",
        passport_number: initialData.passport_number || "",
        passport_type: initialData.passport_type || "",
        passport_expiry_date: initialData.passport_expiry_date || "", //Newly added
        visa_type: initialData.visa_type || "",
        citizenship_certificate: initialData.citizenship_certificate || "",
        family_member_record: initialData.family_member_record || "",

        // Experience Records
        newborn_experience_years: initialData.newborn_experience_years || "",
        nanny_experience_years: initialData.nanny_experience_years || "",
        elder_experience_years: initialData.elder_experience_years || "",
        detail_experience: initialData.detail_experience || "",

        gender_of_patient: initialData.gender_of_patient || "",
        // Caregiver skills
        nursing_skills_for_elder: initialData.nursing_skills_for_elder || [],
        nursing_skills_for_child: initialData.nursing_skills_for_child || [],
        types_of_patients_handled: initialData.types_of_patients_handled || [],
        other_types_of_patients_handled:
            initialData.other_types_of_patients_handled || "",
        types_of_babies_handled: initialData.types_of_babies_handled || [],
        other_types_of_babies_handled:
            initialData.other_types_of_babies_handled || "",

        // Care Information
        services: initialData.services || [],
        package: initialData.package || [],
        duty: initialData.duty || [],
        maid_service: initialData.maid_service || false,
        package_duration: initialData.package_duration || [],
        service_area: initialData.service_area || "",

        current_step: initialData.current_step || 1,
        agree_to_terms: initialData.agree_to_terms ?? false,
        training_or_assessment: initialData.training_or_assessment ?? "",
    });

    const [completedSteps, setCompletedSteps] = useState({});
    const [responseMessage, setResponseMessage] = useState(""); // New state for response message
    const [error, setError] = useState(null);

    const handleStep = (step) => () => {
        setData((prevData) => ({ ...prevData, current_step: step }));
    };

    // Mark the current step as completed
    const markStepAsCompleted = (step) => {
        setCompletedSteps((prevCompleted) => ({
            ...prevCompleted,
            [step]: true,
        }));
    };

    const handlePhoneChange = (name, phone) => {
        setData((prevData) => ({
            ...prevData,
            [name]: phone,
        }));
    };

    // Update form data
    const handleChange = (field) => (event) => {
        setData((prevData) => ({
            ...prevData,
            [field]: event.target.value,
        }));
    };

    const handleSliderChange = (language) => (event, value) => {
        const selectedValue = `${language} ${value}`;

        setData((prevData) => {
            const updatedLanguages = prevData.language.filter(
                (lang) => !lang.startsWith(language)
            );
            return {
                ...prevData,
                language: [...updatedLanguages, selectedValue],
            };
        });
    };

    // const handleNext = async () => {
    //     try {
    //         setData((prevData) => ({
    //             ...prevData,
    //             current_step: prevData.current_step + 1,
    //         }));

    //         // Mark the step as completed
    //         markStepAsCompleted(data.current_step);
    //         window.scrollTo({ top: 0, behavior: "smooth" });
    //     } catch (error) {
    //         console.error("Save failed. Please try again.");
    //     }
    // };

    // const handleBack = () => {
    //     setData((prevData) => ({
    //         ...prevData,
    //         current_step: prevData.current_step - 1,
    //     }));
    //     window.scrollTo({ top: 0, behavior: "smooth" });
    // };

    const savePhoto = async () => {
        try {
            let payload;

            // Check if any data field is a Blob (indicating a file upload)
            const containsFile = Object.values(data).some(
                (value) => value instanceof Blob
            );

            if (containsFile) {
                // Use FormData if there's at least one file in `data`
                payload = new FormData();
                for (const key in data) {
                    if (data[key] instanceof Blob) {
                        // Append Blob (file) with its original filename
                        payload.append(key, data[key], data[key].name);
                    }
                }
            }
            // Send the request using Axios
            const response = await axios.post(route("cv.store"), payload, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setResponseMessage(response.data.message);
            setTimeout(() => setResponseMessage(""), 2000); // Clear the message after 2 seconds
        } catch (error) {
            console.error("Error saving data:", error);
            setResponseMessage(
                error.response?.data?.message || "Failed to save data."
            );
            setTimeout(() => setResponseMessage(""), 2000); // Clear the message after 2 seconds
        }
    };

    // Old save function
    const saveDataVeryOld = async () => {
        try {
            // Send the request using Axios

            const response = await axios.post(route("cv.store"), data);

            setResponseMessage(response.data.message);
            setError(null);
            setTimeout(() => setResponseMessage(""), 2000); // Clear the message after 2 seconds
            return response.data.status; // Return success status
        } catch (error) {
            console.error("Error saving data:", error);
            setResponseMessage(
                error.response?.data?.message || "Failed to save data."
            );
            setError(error.response.data.error);
            setTimeout(() => setResponseMessage(""), 4000); // Clear the message after 4 seconds
        }
    };

    const saveData = async () => {
        try {
            let payload;
            let headers = {};

            // Check if any data field is a Blob (indicating a file upload)
            const containsFile = Object.values(data).some(
                (value) => value instanceof Blob || value instanceof File
            );

            if (containsFile) {
                // Use FormData if there's at least one file in `data`
                payload = new FormData();

                for (const key in data) {
                    if (
                        data[key] instanceof Blob ||
                        data[key] instanceof File
                    ) {
                        // Append Blob/File with its original filename
                        payload.append(
                            key,
                            data[key],
                            data[key].name || "file"
                        );
                    } else if (data[key] !== null && data[key] !== undefined) {
                        // Append other data as strings
                        if (Array.isArray(data[key])) {
                            payload.append(key, JSON.stringify(data[key]));
                        } else {
                            payload.append(key, data[key]);
                        }
                    }
                }
                headers["Content-Type"] = "multipart/form-data";
            } else {
                // Use regular JSON payload if no files
                payload = data;
                headers["Content-Type"] = "application/json";
            }

            const response = await axios.post(route("cv.store"), payload, {
                headers,
            });

            setResponseMessage(response.data.message);
            setError(null);
            setTimeout(() => setResponseMessage(""), 2000); // Clear the message after 2 seconds
            return response.data.status; // Return success status
        } catch (error) {
            console.error("Error saving data:", error);
            setResponseMessage(
                error.response?.data?.message || "Failed to save data."
            );
            setError(error.response?.data?.error);
            setTimeout(() => setResponseMessage(""), 4000); // Clear the message after 4 seconds
        }
    };

    const saveDataOld = async (currentStep = 1) => {
        try {
            let payload;
            let headers = {};

            // Check if any data field is a Blob (indicating a file upload)
            const containsFile = Object.values(data).some(
                (value) => value instanceof Blob || value instanceof File
            );

            if (containsFile) {
                // Use FormData if there's at least one file in `data`
                payload = new FormData();

                // Add current step
                payload.append("current_step", currentStep);

                for (const key in data) {
                    if (
                        data[key] instanceof Blob ||
                        data[key] instanceof File
                    ) {
                        // Append Blob/File with its original filename
                        payload.append(
                            key,
                            data[key],
                            data[key].name || "file"
                        );
                    } else if (data[key] !== null && data[key] !== undefined) {
                        // Append other data as strings
                        if (Array.isArray(data[key])) {
                            payload.append(key, JSON.stringify(data[key]));
                        } else {
                            payload.append(key, data[key]);
                        }
                    }
                }
                headers["Content-Type"] = "multipart/form-data";
            } else {
                // Use regular JSON payload if no files
                payload = {
                    ...data,
                    current_step: currentStep,
                };
                headers["Content-Type"] = "application/json";
            }

            // Send the request using Axios
            const response = await axios.post(route("cv.store"), payload, {
                headers,
            });

            setResponseMessage(response.data.message);
            setError(null);
            setTimeout(() => setResponseMessage(""), 3000);

            return true; // Return success
        } catch (error) {
            console.error("Error saving data:", error);
            setResponseMessage(
                error.response?.data?.message || "Failed to save data."
            );
            setError(error.response?.data?.error);
            setTimeout(() => setResponseMessage(""), 5000);

            return false; // Return failure
        }
    };

    return (
        <CvContext.Provider
            value={{
                data,
                setData,
                completedSteps,
                handleChange,
                handlePhoneChange,
                markStepAsCompleted,
                saveData,
                savePhoto,
                handleSliderChange,
                handleStep,
                responseMessage,
                newbornBasicCare,
                newbornAdvancedCare,
                nannyBasicCare,
                nannyAdvancedCare,
                elderBasicCare,
                elderAdvancedCare,
                error,
            }}
        >
            {children}
        </CvContext.Provider>
    );
};

export default CvContext;
