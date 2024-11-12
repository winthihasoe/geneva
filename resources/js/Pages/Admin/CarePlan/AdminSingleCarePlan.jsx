import Title from "@/Components/Typo/Title";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { Container } from "@mui/material";
import React from "react";

function AdminSingleCarePlan({ carePlan }) {
    console.log("Care Plan", carePlan);

    return (
        <AdminLayout>
            <Head title="Care Plan" />
            <Container maxWidth="lg">
                <Title>Care Plan</Title>
            </Container>
        </AdminLayout>
    );
}

export default AdminSingleCarePlan;
