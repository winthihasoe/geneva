export function dashboardShadow(theme, lifted = false) {
    const dark = theme.palette.mode === "dark";

    if (lifted) {
        return dark
            ? "0 8px 28px rgba(0,0,0,0.55)"
            : "0 8px 30px rgba(0,0,0,0.12)";
    }

    return dark
        ? "0 4px 18px rgba(0,0,0,0.4)"
        : "0 4px 20px rgba(0,0,0,0.08)";
}

export const dashboardPaperSx = {
    borderRadius: 3,
    bgcolor: "background.paper",
    color: "text.primary",
    boxShadow: (theme) => dashboardShadow(theme),
};
