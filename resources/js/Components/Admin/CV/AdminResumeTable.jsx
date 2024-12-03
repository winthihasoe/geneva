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

function AdminResumeTable({ resumes }) {
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
                        <TableCell>
                            <Typography fontWeight="bold" color={"#fff"}>
                                Level
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography
                                textAlign={"center"}
                                fontWeight="bold"
                                color={"#fff"}
                            >
                                Contact
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography fontWeight="bold" color={"#fff"}>
                                Status
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
                                <Typography fontSize={13} fontWeight={"bold"}>
                                    {resume.full_name || "N/A"}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <AgeCalculator date={resume.date_of_birth} />
                            </TableCell>
                            <TableCell>
                                <Typography fontSize={13} color={"grey.600"}>
                                    {resume.gender || "N/A"}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                {resume.height
                                    ? parseFloat(resume.height).toFixed(1)
                                    : "N/A"}{" "}
                                cm
                            </TableCell>
                            <TableCell>
                                {resume.weight
                                    ? parseFloat(resume.weight).toFixed(1)
                                    : "N/A"}{" "}
                                kg
                            </TableCell>
                            <TableCell>
                                <Typography fontSize={13} color={"primary"}>
                                    {resume.level || "N/A"}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    fontSize={13}
                                    color={"primary"}
                                    textAlign={"center"}
                                >
                                    {resume.emergency_contact || "N/A"}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Box display={"flex"} justifyContent={"center"}>
                                    <ShowActiveOrOffline
                                        lastActiveAt={
                                            resume.user?.last_active_at
                                        }
                                    />
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AdminResumeTable;
