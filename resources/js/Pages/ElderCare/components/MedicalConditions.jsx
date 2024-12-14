import ElderCareWalking from "@/Components/Fancy/ElderCareWalking";
import { CarePlanContext } from "@/Context/CarePlanContext";
import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid2,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import React, { useContext } from "react";

const Conditions = [
    "Diabetes Mellitus",
    "Hypertension",
    "Heart Disease",
    "Alzheimer’s disease / Dementia",
    "Stroke",
    "Arthritis",
    "Chronic Kidney Disease",
    "Cancer",
];

const Mobilities = [
    "Fully mobile",
    "Uses a walking aid (cane, walker)",
    "Wheel-chair bound",
    "Bed bound",
];

const Memory = [
    "Normal memory",
    "Short term memory loss",
    "Significant memory loss",
];

const Alertness = [
    "Fully alert & oriented",
    "Slightly confused & disoriented",
    "Moderate Disorientation",
    "Severely Disoriented",
];

const Label = ({ children }) => {
    return (
        <Typography
            sx={{
                fontFamily: "Karma",
                color: "primary.main",
                fontSize: { xs: 15, sm: 17, md: 20 },
            }}
        >
            {children}
        </Typography>
    );
};

function MedicalConditions() {
    const { carePlanData, updateCarePlan } = useContext(CarePlanContext);
    const handleCheckboxChange = (section, value) => (event) => {
        const newValues = event.target.checked
            ? [...carePlanData[section], value]
            : carePlanData[section].filter((item) => item !== value);
        updateCarePlan(section, newValues);
    };
    return (
        <Box position={"relative"}>
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
                    <Typography
                        sx={{
                            fontFamily: "Kavoon",
                            textAlign: "center",
                            color: "primary.main",
                            fontWeight: 400,
                            fontSize: { xs: 20, sm: 25 },
                        }}
                    >
                        Medical Conditions*
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: {
                                xs: 13,
                                sm: 15,
                                md: 18,
                            },
                            fontFamily: "Karma",
                            color: "primary.main",
                        }}
                    >
                        Check all that apply
                    </Typography>
                    <FormGroup
                        row
                        sx={{
                            px: 2,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {Conditions.map((condition) => (
                            <FormControlLabel
                                key={condition}
                                control={
                                    <Checkbox
                                        checked={carePlanData.medical_conditions.includes(
                                            condition
                                        )}
                                        onChange={handleCheckboxChange(
                                            "medical_conditions",
                                            condition
                                        )}
                                    />
                                }
                                label={<Label>{condition}</Label>}
                                sx={{ width: 290 }}
                            />
                        ))}
                    </FormGroup>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 3,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: 13,
                                    sm: 15,
                                    md: 18,
                                },
                                fontFamily: "Karma",
                                color: "primary.main",
                                fontWeight: "bold",
                            }}
                        >
                            Other conditions:
                        </Typography>
                        <TextField
                            sx={{
                                px: 2,
                            }}
                            value={carePlanData.other_medical_conditions}
                            onChange={(e) =>
                                updateCarePlan(
                                    "other_medical_conditions",
                                    e.target.value
                                )
                            }
                        />
                    </Box>
                </Grid2>
                <Grid2
                    size={{ xs: 12, sm: 6 }}
                    sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                >
                    {/* Mobility level  */}
                    <Box mb={2}>
                        <Typography
                            sx={{
                                fontFamily: "Kavoon",
                                textAlign: "center",
                                color: "primary.main",
                                fontWeight: 400,
                                fontSize: { xs: 20, sm: 25 },
                                mb: 2,
                            }}
                        >
                            Mobility level*
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                gap: 4,
                                flexWrap: "wrap",
                                my: 3,
                            }}
                        >
                            <RadioGroup
                                value={carePlanData.mobilities}
                                onChange={(e) =>
                                    updateCarePlan("mobilities", e.target.value)
                                }
                            >
                                {Mobilities.map((mobility) => (
                                    <FormControlLabel
                                        key={mobility}
                                        value={mobility}
                                        control={<Radio size="small" />}
                                        label={<Label>{mobility}</Label>}
                                    />
                                ))}
                            </RadioGroup>
                        </Box>
                    </Box>

                    {/* Memory & awareness  */}
                    <Box mb={2}>
                        <Typography
                            sx={{
                                fontFamily: "Kavoon",
                                textAlign: "center",
                                color: "primary.main",
                                fontWeight: 400,
                                fontSize: { xs: 20, sm: 25 },
                                mb: 2,
                            }}
                        >
                            Memory & awareness*
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                gap: 4,
                                flexWrap: "wrap",
                                my: 3,
                            }}
                        >
                            <RadioGroup
                                value={carePlanData.memory}
                                onChange={(e) =>
                                    updateCarePlan("memory", e.target.value)
                                }
                            >
                                {Memory.map((memo) => (
                                    <FormControlLabel
                                        key={memo}
                                        value={memo}
                                        control={<Radio size="small" />}
                                        label={<Label>{memo}</Label>}
                                    />
                                ))}
                            </RadioGroup>
                        </Box>
                    </Box>

                    {/* Alertness & orientation  */}
                    <Box mb={2}>
                        <Typography
                            sx={{
                                fontFamily: "Kavoon",
                                textAlign: "center",
                                color: "primary.main",
                                fontWeight: 400,
                                fontSize: { xs: 20, sm: 25 },
                                mb: 2,
                            }}
                        >
                            Alertness & orientation*
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                gap: 4,
                                flexWrap: "wrap",
                                my: 3,
                            }}
                        >
                            <RadioGroup
                                value={carePlanData.alertness}
                                onChange={(e) =>
                                    updateCarePlan("alertness", e.target.value)
                                }
                            >
                                {Alertness.map((alert) => (
                                    <FormControlLabel
                                        key={alert}
                                        value={alert}
                                        control={<Radio size="small" />}
                                        label={<Label>{alert}</Label>}
                                    />
                                ))}
                            </RadioGroup>
                        </Box>
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default MedicalConditions;
