import Subtitle from "@/Components/Typo/Subtitle";
import TitleCenter from "@/Components/Typo/TitleCenter";
import { router, useForm } from "@inertiajs/react";
import {
    Box,
    Button,
    MenuItem,
    Select,
    Typography,
    Paper,
    Stack,
    Chip,
} from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import WorkIcon from "@mui/icons-material/Work";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";

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

    // Status display with icon and color
    const statusMap = {
        Available: {
            label: "Available",
            color: "success",
            icon: <CheckCircleIcon fontSize="small" />,
        },
        Occupied: {
            label: "Occupied",
            color: "warning",
            icon: <WorkIcon fontSize="small" />,
        },
        Resigned: {
            label: "Resigned",
            color: "error",
            icon: <DoDisturbOnIcon fontSize="small" />,
        },
        Blacklisted: {
            label: "Blacklisted",
            color: "error",
            icon: <BlockIcon fontSize="small" />,
        },
    };

    const currentStatus = statusMap[cv?.status] || {
        label: "N/A",
        color: "default",
        icon: null,
    };

    return (
        <Paper
            elevation={3}
            sx={{
                margin: "32px auto",
                maxWidth: 340,
                p: 4,
                borderRadius: 5,
                bgcolor: "#f9f9f9",
            }}
        >
            <TitleCenter>Edit CV Status</TitleCenter>
            <Stack spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Chip
                    icon={currentStatus.icon}
                    label={currentStatus.label}
                    color={currentStatus.color}
                    variant="filled"
                    sx={{ fontWeight: "bold", fontSize: 16, px: 2 }}
                />
                <Subtitle>Current Status: {currentStatus.label}</Subtitle>
            </Stack>

            <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
                Select New Status
            </Typography>
            <Select
                value={data.status}
                onChange={handleStatusChange}
                name="status"
                displayEmpty
                size="medium"
                fullWidth
                sx={{
                    mb: 3,
                    bgcolor: "#fff",
                    borderRadius: 2,
                }}
            >
                <MenuItem value="">
                    <em>Select status</em>
                </MenuItem>
                <MenuItem value="Available">
                    <Stack direction="row" alignItems="center" gap={1}>
                        <CheckCircleIcon color="success" fontSize="small" />
                        <span>Available</span>
                    </Stack>
                </MenuItem>
                <MenuItem value="Occupied">
                    <Stack direction="row" alignItems="center" gap={1}>
                        <WorkIcon color="warning" fontSize="small" />
                        <span>Occupied</span>
                    </Stack>
                </MenuItem>
                <MenuItem value="Resigned">
                    <Stack direction="row" alignItems="center" gap={1}>
                        <DoDisturbOnIcon color="error" fontSize="small" />
                        <span>Resigned</span>
                    </Stack>
                </MenuItem>
                <MenuItem value="Blacklisted">
                    <Stack direction="row" alignItems="center" gap={1}>
                        <BlockIcon color="error" fontSize="small" />
                        <span>Blacklisted</span>
                    </Stack>
                </MenuItem>
            </Select>
            <Box sx={{ textAlign: "center" }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    disabled={processing || !data.status}
                    sx={{
                        borderRadius: 20,
                        minWidth: 120,
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                    }}
                    size="small"
                >
                    Save
                </Button>
            </Box>
        </Paper>
    );
}

export default EditCVstatus;
