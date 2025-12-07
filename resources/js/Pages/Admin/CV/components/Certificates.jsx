import TitleCenter from "@/Components/Typo/TitleCenter";
import Certificate from "@/Pages/Certificate/components/Certificate";
import { Box } from "@mui/material";
import React from "react";

function Certificates({ certificates }) {
    return (
        <Box my={4}>
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
                {certificates.map((cert) => (
                    <Certificate key={cert.id} certificate={cert} />
                ))}
            </Box>
        </Box>
    );
}

export default Certificates;
