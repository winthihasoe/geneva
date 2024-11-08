import React, { useState } from "react";
import { Box, TextField, Typography, Button, MenuItem } from "@mui/material";

function CertificateForm({ data, handleChange, handleSubmit, errors }) {
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Generate a preview URL for the selected image
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl); // Update the preview state
            handleChange(e); // Call the original handleChange function
        }
    };

    return (
        <form
            onSubmit={(event) => handleSubmit(event)}
            style={{
                marginBottom: "1rem",
                padding: "1rem",
                maxWidth: "250px",
                borderRadius: "5px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Box mb={3}>
                <TextField
                    required
                    label="Training Center Name"
                    value={data.training_center_name}
                    onChange={handleChange}
                    name="training_center_name"
                    fullWidth
                    size="small"
                    sx={{ mb: 3 }}
                />
                {errors.training_center_name && (
                    <Typography fontSize={12} color="error">
                        {errors.training_center_name}
                    </Typography>
                )}
            </Box>
            <Box mb={3}>
                <TextField
                    required
                    label="Course Name"
                    value={data.course}
                    onChange={handleChange}
                    name="course"
                    fullWidth
                    size="small"
                />
                {errors.course && (
                    <Typography fontSize={12} color="error">
                        {errors.course}
                    </Typography>
                )}
            </Box>
            <Box mb={3}>
                <TextField
                    required
                    label="Course Start Date"
                    type="date"
                    value={data.start_date || ""}
                    onChange={handleChange}
                    name="start_date"
                    fullWidth
                    size="small"
                    sx={{ mb: 3 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                {errors.start_date && (
                    <Typography fontSize={12} color="error">
                        {errors.start_date}
                    </Typography>
                )}
            </Box>
            <Box mb={3}>
                <TextField
                    required
                    select
                    label="Course Duration (Months)"
                    value={data.duration}
                    onChange={handleChange}
                    name="duration"
                    fullWidth
                    size="small"
                    sx={{ mb: 3 }}
                >
                    {[...Array(48)].map((_, i) => (
                        <MenuItem key={i + 1} value={i + 1}>
                            {i + 1} Month{i + 1 > 1 ? "s" : ""}
                        </MenuItem>
                    ))}
                </TextField>
                {errors.duration && (
                    <Typography fontSize={12} color="error">
                        {errors.duration}
                    </Typography>
                )}
            </Box>
            <Box mb={3}>
                {/* Image Preview */}
                {preview && (
                    <Box
                        component="img"
                        src={preview}
                        alt="Preview"
                        sx={{
                            width: "100%",
                            height: "auto",
                            mb: 2,
                            borderRadius: 2,
                        }}
                    />
                )}
                {errors.certificate_photo && (
                    <Typography fontSize={12} color="error">
                        {errors.certificate_photo}
                    </Typography>
                )}
            </Box>
            <Box textAlign={"center"} my={2}>
                <Button
                    variant="contained"
                    component="label"
                    sx={{ mb: 1, borderRadius: 20 }}
                    size="small"
                >
                    Select Certificate Image
                    <input
                        name="certificate_photo"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange} // Use the new handleImageChange function
                    />
                </Button>
                <Button
                    variant="contained"
                    sx={{ mt: 1, borderRadius: 20 }}
                    size="small"
                    type="submit"
                >
                    <Typography fontFamily={"Lilita One"} fontSize={18}>
                        Save
                    </Typography>
                </Button>
            </Box>
        </form>
    );
}

export default CertificateForm;
