import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle"; // Ensure this path is correct

const AllergiesPhysicalDisabilitiesForm = ({ data, handleChange }) => {
    return (
        <Box sx={{ mb: 3 }}>
            <Box mb={3}>
                <Subtitle>Allergies (if any)</Subtitle>
                <TextField
                    value={data.allergies}
                    onChange={handleChange("allergies")}
                    fullWidth
                    size="small"
                    multiline
                    minRows={2}
                    placeholder="Describe any allergy you have ..."
                />
            </Box>
            <Box>
                <Subtitle>Physical Disabilities</Subtitle>

                <TextField
                    value={data.physical_disability}
                    onChange={handleChange("physical_disability")}
                    fullWidth
                    multiline
                    minRows={2}
                    size="small"
                    placeholder="Describe any disability you have ..."
                />
            </Box>
        </Box>
    );
};

export default AllergiesPhysicalDisabilitiesForm;
