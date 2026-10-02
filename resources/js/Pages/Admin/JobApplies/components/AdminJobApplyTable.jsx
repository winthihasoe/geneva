import ConfirmTypedNameDeleteDialog from "@/Components/Admin/ConfirmTypedNameDeleteDialog";
import useViewportTableHeight from "@/hooks/useViewportTableHeight";
import { Link, router } from "@inertiajs/react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    Box,
    Button,
    Checkbox,
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
import dayjs from "dayjs";
import React, { useEffect, useMemo, useRef, useState } from "react";

const displayText = (value) => {
    if (value === null || value === undefined || value === "") {
        return "-";
    }

    return String(value);
};

const formatShortDate = (value) => {
    if (!value) {
        return null;
    }

    const parsed = dayjs(value);

    return parsed.isValid() ? parsed.format("DD-MM-YY") : null;
};

const formatApplied = (value) => {
    if (!value) {
        return "-";
    }

    const parsed = dayjs(value);
    if (!parsed.isValid()) {
        return "-";
    }

    if (parsed.format("HH:mm") === "00:00") {
        return parsed.format("DD-MM-YY");
    }

    return parsed.format("DD-MM-YY HH:mm");
};

const displayAge = (value) => {
    if (!value) {
        return "-";
    }

    const birth = dayjs(value);
    if (!birth.isValid()) {
        return "-";
    }

    return String(dayjs().diff(birth, "year"));
};

const sourceText = {
    website: "Website",
    manual: "Manual",
    import: "Import",
};

const statusText = {
    Pending: "Pending",
    Contacted: "Contacted",
    Uncontactable: "Uncontactable",
    "Refuse job": "Refuse job",
    pending: "Pending",
    contacted: "Contacted",
    uncontactable: "Uncontactable",
    recruit: "Recruit",
    deny: "Deny",
    part_time: "Part Time",
};

const columns = [
    {
        key: "name",
        label: "Name",
        minWidth: 156,
        wrap: true,
        getValue: (record) => displayText(record.name),
    },
    {
        key: "created_at",
        label: "Date of apply",
        minWidth: 120,
        getValue: (record) => formatApplied(record.created_at),
    },
    {
        key: "coordinated_by",
        label: "Coordinated by",
        minWidth: 150,
        wrap: true,
        maxWidth: 200,
        getValue: (record) => displayText(record.coordinated_by),
    },
    {
        key: "source",
        label: "Source",
        minWidth: 96,
        getValue: (record) =>
            sourceText[record.source] || displayText(record.source),
    },
    {
        key: "status",
        label: "Status",
        minWidth: 120,
        getValue: (record) =>
            statusText[record.status] ||
            statusText[record.decision] ||
            displayText(record.status),
    },
    {
        key: "cv",
        label: "Linked CV",
        minWidth: 120,
        wrap: true,
        getValue: (record) => {
            if (record.cv?.full_name) {
                return record.cv.full_name;
            }

            if (record.status === "recruit" || record.decision === "recruit") {
                return "Not linked";
            }

            return "-";
        },
    },
    {
        key: "interview_date",
        label: "Interview date",
        minWidth: 120,
        getValue: (record) => formatShortDate(record.interview_date) || "-",
    },
    {
        key: "interviewed_by",
        label: "Interview by",
        minWidth: 160,
        wrap: true,
        maxWidth: 220,
        getValue: (record) => displayText(record.interviewed_by),
    },
    {
        key: "interview_score",
        label: "Interview Score",
        minWidth: 120,
        getValue: (record) => displayText(record.interview_score),
    },
    {
        key: "training_start_date",
        label: "Training Start",
        minWidth: 124,
        getValue: (record) =>
            formatShortDate(record.training_start_date) || "-",
    },
    {
        key: "assessment_date",
        label: "Assessment date",
        minWidth: 132,
        getValue: (record) => formatShortDate(record.assessment_date) || "-",
    },
    {
        key: "assessment_score",
        label: "Score",
        minWidth: 88,
        getValue: (record) => displayText(record.assessment_score),
    },
    {
        key: "gender",
        label: "Gender",
        minWidth: 84,
        getValue: (record) => displayText(record.gender),
    },
    {
        key: "age",
        label: "Age",
        minWidth: 64,
        getValue: (record) => displayAge(record.date_of_birth),
    },
    {
        key: "phone",
        label: "Phone",
        minWidth: 124,
        getValue: (record) => displayText(record.phone),
    },
    {
        key: "current_address",
        label: "Address",
        minWidth: 180,
        wrap: true,
        maxWidth: 240,
        getValue: (record) => displayText(record.current_address),
    },
];

