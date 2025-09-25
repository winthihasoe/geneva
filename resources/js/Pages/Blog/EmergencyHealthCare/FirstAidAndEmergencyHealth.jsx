import AppLayout from "@/Layouts/AppLayout";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import BlogCard from "../components/BlogCard";
import { router } from "@inertiajs/react";
import YouTubeChannel from "../components/YouTubeChannel";
import CarePlanAds from "../components/CarePlanAds";

const sections = [
    { title: "Fall Prevention", link: "#" },
    { title: "Choking Relief", link: "#" },
    { title: "Bleeding Control", link: "#" },
    { title: "Burn Management", link: "#" },
];

// Fake recent blogs data
const recentBlogs = [
    {
        image: "/images/blogs/sample-blog1.png",
        title: "Newborn Sleep Tips",
        content:
            "Learn how to help your newborn sleep better with proven techniques and gentle routines. Understand sleep cycles, safe sleep environments, and how to soothe your baby for restful nights. These tips are recommended by pediatricians and experienced caregivers to ensure your baby gets the best start.",
    },
    {
        image: "/images/blogs/sample-blog2.png",
        title: "Maternal Nutrition Essentials",
        content:
            "Discover the key nutrients every mother needs during pregnancy and postpartum. From vitamins to hydration, we cover what matters most for your health and your baby's development. Get practical meal ideas and expert advice for every stage of motherhood.",
    },
    {
        image: "/images/blogs/sample-blog3.png",
        title: "Tracking Baby Milestones",
        content:
            "Stay informed about your baby's growth and development. Learn what to expect in the first year, how to encourage new skills, and when to seek advice. Our milestone guide is designed to support parents and caregivers with clear, actionable information.",
    },
    {
        image: "/images/blogs/sample-blog1.png",
        title: "Emergency Care for Babies",
        content:
            "Be prepared for common emergencies with our quick guide. Learn first aid basics, when to call for help, and how to keep your baby safe in unexpected situations. Empower yourself with knowledge and confidence for any scenario.",
    },
    {
        image: "/images/blogs/sample-blog3.png",
        title: "Breastfeeding Success",
        content:
            "Overcome common breastfeeding challenges with expert-backed solutions. Find tips for latching, milk supply, and comfortable feeding positions. Support your breastfeeding journey with confidence and care.",
    },
    {
        image: "/images/blogs/sample-blog2.png",
        title: "Breastfeeding Success",
        content:
            "Overcome common breastfeeding challenges with expert-backed solutions. Find tips for latching, milk supply, and comfortable feeding positions. Support your breastfeeding journey with confidence and care.",
    },
    {
        image: "/images/blogs/sample-blog1.png",
        title: "Breastfeeding Success",
        content:
            "Overcome common breastfeeding challenges with expert-backed solutions. Find tips for latching, milk supply, and comfortable feeding positions. Support your breastfeeding journey with confidence and care.",
    },
    {
        image: "/images/blogs/sample-blog2.png",
        title: "Breastfeeding Success",
        content:
            "Overcome common breastfeeding challenges with expert-backed solutions. Find tips for latching, milk supply, and comfortable feeding positions. Support your breastfeeding journey with confidence and care.",
    },
];

function FirstAidAndEmergencyHealth() {
    return (
        <AppLayout>
            <Container maxWidth="xl" sx={{ pt: { xs: 0, sm: 2, md: 3 } }}>
                <Typography
                    fontFamily={"Righteous"}
                    letterSpacing={1.5}
                    variant="h4"
                    my={2}
                    textAlign={"center"}
                >
                    Emergency Healthcare Tips
                </Typography>
                <Typography
                    variant="body1"
                    textAlign={"center"}
                    width={{ xs: "100%", sm: "80%", md: "50%" }}
                    mx={"auto"}
                    color="text.secondary"
                    mb={4}
                >
                    Essential first aid and emergency care tips for parents and
                    caregivers, covering common scenarios and best practices.
                </Typography>

                {/* Blog Sections */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        gap: 7,
                        pb: 4,
                    }}
                >
                    {sections.length > 0 &&
                        sections.map((section, index) => (
                            <Button
                                key={index}
                                sx={{
                                    width: 180,
                                    height: 80,
                                    borderRadius: 50,
                                }}
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                    router.get(
                                        route(
                                            "blog.emergency.healthcare.section",
                                            {
                                                section: section.title
                                                    .replace(/\s+/g, "-")
                                                    .toLowerCase(),
                                            }
                                        )
                                    )
                                }
                            >
                                <Typography
                                    letterSpacing={1.5}
                                    fontFamily={"Righteous"}
                                    textAlign={"center"}
                                    fontSize={16}
                                >
                                    {section.title}
                                </Typography>
                            </Button>
                        ))}
                </Box>

                {/* Recent Blogs */}
                <Typography variant="h5" fontWeight={"bold"} mb={3}>
                    Recent Blogs
                </Typography>
                <Box
                    sx={{
                        width: "100%",
                        overflowX: "auto",
                        display: "flex",
                        gap: 4,
                        pb: 2,
                        mb: 6,
                        px: 1,
                        maxWidth: "100%",
                    }}
                >
                    {recentBlogs.map((blog, idx) => (
                        <BlogCard
                            key={idx}
                            image={blog.image}
                            title={blog.title}
                            content={blog.content}
                        />
                    ))}
                </Box>

                <YouTubeChannel />

                {/* Ads for Care Plan */}
                <CarePlanAds care={"elder"} />
            </Container>
        </AppLayout>
    );
}

export default FirstAidAndEmergencyHealth;
