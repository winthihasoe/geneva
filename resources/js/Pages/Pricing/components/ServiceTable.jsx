import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import React from "react";

function ServiceTable({ service }) {
    // Filter packages by type
    const liveOutPackages = service.packages.filter(
        (pkg) => pkg.type === "Live-out"
    );
    const liveInPackages = service.packages.filter(
        (pkg) => pkg.type === "Live-in"
    );

    const renderPackageTable = (packages, type) => (
        <Box
            sx={{
                p: 1,
                pt: { xs: 1, sm: 3, md: 4 },
                position: "relative",
                mt: 2,
            }}
        >
            <Box sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
                <img
                    src="/images/pricing/three_arrow.png"
                    alt="arrow"
                    style={{
                        width: 150,
                        position: "absolute",
                        top: -40,
                        left: -20,
                    }}
                />
            </Box>

            <Box sx={{ textAlign: "center", my: 1, position: "relative" }}>
                <Box display={"inline-block"} position={"relative"}>
                    <Typography
                        color="primary"
                        fontSize={{ xs: 15, sm: 20, md: 27 }}
                        fontFamily={"Livvic"}
                    >
                        {service.name} ({service.age_range})
                    </Typography>
                    <Box
                        sx={{
                            display: { xs: "none", sm: "none", md: "flex" },
                        }}
                    >
                        <img
                            src="/images/pricing/bump_up.png"
                            alt="Bump up"
                            style={{
                                width: 60,
                                position: "absolute",
                                top: -40,
                                right: -45,
                            }}
                        />
                    </Box>
                </Box>

                <Typography
                    color="primary"
                    fontSize={{ xs: 30, sm: 40, md: 48 }}
                    fontFamily={"Livvic"}
                >
                    Monthly Packages ({type})
                </Typography>
            </Box>

            <TableContainer sx={{ borderRadius: 3 }}>
                <Table
                    sx={{ borderCollapse: "separate", borderSpacing: "0 8px" }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    borderBottom: "none",
                                    p: 0,
                                }}
                            >
                                <Box textAlign={"center"}>
                                    <img
                                        src={
                                            service.name.includes("Nanny") ||
                                            service.name.includes("Newborn")
                                                ? "/images/pricing/baby_care.png"
                                                : "/images/pricing/elder_care.png"
                                        }
                                        alt={
                                            service.name.includes("Nanny") ||
                                            service.name.includes("Newborn")
                                                ? "Baby care"
                                                : "Elder care"
                                        }
                                        style={{
                                            width: 80,
                                        }}
                                    />
                                </Box>
                            </TableCell>
                            {packages[0]?.durations.map((duration, index) => (
                                <TableCell
                                    align="center"
                                    key={index}
                                    sx={{ borderBottom: "none" }}
                                >
                                    <Typography
                                        fontFamily={"Livvic"}
                                        fontSize={{ xs: 13, sm: 16, md: 19 }}
                                    >
                                        {duration.duration}
                                    </Typography>
                                    <Typography
                                        fontFamily={"Livvic"}
                                        fontSize={{ xs: 10, sm: 13, md: 15 }}
                                        fontWeight={400}
                                        sx={{ color: "grey" }}
                                    >
                                        {duration.replacement_policy}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Loop through packages to display salary details */}
                        {packages.map((pkg, pkgIndex) => (
                            <React.Fragment key={pkgIndex}>
                                {pkg.durations[0]?.salaries.map(
                                    (salary, salaryIndex) => (
                                        <TableRow
                                            key={salaryIndex}
                                            sx={{
                                                bgcolor: "#EAFFF6",
                                                marginBottom: 3,
                                            }}
                                        >
                                            <TableCell
                                                sx={{
                                                    fontWeight: 600,
                                                    fontFamily: "Mali",
                                                    fontSize: "1.1rem",
                                                    borderBottom: "none",
                                                    borderTopLeftRadius: 20,
                                                    borderBottomLeftRadius: 20,
                                                }}
                                            >
                                                {salary.role} <br />
                                                <span
                                                    style={{
                                                        fontSize: "0.85rem",
                                                    }}
                                                >
                                                    (Monthly)
                                                </span>
                                            </TableCell>
                                            {pkg.durations.map(
                                                (duration, durationIndex) => (
                                                    <TableCell
                                                        key={durationIndex}
                                                        align="center"
                                                        sx={{
                                                            fontWeight: "bold",
                                                            fontFamily:
                                                                "Madimi One",
                                                            color: "primary.main",
                                                            borderBottom:
                                                                "none",
                                                        }}
                                                    >
                                                        {duration.salaries.find(
                                                            (s) =>
                                                                s.role ===
                                                                salary.role
                                                        )?.amount || "N/A"}{" "}
                                                        THB/ <br /> Month
                                                    </TableCell>
                                                )
                                            )}
                                        </TableRow>
                                    )
                                )}

                                {/* Service Fees row */}
                                <TableRow
                                    sx={{ bgcolor: "#DDF6EC", marginBottom: 3 }}
                                >
                                    <TableCell
                                        sx={{
                                            fontWeight: 600,
                                            fontFamily: "Mali",
                                            fontSize: "1.1rem",
                                            borderBottom: "none",
                                            borderTopLeftRadius: 20,
                                            borderBottomLeftRadius: 20,
                                        }}
                                    >
                                        Service Fees <br />
                                        <span style={{ fontSize: "0.85rem" }}>
                                            (One time)
                                        </span>
                                    </TableCell>
                                    {pkg.durations.map(
                                        (duration, durationIndex) => (
                                            <TableCell
                                                key={durationIndex}
                                                align="center"
                                                sx={{
                                                    fontWeight: "bold",
                                                    fontFamily: "Madimi One",
                                                    color: "primary.main",
                                                    borderBottom: "none",
                                                }}
                                            >
                                                {duration.service_fees[0]
                                                    ?.fee || "N/A"}{" "}
                                                THB
                                            </TableCell>
                                        )
                                    )}
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Notes and additional information */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    rowGap: 2,
                    my: 2,
                }}
            >
                <Box sx={{ maxWidth: 600 }}>
                    <Typography
                        fontSize={{ xs: 13, sm: 15, md: 16 }}
                        fontFamily={"Livvic"}
                        mb={2}
                    >
                        <img
                            src="/images/pricing/heart.png"
                            alt="heart"
                            style={{ width: 15, marginRight: "5px" }}
                        />{" "}
                        {packages[0].meals_provided}
                    </Typography>
                    <Typography
                        fontSize={{ xs: 13, sm: 15, md: 16 }}
                        fontFamily={"Livvic"}
                    >
                        <img
                            src="/images/pricing/heart.png"
                            alt="heart"
                            style={{ width: 15, marginRight: "5px" }}
                        />{" "}
                        {packages[0].transportation}
                    </Typography>
                </Box>
                <Box sx={{ width: 290 }}>
                    <Box
                        sx={{
                            bgcolor: "#99D4BC",
                            py: 0.5,
                            px: 2,
                            borderRadius: 10,
                            mb: 1,
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 1,
                        }}
                    >
                        <Typography
                            fontFamily="Mali"
                            fontSize={{ xs: 13, sm: 15, md: 16 }}
                        >
                            Duty Time
                        </Typography>
                        <Typography
                            fontFamily="Mali"
                            color="#fff"
                            fontSize={{ xs: 13, sm: 15, md: 16 }}
                            fontWeight={700}
                        >
                            {packages[0].duty_time}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            bgcolor: "#99D4BC",
                            py: 0.5,
                            px: 2,
                            borderRadius: 10,
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 1,
                        }}
                    >
                        <Typography
                            fontFamily="Mali"
                            fontSize={{ xs: 13, sm: 15, md: 16 }}
                        >
                            Working Day
                        </Typography>
                        <Typography
                            fontFamily="Mali"
                            color="#fff"
                            fontSize={{ xs: 13, sm: 15, md: 16 }}
                            fontWeight={700}
                        >
                            {packages[0].working_days}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            {type == "Live-out" && (
                <Box
                    sx={{
                        display: { xs: "none", sm: "none", md: "flex" },
                        position: "absolute",
                        bottom: -110,
                        right: -10,
                    }}
                >
                    <img
                        src="/images/pricing/dotted.png"
                        alt="arrow"
                        style={{
                            width: 80,
                        }}
                    />
                </Box>
            )}
        </Box>
    );

    return (
        <Box>
            {/* Render Live-out Packages */}
            {renderPackageTable(liveOutPackages, "Live-out")}

            {/* Render Live-in Packages */}
            {renderPackageTable(liveInPackages, "Live-in")}
        </Box>
    );
}

export default ServiceTable;
