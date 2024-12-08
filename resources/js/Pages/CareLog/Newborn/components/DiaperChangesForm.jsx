import React, { useState } from "react";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const DiaperChangesForm = () => {
    const [diaperRows, setDiaperRows] = useState([
        { time: "", type: "", notes: "" },
    ]);

    const handleInputChange = (index, field, value) => {
        const updatedRows = [...diaperRows];
        updatedRows[index][field] = value;
        setDiaperRows(updatedRows);
    };

    const handleAddRow = () => {
        setDiaperRows([...diaperRows, { time: "", type: "", notes: "" }]);
    };

    const handleRemoveRow = (index) => {
        const updatedRows = diaperRows.filter((_, i) => i !== index);
        setDiaperRows(updatedRows);
    };

    return (
        <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Diaper Changes
            </Typography>
            {diaperRows.map((row, index) => (
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
                        label="Time"
                        type="time"
                        value={row.time}
                        onChange={(e) =>
                            handleInputChange(index, "time", e.target.value)
                        }
                        fullWidth
                        size="small"
                    />
                    <TextField
                        label="Type"
                        value={row.type}
                        onChange={(e) =>
                            handleInputChange(index, "type", e.target.value)
                        }
                        fullWidth
                        size="small"
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
                Add Diaper Change Entry
            </Button>
        </Box>
    );
};

export default DiaperChangesForm;
