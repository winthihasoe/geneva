import ElderCareWalking from "@/Components/Fancy/ElderCareWalking";
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
import React, { useContext } from "react";

const Label = ({ children }) => {
    return (
        <Typography
            sx={{
                fontFamily: "Madimi One",
                color: "primary.main",
                fontSize: { xs: 15, sm: 17, md: 20 },
            }}
        >
            {children}
        </Typography>
    );
};

function BasicInfo() {
    const { carePlanData, updateNestedField } = useContext(CarePlanContext);
    return (
        <Box position={"relative"}>
            <Typography
                sx={{
                    fontFamily: "Kavoon",
                    textAlign: "center",
                    color: "primary.main",
                    fontWeight: 400,
                    fontSize: { xs: 20, sm: 25 },
                }}
            >
                Personal Information of the patient
            </Typography>
            <Grid2
                container
                sx={{
                    my: 3,
                }}
                rowGap={3}
            >
                <Grid2
                    size={{ xs: 12, sm: 6 }}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 3,
                        }}
                    >
                        <Label>Full Name</Label>
                        <TextField
                            sx={{
                                bgcolor: "#f5f5f5",
                                borderRadius: 20,
                                px: 2,
                                width: 220,
                                border: "1px solid",
                                borderColor: "primary.main",
                            }}
                            value={carePlanData.care_recipient_info.name}
                            onChange={(e) =>
                                updateNestedField(
                                    "care_recipient_info",
                                    "name",
                                    e.target.value
                                )
                            }
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 3,
                        }}
                    >
                        <Label>Date of birth</Label>
                        <TextField
                            sx={{
                                bgcolor: "#f5f5f5",
                                borderRadius: 20,
                                px: 1,
                                width: 200,
                                border: "1px solid",
                                borderColor: "primary.main",
                            }}
                            value={
                                carePlanData.care_recipient_info.date_of_birth
                            }
                            onChange={(e) =>
                                updateNestedField(
                                    "care_recipient_info",
                                    "date_of_birth",
                                    e.target.value
                                )
                            }
                            type="date"
                        />
                    </Box>
                </Grid2>
                <Grid2
                    size={{ xs: 12, sm: 6 }}
                    sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                >
                    <Box
                        sx={{
                            display: "flex",

                            gap: 3,
                        }}
                    >
                        <Label>Weight</Label>
                        <TextField
                            sx={{
                                bgcolor: "#f5f5f5",
                                borderRadius: 20,
                                width: 150,
                                px: 1,
                                border: "1px solid",
                                borderColor: "primary.main",
                            }}
                            value={carePlanData.care_recipient_info.weight}
                            onChange={(e) =>
                                updateNestedField(
                                    "care_recipient_info",
                                    "weight",
                                    e.target.value
                                )
                            }
                            type="number"
                            InputProps={{
                                endAdornment: <Typography>kg</Typography>,
                            }}
                            inputProps={{
                                min: 0,
                            }}
                        />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3 }}>
                        <Label>Height</Label>
                        <TextField
                            sx={{
                                bgcolor: "#f5f5f5",
                                borderRadius: 20,
                                width: 150,
                                px: 1,
                                border: "1px solid",
                                borderColor: "primary.main",
                            }}
                            value={carePlanData.care_recipient_info.height}
                            onChange={(e) =>
                                updateNestedField(
                                    "care_recipient_info",
                                    "height",
                                    e.target.value
                                )
                            }
                            InputProps={{
                                endAdornment: <Typography>cm</Typography>,
                            }}
                            inputProps={{ min: 0 }}
                        />
                    </Box>
                </Grid2>
            </Grid2>

            <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap", my: 3 }}>
                <Label>Gender</Label>
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
                        control={<Radio size="small" />}
                        label={<Label>M</Label>}
                    />
                    <FormControlLabel
                        value="Female"
                        control={<Radio size="small" />}
                        label={<Label>F</Label>}
                    />
                </RadioGroup>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    columnGap: 5,
                    rowGap: 2,
                    flexWrap: "wrap",
                    my: 3,
                }}
            >
                <Label>
                    Home Address
                    <br />
                    <span style={{ fontSize: 13 }}>
                        (Where care will be taken)
                    </span>
                </Label>
                <TextField
                    sx={{
                        bgcolor: "#f5f5f5",
                        borderRadius: 10,
                        px: 1,
                        border: "1px solid",
                        borderColor: "primary.main",
                        width: 300,
                    }}
                    fullWidth
                    multiline
                    value={carePlanData.care_recipient_info.home_address}
                    onChange={(e) =>
                        updateNestedField(
                            "care_recipient_info",
                            "home_address",
                            e.target.value
                        )
                    }
                />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    columnGap: 5,
                    rowGap: 2,
                    flexWrap: "wrap",
                    my: 3,
                }}
            >
                <Label>Phone No.</Label>
                <TextField
                    sx={{
                        bgcolor: "#f5f5f5",
                        borderRadius: 10,
                        px: 1,
                        border: "1px solid",
                        borderColor: "primary.main",
                        width: 250,
                    }}
                    fullWidth
                    value={carePlanData.care_recipient_info.phone_number}
                    onChange={(e) =>
                        updateNestedField(
                            "care_recipient_info",
                            "phone_number",
                            e.target.value
                        )
                    }
                />
            </Box>
            <ElderCareWalking bottom={-60} right={150} />
        </Box>
    );
}

export default BasicInfo;
