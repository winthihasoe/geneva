import React from "react";
import {
    Box,
    TextField,
    Typography,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormGroup,
    Checkbox,
    Divider,
    FormLabel,
    Slider,
    Grid,
} from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle";
import TinyText from "@/Components/Typo/TinyText";

const languages = ["Thai", "Myanmar", "English", "Chinese", "Hindi"];

const EmailLanguageForm = ({ data, setData, handleChange }) => {
    // Handle changes in the slider
    const handleSliderChange = (language) => (event, value) => {
        const selectedValue = `${language} ${value}`;

        setData((prevData) => {
            const updatedLanguages = prevData.language.filter(
                (lang) => !lang.startsWith(language)
            );
            return {
                ...prevData,
                language: [...updatedLanguages, selectedValue],
            };
        });
    };
    return (
        <Box sx={{ my: 2 }}>
            <Subtitle>Email address</Subtitle>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
                <TextField
                    size="small"
                    value={data.email}
                    onChange={handleChange("email")}
                    sx={{ flexGrow: 1 }}
                    type="email"
                    placeholder="email"
                    inputProps={{
                        maxLength: 220,
                    }}
                />
            </Box>
            <Subtitle>Language</Subtitle>
            <TinyText>
                Choose the language bar to descibe you language skill. <br /> (0
                means very limited skill and 10 means excellent skill)
            </TinyText>

            {languages.map((language) => (
                <Grid
                    container
                    key={language}
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        gap: 1,
                        py: 1,
                    }}
                >
                    <Grid item xs={3}>
                        <Typography
                            sx={{
                                width: "30%",
                                fontSize: 13,
                                fontWeight: "bold",
                            }}
                        >
                            {language}
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <Typography fontSize={11}>Very limited</Typography>
                            <Slider
                                value={parseInt(
                                    data.language
                                        .find((lang) =>
                                            lang.startsWith(language)
                                        )
                                        ?.split(" ")[1] || 0
                                )}
                                onChange={handleSliderChange(language)}
                                min={0}
                                max={10}
                                step={2}
                                valueLabelDisplay="auto"
                                marks
                                sx={{ maxWidth: 300 }} // Set width for the slider
                            />
                            <Typography fontSize={11}>Excellent</Typography>
                        </Box>
                    </Grid>
                </Grid>
            ))}
        </Box>
    );
};

export default EmailLanguageForm;
