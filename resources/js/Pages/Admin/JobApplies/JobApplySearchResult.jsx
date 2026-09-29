import BackButton from "@/Components/BackButton";
import NoData from "@/Components/util/NoData";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { Box, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import AdminJobApplyTable from "./components/AdminJobApplyTable";

function JobApplySearchResult({ searchTerm, searchResults }) {
    useEffect(() => {
        sessionStorage.setItem(
            "admin.job.apply.return",
            window.location.pathname + window.location.search
        );
    }, [searchTerm]);
    return (
        <AdminLayout>
            <Head title="Search Result" />
            <Container maxWidth={false} sx={{ minWidth: 0 }}>
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
