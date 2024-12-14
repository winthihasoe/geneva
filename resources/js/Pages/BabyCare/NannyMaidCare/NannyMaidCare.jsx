import { CaregiverProvider } from "@/Context/CaregiverContext";
import AppLayout from "@/Layouts/AppLayout";
import { Head, usePage } from "@inertiajs/react";
import { Container } from "@mui/material";
import React, { useContext, useEffect } from "react";
import MultiStepForm from "./components/MultiStepForm";
import { CarePlanContext } from "@/Context/CarePlanContext";

function NannyMaidCare({
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
        if (carePlanData.service_type !== "Nanny Care + Maid Service") {
            resetCarePlan();
            updateCarePlan("care_type", "Baby");
            updateCarePlan("service_type", "Nanny Care + Maid Service");
        }
        updateNestedField("contact_info", "email", email);
    }, []);
    return (
        <AppLayout>
            <Head title="Nanny + Maid Service" />

            <Container maxWidth="lg">
                <CaregiverProvider initialCaregivers={caregivers}>
                    <MultiStepForm
                        service={service}
                        basicSkills={basicSkills}
                        advSkills={advSkills}
                        maidServices={maidServices}
                    />
                </CaregiverProvider>
            </Container>
        </AppLayout>
    );
}

export default NannyMaidCare;
