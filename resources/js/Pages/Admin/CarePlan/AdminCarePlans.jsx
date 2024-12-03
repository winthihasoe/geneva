import Title from "@/Components/Typo/Title";
import NoData from "@/Components/util/NoData";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import { Box, Container, Typography } from "@mui/material";
import React from "react";

function AdminCarePlans({ carePlans }) {
    console.log(carePlans);

    return (
        <AdminLayout>
            <Head title="Care Plans" />
            <Container maxWidth="lg">
                {carePlans && carePlans.length > 0 ? (
                    <>
                        <Title>Care Plans</Title>
                        {/* {carePlans.map((plan) => (
                            <Box
                                key={plan.id}
                                sx={{
                                    border: "2px solid",
                                    borderColor: "primary.main",
                                    p: 2,
                                    borderRadius: 10,
                                    maxWidth: 300,
                                    cursor: "pointer",
                                }}
                                onClick={() =>
                                    router.get(
                                        route("admin.care.plan.detail", plan.id)
                                    )
                                }
                            >
                                <Typography
                                    fontFamily={"Karma"}
                                    fontWeight={"bold"}
                                    fontSize={{ xs: 12, sm: 15, md: 18 }}
                                >
                                    {plan.user.name}
                                </Typography>
                                <Typography
                                    fontFamily={"Karma"}
                                    fontWeight={"bold"}
                                    fontSize={{ xs: 10, sm: 12, md: 13 }}
                                >
                                    {plan.start_date}
                                </Typography>
                            </Box>
                        ))} */}
                    </>
                ) : (
                    <NoData />
                )}
            </Container>
        </AdminLayout>
    );
}

export default AdminCarePlans;
