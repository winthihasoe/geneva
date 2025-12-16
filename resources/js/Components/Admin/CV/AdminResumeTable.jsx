import {
    Box,
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
import MaleRoundedIcon from "@mui/icons-material/MaleRounded";

function AdminResumeTable({ resumes }) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="CV table">
                <TableHead sx={{ bgcolor: "primary.main" }}>
                    <TableRow>
                        <TableCell>
                            <Typography
                                fontWeight="bold"
                                fontSize={"0.8rem"}
                                color={"#fff"}
                            >
                                Name
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography
                                textAlign={"center"}
                                fontWeight="bold"
                                color={"#fff"}
                                fontSize={"0.8rem"}
                            >
                                Status
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography
                                textAlign={"center"}
                                fontWeight="bold"
                                color={"#fff"}
                                fontSize={"0.8rem"}
                            >
                                Contact
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography fontSize={"0.8rem"} color={"#fff"}>
                                <MaleRoundedIcon fontSize="small" />
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {resumes.map((resume, index) => (
                        <TableRow
                            key={index}
                            onClick={() =>
                                router.get(route("admin.cv.single", resume.id))
                            }
                            sx={{ cursor: "pointer" }}
                        >
                            <TableCell>
                                <Typography
                                    fontSize={"0.7rem"}
                                    fontWeight={"bold"}
                                >
                                    {index + 1}. {resume.full_name || "N/A"}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography
                                    fontSize={"0.7rem"}
                                    color="text.secondary"
                                >
                                    {resume.status}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography
                                    fontSize={"0.7rem"}
                                    color={"primary"}
                                    textAlign={"center"}
                                >
                                    {resume.phone || "-"}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    fontSize={"0.7rem"}
                                    color={"grey.600"}
                                >
                                    {resume.gender == "Male" ? "M" : "F"}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AdminResumeTable;
