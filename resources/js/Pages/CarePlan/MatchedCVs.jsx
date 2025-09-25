import React from "react";
import { Box, Typography, Container, Divider } from "@mui/material";
import { Head, router } from "@inertiajs/react";
import CVmini from "@/Components/CV/CVmini";
import MainTitle from "@/Pages/CustomizedCare/components/MainTitle";
import Subtitle from "@/Components/Typo/Subtitle";
import AppLayout from "@/Layouts/AppLayout";

export default function MatchedCVs({
    carePlan,
    matchedCVs,
    similarCVs,
    totalMatched,
    totalSimilar,
    message,
}) {
    const totalResults = totalMatched + totalSimilar;
    const careType = carePlan.care_type === "Baby" ? "Nannies" : "Caregivers";

    const handleSelect = (slug) => {
        router.get(
            route("interview.book.create", {
                slug: slug,
                care_plan: carePlan.uuid, // Add care plan UUID as query parameter
            })
        );
    };
    // Masonry layout component
    const MasonryLayout = ({ children }) => {
        return (
            <>
                {/* Mobile Layout (xs) - Full width centered */}
                <Box
                    sx={{
                        display: { xs: "flex", sm: "none" },
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 3,
                        mt: 4,
                        width: "100%",
                        mx: "auto",
                        px: 2, // Add padding for mobile
                        "& > *": {
                            maxWidth: "400px", // Reasonable max width for mobile
                        },
                    }}
                >
                    {children}
                </Box>

                {/* Desktop Layout (sm+) - Masonry columns */}
                <Box
                    sx={{
                        display: { xs: "none", sm: "block" },
                        columnCount: {
                            sm: 3,
                            md: 4,
                            lg: 4,
                        },
                        columnGap: 3,
                        mt: 4,
                        "& > *": {
                            breakInside: "avoid",
                            pageBreakInside: "avoid",
                            marginBottom: 3,
                            display: "inline-block",
                            width: "90%", // Ensure full width in columns
                        },
                    }}
                >
                    {children}
                </Box>
            </>
        );
    };

    return (
        <AppLayout>
            <Head title="Matching Caregivers" />

            <Container maxWidth="lg" sx={{ pt: 2, pb: 4 }}>
                {/* Perfect Matches Section */}
                {matchedCVs && matchedCVs.length > 0 ? (
                    <Box sx={{ mb: 6 }}>
                        <Box
                            sx={{
                                textAlign: "center",
                                my: 2,
                                position: "relative",
                                maxWidth: 700,
                                margin: "16px auto",
                            }}
                        >
                            <MainTitle>
                                We found {totalMatched} {careType} who perfectly
                                match your needs.
                            </MainTitle>

                            <Subtitle>
                                🎯 Perfect Matches - These{" "}
                                {careType.toLowerCase()} meet most of your
                                preferences
                            </Subtitle>
                            <Subtitle>
                                Please select one CV to proceed interview.
                            </Subtitle>
                        </Box>

                        <MasonryLayout>
                            {matchedCVs.map((cv) => (
                                <CVmini
                                    handleSelect={handleSelect}
                                    key={cv.id}
                                    cv={cv}
                                />
                            ))}
                        </MasonryLayout>
                    </Box>
                ) : null}

                {/* Similar Profiles Section */}
                {similarCVs && similarCVs.length > 0 && (
                    <Box>
                        {matchedCVs && matchedCVs.length > 0 && (
                            <Divider sx={{ my: 4 }} />
                        )}

                        <Box
                            sx={{
                                textAlign: "center",
                                maxWidth: 700,
                                margin: "16px auto",
                            }}
                        >
                            <MainTitle>
                                {matchedCVs.length === 0
                                    ? "We found"
                                    : "We also found"}{" "}
                                {totalSimilar} similar {careType}{" "}
                                {matchedCVs.length === 0
                                    ? "who match your needs."
                                    : "you might like."}
                            </MainTitle>

                            <Subtitle>
                                🔍 Similar Profiles - These{" "}
                                {careType.toLowerCase()} match some of your
                                preferences
                            </Subtitle>
                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                                color="primary.main"
                            >
                                Please select one CV to proceed interview.
                            </Typography>
                        </Box>

                        <MasonryLayout>
                            {similarCVs.map((cv) => (
                                <CVmini
                                    handleSelect={handleSelect}
                                    key={cv.id}
                                    cv={cv}
                                />
                            ))}
                        </MasonryLayout>
                    </Box>
                )}

                {/* No Results */}
                {(!matchedCVs || matchedCVs.length === 0) &&
                    (!similarCVs || similarCVs.length === 0) && (
                        <Box
                            sx={{
                                textAlign: "center",
                                my: 2,
                                position: "relative",
                            }}
                        >
                            <Box display={"inline-block"} position={"relative"}>
                                <MainTitle>
                                    We couldn't find any{" "}
                                    <strong style={{ fontFamily: "Kavoon" }}>
                                        {careType}
                                    </strong>{" "}
                                    matching your specific preferences.
                                </MainTitle>
                            </Box>
                            <Subtitle>
                                Try adjusting your preferences or contact us for
                                personalized assistance
                            </Subtitle>
                        </Box>
                    )}

                {/* Success Message */}
                {message && (
                    <Box sx={{ textAlign: "center", mt: 2 }}>
                        <Typography variant="body1" color="success.main">
                            {message}
                        </Typography>
                    </Box>
                )}
            </Container>
        </AppLayout>
    );
}
