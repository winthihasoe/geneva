import useViewportTableHeight from "@/hooks/useViewportTableHeight";
import AdminLayout from "@/Layouts/AdminLayout";
import PerformanceExcelImport from "@/Components/Admin/PerformanceExcelImport";
import { careTypeLabel, patientDisplayName } from "@/utils/careTypeLabel";
import { Head, Link, router } from "@inertiajs/react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
    Box,
    Button,
    Checkbox,
    Container,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
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

const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const formatShortDate = (value) => {
    if (!value) {
        return null;
    }

    const parsed = dayjs(value);

    return parsed.isValid() ? parsed.format("DD-MM-YY") : null;
};

const formatShortDateTime = (value) => {
    if (!value) {
        return null;
    }

    const parsed = dayjs(value);
    if (!parsed.isValid()) {
        return null;
    }

    if (parsed.format("HH:mm") === "00:00") {
        return parsed.format("DD-MM-YY");
    }

    return parsed.format("DD-MM-YY HH:mm");
};

const displayDate = (date, note) => {
    if (!date) {
        return note || "-";
    }

    if (note) {
        return note;
    }

    return formatShortDate(date) || "-";
};

const displayDateTime = (date, note) => {
    if (!date) {
        return note || "-";
    }

    if (note) {
        return note;
    }

    return formatShortDateTime(date) || "-";
};

const displayText = (value) => value || "-";

const inquiryStatusLabel = {
    open: "Open",
    cv_sent: "CV sent",
    interviewing: "Interviewing",
    confirmed: "Confirmed",
    on_duty: "On duty",
    cancelled: "Cancelled",
};

const displayStart = (record) => {
    const formatted = formatShortDate(record.requested_start_date);
    const original = record.requested_start?.trim();

    if (!original) {
        return formatted || "-";
    }

    if (formatted && /^\d{1,2}[./-]\d{1,2}[./-]\d{2,4}$/.test(original)) {
        return formatted;
    }

    return original;
};

