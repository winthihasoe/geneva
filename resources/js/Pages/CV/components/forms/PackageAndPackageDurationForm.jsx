import React, { useContext } from "react";
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle";
import CvContext from "@/Context/CvContext";

const PackageAndPackageDurationForm = () => {
    const { data, handleChange } = useContext(CvContext);
    const handleCheckboxChange = (section, value) => (event) => {
        const newValues = event.target.checked
            ? [...data[section], value]
            : data[section].filter((item) => item !== value);
        handleChange(section)({ target: { value: newValues } });
    };

    return (
        <Box>
            <Subtitle>How Long can you contract with an employer? </Subtitle>
            <FormGroup row sx={{ mb: 3, px: 2 }}>
                {["3-months", "6-months", "1-year"].map((duration, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                checked={data.package_duration.includes(
                                    duration
                                )}
                                onChange={handleCheckboxChange(
                                    "package_duration",
                                    duration
                                )}
                            />
                        }
                        label={
                            <Typography fontSize={12}>{duration}</Typography>
                        }
                    />
                ))}
            </FormGroup>
            <Subtitle>Choose Package </Subtitle>
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
                        sx={{ width: 200 }}
                    />
                ))}
            </FormGroup>
        </Box>
    );
};

export default PackageAndPackageDurationForm;
