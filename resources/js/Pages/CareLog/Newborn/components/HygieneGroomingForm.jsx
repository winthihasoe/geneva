import React, { useState } from "react";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const HygieneGroomingForm = () => {
    const [hygieneRows, setHygieneRows] = useState([
        { time: "", activity: "", products_used: "", notes: "" },
    ]);

    const handleInputChange = (index, field, value) => {
        const updatedRows = [...hygieneRows];
        updatedRows[index][field] = value;
        setHygieneRows(updatedRows);
    };

    const handleAddRow = () => {
        setHygieneRows([
            ...hygieneRows,
            { time: "", activity: "", products_used: "", notes: "" },
        ]);
    };

    const handleRemoveRow = (index) => {
        const updatedRows = hygieneRows.filter((_, i) => i !== index);
        setHygieneRows(updatedRows);
    };

    return (
        <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Hygiene & Grooming
            </Typography>
            {hygieneRows.map((row, index) => (
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
                        label="Activity"
                        value={row.activity}
                        onChange={(e) =>
                            handleInputChange(index, "activity", e.target.value)
                        }
                        fullWidth
                        size="small"
                        placeholder="e.g., Bath, Nail Trim"
                    />
                    <TextField
                        label="Products Used"
                        value={row.products_used}
                        onChange={(e) =>
                            handleInputChange(
                                index,
                                "products_used",
                                e.target.value
                            )
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
                Add Hygiene Entry
            </Button>
        </Box>
    );
};

export default HygieneGroomingForm;
