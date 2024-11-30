import React, { useEffect, useState } from "react";
import {
    Container,
    Grid,
    Typography,
    Paper,
    Box,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Button,
    Divider,
    Grid2,
} from "@mui/material";
import AppLayout from "@/Layouts/AppLayout";
import Title from "@/Components/Typo/Title";
import { Head } from "@inertiajs/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Subtitle from "@/Components/Typo/Subtitle";
import parse from "html-react-parser"; // Import html-react-parser
import DateTimeFormatter from "@/Components/util/DateTimeFormatter";
import ContactForm from "@/Components/Forms/ContactForm";

const ContactUs = ({ contactMessages }) => {
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isMobileView, setIsMobileView] = useState(false);

    const handleSelectMessage = (message) => {
        setSelectedMessage(message);
    };

    const handleBackToList = () => {
        setSelectedMessage(null);
    };

    // Check if mobile view
    useEffect(() => {
        const updateView = () => {
            setIsMobileView(window.innerWidth < 600); // You can adjust this width
        };

        window.addEventListener("resize", updateView);
        updateView(); // Initial check

        return () => window.removeEventListener("resize", updateView);
    }, []);

    return (
        <AppLayout>
            <Head title="Contact Us" />
            <Box sx={{ bgcolor: "#f1f2f7" }}>
                <Container maxWidth="md" sx={{ py: 4 }}>
                    <Title>Contact Us</Title>
                    {contactMessages && contactMessages.length > 0 && (
                        <>
                            <Grid2 container spacing={2}>
                                {(!isMobileView || !selectedMessage) && (
                                    <Grid2 size={{ xs: 12, sm: 4 }}>
                                        <Paper sx={{ p: 2 }}>
                                            <Subtitle>Message List</Subtitle>
                                            <List>
                                                {contactMessages.map(
                                                    (message) => (
                                                        <ListItem
                                                            key={message.id}
                                                            button
                                                            onClick={() =>
                                                                handleSelectMessage(
                                                                    message
                                                                )
                                                            }
                                                            sx={{
                                                                bgcolor:
                                                                    message.id ==
                                                                    selectedMessage?.id
                                                                        ? "#eee"
                                                                        : "",
                                                                borderRadius: 2,
                                                            }}
                                                        >
                                                            <ListItemText
                                                                primary={
                                                                    <Typography
                                                                        fontSize={
                                                                            13
                                                                        }
                                                                        fontWeight={
                                                                            600
                                                                        }
                                                                        noWrap
                                                                    >
                                                                        {message.message.split(
                                                                            0,
                                                                            20
                                                                        )}
                                                                    </Typography>
                                                                }
                                                                secondary={
                                                                    <Typography
                                                                        fontSize={
                                                                            12
                                                                        }
                                                                        color={
                                                                            "primary"
                                                                        }
                                                                    >
                                                                        <DateTimeFormatter
                                                                            dateTime={
                                                                                message.created_at
                                                                            }
                                                                        />
                                                                    </Typography>
                                                                }
                                                            />
                                                        </ListItem>
                                                    )
                                                )}
                                            </List>
                                        </Paper>
                                    </Grid2>
                                )}

                                {selectedMessage && (
                                    <Grid2
                                        size={{ xs: 12, sm: 8 }}
                                        sx={{
                                            display:
                                                isMobileView && selectedMessage
                                                    ? "block"
                                                    : "block",
                                        }}
                                    >
                                        <Paper sx={{ p: 2 }}>
                                            {isMobileView && (
                                                <IconButton
                                                    onClick={handleBackToList}
                                                >
                                                    <ArrowBackIcon />
                                                </IconButton>
                                            )}
                                            <ListItemText>
                                                <Typography
                                                    fontSize={13}
                                                    fontWeight={800}
                                                    mb={2}
                                                    sx={{
                                                        borderBottom:
                                                            "1px solid #ddd",
                                                    }}
                                                >
                                                    Your Message:
                                                </Typography>
                                            </ListItemText>
                                            <Typography
                                                fontSize={15}
                                                fontWeight={500}
                                            >
                                                {selectedMessage.subject}
                                            </Typography>
                                            <Typography
                                                fontSize={14}
                                                p={2}
                                                sx={{ mt: 2 }}
                                            >
                                                {selectedMessage.message}
                                            </Typography>
                                            <Typography
                                                fontSize={12}
                                                color={"primary"}
                                                textAlign={"right"}
                                            >
                                                <DateTimeFormatter
                                                    dateTime={
                                                        selectedMessage.created_at
                                                    }
                                                />
                                            </Typography>

                                            <Divider
                                                sx={{
                                                    width: "50%",
                                                    mx: "auto",
                                                    my: 2,
                                                }}
                                            />

                                            {selectedMessage &&
                                                selectedMessage.replies.length >
                                                    0 && (
                                                    <Box sx={{ mt: 4 }}>
                                                        <Subtitle>
                                                            Replies by admin
                                                        </Subtitle>
                                                        <List>
                                                            {selectedMessage.replies.map(
                                                                (reply) => (
                                                                    <Box
                                                                        key={
                                                                            reply.id
                                                                        }
                                                                        sx={{
                                                                            p: 2,
                                                                            borderBottom:
                                                                                "1px solid #ddd",
                                                                        }}
                                                                    >
                                                                        <Typography
                                                                            fontSize={
                                                                                13
                                                                            }
                                                                        >
                                                                            {parse(
                                                                                reply.reply
                                                                            )}
                                                                        </Typography>
                                                                    </Box>
                                                                )
                                                            )}
                                                        </List>
                                                    </Box>
                                                )}
                                        </Paper>
                                    </Grid2>
                                )}
                                {!selectedMessage && !isMobileView && (
                                    <Paper
                                        sx={{
                                            width: "50%",
                                            p: 2,
                                            mx: "auto",
                                            mt: 2,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <img
                                            src="/images/contact_message.gif"
                                            alt="Contact Message"
                                            style={{
                                                height: 120,
                                                width: 120,
                                                margin: "auto",
                                            }}
                                        />
                                        <Typography
                                            fontSize={12}
                                            pt={2}
                                            fontWeight={"bold"}
                                            fontFamily={"Mina"}
                                        >
                                            Choose a message
                                        </Typography>
                                    </Paper>
                                )}
                            </Grid2>
                            <Divider sx={{ width: "70%", mx: "auto", my: 5 }} />
                        </>
                    )}
                    <ContactForm />
                </Container>
            </Box>
        </AppLayout>
    );
};

export default ContactUs;
