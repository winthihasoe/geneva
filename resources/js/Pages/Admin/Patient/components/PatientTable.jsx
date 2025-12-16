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
                                Service
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography fontWeight="bold" color={"#fff"}>
                                Location
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
                                <Typography fontSize={13}>
                                    {index + 1}.{" "}
                                    <b>
                                        {pt.first_name ||
                                            "" + " " + pt.last_name ||
                                            "" ||
                                            "Patient Name?"}
                                    </b>{" "}
                                    <br />
                                    <span
                                        style={{
                                            color: "gray",
                                            fontSize: "0.7rem",
                                        }}
                                    >
                                        {pt.date_of_birth ? (
                                            <AgeCalculator
                                                date={pt.date_of_birth}
                                            />
                                        ) : (
                                            ""
                                        )}{" "}
                                        |{" "}
                                        {pt.gender == "Male"
                                            ? "M"
                                            : pt.gender == "Female"
                                            ? "F"
                                            : "Gender?"}
                                    </span>
                                </Typography>
                            </TableCell>
                            <TableCell>{pt.type}</TableCell>
                            <TableCell>
                                <Typography fontSize={13} color={"grey.600"}>
                                    {pt.service_area == "Mandalay"
                                        ? "MDY"
                                        : pt.service_area == "Yangon"
                                        ? "YGN"
                                        : "N/A"}
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
