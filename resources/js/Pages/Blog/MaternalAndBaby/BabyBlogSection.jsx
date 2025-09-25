import AppLayout from "@/Layouts/AppLayout";
import { Box, Container, Typography } from "@mui/material";
import BlogCard from "../components/BlogCard";
import { router } from "@inertiajs/react";
import YouTubeChannel from "../components/YouTubeChannel";
import CarePlanAds from "../components/CarePlanAds";

// Demo blogs for all sections
const demoBlogs = [
    {
        image: "/images/blogs/sample-blog1.png",
        title: "Newborn Sleep Tips",
        content:
            "Learn how to help your newborn sleep better with proven techniques and gentle routines. Understand sleep cycles, safe sleep environments, and how to soothe your baby for restful nights.",
    },
    {
        image: "/images/blogs/sample-blog2.png",
        title: "Safe Bathing for Newborns",
        content:
            "Discover step-by-step instructions for safe and gentle newborn bathing. Tips for water temperature, products, and soothing routines.",
    },
    {
        image: "/images/blogs/sample-blog3.png",
        title: "Understanding Baby Cues",
        content:
            "Babies communicate through cues. Learn how to recognize signs of hunger, tiredness, and discomfort to respond effectively and build trust.",
    },
    {
        image: "/images/blogs/sample-blog4.png",
        title: "Bonding With Your Baby",
        content:
            "Explore ways to strengthen the parent-child bond through skin-to-skin contact, eye contact, and gentle touch during daily routines.",
    },
    {
        image: "/images/blogs/sample-blog5.png",
        title: "Preventing Diaper Rash",
        content:
            "Keep your baby comfortable by learning the best practices for diaper changes, skin care, and choosing the right products.",
    },
    {
        image: "/images/blogs/sample-blog6.png",
        title: "First Aid for Infants",
        content:
            "Be prepared for minor accidents. This guide covers basic first aid steps for common infant injuries and when to seek medical help.",
    },
    {
        image: "/images/blogs/sample-blog7.png",
        title: "Introducing Solid Foods",
        content:
            "Find out when and how to introduce solid foods to your baby, including signs of readiness and safe first foods.",
    },
    {
        image: "/images/blogs/sample-blog8.png",
        title: "Soothing a Crying Baby",
        content:
            "Crying is normal, but it can be stressful. Learn effective soothing techniques and how to identify the cause of your baby's cries.",
    },
    {
        image: "/images/blogs/sample-blog9.png",
        title: "Baby Immunization Schedule",
        content:
            "Stay on track with your baby's vaccinations. This article explains the recommended immunization schedule and what to expect at each visit.",
    },
    {
        image: "/images/blogs/sample-blog10.png",
        title: "Tummy Time Benefits",
        content:
            "Tummy time is essential for your baby's development. Learn how to make it fun and safe, and discover the benefits for muscle growth.",
    },
    {
        image: "/images/blogs/sample-blog11.png",
        title: "Caring for Baby’s Umbilical Cord",
        content:
            "Proper umbilical cord care helps prevent infection. Get step-by-step instructions and tips for a healthy healing process.",
    },
    {
        image: "/images/blogs/sample-blog12.png",
        title: "Recognizing Signs of Illness",
        content:
            "Know when to call the doctor. This guide helps you recognize early signs of illness in newborns and when to seek medical advice.",
    },
    {
        image: "/images/blogs/sample-blog13.png",
        title: "Baby Massage Techniques",
        content:
            "Gentle massage can soothe your baby and promote bonding. Learn safe techniques and the best times for baby massage.",
    },
    {
        image: "/images/blogs/sample-blog14.png",
        title: "Choosing the Right Baby Products",
        content:
            "Navigate the world of baby products with confidence. Tips for selecting safe, effective, and essential items for your newborn.",
    },
    {
        image: "/images/blogs/sample-blog15.png",
        title: "Traveling with a Newborn",
        content:
            "Plan safe and stress-free trips with your baby. Advice on packing, feeding, and keeping your newborn comfortable on the go.",
    },
];

const demoSections = [
    {
        title: "Newborn Care",
        image: "/images/blogSection/newborn.png",
    },
    {
        title: "Maternal Care",
        image: "/images/blogSection/maternal.png",
    },
    {
        title: "Baby Milestones",
        image: "/images/blogSection/baby-milestone.png",
    },
    {
        title: "Emergency Care",
        image: "/images/blogSection/emergency-care.png",
    },
];

function BabyBlogSection({ section }) {
    // Find the current section object
    const currentSection = demoSections.find(
        (s) => s.title.replace(/\s+/g, "-").toLowerCase() === section
    );

    return (
        <AppLayout>
            <Container maxWidth="xl" sx={{ pt: { xs: 0, sm: 2, md: 3 } }}>
                <Typography
                    variant="h3"
                    fontFamily="Righteous"
                    letterSpacing={1.5}
                    mt={2}
                    mb={5}
                    textAlign="center"
                >
                    {currentSection ? currentSection.title : section} Blogs
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 4,
                        justifyContent: { xs: "center", md: "flex-start" },
                        mb: 6,
                    }}
                >
                    {demoBlogs.map((blog, idx) => (
                        <BlogCard
                            key={idx}
                            image={blog.image}
                            title={blog.title}
                            content={blog.content}
                        />
                    ))}
                </Box>

                {/* Other sections  */}
                <Box
                    sx={{
                        display: "flex",
                        gap: { xs: 2, sm: 3, md: 8 },
                        overflow: "hidden",
                        overflowX: "auto",
                        justifyContent: "center",
                        mb: 6,
                        py: 3,
                    }}
                >
                    {demoSections.map((s) => (
                        <Box
                            key={s.title}
                            sx={{
                                border:
                                    s.title ===
                                    (currentSection && currentSection.title)
                                        ? "3px solid #FFC547"
                                        : "none",
                                borderRadius: 5,
                                bgcolor: "primary.main",
                                overflow: "hidden",
                                width: 150,
                                cursor: "pointer",
                                boxShadow:
                                    s.title ===
                                    (currentSection && currentSection.title)
                                        ? 3
                                        : 1,
                                transition: "border 0.2s, box-shadow 0.2s",
                                textAlign: "center",
                                "&:hover": {
                                    boxShadow: 4,
                                    borderColor: "#1976d2",
                                },
                            }}
                            onClick={() => {
                                if (
                                    s.title !==
                                    (currentSection && currentSection.title)
                                ) {
                                    router.get(
                                        route(
                                            "blog.maternal.baby.healthcare.section",
                                            {
                                                section: s.title
                                                    .replace(/\s+/g, "-")
                                                    .toLowerCase(),
                                            }
                                        )
                                    );
                                }
                            }}
                        >
                            <Box
                                component="img"
                                src={s.image}
                                alt={s.title}
                                sx={{
                                    width: "100%",
                                    height: 130,
                                    objectFit: "cover",
                                    borderRadius: 2,
                                    bgcolor: "white",
                                }}
                            />
                            <Box
                                sx={{
                                    bgcolor: "primary.main",
                                    height: 60,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                    color="white"
                                >
                                    {s.title}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Container>
            <YouTubeChannel />
            <CarePlanAds />
        </AppLayout>
    );
}

export default BabyBlogSection;
