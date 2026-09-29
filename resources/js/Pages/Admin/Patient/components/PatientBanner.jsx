import { careTypeLabel, patientDisplayName } from "@/utils/careTypeLabel";
import { Box, Typography } from "@mui/material";

function text(value) {
    if (value === null || value === undefined) {
        return "";
    }

    return String(value).trim();
}

export default function PatientBanner({ patient }) {
    const name = patientDisplayName(patient) || "Patient";
    const summary = [
        patient?.pt_id,
        careTypeLabel(patient?.type),
        patient?.gender,
        patient?.service_area,
    ]
        .map(text)
        .filter(Boolean)
        .join(" · ");

    return (
        <Box
            sx={{
                mb: 2,
                px: { xs: 1.5, sm: 2 },
                py: 2,

                bgcolor: "background.paper",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 2,
            }}
        >
            <Typography
                sx={{
                    color: "primary.main",
                    fontFamily: "Roboto Slab",
                    fontWeight: 700,
                    fontSize: { xs: 18, sm: 20 },
                    lineHeight: 1.2,
                }}
            >
                {name}
            </Typography>
            {summary ? (
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.25, fontSize: 13, lineHeight: 1.4 }}
                >
                    {summary}
                </Typography>
            ) : null}
        </Box>
    );
}
