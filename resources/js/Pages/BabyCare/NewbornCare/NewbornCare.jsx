import AppLayout from "@/Layouts/AppLayout";
import React, { useContext, useEffect } from "react";
import MultiStepForm from "./components/MultiStepForm";
import { CaregiverProvider } from "@/Context/CaregiverContext";
import { Head, usePage } from "@inertiajs/react";
import { CarePlanContext } from "@/Context/CarePlanContext";

function NewbornCare({ service, caregivers, basicSkills, advSkills }) {
    const { carePlanData, updateCarePlan, updateNestedField } =
        useContext(CarePlanContext);
    const email = usePage().props.auth.user.email;
    useEffect(() => {
        updateCarePlan("care_type", "Baby");
        updateCarePlan("service_type", "Newborn Care");
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
