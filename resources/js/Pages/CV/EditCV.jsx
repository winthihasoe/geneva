import React from "react";
import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { CvProvider } from "@/Context/CvContext";
import StartEditCV from "./components/StartEditCV";

function EditCV({
    newbornBasicCare,
    newbornAdvancedCare,
    nannyBasicCare,
    nannyAdvancedCare,
    elderBasicCare,
    elderAdvancedCare,
}) {
    const { cvData } = usePage().props;

    return (
        <CvProvider
            initialData={cvData || {}}
            newbornBasicCare={newbornBasicCare}
            newbornAdvancedCare={newbornAdvancedCare}
            nannyBasicCare={nannyBasicCare}
            nannyAdvancedCare={nannyAdvancedCare}
            elderBasicCare={elderBasicCare}
            elderAdvancedCare={elderAdvancedCare}
        >
            <AppLayout>
                <Head title="Fill CV form" />
                <StartEditCV />
            </AppLayout>
        </CvProvider>
    );
}

export default EditCV;
