import ResumeCard from "@/Components/Admin/CV/ResumeCard";
import BackButton from "@/Components/BackButton";
import NoData from "@/Components/util/NoData";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { Box, Container, Divider, IconButton, Typography } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import React, { useEffect, useState } from "react";
import CvListSheet from "./components/CvListSheet";

const VIEW_MODE_KEY = "cvViewMode";

function CVSearchResult({ searchTerm, searchResults = [] }) {
    const [viewMode, setViewMode] = useState(() => {
        return localStorage.getItem(VIEW_MODE_KEY) || "card";
    });

    useEffect(() => {
        localStorage.setItem(VIEW_MODE_KEY, viewMode);
    }, [viewMode]);

    return (
        <AdminLayout>
            <Head title="Search Result" />
            <Container
                maxWidth={false}
                sx={{
                    pb: viewMode === "list" ? 0 : 4,
                    px: { xs: 1.5, sm: 2 },
                    minWidth: 0,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                        my: 3,
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
                    >
                        <BackButton /> Search Results for "{searchTerm}"
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexShrink: 0,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: "10px",
                            bgcolor: "background.paper",
                            overflow: "hidden",
                        }}
                    >
                        <IconButton
                            aria-label="Card view"
                            onClick={() => setViewMode("card")}
                            color={viewMode === "card" ? "primary" : "default"}
                            size="small"
                            sx={{ borderRadius: 0, width: 40, height: 40 }}
                        >
                            <ViewModuleIcon fontSize="small" />
                        </IconButton>
                        <Divider orientation="vertical" flexItem />
                        <IconButton
                            aria-label="List view"
                            onClick={() => setViewMode("list")}
                            color={viewMode === "list" ? "primary" : "default"}
                            size="small"
                            sx={{ borderRadius: 0, width: 40, height: 40 }}
                        >
                            <ViewListIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>

                {searchResults.length === 0 ? (
                    <NoData />
                ) : viewMode === "list" ? (
                    <Box sx={{ minWidth: 0 }}>
                        <CvListSheet cvs={searchResults} />
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            columnGap: 1,
                            rowGap: 1,
                            mb: 3,
                            mt: 1,
                        }}
                    >
                        {searchResults.map((cv) => (
                            <ResumeCard key={cv.id} resume={cv} />
                        ))}
                    </Box>
                )}
            </Container>
        </AdminLayout>
    );
}

export default CVSearchResult;
