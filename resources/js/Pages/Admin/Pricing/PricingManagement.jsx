import AdminLayout from "@/Layouts/AdminLayout";
import { router } from "@inertiajs/react";
import {
    Box,
    Typography,
    Paper,
    Divider,
    Stack,
    Grid2,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Container,
} from "@mui/material";
import React, { useState } from "react";

// Helper to extract plan data from normalized backend data
function getPlanData(services, durationLabel) {
    // durationLabel: "Daily", "month", "year"
    // Find all services (levels)
    return (services || []).map((service) => {
        // Find all packages for this service
        const liveIn = {};
        const liveOut = {};

        (service.packages || []).forEach((pkg) => {
            // Find all durations for this package
            (pkg.durations || []).forEach((duration) => {
                // Match duration label (e.g., "day", "month", "year")
                if (
                    duration.duration &&
                    duration.duration
                        .toLowerCase()
                        .includes(durationLabel.toLowerCase())
                ) {
                    // Get salary (first one, or all if needed)
                    const salaryObj =
                        duration.salaries && duration.salaries.length > 0
                            ? duration.salaries[0]
                            : null;
                    const salary = salaryObj ? salaryObj.amount : "-";
                    const salaryId = salaryObj ? salaryObj.id : null;
                    // Get service fee (first one, or all if needed)
                    const feeObj =
                        duration.service_fees &&
                        duration.service_fees.length > 0
                            ? duration.service_fees[0]
                            : null;
                    const fee = feeObj ? feeObj.fee : "-";
                    const feeId = feeObj ? feeObj.id : null;
                    if (pkg.type === "Live-in") {
                        liveIn.salary = salary;
                        liveIn.salaryId = salaryId;
                        liveIn.fee = fee;
                        liveIn.feeId = feeId;
                    }
                    if (pkg.type === "Live-out") {
                        liveOut.salary = salary;
                        liveOut.salaryId = salaryId;
                        liveOut.fee = fee;
                        liveOut.feeId = feeId;
                    }
                }
            });
        });

        return {
            id: service.id,
            level: service.name,
            "Live-in": liveIn,
            "Live-out": liveOut,
        };
    });
}

