import useViewportTableHeight from "@/hooks/useViewportTableHeight";
import { router, useForm } from "@inertiajs/react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import React, { useMemo, useRef, useState } from "react";

const headerCellSx = {
    bgcolor: "primary.main",
    color: "#fff",
    borderRight: "1px solid rgba(255,255,255,0.28)",
    borderBottom: "1px solid rgba(255,255,255,0.28)",
    py: 0.75,
    px: 1,
    zIndex: 2,
};

function columnGroups(columns) {
    return columns.reduce((groups, column) => {
        const current = groups[groups.length - 1];

        if (current && current.feedback_type === column.feedback_type) {
            current.columns.push(column);
            return groups;
        }

        groups.push({
            feedback_type: column.feedback_type,
            label: column.type_label,
            columns: [column],
        });

        return groups;
    }, []);
}

const infoColumns = [
    { key: "caregiver_name", label: "Caregiver" },
    { key: "start_date", label: "Start date" },
    { key: "end_date", label: "End date" },
    { key: "level", label: "Level" },
    { key: "duty", label: "Duty" },
    { key: "duration", label: "Duration" },
];

function FeedbackSheet({ patients = [], columns = [], startNo = 1 }) {
    const tableRef = useRef(null);
    const tableHeight = useViewportTableHeight(tableRef);
    const groups = useMemo(() => columnGroups(columns), [columns]);
    const [editor, setEditor] = useState(null);
    const form = useForm({ body: "" });

    const openEditor = (patient, column) => {
        const current =
            patient.feedbacks?.[column.feedback_type]?.[column.follow_up] ??
            null;
        setEditor({ patient, column, feedback: current });
        form.setData("body", current?.body ?? "");
        form.clearErrors();
    };

    const closeEditor = () => {
        if (form.processing) {
            return;
        }
        setEditor(null);
    };

    const save = (event) => {
        event.preventDefault();
        if (!editor) {
            return;
        }

        const options = {
            preserveScroll: true,
            onSuccess: () => {
                setEditor(null);
                form.reset();
            },
            onFinish: () => form.transform((data) => data),
        };

        if (editor.feedback?.id) {
            form.put(
                route("admin.patient.feedbacks.update", editor.feedback.id),
                options,
            );
            return;
        }

        form.transform((data) => ({
            body: data.body,
            feedback_type: editor.column.feedback_type,
            follow_up: editor.column.follow_up,
        }));
        form.post(
            route("admin.patient.feedbacks.store", editor.patient.id),
            options,
        );
    };

    return (
        <>
            <TableContainer
                ref={tableRef}
                component={Paper}
                elevation={0}
                sx={{
                    width: "100%",
                    maxWidth: "100%",
                    overflow: "auto",
                    height: tableHeight,
                    maxHeight: tableHeight,
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 1,
                }}
            >
                <Table
                    stickyHeader
                    size="small"
                    sx={{
                        width: "max-content",
                        borderCollapse: "separate",
                        borderSpacing: 0,
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell
                                rowSpan={2}
                                sx={{
                                    ...headerCellSx,
                                    left: 0,
                                    zIndex: 4,
                                    width: "1px",
                                    whiteSpace: "nowrap",
                                    verticalAlign: "bottom",
                                }}
                            >
                                <Typography
                                    component="span"
                                    sx={{
                                        color: "#fff",
                                        fontSize: 12,
                                        fontWeight: 700,
                                    }}
                                >
                                    Patient
                                </Typography>
                            </TableCell>
                            {infoColumns.map((column) => (
                                <TableCell
                                    key={column.key}
                                    rowSpan={2}
                                    sx={{
                                        ...headerCellSx,
                                        verticalAlign: "bottom",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    <Typography
                                        component="span"
                                        sx={{
                                            color: "#fff",
                                            fontSize: 12,
                                            fontWeight: 700,
                                        }}
                                    >
                                        {column.label}
                                    </Typography>
                                </TableCell>
                            ))}
                            {groups.map((group) => (
                                <TableCell
                                    key={group.feedback_type}
                                    colSpan={group.columns.length}
                                    align="center"
                                    sx={headerCellSx}
                                >
                                    <Typography
                                        component="span"
                                        sx={{
                                            color: "#fff",
                                            fontSize: 12,
                                            fontWeight: 700,
                                        }}
                                    >
                                        {group.label}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow
                            sx={{
                                "& th": {
                                    top: 33,
                                },
                            }}
                        >
                            {columns.map((column) => (
                                <TableCell
                                    key={column.key}
                                    sx={{
                                        ...headerCellSx,
                                        minWidth: 168,
                                        maxWidth: 220,
                                        verticalAlign: "bottom",
                                    }}
                                >
                                    <Typography
                                        component="span"
                                        sx={{
                                            color: "#fff",
                                            fontSize: 12,
                                            fontWeight: 700,
                                            lineHeight: 1.25,
                                            whiteSpace: "normal",
                                        }}
                                    >
                                        {column.follow_up_label}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patients.length > 0 ? (
                            patients.map((patient, index) => (
                                <TableRow
                                    key={patient.id}
                                    sx={(theme) => {
                                        const stripe =
                                            index % 2 === 0
                                                ? theme.palette.background.paper
                                                : theme.palette.mode === "dark"
                                                  ? "#333333"
                                                  : "#f4f0fa";

                                        return {
                                            "& > td": {
                                                fontSize: 12,
                                                py: 0.75,
                                                px: 1,
                                                borderRight: "1px solid",
                                                borderBottom: "1px solid",
                                                borderColor: "divider",
                                                verticalAlign: "top",
                                                bgcolor: stripe,
                                            },
                                            "& > td:first-of-type": {
                                                position: "sticky",
                                                left: 0,
                                                zIndex: 1,
                                                width: "1px",
                                                whiteSpace: "nowrap",
                                                boxShadow:
                                                    "2px 0 0 rgba(0,0,0,0.06)",
                                            },
                                        };
                                    }}
                                >
                                    <TableCell>
                                        <Box
                                            sx={{
                                                display: "inline-flex",
                                                alignItems: "flex-start",
                                                gap: 0.5,
                                            }}
                                        >
                                            <Box
                                                component="span"
                                                sx={{
                                                    color: "text.secondary",
                                                    fontVariantNumeric:
                                                        "tabular-nums",
                                                }}
                                            >
                                                {startNo + index}
                                            </Box>
                                            <Box>
                                                <Typography
                                                    component="button"
                                                    type="button"
                                                    onClick={() =>
                                                        router.visit(
                                                            route(
                                                                "admin.patient",
                                                                patient.id,
                                                            ),
                                                        )
                                                    }
                                                    sx={{
                                                        p: 0,
                                                        border: 0,
                                                        bgcolor: "transparent",
                                                        color: "inherit",
                                                        font: "inherit",
                                                        fontWeight: 700,
                                                        textAlign: "left",
                                                        cursor: "pointer",
                                                        whiteSpace: "nowrap",
                                                        "&:hover": {
                                                            color: "primary.main",
                                                        },
                                                    }}
                                                >
                                                    {patient.name}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    display="block"
                                                    sx={{ whiteSpace: "nowrap" }}
                                                >
                                                    {[
                                                        patient.pt_id,
                                                        patient.service_area,
                                                    ]
                                                        .filter(Boolean)
                                                        .join(" · ")}
                                                </Typography>
                                                {patient.on_duty && (
                                                    <Chip
                                                        size="small"
                                                        label="On duty"
                                                        color="success"
                                                        sx={{
                                                            mt: 0.5,
                                                            height: 18,
                                                            fontSize: 10,
                                                            "& .MuiChip-label": {
                                                                px: 0.75,
                                                            },
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    {infoColumns.map((column) => (
                                        <TableCell
                                            key={column.key}
                                            sx={{ whiteSpace: "nowrap" }}
                                        >
                                            {patient[column.key] || ""}
                                        </TableCell>
                                    ))}
                                    {columns.map((column) => (
                                        <FeedbackCell
                                            key={column.key}
                                            patient={patient}
                                            column={column}
                                            feedback={
                                                patient.feedbacks?.[
                                                    column.feedback_type
                                                ]?.[column.follow_up] ?? null
                                            }
                                            onEdit={() =>
                                                openEditor(patient, column)
                                            }
                                        />
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + infoColumns.length + 1}
                                    sx={{ py: 4, textAlign: "center" }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        No patients match these filters.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={Boolean(editor)}
                onClose={closeEditor}
                fullWidth
                maxWidth="sm"
            >
                <Box component="form" onSubmit={save}>
                    <DialogTitle>
                        {editor?.feedback ? "Edit feedback" : "Add feedback"}
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                            {editor?.patient.name}
                        </Typography>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                            sx={{ mb: 2 }}
                        >
                            {editor
                                ? `${editor.column.type_label} · ${editor.column.follow_up_label}`
                                : ""}
                        </Typography>
                        <TextField
                            autoFocus
                            fullWidth
                            multiline
                            minRows={4}
                            placeholder="Write the patient feedback"
                            value={form.data.body}
                            onChange={(event) =>
                                form.setData("body", event.target.value)
                            }
                            error={!!form.errors.body}
                            helperText={form.errors.body}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={closeEditor}
                            disabled={form.processing}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={form.processing || !form.data.body.trim()}
                        >
                            {form.processing ? "Saving..." : "Save"}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
}

function FeedbackCell({ patient, column, feedback, onEdit }) {
    const action = feedback ? "Edit" : "Add";

    return (
        <TableCell sx={{ minWidth: 168, maxWidth: 220 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 0.25 }}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    {feedback?.body && (
                        <Typography
                            sx={{
                                fontSize: 12,
                                lineHeight: 1.35,
                                whiteSpace: "pre-wrap",
                            }}
                        >
                            {feedback.body}
                        </Typography>
                    )}
                    {feedback && (
                        <Typography
                            component="div"
                            sx={{
                                mt: feedback.body ? 0.5 : 0,
                                fontSize: 10,
                                lineHeight: 1.3,
                                color: "text.secondary",
                            }}
                        >
                            {[feedback.staff_name, feedback.recorded_at]
                                .filter(Boolean)
                                .join(" · ")}
                        </Typography>
                    )}
                </Box>
                <IconButton
                    size="small"
                    aria-label={`${action} ${column.type_label}, ${column.follow_up_label} for ${patient.name}`}
                    onClick={onEdit}
                    sx={{ p: 0.25, mt: -0.25 }}
                >
                    <EditOutlinedIcon sx={{ fontSize: 16 }} />
                </IconButton>
            </Box>
        </TableCell>
    );
}

export default FeedbackSheet;
