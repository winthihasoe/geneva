import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "./theme";
import { EmailProvider } from "./Context/EmailContext";

const appName = import.meta.env.VITE_APP_NAME || "Hearty Aid";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <EmailProvider>
                    <App {...props} />
                </EmailProvider>
            </ThemeProvider>
        );
    },
    progress: {
        color: "#4B5563",
        showSpinner: true,
    },
});
