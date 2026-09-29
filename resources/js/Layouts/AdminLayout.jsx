import * as React from "react";
import { styled, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
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
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { AdminSidebarData } from "@/Components/Admin/AdminSidebarData";
import { router, usePage } from "@inertiajs/react";
import FlashMessage from "@/Components/FlashMessage";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Tooltip,
} from "@mui/material";
import { lightTheme, darkTheme } from "@/theme"; // Import themes

const DEFAULT_DRAWER_WIDTH = 240;
const MIN_DRAWER_WIDTH = 72;
const MAX_DRAWER_WIDTH = 420;
const DRAWER_WIDTH_STORAGE_KEY = "adminDrawerWidth";
const mobileAppBarHeight = 40;

const clampDrawerWidth = (width) =>
    Math.min(MAX_DRAWER_WIDTH, Math.max(MIN_DRAWER_WIDTH, width));

const readStoredDrawerWidth = () => {
    if (typeof window === "undefined") {
        return DEFAULT_DRAWER_WIDTH;
    }

    const raw = window.localStorage.getItem(DRAWER_WIDTH_STORAGE_KEY);
    if (raw == null || raw === "") {
        return DEFAULT_DRAWER_WIDTH;
    }

    const stored = Number(raw);
    if (!Number.isFinite(stored)) {
        return DEFAULT_DRAWER_WIDTH;
    }

    return clampDrawerWidth(stored);
};

const openedMixin = (theme, width) => ({
    width,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: theme.spacing(0.5),
    minHeight: 48,
    padding: theme.spacing(0.5, 1.5),
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) =>
        prop !== "open" && prop !== "drawerWidth" && prop !== "isResizing",
})(({ theme, open, drawerWidth, isResizing }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "transparent",
    backgroundImage: "none",
    boxShadow: "none",
    color: theme.palette.text.primary,
    transition: isResizing
        ? "none"
        : theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: open
                  ? theme.transitions.duration.enteringScreen
                  : theme.transitions.duration.leavingScreen,
          }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
    }),
    ...(!open && {
        marginLeft: 0,
        width: `100%`,
    }),
}));

const MainContent = styled(Box, {
    shouldForwardProp: (prop) =>
        prop !== "isMobile" &&
        prop !== "drawerWidth" &&
        prop !== "isResizing",
})(({ theme, isMobile, drawerWidth, isResizing }) => ({
    minHeight: "92vh",
    flexGrow: 1,
    minWidth: 0,
    padding: isMobile ? theme.spacing(0.5, 1.5, 2) : theme.spacing(2),
    marginTop: isMobile ? mobileAppBarHeight : 0,
    marginLeft: isMobile ? 0 : drawerWidth,
    transition: isResizing
        ? "none"
        : theme.transitions.create("margin", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
          }),
    overflowX: "auto", // Allow horizontal overflow
}));

