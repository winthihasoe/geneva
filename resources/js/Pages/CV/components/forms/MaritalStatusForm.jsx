import React, { useEffect } from "react";
import {
    Box,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
} from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle";

const maritalStatus = ["Single", "Married", "Divorced", "Separated", "Widowed"];
const MaritalStatusForm = ({ data, handleChange }) => {
    useEffect(() => {
        if (data.marital_status == "Single") {
            handleChange("number_of_children")({
                target: { value: "" },
            });
        }
    }, [data.marital_status]);
    console.log(data.number_of_children);

    return (
        <Box sx={{ mb: 3 }}>
            <Subtitle>Marital Status</Subtitle>
            <RadioGroup
                row
                value={data.marital_status}
                onChange={handleChange("marital_status")}
                sx={{ mb: 2, px: 2 }}
            >
                {maritalStatus.map((status) => (
                    <FormControlLabel
                        key={status}
                        value={status}
                        control={<Radio />}
                        label={<Typography fontSize={12}>{status}</Typography>}
                    />
                ))}
            </RadioGroup>
            {data.marital_status !== "Single" && (
                <>
                    <Subtitle>Number of Children and how old are they</Subtitle>
                    <TextField
                        value={data.number_of_children}
                        onChange={handleChange("number_of_children")}
                        fullWidth
                        inputProps={{ maxLength: 220 }}
                        size="small"
                        helperText="Example. 2 children, one is 2 year old and another is 6 year old."
                    />
                </>
            )}
        </Box>
    );
};

export default MaritalStatusForm;
