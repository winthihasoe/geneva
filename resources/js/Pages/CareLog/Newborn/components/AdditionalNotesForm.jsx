import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";

const AdditionalNotesForm = () => {
    const [additionalNotes, setAdditionalNotes] = useState("");

    return (
        <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Additional Notes/Observations
            </Typography>
            <TextField
                label="Additional Notes"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                fullWidth
                size="small"
                placeholder="Write any additional observations..."
                multiline
                rows={4}
            />
        </Box>
    );
};

export default AdditionalNotesForm;
