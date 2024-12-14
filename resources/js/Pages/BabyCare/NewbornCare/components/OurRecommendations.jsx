import CVmini from "@/Components/CV/CVmini";
import Subtitle from "@/Components/Typo/Subtitle";
import NoData from "@/Components/util/NoData";
import { CaregiverContext } from "@/Context/CaregiverContext";
import MainTitle from "@/Pages/CustomizedCare/components/MainTitle";
import { Box } from "@mui/material";
import React, { useContext } from "react";

// In this recommendation section, if no filtered caregivers is found, randomly showing caregivers who has this service
function OurRecommendations() {
    const { filteredCaregivers, caregivers } = useContext(CaregiverContext);

    return (
        <Box>
            {filteredCaregivers && filteredCaregivers.length > 0 ? (
                <>
                    <Box
                        sx={{
                            textAlign: "center",
                            my: 2,
                            position: "relative",
                        }}
                    >
                        <Box display={"inline-block"} position={"relative"}>
                            <MainTitle>
                                We found{" "}
                                <strong style={{ fontFamily: "Kavoon" }}>
                                    {filteredCaregivers.length} Nannies
                                </strong>{" "}
                                who perfectly match your needs.
                            </MainTitle>

                            <Box
                                sx={{
                                    display: {
                                        xs: "none",
                                        sm: "flex",
                                        md: "flex",
                                    },
                                }}
                            >
                                <img
                                    src="/images/three_leaves.png"
                                    alt="leaves"
                                    style={{
                                        width: 70,
                                        position: "absolute",
                                        top: -33,
                                        left: -40,
                                    }}
                                />
                            </Box>
                        </Box>
                        <Subtitle>
                            You can choose one of these CV to continue
                        </Subtitle>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            columnGap: 3,
                            rowGap: 4,
                            flexWrap: "wrap",
                            mt: 4,
                        }}
                    >
                        {filteredCaregivers.map((cv) => (
                            <CVmini key={cv.id} cv={cv} />
                        ))}
                    </Box>
                </>
            ) : (
                <>
                    <Box
                        sx={{
                            textAlign: "center",
                            my: 2,
                            position: "relative",
                        }}
                    >
                        <Box display={"inline-block"} position={"relative"}>
                            <MainTitle>
                                We found{" "}
                                <strong style={{ fontFamily: "Kavoon" }}>
                                    {caregivers.length} Nannies
                                </strong>{" "}
                                who perfectly match your needs.
                            </MainTitle>
                            <Box
                                sx={{
                                    display: {
                                        xs: "none",
                                        sm: "flex",
                                        md: "flex",
                                    },
                                }}
                            >
                                <img
                                    src="/images/three_leaves.png"
                                    alt="leaves"
                                    style={{
                                        width: 70,
                                        position: "absolute",
                                        top: -33,
                                        left: -20,
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            columnGap: 3,
                            rowGap: 4,
                            flexWrap: "wrap",
                        }}
                    >
                        {caregivers.map((cv) => (
                            <CVmini key={cv.id} cv={cv} />
                        ))}
                    </Box>
                </>
            )}
        </Box>
    );
}

export default OurRecommendations;
