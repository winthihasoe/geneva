import useViewportTableHeight from "@/hooks/useViewportTableHeight";
import { careTypeLabel } from "@/utils/careTypeLabel";
import { router } from "@inertiajs/react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
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

const patientName = (record) => {
    const name = [record.first_name, record.last_name]
        .filter(Boolean)
        .join(" ")
        .trim();

    return name || "-";
};

const assignedCaregivers = (record) => {
    const names = Array.isArray(record.active_caregivers)
        ? record.active_caregivers.filter(Boolean)
        : [];

    if (names.length > 0) {
        return names.join(", ");
    }

    return displayText(record.current_caregiver_name);
};

const formatShortDate = (value) => {
    if (!value) {
        return null;
    }

    const parsed = dayjs(value);

    return parsed.isValid() ? parsed.format("DD-MM-YYYY") : null;
};

const formatCreated = (value) => {
    if (!value) {
        return "-";
    }

    const parsed = dayjs(value);
    if (!parsed.isValid()) {
        return "-";
    }

    if (parsed.format("HH:mm") === "00:00") {
        return parsed.format("DD-MM-YYYY");
    }

    return parsed.format("DD-MM-YYYY HH:mm");
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

const columns = [
    {
        key: "name",
        label: "Name",
        minWidth: 130,
        wrap: true,
        getValue: (record) => patientName(record),
    },
    {
        key: "assigned_cg",
        label: "Assigned CG",
        minWidth: 130,
        wrap: true,
        maxWidth: 240,
        getValue: (record) => assignedCaregivers(record),
    },
    {
        key: "type",
        label: "Care type",
        minWidth: 110,
        getValue: (record) => careTypeLabel(record.type) || "-",
    },
    {
        key: "location",
        label: "Location",
        minWidth: 112,
        getValue: (record) => displayText(record.service_area),
    },
    {
        key: "duration",
        label: "Duration",
        minWidth: 120,
        wrap: true,
        maxWidth: 180,
        getValue: (record) => displayText(record.assignment_duration),
    },
    {
        key: "level",
        label: "Level",
        minWidth: 140,
        wrap: true,
        maxWidth: 220,
        getValue: (record) => displayText(record.assignment_level),
    },
    {
        key: "duty",
        label: "Duty",
        minWidth: 110,
        wrap: true,
        maxWidth: 160,
        getValue: (record) => displayText(record.assignment_duty),
    },
    {
        key: "age",
        label: "Age",
        minWidth: 64,
        getValue: (record) => displayAge(record.date_of_birth),
    },
    {
        key: "gender",
        label: "Gender",
        minWidth: 84,
        getValue: (record) => displayText(record.gender),
    },
    {
        key: "date_of_birth",
        label: "Date of birth",
        minWidth: 120,
        getValue: (record) => formatShortDate(record.date_of_birth) || "-",
    },

    {
        key: "service",
        label: "Service",
        minWidth: 120,
        getValue: (record) => displayText(record.service_status_text),
    },
    {
        key: "emergency_contact",
        label: "Emergency contact",
        minWidth: 150,
        wrap: true,
        maxWidth: 220,
        getValue: (record) => displayText(record.emergency_contact_name),
    },
    {
        key: "phone",
        label: "Phone",
        minWidth: 124,
        getValue: (record) => displayText(record.emergency_contact_phone),
    },
    {
        key: "address",
        label: "Address",
        minWidth: 180,
        wrap: true,
        maxWidth: 260,
        getValue: (record) => displayText(record.address),
    },
    {
        key: "pt_id",
        label: "Patient ID",
        minWidth: 100,
        getValue: (record) => displayText(record.pt_id),
    },
    {
        key: "created_by",
        label: "Created by",
        minWidth: 140,
        wrap: true,
        maxWidth: 180,
        getValue: (record) => displayText(record.created_by),
    },
    {
        key: "created_at",
        label: "Created",
        minWidth: 148,
        getValue: (record) => formatCreated(record.created_at),
    },
];

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

export default function PatientTable({ patients = [], startNo = 1 }) {
    const tableRef = useRef(null);
    const tableHeight = useViewportTableHeight(tableRef);
    const [columnFilters, setColumnFilters] = useState({});
    const [filterMenu, setFilterMenu] = useState({ key: null, anchorEl: null });

    const numberedRecords = useMemo(
        () =>
            patients.map((record, index) => ({
                ...record,
                rowNo: startNo + index,
            })),
        [patients, startNo],
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
                        minWidth: 2200,
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
                                            route("admin.patient", record.id),
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
                                            {column.key === "name" ? (
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
                                                        sx={{ fontWeight: 700 }}
                                                    >
                                                        {patientName(record)}
                                                    </Box>
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
                                            ? "No patients match these column filters."
                                            : "No patients."}
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
