// Show certificate card
import FormText from "@/Components/Typo/FormText";
import Subtitle from "@/Components/Typo/Subtitle";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Dialog,
    Divider,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import YesOrNoModal from "@/Components/util/YesOrNoModal";
import ImageDialog from "@/Components/util/ImageDialog";
import { router, useForm } from "@inertiajs/react";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import ReusableModal from "@/Components/util/ReusableModal";
import TitleCenter from "@/Components/Typo/TitleCenter";
import BodyText from "@/Components/Typo/BodyText";
import TinyText from "@/Components/Typo/TinyText";
import NoData from "@/Components/util/NoData";

function Certificate({ certificate }) {
    const [openDelete, setOpenDelete] = useState(false);
    const handleCloseDelete = () => setOpenDelete(false);

    const [openImage, setOpenImage] = useState(false); // State for image modal
    const handleOpenImage = () => setOpenImage(true); // Open image modal
    const handleCloseImage = () => setOpenImage(false); // Close image modal

    const handleDeleteConfirm = () => {
        router.delete(route("certificate.delete", certificate.id), {
            onSuccess: () => {
                handleCloseDelete();
            },
        });
    };

    const { data, setData, put, errors, setError, processing } = useForm({
        ...certificate,
    });

    // Update section
    const [openUpdate, setOpenUpdate] = useState(false);
    const handleOpenUpdate = () => setOpenUpdate(true);
    const handleCloseUpdate = () => setOpenUpdate(false);
    const handleUpdate = () => {
        put(route("certificate.update", certificate.id), {
            data,
            onSuccess: () => {
                handleCloseUpdate();
            },
        });
    };

    // Handle form data change, including file input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <Card sx={{ border: "1px solid #ddd", width: 250 }}>
            <CardMedia>
                {certificate.certificate_photo ? (
                    <Box
                        onClick={handleOpenImage}
                        component="img"
                        src={`/storage/${data.certificate_photo}`}
                        alt="Certificate"
                        sx={{
                            width: "100%",
                            height: "auto",
                            mb: 2,
                            borderRadius: 2,
                        }}
                    />
                ) : (
                    <Box
                        sx={{
                            width: "100%",
                            bgcolor: "grey.200",
                            p: 1,
                            mb: 2,
                            borderRadius: 2,
                        }}
                    >
                        <Typography textAlign={"center"} fontFamily={"Karma"}>
                            Don't have certificate photo.
                        </Typography>
                    </Box>
                )}
            </CardMedia>
            <CardContent sx={{ position: "relative" }}>
                <Subtitle>{certificate.training_center_name}</Subtitle>
                <FormText>
                    Qualification: {certificate.qualification_type || "N/A"}
                </FormText>
                <FormText>Course: {certificate.course}</FormText>
                <FormText>
                    Training start date: {certificate.start_date}
                </FormText>
                <FormText>Duration: {certificate.duration} months</FormText>
                <IconButton
                    aria-label="delete"
                    sx={{ position: "absolute", bottom: 0, right: 0 }}
                    size="small"
                    onClick={() => setOpenDelete(true)}
                >
                    <DeleteRoundedIcon color="error" fontSize="small" />
                </IconButton>
                <IconButton
                    aria-label="edit"
                    sx={{ position: "absolute", bottom: 0, left: 0 }}
                    size="small"
                    onClick={handleOpenUpdate}
                >
                    <CreateRoundedIcon color="success" fontSize="small" />
                </IconButton>
            </CardContent>

            <YesOrNoModal
                open={openDelete}
                onClose={handleCloseDelete}
                title="Do you want to delete this item?"
                onConfirm={handleDeleteConfirm} // Use the desired method here
            />

            {/* Image Dialog */}
            <ImageDialog
                open={openImage}
                onClose={handleCloseImage}
                imageSrc={`/storage/${certificate.certificate_photo}`}
            />

            {/* Update dialog  */}
            <ReusableModal open={openUpdate} onClose={handleCloseUpdate}>
                <TitleCenter>Update Qualification</TitleCenter>
                <BodyText>
                    Please add qualification relevant to caregiver job.
                </BodyText>
                <Divider sx={{ my: 2 }} />
                <Box mb={3}>
                    <FormControl component="fieldset">
                        <Subtitle>Qualification type</Subtitle>
                        {/* Display error message */}
                        {errors.qualification_type && (
                            <Typography
                                variant="body2"
                                color="error"
                                sx={{ mt: 1 }}
                            >
                                {errors.qualification_type}
                            </Typography>
                        )}
                        <RadioGroup
                            row
                            value={data.qualification_type || ""}
                            onChange={handleChange}
                            name="qualification_type"
                        >
                            <FormControlLabel
                                value="Certificate"
                                control={<Radio />}
                                label={<BodyText>Certificate</BodyText>}
                            />
                            <FormControlLabel
                                value="Degree"
                                control={<Radio />}
                                label={<BodyText>Degree</BodyText>}
                            />
                            <FormControlLabel
                                value="Diploma"
                                control={<Radio />}
                                label={<BodyText>Diploma</BodyText>}
                            />
                        </RadioGroup>
                    </FormControl>
                </Box>

                <Box mb={3}>
                    <Subtitle>Course Name</Subtitle>
                    <TextField
                        required
                        value={data.course}
                        onChange={handleChange}
                        name="course"
                        fullWidth
                        size="small"
                    />
                    <TinyText>Example: Nurse Aid</TinyText>
                    {errors.course && (
                        <Typography fontSize={12} color="error">
                            {errors.course}
                        </Typography>
                    )}
                </Box>

                <Box mb={3}>
                    <Subtitle>Training School Name</Subtitle>
                    <TextField
                        required
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
                    <Subtitle>Course Start Date</Subtitle>
                    <TextField
                        required
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
                    <Subtitle>Course Duration (Months)</Subtitle>
                    <TextField
                        required
                        select
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

                {certificate.certificate_photo ? (
                    <Box
                        onClick={handleOpenImage}
                        component="img"
                        src={`/storage/${data.certificate_photo}`}
                        alt="Certificate"
                        sx={{
                            width: "100%",
                            height: "auto",
                            mb: 2,
                            borderRadius: 2,
                        }}
                    />
                ) : (
                    <Box
                        sx={{
                            width: "100%",
                            bgcolor: "grey.200",
                            p: 1,
                            mb: 2,
                            borderRadius: 2,
                        }}
                    >
                        <Typography textAlign={"center"} fontFamily={"Karma"}>
                            Don't have certificate photo.
                        </Typography>
                    </Box>
                )}
                <Box textAlign={"center"}>
                    <Button
                        onClick={handleUpdate}
                        variant="contained"
                        sx={{ borderRadius: 20 }}
                    >
                        <Typography
                            fontFamily={"Lilita One"}
                            fontWeight={500}
                            fontSize={{ xs: 20, sm: 20 }}
                        >
                            Update
                        </Typography>
                    </Button>
                </Box>
            </ReusableModal>
        </Card>
    );
}

export default Certificate;
