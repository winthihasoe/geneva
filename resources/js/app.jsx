import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp, router } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "./theme";
import { EmailProvider } from "./Context/EmailContext";
import { CarePlanProvider } from "./Context/CarePlanContext";

const appName = import.meta.env.VITE_APP_NAME || "Hearty Aid";

// Inertia restores list pages from history on Back, so edits made on a
// detail page would still show the old table. Reload those lists from the
// server when staff return to them.
const RELOAD_ON_BACK_PAGES = new Set([
    "Admin/CV/AdminCVs",
    "Admin/CV/CVSearchResult",
    "Admin/JobApplies/JobApplies",
    "Admin/JobApplies/JobApplySearchResult",
    "Admin/Patient/AdminFeedbacks",
]);

if (typeof window !== "undefined") {
    let restoreListPage = false;

    window.addEventListener("popstate", (event) => {
        restoreListPage = RELOAD_ON_BACK_PAGES.has(event.state?.component);
    });

    router.on("navigate", (event) => {
        if (!restoreListPage) {
            return;
        }

        restoreListPage = false;

        if (!RELOAD_ON_BACK_PAGES.has(event.detail.page.component)) {
            return;
        }

        router.reload();
    });
}

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
                    <CarePlanProvider>
                        <App {...props} />
                    </CarePlanProvider>
                </EmailProvider>
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
