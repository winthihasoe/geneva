import {
    Box,
    Button,
    Paper,
    Rating,
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

function AdminResumeTable({ cvs }) {
    return (
        <TableContainer component={Paper} sx={{ mb: 3, mt: 2 }}>
            <Table>
                <TableHead sx={{ bgcolor: "gray.200" }}>
                    <TableRow>
                        <TableCell
                            sx={{
                                fontSize: "0.8rem",
                                fontWeight: "bold",
                                width: "60%",
                            }}
                        >
                            Name
                        </TableCell>

                        <TableCell
                            sx={{
                                fontSize: "0.8rem",
                                fontWeight: "bold",
                                width: "10%",
                            }}
                        >
                            Location
                        </TableCell>
                        <TableCell
                            sx={{
                                fontSize: "0.8rem",
                                fontWeight: "bold",
                                width: "30%",
                            }}
                        >
                            Phone
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cvs &&
                        cvs.map((cv, index) => (
                            <TableRow
                                key={index}
                                hover
                                sx={{ cursor: "pointer" }}
                                onClick={() =>
                                    router.visit(
                                        route("admin.cv.single", {
                                            cvId: cv.id,
                                        })
                                    )
                                }
                            >
                                <TableCell
                                    sx={{
                                        fontSize: {
                                            xs: "0.7rem",
                                            sm: "0.7rem",
                                            md: "0.8rem",
                                        },
                                    }}
                                >
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontSize: {
                                                    xs: "0.7rem",
                                                    sm: "0.8rem",
                                                    md: "0.9rem",
                                                },
                                                fontWeight: 500,
                                            }}
                                        >
                                            {index + 1}. <b>{cv.full_name}</b>
                                        </Typography>
                                        <span
                                            style={{
                                                color: "gray",
                                                fontSize: "0.6rem",
                                            }}
                                        >
                                            <AgeCalculator
                                                date={cv.date_of_birth}
                                            />{" "}
                                            yrs | {cv.services.join(" | ")}
                                        </span>
                                        {cv.reviews_count > 0 && (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 0.5,
                                                    mt: 0.5,
                                                }}
                                            >
                                                <Rating
                                                    value={
                                                        cv.reviews_avg_rating ||
                                                        0
                                                    }
                                                    readOnly
                                                    size="small"
                                                    precision={0.5}
                                                    sx={{
                                                        fontSize: "0.9rem",
                                                    }}
                                                />
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    sx={{
                                                        fontSize: "0.65rem",
                                                    }}
                                                >
                                                    ({cv.reviews_count})
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </TableCell>

                                <TableCell
                                    sx={{
                                        fontSize: "0.7rem",
                                    }}
                                >
                                    {cv.service_area == "Mandalay"
                                        ? "MDY"
                                        : cv.service_area == "Yangon"
                                        ? "YGN"
                                        : cv.service_area}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: "0.7rem",
                                    }}
                                >
                                    {/* when click, phone call  */}
                                    <a href={`tel:${cv.phone}`}>{cv.phone}</a>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AdminResumeTable;
