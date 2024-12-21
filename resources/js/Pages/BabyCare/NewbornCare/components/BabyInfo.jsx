import Noodle from "@/Components/Fancy/Noodle";
import ThreeLeaves from "@/Components/Fancy/ThreeLeaves";
import { CarePlanContext } from "@/Context/CarePlanContext";
import {
    Box,
    FormControlLabel,
    Grid2,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

// Function to calculate age as a human-readable string
const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    // Calculate the difference in days
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInDays = Math.floor((today - birthDate) / oneDay);

    if (diffInDays < 30) {
        // Less than 30 days, return days
        return `${diffInDays} day${diffInDays > 1 ? "s" : ""} old`;
    } else if (diffInDays < 365) {
        // Between 30 days and 1 year, return months and days
        const months = Math.floor(diffInDays / 30);
        const days = diffInDays % 30;
        return `${months} month${months > 1 ? "s" : ""}${
            days > 0 ? `, ${days} day${days > 1 ? "s" : ""}` : ""
        } old`;
    } else {
        // 1 year or more, return years, months, and days
        const years = Math.floor(diffInDays / 365);
        const remainingDays = diffInDays % 365;
        const months = Math.floor(remainingDays / 30);
        const days = remainingDays % 30;
        return `${years} year${years > 1 ? "s" : ""}${
            months > 0 ? `, ${months} month${months > 1 ? "s" : ""}` : ""
        }${days > 0 ? `, ${days} day${days > 1 ? "s" : ""}` : ""} old`;
    }
};

