import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { CarePlanContext } from "@/Context/CarePlanContext";

const BasicCare = [
    "Diaper changing",
    "Bathing and baby hygiene",
    "Bottle feeding and burping",
    "Preparing baby formula",
    "Sterilizing bottles and utensils",
    "Putting baby to sleep and sleep routine support",
    "Dressing the baby",
    "Light baby laundry",
    "Cleaning and organizing baby items",
    "Providing emotional comfort (talking, singing, playing)",
    "Monitoring baby's general behavior and mood",
    "Recording feeding and sleep times for parents",
];

const MedicalCare = [
    "Administering prescribed medications",
    "Monitoring vital signs (e.g. temperature, breathing)",
    "Tube feeding or special feeding methods (if required)",
    "Managing colic, reflux, or feeding difficulties",
    "Administering nebulizer treatments for respiratory conditions",
    "Managing seizure-prone or neurologically vulnerable babies",
    "Supporting babies with congenital conditions (e.g. cleft palate, heart conditions)",
    "Post-vaccination care and observation",
    "Infant CPR and emergency response",
    "Caring for premature babies or infants with special needs",
    "Assisting in developmental monitoring (milestones)",
    "Observing and reporting any health concerns to parents",
];

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

function StepTwoBC() {
    const { carePlanData, updateCarePlan } = useContext(CarePlanContext);

    const [otherCare, setOtherCare] = useState("");
    const [showOtherField, setShowOtherField] = useState(false);

    // Initialize state based on existing carePlanData when component mounts
    useEffect(() => {
        const currentServices = carePlanData.services || [];
        const existingOther = currentServices.find((service) =>
            service.startsWith("Other:")
        );

        if (existingOther) {
            // Extract the text after "Other: "
            const otherText = existingOther.replace("Other: ", "");
            setOtherCare(otherText);
            setShowOtherField(true);
        }
    }, []);

    const handleCareChange = (care) => (event) => {
        const currentServices = carePlanData.services || [];

        if (event.target.checked) {
            updateCarePlan("services", [...currentServices, care]);
        } else {
            updateCarePlan(
                "services",
                currentServices.filter((item) => item !== care)
            );
        }
    };

    const handleOtherCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        setShowOtherField(isChecked);

        if (!isChecked) {
            // If unchecked, clear the text field and remove from services
            setOtherCare("");
            const currentServices = carePlanData.services || [];
            const filteredServices = currentServices.filter(
                (service) => !service.startsWith("Other:")
            );
            updateCarePlan("services", filteredServices);
        }
    };

    const handleOtherChange = (event) => {
        const value = event.target.value;
        setOtherCare(value);

        const currentServices = carePlanData.services || [];
        // Remove any previous "Other:" entries
        const filteredServices = currentServices.filter(
            (service) => !service.startsWith("Other:")
        );

        if (value.trim()) {
            updateCarePlan("services", [
                ...filteredServices,
                `Other: ${value}`,
            ]);
        } else {
            updateCarePlan("services", filteredServices);
        }
    };

    const handleCareTypeChange = (event) => {
        const newType = event.target.value;
        updateCarePlan("service_type", newType);

        // If switching to Basic Care, remove all MedicalCare items from services
        if (newType === "Basic Care") {
            const currentServices = carePlanData.services || [];
            const filteredServices = currentServices.filter(
                (item) => !MedicalCare.includes(item)
            );
            updateCarePlan("services", filteredServices);
        }
    };

    const currentServices = carePlanData.services || [];

    const showMedicalCare =
        carePlanData.service_type === "Basic + Medical Care";

    return (
        <Box>
            {/* Choose Service Type */}
            <FormControl
                component="fieldset"
                sx={{
                    mb: 3,
                    color: "white",
                }}
            >
                <Typography variant="h6" fontWeight="bold">
                    Choose one *
                </Typography>

                <RadioGroup
                    row
                    value={carePlanData.service_type || "Basic Care"}
                    onChange={handleCareTypeChange}
                >
                    <FormControlLabel
                        value="Basic Care"
                        control={<Radio sx={whiteControlSx} />}
                        label="Basic Care"
                    />
                    <FormControlLabel
                        value="Basic + Medical Care"
                        control={<Radio sx={whiteControlSx} />}
                        label="Basic + Medical Care"
                    />
                </RadioGroup>
            </FormControl>

            {/* Basic Nanny Care */}
            <Box sx={{ width: "100%", maxWidth: 600, color: "white", mb: 3 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                    Basic Nanny Care
                </Typography>
                <FormGroup sx={{ mb: 3, px: 2 }}>
                    {BasicCare.map((care, index) => (
                        <FormControlLabel
                            key={index}
                            control={
                                <Checkbox
                                    sx={whiteControlSx}
                                    checked={currentServices.includes(care)}
                                    onChange={handleCareChange(care)}
                                />
                            }
                            label={
                                <Typography fontSize={14}>{care}</Typography>
                            }
                            sx={{ mb: 1 }}
                        />
                    ))}
                </FormGroup>
            </Box>

            {/* Medical Care - Show only when medical conditions is selected */}
            {showMedicalCare && (
                <Box
                    sx={{ width: "100%", maxWidth: 600, color: "white", mb: 3 }}
                >
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                        Medical Care
                    </Typography>
                    <FormGroup sx={{ mb: 3, px: 2 }}>
                        {MedicalCare.map((care, index) => (
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        sx={whiteControlSx}
                                        checked={currentServices.includes(care)}
                                        onChange={handleCareChange(care)}
                                    />
                                }
                                label={
                                    <Typography fontSize={14}>
                                        {care}
                                    </Typography>
                                }
                                sx={{ mb: 1 }}
                            />
                        ))}
                    </FormGroup>
                </Box>
            )}

            {/* Other option with TextField */}
            <Box sx={{ width: "100%", maxWidth: 600, color: "white" }}>
                <Box sx={{ px: 2 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                sx={whiteControlSx}
                                checked={showOtherField}
                                onChange={handleOtherCheckboxChange}
                            />
                        }
                        label={<Typography fontSize={14}>Other</Typography>}
                    />

                    {/* TextField appears only when Other checkbox is checked */}
                    {showOtherField && (
                        <TextField
                            value={otherCare}
                            onChange={handleOtherChange}
                            placeholder="Please specify other care needed..."
                            variant="outlined"
                            size="small"
                            fullWidth
                            sx={{
                                mt: 1,
                                ml: 4,
                                "& .MuiOutlinedInput-root": {
                                    color: "white",
                                    "& fieldset": {
                                        borderColor: "rgba(255, 255, 255, 0.3)",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "rgba(255, 255, 255, 0.5)",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "white",
                                    },
                                },
                                "& .MuiInputBase-input::placeholder": {
                                    color: "rgba(255, 255, 255, 0.7)",
                                },
                            }}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default StepTwoBC;
