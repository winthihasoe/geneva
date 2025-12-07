import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { CvProvider } from "@/Context/CvContext";
import StartCreateCV from "@/Pages/CV/components/StartCreateCV";
import AdminLayout from "@/Layouts/AdminLayout";
import { useEffect } from "react";

function AdminEditCV({
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
            <AdminLayout>
                <Head title="Create CV Form" />
                <StartCreateCV />
            </AdminLayout>
        </CvProvider>
    );
}

export default AdminEditCV;
