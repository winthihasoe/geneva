import AdminLayout from "@/Layouts/AdminLayout";
import PerformanceExcelImport from "@/Components/Admin/PerformanceExcelImport";
import { Head, router } from "@inertiajs/react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import AdminJobApplyTable from "./components/AdminJobApplyTable";

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
                    <Typography fontWeight={700} sx={{ minWidth: 72, textAlign: "center" }}>
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

function JobApplies({
    jobApplies = [],
    count = 0,
    filters = {},
    availableMonths = [],
    byArea = {},
    serviceAreas = [],
}) {
    const month = filters.month || dayjs().format("YYYY-MM");
    const serviceArea = filters.service_area || "";
    const search = filters.search || "";
    const searching = search !== "";
    const [searchInput, setSearchInput] = useState(search);
    const [monthDialogOpen, setMonthDialogOpen] = useState(false);
    const [pickerYear, setPickerYear] = useState(() => Number(month.slice(0, 4)));

    useEffect(() => {
        setSearchInput(search);
    }, [search]);

    useEffect(() => {
        sessionStorage.setItem(
            "admin.job.apply.return",
            window.location.pathname + window.location.search
        );
    }, [month, serviceArea, search]);

    const visit = (next) => {
        const params = { month: next.month || month };
        const area = Object.prototype.hasOwnProperty.call(next, "service_area")
            ? next.service_area
            : serviceArea;
        const nextSearch = Object.prototype.hasOwnProperty.call(next, "search")
            ? next.search
            : search;
        if (area) {
            params.service_area = area;
        }
        if (nextSearch) {
            params.search = nextSearch;
        }

        router.get(route("admin.job.apply"), params, {
            preserveState: true,
            replace: true,
        });
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        visit({
            month,
            service_area: serviceArea,
            search: searchInput.trim(),
        });
    };

    const clearSearch = () => {
        setSearchInput("");
        visit({ month, service_area: serviceArea, search: "" });
    };

    const shiftMonth = (amount) => {
        visit({
            month: dayjs(`${month}-01`).add(amount, "month").format("YYYY-MM"),
        });
    };

    return (
        <AdminLayout>
            <Container maxWidth={false} sx={{ pb: 0, px: { xs: 0 }, minWidth: 0 }}>
                <Head title="Job Applies" />
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        mb: 2,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography
                            fontWeight="bold"
                            color="primary"
                            variant="h4"
                            fontFamily={"Roboto Slab"}
                        >
                            Job Applies
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
                                {count || 0}
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
                                router.get(route("admin.job.apply.create"))
                            }
                        >
                            Add candidate
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
                        {serviceAreas.map((area) => (
                            <Button
                                key={area}
                                size="small"
                                variant={serviceArea === area ? "contained" : "outlined"}
                                onClick={() =>
                                    visit({
                                        service_area:
                                            serviceArea === area ? "" : area,
                                    })
                                }
                            >
                                {area} ({byArea[area] || 0})
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
                            placeholder="Name, phone, or interviewer"
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
                            {count || 0} matches for "{search}" across all months
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
                            onClick={() => {
                                setPickerYear(Number(month.slice(0, 4)));
                                setMonthDialogOpen(true);
                            }}
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

                <AdminJobApplyTable
                    key={`${month}-${serviceArea}-${search}`}
                    applications={jobApplies}
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
                        visit({ month: value });
                    }}
                />
            </Container>
        </AdminLayout>
    );
}

export default JobApplies;
