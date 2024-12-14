import axios from "axios";
import React, { createContext, useState } from "react";

// Create the context
export const CarePlanContext = createContext();

// Provider component
export const CarePlanProvider = ({ children, carePlan }) => {
    const initialCarePlanData = {
        care_type: "",
        start_date: "",
        duration: "",
        preferred_language: "",
        service_type: "", // Newborn Care, Nanny Service, Nanny Care + Maid Service, Elder Care, Elder Care + Maid Service
        care_recipient_info: {
            name: "",
            date_of_birth: "",
            age: "",
            weight: "",
            height: "",
            gender: "",
            home_address: "",
            phone_number: "",
            baby_medical_condition: "",
            allergies: "",
        },
        contact_info: {
            name: "",
            relationship: "",
            phone_number: "",
            email: "",
            line_id: "",
        },
        preferences: {
            age: "",
            religion: "",
            nationality: "",
            language: "",
            experience: "",
            communication: "",
        },
        services: [],
        medical_conditions: [],
        other_medical_conditions: "",
        mobilities: "",
        memory: "",
        alertness: "",
        schedule: {
            package: "",
            duty_time: "",
        },
        additional_notes: "",
        current_step: 0,
        care_plan_id: "",
    };
    // const storedCarePlanData = JSON.parse(localStorage.getItem("carePlanData"));
    const [carePlanData, setCarePlanData] = useState(initialCarePlanData);

    // Function to reset the care plan data
    const resetCarePlan = () => {
        setCarePlanData(initialCarePlanData);
    };

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
                resetCarePlan,
            }}
        >
            {children}
        </CarePlanContext.Provider>
    );
};
