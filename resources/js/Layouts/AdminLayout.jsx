import * as React from "react";
import { styled, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { AdminSidebarData } from "@/Components/Admin/AdminSidebarData";
import { router } from "@inertiajs/react";
import FlashMessage from "@/Components/FlashMessage";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Switch,
} from "@mui/material";
import { lightTheme, darkTheme } from "@/theme"; // Import themes

const drawerWidth = 240;
const appBarHeight = 64; // Assuming AppBar height is 64px

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    ...(!open && {
        marginLeft: 0,
        width: `100%`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    }),
}));

const MainContent = styled(Box)(({ theme, open, isMobile }) => ({
    minHeight: "92vh",
    flexGrow: 1,
    padding: theme.spacing(2),
    marginTop: appBarHeight, // Add margin to account for the AppBar height
    marginLeft: isMobile
        ? 0
        : open
        ? drawerWidth
        : `calc(${theme.spacing(7)} + 1px)`,
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "auto", // Allow horizontal overflow
}));

export default function AdminLayout({ children }) {
    const [open, setOpen] = React.useState(false);
    const [darkMode, setDarkMode] = React.useState(
        () => localStorage.getItem("darkMode") === "true" || false
    ); // State for dark mode
    const isMobile = useMediaQuery(
        darkMode
            ? darkTheme.breakpoints.down("sm")
            : lightTheme.breakpoints.down("sm")
    );
    const url = window.location.pathname;

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem("darkMode", newMode);
    };

    const currentTheme = darkMode ? darkTheme : lightTheme;

    const drawerContent = (
        <>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {currentTheme.direction === "rtl" ? (
                        <ChevronRightIcon />
                    ) : (
                        <ChevronLeftIcon />
                    )}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {AdminSidebarData.map((menuItem) => (
                    <ListItem
                        key={menuItem.title}
                        disablePadding
                        sx={{
                            display: "block",
                            bgcolor: url.includes(menuItem.link) ? "#aaa" : "",
                        }}
                    >
                        <ListItemButton
                            sx={{
                                height: 60,
                                justifyContent: open ? "initial" : "center",
                                px: 2.5,
                            }}
                            onClick={() => router.get(menuItem.link)}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 2 : "auto",
                                    justifyContent: "center",
                                }}
                            >
                                {menuItem.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={menuItem.title}
                                sx={{ opacity: open ? 0.8 : 0 }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );

    return (
        <ThemeProvider theme={currentTheme}>
            <AppBar open={open} position="fixed">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            ...(open && { display: "none" }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        onClick={() => router.get("/")}
                        sx={{
                            cursor: "pointer",
                            fontWeight: 500,
                            fontFamily: "Abril Fatface",
                            flexGrow: 1,
                        }}
                    >
                        Hearty Aid
                    </Typography>
                    <Typography variant="body2">Light</Typography>
                    <Switch
                        checked={darkMode}
                        onChange={toggleDarkMode}
                        color="default"
                    />
                    <Typography variant="body2">Dark</Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ display: "flex" }}>
                <FlashMessage />
                <CssBaseline />

                {/* Conditional Drawer Rendering */}
                {isMobile ? (
                    <Drawer
                        variant="temporary"
                        open={open}
                        onClose={handleDrawerClose}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawerContent}
                    </Drawer>
                ) : (
                    <Drawer
                        variant="permanent"
                        open={open}
                        sx={{
                            "& .MuiDrawer-paper": open
                                ? openedMixin(currentTheme)
                                : closedMixin(currentTheme),
                        }}
                    >
                        {drawerContent}
                    </Drawer>
                )}

                <MainContent
                    className="fade-in"
                    open={open}
                    isMobile={isMobile}
                >
                    {children}
                </MainContent>
            </Box>
        </ThemeProvider>
    );
}
