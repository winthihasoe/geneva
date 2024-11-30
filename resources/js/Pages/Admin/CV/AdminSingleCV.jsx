import NoData from "@/Components/util/NoData";
import { Head } from "@inertiajs/react";
import React from "react";
import { Box, Typography, Divider, Grid2, Button } from "@mui/material";
import LongText from "@/Components/Typo/LongText";
import Subtitle from "@/Components/Typo/Subtitle";
import logo from "../../../../../public/images/logo/logo.png"; // Adjust the path to your logo
import AdminLayout from "@/Layouts/AdminLayout";
import EditLevel from "./components/EditLevel";
import EditApprove from "./components/EditApprove";
import Certificates from "./components/Certificates";
import CVdetail from "./components/CVdetail";
import BackButton from "@/Components/BackButton";
import Experiences from "./components/Experiences";

const AdminSingleCV = ({ cv }) => {
    // const renderStars = (count) => {
    //     const stars = [];
    //     const starCount = Math.round(count / 2);
    //     for (let i = 0; i < starCount; i++) {
    //         stars.push(" * ");
    //     }
    //     return stars;
    // };

    return (
        <AdminLayout>
            <Head title="Single CV" />
            <BackButton />
            <Box position={"relative"}>
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
                {cv !== null && <CVdetail cv={cv} />}
            </Box>

            {/* Certificates  */}
            <Box>
                {cv.certificates && cv.certificates?.length > 0 && (
                    <Certificates certificates={cv.certificates} />
                )}
            </Box>

            <Divider sx={{ my: 2 }} />
            {/* Experiences  */}
            <Box>
                <Experiences experiences={cv.experiences} cvId={cv.id} />
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Edit caregiver level and approved status  */}
            <Grid2 container sx={{ my: 5 }} rowGap={3}>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <EditLevel cv={cv} />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <EditApprove cv={cv} />
                </Grid2>
            </Grid2>
        </AdminLayout>
    );
};

export default AdminSingleCV;
