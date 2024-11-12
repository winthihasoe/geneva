import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Button,
    Menu,
    MenuItem,
    IconButton,
    Box,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Collapse,
    Divider,
} from "@mui/material";
import {
    ExpandMore,
    ExpandLess,
    Menu as MenuIcon,
    Close as CloseIcon,
} from "@mui/icons-material";
import logo from "../../../public/images/logo/logo.png"; // Adjust the path to your logo
import { router, usePage } from "@inertiajs/react";
import ReusableModal from "./util/ReusableModal";
import YesOrNoModal from "./util/YesOrNoModal";

const Pricing = [
    {
        title: "Nanny Service",
        service: "Nanny Service",
    },
    {
        title: "Newborn Care",
        service: "Newborn Care",
    },
    {
        title: "Elderly Care",
        service: "Elder Care",
    },
    {
        title: "Nanny & Maid",
        service: "Nanny Care + Maid Service",
    },
    {
        title: "Elderly & Maid",
        service: "Elder Care + Maid Service",
    },
];

const JoinOurTeam = [
    {
        title: "Fill CV",
        routeName: "cv.create",
    },
    {
        title: "My CV",
        routeName: "cv.show",
    },
    {
        title: "Certificate",
        routeName: "certificates.show",
    },
    {
        title: "7 Days Training",
        routeName: "training.sevenDays",
    },
];
const Navbar = () => {
    const user = usePage().props.auth.user;
    const [anchorElPricing, setAnchorElPricing] = useState(null);
    const [anchorElAbout, setAnchorElAbout] = useState(null);
    const [anchorElJoin, setAnchorElJoin] = useState(null);
    const [anchorElContact, setAnchorElContact] = useState(null);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [openPricing, setOpenPricing] = useState(false);
    const [openAbout, setOpenAbout] = useState(false);
    const [openJoin, setOpenJoin] = useState(false);
    const [openContact, setOpenContact] = useState(false);
    const handleToggle = (setFunction) => {
        setFunction((prevOpen) => !prevOpen);
    };

    const handleMenuOpen = (event, setAnchorEl) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (setAnchorEl) => {
        setAnchorEl(null);
    };

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    // Logout dialog state
    const [openLogout, setOpenLogout] = useState(false);
    const handleCloseLogout = () => setOpenLogout(false);
    const handleLogout = () => {
        router.post(route("logout"));
        handleCloseLogout();
    };

    return (
        <>
            <AppBar
                position="static"
                elevation={0}
                sx={{ borderBottom: "1px solid #4CAF50", bgcolor: "white" }}
            >
                <Toolbar
                    sx={{ display: "flex", justifyContent: "space-between" }}
                >
                    {/* Logo */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                        }}
                        onClick={() => router.get("/")}
                    >
                        <img
                            src={logo}
                            alt="Hearty Aid Logo"
                            style={{ width: 50, height: 50 }}
                        />
                    </Box>

                    {/* For md and larger screens */}
                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            gap: 2,
                        }}
                    >
                        <Button
                            onClick={(e) =>
                                handleMenuOpen(e, setAnchorElPricing)
                            }
                            endIcon={<ExpandMore />}
                        >
                            Pricing
                        </Button>
                        <Menu
                            anchorEl={anchorElPricing}
                            open={Boolean(anchorElPricing)}
                            onClose={() => handleMenuClose(setAnchorElPricing)}
                            sx={{
                                "& .MuiPaper-root": {
                                    backgroundColor: "primary.main", // Set the dropdown background to primary color
                                    p: 1,
                                },
                            }}
                        >
                            {Pricing.map((item, index) => (
                                <MenuItem
                                    key={index}
                                    onClick={() => {
                                        handleMenuClose(setAnchorElPricing);
                                        router.get(
                                            route(
                                                "service.pricing",
                                                item.service
                                            )
                                        );
                                    }}
                                    sx={{
                                        color: "white", // Set text color to white
                                        fontFamily: "Mina",
                                        "&:hover": {
                                            backgroundColor: "primary.dark", // Optional: Darker shade on hover
                                        },
                                        borderBottom:
                                            index !== Pricing.length - 1
                                                ? 2
                                                : 0, // Apply borderBottom only if not the last item
                                        borderColor: "#fff",
                                    }}
                                >
                                    {item.title}
                                </MenuItem>
                            ))}
                        </Menu>
                        <Button
                            onClick={(e) => handleMenuOpen(e, setAnchorElAbout)}
                            endIcon={<ExpandMore />}
                        >
                            About Us
                        </Button>
                        <Menu
                            anchorEl={anchorElAbout}
                            open={Boolean(anchorElAbout)}
                            onClose={() => handleMenuClose(setAnchorElAbout)}
                        >
                            <MenuItem
                                onClick={() =>
                                    handleMenuClose(setAnchorElAbout)
                                }
                            >
                                Our Story
                            </MenuItem>
                            <MenuItem
                                onClick={() =>
                                    handleMenuClose(setAnchorElAbout)
                                }
                            >
                                Mission
                            </MenuItem>
                        </Menu>
                        <Button
                            onClick={(e) => handleMenuOpen(e, setAnchorElJoin)}
                            endIcon={<ExpandMore />}
                        >
                            Join Our Team
                        </Button>
                        <Menu
                            anchorEl={anchorElJoin}
                            open={Boolean(anchorElJoin)}
                            onClose={() => handleMenuClose(setAnchorElJoin)}
                            sx={{
                                "& .MuiPaper-root": {
                                    backgroundColor: "primary.main", // Set the dropdown background to primary color
                                    p: 1,
                                },
                            }}
                        >
                            {JoinOurTeam.map((item, index) => (
                                <MenuItem
                                    key={index}
                                    onClick={() => {
                                        handleMenuClose(setAnchorElPricing);
                                        router.get(route(item.routeName));
                                    }}
                                    sx={{
                                        color: "white", // Set text color to white
                                        fontFamily: "Mina",
                                        "&:hover": {
                                            backgroundColor: "primary.dark", // Optional: Darker shade on hover
                                        },
                                        borderBottom:
                                            index !== Pricing.length - 1
                                                ? 2
                                                : 0, // Apply borderBottom only if not the last item
                                        borderColor: "#fff",
                                    }}
                                >
                                    {item.title}
                                </MenuItem>
                            ))}
                        </Menu>
                        <Button
                            onClick={(e) =>
                                handleMenuOpen(e, setAnchorElContact)
                            }
                            endIcon={<ExpandMore />}
                        >
                            Contact Us
                        </Button>
                        <Menu
                            anchorEl={anchorElContact}
                            open={Boolean(anchorElContact)}
                            onClose={() => handleMenuClose(setAnchorElContact)}
                        >
                            <MenuItem
                                onClick={() =>
                                    handleMenuClose(setAnchorElContact)
                                }
                            >
                                Email
                            </MenuItem>
                            <MenuItem
                                onClick={() =>
                                    handleMenuClose(setAnchorElContact)
                                }
                            >
                                Phone
                            </MenuItem>
                        </Menu>
                    </Box>

                    {/* Log In and Sign Up buttons */}
                    <Box sx={{ display: "flex", gap: 2 }}>
                        {/* Get into the Admin site */}
                        {user && user.is_admin && (
                            <Button
                                variant="contained"
                                sx={{ borderRadius: 20, px: 2 }}
                                size="small"
                                onClick={() =>
                                    router.get(route("admin.dashboard"))
                                }
                            >
                                <Typography fontSize={13}>Admin</Typography>
                            </Button>
                        )}
                        {!user ? (
                            <Box
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                    gap: 1,
                                    alignItems: "center",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    sx={{ borderRadius: 20, px: 2 }}
                                    size="small"
                                    onClick={() => router.get(route("login"))}
                                >
                                    <Typography fontSize={13}>
                                        Log in
                                    </Typography>
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{ borderRadius: 20, px: 2 }}
                                    size="small"
                                    onClick={() => router.get(route("signup"))}
                                >
                                    <Typography fontSize={13}>
                                        Sign up
                                    </Typography>
                                </Button>
                            </Box>
                        ) : (
                            <Box sx={{ display: { xs: "none", md: "flex" } }}>
                                <Button
                                    size="small"
                                    color="error"
                                    onClick={() => setOpenLogout(true)}
                                >
                                    <Typography fontSize={13}>
                                        Logout
                                    </Typography>
                                </Button>
                            </Box>
                        )}
                    </Box>

                    {/* Hamburger Menu Icon for sm screens */}
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{
                            display: { xs: "block", md: "none" },
                            color: "primary.main",
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Drawer for small screens */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                <Box
                    sx={{
                        width: 200,
                        height: "100%",
                    }}
                    role="presentation"
                    // onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            p: 1,
                        }}
                    >
                        <IconButton onClick={toggleDrawer(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <List>
                        {/* Pricing Section */}
                        <ListItem
                            button
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleToggle(setOpenPricing)}
                        >
                            <ListItemText primary="Pricing" />
                            {openPricing ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openPricing} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {Pricing.map((item, index) => (
                                    <ListItem
                                        key={index}
                                        button
                                        sx={{ pl: 4, cursor: "pointer" }}
                                        onClick={() => {
                                            toggleDrawer(false);
                                            router.get(
                                                route(
                                                    "service.pricing",
                                                    item.service
                                                )
                                            );
                                        }}
                                    >
                                        <ListItemText
                                            primaryTypographyProps={{
                                                fontSize: 14, // Set your desired font size
                                                fontFamily: "Mina", // Set your desired font family
                                            }}
                                            primary={item.title}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                        <Divider />

                        {/* About Us Section */}
                        <ListItem
                            button
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleToggle(setOpenAbout)}
                        >
                            <ListItemText primary="About Us" />
                            {openAbout ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openAbout} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button sx={{ pl: 4 }}>
                                    <ListItemText primary="Our Story" />
                                </ListItem>
                                <ListItem button sx={{ pl: 4 }}>
                                    <ListItemText primary="Mission" />
                                </ListItem>
                            </List>
                        </Collapse>
                        <Divider />

                        {/* Join Our Team Section */}
                        <ListItem
                            button
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleToggle(setOpenJoin)}
                        >
                            <ListItemText primary="Join Our Team" />
                            {openJoin ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openJoin} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {JoinOurTeam.map((item, index) => (
                                    <ListItem
                                        key={index}
                                        button
                                        sx={{ pl: 4 }}
                                        onClick={() => {
                                            toggleDrawer(false);
                                            router.get(route(item.routeName));
                                        }}
                                    >
                                        <ListItemText primary={item.title} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                        <Divider />

                        {/* Contact Us Section */}
                        <ListItem
                            button
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleToggle(setOpenContact)}
                        >
                            <ListItemText primary="Contact Us" />
                            {openContact ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openContact} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button sx={{ pl: 4 }}>
                                    <ListItemText primary="Email" />
                                </ListItem>
                                <ListItem button sx={{ pl: 4 }}>
                                    <ListItemText primary="Phone" />
                                </ListItem>
                            </List>
                        </Collapse>
                        <Divider />
                        {/* Contact Us Section */}
                        {!user ? (
                            <ListItem
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    mt: 2,
                                }}
                            >
                                {/* <ListItemText primary="Contact Us" /> */}
                                <Button
                                    variant="contained"
                                    sx={{ borderRadius: 10 }}
                                    size="small"
                                    onClick={() => router.get(route("login"))}
                                >
                                    <Typography fontSize={13}>
                                        Log in
                                    </Typography>
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{ borderRadius: 10 }}
                                    size="small"
                                    onClick={() => router.get(route("signup"))}
                                >
                                    <Typography fontSize={13}>
                                        Sign up
                                    </Typography>
                                </Button>
                            </ListItem>
                        ) : (
                            <ListItem
                                sx={{
                                    mt: 2,
                                }}
                            >
                                {/* <ListItemText primary="Contact Us" /> */}
                                <Button
                                    variant="outlined"
                                    sx={{ borderRadius: 10 }}
                                    size="small"
                                    fullWidth
                                    color="error"
                                    onClick={() => {
                                        setOpenLogout(true);
                                        setDrawerOpen(false);
                                    }}
                                >
                                    <Typography fontSize={13}>
                                        Logout
                                    </Typography>
                                </Button>
                            </ListItem>
                        )}
                    </List>
                </Box>
            </Drawer>

            {/* Logout dialog */}
            <YesOrNoModal
                title={"Do you want to Logout?"}
                open={openLogout}
                onClose={handleCloseLogout}
                confirmRoute={"logout"}
                handleClose={handleCloseLogout}
                onConfirm={handleLogout}
            />
        </>
    );
};

export default Navbar;
