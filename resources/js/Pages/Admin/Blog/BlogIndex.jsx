import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    Box,
    Tabs,
    Tab,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Divider,
    Stack,
    IconButton,
    Tooltip,
    TextField,
    Container,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { router } from "@inertiajs/react";
import dayjs from "dayjs";

function BlogIndex({ sections, topics, blogs }) {
    const [selectedSection, setSelectedSection] = useState(
        sections[0]?.id || null
    );
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [search, setSearch] = useState("");

    // Filter topics by section
    const sectionTopics = topics.filter(
        (t) => t.section_id === selectedSection
    );

    // Filter blogs by section and topic
    let filteredBlogs = blogs.filter((b) => b.section_id === selectedSection);
    if (selectedTopic) {
        filteredBlogs = filteredBlogs.filter((b) =>
            b.topics.some((t) => t.id === selectedTopic)
        );
    }
    if (search) {
        filteredBlogs = filteredBlogs.filter((b) =>
            b.title.toLowerCase().includes(search.toLowerCase())
        );
    }
    return (
        <AdminLayout>
            <Container maxWidth="lg" sx={{ pb: 3, px: { xs: 0 } }}>
                <Typography
                    fontWeight="bold"
                    color="primary"
                    mb={2}
                    variant="h4"
                >
                    Blog Management
                </Typography>

                {/* Section Tabs */}
                <Tabs
                    value={selectedSection}
                    onChange={(_, v) => {
                        setSelectedSection(v);
                        setSelectedTopic(null);
                    }}
                    sx={{ mb: 2 }}
                >
                    {sections.map((section) => (
                        <Tab
                            key={section.id}
                            label={section.name}
                            value={section.id}
                        />
                    ))}
                </Tabs>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={3}
                    alignItems="flex-start"
                >
                    {/* Topics List */}
                    <Box sx={{ minWidth: 220 }}>
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            mb={1}
                        >
                            Topics
                            <Button
                                size="small"
                                sx={{ ml: 1 }}
                                onClick={() =>
                                    router.get(route("admin.topics.manage"))
                                }
                            >
                                Manage
                            </Button>
                        </Typography>
                        <List dense>
                            <ListItem disablePadding>
                                <ListItemButton
                                    selected={selectedTopic === null}
                                    onClick={() => setSelectedTopic(null)}
                                >
                                    <ListItemText primary="All Topics" />
                                </ListItemButton>
                            </ListItem>
                            {sectionTopics.map((topic) => (
                                <ListItem key={topic.id} disablePadding>
                                    <ListItemButton
                                        selected={selectedTopic === topic.id}
                                        onClick={() =>
                                            setSelectedTopic(topic.id)
                                        }
                                    >
                                        <ListItemText primary={topic.name} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <Button
                            variant="text"
                            size="small"
                            sx={{ mt: 1 }}
                            onClick={() =>
                                router.get(route("admin.blog.sections"))
                            }
                        >
                            Manage Sections
                        </Button>
                    </Box>
                    {/* Blog List */}
                    <Box sx={{ flex: 1 }}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={2}
                        >
                            <Typography variant="subtitle1" fontWeight="bold">
                                Blogs
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() => {
                                    router.get(route("admin.blogs.create"));
                                }}
                            >
                                Add Blog
                            </Button>
                        </Stack>
                        <TextField
                            size="small"
                            placeholder="Search blog title..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            sx={{ mb: 2, width: 300 }}
                        />
                        <Divider sx={{ mb: 2 }} />
                        <List>
                            {filteredBlogs.length === 0 && (
                                <Typography
                                    color="text.secondary"
                                    sx={{ mt: 2 }}
                                >
                                    No blogs found.
                                </Typography>
                            )}
                            {filteredBlogs.map((blog) => (
                                <ListItem
                                    key={blog.id}
                                    secondaryAction={
                                        <Stack direction="row" spacing={1}>
                                            <Tooltip title="Edit">
                                                <IconButton
                                                    edge="end"
                                                    onClick={() => {
                                                        router.get(
                                                            route(
                                                                "admin.blogs.edit",
                                                                {
                                                                    blog: blog.id,
                                                                }
                                                            )
                                                        );
                                                    }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton
                                                    edge="end"
                                                    color="error"
                                                    onClick={() => {
                                                        /* handle delete */
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    }
                                    sx={{
                                        borderBottom: "1px solid #eee",
                                    }}
                                >
                                    <ListItemText
                                        primary={blog.title}
                                        secondary={
                                            <>
                                                Topics:{" "}
                                                {blog.topics &&
                                                blog.topics.length > 0
                                                    ? blog.topics
                                                          .map((t) => t.name)
                                                          .join(", ")
                                                    : "—"}{" "}
                                                &nbsp;|&nbsp;
                                                {dayjs(blog.created_at).format(
                                                    "YYYY-MM-DD HH:mm"
                                                )}{" "}
                                                &nbsp;|&nbsp; Updated:{" "}
                                                {dayjs(blog.updated_at).format(
                                                    "YYYY-MM-DD HH:mm"
                                                )}
                                            </>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Stack>
            </Container>
        </AdminLayout>
    );
}

export default BlogIndex;
