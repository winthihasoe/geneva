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
        <Box sx={{ margin: "auto", maxWidth: 400, mb: 5 }}>
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
        </Box>
    );
}

export default StepEight;
