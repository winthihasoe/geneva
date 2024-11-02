import React from "react";
import {
    Box,
    TextField,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Divider,
    Checkbox,
} from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle";

const AddressForm = ({ data, handleChange }) => {
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
                    value={data.residential_address}
                    onChange={handleChange("residential_address")}
                    sx={{ flexGrow: 1 }}
                    size="small"
                    minRows={2}
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
                <Subtitle>Residential address in home country</Subtitle>
                <TextField
                    fullWidth
                    value={data.residential_address}
                    onChange={handleChange("residential_address")}
                    sx={{ flexGrow: 1 }}
                    size="small"
                    minRows={2}
                    multiline
                    placeholder="Address in home town ..."
                />
                <FormControlLabel
                    control={<Checkbox />}
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
