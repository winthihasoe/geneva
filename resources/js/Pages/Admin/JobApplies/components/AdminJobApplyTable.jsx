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
                            <Typography
                                variant="body2"
                                fontWeight="bold"
                                color={"#fff"}
                            >
                                Name
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography
                                variant="body2"
                                fontWeight="bold"
                                color={"#fff"}
                            >
                                Gender
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography
                                variant="body2"
                                fontWeight="bold"
                                color={"#fff"}
                            >
                                Status
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
                                <Typography variant="body2" fontSize={"0.8rem"}>
                                    {index + 1}.{" "}
                                    <strong>{apply.name || "N/A"}</strong>
                                    <br />
                                    <span
                                        style={{
                                            color: "gray",
                                            fontSize: "0.7rem",
                                        }}
                                    >
                                        <AgeCalculator
                                            date={apply.date_of_birth}
                                        />{" "}
                                        yrs (
                                        {apply.service_area == "Mandalay"
                                            ? "MDY"
                                            : apply.service_area == "Yangon"
                                            ? "YGN"
                                            : "Service Area ?"}
                                        )
                                    </span>
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography
                                    variant="body2"
                                    fontSize={"0.7rem"}
                                    color={"grey.600"}
                                >
                                    {apply.gender || "N/A"}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2" fontSize={"0.8rem"}>
                                    {apply.status || "N/A"}
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
