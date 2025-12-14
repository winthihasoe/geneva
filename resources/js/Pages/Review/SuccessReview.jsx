import AppLayout from "@/Layouts/AppLayout";
import React, { useRef, useState } from "react";
import {
    Box,
    Container,
    Typography,
    Paper,
    Divider,
    Button,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Snackbar,
    Alert,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DiscountIcon from "@mui/icons-material/Discount";
import { router } from "@inertiajs/react";
import logo from "../../../../public/images/logo/logo.png";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ShareIcon from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function SuccessReview({ discountCard }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const cardRef = useRef(null);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const showSnackbar = (message, severity = "success") => {
        setSnackbar({ open: true, message, severity });
    };

    // Option 1: Save as Image
    const saveAsImage = async () => {
        try {
            const cardElement = cardRef.current;
            const canvas = await html2canvas(cardElement, {
                backgroundColor: null,
                scale: 2,
                useCORS: true,
                allowTaint: true,
                logging: false,
            });

            const image = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.download = `discount-card-${discountCard.card_no}.png`;
            link.href = image;
            link.click();

            showSnackbar("Card saved as image!");
            handleCloseMenu();
        } catch (error) {
            showSnackbar("Failed to save card", "error");
        }
    };

    // Option 2: Copy Card Number
    const copyCardNumber = async () => {
        try {
            await navigator.clipboard.writeText(discountCard.card_no);
            showSnackbar("Card number copied to clipboard!");
            handleCloseMenu();
        } catch (error) {
            showSnackbar("Failed to copy card number", "error");
        }
    };

    // Option 3: Share (Mobile)
    const shareCard = async () => {
        const text = `My Geneva Discount Card\nCard No: ${
            discountCard.card_no
        }\nDiscount: ${
            discountCard.discount_percentage
        }% OFF\nExpires: ${formatDate(discountCard.expires_at)}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Geneva Discount Card",
                    text: text,
                });
                showSnackbar("Card shared successfully!");
                handleCloseMenu();
            } catch (error) {
                if (error.name !== "AbortError") {
                    showSnackbar("Failed to share card", "error");
                }
            }
        } else {
            // Fallback: copy to clipboard
            await navigator.clipboard.writeText(text);
            showSnackbar("Card details copied to clipboard!");
            handleCloseMenu();
        }
    };

    // Option 4: Save as PDF (requires jspdf)
    const saveAsPDF = async () => {
        try {
            const cardElement = cardRef.current;
            const canvas = await html2canvas(cardElement, {
                backgroundColor: null,
                scale: 2,
                useCORS: true,
                allowTaint: true,
                logging: false,
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "landscape",
                unit: "px",
                format: [canvas.width / 2, canvas.height / 2],
            });

            pdf.addImage(
                imgData,
                "PNG",
                0,
                0,
                canvas.width / 2,
                canvas.height / 2
            );
            pdf.save(`discount-card-${discountCard.card_no}.pdf`);

            showSnackbar("Card saved as PDF!");
            handleCloseMenu();
        } catch (error) {
            showSnackbar("Failed to save as PDF", "error");
        }
    };

    return (
        <AppLayout>
            <Container maxWidth="md" sx={{ py: 6 }}>
                {/* Success Message */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mb: 4,
                    }}
                >
                    <CheckCircleIcon
                        sx={{ fontSize: 60, color: "success.main", mb: 2 }}
                    />
                    <Typography
                        variant="h4"
                        fontSize={{ xs: "1.3rem", sm: "1.5rem" }}
                        fontWeight="bold"
                        color="primary"
                        gutterBottom
                        textAlign="center"
                        fontFamily={"Roboto Slab"}
                    >
                        Thank You for Your Feedback!
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        textAlign="center"
                    >
                        Your feedback helps us improve our caregiver services.
                    </Typography>
                </Box>

                {/* Discount Card */}
                <Paper
                    ref={cardRef}
                    elevation={6}
                    sx={{
                        background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "white",
                        p: { xs: 2, sm: 3, md: 4 },
                        borderRadius: 4,
                        position: "relative",
                        overflow: "hidden",
                        mb: 3,
                        maxWidth: 500,
                        mx: "auto",
                    }}
                >
                    {/* Decorative circles */}
                    <Box
                        sx={{
                            position: "absolute",
                            width: 200,
                            height: 200,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.1)",
                            top: -100,
                            right: -100,
                        }}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            width: 150,
                            height: 150,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.1)",
                            bottom: -75,
                            left: -75,
                        }}
                    />

                    {/* Logo */}
                    <Box
                        sx={{
                            top: 11,
                            right: 15,
                            position: "absolute",
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <img
                            src={logo}
                            alt="Geneva Logo"
                            style={{ width: "16%" }}
                        />
                    </Box>

                    <Box sx={{ position: "relative", zIndex: 1 }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: { xs: 1, sm: 2, md: 3 },
                            }}
                        >
                            <CardGiftcardIcon
                                sx={{
                                    fontSize: { xs: 25, sm: 30, md: 40 },
                                    mr: 2,
                                }}
                            />
                            <Typography
                                variant="h5"
                                fontSize={{
                                    xs: "1.1rem",
                                    sm: "1.5rem",
                                    md: "2rem",
                                }}
                                fontWeight="bold"
                                fontFamily={"Roboto Slab"}
                            >
                                Discount Card
                            </Typography>
                        </Box>

                        <Divider
                            sx={{
                                bgcolor: "rgba(255,255,255,0.3)",
                                mb: { xs: 1, sm: 2, md: 3 },
                            }}
                        />

                        {/* Card Number */}
                        <Box sx={{ mb: { xs: 1, sm: 2, md: 3 } }}>
                            <Typography variant="caption" sx={{ opacity: 0.8 }}>
                                CARD NUMBER
                            </Typography>
                            <Typography
                                variant="h3"
                                fontWeight="bold"
                                letterSpacing={4}
                                sx={{
                                    fontFamily: "monospace",
                                    fontSize: { xs: "1.5rem", sm: "2rem" },
                                }}
                            >
                                {discountCard.card_no}
                            </Typography>
                        </Box>

                        {/* Discount Info */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                // flexWrap: "wrap",
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        opacity: 0.8,
                                        fontSize: {
                                            xs: "0.6rem",
                                            sm: "0.8rem",
                                        },
                                    }}
                                >
                                    DISCOUNT
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <DiscountIcon
                                        sx={{ mr: 1, fontSize: "1.2rem" }}
                                    />
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        fontSize={{
                                            xs: "1rem",
                                            sm: "1.5rem",
                                        }}
                                    >
                                        {discountCard.discount_percentage}% OFF
                                    </Typography>
                                </Box>
                            </Box>

                            <Box>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        opacity: 0.8,
                                        fontSize: {
                                            xs: "0.6rem",
                                            sm: "0.8rem",
                                        },
                                    }}
                                >
                                    EXPIRES ON
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <CalendarTodayIcon
                                        sx={{ mr: 1, fontSize: "1.2rem" }}
                                    />
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        fontSize={{
                                            xs: "0.8rem",
                                            sm: "1rem",
                                            md: "1.2rem",
                                        }}
                                        color="rgba(209, 209, 209, 0.87)"
                                    >
                                        {formatDate(discountCard.expires_at)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Paper>

                {/* Save Card Button */}
                <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                    <Button
                        variant="outlined"
                        startIcon={<SaveAltIcon />}
                        onClick={handleOpenMenu}
                        size="small"
                    >
                        Save Card
                    </Button>
                </Box>

                {/* Save Options Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                >
                    <MenuItem onClick={saveAsImage}>
                        <ListItemIcon>
                            <SaveAltIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Save as Image</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={copyCardNumber}>
                        <ListItemIcon>
                            <ContentCopyIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Copy Card Number</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={shareCard}>
                        <ListItemIcon>
                            <ShareIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Share</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={saveAsPDF}>
                        <ListItemIcon>
                            <SaveAltIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Save as PDF</ListItemText>
                    </MenuItem>
                </Menu>

                {/* Snackbar for notifications */}
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={3000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>

                {/* Card Details */}
                <Paper sx={{ p: 3, mb: 3, maxWidth: 500, mx: "auto" }}>
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        gutterBottom
                    >
                        Card Details
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography
                                fontSize={{ xs: "0.9rem", sm: "1rem" }}
                                color="text.secondary"
                            >
                                Issued For:
                            </Typography>
                            <Typography
                                fontSize={{ xs: "0.9rem", sm: "1rem" }}
                                fontWeight="500"
                            >
                                {discountCard.issued_for}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography
                                fontSize={{ xs: "0.9rem", sm: "1rem" }}
                                color="text.secondary"
                            >
                                Issued By:
                            </Typography>
                            <Typography
                                fontSize={{ xs: "0.9rem", sm: "1rem" }}
                                fontWeight="500"
                            >
                                {discountCard.issued_by}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography
                                fontSize={{ xs: "0.9rem", sm: "1rem" }}
                                color="text.secondary"
                            >
                                Issued Date:
                            </Typography>
                            <Typography
                                fontSize={{ xs: "0.9rem", sm: "1rem" }}
                                fontWeight="500"
                            >
                                {formatDate(discountCard.created_at)}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography
                                fontSize={{ xs: "0.9rem", sm: "1rem" }}
                                color="text.secondary"
                            >
                                Status:
                            </Typography>
                            <Typography
                                fontSize={{ xs: "0.9rem", sm: "1rem" }}
                                fontWeight="500"
                                color={
                                    discountCard.is_used
                                        ? "error.main"
                                        : "success.main"
                                }
                            >
                                {discountCard.is_used ? "Used" : "Active"}
                            </Typography>
                        </Box>
                    </Box>
                </Paper>

                {/* Instructions */}
                <Paper
                    sx={{
                        p: 3,
                        mb: 3,
                        bgcolor: "info.lighter",
                        maxWidth: 500,
                        mx: "auto",
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        gutterBottom
                    >
                        How to Use Your Discount Card
                    </Typography>
                    <Typography variant="body2" paragraph>
                        • Present this card number during your next booking
                    </Typography>
                    <Typography variant="body2" paragraph>
                        • The discount will be applied automatically
                    </Typography>
                    <Typography variant="body2" paragraph>
                        • This card can only be used once
                    </Typography>
                    <Typography variant="body2">
                        • Card expires on {formatDate(discountCard.expires_at)}
                    </Typography>
                </Paper>

                {/* Action Button */}
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => router.get(route("home"))}
                    >
                        Back to Home
                    </Button>
                </Box>
            </Container>
        </AppLayout>
    );
}

export default SuccessReview;
