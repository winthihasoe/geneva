import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
    Stack,
    Chip,
    IconButton,
    Avatar,
    InputLabel,
    FormControl,
    OutlinedInput,
    Select,
    Autocomplete,
    Container,
} from "@mui/material";
import { useForm, router } from "@inertiajs/react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import AdminLayout from "@/Layouts/AdminLayout";

function CreateBlog({ sections, topics }) {
    const [headerPreview, setHeaderPreview] = useState("");
    const [blogImages, setBlogImages] = useState([]);
    const [blogImagePreviews, setBlogImagePreviews] = useState([]);
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        section_id: "",
        topic_ids: [],
        header_image: null,
        content: "",
        blog_images: [],
    });

    console.log("data", data);

    // Filter topics by section
    const filteredTopics = topics.filter(
        (t) => t.section_id === Number(data.section_id)
    );

    // Handle header image upload
    const handleHeaderImage = (e) => {
        const file = e.target.files[0];
        setData("header_image", file);
        setHeaderPreview(file ? URL.createObjectURL(file) : "");
    };

    // Handle blog images upload
    const handleBlogImages = (e) => {
        const files = Array.from(e.target.files);
        setBlogImages(files);
        setData("blog_images", files);
        setBlogImagePreviews(files.map((file) => URL.createObjectURL(file)));
    };

    // Remove a blog image
    const handleRemoveBlogImage = (idx) => {
        const newImages = blogImages.filter((_, i) => i !== idx);
        setBlogImages(newImages);
        setData("blog_images", newImages);
        setBlogImagePreviews(
            newImages.map((file) => URL.createObjectURL(file))
        );
    };

    // Handle section change (reset topics)
    const handleSectionChange = (e) => {
        const value = Number(e.target.value);
        setData((prev) => ({
            ...prev,
            section_id: value,
            topic_ids: [],
        }));
    };

    // Handle topics change
    const handleTopicsChange = (e) => {
        setData("topic_ids", e.target.value);
    };

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.blogs.store"), {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    // TipTap editor instance
    const editor = useEditor({
        extensions: [StarterKit, Image],
        content: data.content,
        onUpdate: ({ editor }) => {
            setData("content", editor.getHTML());
        },
    });

    return (
        <AdminLayout>
            <Container maxWidth="lg" sx={{ pb: 3 }}>
                <Typography variant="h4" fontWeight="bold" mb={3}>
                    Create New Blog
                </Typography>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Stack spacing={3}>
                        {/* Title */}
                        <TextField
                            label="Blog Title"
                            name="title"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            error={!!errors.title}
                            helperText={errors.title}
                            fullWidth
                            required
                        />

                        {/* Section */}
                        <TextField
                            select
                            label="Section"
                            name="section_id"
                            value={data.section_id}
                            onChange={handleSectionChange}
                            error={!!errors.section_id}
                            helperText={errors.section_id}
                            required
                        >
                            {sections.map((section) => (
                                <MenuItem key={section.id} value={section.id}>
                                    {section.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* Topics (multi-select) */}
                        <Autocomplete
                            multiple
                            id="topics-autocomplete"
                            options={filteredTopics}
                            getOptionLabel={(option) => option.name}
                            value={filteredTopics.filter((topic) =>
                                data.topic_ids.includes(topic.id)
                            )}
                            onChange={(_, value) => {
                                setData(
                                    "topic_ids",
                                    value.map((topic) => topic.id)
                                );
                            }}
                            disabled={!data.section_id}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Topics"
                                    error={!!errors.topic_ids}
                                    helperText={errors.topic_ids}
                                />
                            )}
                            renderTags={(selected, getTagProps) =>
                                selected.map((option, index) => (
                                    <Chip
                                        label={option.name}
                                        {...getTagProps({ index })}
                                        key={option.id}
                                    />
                                ))
                            }
                        />

                        {/* Header Image */}
                        <Box>
                            <Typography variant="subtitle1" mb={1}>
                                Header Image
                            </Typography>
                            <Button
                                variant="outlined"
                                component="label"
                                startIcon={<PhotoCamera />}
                            >
                                {headerPreview
                                    ? "Change Image"
                                    : "Upload Image"}
                                <input
                                    type="file"
                                    name="header_image"
                                    accept="image/*"
                                    hidden
                                    onChange={handleHeaderImage}
                                />
                            </Button>
                            {headerPreview && (
                                <Box sx={{ mt: 2 }}>
                                    <img
                                        src={headerPreview}
                                        alt="Header Preview"
                                        style={{
                                            width: "100%",
                                            maxHeight: 220,
                                            objectFit: "cover",
                                            borderRadius: 8,
                                        }}
                                    />
                                </Box>
                            )}
                            {errors.header_image && (
                                <Typography color="error" variant="body2">
                                    {errors.header_image}
                                </Typography>
                            )}
                        </Box>

                        {/* Content with TipTap */}
                        <Box>
                            <Typography variant="subtitle1" mb={1}>
                                Content
                            </Typography>
                            <Box>
                                <Box sx={{ mb: 1 }}>
                                    <Button
                                        size="small"
                                        onClick={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .toggleBold()
                                                .run()
                                        }
                                        disabled={!editor}
                                    >
                                        Bold
                                    </Button>
                                    <Button
                                        size="small"
                                        onClick={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .toggleItalic()
                                                .run()
                                        }
                                        disabled={!editor}
                                    >
                                        Italic
                                    </Button>
                                    <Button
                                        size="small"
                                        onClick={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .toggleHeading({ level: 2 })
                                                .run()
                                        }
                                        disabled={!editor}
                                    >
                                        Heading
                                    </Button>
                                    <Button
                                        size="small"
                                        component="label"
                                        disabled={!editor}
                                    >
                                        Image
                                        <input
                                            type="file"
                                            accept="image/*"
                                            hidden
                                            onChange={async (e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const reader =
                                                        new FileReader();
                                                    reader.onload = () => {
                                                        editor
                                                            .chain()
                                                            .focus()
                                                            .setImage({
                                                                src: reader.result,
                                                            })
                                                            .run();
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                    </Button>
                                </Box>
                                <EditorContent editor={editor} />
                            </Box>
                            {errors.content && (
                                <Typography color="error" variant="body2">
                                    {errors.content}
                                </Typography>
                            )}
                        </Box>

                        {/* Blog Images */}
                        <Box>
                            <Typography variant="subtitle1" mb={1}>
                                Blog Images (optional, multiple)
                            </Typography>
                            <Button
                                variant="outlined"
                                component="label"
                                startIcon={<AddPhotoAlternateIcon />}
                            >
                                Add Images
                                <input
                                    type="file"
                                    name="blog_images"
                                    accept="image/*"
                                    multiple
                                    hidden
                                    onChange={handleBlogImages}
                                />
                            </Button>
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{ mt: 2, flexWrap: "wrap" }}
                            >
                                {blogImagePreviews.map((src, idx) => (
                                    <Box
                                        key={idx}
                                        sx={{ position: "relative" }}
                                    >
                                        <Avatar
                                            src={src}
                                            variant="rounded"
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                mr: 1,
                                                mb: 1,
                                            }}
                                        />
                                        <IconButton
                                            size="small"
                                            sx={{
                                                position: "absolute",
                                                top: 0,
                                                right: 0,
                                                bgcolor: "#fff",
                                            }}
                                            onClick={() =>
                                                handleRemoveBlogImage(idx)
                                            }
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Stack>
                            {errors.blog_images && (
                                <Typography color="error" variant="body2">
                                    {errors.blog_images}
                                </Typography>
                            )}
                        </Box>

                        {/* Submit */}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={processing}
                            size="large"
                        >
                            Publish Blog
                        </Button>
                    </Stack>
                </form>
            </Container>
        </AdminLayout>
    );
}

export default CreateBlog;
