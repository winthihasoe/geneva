import { CaregiverProvider } from "@/Context/CaregiverContext";
import AppLayout from "@/Layouts/AppLayout";
import { Head, usePage } from "@inertiajs/react";
import { Container } from "@mui/material";
import React, { useContext, useEffect } from "react";
import MultiStepForm from "./components/MultiStepForm";
import { CarePlanContext } from "@/Context/CarePlanContext";

function NannyCare({ service, caregivers, basicSkills, advSkills }) {
    const { updateCarePlan, updateNestedField } = useContext(CarePlanContext);
    const email = usePage().props.auth.user.email;
    useEffect(() => {
        updateCarePlan("care_type", "Baby");
        updateCarePlan("service_type", "Nanny Service");
        updateNestedField("contact_info", "email", email);
    }, []);
    return (
        <AppLayout>
            <Head title="Nanny Care" />

            <Container maxWidth="lg">
                <CaregiverProvider initialCaregivers={caregivers}>
                    <MultiStepForm
                        service={service}
                        basicSkills={basicSkills}
                        advSkills={advSkills}
                    />
                </CaregiverProvider>
            </Container>
        </AppLayout>
    );
}

export default NannyCare;
