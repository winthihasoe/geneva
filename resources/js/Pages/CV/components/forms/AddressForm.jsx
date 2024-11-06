import React, { useContext, useState } from "react";
import {
    Box,
    TextField,
    Typography,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle";
import CvContext from "@/Context/CvContext";

const AddressForm = () => {
    const { data, handleChange } = useContext(CvContext);
    const [sameAsCurrent, setSameAsCurrent] = useState(false);

    // Handle checkbox toggle
    const handleCheckboxChange = (event) => {
        const checked = event.target.checked;
        setSameAsCurrent(checked);

        if (checked) {
            // Create an event-like object to pass to handleChange
            handleChange("residential_address")({
                target: { value: data.current_address || "" },
            });
        } else {
            // Clear residential_address when unchecked
            handleChange("residential_address")({
                target: { value: "" },
            });
        }
    };

    return (
        <Box sx={{ mb: 3 }}>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    mb: 4,
                    gap: 2,
                }}
            >
                <Subtitle>Current Address</Subtitle>
                <TextField
                    fullWidth
                    value={data.current_address || ""}
                    onChange={handleChange("current_address")}
                    sx={{ flexGrow: 1 }}
                    size="small"
                    multiline
                    placeholder="Address ..."
                />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    mb: 4,
                    gap: 2,
                }}
            >
                <Subtitle>Residential Address in Home Country</Subtitle>
                <TextField
                    fullWidth
                    value={
                        sameAsCurrent
                            ? data.current_address
                            : data.residential_address || ""
                    }
                    onChange={handleChange("residential_address")}
                    sx={{ flexGrow: 1 }}
                    size="small"
                    multiline
                    placeholder="Address in home town ..."
                    disabled={sameAsCurrent} // Disable input when checkbox is checked
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={sameAsCurrent}
                            onChange={handleCheckboxChange}
                        />
                    }
                    label={
                        <Typography fontSize={12}>
                            Same as current address
                        </Typography>
                    }
                />
            </Box>
        </Box>
    );
};

export default AddressForm;
