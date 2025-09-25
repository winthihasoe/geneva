import CvContext from "@/Context/CvContext";
import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Typography,
} from "@mui/material";
import React, { useContext } from "react";

function StepEight() {
    const { data, handleChange } = useContext(CvContext);
    const handleCheckboxChange = (section, value) => (event) => {
        const newValues = event.target.checked
            ? [...data[section], value]
            : data[section].filter((item) => item !== value);
        handleChange(section)({ target: { value: newValues } });
    };

    // Handle maid service as a separate boolean field
    const handleMaidServiceChange = (event) => {
        handleChange("maid_service")({
            target: { value: event.target.checked },
        });
    };

    return (
        <Box sx={{ minHeight: "50vh", margin: "auto", maxWidth: 400 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Job Preferences
            </Typography>
            <FormGroup row sx={{ mb: 3, px: 2 }}>
                {["Live-in", "Live-out"].map((pkg, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                checked={data.package.includes(pkg)}
                                onChange={handleCheckboxChange("package", pkg)}
                            />
                        }
                        label={<Typography fontSize={12}>{pkg}</Typography>}
                    />
                ))}
            </FormGroup>
            <FormGroup row sx={{ mb: 3, px: 2 }}>
                {["Day duty", "Night duty"].map((duty, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                checked={data.duty.includes(duty)}
                                onChange={handleCheckboxChange("duty", duty)}
                            />
                        }
                        label={<Typography fontSize={12}>{duty}</Typography>}
                    />
                ))}
            </FormGroup>

            {/* Maid service as separate boolean field */}
            <FormGroup sx={{ mb: 3, px: 2 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={data.maid_service || false}
                            onChange={handleMaidServiceChange}
                        />
                    }
                    label={
                        <Typography fontSize={12}>+ Maid service</Typography>
                    }
                />
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                >
                    If you can do household works while taking care of patient
                    or baby, you will get extra fees around 1,500 – 2,000
                    THB/Month
                </Typography>
            </FormGroup>

            <Box
                sx={{
                    border: "3px solid ",
                    borderColor: "secondary.main",
                    p: 2,
                    mb: 3,
                    maxWidth: 500,
                    margin: "auto",
                    borderRadius: 2,
                }}
            >
                <Typography fontSize={14} fontWeight="bold">
                    Hearty Aid will deduct a 15% service fee from your salary
                    each month or each day, depending on your payment schedule,
                    for the entire duration of your employment
                </Typography>
            </Box>
        </Box>
    );
}

export default StepEight;
