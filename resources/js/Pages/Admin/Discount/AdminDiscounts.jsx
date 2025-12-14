import React, { useRef, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import {
    Box,
    Container,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Collapse,
    Pagination,
    Divider,
    Autocomplete,
    Snackbar,
    Menu,
    ListItemIcon,
    ListItemText,
    Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DiscountIcon from "@mui/icons-material/Discount";
import AddCardIcon from "@mui/icons-material/AddCard";
import logo from "../../../../../public/images/logo/logo.png";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ShareIcon from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function AdminDiscounts({
    discountCards,
    filters: initialFilters = {},
    patients,
}) {
    const [filterOpen, setFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        card_no: initialFilters.card_no || "",
        is_used: initialFilters.is_used || "",
        is_expired: initialFilters.is_expired || "",
    });
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [formData, setFormData] = useState({
        patient_id: "",
        discount_percentage: 5,
        issued_for: "",
        expires_at: "",
        is_used: false,
    });

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const isExpired = (date) => {
        return date && new Date(date) < new Date();
    };

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const handleApplyFilters = () => {
        router.get(route("admin.discount.index"), filters);
    };

    const handleClearFilters = () => {
        setFilters({ card_no: "", is_used: "", is_expired: "" });
        router.get(route("admin.discount.index"));
    };

    const handlePageChange = (event, value) => {
        router.get(route("admin.discount.index"), { ...filters, page: value });
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        router.post(route("admin.discount.store"), formData, {
            onSuccess: () => {
                setCreateDialogOpen(false);
                setFormData({
                    patient_id: "",
                    discount_percentage: 5,
                    issued_for: "",
                    expires_at: "",
                });
            },
        });
    };

    const handleViewCard = async (card) => {
        try {
            const response = await fetch(route("admin.discount.show", card.id));
            const data = await response.json();
            setSelectedCard(data);
            setViewDialogOpen(true);
        } catch (error) {
            console.error("Failed to fetch card details:", error);
        }
    };

    const handleEditCard = (card) => {
        setSelectedCard(card);
        setFormData({
            discount_percentage: card.discount_percentage,
            issued_for: card.issued_for,
            expires_at: card.expires_at?.split("T")[0] || "",
            is_used: card.is_used,
        });
        setEditDialogOpen(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        router.put(route("admin.discount.update", selectedCard.id), formData, {
            onSuccess: () => {
                setEditDialogOpen(false);
                setSelectedCard(null);
            },
        });
    };

    const handleDeleteCard = (card) => {
        if (card.issued_by === "System") {
            alert("Cannot delete system-generated cards");
            return;
        }
        if (card.is_used) {
            alert("Cannot delete used cards");
            return;
        }
        if (confirm("Are you sure you want to delete this discount card?")) {
            router.delete(route("admin.discount.destroy", card.id));
        }
    };

    const hasActiveFilters =
        filters.card_no || filters.is_used || filters.is_expired;

    // save discount card functionality
    const discountCard = selectedCard || {};
    const [anchorEl, setAnchorEl] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const cardRef = useRef(null);

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
        <AdminLayout>
            <Head title="Discount Cards" />
            <Container maxWidth="lg" sx={{ pb: 4, px: { xs: 0 } }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        rowGap: 2,
                        alignItems: "center",
                        mb: 3,
                    }}
                >
                    <Typography
                        variant="h4"
                        color="primary"
                        fontFamily={"Roboto Slab"}
                        fontWeight="bold"
                    >
                        Discount Cards
                    </Typography>
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<AddCardIcon />}
                        onClick={() => setCreateDialogOpen(true)}
                    >
                        Create Card
                    </Button>
                </Box>

                {/* Filter Section */}
                <Box sx={{ mb: 2 }}>
                    <Button
                        startIcon={<FilterListIcon />}
                        endIcon={
                            filterOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />
                        }
                        onClick={() => setFilterOpen(!filterOpen)}
                        variant="outlined"
                        size="small"
                    >
                        Filters{" "}
                        {hasActiveFilters &&
                            `(${
                                Object.values(filters).filter(Boolean).length
                            })`}
                    </Button>
                </Box>

                <Collapse in={filterOpen}>
                    <Paper sx={{ p: 1.5, mb: 2 }}>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                flexWrap: "wrap",
                                mb: 2,
                            }}
                        >
                            <TextField
                                label="Card Number"
                                size="small"
                                value={filters.card_no}
                                onChange={(e) =>
                                    handleFilterChange(
                                        "card_no",
                                        e.target.value
                                    )
                                }
                                sx={{ minWidth: 200 }}
                            />
                            <FormControl
                                size="small"
                                sx={{ minWidth: { xs: 220, sm: 150 } }}
                            >
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={filters.is_used}
                                    label="Status"
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "is_used",
                                            e.target.value
                                        )
                                    }
                                >
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="false">Unused</MenuItem>
                                    <MenuItem value="true">Used</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl
                                size="small"
                                sx={{ minWidth: { xs: 220, sm: 150 } }}
                            >
                                <InputLabel>Expiry</InputLabel>
                                <Select
                                    value={filters.is_expired}
                                    label="Expiry"
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "is_expired",
                                            e.target.value
                                        )
                                    }
                                >
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="false">Valid</MenuItem>
                                    <MenuItem value="true">Expired</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                variant="contained"
                                size="small"
                                onClick={handleApplyFilters}
                            >
                                Apply
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={handleClearFilters}
                                disabled={!hasActiveFilters}
                            >
                                Clear
                            </Button>
                        </Box>
                    </Paper>
                </Collapse>

                {/* Discount Cards Table */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ bgcolor: "primary.light" }}>
                            <TableRow>
                                <TableCell
                                    sx={{ fontWeight: "bold", color: "white" }}
                                >
                                    Card No.
                                </TableCell>

                                <TableCell
                                    sx={{ fontWeight: "bold", color: "white" }}
                                >
                                    Discount
                                </TableCell>

                                <TableCell
                                    sx={{ fontWeight: "bold", color: "white" }}
                                >
                                    Expires At
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: "bold", color: "white" }}
                                >
                                    Status
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: "bold", color: "white" }}
                                >
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {discountCards.data.map((card) => (
                                <TableRow key={card.id} hover>
                                    <TableCell
                                        sx={{
                                            fontFamily: "monospace",
                                            fontWeight: "bold",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => handleViewCard(card)}
                                    >
                                        {card.card_no}
                                    </TableCell>

                                    <TableCell
                                        onClick={() => handleViewCard(card)}
                                        sx={{ cursor: "pointer" }}
                                    >
                                        {card.discount_percentage}%
                                    </TableCell>

                                    <TableCell
                                        onClick={() => handleViewCard(card)}
                                        sx={{ cursor: "pointer" }}
                                    >
                                        {card.expires_at
                                            ? formatDate(card.expires_at)
                                            : "No expiry"}
                                    </TableCell>
                                    <TableCell
                                        onClick={() => handleViewCard(card)}
                                        sx={{ cursor: "pointer" }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                gap: 0.5,
                                                flexWrap: "wrap",
                                            }}
                                        >
                                            <Chip
                                                label={
                                                    card.is_used
                                                        ? "Used"
                                                        : "Unused"
                                                }
                                                color={
                                                    card.is_used
                                                        ? "default"
                                                        : "success"
                                                }
                                                size="small"
                                            />
                                            {isExpired(card.expires_at) && (
                                                <Chip
                                                    label="Expired"
                                                    color="error"
                                                    size="small"
                                                />
                                            )}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {/* <IconButton
                                            size="small"
                                            onClick={() => handleViewCard(card)}
                                            color="primary"
                                        >
                                            <VisibilityIcon fontSize="small" />
                                        </IconButton> */}

                                        <IconButton
                                            size="small"
                                            onClick={() => handleEditCard(card)}
                                            color="info"
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        {!card.is_used && (
                                            <IconButton
                                                size="small"
                                                onClick={() =>
                                                    handleDeleteCard(card)
                                                }
                                                color="error"
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination */}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                    <Pagination
                        count={discountCards.last_page}
                        page={discountCards.current_page}
                        onChange={handlePageChange}
                    />
                </Box>

                {/* Create Dialog */}
                <Dialog
                    open={createDialogOpen}
                    onClose={() => setCreateDialogOpen(false)}
                    maxWidth="sm"
                    fullWidth
                >
                    <form onSubmit={handleCreateSubmit}>
                        <DialogTitle>Create Discount Card</DialogTitle>
                        <DialogContent>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    mt: 1,
                                }}
                            >
                                <Autocomplete
                                    options={patients || []}
                                    getOptionLabel={(option) =>
                                        `${option.first_name} ${option.last_name}`
                                    }
                                    onChange={(e, value) =>
                                        setFormData({
                                            ...formData,
                                            patient_id: value?.id || "",
                                        })
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Patient"
                                            variant="standard"
                                        />
                                    )}
                                />
                                <TextField
                                    label="Discount Percentage"
                                    type="number"
                                    value={formData.discount_percentage}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            discount_percentage: e.target.value,
                                        })
                                    }
                                    required
                                    variant="standard"
                                    inputProps={{ min: 1, max: 100 }}
                                />
                                <TextField
                                    variant="standard"
                                    label="Issued For"
                                    value={formData.issued_for}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            issued_for: e.target.value,
                                        })
                                    }
                                    multiline
                                />
                                <TextField
                                    variant="standard"
                                    label="Expires At"
                                    type="date"
                                    value={formData.expires_at}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            expires_at: e.target.value,
                                        })
                                    }
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                size="small"
                                onClick={() => setCreateDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="small"
                                type="submit"
                                variant="contained"
                            >
                                Create
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>

                {/* View Dialog */}
                <Dialog
                    open={viewDialogOpen}
                    onClose={() => setViewDialogOpen(false)}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>Discount Card Details</DialogTitle>
                    <DialogContent>
                        {selectedCard && (
                            <Box>
                                <Paper
                                    ref={cardRef}
                                    elevation={6}
                                    sx={{
                                        background:
                                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                        color: "white",
                                        p: { xs: 2, sm: 3, md: 4 },
                                        borderRadius: 4,
                                        mb: 2,
                                        postion: "relative",
                                        overflow: "hidden",
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
                                            top: { xs: -90, sm: -50, md: -40 },
                                            right: {
                                                xs: -80,
                                                sm: -60,
                                                md: -50,
                                            },
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            width: 150,
                                            height: 150,
                                            borderRadius: "50%",
                                            background: "rgba(255,255,255,0.1)",
                                            left: -50,
                                            top: 250,
                                        }}
                                    />

                                    {/* Logo */}
                                    <Box
                                        sx={{
                                            top: 60,
                                            right: 30,
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
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mb: 2,
                                        }}
                                    >
                                        <CardGiftcardIcon
                                            sx={{
                                                fontSize: {
                                                    xs: 25,
                                                    sm: 30,
                                                    md: 40,
                                                },
                                                mr: 2,
                                            }}
                                        />
                                        <Typography
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
                                            mb: { xs: 0, sm: 2, md: 3 },
                                        }}
                                    />

                                    {/* Card Number */}
                                    <Box sx={{ mb: { xs: 0, sm: 2, md: 3 } }}>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                opacity: 0.8,
                                                fontSize: {
                                                    xs: "0.5rem",
                                                    sm: "0.8rem",
                                                },
                                            }}
                                        >
                                            CARD NUMBER
                                        </Typography>
                                        <Typography
                                            fontWeight="bold"
                                            letterSpacing={4}
                                            sx={{
                                                fontFamily: "monospace",
                                                fontSize: {
                                                    xs: "1.2rem",
                                                    sm: "2rem",
                                                },
                                            }}
                                        >
                                            {selectedCard.card_no}
                                        </Typography>
                                    </Box>

                                    {/* Discount Info */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    opacity: 0.8,
                                                    fontSize: {
                                                        xs: "0.5rem",
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
                                                    sx={{
                                                        mr: 1,
                                                        fontSize: {
                                                            xs: "0.7rem",
                                                            sm: "1rem",
                                                        },
                                                    }}
                                                />
                                                <Typography
                                                    variant="h6"
                                                    fontWeight="bold"
                                                    fontSize={{
                                                        xs: "0.6rem",
                                                        sm: "1.5rem",
                                                    }}
                                                >
                                                    {
                                                        selectedCard.discount_percentage
                                                    }
                                                    % OFF
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    opacity: 0.8,
                                                    fontSize: {
                                                        xs: "0.5rem",
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
                                                    sx={{
                                                        mr: 1,
                                                        fontSize: {
                                                            xs: "0.7rem",
                                                            sm: "1rem",
                                                        },
                                                    }}
                                                />
                                                <Typography
                                                    variant="h6"
                                                    fontWeight="bold"
                                                    fontSize={{
                                                        xs: "0.6rem",
                                                        sm: "0.8rem",
                                                        md: "1rem",
                                                    }}
                                                    color="rgba(209, 209, 209, 0.87)"
                                                >
                                                    {selectedCard.expires_at
                                                        ? formatDate(
                                                              selectedCard.expires_at
                                                          )
                                                        : "No expiry"}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Paper>

                                {/* Save Card Button */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        mb: 3,
                                    }}
                                >
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
                                        <ListItemText>
                                            Save as Image
                                        </ListItemText>
                                    </MenuItem>
                                    <MenuItem onClick={copyCardNumber}>
                                        <ListItemIcon>
                                            <ContentCopyIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText>
                                            Copy Card Number
                                        </ListItemText>
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
                                    onClose={() =>
                                        setSnackbar({
                                            ...snackbar,
                                            open: false,
                                        })
                                    }
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "center",
                                    }}
                                >
                                    <Alert
                                        severity={snackbar.severity}
                                        sx={{ width: "100%" }}
                                    >
                                        {snackbar.message}
                                    </Alert>
                                </Snackbar>
                                {/* Card Details  */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Patient:
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            fontWeight="500"
                                        >
                                            {selectedCard.patient?.first_name}{" "}
                                            {selectedCard.patient?.last_name}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Issued For:
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            fontWeight="500"
                                        >
                                            {selectedCard.issued_for}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Issued By:
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            fontWeight="500"
                                        >
                                            {selectedCard.issued_by}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Created:
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            fontWeight="500"
                                        >
                                            {formatDate(
                                                selectedCard.created_at
                                            )}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Status:
                                        </Typography>
                                        <Chip
                                            label={
                                                selectedCard.is_used
                                                    ? "Used"
                                                    : "Unused"
                                            }
                                            color={
                                                selectedCard.is_used
                                                    ? "default"
                                                    : "success"
                                            }
                                            size="small"
                                        />
                                    </Box>
                                    {selectedCard.used_at && (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                Used At:
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                fontWeight="500"
                                            >
                                                {formatDate(
                                                    selectedCard.used_at
                                                )}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                                <Divider
                                    sx={{
                                        bgcolor: "rgba(255,255,255,0.3)",
                                        my: { xs: 1, sm: 2, md: 3 },
                                    }}
                                />
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Update the discount card status from the
                                    edit dialog if necessary.
                                </Typography>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setViewDialogOpen(false)}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Edit Dialog */}
                <Dialog
                    open={editDialogOpen}
                    onClose={() => setEditDialogOpen(false)}
                    maxWidth="sm"
                    fullWidth
                >
                    <form onSubmit={handleEditSubmit}>
                        <DialogTitle>Edit Discount Card</DialogTitle>
                        <DialogContent>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    mt: 1,
                                }}
                            >
                                <Autocomplete
                                    options={patients || []}
                                    getOptionLabel={(option) =>
                                        `${option.first_name} ${option.last_name}`
                                    }
                                    onChange={(e, value) =>
                                        setFormData({
                                            ...formData,
                                            patient_id: value?.id || "",
                                        })
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Patient"
                                            variant="standard"
                                        />
                                    )}
                                />
                                <TextField
                                    label="Discount Percentage"
                                    type="number"
                                    value={formData.discount_percentage}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            discount_percentage: e.target.value,
                                        })
                                    }
                                    required
                                    inputProps={{ min: 1, max: 100 }}
                                    variant="standard"
                                />
                                <TextField
                                    label="Issued For"
                                    value={formData.issued_for}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            issued_for: e.target.value,
                                        })
                                    }
                                    multiline
                                    variant="standard"
                                />
                                <TextField
                                    label="Expires At"
                                    type="date"
                                    value={formData.expires_at}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            expires_at: e.target.value,
                                        })
                                    }
                                    variant="standard"
                                    InputLabelProps={{ shrink: true }}
                                />
                                {/* Used or Unused: */}
                                <FormControl variant="standard">
                                    <InputLabel id="is-used-label">
                                        Status
                                    </InputLabel>
                                    <Select
                                        labelId="is-used-label"
                                        value={
                                            formData.is_used ? "used" : "unused"
                                        }
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                is_used:
                                                    e.target.value === "used",
                                            })
                                        }
                                        label="Status"
                                    >
                                        <MenuItem value="unused">New</MenuItem>
                                        <MenuItem value="used">Used</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                size="small"
                                onClick={() => setEditDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="small"
                                type="submit"
                                variant="contained"
                            >
                                Update
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Container>
        </AdminLayout>
    );
}

export default AdminDiscounts;
