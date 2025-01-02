import Subtitle from "@/Components/Typo/Subtitle";
import TitleCenter from "@/Components/Typo/TitleCenter";
import { router, useForm } from "@inertiajs/react";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";

function EditCVstatus({ cv }) {
    const { data, setData, post, processing } = useForm({
        status: cv?.status || "",
    });

    const handleStatusChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        post(route("cv.update.status", { id: cv.id }), {
            preserveScroll: true,
        });
    };

    console.log("status", data.status);

    return (
        <Box
            sx={{
                margin: "20px auto",
                width: 280,
                boxShadow: 2,
                p: 3,
                borderRadius: 5,
            }}
        >
            <TitleCenter>Edit CV status</TitleCenter>
            <Subtitle>CV Status: {cv?.status || "N/A"}</Subtitle>

            <Typography variant="body1" sx={{ mt: 2 }}>
                Select Status
            </Typography>
            <Select
                value={data.status}
                onChange={handleStatusChange}
                name="status"
                sx={{ my: 2 }}
                displayEmpty
                size="small"
                fullWidth
            >
                <MenuItem value="">
                    <em>Select status</em>
                </MenuItem>
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Occupied">Occupied</MenuItem>
                <MenuItem value="Blacklisted">Blacklisted</MenuItem>
            </Select>
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

export default EditCVstatus;