const parseShortDateKey = (value) => {
    const match = /^(\d{2})-(\d{2})-(\d{2})/.exec(value);
    if (!match) {
        return null;
    }

    return `20${match[3]}-${match[2]}-${match[1]}`;
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

export default function AdminJobApplyTable({ applications = [] }) {
    const tableRef = useRef(null);
    const tableHeight = useViewportTableHeight(tableRef);
    const [columnFilters, setColumnFilters] = useState({});
    const [filterMenu, setFilterMenu] = useState({ key: null, anchorEl: null });
    const [pendingDelete, setPendingDelete] = useState(null);

    const numberedRecords = useMemo(
        () =>
            applications.map((record, index) => ({
                ...record,
                rowNo: index + 1,
            })),
        [applications],
    );

    const visibleRecords = useMemo(
        () =>
            numberedRecords.filter((record) =>
                columns.every((column) => {
                    const allowed = columnFilters[column.key];
                    if (!allowed) {
                        return true;
                    }

                    return allowed.includes(column.getValue(record));
                }),
            ),
        [numberedRecords, columnFilters],
    );

    const openColumn = columns.find((column) => column.key === filterMenu.key);

    const filterOptions = useMemo(() => {
        if (!openColumn) {
            return [];
        }

        const values = new Set();
        numberedRecords.forEach((record) => {
            const matchesOthers = columns.every((column) => {
                if (column.key === openColumn.key) {
                    return true;
                }

                const allowed = columnFilters[column.key];
                if (!allowed) {
                    return true;
                }

                return allowed.includes(column.getValue(record));
            });

            if (matchesOthers) {
                values.add(openColumn.getValue(record));
            }
        });

        return [...values].sort(compareValues);
    }, [openColumn, numberedRecords, columnFilters]);

    const hasColumnFilters = Object.values(columnFilters).some(Boolean);

    const openFilter = (column, button) => {
        const scroller = button.closest(".MuiTableContainer-root");
        const cell = button.closest("th");
        if (scroller && cell) {
            const scrollerRect = scroller.getBoundingClientRect();
            const cellRect = cell.getBoundingClientRect();
            if (cellRect.right > scrollerRect.right - 8) {
                scroller.scrollLeft += cellRect.right - scrollerRect.right + 16;
            } else if (cellRect.left < scrollerRect.left + 8) {
                scroller.scrollLeft -= scrollerRect.left - cellRect.left + 16;
            }
        }

        setFilterMenu({ key: column.key, anchorEl: button });
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
                        minWidth: 2140,
                        borderCollapse: "separate",
                        borderSpacing: 0,
                    }}
                >
                    <TableHead>
                        <TableRow
                            sx={{
                                "& th": {
                                    bgcolor: "primary.main",
                                    color: "#fff",
                                    borderRight:
                                        "1px solid rgba(255,255,255,0.28)",
                                    borderBottom:
                                        "1px solid rgba(255,255,255,0.28)",
                                    py: 0.75,
                                    px: 1,
                                    verticalAlign: "bottom",
                                    zIndex: 2,
                                },
                                "& th:first-of-type": {
                                    left: 0,
                                    zIndex: 3,
                                },
                            }}
                        >
                            {columns.map((column) => {
                                const filtered = Boolean(
                                    columnFilters[column.key],
                                );

                                return (
                                    <TableCell
                                        key={column.key}
                                        sx={{ minWidth: column.minWidth }}
                                    >
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
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {column.label}
                                            </Typography>
                                            <IconButton
                                                size="small"
                                                aria-label={`Filter ${column.label}`}
                                                aria-haspopup="dialog"
                                                onClick={(event) =>
                                                    openFilter(
                                                        column,
                                                        event.currentTarget,
                                                    )
                                                }
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
                                                <ArrowDropDownIcon
                                                    sx={{ fontSize: 18 }}
                                                />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRecords.length > 0 ? (
                            visibleRecords.map((record, index) => (
                                <TableRow
                                    key={record.id}
                                    onClick={() =>
                                        router.get(
                                            route(
                                                "admin.job.apply.single",
                                                record.id,
                                            ),
                                        )
                                    }
                                    sx={(theme) => {
                                        const stripe =
                                            index % 2 === 0
                                                ? theme.palette.background.paper
                                                : theme.palette.mode === "dark"
                                                  ? "#333333"
                                                  : "#f4f0fa";
                                        const hover =
                                            theme.palette.mode === "dark"
                                                ? "#3a3a3a"
                                                : "#efe8f8";

                                        return {
                                            cursor: "pointer",
                                            "& > td": {
                                                fontSize: 12,
                                                py: 0.75,
                                                px: 1,
                                                borderRight: "1px solid",
                                                borderBottom: "1px solid",
                                                borderColor: "divider",
                                                verticalAlign: "middle",
                                                bgcolor: stripe,
                                            },
                                            "&:hover > td": {
                                                bgcolor: hover,
                                            },
                                            "& > td:first-of-type": {
                                                position: "sticky",
                                                left: 0,
                                                zIndex: 1,
                                                maxWidth: { xs: 168, md: 280 },
                                                boxShadow:
                                                    "2px 0 0 rgba(0,0,0,0.06)",
                                            },
                                        };
                                    }}
                                >
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.key}
                                            sx={{
                                                whiteSpace: column.wrap
                                                    ? "pre-line"
                                                    : "nowrap",
                                                minWidth: column.minWidth,
                                                maxWidth: column.maxWidth,
                                            }}
                                        >
                                            {column.key === "cv" &&
                                            record.cv?.id ? (
                                                <Box
                                                    component={Link}
                                                    href={route(
                                                        "admin.cv.single",
                                                        record.cv.id,
                                                    )}
                                                    onClick={(event) =>
                                                        event.stopPropagation()
                                                    }
                                                    sx={{
                                                        color: "primary.main",
                                                        fontWeight: 700,
                                                        textDecoration: "none",
                                                        "&:hover": {
                                                            textDecoration:
                                                                "underline",
                                                        },
                                                    }}
                                                >
                                                    {record.cv.full_name ||
                                                        "CV"}
                                                </Box>
                                            ) : column.key === "name" ? (
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        gap: 0.75,
                                                        alignItems:
                                                            "flex-start",
                                                    }}
                                                >
                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            minWidth: 16,
                                                            flexShrink: 0,
                                                            color: "text.secondary",
                                                            fontVariantNumeric:
                                                                "tabular-nums",
                                                        }}
                                                    >
                                                        {record.rowNo}
                                                    </Box>
                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            flex: 1,
                                                            fontWeight: 700,
                                                        }}
                                                    >
                                                        {record.name || "-"}
                                                    </Box>
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        aria-label={`Delete ${record.name || "application"}`}
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            setPendingDelete(
                                                                record,
                                                            );
                                                        }}
                                                        sx={{
                                                            p: 0.25,
                                                            mt: -0.25,
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        <DeleteIcon
                                                            sx={{
                                                                fontSize: 16,
                                                            }}
                                                        />
                                                    </IconButton>
                                                </Box>
                                            ) : (
                                                column.getValue(record)
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    sx={{ py: 4, textAlign: "center" }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {hasColumnFilters
                                            ? "No applications match these column filters."
                                            : "No applications in this month."}
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

            <ConfirmTypedNameDeleteDialog
                open={Boolean(pendingDelete)}
                expectedName={pendingDelete?.name || ""}
                subject="job application"
                nameKind="candidate name"
                deleteUrl={
                    pendingDelete
                        ? route("admin.job.apply.destroy", pendingDelete.id)
                        : ""
                }
                onClose={() => setPendingDelete(null)}
            />

            <ColumnFilterPopover
                anchorEl={filterMenu.anchorEl}
                column={openColumn}
                options={filterOptions}
                selected={openColumn ? columnFilters[openColumn.key] : null}
                onClose={() => setFilterMenu({ key: null, anchorEl: null })}
                onChange={(next) => {
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
                }}
            />
        </>
    );
}
