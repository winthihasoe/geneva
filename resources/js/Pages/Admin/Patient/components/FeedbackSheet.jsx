import useViewportTableHeight from "@/hooks/useViewportTableHeight";
import { router, useForm } from "@inertiajs/react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
    Box,
    Button,
    Checkbox,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Popover,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";

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

const displayText = (value) => {
    if (value === null || value === undefined || String(value).trim() === "") {
        return "-";
    }

    return String(value);
};

const parseShortDateKey = (value) => {
    const match = /^(\d{2})-(\d{2})-(\d{4})/.exec(value);
    if (!match) {
        return null;
    }

    return `${match[3]}-${match[2]}-${match[1]}`;
};

const compareValues = (left, right) => {
    if (left === "-" && right !== "-") {
        return 1;
    }
    if (right === "-" && left !== "-") {
        return -1;
    }

    const leftDate = parseShortDateKey(left);
    const rightDate = parseShortDateKey(right);
    if (leftDate && rightDate) {
        return leftDate.localeCompare(rightDate) || left.localeCompare(right);
    }

    return left.localeCompare(right, undefined, {
        numeric: true,
        sensitivity: "base",
    });
};

function ColumnFilterPopover({
    anchorEl,
    column,
    options,
    selected,
    onClose,
    onChange,
}) {
    const [query, setQuery] = useState("");
    const open = Boolean(anchorEl && column);

    useEffect(() => {
        if (open) {
            setQuery("");
        }
    }, [open, column?.key]);

    const visibleOptions = options.filter((option) =>
        option.toLowerCase().includes(query.trim().toLowerCase()),
    );
    const selectedSet = selected ? new Set(selected) : null;
    const isChecked = (option) => !selectedSet || selectedSet.has(option);
    const allVisibleChecked =
        visibleOptions.length > 0 &&
        visibleOptions.every((option) => isChecked(option));

    const commit = (next) => {
        if (!next || next.size === options.length) {
            onChange(null);
            return;
        }

        onChange([...next]);
    };

    const toggleOption = (option) => {
        const next = new Set(selected ?? options);
        if (next.has(option)) {
            next.delete(option);
        } else {
            next.add(option);
        }
        commit(next);
    };

    const toggleVisible = () => {
        const next = new Set(selected ?? options);
        visibleOptions.forEach((option) => {
            if (allVisibleChecked) {
                next.delete(option);
            } else {
                next.add(option);
            }
        });
        commit(next);
    };

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            disableScrollLock
        >
            <Box sx={{ width: 280, p: 1.5 }}>
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
                    {column?.label}
                </Typography>
                <TextField
                    size="small"
                    fullWidth
                    autoFocus
                    placeholder="Search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    sx={{
                        mb: 1,
                        "& .MuiOutlinedInput-root": {
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 1,
                            px: 1,
                            borderBottom: "1px solid",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                        },
                    }}
                />
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 0.5,
                    }}
                >
                    <Box
                        component="label"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            cursor: "pointer",
                        }}
                    >
                        <Checkbox
                            size="small"
                            checked={allVisibleChecked}
                            indeterminate={
                                !allVisibleChecked &&
                                visibleOptions.some((option) =>
                                    isChecked(option),
                                )
                            }
                            onChange={toggleVisible}
                            sx={{ p: 0.5 }}
                        />
                        <Typography variant="body2">Select all</Typography>
                    </Box>
                    <Button
                        size="small"
                        disabled={!selected}
                        onClick={() => onChange(null)}
                    >
                        Clear
                    </Button>
                </Box>
                <Box sx={{ maxHeight: 240, overflowY: "auto" }}>
                    {visibleOptions.length > 0 ? (
                        visibleOptions.map((option) => (
                            <Box
                                key={option}
                                component="label"
                                sx={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 0.5,
                                    py: 0.25,
                                    cursor: "pointer",
                                }}
                            >
                                <Checkbox
                                    size="small"
                                    checked={isChecked(option)}
                                    onChange={() => toggleOption(option)}
                                    sx={{ p: 0.5 }}
                                />
                                <Typography
                                    variant="body2"
                                    sx={{ pt: 0.4, whiteSpace: "pre-line" }}
                                >
                                    {option}
                                </Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ py: 1 }}
                        >
                            No values
                        </Typography>
                    )}
                </Box>
            </Box>
        </Popover>
    );
}

function ColumnHeading({ label, filtered, onFilter }) {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 0.25,
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
                {label}
            </Typography>
            <IconButton
                size="small"
                aria-label={`Filter ${label}`}
                aria-haspopup="dialog"
                onClick={onFilter}
                sx={{
                    color: "#fff",
                    p: 0.25,
                    flexShrink: 0,
                    borderRadius: 0.5,
                    bgcolor: filtered
                        ? "rgba(255,255,255,0.28)"
                        : "transparent",
                }}
            >
                <ArrowDropDownIcon sx={{ fontSize: 18 }} />
            </IconButton>
        </Box>
    );
}

