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
                boxShadow: 3,
                px: { xs: 2, sm: 3, md: 4 },
                borderRadius: 3,
                mb: 5,
                py: 3,
            }}
        >
            <form onSubmit={handleSubmit}>
                <Typography
                    variant="h5"
                    sx={{
                        fontSize: { xs: "1.2rem", sm: "2rem" },
                        fontFamily: "Roboto Slab",
                    }}
                    textAlign="center"
                    color="primary.main"
                    mb={3}
                >
                    Join Our <b>Geneva</b> Caregiver Team
                </Typography>
                <Box
                    sx={{
                        mb: 3,
                        gap: 2,
                    }}
                >
                    <Label>နာမည်</Label>
                    <TextField
                        variant="standard"
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
                    <Label>မွေးနေ့</Label>
                    <TextField
                        variant="standard"
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
                    <Label>ကျား/မ</Label>

                    <RadioGroup
                        row
                        value={data.gender}
                        onChange={handleChange}
                        name="gender"
                    >
                        <FormControlLabel
                            value="Male"
                            control={<Radio />}
                            label="ကျား"
                        />
                        <FormControlLabel
                            value="Female"
                            control={<Radio />}
                            label="မ"
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
                        <Label>အရပ်အမြင့်</Label>
                        <TextField
                            variant="standard"
                            size="small"
                            value={data.height ?? ""}
                            onChange={handleChange}
                            name="height"
                            required
                            placeholder="ပေ သို့မဟုတ် cm ဖြင့် ဖြည့်ပါ"
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
                        <Label>ကိုယ်အလေးချိန်</Label>
                        <TextField
                            variant="standard"
                            size="small"
                            value={data.weight ?? ""}
                            onChange={handleChange}
                            name="weight"
                            required
                            placeholder="Kg သို့မဟုတ် lb ဖြင့် ဖြည့်ပါ"
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
                    <Label>လူမျိုး</Label>
                    <TextField
                        variant="standard"
                        size="small"
                        value={data.ethnicity ?? ""}
                        onChange={handleChange}
                        name="ethnicity"
                        sx={{ flexGrow: 1 }}
                        fullWidth
                        required
                        placeholder="Enter ethnicity"
                    />
                    {errors.ethnicity && (
                        <Typography color="error" variant="caption">
                            {errors.ethnicity}
                        </Typography>
                    )}
                </Box>
                <Box
                    sx={{
                        mb: 3,
                        gap: 2,
                    }}
                >
                    <Label>ကိုးကွယ်သည့် ဘာသာ</Label>
                    <TextField
                        variant="standard"
                        size="small"
                        value={data.religion ?? ""}
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
                    <Label>ဖုန်းနံပါတ်</Label>
                    <TextField
                        variant="standard"
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
                    <Label>Email ရှိပါက - </Label>
                    <TextField
                        variant="standard"
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
                    <Label>Viber နံပါတ်ရှိပါက - </Label>
                    <TextField
                        variant="standard"
                        size="small"
                        value={data.viber ?? ""}
                        onChange={handleChange}
                        name="viber"
                        sx={{ flexGrow: 1 }}
                        fullWidth
                        placeholder="Enter your Viber No."
                    />
                    {errors.viber && (
                        <Typography color="error" variant="caption">
                            {errors.viber}
                        </Typography>
                    )}
                </Box>
                <Box
                    sx={{
                        mb: 3,
                        gap: 2,
                    }}
                >
                    <Label>လက်ရှိနေရပ်လိပ်စာ</Label>
                    <TextField
                        variant="standard"
                        size="small"
                        value={data.current_address ?? ""}
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
                    <Label>လုပ်ငန်းအတွေ့အကြုံအကြောင်းဖေါ်ပြပါ</Label>
                    <TextField
                        variant="standard"
                        size="small"
                        value={data.experience ?? ""}
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
                    <Label>
                        မိမိရရှိခဲ့သော Degree / Diploma / certificate
                        အကြောင်းဖေါ်ပြပါ
                    </Label>
                    <TextField
                        variant="standard"
                        size="small"
                        value={data.certificate_details ?? ""}
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

                <Box
                    sx={{
                        mb: 3,
                        gap: 2,
                    }}
                >
                    <Label>ရရှိထားသော Certificate တင်ရန်</Label>
                    <TextField
                        variant="standard"
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

                <Typography
                    sx={{ fontSize: "0.7rem", lineHeight: 2 }}
                    textAlign={"center"}
                >
                    ဖုန်းနံပါတ်ကိုမှန်ကန်အောင်ဖြည့်စွက်ခြင်းဖြင့် Geneva မှ
                    အင်တာဗျူးရန် ဆက်သွယ်မည်ဖြစ်ပါသည်။
                </Typography>
                <Box textAlign={"center"} my={3}>
                    <Button
                        variant="contained"
                        type="submit"
                        size="small"
                        sx={{ borderRadius: 20, width: 150 }}
                    >
                        <Typography sx={{ fontSize: 14 }}>တင်မည်</Typography>
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

export default ApplyForm;
