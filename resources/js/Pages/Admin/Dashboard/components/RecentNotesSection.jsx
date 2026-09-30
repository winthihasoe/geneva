import { router } from "@inertiajs/react";
import { Box, Grid2, Paper, Typography } from "@mui/material";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import { dashboardPaperSx } from "../dashboardSurface";

function RecentNotesSection({ complaints = [], feedbacks = [] }) {
    return (
        <Paper sx={{ ...dashboardPaperSx, p: { xs: 1.5, sm: 2 }, mb: 2 }}>
            <Typography fontWeight={700} sx={{ fontSize: "1rem", mb: 1 }}>
                Latest complaints and feedback
            </Typography>
            <Grid2 container spacing={{ xs: 1.5, sm: 2 }}>
                <Grid2 size={{ xs: 12, md: 6 }} sx={{ minWidth: 0 }}>
                    <NoteList
                        title="Complaints"
                        icon={
                            <ReportProblemOutlinedIcon
                                color="warning"
                                sx={{ fontSize: 18 }}
                            />
                        }
                        items={complaints}
                        emptyText="No complaints yet."
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }} sx={{ minWidth: 0 }}>
                    <NoteList
                        title="Feedback"
                        icon={
                            <FeedbackOutlinedIcon
                                color="primary"
                                sx={{ fontSize: 18 }}
                            />
                        }
                        items={feedbacks}
                        emptyText="No feedback yet."
                    />
                </Grid2>
            </Grid2>
        </Paper>
    );
}

function NoteList({ title, icon, items, emptyText }) {
    return (
        <Box sx={{ minWidth: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.5 }}>
                {icon}
                <Typography variant="body2" fontWeight={700}>
                    {title}
                </Typography>
            </Box>
            {items.length === 0 ? (
                <Typography variant="caption" color="text.secondary">
                    {emptyText}
                </Typography>
            ) : (
                items.map((item) => {
                    const detail = [
                        item.label,
                        item.caregiver_name,
                        item.patient_name,
                        item.staff_name,
                        item.recorded_at,
                    ]
                        .filter(Boolean)
                        .join(" · ");

                    return (
                        <Box
                            key={item.id}
                            onClick={() =>
                                router.get(route("admin.patient", item.patient_id))
                            }
                            sx={{
                                py: 0.75,
                                px: 0.75,
                                borderRadius: 1,
                                cursor: "pointer",
                                minWidth: 0,
                                "&:hover": { bgcolor: "action.hover" },
                            }}
                        >
                            <Typography variant="body2" noWrap>
                                {item.text}
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                noWrap
                                display="block"
                            >
                                {detail}
                            </Typography>
                        </Box>
                    );
                })
            )}
        </Box>
    );
}

export default RecentNotesSection;
