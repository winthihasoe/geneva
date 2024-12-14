import { CaregiverProvider } from "@/Context/CaregiverContext";
import AppLayout from "@/Layouts/AppLayout";
import { Head, usePage } from "@inertiajs/react";
import React, { useContext, useEffect } from "react";
import { Container } from "@mui/material";
import { CarePlanContext } from "@/Context/CarePlanContext";
import MultiStepForm from "./components/MultiStepForm";

function CaregiverMaid({
    service,
    caregivers,
    basicSkills,
    advSkills,
    maidServices,
}) {
    const { carePlanData, resetCarePlan, updateCarePlan, updateNestedField } =
        useContext(CarePlanContext);
    const email = usePage().props.auth.user.email;
    useEffect(() => {
        if (carePlanData.service_type !== "Elder Care + Maid Service") {
            resetCarePlan();
            updateCarePlan("care_type", "Elder");
            updateCarePlan("service_type", "Elder Care + Maid Service");
        }
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
                    maidServices={maidServices}
                />
            </CaregiverProvider>
        </AppLayout>
    );
}

export default CaregiverMaid;
