import React, { createContext, useState } from "react";

// Create the context
export const CarePlanContext = createContext();

// Provider component
export const CarePlanProvider = ({ children }) => {
    const [carePlanData, setCarePlanData] = useState({
        user_id: null, // Set this after fetching the user, if applicable
        service: "",
        start_date: "",
        duration: "",
        preferred_language: "",
        service_type: "",
        care_recipient_info: {
            full_name: "",
            date_of_birth: "",
            age: "",
            gender: "",
        },
        contact_info: {
            full_name: "",
            relationship: "",
            phone_number: "",
            otp: "",
            email: "",
            line_id: "",
            home_address: "",
        },
        preferences: {},
        medical_conditions: {},
        schedule: {},
        additional_notes: "",
    });

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

    // Function to reset the care plan data (if needed)
    const resetCarePlan = () => {
        setCarePlanData({
            user_id: null,
            care_type: "",
            start_date: "",
            duration: "",
            preferred_language: "",
            service_type: "",
            care_recipient_info: {
                full_name: "",
                date_of_birth: "",
                age: "",
                gender: "",
            },
            contact_info: {
                full_name: "",
                relationship: "",
                phone_number: "",
                otp: "",
                email: "",
                line_id: "",
                home_address: "",
            },
            preferences: {},
            services: {},
            medical_conditions: {},
            schedule: {},
            additional_notes: "",
        });
    };

    return (
        <CarePlanContext.Provider
            value={{
                carePlanData,
                updateCarePlan,
                updateNestedField,
                resetCarePlan,
            }}
        >
            {children}
        </CarePlanContext.Provider>
    );
};
