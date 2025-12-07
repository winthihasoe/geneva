import React, { useContext } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Grid2,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CvContext from "@/Context/CvContext";

const options = [
    {
        key: "training",
        title: "7-Day Training Program",
        subtitle:
            "Caregiver attend 7-day training program and practical sessions.",
    },
    {
        key: "assessment",
        title: "Skill Assessment Test",
        subtitle:
            "Geneva Supervisors will test caregiver's skill and knowledge. After that Admin will approve CV.",
    },
];

function StepTwelve() {
    const { data, setData } = useContext(CvContext);

    const handleChoose = (key) => {
        setData((prev) => ({
            ...prev,
            training_or_assessment: key,
        }));
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h6" textAlign="center" sx={{ mb: 3 }}>
                Please choose one option to continue
            </Typography>
            <Grid2
                container
                spacing={2}
                justifyContent="center"
                alignItems="stretch"
            >
                {options.map((option) => {
                    const isSelected =
                        data.training_or_assessment === option.key;
                    return (
                        <Grid2
                            item
                            size={{ xs: 12, sm: 6, md: 5 }}
                            key={option.key}
                            sx={{ display: "flex" }}
                        >
                            <Card
                                variant={isSelected ? "outlined" : "elevation"}
                                sx={{
                                    flex: 1,
                                    borderColor: isSelected
                                        ? "primary.main"
                                        : "grey.200",
                                    boxShadow: isSelected ? 4 : 1,
                                    bgcolor: isSelected
                                        ? "grey.50"
                                        : "background.paper",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    minHeight: 180,
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        textAlign={"center"}
                                        color="primary"
                                        sx={{ mb: 1, fontWeight: 600 }}
                                    >
                                        {option.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mb: 2 }}
                                    >
                                        {option.subtitle}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ p: 2, pt: 0 }}>
                                    <Button
                                        variant={
                                            isSelected
                                                ? "contained"
                                                : "outlined"
                                        }
                                        color="secondary"
                                        fullWidth
                                        onClick={() => handleChoose(option.key)}
                                        startIcon={
                                            isSelected ? (
                                                <CheckCircleIcon />
                                            ) : null
                                        }
                                    >
                                        {isSelected ? "Choosed" : "Choose"}
                                    </Button>
                                </Box>
                            </Card>
                        </Grid2>
                    );
                })}
            </Grid2>
        </Box>
    );
}

export default StepTwelve;
