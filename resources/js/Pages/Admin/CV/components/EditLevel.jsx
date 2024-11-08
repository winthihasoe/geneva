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
        newborn_care_level: cv.newborn_care_level || "",
        nanny_care_level: cv.nanny_care_level || "",
    });

    const handleLevelChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        post(route("cv.update.level", { id: cv.id }), {
            preserveScroll: true,
        });
    };
    console.log("level", data);

    return (
        <Box sx={{ width: 280, margin: " auto" }}>
            <TitleCenter>Edit Caregiver Level</TitleCenter>
            <Divider sx={{ my: 1, width: 300, margin: "auto" }} />

            <Box>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Select Newborn care level
                </Typography>
                <Select
                    value={data.newborn_care_level}
                    onChange={handleLevelChange}
                    name="newborn_care_level"
                    sx={{ my: 2 }}
                    displayEmpty
                    size="small"
                >
                    <MenuItem value="">
                        <em>Select Level</em>
                    </MenuItem>
                    <MenuItem value="Newborn Nanny">Newborn Nanny</MenuItem>
                    <MenuItem value="Super Newborn Nanny">
                        Super Newborn Nanny
                    </MenuItem>
                </Select>
            </Box>

            <Box>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Select Nanny care level
                </Typography>
                <Select
                    value={data.nanny_care_level}
                    onChange={handleLevelChange}
                    name="nanny_care_level"
                    sx={{ my: 2 }}
                    displayEmpty
                    size="small"
                >
                    <MenuItem value="">
                        <em>Select Level</em>
                    </MenuItem>
                    <MenuItem value="Nanny">Nanny</MenuItem>
                    <MenuItem value="Super Nanny">Super Nanny</MenuItem>
                </Select>
            </Box>

            <Box>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Select Caregiver Level
                </Typography>
                <Select
                    value={data.level}
                    onChange={handleLevelChange}
                    name="level"
                    sx={{ my: 2 }}
                    displayEmpty
                    size="small"
                >
                    <MenuItem value="">
                        <em>Select Level</em>
                    </MenuItem>

                    <MenuItem value="Caregiver">Caregiver</MenuItem>
                    <MenuItem value="Advanced Caregiver">
                        Advanced Caregiver
                    </MenuItem>
                </Select>
            </Box>

            <Box sx={{ textAlign: "center" }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    disabled={processing}
                    sx={{ borderRadius: 20 }}
                >
                    Save
                </Button>
            </Box>
        </Box>
    );
}
export default EditLevel;
