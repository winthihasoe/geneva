import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    Divider,
    IconButton,
    Typography,
} from "@mui/material";
import { Head, router } from "@inertiajs/react";
import BackButton from "@/Components/BackButton";
import BodyText from "@/Components/Typo/BodyText";
import Subtitle from "@/Components/Typo/Subtitle";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import parse from "html-react-parser"; // Import html-react-parser

import AdminLayout from "@/Layouts/AdminLayout";
import ReplyMessage from "./components/ReplyMessage";
import Title from "@/Components/Typo/Title";
import YesOrNoModal from "@/Components/util/YesOrNoModal";

export default function AdminSingleContactMessage({ message }) {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const [isReplying, setIsReplying] = useState(false);
    const [openDeleteReply, setOpenDeleteReply] = useState(false);
    const handleCloseDeleteReply = () => setOpenDeleteReply(false);
    const [selectedReplyMessage, setSelectedReplyMessage] = useState(null);

    const handleDeleteReplyMessage = () => {
        router.delete(
            route("admin.message.reply.delete", selectedReplyMessage),
            {
                onSuccess: () => handleCloseDeleteReply(),
            }
        );
    };

    const handleDeleteContactMessage = () => {
        router.delete(route("admin.message.delete", message.id));
    };

    return (
        <AdminLayout>
            <Head title="Single message" />
            <Title>
                <BackButton route={"/admin/contact-message"} />
                Contact message detail
            </Title>
            <Container maxWidth="sm" sx={{ pb: 2 }}>
                <Subtitle>From: {message.name || "N/A"}</Subtitle>
                <Subtitle>Email: {message.email || "N/A"}</Subtitle>
                {message.phone_number && (
                    <Subtitle>Phone Number: {message.phone_number}</Subtitle>
                )}
                <Subtitle>Message:</Subtitle>
                <Typography paragraph px={1} fontSize={13}>
                    {message.message}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                        justifyContent: "center",
                        mt: 5,
                    }}
                >
                    <Button
                        variant="outlined"
                        sx={{ width: 150 }}
                        onClick={() =>
                            router.put(route("markAsUnread", message.id), {
                                is_read: false,
                            })
                        }
                        size="small"
                    >
                        <Typography fontSize={12}>Mark as Unread</Typography>
                    </Button>
                    {message.user_id !== null && (
                        <Button
                            variant="contained"
                            onClick={() => setIsReplying(!isReplying)}
                            size="small"
                        >
                            <Typography fontSize={12}>Reply</Typography>
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => setOpen(true)}
                        size="small"
                    >
                        <Typography fontSize={12}>Delete</Typography>
                    </Button>
                </Box>
                <Divider sx={{ my: 2 }} />
                {isReplying && (
                    <ReplyMessage
                        messageId={message.id}
                        setIsReplying={setIsReplying}
                    />
                )}
                {/* Showing Reply Message */}
                {message.replies &&
                    message.replies.length > 0 &&
                    message.replies.map((reply) => (
                        <Box
                            key={reply.id}
                            sx={{
                                border: "1px dashed #1c90a9",
                                p: 2,
                                borderRadius: 3,
                                my: 3,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 2,
                                    justifyContent: "space-between",
                                }}
                            >
                                <Subtitle>Reply:</Subtitle>
                                <IconButton
                                    onClick={() => {
                                        setSelectedReplyMessage(reply.id);
                                        setOpenDeleteReply(true);
                                    }}
                                >
                                    <DeleteRoundedIcon fontSize="small" />
                                </IconButton>
                            </Box>
                            <Typography fontSize={13}>
                                {parse(reply.reply)} {/* Render HTML content */}
                            </Typography>
                            <BodyText>
                                By: <strong>{reply.name}</strong>
                            </BodyText>
                        </Box>
                    ))}

                {/* Delete Contact Message */}
                <YesOrNoModal
                    open={open}
                    onClose={handleClose}
                    title=" Do you want to delete this message?"
                    onConfirm={handleDeleteContactMessage}
                />

                {/* Delete Reply Message */}
                <YesOrNoModal
                    open={openDeleteReply}
                    onClose={handleCloseDeleteReply}
                    title="Do you want to delete this reply message?"
                    onConfirm={handleDeleteReplyMessage}
                />
            </Container>
        </AdminLayout>
    );
}
