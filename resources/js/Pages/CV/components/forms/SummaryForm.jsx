import Subtitle from "@/Components/Typo/Subtitle";
import { Box, TextField, Typography } from "@mui/material";
import React from "react";

function SummaryForm({ data, handleChange }) {
    return (
        <Box sx={{ margin: "auto" }}>
            <Subtitle>Expected Salary</Subtitle>
            <TextField
                size="small"
                value={data.salary}
                onChange={handleChange("salary")}
                InputProps={{
                    endAdornment: <Typography>THB</Typography>,
                }}
                sx={{ mb: 3 }}
            />
            <Subtitle>Summary about your experience to show in Resume</Subtitle>
            <TextField
                size="small"
                placeholder="With 2 years of experience in elder senior care..."
                minRows={1}
                multiline
                value={data.summary}
                onChange={handleChange("summary")}
                fullWidth
            />
        </Box>
    );
}

export default SummaryForm;
