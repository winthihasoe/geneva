import React, { useState } from "react";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const ActivitiesForm = () => {
    const [activitiesRows, setActivitiesRows] = useState([
        { time: "", activity: "", duration: "", description: "" },
    ]);

    const handleInputChange = (index, field, value) => {
        const updatedRows = [...activitiesRows];
        updatedRows[index][field] = value;
        setActivitiesRows(updatedRows);
    };

    const handleAddRow = () => {
        setActivitiesRows([
            ...activitiesRows,
            { time: "", activity: "", duration: "", description: "" },
        ]);
    };

    const handleRemoveRow = (index) => {
        const updatedRows = activitiesRows.filter((_, i) => i !== index);
        setActivitiesRows(updatedRows);
    };

    return (
        <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Activities
            </Typography>
            {activitiesRows.map((row, index) => (
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
                        placeholder="e.g., Tummy Time"
                    />
                    <TextField
                        label="Duration"
                        value={row.duration}
                        onChange={(e) =>
                            handleInputChange(index, "duration", e.target.value)
                        }
                        fullWidth
                        size="small"
                        placeholder="e.g., 30 mins"
                    />
                    <TextField
                        label="Description"
                        value={row.description}
                        onChange={(e) =>
                            handleInputChange(
                                index,
                                "description",
                                e.target.value
                            )
                        }
                        fullWidth
                        size="small"
                        placeholder="e.g., Played with toys"
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
                Add Activity Entry
            </Button>
        </Box>
    );
};

export default ActivitiesForm;
