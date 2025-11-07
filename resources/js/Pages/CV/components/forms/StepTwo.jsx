import React, { useContext } from "react";
import {
    Box,
    TextField,
    Typography,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import CvContext from "@/Context/CvContext";
import ProfileUploadForm from "./ProfileUploadForm";

const nationalityOptions = [
    "Thailand",
    "Myanmar",
    "Laos",
    "Indonesian",
    "Filipino",
    "Indian",
    "Sri Lanka",
];

const religions = [
    "Buddhism",
    "Christianity",
    "Catholic",
    "Muslim",
    "Hinduism",
    "Taoism",
    "No Religion",
];

const StepTwo = () => {
    const { data, handleChange } = useContext(CvContext);
    return (
        <Box
            sx={{
                margin: "auto",
                maxWidth: 400,
            }}
        >
            <ProfileUploadForm />
            <Box
                sx={{
                    my: 3,
                }}
            >
                <Typography variant="subtitle1" fontWeight="bold">
                    Height in cm
                </Typography>
                <TextField
                    size="small"
                    type="number"
                    value={data.height ?? ""}
                    inputProps={{ min: 0 }}
                    onChange={handleChange("height")}
                    InputProps={{
                        endAdornment: <Typography>cm</Typography>,
                    }}
                    placeholder="150"
                    fullWidth
                />
                <Typography variant="body2" mt={1} color="textSecondary">
                    Can't input decimal (point).
                </Typography>
            </Box>
            <Box
                sx={{
                    mb: 3,
                }}
            >
                <Typography variant="subtitle1" fontWeight="bold">
                    Weight in kg
                </Typography>
                <TextField
                    size="small"
                    type="number"
                    value={data.weight ?? ""}
                    inputProps={{ min: 0 }}
                    onChange={handleChange("weight")}
                    InputProps={{
                        endAdornment: <Typography>kg</Typography>,
                    }}
                    placeholder="60.5"
                    fullWidth
                />
                <Typography variant="body2" mt={1} color="textSecondary">
                    Can input decimal (point).
                </Typography>
            </Box>

            {/* Nationality  */}
            <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                    Nationality
                </Typography>
                <FormControl component="fieldset">
                    <RadioGroup
                        row
                        value={data.nationality}
                        onChange={(e) => {
                            handleChange("nationality")(e);
                            if (e.target.value) {
                                handleChange("other_nationality")({
                                    target: { value: "" },
                                });
                            }
                        }}
                    >
                        {nationalityOptions.map((option) => (
                            <FormControlLabel
                                key={option}
                                value={option}
                                control={<Radio />}
                                label={
                                    <Typography fontSize={12}>
                                        {option}
                                    </Typography>
                                }
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography>Other nationality</Typography>
                    <TextField
                        size="small"
                        value={data.other_nationality ?? ""}
                        onChange={(e) => {
                            handleChange("other_nationality")(e);
                            if (e.target.value) {
                                handleChange("nationality")({
                                    target: { value: "" },
                                });
                            }
                        }}
                    />
                </Box>
            </Box>

            {/* Religion  */}
            <Box sx={{ my: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                    Religion
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        gap: 2,
                    }}
                >
                    <FormControl component="fieldset" sx={{ flexGrow: 1 }}>
                        <RadioGroup
                            row
                            value={data.religion}
                            onChange={handleChange("religion")}
                        >
                            {religions.map((religion) => (
                                <FormControlLabel
                                    key={religion}
                                    value={religion}
                                    control={<Radio />}
                                    label={
                                        <Typography fontSize={12}>
                                            {religion}
                                        </Typography>
                                    }
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Box>

            {/* Marital status */}
            <Box sx={{ my: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                    Marital Status
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        gap: 2,
                    }}
                >
                    <FormControl component="fieldset" sx={{ flexGrow: 1 }}>
                        <RadioGroup
                            row
                            value={data.marital_status}
                            onChange={handleChange("marital_status")}
                        >
                            <FormControlLabel
                                value="Single"
                                control={<Radio />}
                                label="Single"
                            />
                            <FormControlLabel
                                value="Married"
                                control={<Radio />}
                                label="Married"
                            />
                        </RadioGroup>
                    </FormControl>
                </Box>
                {data.marital_status == "Married" && (
                    <>
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            mb={1}
                        >
                            Number of Children and how old are they
                        </Typography>
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

            {/* Current Address  */}
            <Box
                sx={{
                    my: 3,
                }}
            >
                <Typography variant="subtitle1" fontWeight="bold">
                    Current Address
                </Typography>
                <TextField
                    fullWidth
                    value={data.current_address || ""}
                    onChange={handleChange("current_address")}
                    sx={{ flexGrow: 1 }}
                    size="small"
                    multiline
                    placeholder="Address ..."
                    rows={2}
                />
            </Box>

            {/* Residential address in home country */}
            <Box
                sx={{
                    my: 3,
                }}
            >
                <Typography variant="subtitle1" fontWeight="bold">
                    Residential Address in Home Country
                </Typography>
                <TextField
                    fullWidth
                    value={data.residential_address || ""}
                    onChange={handleChange("residential_address")}
                    sx={{ flexGrow: 1 }}
                    size="small"
                    multiline
                    placeholder="Address in home town ..."
                    rows={2}
                />
            </Box>
        </Box>
    );
};

export default StepTwo;
