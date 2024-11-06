import React, { useContext, useEffect } from "react";
import {
    Box,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
} from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle";
import CvContext from "@/Context/CvContext";

const maritalStatus = ["Single", "Married", "Divorced", "Separated", "Widowed"];
const MaritalStatusForm = () => {
    const { data, handleChange } = useContext(CvContext);
    useEffect(() => {
        if (data.marital_status == "Single") {
            handleChange("number_of_children")({
                target: { value: "" },
            });
        }
    }, [data.marital_status]);

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
                        multiline
                        inputProps={{ maxLength: 220 }}
                        size="small"
                        placeholder="2 children, one is 2 year old and another is 6 year old."
                    />
                </>
            )}
        </Box>
    );
};

export default MaritalStatusForm;
