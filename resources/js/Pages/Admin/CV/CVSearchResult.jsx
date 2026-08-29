import AdminResumeTable from "@/Components/Admin/CV/AdminResumeTable";
import BackButton from "@/Components/BackButton";
import NoData from "@/Components/util/NoData";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { Box, Container, Typography } from "@mui/material";
import React from "react";

function CVSearchResult({ searchTerm, searchResults }) {
    console.log("search result", searchResults);

    return (
        <AdminLayout>
            <Head title="Search Result" />
            <Container maxWidth="md">
                <Box sx={{ my: 3 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
                    >
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
                        <AdminResumeTable cvs={searchResults} />
                    ) : (
                        <NoData />
                    )}
                </Box>
            </Container>
        </AdminLayout>
    );
}

export default CVSearchResult;