function BabyInfo() {
    const { carePlanData, updateNestedField } = useContext(CarePlanContext);
    const [medicalCondition, setMedicalCondition] = useState("No");
    const handleMedicalCondition = (event) => {
        const value = event.target.value; // Convert to boolean
        setMedicalCondition(event.target.value);

        // Clear the details text field if 'No' is selected
        if (value == "No") {
            updateNestedField(
                "care_recipient_info",
                "baby_medical_condition",
                ""
            );
        }
    };

    const handleAllergy = (event) => {
        const value = event.target.value; // Convert to boolean
        setIsAllergy(event.target.value);

        // Clear the details text field if 'No' is selected
        if (value == "No") {
            updateNestedField("care_recipient_info", "allergies", "");
        }
    };

    useEffect(() => {
        const dob = carePlanData.care_recipient_info.date_of_birth;
        if (dob) {
            const age = calculateAge(dob);
            updateNestedField("care_recipient_info", "age", age);
        }
    }, [carePlanData.care_recipient_info.date_of_birth]);

    const [isAllergy, setIsAllergy] = useState("No");

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
                        maxWidth: 500,
                        position: "relative",
                        padding: 3,
                        backgroundImage: "url(/images/babyCare/bg_child.png)",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100% 100%",
                        p: 5,
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
                        Name
                    </Typography>
                    <TextField
                        sx={{
                            bgcolor: "#f5f5f5",
                            borderRadius: 20,
                            px: 1,
                            width: 220,
                        }}
                        value={carePlanData.care_recipient_info.name}
                        onChange={(e) =>
                            updateNestedField(
                                "care_recipient_info",
                                "name",
                                e.target.value
                            )
                        }
                        size="small"
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
                                    width: 160,
                                }}
                                type="date"
                                value={
                                    carePlanData.care_recipient_info
                                        .date_of_birth
                                }
                                onChange={(e) =>
                                    updateNestedField(
                                        "care_recipient_info",
                                        "date_of_birth",
                                        e.target.value
                                    )
                                }
                                InputProps={{
                                    inputProps: {
                                        max: new Date()
                                            .toISOString()
                                            .split("T")[0], // Today's date in YYYY-MM-DD format
                                    },
                                }}
                                size="small"
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
                                disabled
                                value={carePlanData.care_recipient_info.age}
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
                    <RadioGroup
                        row
                        value={carePlanData.care_recipient_info.gender}
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
                            control={
                                <Radio
                                    size="small"
                                    sx={{
                                        color: "#fff",
                                        "&.Mui-checked": {
                                            color: "#fff",
                                        },
                                    }}
                                />
                            }
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
                            control={
                                <Radio
                                    size="small"
                                    sx={{
                                        color: "#fff",
                                        "&.Mui-checked": {
                                            color: "#fff",
                                        },
                                    }}
                                />
                            }
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
                        <RadioGroup
                            row
                            value={isAllergy}
                            onChange={handleAllergy}
                        >
                            <FormControlLabel
                                value="No"
                                control={
                                    <Radio
                                        size="small"
                                        sx={{
                                            color: "#fff",
                                            "&.Mui-checked": {
                                                color: "#fff",
                                            },
                                        }}
                                    />
                                }
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
                                value="Yes"
                                control={
                                    <Radio
                                        size="small"
                                        sx={{
                                            color: "#fff", // Unselected color
                                            "&.Mui-checked": {
                                                color: "#FFD700", // Selected color (gold)
                                            },
                                        }}
                                    />
                                }
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
                        {isAllergy == "Yes" && (
                            <TextField
                                value={
                                    carePlanData.care_recipient_info
                                        .allergies || ""
                                }
                                onChange={(e) =>
                                    updateNestedField(
                                        "care_recipient_info",
                                        "allergies",
                                        e.target.value
                                    )
                                }
                            />
                        )}
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
                        <RadioGroup
                            row
                            value={medicalCondition}
                            onChange={handleMedicalCondition}
                        >
                            <FormControlLabel
                                value="No"
                                control={
                                    <Radio
                                        size="small"
                                        sx={{
                                            color: "#fff", // Unselected color
                                            "&.Mui-checked": {
                                                color: "#FFF", // Selected color (gold)
                                            },
                                        }}
                                    />
                                }
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
                                value="Yes"
                                control={
                                    <Radio
                                        size="small"
                                        sx={{
                                            color: "#fff", // Unselected color
                                            "&.Mui-checked": {
                                                color: "#FFD700", // Selected color (gold)
                                            },
                                        }}
                                    />
                                }
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
                        {medicalCondition == "Yes" && (
                            <TextField
                                label="Please describe the condition"
                                multiline
                                size="small"
                                fullWidth
                                value={
                                    carePlanData.care_recipient_info
                                        .baby_medical_condition || ""
                                }
                                onChange={(e) =>
                                    updateNestedField(
                                        "care_recipient_info",
                                        "baby_medical_condition",
                                        e.target.value
                                    )
                                }
                            />
                        )}
                    </Box>
                </Box>

                <Noodle bottom={0} left={0} />
                <ThreeLeaves bottom={90} left={-45} />
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
                        maxWidth: 500,
                        position: "relative",
                        padding: 3,
                        backgroundImage: "url(/images/babyCare/bg_parent.png)",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100% 100%",
                        p: 5,
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
                        Name
                    </Typography>
                    <TextField
                        sx={{
                            bgcolor: "#f5f5f5",
                            borderRadius: 20,
                            px: 1,
                            width: 250,
                        }}
                        value={carePlanData.contact_info.name}
                        onChange={(e) =>
                            updateNestedField(
                                "contact_info",
                                "name",
                                e.target.value
                            )
                        }
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
                                value={carePlanData.contact_info.relationship}
                                onChange={(e) =>
                                    updateNestedField(
                                        "contact_info",
                                        "relationship",
                                        e.target.value
                                    )
                                }
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
                                value={carePlanData.contact_info.phone_number}
                                onChange={(e) =>
                                    updateNestedField(
                                        "contact_info",
                                        "phone_number",
                                        e.target.value
                                    )
                                }
                            />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                            my: 1,
                        }}
                    >
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
                                    width: 200,
                                }}
                                value={carePlanData.contact_info.email}
                                // onChange={(e) =>
                                //     updateNestedField(
                                //         "contact_info",
                                //         "email",
                                //         e.target.value
                                //     )
                                // }
                                disabled
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
                                value={carePlanData.contact_info.line_id}
                                onChange={(e) =>
                                    updateNestedField(
                                        "contact_info",
                                        "line_id",
                                        e.target.value
                                    )
                                }
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
                            value={
                                carePlanData.care_recipient_info.home_address
                            }
                            onChange={(e) =>
                                updateNestedField(
                                    "care_recipient_info",
                                    "home_address",
                                    e.target.value
                                )
                            }
                        />
                    </Box>
                </Box>

                <Noodle top={0} right={0} />
            </Grid2>
        </Grid2>
    );
}

export default BabyInfo;