export default function AdminLayout({ children }) {
    const [open, setOpen] = React.useState(false);
    const [drawerWidth, setDrawerWidth] = React.useState(readStoredDrawerWidth);
    const [isResizing, setIsResizing] = React.useState(false);
    const drawerWidthRef = React.useRef(drawerWidth);
    const resizeCleanupRef = React.useRef(null);
    drawerWidthRef.current = drawerWidth;
    const [darkMode, setDarkMode] = React.useState(
        () => localStorage.getItem("darkMode") === "true" || false
    ); // State for dark mode
    const isMobile = useMediaQuery(
        darkMode
            ? darkTheme.breakpoints.down("sm")
            : lightTheme.breakpoints.down("sm")
    );
    const pathname = window.location.pathname;
    const user = usePage().props.auth?.user;
    const sidebarItems = AdminSidebarData.filter(
        (menuItem) => !menuItem.superAdminOnly || user?.is_super_admin
    );

    const isPatientsGroupChildActive = (link) => {
        if (link === "/admin/patients") {
            return (
                pathname === "/admin/patients" ||
                pathname.startsWith("/admin/patients/")
            );
        }
        if (link === "/admin/care-logs") {
            return pathname.startsWith("/admin/care-logs");
        }
        return pathname.includes(link);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSidebarNavigate = (link) => {
        if (isMobile) {
            setOpen(false);
        }
        router.get(link);
    };

    const showLabels = isMobile || drawerWidth > MIN_DRAWER_WIDTH;
    const shiftAppBar = !isMobile || open;

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem("darkMode", newMode);
    };

    React.useEffect(() => {
        return () => {
            resizeCleanupRef.current?.();
        };
    }, []);

    const persistDrawerWidth = (width) => {
        window.localStorage.setItem(DRAWER_WIDTH_STORAGE_KEY, String(width));
    };

    const applyDrawerWidth = (width) => {
        const nextWidth = clampDrawerWidth(width);
        drawerWidthRef.current = nextWidth;
        setDrawerWidth(nextWidth);
        persistDrawerWidth(nextWidth);
    };

    const startDrawerResize = (event) => {
        if (event.button !== 0) {
            return;
        }

        event.preventDefault();
        const startX = event.clientX;
        const startWidth = drawerWidthRef.current;
        setIsResizing(true);
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";

        const onPointerMove = (moveEvent) => {
            const nextWidth = clampDrawerWidth(
                startWidth + (moveEvent.clientX - startX)
            );
            drawerWidthRef.current = nextWidth;
            setDrawerWidth(nextWidth);
        };

        const stopResize = () => {
            setIsResizing(false);
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", stopResize);
            persistDrawerWidth(drawerWidthRef.current);
            resizeCleanupRef.current = null;
        };

        resizeCleanupRef.current = stopResize;
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", stopResize);
    };

    const layoutDrawerWidth = isMobile ? DEFAULT_DRAWER_WIDTH : drawerWidth;

    const currentTheme = darkMode ? darkTheme : lightTheme;

    const drawerContent = (
        <>
            <DrawerHeader
                sx={{
                    justifyContent: showLabels ? "flex-start" : "center",
                    px: showLabels ? 1.5 : 0,
                }}
            >
                {showLabels && (
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        onClick={() => router.get("/")}
                        sx={{
                            cursor: "pointer",
                            fontWeight: 500,
                            fontFamily: "Roboto Slab, serif",
                            minWidth: 0,
                        }}
                    >
                        Geneva
                    </Typography>
                )}
                <Tooltip
                    title={
                        darkMode ? "Switch to light mode" : "Switch to dark mode"
                    }
                >
                    <IconButton
                        size="small"
                        onClick={toggleDarkMode}
                        aria-label={
                            darkMode
                                ? "Switch to light mode"
                                : "Switch to dark mode"
                        }
                        sx={{ color: "text.primary" }}
                    >
                        {darkMode ? (
                            <DarkModeOutlinedIcon />
                        ) : (
                            <LightModeOutlinedIcon />
                        )}
                    </IconButton>
                </Tooltip>
                {isMobile && (
                    <IconButton
                        onClick={handleDrawerClose}
                        aria-label="close drawer"
                        sx={{ ml: "auto" }}
                    >
                        {currentTheme.direction === "rtl" ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                )}
            </DrawerHeader>
            <Divider />
            <List
                disablePadding
                sx={{
                    flex: 1,
                    minHeight: 0,
                    overflowY: "auto",
                    overflowX: "hidden",
                    py: 0.5,
                }}
            >
                {sidebarItems.map((menuItem) => {
                    if (menuItem.type === "group") {
                        return (
                            <React.Fragment key={menuItem.title}>
                                {showLabels && (
                                    <ListSubheader
                                        component="div"
                                        disableSticky
                                        sx={{
                                            lineHeight: "28px",
                                            mt: 0.25,
                                            fontWeight: 700,
                                            fontSize: 12,
                                            opacity: 0.7,
                                        }}
                                    >
                                        {menuItem.title}
                                    </ListSubheader>
                                )}
                                {menuItem.items.map((child) => (
                                    <ListItem
                                        key={`${menuItem.title}-${child.title}`}
                                        disablePadding
                                        sx={{
                                            display: "block",
                                            bgcolor: isPatientsGroupChildActive(
                                                child.link
                                            )
                                                ? "#aaa"
                                                : "",
                                        }}
                                    >
                                        <Tooltip
                                            title={child.title}
                                            placement="right"
                                            disableHoverListener={showLabels}
                                        >
                                            <ListItemButton
                                                aria-label={child.title}
                                                sx={{
                                                    height: 44,
                                                    minHeight: 44,
                                                    justifyContent: showLabels
                                                        ? "initial"
                                                        : "center",
                                                    px: showLabels ? 2 : 0,
                                                    pl: showLabels ? 3 : 0,
                                                }}
                                                onClick={() =>
                                                    handleSidebarNavigate(
                                                        child.link
                                                    )
                                                }
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 0,
                                                        mr: showLabels ? 1.5 : 0,
                                                        justifyContent:
                                                            "center",
                                                        "& .MuiSvgIcon-root": {
                                                            fontSize: 20,
                                                        },
                                                    }}
                                                >
                                                    {child.icon}
                                                </ListItemIcon>
                                                {showLabels && (
                                                    <ListItemText
                                                        primary={child.title}
                                                        sx={{
                                                            opacity: 0.8,
                                                            fontSize: "1rem",
                                                        }}
                                                        primaryTypographyProps={{
                                                            fontSize: 13,
                                                            fontWeight: 700,
                                                            noWrap: true,
                                                        }}
                                                    />
                                                )}
                                            </ListItemButton>
                                        </Tooltip>
                                    </ListItem>
                                ))}
                            </React.Fragment>
                        );
                    }

                    return (
                        <ListItem
                            key={menuItem.title}
                            disablePadding
                            sx={{
                                display: "block",
                                bgcolor: pathname.includes(menuItem.link)
                                    ? "#aaa"
                                    : "",
                            }}
                        >
                            <Tooltip
                                title={menuItem.title}
                                placement="right"
                                disableHoverListener={showLabels}
                            >
                                <ListItemButton
                                    aria-label={menuItem.title}
                                    sx={{
                                        height: 44,
                                        minHeight: 44,
                                        justifyContent: showLabels
                                            ? "initial"
                                            : "center",
                                        px: showLabels ? 2 : 0,
                                    }}
                                    onClick={() =>
                                        handleSidebarNavigate(menuItem.link)
                                    }
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: showLabels ? 1.5 : 0,
                                            justifyContent: "center",
                                            "& .MuiSvgIcon-root": {
                                                fontSize: 20,
                                            },
                                        }}
                                    >
                                        {menuItem.icon}
                                    </ListItemIcon>
                                    {showLabels && (
                                        <ListItemText
                                            primary={menuItem.title}
                                            sx={{
                                                opacity: 0.8,
                                                fontSize: "1rem",
                                            }}
                                            primaryTypographyProps={{
                                                fontSize: 13,
                                                fontWeight: 700,
                                                noWrap: true,
                                            }}
                                        />
                                    )}
                                </ListItemButton>
                            </Tooltip>
                        </ListItem>
                    );
                })}
            </List>
        </>
    );

    return (
        <ThemeProvider theme={currentTheme}>
            {isMobile && (
                <AppBar
                    open={shiftAppBar}
                    drawerWidth={layoutDrawerWidth}
                    isResizing={isResizing}
                    position="fixed"
                    color="transparent"
                    elevation={0}
                >
                    <Toolbar
                        variant="dense"
                        disableGutters
                        sx={{
                            "&&": {
                                minHeight: mobileAppBarHeight,
                                height: mobileAppBarHeight,
                            },
                            px: 0.5,
                        }}
                    >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            size="small"
                            sx={{
                                ml: 0.25,
                                ...(open && { display: "none" }),
                            }}
                        >
                            <MenuIcon fontSize="small" />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            )}
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
                        open
                        sx={{
                            "& .MuiDrawer-paper": {
                                ...openedMixin(currentTheme, drawerWidth),
                                overflow: "hidden",
                                ...(isResizing && { transition: "none" }),
                            },
                        }}
                    >
                        {drawerContent}
                        <Box
                            role="separator"
                            aria-orientation="vertical"
                            aria-label="Resize sidebar"
                            aria-valuenow={Math.round(drawerWidth)}
                            aria-valuemin={MIN_DRAWER_WIDTH}
                            aria-valuemax={MAX_DRAWER_WIDTH}
                            tabIndex={0}
                            onPointerDown={startDrawerResize}
                            onDoubleClick={() =>
                                applyDrawerWidth(DEFAULT_DRAWER_WIDTH)
                            }
                            onKeyDown={(event) => {
                                if (event.key === "ArrowLeft") {
                                    event.preventDefault();
                                    applyDrawerWidth(
                                        drawerWidthRef.current - 16
                                    );
                                }
                                if (event.key === "ArrowRight") {
                                    event.preventDefault();
                                    applyDrawerWidth(
                                        drawerWidthRef.current + 16
                                    );
                                }
                            }}
                            sx={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                width: 8,
                                height: "100%",
                                cursor: "col-resize",
                                zIndex: 1,
                                touchAction: "none",
                                "&::after": {
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    bottom: 0,
                                    right: 0,
                                    width: 2,
                                    bgcolor: "divider",
                                },
                                "&:hover::after, &:focus-visible::after": {
                                    width: 3,
                                    bgcolor: "primary.main",
                                },
                            }}
                        />
                    </Drawer>
                )}

                <MainContent
                    className="fade-in"
                    isMobile={isMobile}
                    drawerWidth={layoutDrawerWidth}
                    isResizing={isResizing}
                >
                    {children}
                </MainContent>
            </Box>
        </ThemeProvider>
    );
}
