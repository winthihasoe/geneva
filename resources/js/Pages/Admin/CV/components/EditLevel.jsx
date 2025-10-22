import TitleCenter from "@/Components/Typo/TitleCenter";
import { useForm } from "@inertiajs/react";
import {
    Box,
    Button,
    Divider,
    MenuItem,
    Select,
    Typography,
    Paper,
    Stack,
} from "@mui/material";
import BabyIcon from "@mui/icons-material/BabyChangingStation";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import ElderlyIcon from "@mui/icons-material/Elderly";
import React from "react";

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

    return (
        <Paper
            elevation={3}
            sx={{
                maxWidth: 340,
                margin: "32px auto",
                p: 4,
                borderRadius: 5,
                bgcolor: "#f9f9f9",
            }}
        >
            <TitleCenter>Edit Caregiver Level</TitleCenter>
            <Divider sx={{ my: 2 }} />

            <Stack spacing={3}>
                <Box>
                    <Stack direction="row" alignItems="center" gap={1} mb={1}>
                        <BabyIcon color="primary" />
                        <Typography variant="body1" fontWeight="bold">
                            Newborn Care Level
                        </Typography>
                    </Stack>
                    <Select
                        value={data.newborn_care_level}
                        onChange={handleLevelChange}
                        name="newborn_care_level"
                        displayEmpty
                        size="small"
                        fullWidth
                        sx={{ bgcolor: "#fff", borderRadius: 2 }}
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
                    <Stack direction="row" alignItems="center" gap={1} mb={1}>
                        <ChildCareIcon color="secondary" />
                        <Typography variant="body1" fontWeight="bold">
                            Nanny Care Level
                        </Typography>
                    </Stack>
                    <Select
                        value={data.nanny_care_level}
                        onChange={handleLevelChange}
                        name="nanny_care_level"
                        displayEmpty
                        size="small"
                        fullWidth
                        sx={{ bgcolor: "#fff", borderRadius: 2 }}
                    >
                        <MenuItem value="">
                            <em>Select Level</em>
                        </MenuItem>
                        <MenuItem value="Nanny">Nanny</MenuItem>
                        <MenuItem value="Super Nanny">Super Nanny</MenuItem>
                    </Select>
                </Box>

                <Box>
                    <Stack direction="row" alignItems="center" gap={1} mb={1}>
                        <ElderlyIcon sx={{ color: "#f57c00" }} />
                        <Typography variant="body1" fontWeight="bold">
                            Caregiver Level
                        </Typography>
                    </Stack>
                    <Select
                        value={data.level}
                        onChange={handleLevelChange}
                        name="level"
                        displayEmpty
                        size="small"
                        fullWidth
                        sx={{ bgcolor: "#fff", borderRadius: 2 }}
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
            </Stack>

            <Box sx={{ textAlign: "center", mt: 4 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    disabled={processing}
                    sx={{ borderRadius: 20, minWidth: 120, fontWeight: "bold" }}
                >
                    Save
                </Button>
            </Box>
        </Paper>
    );
}

export default EditLevel;
