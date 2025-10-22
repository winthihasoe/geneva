import AdminLayout from "@/Layouts/AdminLayout";
import {
    Box,
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    Link as MuiLink,
    Grid2,
} from "@mui/material";
import React, { useState } from "react";
import { router } from "@inertiajs/react";

function SocialMediaManagement({ socialMedias }) {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [editData, setEditData] = useState({
        name: "",
        icon: "",
        description: "",
        url: "",
        line_id: "",
    });

    // Open edit dialog
    const handleEdit = (media) => {
        setSelected(media);
        setEditData({
            name: media.name || "",
            icon: media.icon || "",
            description: media.description || "",
            url: media.url || "",
            line_id: media.line_id || "",
        });
        setEditOpen(true);
    };

    // Open delete dialog
    const handleDelete = (media) => {
        setSelected(media);
        setDeleteOpen(true);
    };

    // Save edit
    const handleEditSave = () => {
        router.put(
            route("admin.social_media.update", { id: selected.id }),
            editData,
            {
                onSuccess: () => {
                    setEditOpen(false);
                    setSelected(null);
                },
            }
        );
    };

    // Confirm delete
    const handleDeleteConfirm = () => {
        router.delete(route("admin.social_media.delete", { id: selected.id }), {
            onSuccess: () => {
                setDeleteOpen(false);
                setSelected(null);
            },
        });
    };

    return (
        <AdminLayout>
            <Box sx={{ pb: { xs: 0, sm: 2, md: 3 } }}>
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="primary"
                    mb={2}
                >
                    Social Media Management
                </Typography>
                <Grid2 container spacing={2}>
                    {(socialMedias || []).map((media) => (
                        <Grid2 item size={{ xs: 12, sm: 6 }} key={media.id}>
                            <Card key={media.id} sx={{ maxWidth: 500 }}>
                                <CardContent>
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        alignItems="center"
                                        mb={1}
                                    >
                                        {media.icon && (
                                            <Box
                                                component="img"
                                                src={media.icon}
                                                alt={media.name}
                                                sx={{
                                                    width: 40,
                                                    height: 40,
                                                    objectFit: "contain",
                                                }}
                                            />
                                        )}
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                        >
                                            {media.name}
                                        </Typography>
                                    </Stack>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        mb={1}
                                    >
                                        {media.description}
                                    </Typography>
                                    {media.url && (
                                        <MuiLink
                                            href={media.url}
                                            target="_blank"
                                            rel="noopener"
                                            underline="hover"
                                            variant="body2"
                                            sx={{ display: "block", mb: 1 }}
                                        >
                                            {media.url}
                                        </MuiLink>
                                    )}
                                    {media.name?.toLowerCase() === "line" &&
                                        media.line_id && (
                                            <Typography
                                                variant="body2"
                                                color="primary"
                                            >
                                                LINE ID: {media.line_id}
                                            </Typography>
                                        )}
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        onClick={() => handleEdit(media)}
                                    >
                                        Edit
                                    </Button>
                                    {/* <Button
                                        size="small"
                                        color="error"
                                        variant="outlined"
                                        onClick={() => handleDelete(media)}
                                    >
                                        Delete
                                    </Button> */}
                                </CardActions>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>

                {/* Edit Dialog */}
                <Dialog
                    open={editOpen}
                    onClose={() => setEditOpen(false)}
                    maxWidth="xs"
                    fullWidth
                >
                    <DialogTitle>Edit Social Media</DialogTitle>
                    <DialogContent sx={{ p: 3 }}>
                        <Stack spacing={2}>
                            <TextField
                                label="Name"
                                value={editData.name}
                                onChange={(e) =>
                                    setEditData((d) => ({
                                        ...d,
                                        name: e.target.value,
                                    }))
                                }
                                fullWidth
                                variant="standard"
                            />

                            <TextField
                                label="Description"
                                value={editData.description}
                                onChange={(e) =>
                                    setEditData((d) => ({
                                        ...d,
                                        description: e.target.value,
                                    }))
                                }
                                fullWidth
                                variant="standard"
                                multiline
                            />
                            <TextField
                                label="URL"
                                value={editData.url}
                                onChange={(e) =>
                                    setEditData((d) => ({
                                        ...d,
                                        url: e.target.value,
                                    }))
                                }
                                fullWidth
                                variant="standard"
                                multiline
                            />
                            {editData.name?.toLowerCase() === "line" && (
                                <TextField
                                    label="LINE ID"
                                    value={editData.line_id}
                                    onChange={(e) =>
                                        setEditData((d) => ({
                                            ...d,
                                            line_id: e.target.value,
                                        }))
                                    }
                                    fullWidth
                                    variant="standard"
                                />
                            )}
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{ p: 3 }}>
                        <Button onClick={() => setEditOpen(false)} size="small">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleEditSave}
                            variant="contained"
                            size="small"
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Delete Confirmation Dialog */}
                <Dialog
                    open={deleteOpen}
                    onClose={() => setDeleteOpen(false)}
                    maxWidth="xs"
                    fullWidth
                >
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent sx={{ p: 3 }}>
                        <Typography>
                            Are you sure you want to delete{" "}
                            <b>{selected?.name}</b>?
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ p: 3 }}>
                        <Button
                            onClick={() => setDeleteOpen(false)}
                            size="small"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDeleteConfirm}
                            color="error"
                            variant="contained"
                            size="small"
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </AdminLayout>
    );
}

export default SocialMediaManagement;
