import React from "react";
import { Box, Typography, Divider, Alert } from "@mui/material";
import AdminLayout from "@/Layouts/AdminLayout";
import dayjs from "dayjs";
import Title from "@/Components/Typo/Title";
import { Head } from "@inertiajs/react";
import BackButton from "@/Components/BackButton";

function AdminSinglePatient({ patient }) {
    if (!patient) {
        return (
            <AdminLayout>
                <Box
                    sx={{
                        maxWidth: 800,
                        margin: "auto",
                        padding: 3,
                        textAlign: "center",
                    }}
                >
                    <Alert severity="error" sx={{ marginBottom: 2 }}>
                        Error: Patient data could not be loaded.
                    </Alert>
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: {
                                xs: "1.2rem",
                                sm: "1.5rem",
                                md: "1.8rem",
                            },
                        }}
                    >
                        Please try again later or contact support.
                    </Typography>
                </Box>
            </AdminLayout>
        );
    }

    const formatDate = (date) =>
        date ? dayjs(date).format("MMMM D, YYYY h:mm A") : "N/A";

    return (
        <AdminLayout>
            <Head title="Patient Detail" />
            <Box
                sx={{
                    maxWidth: 600,
                    margin: "auto",
                    padding: { xs: 1, sm: 2, md: 3 },
                    pt: { xs: 2, sm: 1 },
                    border: { xs: "none", sm: "2px solid" },
                    borderColor: { xs: "", sm: "primary.main" },
                    borderRadius: 8,
                    boxShadow: 1,
                    bgcolor: "background.paper",
                    mb: 3,
                }}
            >
                <Title>
                    <BackButton />
                    Patient Details
                </Title>

                {/* Patient Data List */}
                <Box>
                    {Object.entries(patient)
                        .filter(([key]) => !["id", "slug"].includes(key)) // Skip 'id', 'slug' key
                        .map(([key, value]) => (
                            <Box
                                key={key}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginBottom: 1.5,
                                    p: { xs: 0, sm: 1 },
                                    borderBottom: "1px solid",
                                    borderColor: "divider",
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: "bold",
                                        fontSize: { xs: "0.7rem", sm: "1rem" },
                                    }}
                                >
                                    {formatKey(key)}:{" "}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: {
                                            xs: "0.7rem",
                                            sm: "0.9rem",
                                        },
                                    }}
                                >
                                    {key === "created_at" ||
                                    key === "updated_at"
                                        ? formatDate(value)
                                        : value || "N/A"}
                                </Typography>
                            </Box>
                        ))}
                </Box>
            </Box>
        </AdminLayout>
    );
}

/**
 * Helper function to format keys for better readability.
 * For example: 'date_of_birth' becomes 'Date of Birth'.
 */
function formatKey(key) {
    return key
        .replace(/_/g, " ") // Replace underscores with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
}

export default AdminSinglePatient;
