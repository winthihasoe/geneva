import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Container,
    IconButton,
    Typography,
} from "@mui/material";

import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import YesOrNoModal from "@/Components/util/YesOrNoModal";
import { router } from "@inertiajs/react";

function ExperienceCard({ exp }) {
    const [openDelete, setOpenDelete] = useState(false);
    const handleCloseDelete = () => setOpenDelete(false);

    const handleDelete = (id) => {
        router.delete(route("experience.delete", id), {
            onSuccess: () => {
                handleCloseDelete();
            },
        });
    };
    return (
        <Card
            sx={{
                borderRadius: 5,
                bgcolor: "#f0f0f0",
                maxWidth: 600,
                margin: "10px auto",
                position: "relative",
                overflow: "visible",
            }}
        >
            <CardContent>
                <Typography
                    variant="h6"
                    fontSize={{
                        xs: 13,
                        sm: 14,
                        md: 15,
                    }}
                    fontWeight={600}
                    fontFamily={"Mina"}
                >
                    {exp.experience}
                </Typography>{" "}
                <IconButton
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        right: -15,
                        bgcolor: "#fff",
                    }}
                    onClick={() => setOpenDelete(true)}
                >
                    <DeleteForeverRoundedIcon />
                </IconButton>
            </CardContent>
            <YesOrNoModal
                open={openDelete}
                onClose={handleCloseDelete}
                title="Do you want to delete this experience?"
                onConfirm={() => handleDelete(exp.id)} // Use the desired method here
            />
        </Card>
    );
}

export default ExperienceCard;
