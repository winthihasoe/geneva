import BackButton from "@/Components/BackButton";
import NoData from "@/Components/util/NoData";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { Box, Container, Typography } from "@mui/material";
import React from "react";
import PatientTable from "./components/PatientTable";

function PatientSearchResult({ searchTerm, searchResults }) {
    return (
        <AdminLayout>
            <Head title="Search Result" />
            <Container maxWidth="lg" sx={{ pb: 0, px: { xs: 1.5, sm: 2 } }}>
                <Box sx={{ my: 3 }}>
                    <Typography variant="h6">
                        <BackButton /> Search Results for "{searchTerm}"
                    </Typography>
                </Box>
                <Box sx={{ minWidth: 0 }}>
                    {searchResults.length > 0 ? (
                        <PatientTable patients={searchResults} />
                    ) : (
                        <NoData />
                    )}
                </Box>
            </Container>
        </AdminLayout>
    );
}

export default PatientSearchResult;
