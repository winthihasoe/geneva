import React, { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Button,
    Stack,
    IconButton,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Avatar,
    Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import BackButton from "@/Components/BackButton";

function SectionManage({ sections }) {
    const [open, setOpen] = useState(false);
    const [editSection, setEditSection] = useState(null);
    const [iconPreview, setIconPreview] = useState("");
    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        icon: null,
    });

    const handleOpen = (section = null) => {
        setEditSection(section);
        setData({
            name: section ? section.name : "",
            icon: null,
        });
        setIconPreview(
            section && section.icon ? `/storage/${section.icon}` : ""
        );
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditSection(null);
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
        if (editSection) {
            post(route("admin.blog.sections.update", editSection.id), {
                preserveScroll: true,
                onSuccess: handleClose,
            });
        } else {
            post(route("admin.blog.sections.store"), {
                preserveScroll: true,
                onSuccess: handleClose,
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this section?")) {
            router.delete(route("admin.blog.sections.delete", id));
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
                        Manage Blog Sections
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpen()}
                    >
                        Add Section
                    </Button>
                </Stack>
                <Stack direction="row" spacing={3} flexWrap="wrap">
                    {sections.map((section) => (
                        <Card
                            key={section.id}
                            sx={{ width: 260, mb: 3, bgcolor: "#fff" }}
                        >
                            <CardMedia
                                component="img"
                                height="120"
                                image={
                                    section.icon
                                        ? `/storage/${section.icon}`
                                        : "/images/placeholder.png"
                                }
                                alt={section.name}
                                sx={{ objectFit: "cover" }}
                            />
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    mb={1}
                                >
                                    {section.name}
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    <Tooltip title="Edit">
                                        <IconButton
                                            onClick={() => handleOpen(section)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            color="error"
                                            onClick={() =>
                                                handleDelete(section.id)
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
                        {editSection ? "Edit Section" : "Add Section"}
                    </DialogTitle>
                    <form onSubmit={handleSave} encType="multipart/form-data">
                        <DialogContent>
                            <Typography variant="subtitle1">
                                Section Name
                            </Typography>
                            <TextField
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                fullWidth
                                sx={{ mb: 2 }}
                                error={!!errors.name}
                                helperText={errors.name}
                                variant="filled"
                            />
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
                                            margin: "auto",
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
                            <Button size="small" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={processing}
                                size="small"
                            >
                                {editSection ? "Update" : "Create"}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Box>
        </AdminLayout>
    );
}

export default SectionManage;
