// Show certificate card
import FormText from "@/Components/Typo/FormText";
import Subtitle from "@/Components/Typo/Subtitle";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Dialog,
    IconButton,
} from "@mui/material";
import React, { useState } from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import YesOrNoModal from "@/Components/util/YesOrNoModal";
import ImageDialog from "@/Components/util/ImageDialog";
import { router } from "@inertiajs/react";

function Certificate({ certificate }) {
    const [openDelete, setOpenDelete] = useState(false);
    const handleCloseDelete = () => setOpenDelete(false);

    const [openImage, setOpenImage] = useState(false); // State for image modal
    const handleOpenImage = () => setOpenImage(true); // Open image modal
    const handleCloseImage = () => setOpenImage(false); // Close image modal

    const handleDeleteConfirm = () => {
        router.delete(route("certificates.delete", certificate.id), {
            onSuccess: () => {
                handleCloseDelete();
            },
        });
    };
    return (
        <Card sx={{ border: "1px solid #ddd", width: 250 }}>
            <CardMedia>
                <Box
                    onClick={handleOpenImage} // Open modal on image click
                    sx={{
                        backgroundImage: `url(storage/${certificate.certificate_photo})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        width: "100%",
                        height: 200,
                    }}
                />
            </CardMedia>
            <CardContent sx={{ position: "relative" }}>
                <Subtitle>{certificate.training_center_name}</Subtitle>
                <FormText>Course: {certificate.course}</FormText>
                <FormText>
                    Training start date: {certificate.start_date}
                </FormText>
                <FormText>Duration: {certificate.duration} months</FormText>
                <IconButton
                    aria-label="delete"
                    sx={{ position: "absolute", bottom: 0, right: 0 }}
                    size="small"
                    onClick={() => setOpenDelete(true)}
                >
                    <DeleteRoundedIcon color="error" fontSize="small" />
                </IconButton>
            </CardContent>

            <YesOrNoModal
                open={openDelete}
                onClose={handleCloseDelete}
                title="Do you want to delete this item?"
                onConfirm={handleDeleteConfirm} // Use the desired method here
            />

            {/* Image Dialog */}
            <ImageDialog
                open={openImage}
                onClose={handleCloseImage}
                imageSrc={`/storage/${certificate.certificate_photo}`}
            />
        </Card>
    );
}

export default Certificate;
