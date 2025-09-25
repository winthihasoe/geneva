import TinyText from "@/Components/Typo/TinyText";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import Compressor from "compressorjs";
import React, { useState } from "react";
const Label = ({ children }) => (
    <Typography
        variant="h6"
        fontSize={{ xs: 13, sm: 14, md: 15 }}
        fontWeight={600}
        mb={1}
        mr={1}
    >
        {children}
    </Typography>
);
function ApplyForm({ data, setData, handleSubmit, errors }) {
    const [previews, setPreviews] = useState({
        passport: null,
        visa: null,
        certificates: [],
    });

    const compressImage = (file, callback) => {
        new Compressor(file, {
            quality: 0.3, // Adjust quality (0.6 = 60% quality)
            success: (compressedFile) => {
                callback(compressedFile);
                console.log("Compression success");
            },
            error: (err) => {
                console.error("Compression error:", err);
            },
        });
    };

    const handleChange = (e) => {
        const { name, files } = e.target;

        if (name === "passport" || name === "visa") {
            if (files.length === 0) {
                // Clear the file and preview if the user cancels file selection
                setData(name, null);
                setPreviews((prev) => ({
                    ...prev,
                    [name]: null,
                }));
                return;
            }

            const file = files[0];

            // Compress the image
            compressImage(file, (compressedFile) => {
                setData(name, compressedFile);

                // Generate preview
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviews((prev) => ({
                        ...prev,
                        [name]: reader.result,
                    }));
                };
                reader.readAsDataURL(compressedFile);
            });
        } else if (name === "certificates") {
            if (files.length === 0) {
                // Clear all certificates if no files are selected
                setData(name, []);
                setPreviews((prev) => ({
                    ...prev,
                    certificates: [],
                }));
                return;
            }
            const newFiles = Array.from(files); // Convert FileList to an array

            // Compress and handle certificates
            const compressedFiles = [];
            const compressedPreviews = [];
            newFiles.forEach((file, index) => {
                compressImage(file, (compressedFile) => {
                    compressedFiles.push(compressedFile);

                    // Generate preview
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        compressedPreviews.push(reader.result);

                        // Update state after all files are processed
                        if (compressedFiles.length === newFiles.length) {
                            setData(name, [
                                ...(data.certificates || []),
                                ...compressedFiles,
                            ]);
                            setPreviews((prev) => ({
                                ...prev,
                                certificates: [
                                    ...(prev.certificates || []),
                                    ...compressedPreviews,
                                ],
                            }));
                        }
                    };
                    reader.readAsDataURL(compressedFile);
                });
            });
        } else {
            setData({
                ...data,
                [name]: e.target.value,
            });
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 500,
                border: "4px solid",
                borderColor: "primary.main",
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: 10,
                mb: 5,
            }}
        >
            <form onSubmit={handleSubmit}>
                <Typography
                    variant="h5"
                    textAlign="center"
                    color="primary.main"
                    mb={3}
                >
                    Submit your CV to Hearty Aid
                </Typography>
                <Box
                    sx={{
                        mb: 3,
                        gap: 2,
                    }}
                >
                    <Label>Name as in Passport</Label>
                    <TextField
                        size="small"
                        value={data.name}
                        onChange={handleChange}
                        name="name"
                        sx={{ flexGrow: 1 }}
                        fullWidth
                        placeholder="Enter your name"
                        required
                    />
                    {errors.name && (
                        <Typography color="error" variant="caption">
                            {errors.name}
                        </Typography>
                    )}
                </Box>
                <Box
                    sx={{
                        mb: 3,
                        gap: 2,
                    }}
                >
                    <Label>Date of birth</Label>
                    <TextField
                        size="small"
                        value={data.date_of_birth}
                        onChange={handleChange}
                        name="date_of_birth"
                        sx={{ flexGrow: 1 }}
                        fullWidth
                        type="date"
                        required
                    />
                    {errors.date_of_birth && (
                        <Typography color="error" variant="caption">
                            {errors.date_of_birth}
                        </Typography>
                    )}
                </Box>
                <FormControl
                    component="fieldset"
                    sx={{
                        mb: 3,
                    }}
                    required
                >
                    <Label>Gender</Label>

                    <RadioGroup
                        row
                        value={data.gender}
                        onChange={handleChange}
                        name="gender"
                    >
                        <FormControlLabel
                            value="Male"
                            control={<Radio />}
                            label="Male"
                        />
                        <FormControlLabel
                            value="Female"
                            control={<Radio />}
                            label="Female"
                        />
                    </RadioGroup>
                    {errors.gender && (
                        <Typography color="error" variant="caption">
                            {errors.gender}
                        </Typography>
                    )}
                </FormControl>
                <Box mb={2}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1,
                            gap: 2,
                        }}
                    >
                        <Label>Height</Label>
                        <TextField
                            size="small"
                            type="number"
                            value={data.height ?? ""}
                            inputProps={{ min: 0 }}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: <Typography>cm</Typography>,
                            }}
                            name="height"
                            required
                            placeholder="160"
                        />
                        {errors.height && (
                            <Typography color="error" variant="caption">
                                {errors.height}
                            </Typography>
                        )}
                    </Box>
                </Box>
                <Box mb={2}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mb: 1,
                        }}
                    >
                        <Label>Weight</Label>
                        <TextField
                            size="small"
                            type="number"
                            value={data.weight ?? ""}
                            inputProps={{ min: 0 }}
                            onChange={handleChange}
                            name="weight"
                            InputProps={{
                                endAdornment: <Typography>kg</Typography>,
                            }}
                            required
                            placeholder="70"
                        />
                        {errors.weight && (
                            <Typography color="error" variant="caption">
                                {errors.weight}
                            </Typography>
                        )}
                    </Box>
                </Box>
                <Box
                    sx={{
                        mb: 3,
                        gap: 2,
                    }}
                >
                    <Label>Nationality</Label>
                    <TextField
                        size="small"
                        value={data.nationality}
                        onChange={handleChange}
                        name="nationality"
                        sx={{ flexGrow: 1 }}
                        fullWidth
                        required
                        placeholder="Enter nationality"
                    />
                    {errors.nationality && (
                        <Typography color="error" variant="caption">
                            {errors.nationality}
                        </Typography>
                    )}
                </Box>
                <Box
                    sx={{
                        mb: 3,
                        gap: 2,
                    }}
                >
                    <Label>Religion</Label>
                    <TextField
                        size="small"
                        value={data.religion}
                        onChange={handleChange}
                        name="religion"
                        sx={{ flexGrow: 1 }}
                        fullWidth
                        required
                        placeholder="Enter your religion"
                    />
                    {errors.religion && (
                        <Typography color="error" variant="caption">
                            {errors.religion}
                        </Typography>
                    )}
                </Box>
                <Box
                    sx={{
                        mb: 3,
                        gap: 2,
                    }}
                >
                    <Label>Phone number</Label>
                    <TextField
                        size="small"
                        value={data.phone}
                        onChange={handleChange}
                        name="phone"
                        sx={{ flexGrow: 1 }}
                        fullWidth
                        required
                        placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                        <Typography color="error" variant="caption">
                            {errors.phone}
                        </Typography>
                    )}
                </Box>
                <Box
                    sx={{
                        mb: 3,
                        gap: 2,
                    }}
                >
                    <Label>Email</Label>
                    <TextField
                        type="email"
                        size="small"
                        value={data.email}
                        onChange={handleChange}
                        name="email"
                        sx={{ flexGrow: 1 }}
                        fullWidth
                        placeholder="Enter your email"
                    />
                    {errors.email && (
                        <Typography color="error" variant="caption">
                            {errors.email}
                        </Typography>
                    )}
                </Box>
                <Box
                    sx={{
                        mb: 3,
                        gap: 2,
                    }}
                >
                    <Label>Line ID</Label>
                    <TextField
                        size="small"
                        value={data.line}
                        onChange={handleChange}
                        name="line"
                        sx={{ flexGrow: 1 }}
                        fullWidth
                        placeholder="Enter your Line ID"
                    />
                    {errors.line && (
                        <Typography color="error" variant="caption">
                            {errors.line}
                        </Typography>
                    )}
                </Box>
                <Box
                    sx={{
                        mb: 3,
                        gap: 2,
                    }}
                >
                    <Label>Current address</Label>
                    <TextField
                        size="small"
                        value={data.current_address}
                        onChange={handleChange}
                        name="current_address"
                        sx={{ flexGrow: 1 }}
                        fullWidth
                        multiline
                        required
                        placeholder="Enter your current address"
                    />
                    {errors.current_address && (
                        <Typography color="error" variant="caption">
                            {errors.current_address}
                        </Typography>
                    )}
                </Box>
                <Box
                    sx={{
                        mb: 3,
                        gap: 2,
                    }}
                >
                    <Label>Describe your experience</Label>
                    <TextField
                        size="small"
                        value={data.experience}
                        onChange={handleChange}
                        name="experience"
                        sx={{ flexGrow: 1 }}
                        fullWidth
                        multiline
                        required
                        placeholder="Describe your experience"
                    />
                    {errors.experience && (
                        <Typography color="error" variant="caption">
                            {errors.experience}
                        </Typography>
                    )}
                </Box>

                <Box
                    sx={{
                        mb: 3,
                        gap: 2,
                    }}
                >
                    <Label>Passport</Label>
                    <TextField
                        type="file"
                        inputProps={{ accept: "image/*" }}
                        name="passport"
                        onChange={handleChange}
                        fullWidth
                    />
                    {previews.passport && (
                        <img
                            src={previews.passport}
                            alt="Passport Preview"
                            style={{
                                marginTop: "10px",
                                width: "100%",
                                borderRadius: "8px",
                            }}
                        />
                    )}
                </Box>

                <Box
                    sx={{
                        mb: 3,
                        gap: 2,
                    }}
                >
                    <Label>Visa stamp</Label>
                    <TextField
                        type="file"
                        inputProps={{ accept: "image/*" }}
                        name="visa"
                        onChange={handleChange}
                        fullWidth
                    />
                    {previews.visa && (
                        <img
                            src={previews.visa}
                            alt="Visa Preview"
                            style={{
                                marginTop: "10px",
                                width: "100%",
                                borderRadius: "8px",
                            }}
                        />
                    )}
                </Box>

                <Box
                    sx={{
                        mb: 3,
                        gap: 2,
                    }}
                >
                    <Label>Certificate</Label>
                    <TextField
                        type="file"
                        inputProps={{ accept: "image/*", multiple: true }}
                        name="certificates"
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "10px",
                            marginTop: "10px",
                        }}
                    >
                        {previews.certificates.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Certificate Preview ${index + 1}`}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                }}
                            />
                        ))}
                    </Box>
                </Box>

                <TinyText>
                    Please upload your passport photo, certificate files, and
                    visa (if applicable).{" "}
                    <strong>This will increase the chance of interview.</strong>
                </TinyText>
                <Box
                    sx={{
                        my: 3,
                        gap: 2,
                    }}
                >
                    <Label>What languages can you speak?</Label>
                    <TextField
                        size="small"
                        value={data.language}
                        onChange={handleChange}
                        name="language"
                        sx={{ flexGrow: 1 }}
                        fullWidth
                        multiline
                        required
                        placeholder="e.g. English, Burmese, Thai, etc."
                    />
                    <TinyText>
                        You can describe languages separating with comma.
                    </TinyText>
                    {errors.language && (
                        <Typography color="error" variant="caption">
                            {errors.language}
                        </Typography>
                    )}
                </Box>
                <Box
                    sx={{
                        mb: 3,
                        gap: 2,
                    }}
                >
                    <Label>
                        Certificate/Diploma/Degree award date and school name
                    </Label>
                    <TextField
                        size="small"
                        value={data.certificate_details}
                        onChange={handleChange}
                        name="certificate_details"
                        sx={{ flexGrow: 1 }}
                        fullWidth
                        multiline
                        required
                        placeholder="Enter your qualification"
                    />
                    {errors.certificate_details && (
                        <Typography color="error" variant="caption">
                            {errors.certificate_details}
                        </Typography>
                    )}
                </Box>

                <TinyText>
                    You need to fill phone number and email or Line id carefully
                    for interview.
                </TinyText>
                <Box textAlign={"center"} my={3}>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ borderRadius: 20, width: 150 }}
                    >
                        <Typography sx={{ fontSize: 18 }}>Submit</Typography>
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

export default ApplyForm;
