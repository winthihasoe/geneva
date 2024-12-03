import Title from "@/Components/Typo/Title";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { Box } from "@mui/material";
import React from "react";

function Team() {
    return (
        <AppLayout>
            <Head title="Team Introduction" />
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

export default Team;
