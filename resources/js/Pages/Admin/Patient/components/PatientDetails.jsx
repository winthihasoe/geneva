import { careTypeLabel, patientDisplayName } from "@/utils/careTypeLabel";
import { Edit } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { Children } from "react";

function text(value) {
    if (value === null || value === undefined) {
        return "";
    }

    return String(value).trim();
}

function formatDateOnly(value) {
    const match = text(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!match) {
        return "";
    }

    return `${match[3]}-${match[2]}-${match[1]}`;
}

function formatDateTime(value) {
    if (!value) {
        return "";
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "";
    }

    const pad = (part) => String(part).padStart(2, "0");

    return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function ageLabel(value) {
    const match = text(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!match) {
        return "";
    }

    const birth = new Date(
        Number(match[1]),
        Number(match[2]) - 1,
        Number(match[3]),
    );
    const today = new Date();
    let years = today.getFullYear() - birth.getFullYear();
    const monthDelta = today.getMonth() - birth.getMonth();

    if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < birth.getDate())) {
        years -= 1;
    }

    if (years < 0) {
        return "";
    }

    if (years === 0) {
        let months = today.getMonth() - birth.getMonth();
        if (today.getDate() < birth.getDate()) {
            months -= 1;
        }
        if (months < 0) {
            months += 12;
        }
        if (months <= 0) {
            return "Under 1 month";
        }

        return months === 1 ? "1 month" : `${months} months`;
    }

    return years === 1 ? "1 year" : `${years} years`;
}

function measure(value, unit) {
    if (value === null || value === undefined || value === "") {
        return "";
    }

    const number = Number(value);
    if (Number.isNaN(number)) {
        return text(value);
    }

    const amount = Number.isInteger(number)
        ? String(number)
        : String(parseFloat(number.toFixed(1)));

    return `${amount} ${unit}`;
}

function DetailItem({ label, value, wide = false }) {
    const content = text(value);
    if (!content) {
        return null;
    }

    return (
        <Box sx={{ gridColumn: wide ? "1 / -1" : "auto", minWidth: 0 }}>
            <Typography
                component="div"
                sx={{
                    color: "text.secondary",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    lineHeight: 1.2,
                    textTransform: "uppercase",
                }}
            >
                {label}
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    mt: 0.25,
                    fontSize: 13.5,
                    lineHeight: 1.35,
                    whiteSpace: "pre-wrap",
                    overflowWrap: "anywhere",
                }}
            >
                {content}
            </Typography>
        </Box>
    );
}

function DetailGroup({ title, children }) {
    const items = Children.toArray(children).filter(Boolean);
    if (items.length === 0) {
        return null;
    }

    return (
        <Box
            sx={{
                mt: 1.5,
                pt: 1.25,
                borderTop: "1px solid",
                borderColor: "divider",
            }}
        >
            <Typography
                sx={{
                    mb: 1,
                    color: "text.secondary",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                }}
            >
                {title}
            </Typography>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    columnGap: 2,
                    rowGap: 1.1,
                }}
            >
                {items}
            </Box>
        </Box>
    );
}

export default function PatientDetails({ patient, onEdit }) {
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
    const birthDate = formatDateOnly(patient?.date_of_birth);
    const age = ageLabel(patient?.date_of_birth);
    const createdBy = text(patient?.created_by);
    const createdAt = formatDateTime(patient?.created_at);
    const updatedAt = formatDateTime(patient?.updated_at);
    const createdLine = createdBy
        ? createdAt
            ? `Created by ${createdBy} · ${createdAt}`
            : `Created by ${createdBy}`
        : createdAt
          ? `Created ${createdAt}`
          : "";
    const emergencyContact = [
        patient?.emergency_contact_name,
        patient?.emergency_contact_relationship,
    ]
        .map(text)
        .filter(Boolean)
        .join(" · ");
    const notes = text(patient?.notes);

    return (
        <Box
            sx={{
                maxWidth: 600,
                margin: "auto",
                mb: 3,
                p: { xs: 1.5, sm: 2 },
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                bgcolor: "background.paper",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 1,
                }}
            >
                <Box sx={{ minWidth: 0 }}>
                    <Typography
                        sx={{
                            color: "primary.main",
                            fontFamily: "Roboto Slab",
                            fontWeight: 700,
                            fontSize: { xs: 16, sm: 18 },
                            lineHeight: 1.25,
                        }}
                    >
                        {name}
                    </Typography>
                    {summary ? (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.35, fontSize: 13, lineHeight: 1.4 }}
                        >
                            {summary}
                        </Typography>
                    ) : null}
                </Box>
                <IconButton
                    size="small"
                    aria-label="Edit patient details"
                    onClick={onEdit}
                    sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 1,
                    }}
                >
                    <Edit sx={{ fontSize: 16 }} />
                </IconButton>
            </Box>

            <DetailGroup title="Profile">
                <DetailItem
                    label="Date of birth"
                    value={
                        birthDate
                            ? age
                                ? `${birthDate} · ${age}`
                                : birthDate
                            : ""
                    }
                />
                <DetailItem label="Blood type" value={patient?.blood_type} />
                <DetailItem
                    label="Weight"
                    value={measure(patient?.weight_kg, "kg")}
                />
                <DetailItem
                    label="Height"
                    value={measure(patient?.height_cm, "cm")}
                />
            </DetailGroup>

            <DetailGroup title="Clinical">
                <DetailItem label="Allergies" value={patient?.allergies} wide />
                <DetailItem
                    label="Medical conditions"
                    value={patient?.medical_conditions}
                    wide
                />
            </DetailGroup>

            <DetailGroup title="Contact">
                <DetailItem
                    label="Emergency contact"
                    value={emergencyContact}
                    wide
                />
                <DetailItem
                    label="Phone"
                    value={patient?.emergency_contact_phone}
                />
                <DetailItem label="Address" value={patient?.address} wide />
            </DetailGroup>

            {notes ? (
                <Box
                    sx={{
                        mt: 1.5,
                        pt: 1.25,
                        borderTop: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Typography
                        sx={{
                            mb: 0.5,
                            color: "text.secondary",
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                        }}
                    >
                        NOTES
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: 13.5,
                            lineHeight: 1.45,
                            whiteSpace: "pre-wrap",
                            overflowWrap: "anywhere",
                        }}
                    >
                        {notes}
                    </Typography>
                </Box>
            ) : null}

            {createdLine || updatedAt ? (
                <Box sx={{ mt: 1.5 }}>
                    {createdLine ? (
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block" }}
                        >
                            {createdLine}
                        </Typography>
                    ) : null}
                    {updatedAt ? (
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block" }}
                        >
                            Updated {updatedAt}
                        </Typography>
                    ) : null}
                </Box>
            ) : null}
        </Box>
    );
}
