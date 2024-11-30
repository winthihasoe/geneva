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
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {applications.map((apply, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <strong>{apply.name || "N/A"}</strong>
                            </TableCell>
                            <TableCell>
                                <AgeCalculator date={apply.date_of_birth} />
                            </TableCell>
                            <TableCell>
                                <Typography fontSize={13} color={"grey.600"}>
                                    {apply.gender || "N/A"}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                {apply.height
                                    ? parseFloat(apply.height).toFixed(1)
                                    : "N/A"}
                                cm
                            </TableCell>
                            <TableCell>
                                {apply.weight
                                    ? parseFloat(apply.weight).toFixed(1)
                                    : "N/A"}
                                kg
                            </TableCell>

                            <TableCell>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() =>
                                        router.get(
                                            route(
                                                "admin.job.apply.single",
                                                apply.id
                                            )
                                        )
                                    }
                                >
                                    Detail
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AdminJobApplyTable;
