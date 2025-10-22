import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Stack,
    Container,
} from "@mui/material";
import dayjs from "dayjs";

function AdminAssessments({ assessments }) {
    return (
        <AdminLayout>
            <Container maxWidth="lg" sx={{ pb: 3, px: { xs: 0 } }}>
                <Typography
                    fontWeight="bold"
                    color="primary"
                    mb={2}
                    variant="h4"
                >
                    {" "}
                    Caregiver Skill Assessments
                </Typography>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Gender</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Education</TableCell>
                                <TableCell>Experience (yrs)</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Submitted</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {assessments.map((a) => (
                                <TableRow key={a.id}>
                                    <TableCell>
                                        <Stack spacing={0.5}>
                                            <Typography fontWeight={600}>
                                                {a.full_name}
                                            </Typography>
                                            <Typography
                                                fontSize={12}
                                                color="text.secondary"
                                            >
                                                {a.address}
                                            </Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>{a.gender}</TableCell>
                                    <TableCell>{a.phone}</TableCell>
                                    <TableCell>{a.email}</TableCell>
                                    <TableCell>
                                        <Typography fontSize={14}>
                                            {a.education}
                                        </Typography>
                                        {a.certifications && (
                                            <Typography
                                                fontSize={12}
                                                color="text.secondary"
                                            >
                                                {a.certifications}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>{a.experience_years}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={a.status}
                                            color={
                                                a.status === "approved"
                                                    ? "success"
                                                    : a.status === "rejected"
                                                    ? "error"
                                                    : a.status === "reviewed"
                                                    ? "info"
                                                    : "warning"
                                            }
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {dayjs(a.created_at).format(
                                            "YYYY-MM-DD HH:mm"
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </AdminLayout>
    );
}

export default AdminAssessments;
