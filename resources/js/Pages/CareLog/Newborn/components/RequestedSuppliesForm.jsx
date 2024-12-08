import React, { useState } from "react";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const RequestedSuppliesForm = () => {
    const [supplyRows, setSupplyRows] = useState([
        { item: "", quantity: "", purpose: "", priority: "" },
    ]);

    const handleInputChange = (index, field, value) => {
        const updatedRows = [...supplyRows];
        updatedRows[index][field] = value;
        setSupplyRows(updatedRows);
    };

    const handleAddRow = () => {
        setSupplyRows([
            ...supplyRows,
            { item: "", quantity: "", purpose: "", priority: "" },
        ]);
    };

    const handleRemoveRow = (index) => {
        const updatedRows = supplyRows.filter((_, i) => i !== index);
        setSupplyRows(updatedRows);
    };

    return (
        <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Requested Supplies
            </Typography>
            {supplyRows.map((row, index) => (
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
                        label="Item"
                        value={row.item}
                        onChange={(e) =>
                            handleInputChange(index, "item", e.target.value)
                        }
                        fullWidth
                        size="small"
                    />
                    <TextField
                        label="Quantity"
                        value={row.quantity}
                        onChange={(e) =>
                            handleInputChange(index, "quantity", e.target.value)
                        }
                        fullWidth
                        size="small"
                    />
                    <TextField
                        label="Purpose"
                        value={row.purpose}
                        onChange={(e) =>
                            handleInputChange(index, "purpose", e.target.value)
                        }
                        fullWidth
                        size="small"
                    />
                    <TextField
                        label="Priority"
                        value={row.priority}
                        onChange={(e) =>
                            handleInputChange(index, "priority", e.target.value)
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
                Add Supply Entry
            </Button>
        </Box>
    );
};

export default RequestedSuppliesForm;
