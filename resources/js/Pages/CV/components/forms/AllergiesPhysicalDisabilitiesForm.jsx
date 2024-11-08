import React, { useContext } from "react";
import { Box, TextField, Typography } from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle"; // Ensure this path is correct
import CvContext from "@/Context/CvContext";
import TinyText from "@/Components/Typo/TinyText";

const AllergiesPhysicalDisabilitiesForm = () => {
    const { data, handleChange } = useContext(CvContext);
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
                    placeholder="Describe any allergy you have ..."
                    inputProps={{ maxLength: 500 }}
                />
                <TinyText>Only 500 words</TinyText>
            </Box>
            <Box>
                <Subtitle>Physical Disabilities</Subtitle>

                <TextField
                    value={data.physical_disability}
                    onChange={handleChange("physical_disability")}
                    fullWidth
                    multiline
                    size="small"
                    placeholder="Describe any disability you have ..."
                    inputProps={{ maxLength: 500 }}
                />
                <TinyText>Only 500 words</TinyText>
            </Box>
        </Box>
    );
};

export default AllergiesPhysicalDisabilitiesForm;
