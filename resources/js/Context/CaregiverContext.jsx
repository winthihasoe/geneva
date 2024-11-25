import React, { createContext, useState, useEffect, useContext } from "react";
import { CarePlanContext } from "./CarePlanContext";
import dayjs from "dayjs";

// Function to calculate age based on date of birth
const calculateAge = (dateOfBirth) => {
    const birthDate = dayjs(dateOfBirth);
    const today = dayjs();
    return today.diff(birthDate, "year");
};

// Helper function to convert experience string to years
const experienceToYears = (experience) => {
    switch (experience) {
        case "More than 5 years":
            return 5;
        case "More than 3 years":
            return 3;
        case "More than 2 years":
            return 2;
        case "Less than 2 years":
            return 1;
        default:
            return 0;
    }
};

// Function to check if caregiver's experience matches the required level
const checkExperience = (serviceType, caregiver, requiredExperience) => {
    let caregiverExperience;

    // Map service type to caregiver experience field
    switch (serviceType) {
        case "Newborn Care":
            caregiverExperience = caregiver.newborn_experience_years;
            break;
        case "Nanny":
            caregiverExperience = caregiver.nanny_experience_years;
            break;
        case "Elder Care":
            caregiverExperience = caregiver.elder_experience_years;
            break;
        case "Elder Care + Maid Service":
            caregiverExperience = caregiver.elder_experience_years;
            break;
        default:
            return false;
    }

    // Convert caregiver experience and required experience to comparable years
    const caregiverYears = experienceToYears(caregiverExperience);
    const requiredYears = experienceToYears(requiredExperience);

    // Check if caregiver meets or exceeds the required experience
    return caregiverYears >= requiredYears;
};

// Create the context
export const CaregiverContext = createContext();

// Provider component for Caregivers
export const CaregiverProvider = ({ children, initialCaregivers = [] }) => {
    // State to store caregivers
    const [caregivers, setCaregivers] = useState(initialCaregivers);
    const [filteredCaregivers, setFilteredCaregivers] =
        useState(initialCaregivers);
    console.log("filtered caregiver", filteredCaregivers);

    // Use CarePlanContext to access the carePlanData for filtering
    const { carePlanData } = useContext(CarePlanContext);

    // Function to filter caregivers based on carePlanData
    const filterCaregivers = () => {
        // Extract relevant fields from carePlanData
        const { service_type, preferences, schedule, duration } = carePlanData;
        const {
            age: agePreference,
            nationality: preferredNationality,
            experience: requiredExperience,
        } = preferences;
        const { package: carePlanPackage } = schedule;

        const filtered = caregivers.filter((caregiver) => {
            // Check if the caregiver falls within the preferred age range
            let ageMatch = true; // default to true if no specific age range is provided
            if (agePreference == "< 30 years old") {
                const caregiverAge = calculateAge(caregiver.date_of_birth);
                ageMatch = caregiverAge < 30;
            } else if (agePreference == "> 30 years old") {
                const caregiverAge = calculateAge(caregiver.date_of_birth);
                ageMatch = caregiverAge > 30;
            } else {
                ageMatch = true;
            }

            // Check if the caregiver has the required experience level
            const experienceMatch =
                requiredExperience &&
                checkExperience(service_type, caregiver, requiredExperience);

            // Check if the package matches
            const packageMatch =
                carePlanPackage && caregiver.package === carePlanPackage;

            // Check if the duration matches
            const durationMatch = duration && caregiver.duration === duration;

            // Check if nationality matches
            const nationalityMatch =
                preferredNationality &&
                caregiver.nationality &&
                caregiver.nationality.toLowerCase() ===
                    preferredNationality.toLowerCase();

            // Select the caregiver if any of the conditions are true
            return (
                ageMatch ||
                experienceMatch ||
                packageMatch ||
                durationMatch ||
                nationalityMatch
            );
        });

        setFilteredCaregivers(filtered);
    };

    // Effect to re-filter caregivers when carePlanData or caregivers list changes
    useEffect(() => {
        filterCaregivers();
        if (filteredCaregivers.length == 0) {
            console.log("No caregivers in filter", caregivers);
        }
    }, [carePlanData, caregivers]); // Run when carePlanData or caregivers change

    return (
        <CaregiverContext.Provider
            value={{
                caregivers,
                filteredCaregivers,
                setCaregivers,
                filterCaregivers,
            }}
        >
            {children}
        </CaregiverContext.Provider>
    );
};
