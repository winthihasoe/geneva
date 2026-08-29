import AdminResumeTable from "@/Components/Admin/CV/AdminResumeTable";
import BackButton from "@/Components/BackButton";
import NoData from "@/Components/util/NoData";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { Box, Container, Typography } from "@mui/material";
import React from "react";
import AdminJobApplyTable from "./components/AdminJobApplyTable";

function JobApplySearchResult({ searchTerm, searchResults }) {
    return (
        <AdminLayout>
            <Head title="Search Result" />
            <Container maxWidth="md">
                <Box sx={{ my: 3 }}>
                    <Typography variant="h6">
                        <BackButton /> Search Results for "{searchTerm}"
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        gap: 2,
                        mb: 4,
                    }}
                >
                    {searchResults.length > 0 ? (
                        <AdminJobApplyTable applications={searchResults} />
                    ) : (
                        <NoData />
                    )}
                </Box>
            </Container>
        </AdminLayout>
    );
}

export default JobApplySearchResult;
