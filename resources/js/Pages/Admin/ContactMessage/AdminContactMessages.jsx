import * as React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Container,
    Box,
    Pagination,
} from "@mui/material";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import Title from "@/Components/Typo/Title";
import NoData from "@/Components/Util/NoData";
import MarkEmailUnreadRoundedIcon from "@mui/icons-material/MarkEmailUnreadRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import DateTimeFormatter from "@/Components/util/DateTimeFormatter";

const AdminContactMessages = ({ messages }) => {
    return (
        <AdminLayout>
            <Head title="Contact Message" />
            <Container maxWidth="lg" sx={{ pb: 3, px: { xs: 0 } }}>
                <Typography
                    fontWeight="bold"
                    color="primary"
                    mb={2}
                    variant="h4"
                >
                    Contact Messages
                </Typography>

                <TableContainer component={Paper}>
                    {messages.data.length == 0 ? (
                        <NoData />
                    ) : (
                        <Table
                            sx={{ minWidth: 650 }}
                            aria-label="message table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: 10 }} />
                                    <TableCell>
                                        <Typography fontWeight={600}>
                                            Name
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography fontWeight={600}>
                                            Email
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography fontWeight={600}>
                                            Send at
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography fontWeight={600}>
                                            Reply
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {messages.data.length > 0 &&
                                    messages.data.map((message) => (
                                        <TableRow
                                            key={message.id}
                                            sx={{ cursor: "pointer" }}
                                            onClick={() =>
                                                router.get(
                                                    route(
                                                        "admin.single.message",
                                                        message.id
                                                    )
                                                )
                                            }
                                        >
                                            <TableCell>
                                                {message.is_read ? (
                                                    <MarkEmailReadRoundedIcon fontSize="small" />
                                                ) : (
                                                    <MarkEmailUnreadRoundedIcon fontSize="small" />
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Typography fontSize={12}>
                                                    {message.name
                                                        ? message.name
                                                        : "N/A"}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography fontSize={12}>
                                                    {message.email}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Typography fontSize={12}>
                                                    <DateTimeFormatter
                                                        dateTime={
                                                            message.created_at
                                                        }
                                                    />
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography fontSize={12}>
                                                    {message.is_replied
                                                        ? "Replied"
                                                        : "N/A"}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
                {/* Pagination */}
                {messages.data.length > 0 && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            my: 3,
                        }}
                    >
                        <Pagination
                            count={messages.last_page}
                            page={messages.current_page}
                            onChange={(event, page) => {
                                router.get(route("contactMessage", { page }));
                            }}
                        />
                    </Box>
                )}
            </Container>
        </AdminLayout>
    );
};

export default AdminContactMessages;
