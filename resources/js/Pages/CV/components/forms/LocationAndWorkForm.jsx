import React, { useContext } from "react";
import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle";
import CvContext from "@/Context/CvContext";

const LocationAndWorkForm = () => {
    const { data, handleChange } = useContext(CvContext);
    return (
        <Box>
            <Subtitle>Current Location</Subtitle>
            <FormControl component="fieldset" sx={{ mb: 3 }}>
                <RadioGroup
                    row
                    sx={{ px: 2 }}
                    aria-label="currentLocation"
                    value={data.current_location}
                    onChange={handleChange("current_location")}
                >
                    <FormControlLabel
                        value="Home country"
                        control={<Radio />}
                        label={
                            <Typography fontSize={12}>Home Country</Typography>
                        }
                    />
                    <FormControlLabel
                        value="Thailand"
                        control={<Radio />}
                        label={<Typography fontSize={12}>Thailand</Typography>}
                    />
                </RadioGroup>
            </FormControl>

            <Subtitle>Have you worked in Thailand before?</Subtitle>
            <FormControl component="fieldset">
                <RadioGroup
                    row
                    sx={{ px: 2 }}
                    aria-label="workedInSingapore"
                    value={data.worked_in_thailand}
                    onChange={handleChange("worked_in_thailand")}
                >
                    <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label={<Typography fontSize={12}>Yes</Typography>}
                    />

                    <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label={<Typography fontSize={12}>No</Typography>}
                    />
                </RadioGroup>
            </FormControl>
        </Box>
    );
};

export default LocationAndWorkForm;
