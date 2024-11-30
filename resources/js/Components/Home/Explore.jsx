import { Box, Button, Typography } from "@mui/material";
import React from "react";

function Explore() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
                columnGap: 2,
                rowGap: 10,
                pt: 7,
                pb: 3,
            }}
        >
            {/* Babysitter  */}
            <Box
                sx={{
                    position: "relative",
                    height: 180,
                    width: 220,
                    bgcolor: { xs: "white", sm: "primary.main" },
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    p: 3,
                }}
            >
                <img
                    src="/images/explore/baby_sitter.jpeg"
                    alt="Baby sister"
                    style={{
                        border: "1px solid",
                        borderColor: "#21875C",
                        width: 139,
                        height: 161,
                        objectFit: "cover",
                        position: "absolute",
                        top: -40,
                        left: 40,
                        borderRadius: 26,
                    }}
                />

                <Typography
                    fontSize={24}
                    fontFamily={"Livvic"}
                    color={{ xs: "primary.main", sm: "white" }}
                    textAlign={"center"}
                >
                    Babysitter
                </Typography>

                <Button
                    variant="contained"
                    size="small"
                    sx={{
                        position: "absolute",
                        bottom: -15,
                        left: 75,
                        bgcolor: "white",
                    }}
                >
                    <Typography
                        fontFamily={"Lilita One"}
                        fontSize={"Lilita One"}
                        color="primary"
                    >
                        Explore
                    </Typography>
                </Button>
            </Box>

            {/* Senior Caregiver  */}
            <Box
                sx={{
                    position: "relative",
                    height: 180,
                    width: 220,
                    bgcolor: { xs: "white", sm: "white", md: "primary.main" },
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    p: 3,
                }}
            >
                <img
                    src="/images/explore/senior_caregiver.jpg"
                    alt="Senior Caregiver"
                    style={{
                        border: "1px solid",
                        borderColor: "#21875C",
                        width: 139,
                        height: 161,
                        objectFit: "cover",
                        position: "absolute",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        top: -40,
                        left: 40,
                        borderRadius: 26,
                    }}
                />

                <Typography
                    fontSize={20}
                    fontFamily={"Livvic"}
                    color={{
                        xs: "primary.main",
                        sm: "primary.main",
                        md: "white",
                    }}
                    textAlign={"center"}
                >
                    Senior Caregiver
                </Typography>

                <Button
                    variant="contained"
                    size="small"
                    sx={{
                        position: "absolute",
                        bottom: -15,
                        left: 80,
                        bgcolor: "white",
                    }}
                >
                    <Typography
                        fontFamily={"Lilita One"}
                        fontSize={"Lilita One"}
                        color="primary"
                    >
                        Explore
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
}

export default Explore;
