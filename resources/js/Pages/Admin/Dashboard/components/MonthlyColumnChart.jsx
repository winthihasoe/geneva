import { Box, Paper, Typography } from "@mui/material";
import { dashboardPaperSx } from "../dashboardSurface";

function MonthlyColumnChart({ title, caption, series = [], months = [] }) {
    const max = Math.max(
        1,
        ...months.flatMap((month) => series.map((item) => month[item.key] || 0)),
    );

    return (
        <Paper
            sx={{ ...dashboardPaperSx, p: { xs: 1.5, sm: 2 }, height: "100%" }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 1,
                    mb: 1.5,
                    flexWrap: "wrap",
                }}
            >
                <Box sx={{ minWidth: 0 }}>
                    <Typography fontWeight={700} sx={{ fontSize: "1rem" }}>
                        {title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {caption}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1.5, flexShrink: 0 }}>
                    {series.map((item) => (
                        <Box
                            key={item.key}
                            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                        >
                            <Box
                                sx={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 0.5,
                                    bgcolor: item.color,
                                }}
                            />
                            <Typography variant="caption" color="text.secondary">
                                {item.label}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box sx={{ overflowX: "auto" }}>
            <Box
                role="img"
                aria-label={chartLabel(title, series, months)}
                sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: { xs: 0.75, sm: 1.5 },
                    minHeight: 168,
                    minWidth: months.length > 4 ? months.length * 68 : "100%",
                }}
            >
                {months.map((month) => (
                    <Box
                        key={month.label}
                        sx={{
                            flex: "1 0 64px",
                            minWidth: 64,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                height: 112,
                                mt: 2,
                                width: "100%",
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "center",
                                gap: 0.5,
                                borderBottom: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            {series.map((item) => {
                                const value = month[item.key] || 0;
                                const height = `${Math.max(
                                    (value / max) * 100,
                                    value > 0 ? 8 : 0,
                                )}%`;

                                return (
                                    <Box
                                        key={item.key}
                                        title={`${item.label}: ${value}`}
                                        sx={{
                                            width: { xs: 10, sm: 14 },
                                            height,
                                            bgcolor: item.color,
                                            borderRadius: "4px 4px 0 0",
                                            position: "relative",
                                        }}
                                    >
                                        {value > 0 && (
                                            <Typography
                                                component="span"
                                                sx={{
                                                    position: "absolute",
                                                    top: -16,
                                                    left: "50%",
                                                    transform: "translateX(-50%)",
                                                    fontSize: "0.7rem",
                                                    fontWeight: 700,
                                                    color: "text.primary",
                                                    lineHeight: 1,
                                                }}
                                            >
                                                {value}
                                            </Typography>
                                        )}
                                    </Box>
                                );
                            })}
                        </Box>
                        <Typography
                            variant="caption"
                            color="text.primary"
                            noWrap
                            sx={{ mt: 0.75, fontWeight: 600 }}
                        >
                            {month.label}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {month.rate === null || month.rate === undefined
                                ? "—"
                                : `${month.rate}%`}
                        </Typography>
                    </Box>
                ))}
            </Box>
            </Box>
        </Paper>
    );
}

function chartLabel(title, series, months) {
    const monthsText = months
        .map((month) => {
            const counts = series
                .map((item) => `${item.label} ${month[item.key] || 0}`)
                .join(", ");
            const rate =
                month.rate === null || month.rate === undefined
                    ? "no rate"
                    : `${month.rate}%`;

            return `${month.label}: ${counts}, rate ${rate}`;
        })
        .join(". ");

    return `${title}. ${monthsText}`;
}

export default MonthlyColumnChart;
