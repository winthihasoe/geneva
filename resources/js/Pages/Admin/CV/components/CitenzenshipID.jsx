// Show IdAndFamilyCert card
import FormText from "@/Components/Typo/FormText";
import Subtitle from "@/Components/Typo/Subtitle";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useState } from "react";
import ImageDialog from "@/Components/util/ImageDialog";

function CitenzenshipID({ citizenship_certificate }) {
    const [openImage, setOpenImage] = useState(false); // State for image modal
    const handleOpenImage = () => setOpenImage(true); // Open image modal
    const handleCloseImage = () => setOpenImage(false); // Close image modal

    return (
        <Card sx={{ border: "1px solid #ddd", width: 250, borderRadius: 2 }}>
            <CardMedia>
                {citizenship_certificate ? (
                    <Box
                        onClick={handleOpenImage}
                        component="img"
                        src={`/storage/${citizenship_certificate}`}
                        alt="Certificate"
                        sx={{
                            width: "100%",
                            height: "180px",
                            objectFit: "cover",
                            mb: 2,
                            borderRadius: 2,
                        }}
                    />
                ) : (
                    <Box
                        sx={{
                            width: "100%",
                            bgcolor: "grey.200",
                            p: 1,
                            mb: 2,
                            borderRadius: 2,
                        }}
                    >
                        <Typography textAlign={"center"} fontFamily={"Karma"}>
                            Don't have Citizenship ID.
                        </Typography>
                    </Box>
                )}
            </CardMedia>
            <CardContent sx={{ position: "relative" }}>
                <Subtitle>Citizenship ID. </Subtitle>
            </CardContent>

            {/* Image Dialog */}
            <ImageDialog
                open={openImage}
                onClose={handleCloseImage}
                imageSrc={`/storage/${citizenship_certificate}`}
            />
        </Card>
    );
}

export default CitenzenshipID;
