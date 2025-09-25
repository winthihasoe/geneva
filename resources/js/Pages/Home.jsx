import { Head } from "@inertiajs/react";
import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import Hero from "@/Components/Hero";
import CVdisplay from "@/Components/Home/CVdisplay";
import OurPopularCourses from "@/Components/Home/OurPopularCourses";
import AssessmentCenter from "@/Components/Home/AssessmentCenter";
import BlogSection from "@/Components/Home/BlogSection";
import ContactUsSection from "@/Components/Home/ContactUsSection";

function Home({ caregivers, courses }) {
    const CVs = Object.values(caregivers);

    return (
        <AppLayout>
            <Head title="Home" />
            <Hero />
            <CVdisplay CVs={CVs} />
            <OurPopularCourses courses={courses} />
            <AssessmentCenter />
            <BlogSection />
            <ContactUsSection />
        </AppLayout>
    );
}

export default Home;
