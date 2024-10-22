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
    Divider,
} from "@mui/material";
import {
    ExpandMore,
    Menu as MenuIcon,
    Close as CloseIcon,
} from "@mui/icons-material";
import logo from "../../../public/images/logo/logo.png"; // Adjust the path to your logo

const Navbar = () => {
    const [anchorElPricing, setAnchorElPricing] = useState(null);
    const [anchorElAbout, setAnchorElAbout] = useState(null);
    const [anchorElJoin, setAnchorElJoin] = useState(null);
    const [anchorElContact, setAnchorElContact] = useState(null);

    const [drawerOpen, setDrawerOpen] = useState(false);

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
                    <Box sx={{ display: "flex", alignItems: "center" }}>
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
                        >
                            <MenuItem
                                onClick={() =>
                                    handleMenuClose(setAnchorElPricing)
                                }
                            >
                                Basic
                            </MenuItem>
                            <MenuItem
                                onClick={() =>
                                    handleMenuClose(setAnchorElPricing)
                                }
                            >
                                Premium
                            </MenuItem>
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
                        >
                            <MenuItem
                                onClick={() => handleMenuClose(setAnchorElJoin)}
                            >
                                Careers
                            </MenuItem>
                            <MenuItem
                                onClick={() => handleMenuClose(setAnchorElJoin)}
                            >
                                Internships
                            </MenuItem>
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
                        >
                            <Typography fontSize={13}>Log in</Typography>
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ borderRadius: 20, px: 2 }}
                            size="small"
                        >
                            <Typography fontSize={13}>Sign up</Typography>
                        </Button>
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
                        width: 250,
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
                        {/* Pricing Dropdown */}
                        <ListItem
                            button
                            onClick={(e) =>
                                handleMenuOpen(e, setAnchorElPricing)
                            }
                        >
                            <ListItemText primary="Pricing" />
                            <ExpandMore />
                        </ListItem>
                        <Divider />
                        <Menu
                            anchorEl={anchorElPricing}
                            open={Boolean(anchorElPricing)}
                            onClose={() => handleMenuClose(setAnchorElPricing)}
                        >
                            <MenuItem
                                onClick={() =>
                                    handleMenuClose(setAnchorElPricing)
                                }
                            >
                                Basic
                            </MenuItem>
                            <MenuItem
                                onClick={() =>
                                    handleMenuClose(setAnchorElPricing)
                                }
                            >
                                Premium
                            </MenuItem>
                        </Menu>

                        {/* About Us Dropdown */}
                        <ListItem
                            button
                            onClick={(e) => handleMenuOpen(e, setAnchorElAbout)}
                        >
                            <ListItemText primary="About Us" />
                            <ExpandMore />
                        </ListItem>
                        <Divider />
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

                        {/* Join Our Team Dropdown */}
                        <ListItem
                            button
                            onClick={(e) => handleMenuOpen(e, setAnchorElJoin)}
                        >
                            <ListItemText primary="Join Our Team" />
                            <ExpandMore />
                        </ListItem>
                        <Divider />
                        <Menu
                            anchorEl={anchorElJoin}
                            open={Boolean(anchorElJoin)}
                            onClose={() => handleMenuClose(setAnchorElJoin)}
                        >
                            <MenuItem
                                onClick={() => handleMenuClose(setAnchorElJoin)}
                            >
                                Careers
                            </MenuItem>
                            <MenuItem
                                onClick={() => handleMenuClose(setAnchorElJoin)}
                            >
                                Internships
                            </MenuItem>
                        </Menu>

                        {/* Contact Us Dropdown */}
                        <ListItem
                            button
                            onClick={(e) =>
                                handleMenuOpen(e, setAnchorElContact)
                            }
                        >
                            <ListItemText primary="Contact Us" />
                            <ExpandMore />
                        </ListItem>
                        <Divider />
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
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Navbar;
