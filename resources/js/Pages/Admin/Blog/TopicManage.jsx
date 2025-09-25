import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Stack,
    IconButton,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useForm, router } from "@inertiajs/react";
import BackButton from "@/Components/BackButton";

function TopicManage({ topics, sections }) {
    const [open, setOpen] = useState(false);
    const [editTopic, setEditTopic] = useState(null);
    const [iconPreview, setIconPreview] = useState("");
    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        section_id: "",
        icon: null,
    });

    const handleOpen = (topic = null) => {
        setEditTopic(topic);
        setData({
            name: topic ? topic.name : "",
            section_id: topic ? topic.section_id : "",
            icon: null,
        });
        setIconPreview(topic && topic.icon ? `/storage/${topic.icon}` : "");
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditTopic(null);
        reset();
        setIconPreview("");
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "icon" && files && files[0]) {
            setData("icon", files[0]);
            setIconPreview(URL.createObjectURL(files[0]));
        } else {
            setData(name, value);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (editTopic) {
            post(route("admin.topics.update", editTopic.id), {
                preserveScroll: true,
                onSuccess: handleClose,
            });
        } else {
            post(route("admin.topics.store"), {
                preserveScroll: true,
                onSuccess: handleClose,
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this topic?")) {
            router.delete(route("admin.topics.delete", id));
        }
    };

    return (
        <AdminLayout>
            <Box sx={{ p: 3 }}>
                <BackButton />
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={3}
                >
                    <Typography variant="h4" fontWeight="bold">
                        Manage Topics
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpen()}
                    >
                        Add Topic
                    </Button>
                </Stack>
                <Stack direction="row" spacing={3} flexWrap="wrap">
                    {topics.map((topic) => (
                        <Card
                            key={topic.id}
                            sx={{ width: 260, mb: 3, bgcolor: "#fff" }}
                        >
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    mb={1}
                                >
                                    {topic.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    mb={1}
                                >
                                    Section: {topic.section?.name}
                                </Typography>
                                {topic.icon && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            mb: 1,
                                        }}
                                    >
                                        <img
                                            src={`/storage/${topic.icon}`}
                                            alt="Topic Icon"
                                            style={{
                                                width: "70%",
                                                height: "auto",
                                                borderRadius: 8,
                                            }}
                                        />
                                    </Box>
                                )}
                                <Stack direction="row" spacing={1}>
                                    <Tooltip title="Edit">
                                        <IconButton
                                            onClick={() => handleOpen(topic)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            color="error"
                                            onClick={() =>
                                                handleDelete(topic.id)
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
                {/* Add/Edit Dialog */}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                        {editTopic ? "Edit Topic" : "Add Topic"}
                    </DialogTitle>
                    <form onSubmit={handleSave} encType="multipart/form-data">
                        <DialogContent>
                            <TextField
                                label="Topic Name"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                fullWidth
                                sx={{ mb: 2 }}
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                            <TextField
                                select
                                label="Section"
                                name="section_id"
                                value={data.section_id}
                                onChange={handleChange}
                                fullWidth
                                sx={{ mb: 2 }}
                                error={!!errors.section_id}
                                helperText={errors.section_id}
                                required
                            >
                                {sections.map((section) => (
                                    <MenuItem
                                        key={section.id}
                                        value={section.id}
                                    >
                                        {section.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button
                                variant="outlined"
                                component="label"
                                fullWidth
                                sx={{ mb: 2 }}
                                size="small"
                            >
                                {iconPreview ? "Change Photo" : "Upload Photo"}
                                <input
                                    type="file"
                                    name="icon"
                                    accept="image/*"
                                    hidden
                                    onChange={handleChange}
                                />
                            </Button>
                            {iconPreview && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <img
                                        src={iconPreview}
                                        alt="Preview"
                                        style={{
                                            width: "70%",
                                            height: "auto",
                                            borderRadius: 8,
                                        }}
                                    />
                                </Box>
                            )}
                            {errors.icon && (
                                <Typography color="error" variant="body2">
                                    {errors.icon}
                                </Typography>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={processing}
                            >
                                {editTopic ? "Update" : "Create"}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Box>
        </AdminLayout>
    );
}

export default TopicManage;
