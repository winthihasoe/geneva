import NoData from "@/Components/util/NoData";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import {
    Box,
    Button,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Pagination,
    Paper,
    Stack,
    Switch,
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
import React, { useState } from "react";

const ROLE_FILTERS = [
    { value: "", label: "All" },
    { value: "super_admin", label: "Super Admin" },
    { value: "admin", label: "Admin" },
    { value: "caregiver", label: "Caregiver" },
    { value: "employer", label: "Employer" },
];

function getRoleChips(user) {
    const roles = [];

    if (user.is_super_admin) {
        roles.push({ label: "Super Admin", color: "error" });
    }
    if (user.is_admin) {
        roles.push({ label: "Admin", color: "primary" });
    }
    if (user.is_caregiver) {
        roles.push({ label: "Caregiver", color: "success" });
    }
    if (user.is_employer) {
        roles.push({ label: "Employer", color: "info" });
    }

    if (roles.length === 0) {
        roles.push({ label: "User", color: "default" });
    }

    return roles;
}

export default function AdminUsers({
    users,
    count,
    filters: initialFilters = {},
}) {
    const currentUser = usePage().props.auth?.user;
    const [search, setSearch] = useState(initialFilters.search || "");
    const [selectedUser, setSelectedUser] = useState(null);
    const { data, setData, put, processing, reset } = useForm({
        is_admin: false,
        is_super_admin: false,
        is_caregiver: false,
        is_employer: false,
    });

    const applyFilters = (nextFilters) => {
        const params = {};
        if (nextFilters.search) params.search = nextFilters.search;
        if (nextFilters.role) params.role = nextFilters.role;
        router.get(route("admin.users"), params, {
            preserveState: true,
            replace: true,
        });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        applyFilters({
            search: search.trim(),
            role: initialFilters.role || "",
        });
    };

    const handleRoleFilter = (role) => {
        applyFilters({
            search: search.trim(),
            role: initialFilters.role === role ? "" : role,
        });
    };

    const handlePageChange = (event, value) => {
        const params = { page: value };
        if (initialFilters.search) params.search = initialFilters.search;
        if (initialFilters.role) params.role = initialFilters.role;
        router.get(route("admin.users"), params, { preserveState: true });
    };

    const openRoleDialog = (user) => {
        setSelectedUser(user);
        setData({
            is_admin: Boolean(user.is_admin),
            is_super_admin: Boolean(user.is_super_admin),
            is_caregiver: Boolean(user.is_caregiver),
            is_employer: Boolean(user.is_employer),
        });
    };

    const closeRoleDialog = () => {
        setSelectedUser(null);
        reset();
    };

    const handleSaveRoles = (e) => {
        e.preventDefault();
        if (!selectedUser) return;

        put(route("admin.users.roles.update", selectedUser.id), {
            preserveScroll: true,
            onSuccess: () => closeRoleDialog(),
        });
    };

    return (
        <AdminLayout>
            <Head title="User management" />
            <Container maxWidth="lg" sx={{ pb: 4, px: { xs: 0 } }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <Typography
                            variant="h4"
                            color="primary"
                            fontFamily={"Roboto Slab"}
                            fontWeight="bold"
                            mb={2}
                        >
                            Users
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
                                mb: 1,
                            }}
                        >
                            <Typography fontSize={11} color={"#fff"}>
                                {count || 0}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        mb: 2,
                        alignItems: "center",
                    }}
                >
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {ROLE_FILTERS.map((filter) => (
                            <Button
                                key={filter.value || "all"}
                                variant={
                                    (initialFilters.role || "") === filter.value
                                        ? "contained"
                                        : "outlined"
                                }
                                size="small"
                                onClick={() => handleRoleFilter(filter.value)}
                            >
                                {filter.label}
                            </Button>
                        ))}
                    </Stack>

                    <form onSubmit={handleSearchSubmit}>
                        <TextField
                            placeholder="Name or email"
                            size="small"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button type="submit">Search</Button>
                    </form>
                </Box>

                {users.data.length > 0 ? (
                    <>
                        <TableContainer component={Paper}>
                            <Table aria-label="Users table">
                                <TableHead sx={{ bgcolor: "primary.main" }}>
                                    <TableRow>
                                        <TableCell>
                                            <Typography
                                                variant="body2"
                                                fontWeight="bold"
                                                color={"#fff"}
                                            >
                                                User
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                variant="body2"
                                                fontWeight="bold"
                                                color={"#fff"}
                                            >
                                                Roles
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                variant="body2"
                                                fontWeight="bold"
                                                color={"#fff"}
                                            >
                                                Last active
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography
                                                variant="body2"
                                                fontWeight="bold"
                                                color={"#fff"}
                                            >
                                                Actions
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.data.map((user, index) => (
                                        <TableRow key={user.id}>
                                            <TableCell>
                                                <Typography
                                                    variant="body2"
                                                    fontSize={"0.8rem"}
                                                >
                                                    {index + 1}.{" "}
                                                    <strong>
                                                        {user.name}
                                                    </strong>
                                                    {currentUser?.id ===
                                                        user.id && (
                                                        <Chip
                                                            label="You"
                                                            size="small"
                                                            sx={{
                                                                ml: 1,
                                                                height: 20,
                                                                fontSize:
                                                                    "0.65rem",
                                                            }}
                                                        />
                                                    )}
                                                    <br />
                                                    <span
                                                        style={{
                                                            color: "gray",
                                                            fontSize: "0.7rem",
                                                        }}
                                                    >
                                                        {user.email}
                                                    </span>
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Stack
                                                    direction="row"
                                                    spacing={0.5}
                                                    flexWrap="wrap"
                                                    useFlexGap
                                                >
                                                    {getRoleChips(user).map(
                                                        (role) => (
                                                            <Chip
                                                                key={role.label}
                                                                label={
                                                                    role.label
                                                                }
                                                                color={
                                                                    role.color
                                                                }
                                                                size="small"
                                                                sx={{
                                                                    fontSize:
                                                                        "0.7rem",
                                                                }}
                                                            />
                                                        )
                                                    )}
                                                </Stack>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant="body2"
                                                    fontSize={"0.7rem"}
                                                >
                                                    {user.last_active_at
                                                        ? dayjs(
                                                              user.last_active_at
                                                          ).format(
                                                              "DD-MM-YYYY HH:mm"
                                                          )
                                                        : "Never"}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    sx={{
                                                        borderRadius: 20,
                                                        fontSize: "0.75rem",
                                                    }}
                                                    onClick={() =>
                                                        openRoleDialog(user)
                                                    }
                                                >
                                                    Edit roles
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                my: 3,
                            }}
                        >
                            <Pagination
                                count={users.last_page}
                                page={users.current_page}
                                onChange={handlePageChange}
                            />
                        </Box>
                    </>
                ) : (
                    <NoData />
                )}
            </Container>

            <Dialog
                open={Boolean(selectedUser)}
                onClose={closeRoleDialog}
                fullWidth
                maxWidth="xs"
            >
                <form onSubmit={handleSaveRoles}>
                    <DialogTitle
                        sx={{
                            fontFamily: "Roboto Slab",
                            fontWeight: "bold",
                        }}
                    >
                        Edit roles
                    </DialogTitle>
                    <DialogContent>
                        {selectedUser && (
                            <Box sx={{ mb: 2 }}>
                                <Typography fontWeight="bold">
                                    {selectedUser.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {selectedUser.email}
                                </Typography>
                            </Box>
                        )}
                        <Stack>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={data.is_super_admin}
                                        onChange={(e) =>
                                            setData(
                                                "is_super_admin",
                                                e.target.checked
                                            )
                                        }
                                    />
                                }
                                label="Super Admin"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={data.is_admin}
                                        onChange={(e) =>
                                            setData(
                                                "is_admin",
                                                e.target.checked
                                            )
                                        }
                                    />
                                }
                                label="Admin"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={data.is_caregiver}
                                        onChange={(e) =>
                                            setData(
                                                "is_caregiver",
                                                e.target.checked
                                            )
                                        }
                                    />
                                }
                                label="Caregiver"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={data.is_employer}
                                        onChange={(e) =>
                                            setData(
                                                "is_employer",
                                                e.target.checked
                                            )
                                        }
                                    />
                                }
                                label="Employer"
                            />
                        </Stack>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block", mt: 1 }}
                        >
                            Super Admin can access the admin site and manage
                            user roles. Admin can access the admin site only.
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 2 }}>
                        <Button onClick={closeRoleDialog} disabled={processing}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={processing}
                            sx={{ borderRadius: 20 }}
                        >
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </AdminLayout>
    );
}
