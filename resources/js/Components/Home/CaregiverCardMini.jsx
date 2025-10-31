import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import AgeCalculator from "../util/AgeCalculator";

function CaregiverCardMini({ cv }) {
    // Demo rating data - replace with actual data later
    const demoRating = 5; // Example: 4.5 out of 5 stars

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <StarIcon
                    key={i}
                    sx={{
                        fontSize: "1rem",
                        color: i <= rating ? "#FFD700" : "#E0E0E0", // Gold for filled, gray for empty
                    }}
                />
            );
        }
        return stars;
    };

    // Function to determine service type based on services array
    const getServiceType = (services) => {
        if (!services || !Array.isArray(services)) return "";

        const hasElderCare =
            services.includes("Elder care") ||
            services.includes("Elder + Maid");
        const hasNewbornCare =
            services.includes("Newborn care") ||
            services.includes("Nanny + Maid");

        if (hasElderCare && hasNewbornCare) {
            return "Caregiver / Nanny";
        } else if (hasElderCare) {
            return "Caregiver";
        } else if (hasNewbornCare) {
            return "Nanny";
        } else {
            return "";
        }
    };

    // Function to get flag image path based on nationality
    // const getFlagImage = (nationality) => {
    //     const flagMap = {
    //         Myanmar: "myan.png",
    //         Indian: "india.jpg",
    //         Indonesian: "indo.webp",
    //         Filipino: "phil.webp",
    //         Thailand: "thai.png",
    //         "Sri Lanka": "sri.png",
    //     };

    //     return flagMap[nationality]
    //         ? `/images/flags/${flagMap[nationality]}`
    //         : null;
    // };

    return (
        <Box
            sx={{
                width: { xs: 150, sm: 200 },
                height: { xs: 250, sm: 300 },
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                p: 1,
                position: "relative",
            }}
        >
            {/* Nationality Flag */}
            {/* {getFlagImage(cv?.nationality) && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        width: 32,
                        height: 22,
                        borderRadius: 1,
                        overflow: "hidden",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                        border: "1px solid rgba(255, 255, 255, 0.8)",
                    }}
                >
                    <img
                        src={getFlagImage(cv?.nationality)}
                        alt={`${cv?.nationality} flag`}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </Box>
            )} */}
            {/* Caregiver Photo Section */}
            <Box
                sx={{
                    display: "inline-flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    borderRadius: 2,
                    overflow: "hidden",
                    backgroundColor: "#FFF",
                    boxShadow: "4px 4px 4px 0 rgba(0, 0, 0, 0.25)",
                    flex: 1,
                }}
            >
                <img
                    src={`/storage/${cv?.profile_photo}`}
                    alt="Caretiver photo"
                    style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "white",
                    }}
                />
            </Box>

            {/* Name and Content Section */}
            <Box
                sx={{
                    width: 150,
                    flexShrink: 0,
                    borderRadius: "10px",
                    backgroundColor: "primary.main",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 1,
                    alignSelf: "center",
                    mt: -4,
                    overflow: "hidden",
                }}
            >
                <Typography
                    variant="h6"
                    color="white"
                    textAlign="center"
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "100%",
                        maxWidth: "100%",
                        fontSize: "1rem",
                        fontWeight: 800,
                    }}
                >
                    {cv?.nickname || "Caregiver Name"}
                </Typography>

                {/* Age Section */}
                <Typography
                    color="white"
                    textAlign="center"
                    sx={{
                        fontSize: "0.7rem",
                        display: "-webkit-box", // Required for line clamping
                        WebkitBoxOrient: "vertical", // Required for line clamping
                        overflow: "hidden", // Hide overflowing text
                        WebkitLineClamp: 1, // Limit text to 2 lines
                    }}
                >
                    <AgeCalculator date={cv?.date_of_birth} /> years old
                </Typography>

                {/* Caregiver Services */}
                <Typography
                    variant="body2"
                    fontWeight={600}
                    color="secondary"
                    textAlign="center"
                    sx={{
                        fontSize: "0.8rem",
                        minHeight: "1.2rem", // Ensure consistent height even if empty
                    }}
                >
                    {getServiceType(cv?.services)}
                </Typography>

                <Typography
                    variant="body2"
                    fontWeight={600}
                    color="white"
                    textAlign="center"
                    sx={{
                        fontSize: "0.7rem",
                        minHeight: "1.2rem", // Ensure consistent height even if empty
                    }}
                >
                    12,000 - 16,000 THB
                </Typography>

                {/* Review Stars - coming soon*/}
                {/* <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 0.25,
                    }}
                >
                    {renderStars(demoRating)}
                </Box> */}
            </Box>
        </Box>
    );
}

export default CaregiverCardMini;
