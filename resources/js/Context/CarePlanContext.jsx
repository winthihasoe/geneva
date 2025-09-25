import axios from "axios";
import { max } from "lodash";
import React, { createContext, useState } from "react";

// Create the context
export const CarePlanContext = createContext();

// Provider component
export const CarePlanProvider = ({ children, carePlan }) => {
    const initialCarePlanData = {
        care_type: "", // Baby, Elder, Maternal
        start_date: "",
        duration: 30,
        preferred_language: "",
        service_type: "", // Basic Care, Basic + Medical Care
        care_recipient_info: {
            name: "",
            age: "",
            weight: "",
            height: "",
            gender: "",
            phone_number: "",
            email: "",
            line_id: "",
            home_address: "",
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
            minimum_age: "",
            maximum_age: "",
            religion: [], // Array for multiple selections
            nationality: [], // Array for multiple selections
            minimum_weight: "",
            maximum_weight: "",
            minimum_height: "",
            maximum_height: "",
            qualification: [], // Array for multiple selections
            experience: [], // Array for multiple selections
            personality: [], // Array for multiple selections
        },
        services: [],
        medical_conditions: [],
        schedule: {
            package: "",
            duty: "",
        },
        care_plan_id: "",
    };

    const initialCarePlanDataOld = {
        care_type: "", // Baby, Elder, Maternal
        start_date: "",
        duration: 1,
        preferred_language: "",
        service_type: "", // Newborn Care, Nanny Service, Nanny Care + Maid Service, Elder Care, Elder Care + Maid Service
        care_recipient_info: {
            name: "",
            // date_of_birth: "",
            age: "",
            weight: "",
            height: "",
            gender: "",
            home_address: "",
            // phone_number: "",
            // baby_medical_condition: "",
            // allergies: "",
        },
        contact_info: {
            name: "",
            relationship: "",
            phone_number: "",
            // email: "",
            // line_id: "",
        },
        preferences: {
            age: "",
            minimum_age: "",
            maximum_age: "",
            religion: "",
            nationality: "",
            minimum_weight: "",
            maximum_weight: "",
            minimum_height: "",
            maximum_height: "",
            // language: "",
            qualification: "",
            experience: "",
            // communication: "",
            personality: "",
        },
        services: [], // Needed nursing skills
        medical_conditions: [],
        // other_medical_conditions: "",
        // mobilities: "",
        // memory: "",
        // alertness: "",
        schedule: {
            package: "",
            duty: "",
        },
        // additional_notes: "",
        // current_step: 1,
        care_plan_id: "",
    };

    // const storedCarePlanData = JSON.parse(localStorage.getItem("carePlanData"));
    const [carePlanData, setCarePlanData] = useState(initialCarePlanData);
    const [responseMessage, setResponseMessage] = useState("");

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
                responseMessage,
            }}
        >
            {children}
        </CarePlanContext.Provider>
    );
};
