import { CarePlanContext } from "@/Context/CarePlanContext";
import {
    Box,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";

// Custom styling for white checkboxes and radios
const whiteControlSx = {
    color: "white",
    "&.Mui-checked": {
        color: "white",
    },
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
};

function StepThreeEC() {
    const { carePlanData, updateNestedField } = useContext(CarePlanContext);

    // Helper function to convert months to display format
    const getYearsFromMonths = (totalMonths) => Math.floor(totalMonths / 12);
    const getMonthsFromTotal = (totalMonths) => totalMonths % 12;

    // Get current values
    const totalMonths = carePlanData.care_recipient_info?.age || 0;
    const years = getYearsFromMonths(totalMonths);
    const months = getMonthsFromTotal(totalMonths);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ color: "white" }}
                >
                    Personal Details:
                </Typography>
                <Typography sx={{ fontSize: 11, color: "white" }}>
                    All fields are required
                </Typography>
                <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
                    <Box sx={{ width: "60%" }}>
                        <Typography
                            variant="body2"
                            color="white"
                            fontWeight={"bold"}
                        >
                            Name *
                        </Typography>
                        <TextField
                            value={carePlanData.care_recipient_info?.name || ""}
                            onChange={(e) =>
                                updateNestedField(
                                    "care_recipient_info",
                                    "name",
                                    e.target.value
                                )
                            }
                            fullWidth
                            variant="filled"
                            sx={{
                                "& .MuiFilledInput-root": {
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    color: "white",
                                },
                                "& .MuiFilledInput-input": {
                                    color: "white",
                                },
                            }}
                        />
                    </Box>
                    <Box sx={{ width: "30%" }}>
                        <Typography
                            variant="body2"
                            color="white"
                            fontWeight={"bold"}
                        >
                            Age (years) *
                        </Typography>
                        <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            inputProps={{ min: 15, max: 50 }}
                            value={carePlanData.care_recipient_info?.age || ""}
                            onChange={(e) =>
                                updateNestedField(
                                    "care_recipient_info",
                                    "age",
                                    parseInt(e.target.value) || ""
                                )
                            }
                            sx={{
                                "& .MuiFilledInput-root": {
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    color: "white",
                                },
                                "& .MuiFilledInput-input": {
                                    color: "white",
                                },
                            }}
                        />
                    </Box>
                </Box>

                {/* Gender */}
                <FormControl
                    component="fieldset"
                    sx={{
                        color: "white",
                    }}
                >
                    <Typography variant="body2" fontWeight={"bold"}>
                        Gender: *
                    </Typography>

                    <RadioGroup
                        row
                        value={carePlanData.care_recipient_info?.gender || ""}
                        onChange={(e) =>
                            updateNestedField(
                                "care_recipient_info",
                                "gender",
                                e.target.value
                            )
                        }
                    >
                        <FormControlLabel
                            value="Male"
                            control={<Radio sx={whiteControlSx} />}
                            label="Male"
                        />
                        <FormControlLabel
                            value="Female"
                            control={<Radio sx={whiteControlSx} />}
                            label="Female"
                        />
                    </RadioGroup>
                </FormControl>

                {/* Weight and Height */}
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Box sx={{ width: "50%" }}>
                        <Typography
                            variant="body2"
                            color="white"
                            fontWeight={"bold"}
                        >
                            Weight (kg) *
                        </Typography>
                        <TextField
                            variant="filled"
                            fullWidth
                            value={
                                carePlanData.care_recipient_info?.weight || ""
                            }
                            onChange={(e) =>
                                updateNestedField(
                                    "care_recipient_info",
                                    "weight",
                                    e.target.value
                                )
                            }
                            sx={{
                                "& .MuiFilledInput-root": {
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    color: "white",
                                },
                                "& .MuiFilledInput-input": {
                                    color: "white",
                                },
                            }}
                        />
                    </Box>
                    <Box sx={{ width: "50%" }}>
                        <Typography
                            variant="body2"
                            color="white"
                            fontWeight={"bold"}
                        >
                            Height (cm) *
                        </Typography>
                        <TextField
                            variant="filled"
                            fullWidth
                            value={
                                carePlanData.care_recipient_info?.height || ""
                            }
                            onChange={(e) =>
                                updateNestedField(
                                    "care_recipient_info",
                                    "height",
                                    e.target.value
                                )
                            }
                            sx={{
                                "& .MuiFilledInput-root": {
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    color: "white",
                                },
                                "& .MuiFilledInput-input": {
                                    color: "white",
                                },
                            }}
                        />
                    </Box>
                </Box>

                {/* Phone, Email, Line ID */}
                <Box>
                    <Typography
                        variant="body2"
                        color="white"
                        fontWeight={"bold"}
                    >
                        Phone Number *
                    </Typography>
                    <TextField
                        fullWidth
                        variant="filled"
                        value={
                            carePlanData.care_recipient_info?.phone_number || ""
                        }
                        onChange={(e) =>
                            updateNestedField(
                                "care_recipient_info",
                                "phone_number",
                                e.target.value
                            )
                        }
                        sx={{
                            "& .MuiFilledInput-root": {
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                color: "white",
                            },
                            "& .MuiFilledInput-input": {
                                color: "white",
                            },
                        }}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="body2"
                        color="white"
                        fontWeight={"bold"}
                    >
                        Email (Optional)
                    </Typography>
                    <TextField
                        fullWidth
                        variant="filled"
                        value={carePlanData.care_recipient_info?.email || ""}
                        onChange={(e) =>
                            updateNestedField(
                                "care_recipient_info",
                                "email",
                                e.target.value
                            )
                        }
                        sx={{
                            "& .MuiFilledInput-root": {
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                color: "white",
                            },
                            "& .MuiFilledInput-input": {
                                color: "white",
                            },
                        }}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="body2"
                        color="white"
                        fontWeight={"bold"}
                    >
                        Line ID (Optional)
                    </Typography>
                    <TextField
                        fullWidth
                        variant="filled"
                        value={carePlanData.care_recipient_info?.line_id || ""}
                        onChange={(e) =>
                            updateNestedField(
                                "care_recipient_info",
                                "line_id",
                                e.target.value
                            )
                        }
                        sx={{
                            "& .MuiFilledInput-root": {
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                color: "white",
                            },
                            "& .MuiFilledInput-input": {
                                color: "white",
                            },
                        }}
                    />
                </Box>

                {/* Address */}
                <Box>
                    <Typography
                        variant="body1"
                        fontWeight={"bold"}
                        color="white"
                    >
                        Address (where caregiver will be assigned) *
                    </Typography>
                    <TextField
                        fullWidth
                        variant="filled"
                        multiline
                        rows={3}
                        value={
                            carePlanData.care_recipient_info?.home_address || ""
                        }
                        onChange={(e) =>
                            updateNestedField(
                                "care_recipient_info",
                                "home_address",
                                e.target.value
                            )
                        }
                        sx={{
                            "& .MuiFilledInput-root": {
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                color: "white",
                            },
                            "& .MuiFilledInput-input": {
                                color: "white",
                            },
                        }}
                    />
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    borderWidth: 2,
                    borderColor: "secondary.main",
                    borderStyle: "solid",
                    borderRadius: 3,
                    p: 2,
                }}
            >
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ color: "white" }}
                >
                    Primary Contact's Details:
                </Typography>
                <Box>
                    <Typography
                        variant="body2"
                        color="white"
                        fontWeight={"bold"}
                    >
                        Name *
                    </Typography>
                    <TextField
                        fullWidth
                        variant="filled"
                        value={carePlanData.contact_info?.name || ""}
                        onChange={(e) =>
                            updateNestedField(
                                "contact_info",
                                "name",
                                e.target.value
                            )
                        }
                        sx={{
                            "& .MuiFilledInput-root": {
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                color: "white",
                            },
                            "& .MuiFilledInput-input": {
                                color: "white",
                            },
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        gap: 2,
                    }}
                >
                    <Box sx={{ width: "40%" }}>
                        <Typography
                            variant="body2"
                            color="white"
                            fontWeight={"bold"}
                        >
                            Relation *
                        </Typography>
                        <TextField
                            fullWidth
                            variant="filled"
                            value={
                                carePlanData.contact_info?.relationship || ""
                            }
                            onChange={(e) =>
                                updateNestedField(
                                    "contact_info",
                                    "relationship",
                                    e.target.value
                                )
                            }
                            sx={{
                                "& .MuiFilledInput-root": {
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    color: "white",
                                },
                                "& .MuiFilledInput-input": {
                                    color: "white",
                                },
                            }}
                        />
                    </Box>
                    <Box sx={{ width: "60%" }}>
                        <Typography
                            variant="body2"
                            color="white"
                            fontWeight={"bold"}
                        >
                            Contact Phone Number *
                        </Typography>
                        <TextField
                            fullWidth
                            variant="filled"
                            value={
                                carePlanData.contact_info?.phone_number || ""
                            }
                            onChange={(e) =>
                                updateNestedField(
                                    "contact_info",
                                    "phone_number",
                                    e.target.value
                                )
                            }
                            sx={{
                                "& .MuiFilledInput-root": {
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    color: "white",
                                },
                                "& .MuiFilledInput-input": {
                                    color: "white",
                                },
                            }}
                        />
                    </Box>
                </Box>
                {/* Email (optional) */}
                <Box>
                    <Typography
                        variant="body2"
                        color="white"
                        fontWeight={"bold"}
                    >
                        Email (optional)
                    </Typography>
                    <TextField
                        fullWidth
                        variant="filled"
                        value={carePlanData.contact_info?.email || ""}
                        onChange={(e) =>
                            updateNestedField(
                                "contact_info",
                                "email",
                                e.target.value
                            )
                        }
                        sx={{
                            "& .MuiFilledInput-root": {
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                color: "white",
                            },
                            "& .MuiFilledInput-input": {
                                color: "white",
                            },
                        }}
                    />
                </Box>
                {/* Line ID (optional) */}
                <Box>
                    <Typography
                        variant="body2"
                        color="white"
                        fontWeight={"bold"}
                    >
                        Line ID (optional)
                    </Typography>
                    <TextField
                        fullWidth
                        variant="filled"
                        value={carePlanData.contact_info?.line_id || ""}
                        onChange={(e) =>
                            updateNestedField(
                                "contact_info",
                                "line_id",
                                e.target.value
                            )
                        }
                        sx={{
                            "& .MuiFilledInput-root": {
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                color: "white",
                            },
                            "& .MuiFilledInput-input": {
                                color: "white",
                            },
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default StepThreeEC;