function PlanTable({ title, data, onEdit, onEditTitle, onDeleteTitle }) {
    return (
        <Paper sx={{ p: 2, mb: 3, boxShadow: 3, bgcolor: "background.paper" }}>
            <Typography variant="h5" fontWeight="bold" mb={3}>
                {title}
            </Typography>

            <Divider />
            {data.map((row, idx) => (
                <React.Fragment key={row.level}>
                    <Grid2
                        container
                        spacing={2}
                        alignItems="flex-start"
                        sx={{ py: 1 }}
                    >
                        <Grid2
                            size={{ xs: 12, sm: 6, md: 4 }}
                            sx={{
                                fontWeight: 500,
                                bgcolor: "gray.100",
                                p: 2,
                                borderRadius: 1,
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold">
                                {row.level}
                            </Typography>
                            <Stack direction="row" spacing={1} mt={1}>
                                <Button
                                    size="small"
                                    onClick={() => onEditTitle(row)}
                                    variant="contained"
                                >
                                    Edit
                                </Button>
                                <Button
                                    size="small"
                                    color="error"
                                    variant="outlined"
                                    onClick={() => onDeleteTitle(row)}
                                >
                                    Delete
                                </Button>
                            </Stack>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography
                                variant="body1"
                                fontWeight={600}
                                gutterBottom
                                color="primary"
                                sx={{
                                    bgcolor: "rgba(25, 118, 210, 0.1)",
                                    p: 1,
                                    borderRadius: 1,
                                }}
                            >
                                Live-in (24 Hours)
                            </Typography>
                            <Stack
                                direction="row"
                                spacing={1}
                                pl={2}
                                alignItems="center"
                            >
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    fontWeight={600}
                                >
                                    Salary:
                                </Typography>
                                <Typography variant="body1">
                                    {row["Live-in"].salary || "-"}
                                </Typography>
                                <Button
                                    size="small"
                                    onClick={() =>
                                        onEdit(row, "Live-in", "salary")
                                    }
                                >
                                    <u>Edit</u>
                                </Button>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                pl={2}
                            >
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    fontWeight={600}
                                >
                                    Service Fee:
                                </Typography>
                                <Typography variant="body1">
                                    {row["Live-in"].fee || "-"}
                                </Typography>
                                <Button
                                    size="small"
                                    onClick={() =>
                                        onEdit(row, "Live-in", "fee")
                                    }
                                >
                                    <u>Edit</u>
                                </Button>
                            </Stack>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography
                                variant="body1"
                                fontWeight={600}
                                gutterBottom
                                color="primary"
                                sx={{
                                    bgcolor: "rgba(25, 118, 210, 0.1)",
                                    p: 1,
                                    borderRadius: 1,
                                }}
                            >
                                Live-out (Day or Night duty)
                            </Typography>
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                pl={2}
                            >
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    fontWeight={600}
                                >
                                    Salary:
                                </Typography>
                                <Typography variant="body1">
                                    {row["Live-out"].salary || "-"}
                                </Typography>
                                <Button
                                    size="small"
                                    onClick={() =>
                                        onEdit(row, "Live-out", "salary")
                                    }
                                >
                                    <u>Edit</u>
                                </Button>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                pl={2}
                            >
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    fontWeight={600}
                                >
                                    Service Fee:
                                </Typography>
                                <Typography variant="body1">
                                    {row["Live-out"].fee || "-"}
                                </Typography>
                                <Button
                                    size="small"
                                    onClick={() =>
                                        onEdit(row, "Live-out", "fee")
                                    }
                                >
                                    <u>Edit</u>
                                </Button>
                            </Stack>
                        </Grid2>
                    </Grid2>

                    <Divider />
                </React.Fragment>
            ))}
        </Paper>
    );
}

function PricingManagement({ services }) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    // Edit dialogs state
    const [editTitleOpen, setEditTitleOpen] = useState(false);
    const [editTitleRow, setEditTitleRow] = useState(null);
    const [editTitleValue, setEditTitleValue] = useState("");

    const [editSalaryOpen, setEditSalaryOpen] = useState(false);
    const [editSalaryRow, setEditSalaryRow] = useState(null);
    const [editSalaryType, setEditSalaryType] = useState("");
    const [editSalaryValue, setEditSalaryValue] = useState("");
    const [editSalaryId, setEditSalaryId] = useState(null);
    const [planType, setEditSalaryPlanType] = useState("");

    const [editFeeOpen, setEditFeeOpen] = useState(false);
    const [editFeeRow, setEditFeeRow] = useState(null);
    const [editFeeType, setEditFeeType] = useState("");
    const [editFeeValue, setEditFeeValue] = useState("");
    const [editFeeId, setEditFeeId] = useState(null);

    const dailyData = getPlanData(services, "Daily");
    const monthlyData = getPlanData(services, "Monthly");
    const yearlyData = getPlanData(services, "Year");

    const handleEditTitle = (row) => {
        setEditTitleRow(row);
        setEditTitleValue(row.level);
        setEditTitleOpen(true);
    };

    const handleDeleteTitle = (row) => {
        setDeleteTarget({ type: "title", row });
        setConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        if (!deleteTarget) return;
        if (deleteTarget.type === "title") {
            router.delete(
                route("admin.service.delete", { id: deleteTarget.row.id })
            );
        }

        setConfirmOpen(false);
        setDeleteTarget(null);
    };

    const handleCancelDelete = () => {
        setConfirmOpen(false);
        setDeleteTarget(null);
    };

    const handleEdit = (row, type, valueType, planType) => {
        if (valueType === "salary") {
            setEditSalaryRow(row);
            setEditSalaryType(type);
            setEditSalaryValue(row[type].salary);
            setEditSalaryId(row[type].salaryId);
            setEditSalaryPlanType(planType);
            setEditSalaryOpen(true);
        } else if (valueType === "fee") {
            setEditFeeRow(row);
            setEditFeeType(type);
            setEditFeeValue(row[type].fee);
            setEditFeeId(row[type].feeId);
            setEditFeeOpen(true);
        }
    };

    // --- Save handlers ---
    const handleSaveTitle = () => {
        router.put(
            route("admin.service.title.update", { id: editTitleRow.id }),
            {
                name: editTitleValue,
            }
        );
        setEditTitleOpen(false);
        setEditTitleRow(null);
        setEditTitleValue("");
    };

    const handleSaveSalary = () => {
        if (editSalaryId) {
            router.put(route("admin.salary.update", { id: editSalaryId }), {
                amount: editSalaryValue,
            });
        }
        setEditSalaryOpen(false);
        setEditSalaryRow(null);
        setEditSalaryType("");
        setEditSalaryValue("");
        setEditSalaryId(null);
    };

    const handleSaveFee = () => {
        if (editFeeId) {
            router.put(route("admin.service_fee.update", { id: editFeeId }), {
                fee: editFeeValue,
            });
        }
        setEditFeeOpen(false);
        setEditFeeRow(null);
        setEditFeeType("");
        setEditFeeValue("");
        setEditFeeId(null);
    };

    return (
        <AdminLayout>
            <Container maxWidth="lg" sx={{ pb: 4, px: { xs: 0 } }}>
                <Typography
                    fontWeight="bold"
                    color="primary"
                    mb={2}
                    variant="h4"
                >
                    Pricing Management
                </Typography>

                <PlanTable
                    title="Daily Plan"
                    data={dailyData}
                    onEdit={(row, type, valueType) =>
                        handleEdit(row, type, valueType, "Daily")
                    }
                    onEditTitle={handleEditTitle}
                    onDeleteTitle={handleDeleteTitle}
                />
                <PlanTable
                    title="Monthly Plan"
                    data={monthlyData}
                    onEdit={(row, type, valueType) =>
                        handleEdit(row, type, valueType, "Monthly")
                    }
                    onEditTitle={handleEditTitle}
                    onDeleteTitle={handleDeleteTitle}
                />
                <PlanTable
                    title="Yearly Plan"
                    data={yearlyData}
                    onEdit={(row, type, valueType) =>
                        handleEdit(row, type, valueType, "Yearly")
                    }
                    onEditTitle={handleEditTitle}
                    onDeleteTitle={handleDeleteTitle}
                />
                {/* Edit Title Dialog */}
                <Dialog
                    open={editTitleOpen}
                    onClose={() => setEditTitleOpen(false)}
                >
                    <DialogTitle>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Edit Service Title
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Service Title"
                            value={editTitleValue}
                            onChange={(e) => setEditTitleValue(e.target.value)}
                            fullWidth
                            autoFocus
                            variant="standard"
                            multiline
                        />
                    </DialogContent>
                    <DialogActions sx={{ p: 3 }}>
                        <Button
                            size="small"
                            onClick={() => setEditTitleOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="small"
                            onClick={handleSaveTitle}
                            variant="contained"
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Edit Salary Dialog */}
                <Dialog
                    open={editSalaryOpen}
                    onClose={() => setEditSalaryOpen(false)}
                >
                    <DialogTitle>
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            gutterBottom
                        >
                            Edit Salary for {editSalaryRow?.level}
                        </Typography>
                        <Typography
                            variant="body1"
                            color="primary"
                            textAlign={"center"}
                            fontWeight={600}
                        >
                            {editSalaryType} ({planType})
                        </Typography>
                    </DialogTitle>

                    <DialogContent>
                        <TextField
                            label="Salary"
                            type="number"
                            value={editSalaryValue}
                            onChange={(e) => setEditSalaryValue(e.target.value)}
                            fullWidth
                            autoFocus
                            inputProps={{ min: 0 }}
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions sx={{ p: 3 }}>
                        <Button
                            size="small"
                            onClick={() => setEditSalaryOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="small"
                            onClick={handleSaveSalary}
                            variant="contained"
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Edit Service Fee Dialog */}
                <Dialog
                    open={editFeeOpen}
                    onClose={() => setEditFeeOpen(false)}
                >
                    <DialogTitle>
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            gutterBottom
                        >
                            Edit Service Fee for {editFeeRow?.level}
                        </Typography>
                        <Typography
                            variant="body1"
                            color="primary"
                            textAlign="center"
                            fontWeight={600}
                        >
                            {editFeeType} ({planType})
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Service Fee"
                            type="number"
                            value={editFeeValue}
                            onChange={(e) => setEditFeeValue(e.target.value)}
                            fullWidth
                            autoFocus
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions sx={{ p: 3 }}>
                        <Button
                            size="small"
                            onClick={() => setEditFeeOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="small"
                            onClick={handleSaveFee}
                            variant="contained"
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* Confirmation Dialog */}
                <Dialog open={confirmOpen} onClose={handleCancelDelete}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to delete this service?
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ p: 3 }}>
                        <Button size="small" onClick={handleCancelDelete}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirmDelete}
                            color="error"
                            variant="contained"
                            size="small"
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </AdminLayout>
    );
}

export default PricingManagement;