function FeedbackSheet({ patients = [], columns = [], startNo = 1 }) {
    const tableRef = useRef(null);
    const tableHeight = useViewportTableHeight(tableRef);
    const groups = useMemo(() => columnGroups(columns), [columns]);
    const [editor, setEditor] = useState(null);
    const [columnFilters, setColumnFilters] = useState({});
    const [filterMenu, setFilterMenu] = useState({ key: null, anchorEl: null });
    const form = useForm({ body: "" });

    const filterColumns = useMemo(
        () => [
            {
                key: "name",
                label: "Patient",
                getValue: (patient) => displayText(patient.name),
            },
            ...infoColumns.map((column) => ({
                key: column.key,
                label: column.label,
                getValue: (patient) => displayText(patient[column.key]),
            })),
            ...columns.map((column) => ({
                key: column.key,
                label: column.follow_up_label,
                getValue: (patient) =>
                    displayText(
                        patient.feedbacks?.[column.feedback_type]?.[
                            column.follow_up
                        ]?.body,
                    ),
            })),
        ],
        [columns],
    );

    const numberedPatients = useMemo(
        () =>
            patients.map((patient, index) => ({
                ...patient,
                rowNo: startNo + index,
            })),
        [patients, startNo],
    );

    const visiblePatients = useMemo(
        () =>
            numberedPatients.filter((patient) =>
                filterColumns.every((column) => {
                    const allowed = columnFilters[column.key];
                    if (!allowed) {
                        return true;
                    }

                    return allowed.includes(column.getValue(patient));
                }),
            ),
        [numberedPatients, filterColumns, columnFilters],
    );

    const openColumn = filterColumns.find(
        (column) => column.key === filterMenu.key,
    );

    const filterOptions = useMemo(() => {
        if (!openColumn) {
            return [];
        }

        const values = new Set();
        numberedPatients.forEach((patient) => {
            const matchesOthers = filterColumns.every((column) => {
                if (column.key === openColumn.key) {
                    return true;
                }

                const allowed = columnFilters[column.key];
                if (!allowed) {
                    return true;
                }

                return allowed.includes(column.getValue(patient));
            });

            if (matchesOthers) {
                values.add(openColumn.getValue(patient));
            }
        });

        return [...values].sort(compareValues);
    }, [openColumn, numberedPatients, filterColumns, columnFilters]);

    const hasColumnFilters = Object.values(columnFilters).some(Boolean);

    const openFilter = (column, button) => {
        const scroller = button.closest(".MuiTableContainer-root");
        const cell = button.closest("th");
        if (scroller && cell) {
            const scrollerRect = scroller.getBoundingClientRect();
            const cellRect = cell.getBoundingClientRect();
            if (cellRect.right > scrollerRect.right - 8) {
                scroller.scrollLeft +=
                    cellRect.right - scrollerRect.right + 16;
            } else if (cellRect.left < scrollerRect.left + 8) {
                scroller.scrollLeft -= scrollerRect.left - cellRect.left + 16;
            }
        }

        setFilterMenu({ key: column.key, anchorEl: button });
    };

    const updateColumnFilter = (next) => {
        if (!openColumn) {
            return;
        }

        setColumnFilters((current) => {
            const updated = { ...current };
            if (!next) {
                delete updated[openColumn.key];
            } else {
                updated[openColumn.key] = next;
            }
            return updated;
        });
    };

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
                                <ColumnHeading
                                    label="Patient"
                                    filtered={Boolean(columnFilters.name)}
                                    onFilter={(event) =>
                                        openFilter(
                                            { key: "name", label: "Patient" },
                                            event.currentTarget,
                                        )
                                    }
                                />
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
                                    <ColumnHeading
                                        label={column.label}
                                        filtered={Boolean(
                                            columnFilters[column.key],
                                        )}
                                        onFilter={(event) =>
                                            openFilter(
                                                column,
                                                event.currentTarget,
                                            )
                                        }
                                    />
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
                                    <ColumnHeading
                                        label={column.follow_up_label}
                                        filtered={Boolean(
                                            columnFilters[column.key],
                                        )}
                                        onFilter={(event) =>
                                            openFilter(
                                                {
                                                    key: column.key,
                                                    label: column.follow_up_label,
                                                },
                                                event.currentTarget,
                                            )
                                        }
                                    />
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visiblePatients.length > 0 ? (
                            visiblePatients.map((patient, index) => (
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
                                                {patient.rowNo}
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
                                        {hasColumnFilters
                                            ? "No patients match these column filters."
                                            : "No patients match these filters."}
                                    </Typography>
                                    {hasColumnFilters && (
                                        <Button
                                            size="small"
                                            onClick={() => setColumnFilters({})}
                                            sx={{ mt: 1 }}
                                        >
                                            Clear filters
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <ColumnFilterPopover
                anchorEl={filterMenu.anchorEl}
                column={openColumn}
                options={filterOptions}
                selected={openColumn ? columnFilters[openColumn.key] : null}
                onClose={() => setFilterMenu({ key: null, anchorEl: null })}
                onChange={updateColumnFilter}
            />

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
