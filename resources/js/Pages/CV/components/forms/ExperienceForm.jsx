import React, { useState } from "react";
import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    Button,
} from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle"; // Ensure this path is correct
import UnderlinedText from "@/Components/Typo/UnderlinedText";
import TransferForm from "./TransferForm";

const ExperienceForm = ({ data, handleChange }) => {
    const handleExperienceChange = (event) => {
        const value = event.target.value;
        handleChange("experience")(event);
    };

    // Generate the URL to the uploaded transfer form
    const transferFormUrl = data?.transfer_form
        ? `/storage/documents/transfer_forms/${data.transfer_form}`
        : null;
    return (
        <Box sx={{ mb: 3 }}>
            <Box
                sx={{
                    my: 2,
                }}
            >
                <Subtitle>Years of Experience</Subtitle>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        mt: 2,
                        gap: 2,
                    }}
                >
                    <TextField
                        disabled={data.experience == "Fresh"}
                        value={data.years_experience}
                        onChange={handleChange("years_experience")}
                        sx={{ flexBasis: 200 }}
                        inputProps={{ min: 0 }}
                        InputProps={{
                            endAdornment: <Typography>years</Typography>,
                        }}
                        size="small"
                        type="number"
                    />
                    <TextField
                        disabled={data.experience == "Fresh"}
                        value={data.months_experience}
                        onChange={handleChange("months_experience")}
                        sx={{ flexBasis: 200 }}
                        inputProps={{ min: 0 }}
                        type="number"
                        InputProps={{
                            endAdornment: <Typography>months</Typography>,
                        }}
                        size="small"
                    />
                </Box>
            </Box>

            {data?.transfer_form && (
                <Typography fontSize={12} mb={1}>
                    You have uploaded a transfer form. <br /> File name:{" "}
                    <a
                        href={transferFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <UnderlinedText>{data.transfer_form}</UnderlinedText>
                    </a>
                </Typography>
            )}

            {data?.experience == "Transfer" && <TransferForm />}
        </Box>
    );
};

export default ExperienceForm;
