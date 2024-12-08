import React, { useState } from "react";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const SleepForm = () => {
    const [sleepRows, setSleepRows] = useState([
        { start_time: "", end_time: "", duration: "", notes: "" },
    ]);

    const handleInputChange = (index, field, value) => {
        const updatedRows = [...sleepRows];
        updatedRows[index][field] = value;
        setSleepRows(updatedRows);
    };

    const handleAddRow = () => {
        setSleepRows([
            ...sleepRows,
            { start_time: "", end_time: "", duration: "", notes: "" },
        ]);
    };

    const handleRemoveRow = (index) => {
        const updatedRows = sleepRows.filter((_, i) => i !== index);
        setSleepRows(updatedRows);
    };

    return (
        <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Sleep Log
            </Typography>
            {sleepRows.map((row, index) => (
                <Box
                    key={index}
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 2,
                        marginBottom: 2,
                    }}
                >
                    <TextField
                        label="Start Time"
                        type="time"
                        value={row.start_time}
                        onChange={(e) =>
                            handleInputChange(
                                index,
                                "start_time",
                                e.target.value
                            )
                        }
                        fullWidth
                        size="small"
                    />
                    <TextField
                        label="End Time"
                        type="time"
                        value={row.end_time}
                        onChange={(e) =>
                            handleInputChange(index, "end_time", e.target.value)
                        }
                        fullWidth
                        size="small"
                    />
                    <TextField
                        label="Duration"
                        value={row.duration}
                        onChange={(e) =>
                            handleInputChange(index, "duration", e.target.value)
                        }
                        fullWidth
                        size="small"
                        placeholder="e.g., 2 hours"
                    />
                    <TextField
                        label="Notes"
                        value={row.notes}
                        onChange={(e) =>
                            handleInputChange(index, "notes", e.target.value)
                        }
                        fullWidth
                        size="small"
                    />
                    <IconButton
                        onClick={() => handleRemoveRow(index)}
                        size="small"
                        color="error"
                        sx={{ gridColumn: "span 2", justifySelf: "center" }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}
            <Button
                onClick={handleAddRow}
                startIcon={<AddCircleIcon />}
                variant="outlined"
                size="small"
            >
                Add Sleep Entry
            </Button>
        </Box>
    );
};

export default SleepForm;
