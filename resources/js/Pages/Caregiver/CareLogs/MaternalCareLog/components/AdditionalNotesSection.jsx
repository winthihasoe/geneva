import React from "react";
import { Typography, TextField, Card, CardContent } from "@mui/material";

const AdditionalNotesSection = ({
    strings,
    additionalNotes,
    handleInputChange,
}) => {
    const a = strings.additionalNotes;

    return (
        <Card sx={{ borderRadius: 2, bgcolor: "transparent" }}>
            <CardContent>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={3}
                    color="primary"
                >
                    {a.sectionTitle}
                </Typography>
                <TextField
                    fullWidth
                    variant="standard"
                    multiline
                    rows={3}
                    value={additionalNotes}
                    onChange={(e) =>
                        handleInputChange("additionalNotes", e.target.value)
                    }
                    placeholder={a.placeholder}
                    label={a.label}
                />
            </CardContent>
        </Card>
    );
};

export default AdditionalNotesSection;
