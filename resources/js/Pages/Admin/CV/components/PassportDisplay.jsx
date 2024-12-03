// Show PassportDisplay card
import FormText from "@/Components/Typo/FormText";
import Subtitle from "@/Components/Typo/Subtitle";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useState } from "react";
import ImageDialog from "@/Components/util/ImageDialog";

function PassportDisplay({
    passport,
    passport_number,
    passport_type,
    visa_type,
}) {
    const [openImage, setOpenImage] = useState(false); // State for image modal
    const handleOpenImage = () => setOpenImage(true); // Open image modal
    const handleCloseImage = () => setOpenImage(false); // Close image modal

    return (
        <Card sx={{ border: "1px solid #ddd", width: 250, borderRadius: 2 }}>
            <CardMedia>
                {passport ? (
                    <Box
                        onClick={handleOpenImage}
                        component="img"
                        src={`/storage/${passport}`}
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
                            Don't have passport photo.
                        </Typography>
                    </Box>
                )}
            </CardMedia>
            <CardContent sx={{ position: "relative" }}>
                <Subtitle>Passport no. {passport_number || "N/A"}</Subtitle>
                <FormText>Passport type: {passport_type || "N/A"}</FormText>
                <FormText>Visa: {visa_type || "N/A"}</FormText>
            </CardContent>

            {/* Image Dialog */}
            <ImageDialog
                open={openImage}
                onClose={handleCloseImage}
                imageSrc={`/storage/${passport}`}
            />
        </Card>
    );
}

export default PassportDisplay;
