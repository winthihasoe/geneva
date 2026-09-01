import React from "react";
import { Typography, TextField, Grid2, Card, CardContent } from "@mui/material";
import {
    handleNonNegativeNumberChange,
    nonNegativeNumberFieldProps,
} from "@/utils/nonNegativeNumberField";

const demographicFieldProps = (lockPatientDemographics) =>
    lockPatientDemographics
        ? {
              InputProps: { readOnly: true },
              sx: { "& .MuiInputBase-input": { cursor: "default" } },
          }
        : {};

const BasicInformation = ({
    strings,
    formData,
    handleInputChange,
    lockPatientDemographics = false,
}) => {
    const d = demographicFieldProps(lockPatientDemographics);
    const b = strings.basic;

    return (
        <Card sx={{ borderRadius: 2, bgcolor: "transparent" }}>
            <CardContent>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={3}
                    color="primary"
                >
                    {b.sectionTitle}
                </Typography>
                <Grid2 container spacing={3}>
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label={b.date}
                            type="date"
                            value={formData.date}
                            onChange={(e) =>
                                handleInputChange("date", e.target.value)
                            }
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                    </Grid2>

                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label={b.firstName}
                            value={formData.firstName}
                            onChange={(e) =>
                                handleInputChange("firstName", e.target.value)
                            }
                            required
                            {...d}
                        />
                    </Grid2>

                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label={b.lastName}
                            value={formData.lastName}
                            onChange={(e) =>
                                handleInputChange("lastName", e.target.value)
                            }
                            {...d}
                        />
                    </Grid2>

                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label={b.age}
                            value={formData.age}
                            onChange={(e) =>
                                handleInputChange("age", e.target.value)
                            }
                            placeholder={b.agePlaceholder}
                            required
                            {...d}
                        />
                    </Grid2>

                    <Grid2 size={{ xs: 6, sm: 6, md: 4 }}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label={b.weight}
                            {...nonNegativeNumberFieldProps({ step: "0.1" })}
                            value={formData.weight}
                            onChange={handleNonNegativeNumberChange((value) =>
                                handleInputChange("weight", value)
                            )}
                            placeholder={b.weightPlaceholder}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 6, sm: 6, md: 4 }}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label={b.height}
                            {...nonNegativeNumberFieldProps({ step: "0.1" })}
                            value={formData.height}
                            onChange={handleNonNegativeNumberChange((value) =>
                                handleInputChange("height", value)
                            )}
                            placeholder={b.heightPlaceholder}
                        />
                    </Grid2>
                </Grid2>
            </CardContent>
        </Card>
    );
};

export default BasicInformation;
