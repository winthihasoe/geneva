import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { useForm, router } from "@inertiajs/react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Autocomplete from "@mui/material/Autocomplete";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

function EditBlog({ blog, sections, topics }) {
    // Prepare initial topic_ids and filtered topics
    const initialTopicIds = blog.topics.map((t) => t.id);
    const [headerPreview, setHeaderPreview] = useState(
        blog.header_image ? `/storage/${blog.header_image}` : ""
    );
    const [blogImages, setBlogImages] = useState([]);
    const [blogImagePreviews, setBlogImagePreviews] = useState(
        blog.images
            ? blog.images.map((img) => `/storage/${img.image_path}`)
            : []
    );

    const { data, setData, post, processing, errors, reset } = useForm({
        title: blog.title || "",
        section_id: blog.section_id || "",
        topic_ids: initialTopicIds,
        header_image: null,
        content: blog.content || "",
        blog_images: [],
        // Optionally, keep track of images to delete
        delete_blog_image_ids: [],
    });

    // TipTap editor
    const editor = useEditor({
        extensions: [StarterKit, Image],
        content: data.content,
        onUpdate: ({ editor }) => {
            setData("content", editor.getHTML());
        },
    });

    // Filter topics by section
    const filteredTopics = topics.filter(
        (t) => t.section_id === Number(data.section_id)
    );

    // Handle section change
    const handleSectionChange = (e) => {
        const value = Number(e.target.value);
        setData((prev) => ({
            ...prev,
            section_id: value,
            topic_ids: [],
        }));
    };

    // Handle topics change
    const handleTopicsChange = (_, value) => {
        setData(
            "topic_ids",
            value.map((topic) => topic.id)
        );
    };

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
        setBlogImagePreviews([
            ...blog.images.map((img) => `/storage/${img.image_path}`),
            ...files.map((file) => URL.createObjectURL(file)),
        ]);
    };

    // Remove a new blog image (before upload)
    const handleRemoveNewBlogImage = (idx) => {
        const newImages = blogImages.filter((_, i) => i !== idx);
        setBlogImages(newImages);
        setData("blog_images", newImages);
        setBlogImagePreviews([
            ...blog.images.map((img) => `/storage/${img.image_path}`),
            ...newImages.map((file) => URL.createObjectURL(file)),
        ]);
    };

    // Remove an existing blog image (mark for deletion)
    const handleRemoveExistingBlogImage = (imgId) => {
        setData("delete_blog_image_ids", [
            ...(data.delete_blog_image_ids || []),
            imgId,
        ]);
        // Remove from preview
        setBlogImagePreviews((prev) =>
            prev.filter(
                (src, idx) => blog.images[idx]?.id !== imgId // Only remove if matches
            )
        );
    };

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.blogs.update", blog.id), {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
            <Typography variant="h4" fontWeight="bold" mb={3}>
                Edit Blog
            </Typography>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Stack spacing={3}>
                    {/* Title */}
                    <Box>
                        <Typography variant="subtitle1" mb={0.5}>
                            Blog Title
                        </Typography>
                        <TextField
                            name="title"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            error={!!errors.title}
                            helperText={errors.title}
                            fullWidth
                            required
                        />
                    </Box>

                    {/* Section */}
                    <Box>
                        <Typography variant="subtitle1" mb={0.5}>
                            Section
                        </Typography>
                        <TextField
                            select
                            name="section_id"
                            value={data.section_id}
                            onChange={handleSectionChange}
                            error={!!errors.section_id}
                            helperText={errors.section_id}
                            fullWidth
                            required
                        >
                            {sections.map((section) => (
                                <MenuItem key={section.id} value={section.id}>
                                    {section.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    {/* Topics (multi-select) */}
                    <Box>
                        <Typography variant="subtitle1" mb={0.5}>
                            Topics
                        </Typography>
                        <Autocomplete
                            multiple
                            id="topics-autocomplete"
                            options={filteredTopics}
                            getOptionLabel={(option) => option.name}
                            value={filteredTopics.filter((topic) =>
                                data.topic_ids.includes(topic.id)
                            )}
                            onChange={handleTopicsChange}
                            disabled={!data.section_id}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
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
                    </Box>

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
                            {headerPreview ? "Change Image" : "Upload Image"}
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

                    {/* Content */}
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
                                                const reader = new FileReader();
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
                            {/* Existing images */}
                            {blog.images &&
                                blog.images.map(
                                    (img, idx) =>
                                        !data.delete_blog_image_ids?.includes(
                                            img.id
                                        ) && (
                                            <Box
                                                key={img.id}
                                                sx={{ position: "relative" }}
                                            >
                                                <Avatar
                                                    src={`/storage/${img.image_path}`}
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
                                                        handleRemoveExistingBlogImage(
                                                            img.id
                                                        )
                                                    }
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        )
                                )}
                            {/* New images (before upload) */}
                            {blogImages.map((file, idx) => (
                                <Box key={idx} sx={{ position: "relative" }}>
                                    <Avatar
                                        src={URL.createObjectURL(file)}
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
                                            handleRemoveNewBlogImage(idx)
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
                        Update Blog
                    </Button>
                </Stack>
            </form>
        </Box>
    );
}

export default EditBlog;
