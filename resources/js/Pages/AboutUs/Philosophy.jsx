import Title from "@/Components/Typo/Title";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { Box } from "@mui/material";
import React from "react";

function Philosophy() {
    return (
        <AppLayout>
            <Head title="Care Philosophy" />
            <Box
                sx={{
                    height: "70vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Title>Coming soon</Title>
            </Box>
        </AppLayout>
    );
}

export default Philosophy;
