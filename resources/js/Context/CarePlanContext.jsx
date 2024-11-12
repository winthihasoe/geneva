import axios from "axios";
import React, { createContext, useState } from "react";

// Create the context
export const CarePlanContext = createContext();

// Provider component
export const CarePlanProvider = ({ children, carePlan }) => {
    // const storedCarePlanData = JSON.parse(localStorage.getItem("carePlanData"));
    const [carePlanData, setCarePlanData] = useState(() => ({
        care_type: carePlan?.care_type || "",
        start_date: carePlan?.start_date || "",
        duration: carePlan?.duration || "",
        preferred_language: carePlan?.preferred_language || "",
        service_type: carePlan?.service_type || "",
        care_recipient_info: carePlan?.care_recipient_info || {
            name: "",
            date_of_birth: "",
            age: "",
            weight: "",
            height: "",
            gender: "",
            home_address: "",
            phone_number: "",
            otp: "",
            baby_medical_condition: "",
            allergies: "",
        },
        contact_info: carePlan?.contact_info || {
            name: "",
            relationship: "",
            phone_number: "",
            email: "",
            line_id: "",
        },
        preferences: carePlan?.preferences || {
            age: "",
            religion: "",
            nationality: "",
            language: "",
            experience: "",
            communication: "",
        },
        services: carePlan?.services || [],
        medical_conditions: carePlan?.medical_conditions || [],
        schedule: carePlan?.schedule || {
            package: "",
            duty_time: "",
        },
        additional_note: carePlan?.additional_note || "",
        current_step: carePlan?.current_step || 0,
        care_plan_id: carePlan?.care_plan_id || "",
    }));

    console.log(carePlanData);

    // Save carePlanData to local storage whenever it changes
    // useEffect(() => {
    //     localStorage.setItem("carePlanData", JSON.stringify(carePlanData));
    // }, [carePlanData]);

    // Function to update care plan fields
    const updateCarePlan = (field, value) => {
        setCarePlanData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    // Function to update nested JSON data
    const updateNestedField = (section, field, value) => {
        setCarePlanData((prevData) => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [field]: value,
            },
        }));
    };

    // Function to submit the care plan data
    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                route("plan.store"),
                carePlanData
            );

            if (response.status === 200 && response.data.care_plan_id) {
                setCarePlanData((prevData) => ({
                    ...prevData,
                    care_plan_id: response.data.care_plan_id,
                }));
            }
        } catch (error) {
            console.error("Error saving care plan:", error);
        }
    };

    return (
        <CarePlanContext.Provider
            value={{
                carePlanData,
                updateCarePlan,
                updateNestedField,
                handleSubmit,
            }}
        >
            {children}
        </CarePlanContext.Provider>
    );
};
