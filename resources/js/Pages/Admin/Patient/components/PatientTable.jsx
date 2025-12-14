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
import React from "react";
import { router } from "@inertiajs/react";
import AgeCalculator from "@/Components/util/AgeCalculator";
import ShowActiveOrOffline from "@/Components/util/ShowActiveOrOffline";

function PatientTable({ patients }) {
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {patients.map((pt, index) => (
                        <TableRow
                            key={index}
                            onClick={() =>
                                router.get(route("admin.patient", pt.id))
                            }
                            sx={{ cursor: "pointer" }}
                        >
                            <TableCell>
                                <Typography fontSize={13} fontWeight={"bold"}>
                                    {pt.first_name ||
                                        "" + " " + pt.last_name ||
                                        "" ||
                                        "N/A"}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <AgeCalculator date={pt.date_of_birth || ""} />
                            </TableCell>
                            <TableCell>
                                <Typography fontSize={13} color={"grey.600"}>
                                    {pt.gender || "N/A"}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default PatientTable;
