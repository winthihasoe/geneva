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

export const AdminSidebarData = [
    {
        title: "Dashboard",
        icon: <HomeIcon />,
        link: "/admin/dashboard",
    },
    {
        title: "CV",
        icon: <DescriptionRoundedIcon />,
        link: "/admin/cv",
    },
    // {
    //     title: "Interviews",
    //     icon: <EventAvailableRoundedIcon />,
    //     link: "/admin/appointments",
    // },
    // {
    //     title: "Job offers",
    //     icon: <WorkHistoryRoundedIcon />,
    //     link: "/admin/job-offers",
    // },

    // {
    //     title: "Shop management",
    //     icon: <StorefrontRoundedIcon />,
    //     link: "/admin/admin-shops",
    // },
    {
        title: "User management",
        icon: <PeopleRoundedIcon />,
        link: "/admin/users",
    },
    // {
    //     title: "Blog management",
    //     icon: <NewspaperRoundedIcon />,
    //     link: "/admin/blogs",
    // },
    // {
    //     title: "Subscription",
    //     icon: <PaymentsRoundedIcon />,
    //     link: "/admin/admin-subscription",
    // },
    // {
    //     title: "System management",
    //     icon: <SettingsRoundedIcon />,
    //     link: "/admin/system",
    // },
    {
        title: "Contact message",
        icon: <MessageRoundedIcon />,
        link: "/admin/contact-message",
    },
];
