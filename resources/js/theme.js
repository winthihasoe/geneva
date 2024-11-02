import { createTheme } from "@mui/material";

const lightTheme = createTheme({
    typography: {
        fontFamily: "Inter, sans-serif",
    },
    palette: {
        mode: "light",
        primary: {
            main: "#21875C",
        },
        secondary: {
            main: "#1a778e",
        },
        background: {
            default: "#fff",
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderBottom: "3px dotted #aaa",

                    "& fieldset": {
                        border: "none",
                    },
                    // Apply to all input variants
                    "& .MuiInputBase-root": {
                        height: "30px", // Set height for all variants
                        "& input": {
                            padding: "0", // Remove default padding
                            height: "30px", // Set input field height
                            lineHeight: "30px", // Adjust line height to match
                        },
                    },
                    // Specific to Outlined variant
                    "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                            borderColor: "#aaa", // Hover state
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "transparent", // Remove blue border on focus
                        },
                    },
                    // Specific to Filled variant
                    "& .MuiFilledInput-root": {
                        "&:before": {
                            borderBottom: "3px dotted #ddd", // Border for filled variant
                        },
                        "&:hover:before": {
                            borderBottom: "3px dotted #aaa", // Hover state
                        },
                        "&.Mui-focused:before": {
                            borderBottom: "3px dotted transparent", // Focus state
                        },
                    },
                    // Specific to Standard variant
                    "& .MuiInput-root": {
                        "&:before": {
                            borderBottom: "3px dotted #ddd", // Border for standard variant
                        },
                        "&:hover:before": {
                            borderBottom: "3px dotted #aaa", // Hover state
                        },
                        "&.Mui-focused:before": {
                            borderBottom: "3px dotted transparent", // Focus state
                        },
                    },
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none", // Disable uppercase transformation
                    fontFamily: "Inter, sans-serif",
                },
            },
        },

        MuiTabs: {
            styleOverrides: {
                root: {
                    // Customize tabs container (optional)
                },
                indicator: {
                    backgroundColor: "#1c90a9", // Indicator color
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: "none", // Prevent text capitalization
                    color: "#fff", // Default text color
                    backgroundColor: "#ddd",
                    borderRight: "1px solid #bbb",
                    padding: "0 24px", // Adjust tab padding
                    "&.Mui-selected": {
                        color: "#fff", // Selected tab text color
                        backgroundColor: "#1c90a9", // Selected tab background color
                        border: "none",
                    },
                },
            },
        },
    },
});

const darkTheme = createTheme({
    typography: {
        fontFamily: "Inter, sans-serif",
        allVariants: {
            color: "#ffffff", // Default text color
        },
    },
    palette: {
        mode: "dark",
        primary: {
            main: "#1c90a9",
        },
        secondary: {
            main: "#fec000",
        },
        background: {
            default: "#303030", // Lighter background color for the entire app
            paper: "#2c2c2c", // Slightly lighter background for surfaces like cards, modals, etc.
        },
        text: {
            primary: "#ffffff", // Main text color
            secondary: "#cccccc", // Secondary text color
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "#2c2c2c", // Default background for Paper components
                },
            },
        },
        MuiBox: {
            styleOverrides: {
                root: {
                    backgroundColor: "#2c2c2c", // Default background for Box components
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontFamily: "Inter",
                    color: "#ffffff", // Ensure button text is visible
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: "15px",
                    "& input": {
                        color: "#ffffff", // Input text color
                    },
                    "& label": {
                        color: "#aaaaaa", // Label color
                    },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#fff" }, // Border color for outlined variant
                        "&:hover fieldset": { borderColor: "#fff" }, // Border color on hover
                    },
                },
            },
        },
    },
});

export { lightTheme, darkTheme };
