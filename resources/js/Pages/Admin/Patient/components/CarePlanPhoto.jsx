import ImageDialog from "@/Components/util/ImageDialog";
import {
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardMedia,
    IconButton,
} from "@mui/material";
import React, { useState } from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { router } from "@inertiajs/react";
import YesOrNoModal from "@/Components/util/YesOrNoModal";

function CarePlanPhoto({ photo }) {
    const [openImage, setOpenImage] = useState(false); // State for image modal
    const handleOpenImage = () => setOpenImage(true); // Open image modal
    const handleCloseImage = () => setOpenImage(false); // Close image modal

    const [openDelete, setOpenDelete] = useState(false);
    const handleCloseDelete = () => setOpenDelete(false);

    const handleDeleteConfirm = () => {
        router.delete(route("care.plan.delete", photo.id), {
            preserveScroll: true,
            onSuccess: () => {
                handleCloseDelete();
            },
        });
    };

    return (
        <>
            <Card sx={{ maxWidth: 150, borderRadius: 3 }}>
                <CardMedia>
                    <Box
                        onClick={handleOpenImage}
                        component="img"
                        src={`/storage/${photo.photo_path}`}
                        alt="Certificate"
                        sx={{
                            width: "100%",
                            height: "250px",
                            objectFit: "cover",
                            mb: 2,
                            borderRadius: 2,
                        }}
                    />
                </CardMedia>

                <Box textAlign={"center"}>
                    <IconButton
                        sx={{ bgcolor: "#efefef" }}
                        onClick={() => setOpenDelete(true)}
                    >
                        <DeleteRoundedIcon color="error" fontSize="small" />
                    </IconButton>
                </Box>
            </Card>
            {/* Image Dialog */}
            <ImageDialog
                open={openImage}
                onClose={handleCloseImage}
                imageSrc={`/storage/${photo.photo_path}`}
            />

            <YesOrNoModal
                open={openDelete}
                onClose={handleCloseDelete}
                title="Do you want to delete this item?"
                onConfirm={handleDeleteConfirm} // Use the desired method here
            />
        </>
    );
}

export default CarePlanPhoto;
