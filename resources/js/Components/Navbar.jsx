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
    Container,
} from "@mui/material";
import {
    ExpandMore,
    ExpandLess,
    Menu as MenuIcon,
    Close as CloseIcon,
} from "@mui/icons-material";
import logo from "../../../public/images/logo/logo.png"; // Adjust the path to your logo
import { router, usePage } from "@inertiajs/react";
import YesOrNoModal from "./util/YesOrNoModal";

const Pricing = [
    {
        title: "Nanny (Basic Care)",
        service: "Nanny Basic Service",
    },
    {
        title: "Nanny (Advanced Care)",
        service: "Nanny Advanced Service",
    },

    {
        title: "Caregiver (Basic Care Service)",
        service: "Elder Basic Care",
    },
    {
        title: "Caregiver (Advanced Care Service)",
        service: "Elder Advanced Care",
    },
    {
        title: "Nanny (Basic & Maid)",
        service: "Nanny Basic Care + Maid Service",
    },
    {
        title: "Caregiver (Basic & Maid)",
        service: "Elder Basic Care + Maid Service",
    },
];

const JoinOurTeam = [
    {
        title: "Apply Job",
        routeName: "job.apply",
    },
    {
        title: "Fill CV",
        routeName: "cv.create",
    },
    {
        title: "My CV",
        routeName: "cv.show",
    },
    {
        title: "My Qualifications",
        routeName: "certificates.show",
    },
    {
        title: "My Experiences",
        routeName: "experiences.show",
    },
    {
        title: "7 Days Training",
        routeName: "training.sevenDays",
    },
];

const ContactUs = [
    {
        title: "Contact Information",
        routeName: "contact.info",
    },
    {
        title: "Send Inquiry",
        routeName: "contact.messages",
    },
    {
        title: "Customer Service",
        routeName: "customer.service",
    },
];

const AboutUs = [
    {
        title: "Mission Statement",
        routeName: "mission",
    },
    {
        title: "Care philosophy",
        routeName: "philosophy",
    },
    {
        title: "Team Introduction",
        routeName: "team",
    },
];

