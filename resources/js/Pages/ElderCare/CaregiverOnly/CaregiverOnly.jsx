import { CaregiverProvider } from "@/Context/CaregiverContext";
import AppLayout from "@/Layouts/AppLayout";
import { Head, usePage } from "@inertiajs/react";
import React, { useContext, useEffect } from "react";
import MultiStepForm from "../components/MultiStepForm";
import { Container } from "@mui/material";
import { CarePlanContext } from "@/Context/CarePlanContext";

function CaregiverOnly({ service, caregivers, basicSkills, advSkills }) {
    const { updateCarePlan, updateNestedField } = useContext(CarePlanContext);
    const email = usePage().props.auth.user.email;
    useEffect(() => {
        updateCarePlan("care_type", "Elder");
        updateCarePlan("service_type", "Elder Care");
        updateNestedField("contact_info", "email", email);
    }, []);
    return (
        <AppLayout>
            <Head title="Elder Care" />
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

export default CaregiverOnly;
