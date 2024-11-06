import {
    Box,
    FormControlLabel,
    Grid2,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";

function BabyInfo() {
    const [medicalCondition, setMedicalCondition] = useState(false);
    const [conditionDetails, setConditionDetails] = useState("");
    const handleMedicalCondition = (event) => {
        const value = event.target.value === "true"; // Convert to boolean
        setMedicalCondition(value);

        // Clear the details text field if 'No' is selected
        if (!value) {
            setConditionDetails("");
        }
    };
    return (
        <Grid2
            container
            py={{ xs: 1, sm: 2, md: 3 }}
            rowGap={3}
            alignItems={"flex-start"}
        >
            <Grid2
                size={{ xs: 12, sm: 6 }}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        minWidth: 300,
                        maxWidth: 450,
                        borderRadius: 10,
                        backgroundColor: "#2c7a57", // Adjust the color as needed
                        position: "relative",
                        padding: 3,
                        boxShadow: 10,
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: "Karma",
                            color: "#fff",
                            fontSize: 20,
                        }}
                    >
                        Baby's Information
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Karma",
                            color: "#fff",
                            fontSize: 13,
                        }}
                    >
                        Full Name
                    </Typography>
                    <TextField
                        sx={{
                            bgcolor: "#f5f5f5",
                            borderRadius: 20,
                            px: 1,
                            width: 180,
                        }}
                    />
                    <Box sx={{ display: "flex", gap: 3, my: 1 }}>
                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: "Karma",
                                    color: "#fff",
                                    fontSize: 13,
                                }}
                            >
                                Date of Birth
                            </Typography>
                            <TextField
                                sx={{
                                    bgcolor: "#f5f5f5",
                                    borderRadius: 20,
                                    px: 1,
                                    width: 200,
                                }}
                                type="date"
                            />
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: "Karma",
                                    color: "#fff",
                                    fontSize: 13,
                                }}
                            >
                                Age
                            </Typography>
                            <TextField
                                sx={{
                                    bgcolor: "#f5f5f5",
                                    borderRadius: 20,
                                    px: 1,
                                }}
                            />
                        </Box>
                    </Box>

                    <Typography
                        sx={{
                            fontFamily: "Karma",
                            color: "#fff",
                            fontSize: 13,
                        }}
                    >
                        Gender
                    </Typography>
                    <RadioGroup row>
                        <FormControlLabel
                            value="Male"
                            control={<Radio size="small" />}
                            label={
                                <Typography
                                    sx={{
                                        fontFamily: "Karma",
                                        color: "#fff",
                                        fontSize: 13,
                                    }}
                                >
                                    Male
                                </Typography>
                            }
                        />
                        <FormControlLabel
                            value="Female"
                            control={<Radio size="small" />}
                            label={
                                <Typography
                                    sx={{
                                        fontFamily: "Karma",
                                        color: "#fff",
                                        fontSize: 13,
                                    }}
                                >
                                    Female
                                </Typography>
                            }
                        />
                    </RadioGroup>
                    <Box>
                        <Typography
                            sx={{
                                fontFamily: "Karma",
                                color: "#fff",
                                fontSize: 13,
                            }}
                        >
                            Known Allergies
                        </Typography>
                        <TextField multiline />
                    </Box>
                    <Box mt={2}>
                        <Typography
                            sx={{
                                fontFamily: "Karma",
                                color: "#fff",
                                fontSize: 13,
                            }}
                        >
                            Medical Conditions
                        </Typography>
                        <RadioGroup row onChange={handleMedicalCondition}>
                            <FormControlLabel
                                value={false}
                                control={<Radio size="small" />}
                                label={
                                    <Typography
                                        sx={{
                                            fontFamily: "Karma",
                                            color: "#fff",
                                            fontSize: 13,
                                        }}
                                    >
                                        No
                                    </Typography>
                                }
                            />
                            <FormControlLabel
                                value={true}
                                control={<Radio size="small" />}
                                label={
                                    <Typography
                                        sx={{
                                            fontFamily: "Karma",
                                            color: "#fff",
                                            fontSize: 13,
                                        }}
                                    >
                                        Yes
                                    </Typography>
                                }
                            />
                        </RadioGroup>
                        {/* Conditionally render the details text field if medicalCondition is true */}
                        {medicalCondition && (
                            <TextField
                                label="Please describe the condition"
                                multiline
                                size="small"
                                fullWidth
                                value={conditionDetails}
                                onChange={(e) =>
                                    setConditionDetails(e.target.value)
                                }
                            />
                        )}
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: { xs: "none", sm: "none", md: "flex" },
                    }}
                >
                    <img
                        src="/images/noodle.png"
                        alt="leaves"
                        style={{
                            width: 200,
                            position: "absolute",
                            bottom: 0,
                            left: -80,
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        display: { xs: "none", sm: "none", md: "flex" },
                    }}
                >
                    <img
                        src="/images/three_leaves.png"
                        alt="leaves"
                        style={{
                            width: 120,
                            position: "absolute",
                            bottom: 130,
                            left: -50,
                        }}
                    />
                </Box>
            </Grid2>
            <Grid2
                size={{ xs: 12, sm: 6 }}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        minWidth: 300,
                        maxWidth: 450,
                        borderRadius: 10,
                        backgroundColor: "#2c7a57", // Adjust the color as needed
                        position: "relative",
                        padding: 3,
                        boxShadow: 10,
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: "Karma",
                            color: "#fff",
                            fontSize: 20,
                        }}
                    >
                        Parent/Guardian info
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Karma",
                            color: "#fff",
                            fontSize: 13,
                        }}
                    >
                        Full Name
                    </Typography>
                    <TextField
                        sx={{
                            bgcolor: "#f5f5f5",
                            borderRadius: 20,
                            px: 1,
                            width: 180,
                        }}
                    />
                    <Box sx={{ display: "flex", gap: 3, my: 1 }}>
                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: "Karma",
                                    color: "#fff",
                                    fontSize: 13,
                                }}
                            >
                                Relationship to baby
                            </Typography>
                            <TextField
                                sx={{
                                    bgcolor: "#f5f5f5",
                                    borderRadius: 20,
                                    px: 1,
                                }}
                            />
                        </Box>
                    </Box>
                    <Typography
                        sx={{
                            fontFamily: "Karma",
                            color: "#fff",
                            fontSize: 13,
                            my: 2,
                        }}
                    >
                        Contact information
                    </Typography>
                    <Box sx={{ display: "flex", gap: 3, my: 1 }}>
                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: "Karma",
                                    color: "#fff",
                                    fontSize: 13,
                                }}
                            >
                                Phone no.
                            </Typography>
                            <TextField
                                sx={{
                                    bgcolor: "#f5f5f5",
                                    borderRadius: 20,
                                    px: 1,
                                }}
                            />
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: "Karma",
                                    color: "#fff",
                                    fontSize: 13,
                                }}
                            >
                                OTP
                            </Typography>
                            <TextField
                                sx={{
                                    bgcolor: "#f5f5f5",
                                    borderRadius: 20,
                                    px: 1,
                                }}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, my: 1 }}>
                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: "Karma",
                                    color: "#fff",
                                    fontSize: 13,
                                }}
                            >
                                Email Address
                            </Typography>
                            <TextField
                                sx={{
                                    bgcolor: "#f5f5f5",
                                    borderRadius: 20,
                                    px: 1,
                                }}
                            />
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: "Karma",
                                    color: "#fff",
                                    fontSize: 13,
                                }}
                            >
                                Line Id
                            </Typography>
                            <TextField
                                sx={{
                                    bgcolor: "#f5f5f5",
                                    borderRadius: 20,
                                    px: 1,
                                }}
                            />
                        </Box>
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                fontFamily: "Karma",
                                color: "#fff",
                                fontSize: 13,
                            }}
                        >
                            Home Address <br />
                            <span style={{ color: "#000" }}>
                                (where care will be taken)
                            </span>
                        </Typography>
                        <TextField
                            sx={{
                                bgcolor: "#f5f5f5",
                                borderRadius: 20,
                                px: 1,
                            }}
                            fullWidth
                            multiline
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: { xs: "none", sm: "none", md: "flex" },
                    }}
                >
                    <img
                        src="/images/noodle.png"
                        alt="leaves"
                        style={{
                            width: 200,
                            position: "absolute",
                            bottom: 0,
                            right: -80,
                        }}
                    />
                </Box>
            </Grid2>
        </Grid2>
    );
}

export default BabyInfo;
