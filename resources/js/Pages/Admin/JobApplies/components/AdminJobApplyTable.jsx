import React from "react";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { router } from "@inertiajs/react";
import AgeCalculator from "@/Components/util/AgeCalculator";

function AdminJobApplyTable({ applications }) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="CV table">
                <TableHead sx={{ bgcolor: "primary.main" }}>
                    <TableRow>
                        <TableCell>
                            <Typography fontWeight="bold" color={"#fff"}>
                                Name
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography fontWeight="bold" color={"#fff"}>
                                Age
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography fontWeight="bold" color={"#fff"}>
                                Gender
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography fontWeight="bold" color={"#fff"}>
                                Height
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography fontWeight="bold" color={"#fff"}>
                                Weight
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {applications.map((apply, index) => (
                        <TableRow
                            key={index}
                            onClick={() =>
                                router.get(
                                    route("admin.job.apply.single", apply.id)
                                )
                            }
                            sx={{ cursor: "pointer" }}
                        >
                            <TableCell>
                                <strong>{apply.name || "N/A"}</strong>
                            </TableCell>
                            <TableCell>
                                <AgeCalculator date={apply.date_of_birth} />
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2" color={"grey.600"}>
                                    {apply.gender || "N/A"}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">
                                    {apply.height
                                        ? parseFloat(apply.height).toFixed(1)
                                        : "N/A"}
                                    cm
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">
                                    {apply.weight
                                        ? parseFloat(apply.weight).toFixed(1)
                                        : "N/A"}
                                    kg
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AdminJobApplyTable;
