import { CarePlanContext } from "@/Context/CarePlanContext";
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
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

function StepThreeBC() {
    const { carePlanData, updateNestedField } = useContext(CarePlanContext);

    // Helper function to convert months to display format
    const getYearsFromMonths = (totalMonths) => Math.floor(totalMonths / 12);
    const getMonthsFromTotal = (totalMonths) => totalMonths % 12;

    // Get current values
    const totalMonths = carePlanData.care_recipient_info?.age || 0;
    const years = getYearsFromMonths(totalMonths);
    const months = getMonthsFromTotal(totalMonths);

    const handleAgeChange = (type, value) => {
        const currentYears = type === "years" ? parseInt(value) : years;
        const currentMonths = type === "months" ? parseInt(value) : months;
        const newTotalMonths = currentYears * 12 + currentMonths;

        updateNestedField("care_recipient_info", "age", newTotalMonths);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Baby's Details Section */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ color: "white" }}
                >
                    Baby's Details:
                </Typography>

                {/* Name and Age */}

                <Box>
                    <Typography
                        variant="body2"
                        fontWeight={"bold"}
                        color="white"
                    >
                        Baby Name *
                    </Typography>
                    <TextField
                        fullWidth
                        variant="filled"
                        value={carePlanData.care_recipient_info?.name || ""}
                        onChange={(e) =>
                            updateNestedField(
                                "care_recipient_info",
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
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                    }}
                >
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
                            value={
                                carePlanData.care_recipient_info?.gender || ""
                            }
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

                    {/* Age  */}
                    <Box
                        sx={{
                            width: { xs: "100%", sm: "50%" },
                        }}
                    >
                        <Typography
                            variant="body2"
                            color="white"
                            fontWeight={"bold"}
                            mb={1}
                        >
                            Age: *
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                width: { xs: "100%" },
                                gap: 2,
                            }}
                        >
                            {/* Age - Years */}
                            <Box sx={{ width: "50%" }}>
                                <Typography variant="body2" color="white">
                                    Years
                                </Typography>
                                <FormControl fullWidth variant="filled">
                                    <Select
                                        value={years}
                                        onChange={(e) =>
                                            handleAgeChange(
                                                "years",
                                                e.target.value
                                            )
                                        }
                                        sx={{
                                            backgroundColor:
                                                "rgba(255, 255, 255, 0.1)",
                                            color: "white",
                                            "& .MuiSelect-select": {
                                                color: "white",
                                            },
                                        }}
                                    >
                                        {Array.from({ length: 6 }, (_, i) => (
                                            <MenuItem key={i} value={i}>
                                                {i}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>

                            {/* Age - Months */}
                            <Box sx={{ width: "50%" }}>
                                <Typography variant="body2" color="white">
                                    Months
                                </Typography>
                                <FormControl fullWidth variant="filled">
                                    <Select
                                        value={months}
                                        onChange={(e) =>
                                            handleAgeChange(
                                                "months",
                                                e.target.value
                                            )
                                        }
                                        sx={{
                                            backgroundColor:
                                                "rgba(255, 255, 255, 0.1)",
                                            color: "white",
                                            "& .MuiSelect-select": {
                                                color: "white",
                                            },
                                        }}
                                    >
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <MenuItem key={i} value={i}>
                                                {i}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Weight and Height */}
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Box sx={{ width: "50%" }}>
                        <Typography
                            variant="body2"
                            fontWeight={"bold"}
                            color="white"
                        >
                            Weight (kg) (Optional)
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
                            fontWeight={"bold"}
                            color="white"
                        >
                            Height (cm) (Optional)
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

            {/* Guardian's Details Section */}
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
                    Guardian's Details:
                </Typography>

                {/* Guardian Name */}
                <Box>
                    <Typography
                        variant="body2"
                        fontWeight={"bold"}
                        color="white"
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

                {/* Relation and Phone */}
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
                            fontWeight={"bold"}
                            color="white"
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
                            fontWeight={"bold"}
                            color="white"
                        >
                            Contact Phone Number *
                        </Typography>
                        <TextField
                            fullWidth
                            variant="filled"
                            value={
                                carePlanData.contact_info?.phone_number || ""
                            }
                            onChange={(e) => {
                                updateNestedField(
                                    "contact_info",
                                    "phone_number",
                                    e.target.value
                                );
                                // Also update care_recipient_info for consistency
                                updateNestedField(
                                    "care_recipient_info",
                                    "phone_number",
                                    e.target.value
                                );
                            }}
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

                {/* Guardian Email */}
                <Box>
                    <Typography
                        variant="body2"
                        fontWeight={"bold"}
                        color="white"
                    >
                        Email (Optional)
                    </Typography>
                    <TextField
                        fullWidth
                        variant="filled"
                        value={carePlanData.contact_info?.email || ""}
                        onChange={(e) => {
                            updateNestedField(
                                "contact_info",
                                "email",
                                e.target.value
                            );
                            // Also update care_recipient_info for consistency
                            updateNestedField(
                                "care_recipient_info",
                                "email",
                                e.target.value
                            );
                        }}
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

                {/* Guardian Line ID */}
                <Box>
                    <Typography
                        variant="body2"
                        fontWeight={"bold"}
                        color="white"
                    >
                        Line ID (Optional)
                    </Typography>
                    <TextField
                        fullWidth
                        variant="filled"
                        value={carePlanData.contact_info?.line_id || ""}
                        onChange={(e) => {
                            updateNestedField(
                                "contact_info",
                                "line_id",
                                e.target.value
                            );
                            // Also update care_recipient_info for consistency
                            updateNestedField(
                                "care_recipient_info",
                                "line_id",
                                e.target.value
                            );
                        }}
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

export default StepThreeBC;
