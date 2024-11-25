import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";
import CaregiverAndJobApplies from "./components/CaregiverAndJobApplies";

function Dashboard({ totalCaregivers, totalJobApplies }) {
    return (
        <AdminLayout>
            <CaregiverAndJobApplies
                totalCaregivers={totalCaregivers}
                totalJobApplies={totalJobApplies}
            />
        </AdminLayout>
    );
}

export default Dashboard;