const columns = [
    {
        key: "name",
        label: "No. Name",
        minWidth: 130,
        wrap: true,
        getValue: (record) => displayText(record.name),
    },

    {
        key: "inquiry_at",
        label: "Date & time",
        minWidth: 120,
        getValue: (record) =>
            displayDateTime(record.inquiry_at, record.inquiry_note),
    },
    {
        key: "care_type",
        label: "Type",
        minWidth: 90,
        getValue: (record) =>
            careTypeLabel(record.care_type) || displayText(record.care_type),
    },
    {
        key: "status",
        label: "Inquiry status",
        minWidth: 120,
        getValue: (record) =>
            inquiryStatusLabel[record.status] || displayText(record.status),
    },
    {
        key: "address",
        label: "Address",
        minWidth: 180,
        wrap: true,
        maxWidth: 240,
        getValue: (record) => displayText(record.address),
    },
    {
        key: "phone",
        label: "Phone",
        minWidth: 100,
        getValue: (record) => displayText(record.phone),
    },
    {
        key: "requested_start",
        label: "Start date",
        minWidth: 130,
        wrap: true,
        maxWidth: 180,
        getValue: (record) => displayStart(record),
    },
    {
        key: "duration",
        label: "Duration",
        minWidth: 96,
        getValue: (record) => displayText(record.duration),
    },
    {
        key: "level",
        label: "Level",
        minWidth: 120,
        wrap: true,
        getValue: (record) => displayText(record.level),
    },
    {
        key: "duty_type",
        label: "Duty",
        minWidth: 100,
        getValue: (record) => displayText(record.duty_type),
    },
    {
        key: "cv_sent_at",
        label: "CV received",
        minWidth: 132,
        wrap: true,
        maxWidth: 180,
        getValue: (record) =>
            displayDateTime(record.cv_sent_at, record.cv_sent_note),
    },
    {
        key: "client_response",
        label: "Client response",
        minWidth: 180,
        wrap: true,
        maxWidth: 260,
        getValue: (record) => displayText(record.client_response),
    },
    {
        key: "interview_date",
        label: "Interview date",
        minWidth: 124,
        wrap: true,
        getValue: (record) =>
            displayDate(record.interview_date, record.interview_note),
    },
    {
        key: "confirm_date",
        label: "Confirm date",
        minWidth: 120,
        wrap: true,
        getValue: (record) =>
            displayDate(record.confirm_date, record.confirm_note),
    },
    {
        key: "patient",
        label: "Patient",
        minWidth: 140,
        wrap: true,
        getValue: (record) => {
            if (record.patient) {
                return patientDisplayName(record.patient) || "-";
            }

            if (record.status === "confirmed" || record.status === "on_duty") {
                return "Not linked";
            }

            return "-";
        },
    },
    {
        key: "deposit",
        label: "Deposit",
        minWidth: 140,
        wrap: true,
        maxWidth: 200,
        getValue: (record) => displayText(record.deposit_note),
    },
    {
        key: "duty_start",
        label: "Duty start",
        minWidth: 120,
        wrap: true,
        getValue: (record) =>
            displayDate(record.duty_start_date, record.duty_start_note),
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

function MonthJumpDialog({
    open,
    month,
    year,
    availableMonths,
    onClose,
    onYearChange,
    onSelect,
}) {
    const available = new Set(availableMonths);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle sx={{ pb: 1 }}>Jump to month</DialogTitle>
            <DialogContent>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                        mb: 2,
                    }}
                >
                    <IconButton
                        aria-label="Previous year"
                        onClick={() => onYearChange(year - 1)}
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                    <Typography
                        fontWeight={700}
                        sx={{ minWidth: 72, textAlign: "center" }}
                    >
                        {year}
                    </Typography>
                    <IconButton
                        aria-label="Next year"
                        onClick={() => onYearChange(year + 1)}
                    >
                        <ChevronRightIcon />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 1,
                        pb: 1,
                    }}
                >
                    {monthNames.map((name, index) => {
                        const value = `${year}-${String(index + 1).padStart(2, "0")}`;
                        const selected = value === month;
                        const hasRecords = available.has(value);

                        return (
                            <Button
                                key={value}
                                variant={selected ? "contained" : "outlined"}
                                onClick={() => onSelect(value)}
                                sx={{
                                    textTransform: "none",
                                    flexDirection: "column",
                                    py: 1,
                                }}
                            >
                                {name}
                                <Box
                                    sx={{
                                        width: 6,
                                        height: 6,
                                        mt: 0.5,
                                        borderRadius: "50%",
                                        bgcolor: hasRecords
                                            ? selected
                                                ? "#fff"
                                                : "primary.main"
                                            : "transparent",
                                    }}
                                />
                            </Button>
                        );
                    })}
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default function AdminCases({
    records = [],
    filters = {},
    summary = {},
    branches = [],
    availableMonths = [],
}) {
    const tableRef = useRef(null);
    const tableHeight = useViewportTableHeight(tableRef);
    const month = filters.month || dayjs().format("YYYY-MM");
    const branch = filters.branch || "";
    const search = filters.search || "";
    const searching = search !== "";
    const [searchInput, setSearchInput] = useState(search);
    const [columnFilters, setColumnFilters] = useState({});
    const [filterMenu, setFilterMenu] = useState({ key: null, anchorEl: null });
    const [monthDialogOpen, setMonthDialogOpen] = useState(false);
    const [pickerYear, setPickerYear] = useState(() =>
        Number(month.slice(0, 4)),
    );

    useEffect(() => {
        setSearchInput(search);
    }, [search]);

    useEffect(() => {
        setColumnFilters({});
        setFilterMenu({ key: null, anchorEl: null });
    }, [month, branch, search]);

    const visit = (next) => {
        const params = { month: next.month || month };
        const nextBranch = Object.prototype.hasOwnProperty.call(next, "branch")
            ? next.branch
            : branch;
        const nextSearch = Object.prototype.hasOwnProperty.call(next, "search")
            ? next.search
            : search;

        if (nextBranch) {
            params.branch = nextBranch;
        }
        if (nextSearch) {
            params.search = nextSearch;
        }

        router.get(route("admin.cases.index"), params, {
            preserveState: true,
            replace: true,
        });
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        visit({
            month,
            branch,
            search: searchInput.trim(),
        });
    };

    const clearSearch = () => {
        setSearchInput("");
        visit({ month, branch, search: "" });
    };

    const numberedRecords = useMemo(
        () => records.map((record, index) => ({ ...record, rowNo: index + 1 })),
        [records],
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

    const byBranch = summary.by_branch || {};
    const hasColumnFilters = Object.values(columnFilters).some(Boolean);

    const openMonthDialog = () => {
        setPickerYear(Number(month.slice(0, 4)));
        setMonthDialogOpen(true);
    };

    const shiftMonth = (amount) => {
        visit({
            month: dayjs(`${month}-01`).add(amount, "month").format("YYYY-MM"),
            branch,
        });
    };

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
        <AdminLayout>
            <Head title="New Cases" />
            <Container
                maxWidth={false}
                sx={{ pb: 0, px: { xs: 0 }, minWidth: 0 }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 1,
                        mb: 2,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography
                            variant="h4"
                            color="primary"
                            fontFamily={"Roboto Slab"}
                            fontWeight="bold"
                        >
                            New Cases
                        </Typography>
                        <Box
                            sx={{
                                bgcolor: "red",
                                width: 30,
                                height: 30,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "50%",
                                display: "flex",
                            }}
                        >
                            <Typography fontSize={11} color={"#fff"}>
                                {summary.total || 0}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <PerformanceExcelImport />
                        <Button
                            size="small"
                            variant="contained"
                            sx={{ borderRadius: 20 }}
                            onClick={() =>
                                router.get(route("admin.cases.create"))
                            }
                        >
                            Add case
                        </Button>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        flexWrap: "wrap",
                        mb: 1.5,
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {branches.map((item) => (
                            <Button
                                key={item}
                                size="small"
                                variant={
                                    branch === item ? "contained" : "outlined"
                                }
                                onClick={() =>
                                    visit({
                                        month,
                                        branch: branch === item ? "" : item,
                                    })
                                }
                            >
                                {item} ({byBranch[item] || 0})
                            </Button>
                        ))}
                    </Box>
                    <Box
                        component="form"
                        onSubmit={handleSearchSubmit}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            width: { xs: "100%", sm: "auto" },
                        }}
                    >
                        <TextField
                            size="small"
                            placeholder="Name, phone, or address"
                            value={searchInput}
                            onChange={(event) =>
                                setSearchInput(event.target.value)
                            }
                            sx={{
                                width: { xs: "100%", sm: 280 },
                                bgcolor: "background.paper",
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon
                                            fontSize="small"
                                            sx={{ color: "text.secondary" }}
                                        />
                                    </InputAdornment>
                                ),
                                endAdornment: searchInput ? (
                                    <InputAdornment position="end">
                                        <IconButton
                                            type="button"
                                            size="small"
                                            aria-label="Clear search"
                                            onClick={clearSearch}
                                            edge="end"
                                        >
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </InputAdornment>
                                ) : null,
                            }}
                        />
                        <Button type="submit" size="small" variant="contained">
                            Search
                        </Button>
                    </Box>
                </Box>

                {searching ? (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                            mb: 1,
                            flexWrap: "wrap",
                        }}
                    >
                        <Typography fontWeight={700} color="primary">
                            {summary.total || 0} matches for "{search}" across
                            all months
                        </Typography>
                        <Button size="small" onClick={clearSearch}>
                            Clear search
                        </Button>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 0.5,
                            mb: 1,
                        }}
                    >
                        <IconButton
                            aria-label="Previous month"
                            onClick={() => shiftMonth(-1)}
                            color="primary"
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                        <Button
                            onClick={openMonthDialog}
                            color="primary"
                            sx={{
                                textTransform: "none",
                                fontWeight: 700,
                                fontSize: 18,
                                minWidth: 180,
                            }}
                        >
                            {dayjs(`${month}-01`).format("MMMM YYYY")}
                        </Button>
                        <IconButton
                            aria-label="Next month"
                            onClick={() => shiftMonth(1)}
                            color="primary"
                        >
                            <ChevronRightIcon />
                        </IconButton>
                    </Box>
                )}

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
                            minWidth: 1860,
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
                                                    justifyContent:
                                                        "space-between",
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
                                                    "admin.cases.edit",
                                                    record.id,
                                                ),
                                            )
                                        }
                                        sx={(theme) => {
                                            const stripe =
                                                index % 2 === 0
                                                    ? theme.palette.background
                                                          .paper
                                                    : theme.palette.mode ===
                                                        "dark"
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
                                                    maxWidth: {
                                                        xs: 168,
                                                        md: 280,
                                                    },
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
                                                            sx={{ minWidth: 0 }}
                                                        >
                                                            <Box
                                                                component="span"
                                                                sx={{
                                                                    fontWeight: 700,
                                                                }}
                                                            >
                                                                {record.name}
                                                            </Box>
                                                            {searching &&
                                                                record.branch && (
                                                                    <Typography
                                                                        component="div"
                                                                        sx={{
                                                                            fontSize: 11,
                                                                            lineHeight: 1.2,
                                                                            color: "text.secondary",
                                                                        }}
                                                                    >
                                                                        {
                                                                            record.branch
                                                                        }
                                                                    </Typography>
                                                                )}
                                                        </Box>
                                                    </Box>
                                                ) : column.key === "patient" &&
                                                  record.patient ? (
                                                    <Box
                                                        component={Link}
                                                        href={route(
                                                            "admin.patient",
                                                            record.patient.id,
                                                        )}
                                                        onClick={(event) =>
                                                            event.stopPropagation()
                                                        }
                                                        sx={{
                                                            color: "primary.main",
                                                            fontWeight: 600,
                                                            textDecoration:
                                                                "none",
                                                            "&:hover": {
                                                                textDecoration:
                                                                    "underline",
                                                            },
                                                        }}
                                                    >
                                                        {patientDisplayName(
                                                            record.patient,
                                                        )}
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
                                            {records.length === 0 && searching
                                                ? "No cases match this search."
                                                : hasColumnFilters
                                                  ? "No cases match these column filters."
                                                  : "No cases in this month."}
                                        </Typography>
                                        {records.length === 0 && searching ? (
                                            <Button
                                                size="small"
                                                onClick={clearSearch}
                                                sx={{ mt: 1 }}
                                            >
                                                Clear search
                                            </Button>
                                        ) : (
                                            hasColumnFilters && (
                                                <Button
                                                    size="small"
                                                    onClick={() =>
                                                        setColumnFilters({})
                                                    }
                                                    sx={{ mt: 1 }}
                                                >
                                                    Clear filters
                                                </Button>
                                            )
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

                <MonthJumpDialog
                    open={monthDialogOpen}
                    month={month}
                    year={pickerYear}
                    availableMonths={availableMonths}
                    onClose={() => setMonthDialogOpen(false)}
                    onYearChange={setPickerYear}
                    onSelect={(value) => {
                        setMonthDialogOpen(false);
                        visit({ month: value, branch });
                    }}
                />
            </Container>
        </AdminLayout>
    );
}
