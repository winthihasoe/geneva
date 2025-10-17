import React from "react";
import { Typography, TextField, Grid2, Card, CardContent } from "@mui/material";

const BasicInformation = ({ formData, handleInputChange }) => {
    return (
        <Card sx={{ borderRadius: 2, bgcolor: "transparent" }}>
            <CardContent>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={3}
                    color="primary"
                >
                    Basic Information
                </Typography>
                <Grid2 container spacing={3}>
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label="Date *"
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
                            label="Client's First Name *"
                            value={formData.firstName}
                            onChange={(e) =>
                                handleInputChange("firstName", e.target.value)
                            }
                            required
                        />
                    </Grid2>

                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label="Client's Last Name (Optional)"
                            value={formData.lastName}
                            onChange={(e) =>
                                handleInputChange("lastName", e.target.value)
                            }
                        />
                    </Grid2>

                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label="Age *"
                            value={formData.age}
                            onChange={(e) =>
                                handleInputChange("age", e.target.value)
                            }
                            placeholder="e.g., 75 years, 80"
                            required
                        />
                    </Grid2>

                    <Grid2 size={{ xs: 6, sm: 6, md: 4 }}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label="Weight (kg) (Optional)"
                            type="number"
                            step="0.1"
                            value={formData.weight}
                            onChange={(e) =>
                                handleInputChange("weight", e.target.value)
                            }
                            placeholder="e.g., 4.5"
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 6, sm: 6, md: 4 }}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label="Height (cm) (Optional)"
                            type="number"
                            step="0.1"
                            value={formData.height}
                            onChange={(e) =>
                                handleInputChange("height", e.target.value)
                            }
                            placeholder="e.g., 60.5"
                        />
                    </Grid2>
                </Grid2>
            </CardContent>
        </Card>
    );
};

export default BasicInformation;