const Navbar = () => {
    const user = usePage().props.auth.user;
    const Pricings = usePage().props.services;
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
                <Container maxWidth="xl" sx={{ padding: 0 }}>
                    <Toolbar
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        {/* Left side - Logo and Auth buttons */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
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
                                    alt="Geneva Logo"
                                    style={{ width: 80, height: "auto" }}
                                />
                            </Box>
                        </Box>

                        {/* Right side - Menu items for md and larger screens */}
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
                                <Typography
                                    variant="h6"
                                    fontSize={"1rem"}
                                    fontWeight={500}
                                    fontFamily={"Roboto Slab"}
                                >
                                    Pricing
                                </Typography>
                            </Button>
                            <Menu
                                anchorEl={anchorElPricing}
                                open={Boolean(anchorElPricing)}
                                onClose={() =>
                                    handleMenuClose(setAnchorElPricing)
                                }
                                sx={{
                                    "& .MuiPaper-root": {
                                        backgroundColor: "primary.main", // Set the dropdown background to primary color
                                        p: 1,
                                    },
                                }}
                            >
                                {Pricings.map((item, index) => (
                                    <MenuItem
                                        key={index}
                                        onClick={() => {
                                            handleMenuClose(setAnchorElPricing);
                                            router.get(
                                                route("service.pricing", item)
                                            );
                                        }}
                                        sx={{
                                            fontSize: 14,
                                            mb: 1,
                                            color: "white", // Set text color to white
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
                                        {item}
                                    </MenuItem>
                                ))}
                            </Menu>
                            <Button
                                onClick={(e) =>
                                    handleMenuOpen(e, setAnchorElAbout)
                                }
                                endIcon={<ExpandMore />}
                            >
                                <Typography
                                    variant="h6"
                                    fontSize={"1rem"}
                                    fontWeight={500}
                                    fontFamily={"Roboto Slab"}
                                >
                                    About Us
                                </Typography>
                            </Button>
                            <Menu
                                anchorEl={anchorElAbout}
                                open={Boolean(anchorElAbout)}
                                onClose={() =>
                                    handleMenuClose(setAnchorElAbout)
                                }
                                sx={{
                                    "& .MuiPaper-root": {
                                        backgroundColor: "primary.main", // Set the dropdown background to primary color
                                        p: 1,
                                    },
                                }}
                            >
                                {AboutUs.map((item, index) => (
                                    <MenuItem
                                        key={index}
                                        onClick={() => {
                                            handleMenuClose(setAnchorElAbout);
                                            router.get(route(item.routeName));
                                        }}
                                        sx={{
                                            color: "white", // Set text color to white
                                            fontFamily: "Mina",
                                            "&:hover": {
                                                backgroundColor: "primary.dark", // Optional: Darker shade on hover
                                            },
                                            borderBottom:
                                                index !== JoinOurTeam.length - 1
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
                                <Typography
                                    variant="h6"
                                    fontSize={"1rem"}
                                    fontWeight={500}
                                    fontFamily={"Roboto Slab"}
                                >
                                    Contact Us
                                </Typography>
                            </Button>
                            <Menu
                                anchorEl={anchorElContact}
                                open={Boolean(anchorElContact)}
                                onClose={() =>
                                    handleMenuClose(setAnchorElContact)
                                }
                                sx={{
                                    "& .MuiPaper-root": {
                                        backgroundColor: "primary.main", // Set the dropdown background to primary color
                                        p: 1,
                                    },
                                }}
                            >
                                {ContactUs.map((item, index) => (
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
                                onClick={() => router.get(route("job.apply"))}
                            >
                                <Typography
                                    variant="h6"
                                    fontSize={"1rem"}
                                    fontWeight={500}
                                    fontFamily={"Roboto Slab"}
                                >
                                    Join Our Team
                                </Typography>
                            </Button>
                        </Box>

                        {/* Auth buttons and admin/caregiver buttons */}
                        {/* Get into the Caregiver site */}
                        {user && user.is_caregiver && (
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{
                                    borderRadius: 20,
                                    px: 2,
                                    display: { xs: "none", md: "flex" },
                                }}
                                size="small"
                                onClick={() =>
                                    router.get(route("cg.dashboard"))
                                }
                            >
                                <Typography fontSize={13}>Account</Typography>
                            </Button>
                        )}
                        {user && user.is_employer && (
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    borderRadius: 20,
                                    px: 2,
                                    display: { xs: "none", md: "flex" },
                                }}
                                size="small"
                                onClick={() =>
                                    router.get(route("employer.dashboard"))
                                }
                            >
                                <Typography fontSize={13}>Account</Typography>
                            </Button>
                        )}

                        {/* Get into the Admin site */}
                        {user && user.is_admin && (
                            <Button
                                variant="contained"
                                sx={{
                                    borderRadius: 20,
                                    px: 2,
                                    display: { xs: "none", md: "flex" },
                                }}
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
                                    size="small"
                                    sx={{
                                        fontSize: "0.8rem",
                                        fontWeight: "bold",
                                    }}
                                    onClick={() => router.get(route("login"))}
                                >
                                    Log in
                                </Button>
                                <Button
                                    variant="contained"
                                    size="small"
                                    sx={{
                                        fontSize: "0.8rem",
                                        fontWeight: "bold",
                                    }}
                                    onClick={() => router.get(route("signup"))}
                                >
                                    Sign up
                                </Button>
                            </Box>
                        ) : (
                            ""
                        )}

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
                </Container>
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
                            <ListItemText
                                sx={{
                                    color: "primary.main",
                                }}
                                primary="Pricing"
                            />
                            {openPricing ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openPricing} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {Pricings.map((item, index) => (
                                    <ListItem
                                        key={index}
                                        button
                                        sx={{
                                            pl: 2,
                                            cursor: "pointer",
                                            borderBottom: "1px solid #eee",
                                        }}
                                        onClick={() => {
                                            toggleDrawer(false);
                                            router.get(
                                                route("service.pricing", item)
                                            );
                                        }}
                                    >
                                        <ListItemText
                                            primaryTypographyProps={{
                                                fontSize: 13,
                                                cursor: "pointer",
                                            }}
                                            primary={item}
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
                            <ListItemText
                                sx={{ color: "primary.main" }}
                                primary="About Us"
                            />
                            {openAbout ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openAbout} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {AboutUs.map((item, index) => (
                                    <ListItem
                                        key={index}
                                        button
                                        sx={{ pl: 4, cursor: "pointer" }}
                                        onClick={() => {
                                            toggleDrawer(false);
                                            router.get(route(item.routeName));
                                        }}
                                    >
                                        <ListItemText
                                            primaryTypographyProps={{
                                                fontSize: 13, // Set your desired font size
                                                cursor: "pointer",
                                            }}
                                            primary={item.title}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                        <Divider />

                        {/* Join Our Team Section */}
                        <ListItem
                            button
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleToggle(setOpenJoin)}
                        >
                            <ListItemText
                                sx={{ color: "primary.main" }}
                                primary="Join Our Team"
                            />
                            {openJoin ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openJoin} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {JoinOurTeam.map((item, index) => (
                                    <ListItem
                                        key={index}
                                        button
                                        sx={{ pl: 4, cursor: "pointer" }}
                                        onClick={() => {
                                            toggleDrawer(false);
                                            router.get(route(item.routeName));
                                        }}
                                    >
                                        <ListItemText
                                            primaryTypographyProps={{
                                                fontSize: 13, // Set your desired font size
                                                cursor: "pointer",
                                            }}
                                            primary={item.title}
                                        />
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
                            <ListItemText
                                sx={{ color: "primary.main" }}
                                primary="Contact Us"
                            />
                            {openContact ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openContact} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {ContactUs.map((item, index) => (
                                    <ListItem
                                        key={index}
                                        button
                                        sx={{ pl: 4, cursor: "pointer" }}
                                        onClick={() => {
                                            toggleDrawer(false);
                                            router.get(route(item.routeName));
                                        }}
                                    >
                                        <ListItemText
                                            primaryTypographyProps={{
                                                fontSize: 13, // Set your desired font size
                                                cursor: "pointer",
                                            }}
                                            primary={item.title}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                        <Divider />
                        {/* Contact Us Section */}
                        {!user ? (
                            <>
                                <ListItem sx={{ mt: 2 }}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() =>
                                            router.get(route("login"))
                                        }
                                        sx={{
                                            fontSize: "0.8rem",
                                            fontWeight: "bold",
                                        }}
                                        fullWidth
                                    >
                                        Log in
                                    </Button>
                                </ListItem>
                                <ListItem>
                                    {/* <ListItemText primary="Contact Us" /> */}

                                    <Button
                                        variant="contained"
                                        sx={{
                                            fontSize: "0.8rem",
                                            fontWeight: "bold",
                                        }}
                                        size="small"
                                        onClick={() =>
                                            router.get(route("signup"))
                                        }
                                        fullWidth
                                    >
                                        Sign up
                                    </Button>
                                </ListItem>
                            </>
                        ) : (
                            <>
                                {user && user.is_admin ? (
                                    <ListItem
                                        sx={{
                                            mt: 2,
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            sx={{
                                                borderRadius: 20,
                                                px: 2,
                                            }}
                                            fullWidth
                                            size="small"
                                            onClick={() =>
                                                router.get(
                                                    route("admin.dashboard")
                                                )
                                            }
                                        >
                                            <Typography fontSize={13}>
                                                Admin
                                            </Typography>
                                        </Button>
                                    </ListItem>
                                ) : (
                                    ""
                                )}
                                {user && user.is_caregiver ? (
                                    <ListItem>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            sx={{ borderRadius: 20, px: 2 }}
                                            size="small"
                                            onClick={() =>
                                                router.get(
                                                    route("cg.dashboard")
                                                )
                                            }
                                            fullWidth
                                        >
                                            <Typography fontSize={13}>
                                                Account
                                            </Typography>
                                        </Button>
                                    </ListItem>
                                ) : (
                                    ""
                                )}
                                {user && user.is_employer ? (
                                    <ListItem>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{ borderRadius: 20, px: 2 }}
                                            size="small"
                                            onClick={() =>
                                                router.get(
                                                    route("employer.dashboard")
                                                )
                                            }
                                            fullWidth
                                        >
                                            <Typography fontSize={13}>
                                                Account
                                            </Typography>
                                        </Button>
                                    </ListItem>
                                ) : (
                                    ""
                                )}

                                <ListItem>
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
                            </>
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
