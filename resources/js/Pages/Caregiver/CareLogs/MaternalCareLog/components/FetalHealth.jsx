import React from "react";
import {
    Box,
    Typography,
    Grid2 as Grid,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    Paper,
    Alert,
    InputAdornment,
} from "@mui/material";
import {
    FavoriteBorder as HeartIcon,
    Notes as NotesIcon,
} from "@mui/icons-material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import AirlineSeatLegroomReducedRoundedIcon from "@mui/icons-material/AirlineSeatLegroomReducedRounded";

function FetalHealth({ strings, formData, setFormData }) {
    const handleFetalMovementChange = (event) => {
        const value = event.target.value === "true";
        setFormData((prev) => ({
            ...prev,
            fetalHealth: {
                ...prev.fetalHealth,
                fetalMovementDetected: value,
                // Reset kick count if no movement detected
                kickCount: value ? prev.fetalHealth?.kickCount || "" : "",
            },
        }));
    };

    const handleKickCountChange = (event) => {
        const value = event.target.value;
        // Only allow positive integers
        if (value === "" || (/^\d+$/.test(value) && parseInt(value) >= 0)) {
            setFormData((prev) => ({
                ...prev,
                fetalHealth: {
                    ...prev.fetalHealth,
                    kickCount: value,
                },
            }));
        }
    };

    const handleFetalHeartSoundChange = (event) => {
        const value = event.target.value;
        // Only allow positive integers for BPM
        if (
            value === "" ||
            (/^\d+$/.test(value) &&
                parseInt(value) >= 0 &&
                parseInt(value) <= 200)
        ) {
            setFormData((prev) => ({
                ...prev,
                fetalHealth: {
                    ...prev.fetalHealth,
                    fetalHeartSound: value,
                },
            }));
        }
    };

    const handleNotesChange = (event) => {
        setFormData((prev) => ({
            ...prev,
            fetalHealth: {
                ...prev.fetalHealth,
                notes: event.target.value,
            },
        }));
    };

    const fetalHealth = formData.fetalHealth || {};

    return (
        <Paper
            elevation={2}
            sx={{
                p: 2,
                borderRadius: 2,
                background: "linear-gradient(135deg, #fff3e0 0%, #f8f9fa 100%)",
                border: "1px solid rgba(255, 152, 0, 0.1)",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                <Typography variant="h6" fontWeight="bold" color="primary">
                    {strings.fetalHealth.sectionTitle}
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {/* Fetal Movement Detection */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl component="fieldset" fullWidth>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 2,
                            }}
                        >
                            <MonitorHeartRoundedIcon
                                sx={{ color: "#2196f3", fontSize: 20 }}
                            />
                            <FormLabel
                                component="legend"
                                sx={{
                                    fontWeight: "bold",
                                    color: "text.primary",
                                    "&.Mui-focused": { color: "text.primary" },
                                }}
                            >
                                Fetal Movement Detected
                            </FormLabel>
                        </Box>
                        <RadioGroup
                            value={
                                fetalHealth.fetalMovementDetected?.toString() ||
                                ""
                            }
                            onChange={handleFetalMovementChange}
                            row
                        >
                            <FormControlLabel
                                value="true"
                                control={<Radio size="small" />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="false"
                                control={<Radio size="small" />}
                                label="No"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                {/* Kick Count */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                        }}
                    >
                        <AirlineSeatLegroomReducedRoundedIcon
                            sx={{ color: "#4caf50", fontSize: 20 }}
                        />
                        <Typography variant="subtitle2" fontWeight="bold">
                            Kick Count (if movement detected)
                        </Typography>
                    </Box>
                    <TextField
                        fullWidth
                        type="text"
                        inputMode="numeric"
                        placeholder="Enter number of kicks"
                        value={fetalHealth.kickCount || ""}
                        onChange={handleKickCountChange}
                        disabled={fetalHealth.fetalMovementDetected !== true}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AirlineSeatLegroomReducedRoundedIcon
                                        sx={{ color: "#666", fontSize: 18 }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                        helperText={
                            fetalHealth.fetalMovementDetected === true
                                ? "Count the number of fetal movements/kicks felt"
                                : "Select 'Yes' for fetal movement to enable kick counting"
                        }
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor:
                                    fetalHealth.fetalMovementDetected !== true
                                        ? "#f5f5f5"
                                        : "white",
                            },
                        }}
                    />
                </Grid>

                {/* Fetal Heart Sound */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                        }}
                    >
                        <FavoriteRoundedIcon
                            sx={{ color: "#e91e63", fontSize: 20 }}
                        />
                        <Typography variant="subtitle2" fontWeight="bold">
                            Fetal Heart Rate (BPM)
                        </Typography>
                    </Box>
                    <TextField
                        fullWidth
                        type="text"
                        inputMode="numeric"
                        placeholder="e.g., 140"
                        value={fetalHealth.fetalHeartSound || ""}
                        onChange={handleFetalHeartSoundChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <HeartIcon
                                        sx={{ color: "#666", fontSize: 18 }}
                                    />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        BPM
                                    </Typography>
                                </InputAdornment>
                            ),
                        }}
                        helperText="Normal fetal heart rate: 110-160 BPM"
                        error={
                            !!fetalHealth.fetalHeartSound &&
                            (parseInt(fetalHealth.fetalHeartSound) < 110 ||
                                parseInt(fetalHealth.fetalHeartSound) > 160)
                        }
                    />
                    {fetalHealth.fetalHeartSound &&
                        (parseInt(fetalHealth.fetalHeartSound) < 110 ||
                            parseInt(fetalHealth.fetalHeartSound) > 160) && (
                            <Alert
                                severity="warning"
                                sx={{ mt: 1, fontSize: "0.875rem" }}
                            >
                                Heart rate outside normal range (110-160 BPM).
                                Please consult healthcare provider.
                            </Alert>
                        )}
                </Grid>

                {/* Notes */}
                <Grid size={{ xs: 12 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                        }}
                    >
                        <NotesIcon sx={{ color: "#673ab7", fontSize: 20 }} />
                        <Typography variant="subtitle2" fontWeight="bold">
                            Additional Notes & Observations
                        </Typography>
                    </Box>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        placeholder="Record any additional observations about fetal health, movement patterns, or concerns..."
                        value={fetalHealth.notes || ""}
                        onChange={handleNotesChange}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "white",
                            },
                        }}
                    />
                </Grid>
            </Grid>

            {/* Summary Box */}
            {(fetalHealth.fetalMovementDetected !== undefined ||
                fetalHealth.fetalHeartSound ||
                fetalHealth.kickCount) && (
                <Box
                    sx={{
                        mt: 3,
                        p: 2,
                        backgroundColor: "rgba(33, 150, 243, 0.05)",
                        borderRadius: 1,
                        border: "1px solid rgba(33, 150, 243, 0.2)",
                    }}
                >
                    <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        color="primary"
                        mb={1}
                    >
                        Fetal Health Summary:
                    </Typography>
                    <Grid container spacing={2}>
                        {fetalHealth.fetalMovementDetected !== undefined && (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Typography variant="body2">
                                    <strong>Movement:</strong>{" "}
                                    {fetalHealth.fetalMovementDetected
                                        ? "Detected"
                                        : "Not detected"}
                                </Typography>
                            </Grid>
                        )}
                        {fetalHealth.kickCount && (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Typography variant="body2">
                                    <strong>Kick Count:</strong>{" "}
                                    {fetalHealth.kickCount}
                                </Typography>
                            </Grid>
                        )}
                        {fetalHealth.fetalHeartSound && (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Typography variant="body2">
                                    <strong>Heart Rate:</strong>{" "}
                                    {fetalHealth.fetalHeartSound} BPM
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            )}
        </Paper>
    );
}

export default FetalHealth;
