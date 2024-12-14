import {
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
import DateFormatter from "@/Components/util/DateFormatter";

function InterviewTable({ interviews }) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="CV table">
                <TableHead sx={{ bgcolor: "primary.main" }}>
                    <TableRow>
                        <TableCell>
                            <Typography fontWeight="bold" color={"#fff"}>
                                Pt Name
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography fontWeight="bold" color={"#fff"}>
                                Cg Name
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography fontWeight="bold" color={"#fff"}>
                                Date
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography fontWeight="bold" color={"#fff"}>
                                Time
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography fontWeight="bold" color={"#fff"}>
                                Mode
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {interviews.map((interview, index) => (
                        <TableRow
                            key={index}
                            onClick={() =>
                                router.get(
                                    route(
                                        "admin.interview.single",
                                        interview.id
                                    )
                                )
                            }
                            sx={{ cursor: "pointer" }}
                        >
                            <TableCell>
                                <Typography
                                    fontSize={{ xs: 11, sm: 13 }}
                                    fontWeight={"bold"}
                                >
                                    {
                                        interview.care_plan.care_recipient_info
                                            .name
                                    }
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    fontSize={{ xs: 11, sm: 13 }}
                                    fontWeight={"bold"}
                                >
                                    {interview.cv.full_name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography fontSize={13} color={"grey.600"}>
                                    <DateFormatter date={interview.date} />
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography fontSize={13} color={"grey.600"}>
                                    {interview.time}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography fontSize={13} color={"grey.600"}>
                                    {interview.mode == "Virtual"
                                        ? interview.online
                                        : interview.location}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default InterviewTable;
