import { createTheme } from "@mui/material";

const lightTheme = createTheme({
    typography: {
        fontFamily: "Poppins, sans-serif",
        h1: {
            fontSize: "56px",
            fontWeight: 700,
            lineHeight: "64px",
        },
        h2: {
            fontSize: "48px",
            fontWeight: 700,
            lineHeight: "56px",
        },
        h3: {
            fontSize: "40px",
            fontWeight: 700,
            lineHeight: "48px",
        },
        h4: {
            fontSize: "32px",
            fontWeight: 600,
            lineHeight: "40px",
        },
        h5: {
            fontSize: "24px",
            fontWeight: 600,
            lineHeight: "32px",
        },
        h6: {
            fontSize: "20px",
            fontWeight: 600,
            lineHeight: "28px",
        },
        p: {
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "24px",
        },
        pb: {
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "24px",
        },
    },
    palette: {
        mode: "light",
        primary: {
            main: "#21875C",
        },
        secondary: {
            main: "#FFC547",
        },
        // Add gray color palette
        gray: {
            100: "#f7f7f7",
            200: "#e5e5e5",
            300: "#d4d4d4",
            400: "#a3a3a3",
            500: "#737373",
            600: "#525252",
            700: "#404040",
            800: "#262626",
        },
        background: {
            default: "#fff",
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    // borderBottom: "3px dotted #aaa",

                    "& fieldset": {
                        border: "none",
                    },
                    // Apply to all input variants
                    "& .MuiInputBase-root": {
                        "& input": {
                            padding: "2px", // Remove default padding
                            height: "30px", // Set input field height
                            lineHeight: "30px", // Adjust line height to match
                            "&::placeholder": {
                                fontSize: "12px", // Change placeholder font size
                                color: "#ddd", // Optional: change placeholder color
                                opacity: 1, // Ensure placeholder is visible
                            },
                        },
                    },
                    // Specific to Outlined variant
                    "& .MuiOutlinedInput-root": {
                        borderBottom: "3px dotted #aaa", // Move dotted border here
                        "&:hover": {
                            borderBottom: "3px dotted #aaa", // Hover state
                        },
                        "&:hover fieldset": {
                            borderColor: "transparent", // Keep fieldset transparent
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "transparent", // Remove blue border on focus
                        },
                        "&.Mui-focused": {
                            borderBottom: "3px dotted #aaa", // Focus state
                        },
                    },
                    // Specific to Filled variant
                    "& .MuiFilledInput-root": {
                        paddingRight: "10px",
                        paddingLeft: "10px",
                        border: "2px solid #ddd",
                        borderRadius: 6,
                        marginTop: 8,
                        "&:before": {
                            borderColor: "transparent",
                        },
                        "&:hover:before": {
                            borderColor: "transparent",
                        },
                        "&.Mui-focused:before": {
                            borderColor: "transparent",
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
                    fontFamily: "Poppin, sans-serif",
                    borderRadius: "30px",
                    // Default typography variant "p" styles
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "24px",
                    padding: "12px 24px",
                },
                // Size variants
                sizeSmall: {
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                    padding: "8px 16px",
                    borderRadius: "25px",
                },
                sizeMedium: {
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "24px",
                    padding: "12px 24px",
                    borderRadius: "30px",
                },
                sizeLarge: {
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: "28px",
                    padding: "16px 32px",
                    borderRadius: "35px",
                },
                // Primary button styles
                containedPrimary: {
                    backgroundColor: "#21875C",
                    color: "#ffffff",
                    "&:hover": {
                        backgroundColor: "#1a6b47", // Darker shade for hover
                    },
                },
                outlinedPrimary: {
                    borderColor: "#21875C",
                    color: "#21875C",
                    "&:hover": {
                        borderColor: "#1a6b47",
                        backgroundColor: "rgba(33, 135, 92, 0.04)",
                    },
                },
                textPrimary: {
                    color: "#21875C",
                    "&:hover": {
                        backgroundColor: "rgba(33, 135, 92, 0.04)",
                    },
                },
                // Secondary button styles
                containedSecondary: {
                    backgroundColor: "#FFC547",
                    color: "#000000",
                    "&:hover": {
                        backgroundColor: "#e6b03f", // Darker shade for hover
                    },
                },
                outlinedSecondary: {
                    borderColor: "#FFC547",
                    color: "#FFC547",
                    "&:hover": {
                        borderColor: "#e6b03f",
                        backgroundColor: "rgba(255, 197, 71, 0.04)",
                    },
                },
                textSecondary: {
                    color: "#FFC547",
                    "&:hover": {
                        backgroundColor: "rgba(255, 197, 71, 0.04)",
                    },
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
        fontFamily: "Poppin, sans-serif",
        allVariants: {
            color: "#ffffff", // Default text color
        },
        h1: {
            fontSize: "56px",
            fontWeight: 700,
            lineHeight: "64px",
        },
        h2: {
            fontSize: "48px",
            fontWeight: 700,
            lineHeight: "56px",
        },
        h3: {
            fontSize: "40px",
            fontWeight: 700,
            lineHeight: "48px",
        },
        h4: {
            fontSize: "32px",
            fontWeight: 600,
            lineHeight: "40px",
        },
        h5: {
            fontSize: "24px",
            fontWeight: 600,
            lineHeight: "32px",
        },
        h6: {
            fontSize: "20px",
            fontWeight: 600,
            lineHeight: "28px",
        },
        p: {
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "24px",
        },
    },
    palette: {
        mode: "dark",
        primary: {
            main: "#21875C",
        },
        secondary: {
            main: "#FFC547",
        },
        // Add gray color palette for dark theme
        gray: {
            100: "#262626",
            200: "#404040",
            300: "#525252",
            400: "#737373",
            500: "#a3a3a3",
            600: "#d4d4d4",
            700: "#e5e5e5",
            800: "#f7f7f7",
        },
        background: {
            default: "#303030",
            paper: "#2c2c2c",
        },
        text: {
            primary: "#ffffff",
            secondary: "#cccccc",
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
                    fontFamily: "Poppin, sans-serif",
                    borderRadius: "30px",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "24px",
                    padding: "12px 24px",
                },
                // Size variants
                sizeSmall: {
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "20px",
                    padding: "8px 16px",
                    borderRadius: "25px",
                },
                sizeMedium: {
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "24px",
                    padding: "12px 24px",
                    borderRadius: "30px",
                },
                sizeLarge: {
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: "28px",
                    padding: "16px 32px",
                    borderRadius: "35px",
                },
                containedPrimary: {
                    backgroundColor: "#21875C",
                    color: "#ffffff",
                    "&:hover": {
                        backgroundColor: "#1a6b47",
                    },
                },
                outlinedPrimary: {
                    borderColor: "#21875C",
                    color: "#21875C",
                    "&:hover": {
                        borderColor: "#1a6b47",
                        backgroundColor: "rgba(33, 135, 92, 0.04)",
                    },
                },
                textPrimary: {
                    color: "#21875C",
                    "&:hover": {
                        backgroundColor: "rgba(33, 135, 92, 0.04)",
                    },
                },
                containedSecondary: {
                    backgroundColor: "#FFC547",
                    color: "#000000",
                    "&:hover": {
                        backgroundColor: "#e6b03f",
                    },
                },
                outlinedSecondary: {
                    borderColor: "#FFC547",
                    color: "#FFC547",
                    "&:hover": {
                        borderColor: "#e6b03f",
                        backgroundColor: "rgba(255, 197, 71, 0.04)",
                    },
                },
                textSecondary: {
                    color: "#FFC547",
                    "&:hover": {
                        backgroundColor: "rgba(255, 197, 71, 0.04)",
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: "15px",
                    "& input": {
                        color: "#ffffff", // Input text color
                        "&::placeholder": {
                            fontSize: "12px",
                            color: "#aaaaaa",
                            opacity: 1,
                        },
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
