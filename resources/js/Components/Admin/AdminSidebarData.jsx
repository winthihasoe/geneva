import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import WorkHistoryRoundedIcon from "@mui/icons-material/WorkHistoryRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import AccessibleIcon from "@mui/icons-material/Accessible";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import SchoolIcon from "@mui/icons-material/School";
import SportsHandballRoundedIcon from "@mui/icons-material/SportsHandballRounded";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PaymentIcon from "@mui/icons-material/Payment";

export const AdminSidebarData = [
    {
        title: "Dashboard",
        icon: <HomeIcon color="info" />,
        link: "/admin/dashboard",
    },
    {
        title: "CV",
        icon: <DescriptionRoundedIcon />,
        link: "/admin/cv",
    },
    {
        title: "Patient",
        icon: <AccessibleIcon />,
        link: "/admin/patients",
    },
    {
        title: "Care Plan",
        icon: <EventAvailableRoundedIcon />,
        link: "/admin/care-plans",
    },
    // {
    //     title: "Care Logs 📝",
    //     icon: <AssignmentIcon color="primary" />,
    //     link: "/admin/care-logs",
    // },
    {
        title: "Job Apply",
        icon: <WorkHistoryRoundedIcon />,
        link: "/admin/job-applies",
    },
    // {
    //     title: "Interview",
    //     icon: <CoPresentIcon />,
    //     link: "/admin/interviews",
    // },
    {
        title: "Training Course",
        icon: <SchoolIcon />,
        link: "/admin/training-courses",
    },

    // {
    //     title: "Shop management",
    //     icon: <StorefrontRoundedIcon />,
    //     link: "/admin/admin-shops",
    // },
    // {
    //     title: "User management",
    //     icon: <PeopleRoundedIcon />,
    //     link: "/admin/users",
    // },
    // {
    //     title: "Blog management",
    //     icon: <NewspaperRoundedIcon />,
    //     link: "/admin/blogs",
    // },
    // {
    //     title: "Skill Assessment",
    //     icon: <SportsHandballRoundedIcon />,
    //     link: "/admin/skill-assessment-submissions",
    // },
    // {
    //     title: "Pricing management",
    //     icon: <MonetizationOnRoundedIcon />,
    //     link: "/admin/pricing-management",
    // },
    {
        title: "Social Media",
        icon: <FacebookRoundedIcon />,
        link: "/admin/social-media",
    },
    {
        title: "Discount Management",
        icon: <PaymentIcon />,
        link: "/admin/discount-cards",
    },
    {
        title: "Review Management",
        icon: <RateReviewIcon />,
        link: "/admin/review-management",
    },
    {
        title: "Contact message",
        icon: <MessageRoundedIcon />,
        link: "/admin/contact-message",
    },
];
