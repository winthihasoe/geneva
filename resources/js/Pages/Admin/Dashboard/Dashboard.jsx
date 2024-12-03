import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";
import CaregiverAndJobApplies from "./components/CaregiverAndJobApplies";
import { Grid2 } from "@mui/material";
import PatientAndContactMessage from "./components/PatientAndContactMessage";
import { Head } from "@inertiajs/react";

function Dashboard({
    totalCaregivers,
    totalJobApplies,
    totalPatients,
    totalContactMessages,
}) {
    return (
        <AdminLayout>
            <Head title="Dashboard" />
            <Grid2 container>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <CaregiverAndJobApplies
                        totalCaregivers={totalCaregivers}
                        totalJobApplies={totalJobApplies}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <PatientAndContactMessage
                        totalPatients={totalPatients}
                        totalContactMessages={totalContactMessages}
                    />
                </Grid2>
            </Grid2>
        </AdminLayout>
    );
}

export default Dashboard;
