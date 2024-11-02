import { Box, Grid2, Typography } from "@mui/material";
import React from "react";

const Contents = [
    {
        title: "Advanced Feeding Support",
        body: "assisting with breastfeeding techniques, supporting mothers experiencing breastfeeding difficulties, and managing feeding schedules for optimal growth.",
    },
    {
        title: "Specialized Soothing Techniques",
        body: " Skilled in advanced soothing methods for high-needs babies, such as using white noise and baby-wearing techniques",
    },
    {
        title: "Sleep Training and Schedule",
        body: "Knowledgeable in sleep training methods, implementing age-appropriate sleep schedules",
    },
    {
        title: "Emergency Preparedness",
        body: "Certified in infant CPR and first aid, with experience handling emergency situations calmly and efficiently.",
    },
    {
        title: "Special Health Needs",
        body: "Experienced in caring for newborns with special medical needs  and able to provide ongoing health monitoring, report concerns, and support parents through medical follow-ups.",
    },
    {
        title: "Parent Support",
        body: "Provides emotional support for new parents, offers guidance on newborn care best practices, and educates parents on developmental milestones and changes.",
    },
];

function SuperNewborn() {
    return (
        <Box sx={{ p: { xs: 0, sm: 2, md: 4 }, my: 3, position: "relative" }}>
            <Grid2
                container
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    gap: 1,
                }}
            >
                <Grid2 size={{ xs: 12, sm: 12, md: 8 }}>
                    <Typography
                        fontFamily={"Lilita One"}
                        fontSize={{ xs: 35, sm: 35, md: 40 }}
                        sx={{
                            wordWrap: "break-word",
                            textAlign: "center",
                            mb: 2,
                            color: "primary.main",
                            textShadow:
                                "2px 2px 0 #FFFFFF, -2px -2px 0 #FFFFFF, 2px -2px 0 #FFFFFF, -2px 2px 0 #FFFFFF, 4px 4px 10px rgba(0, 0, 0, 0.2)", // White stroke and subtle shadow
                        }}
                    >
                        Super Newborn Care Nanny
                    </Typography>
                    {Contents.map((content, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                                mb: 2,
                            }}
                        >
                            <Typography
                                fontSize={{ xs: 15, sm: 16, md: 16 }}
                                fontFamily={"Livvic"}
                                fontWeight={400}
                                color="primary"
                                width={"60%"}
                            >
                                <img
                                    src="/images/pricing/heart.png"
                                    alt="heart"
                                    style={{ width: 15, marginRight: "10px" }}
                                />
                                {content.title}:
                            </Typography>
                            <Typography
                                fontSize={{ xs: 15, sm: 16, md: 16 }}
                                fontFamily={"Livvic"}
                                fontWeight={400}
                                width={"100%"}
                            >
                                {content.body}
                            </Typography>
                        </Box>
                    ))}
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 7, md: 3 }}>
                    <img
                        src="/images/pricing/super_newborn_care.jpeg"
                        alt="Super Newborn"
                        style={{
                            width: "100%",
                            marginTop: "30px",
                            borderRadius: "40px",
                        }}
                    />
                </Grid2>
            </Grid2>
            <Box
                sx={{
                    display: {
                        xs: "none",
                        sm: "none",
                        md: "flex",
                        position: "absolute",
                        top: 0,
                        left: -30,
                    },
                }}
            >
                <img
                    src="/images/pricing/dotted2.png"
                    alt="arrow"
                    style={{
                        width: 100,
                    }}
                />
            </Box>
        </Box>
    );
}

export default SuperNewborn;
