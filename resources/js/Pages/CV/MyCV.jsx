import NoData from "@/Components/util/NoData";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, Grid2, Container } from "@mui/material";
import LongText from "@/Components/Typo/LongText";
import Subtitle from "@/Components/Typo/Subtitle";
import logo from "../../../../public/images/logo/logo.png"; // Adjust the path to your logo
import CVdetail from "../Admin/CV/components/CVdetail";
import Title from "@/Components/Typo/Title";
import TitleCenter from "@/Components/Typo/TitleCenter";

const MyCV = ({ cv }) => {
    const renderStars = (count) => {
        const stars = [];
        const starCount = Math.round(count / 2);
        for (let i = 0; i < starCount; i++) {
            stars.push(" * ");
        }
        return stars;
    };

    return (
        <AppLayout>
            <Head title="My CV" />
            <Box position={"relative"} py={1}>
                {cv == null && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "70vh",
                        }}
                    >
                        <NoData />
                    </Box>
                )}
                {cv !== null && (
                    <>
                        <TitleCenter>My CV</TitleCenter>
                        <CVdetail cv={cv} />
                    </>
                )}
            </Box>
        </AppLayout>
    );
};

export default MyCV;
