import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import {
    Box,
    Container,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Divider,
} from "@mui/material";
import BackButton from "@/Components/BackButton";
import Sidebar from "@/Components/Sidebar";

// Mimic data from database
const blog = {
    title: "Osteoporosis in Elderly",
    header_image: "/images/blogs/sample-blog1.png",
    content: [
        {
            type: "text",
            value: `Osteoporosis is a common condition in elderly individuals, characterized by weakened bones that are more prone to fractures. It often develops due to age-related bone density loss and hormonal changes, particularly in postmenopausal women. Here’s an overview of the condition:`,
        },
        {
            type: "image",
            value: "/images/blogs/exercise.png",
            caption: "Exercise for Bone Health",
        },
        {
            type: "text",
            value: `Causes of Osteoporosis:
1. Aging: Bone density naturally decreases with age as the body's ability to form new bone slows down.
2. Hormonal Changes: Reduced levels of estrogen (in women) and testosterone (in men) accelerate bone loss. Thyroid disorders can also contribute.
3. Nutritional Deficiencies: Lack of calcium and vitamin D in the diet weakens bones over time.
4. Sedentary Lifestyle: Physical inactivity reduces bone strength and density.
5. Other Risk Factors: Family history, smoking, excessive alcohol, chronic medical conditions, long-term corticosteroid use.`,
        },
        {
            type: "image",
            value: "/images/blogs/maternity.png",
            caption: "Supine Exercise Example",
        },
        {
            type: "text",
            value: `Symptoms:
- Early stages often have no symptoms (silent disease).
- Back pain (from fractured or collapsed vertebrae).
- Loss of height over time.
- Stooped posture (kyphosis).
- Frequent bone fractures, even from minor falls or stresses.

Diagnosis:
1. Bone Density Test (DEXA Scan): Measures bone mineral density (BMD) and compares it to the norm for your age and sex.
2. Blood Tests: Evaluate levels of calcium, vitamin D, and other markers.
3. X-rays: May show fractures or bone thinning.

Complications:
- Fractures: Hip, spine, and wrist fractures are common.
- Loss of Mobility: Fractures can lead to long-term disability and reduced quality of life.
- Chronic Pain: From repeated fractures and vertebral collapse.

Management and Treatment:
- Lifestyle Changes: Diet high in calcium (dairy, leafy greens, fortified products), regular weight-bearing exercise, and avoiding smoking/alcohol.
- Medications: As prescribed by a healthcare provider.
- Fall Prevention: Home safety modifications and balance training.`,
        },
    ],
    section: "Elder Care",
};

function SingleBlog() {
    return (
        <AppLayout>
            <Head title={blog.title} />
            <Box sx={{ bgcolor: "gray.200" }}>
                <Container
                    maxWidth="xl"
                    sx={{ py: 4, display: "flex", gap: 3 }}
                >
                    <Box
                        sx={{
                            bgcolor: "white",
                            p: { xs: 0, sm: 2, md: 3 },
                            borderRadius: 3,
                            width: "100%",
                        }}
                    >
                        <BackButton />
                        {/* Blog Title */}
                        <Typography variant="h3" fontFamily="Righteous" mb={4}>
                            {blog.title}
                        </Typography>
                        {/* Header Image */}
                        {blog.header_image && (
                            <Card sx={{ mb: 4, boxShadow: 2 }}>
                                <CardMedia
                                    component="img"
                                    height="400"
                                    image={blog.header_image}
                                    alt={blog.title}
                                    sx={{ objectFit: "cover" }}
                                />
                            </Card>
                        )}
                        {/* Blog Content with Images */}
                        <Box>
                            {blog.content.map((block, idx) =>
                                block.type === "text" ? (
                                    <Typography
                                        key={idx}
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{ mb: 3, whiteSpace: "pre-line" }}
                                    >
                                        {block.value}
                                    </Typography>
                                ) : (
                                    <Box key={idx} sx={{ mb: 3 }}>
                                        <Card sx={{ boxShadow: 1 }}>
                                            <CardMedia
                                                component="img"
                                                height="300"
                                                image={block.value}
                                                alt={
                                                    block.caption ||
                                                    "Blog image"
                                                }
                                                sx={{ objectFit: "cover" }}
                                            />
                                            {block.caption && (
                                                <CardContent sx={{ py: 1 }}>
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                        align="center"
                                                        display="block"
                                                    >
                                                        {block.caption}
                                                    </Typography>
                                                </CardContent>
                                            )}
                                        </Card>
                                    </Box>
                                )
                            )}
                        </Box>
                        <Divider sx={{ my: 4 }} />
                        {/* Section info or related blogs can go here */}
                    </Box>
                    <Sidebar />
                </Container>
            </Box>
        </AppLayout>
    );
}

export default SingleBlog;
