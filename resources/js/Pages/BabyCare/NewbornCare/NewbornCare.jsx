import AppLayout from "@/Layouts/AppLayout";
import React, { useContext, useEffect } from "react";
import MultiStepForm from "./components/MultiStepForm";
import { CaregiverProvider } from "@/Context/CaregiverContext";
import { Head, usePage } from "@inertiajs/react";
import { CarePlanContext } from "@/Context/CarePlanContext";

function NewbornCare({ service, caregivers, basicSkills, advSkills }) {
    const { carePlanData, resetCarePlan, updateCarePlan, updateNestedField } =
        useContext(CarePlanContext);
    const email = usePage().props.auth.user.email;
    useEffect(() => {
        // Clear the care plan data when starting a new care plan
        if (carePlanData.service_type !== "Newborn Care") {
            resetCarePlan();

            updateCarePlan("care_type", "Baby");
            updateCarePlan("service_type", "Newborn Care");
        }
        updateNestedField("contact_info", "email", email);
    }, []);
    return (
        <AppLayout>
            <Head title="Newborn Care" />
            <CaregiverProvider initialCaregivers={caregivers}>
                <MultiStepForm
                    service={service}
                    basicSkills={basicSkills}
                    advSkills={advSkills}
                />
            </CaregiverProvider>
        </AppLayout>
    );
}

export default NewbornCare;
