import TitleCenter from "@/Components/Typo/TitleCenter";
import { useForm } from "@inertiajs/react";
import {
    Box,
    Button,
    Divider,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import React, { useState } from "react";

function EditLevel({ cv }) {
    const { data, setData, post, processing } = useForm({
        level: cv.level || "",
    });

    const handleLevelChange = (event) => {
        setData({ ...data, level: event.target.value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        post(route("cv.update.level", { id: cv.id }), {
            preserveScroll: true,
        });
    };
    console.log("level", data);

    return (
        <Box sx={{ my: 3 }}>
            <TitleCenter>Edit Caregiver Level</TitleCenter>
            <Divider sx={{ my: 1, width: 300, margin: "auto" }} />
            <Typography variant="body1" sx={{ mt: 2 }}>
                Select Caregiver Level
            </Typography>
            <Select
                value={data.level}
                onChange={handleLevelChange}
                sx={{ width: 300, my: 2 }}
                displayEmpty
                size="small"
            >
                <MenuItem value="">
                    <em>Select Level</em>
                </MenuItem>
                <MenuItem value="Nanny">Nanny</MenuItem>
                <MenuItem value="Super Nanny">Super Nanny</MenuItem>
                <MenuItem value="Newborn Nanny">Newborn Nanny</MenuItem>
                <MenuItem value="Super Newborn Nanny">
                    Super Newborn Nanny
                </MenuItem>
                <MenuItem value="Caregiver">Caregiver</MenuItem>
                <MenuItem value="Advanced Caregiver">
                    Advanced Caregiver
                </MenuItem>
            </Select>

            <Box sx={{ textAlign: "center" }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    disabled={processing}
                >
                    Save
                </Button>
            </Box>
        </Box>
    );
}
export default EditLevel;
