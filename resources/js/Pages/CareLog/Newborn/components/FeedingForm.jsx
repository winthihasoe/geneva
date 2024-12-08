import React from "react";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const FeedingForm = ({ data, setData, errors }) => {
    const handleInputChange = (index, field, value) => {
        const updatedRows = [...data];
        updatedRows[index][field] = value;
        setData(updatedRows);
    };

    const handleAddRow = () => {
        setData([...data, { time: "", type: "", amount: "", notes: "" }]);
    };

    const handleRemoveRow = (index) => {
        const updatedRows = data.filter((_, i) => i !== index);
        setData(updatedRows);
    };

    return (
        <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Feeding
            </Typography>
            {data.map((row, index) => (
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
                        error={!!errors?.[index]?.time}
                        helperText={errors?.[index]?.time}
                    />
                    <TextField
                        label="Type"
                        value={row.type}
                        onChange={(e) =>
                            handleInputChange(index, "type", e.target.value)
                        }
                        fullWidth
                        size="small"
                        error={!!errors?.[index]?.type}
                        helperText={errors?.[index]?.type}
                    />
                    <TextField
                        label="Amount"
                        value={row.amount}
                        onChange={(e) =>
                            handleInputChange(index, "amount", e.target.value)
                        }
                        fullWidth
                        size="small"
                        error={!!errors?.[index]?.amount}
                        helperText={errors?.[index]?.amount}
                    />
                    <TextField
                        label="Notes"
                        value={row.notes}
                        onChange={(e) =>
                            handleInputChange(index, "notes", e.target.value)
                        }
                        fullWidth
                        size="small"
                        error={!!errors?.[index]?.notes}
                        helperText={errors?.[index]?.notes}
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
                Add Feeding Entry
            </Button>
        </Box>
    );
};

export default FeedingForm;
