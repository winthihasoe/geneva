import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "./theme";

const pages = {
    ...import.meta.glob("./Pages/Public/*.jsx"),
    ...import.meta.glob("./Pages/Caregiver/CareLogs/**/*.jsx"),
};

createInertiaApp({
    title: (title) => (title ? `${title} - Geneva` : "Geneva Care Log"),
    resolve: (name) => {
        const loader = pages[`./Pages/${name}.jsx`];
        if (!loader) {
            throw new Error(`Public care log page not found: ${name}`);
        }
        return loader();
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <App {...props} />
            </ThemeProvider>
        );

        const hideFallback = () => {
            const fallback = document.getElementById("app-fallback");
            if (fallback && el.childNodes.length > 0) {
                fallback.remove();
            }
        };
        hideFallback();
        requestAnimationFrame(hideFallback);
    },
    progress: {
        color: "#4B5563",
        showSpinner: true,
    },
});
