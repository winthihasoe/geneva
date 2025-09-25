import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Stack,
    Avatar,
    TextField,
    InputAdornment,
} from "@mui/material";
import { router } from "@inertiajs/react";
import BlogCard from "@/Pages/Blog/components/BlogCard";

// Demo recent blogs
const recentBlogs = [
    {
        image: "/images/blogs/sample-blog1.png",
        title: "Newborn Sleep Tips",
        content:
            "Learn how to help your newborn sleep better with proven techniques and gentle routines.",
        slug: "newborn-sleep-tips",
    },
    {
        image: "/images/blogs/sample-blog2.png",
        title: "Maternal Nutrition Essentials",
        content:
            "Discover the key nutrients every mother needs during pregnancy and postpartum.",
        slug: "maternal-nutrition-essentials",
    },
];

// Service list
const services = [
    {
        name: "Newborn Care",
        image: "/images/sidebar/baby.png",
    },
    {
        name: "Elder/Senior Care",
        image: "/images/sidebar/elder.png",
    },
    {
        name: "Maternal Care",
        image: "/images/sidebar/maternal.png",
    },
];

const Sidebar = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        // For demo, just alert. Replace with your subscribe logic.
        alert(`Subscribed: ${email}`);
        setEmail("");
    };

    return (
        <Box
            sx={{
                display: { xs: "none", lg: "block" },
                width: 300,
            }}
        >
            <Stack spacing={2} sx={{ mr: 1, mb: 1 }}>
                {/* 1. Quality Care Card */}
                <Card
                    sx={{
                        borderRadius: 2,
                        bgcolor: "#fff",
                        boxShadow: "none",
                        p: 2,
                        textAlign: "center",
                    }}
                >
                    <CardMedia
                        component="img"
                        image="/images/sidebar/careplan-sidebar.svg"
                        alt="Quality Care"
                        sx={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                            mx: "auto",
                            mb: 1,
                        }}
                    />
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                        We are committed to <br />
                        <span style={{ color: "#21875C" }}>Quality Care</span>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                        “Personalised care starts with our expert counselling to
                        understand & meet each client’s unique needs.”
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        size="small"
                        sx={{ borderRadius: 8, fontWeight: 600 }}
                        onClick={() => router.get(route("care.start"))}
                    >
                        Get Care Now
                    </Button>
                </Card>

                {/* 2. List Our Services */}
                <Card
                    sx={{
                        borderRadius: 2,
                        bgcolor: "#fff",
                        boxShadow: "none",
                        p: 2,
                    }}
                >
                    <Typography variant="subtitle1" fontWeight={700} mb={1}>
                        List Our Services
                    </Typography>
                    <Stack spacing={2}>
                        {services.map((service) => (
                            <Box
                                key={service.name}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Avatar
                                    src={service.image}
                                    alt={service.name}
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        mr: 2,
                                        border: "2px solid #eee",
                                    }}
                                />
                                <Typography variant="body1" fontWeight={500}>
                                    {service.name}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                </Card>

                {/* 3. Recent Blogs */}
                <Card
                    sx={{
                        borderRadius: 2,
                        bgcolor: "#fff",
                        boxShadow: "none",
                        p: 2,
                    }}
                >
                    <Typography variant="subtitle1" fontWeight={700} mb={1}>
                        Recent Blogs
                    </Typography>
                    <Stack spacing={2}>
                        {recentBlogs.map((blog, idx) => (
                            <BlogCard
                                key={idx}
                                image={blog.image}
                                title={blog.title}
                                content={blog.content}
                                slug={blog.slug}
                            />
                        ))}
                    </Stack>
                </Card>

                {/* 4. Get Our Latest Blog (Subscribe) */}
                <Card
                    sx={{
                        borderRadius: 2,
                        bgcolor: "#fff",
                        boxShadow: "none",
                        p: 2,
                        textAlign: "center",
                    }}
                >
                    <Typography variant="subtitle1" fontWeight={700} mb={1}>
                        Get Our Latest Blog
                    </Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            bgcolor: "#f5f5f5",
                            borderRadius: 5,
                            mb: 2,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 5,
                            },
                        }}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        fullWidth
                        sx={{ borderRadius: 8, fontWeight: 600 }}
                        onClick={handleSubscribe}
                    >
                        Subscribe
                    </Button>
                </Card>
            </Stack>
        </Box>
    );
};

export default Sidebar;
