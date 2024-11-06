import AppLayout from "@/Layouts/AppLayout";
import React from "react";
import MultiStepForm from "./components/MultiStepForm";

function NewbornCare({ service }) {
    return (
        <AppLayout>
            <MultiStepForm service={service} />
        </AppLayout>
    );
}

export default NewbornCare;
