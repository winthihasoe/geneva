import React from "react";
import { Typography, TextField, Card, CardContent } from "@mui/material";

const AdditionalNotesSection = ({ additionalNotes, handleInputChange }) => {
    return (
        <Card sx={{ borderRadius: 2, bgcolor: "transparent" }}>
            <CardContent>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={3}
                    color="primary"
                >
                    7. Additional Notes/Observations
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
                    placeholder="Add any additional observations or notes here..."
                    label="Additional Notes"
                />
            </CardContent>
        </Card>
    );
};

export default AdditionalNotesSection;
