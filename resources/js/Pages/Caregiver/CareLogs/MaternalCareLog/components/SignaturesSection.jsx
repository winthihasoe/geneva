import React, { useRef, useState, useEffect } from "react";
import {
    Typography,
    TextField,
    Button,
    Box,
    Card,
    CardContent,
    Grid2,
    Collapse,
    IconButton,
} from "@mui/material";
import { ExpandMore, ExpandLess, Clear, Save } from "@mui/icons-material";
import SignatureCanvas from "react-signature-canvas";

const SignaturesSection = ({ formData, handleInputChange }) => {
    const caregiverSigCanvasRef = useRef(null);
    const guardianSigCanvasRef = useRef(null);
    const caregiverBoxRef = useRef(null);
    const guardianBoxRef = useRef(null);

    const [caregiverSignatureDataURL, setCaregiverSignatureDataURL] =
        useState("");
    const [guardianSignatureDataURL, setGuardianSignatureDataURL] =
        useState("");
    const [isGuardianSectionOpen, setIsGuardianSectionOpen] = useState(false);
    const [canvasWidth, setCanvasWidth] = useState(800);

    // Update canvas width when component mounts or window resizes
    useEffect(() => {
        const updateCanvasWidth = () => {
            if (caregiverBoxRef.current) {
                const boxWidth = caregiverBoxRef.current.offsetWidth;
                setCanvasWidth(boxWidth - 2); // Subtract 2 for border
            }
        };

        updateCanvasWidth();
        window.addEventListener("resize", updateCanvasWidth);

        // Small delay to ensure proper rendering
        const timeout = setTimeout(updateCanvasWidth, 100);

        return () => {
            window.removeEventListener("resize", updateCanvasWidth);
            clearTimeout(timeout);
        };
    }, [isGuardianSectionOpen]);

    const clearCaregiverSignature = () => {
        caregiverSigCanvasRef.current.clear();
        setCaregiverSignatureDataURL("");
        handleInputChange("caregiverSignature", "");
    };

    const saveCaregiverSignature = () => {
        const dataURL = caregiverSigCanvasRef.current.toDataURL();
        setCaregiverSignatureDataURL(dataURL);
        handleInputChange("caregiverSignature", dataURL);
    };

    const clearGuardianSignature = () => {
        guardianSigCanvasRef.current.clear();
        setGuardianSignatureDataURL("");
        handleInputChange("guardianSignature", "");
    };

    const saveGuardianSignature = () => {
        const dataURL = guardianSigCanvasRef.current.toDataURL();
        setGuardianSignatureDataURL(dataURL);
        handleInputChange("guardianSignature", dataURL);
    };

    const toggleGuardianSection = () => {
        setIsGuardianSectionOpen(!isGuardianSectionOpen);
    };

    return (
        <Card sx={{ borderRadius: 2, bgcolor: "transparent" }}>
            <CardContent>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={3}
                    color="primary"
                >
                    Signatures
                </Typography>

                <Grid2 container spacing={3}>
                    {/* Caregiver Section */}
                    <Grid2 size={12}>
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            gutterBottom
                            color="primary"
                        >
                            Caregiver Information
                        </Typography>
                    </Grid2>

                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label="Caregiver Name"
                            value={formData.caregiverName || ""}
                            onChange={(e) =>
                                handleInputChange(
                                    "caregiverName",
                                    e.target.value
                                )
                            }
                            disabled={!!formData.caregiverName}
                            placeholder="Enter caregiver's full name"
                        />
                    </Grid2>

                    <Grid2 size={12}>
                        <Typography variant="subtitle2" gutterBottom>
                            Caregiver Signature
                        </Typography>
                        <Box
                            ref={caregiverBoxRef}
                            sx={{
                                border: "1px solid #ccc",
                                borderRadius: 1,
                                width: "100%",
                                height: 150,
                                mb: 1,
                                overflow: "hidden", // Prevent overflow
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <SignatureCanvas
                                ref={caregiverSigCanvasRef}
                                canvasProps={{
                                    width: canvasWidth,
                                    height: 148, // Slightly less than box height
                                    style: {
                                        border: "none",
                                        borderRadius: "4px",
                                    },
                                }}
                            />
                        </Box>
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Button
                                size="small"
                                variant="outlined"
                                startIcon={<Clear />}
                                onClick={clearCaregiverSignature}
                            >
                                Clear
                            </Button>
                            <Button
                                size="small"
                                variant="contained"
                                startIcon={<Save />}
                                onClick={saveCaregiverSignature}
                            >
                                Save Signature
                            </Button>
                        </Box>
                    </Grid2>

                    {/* Guardian/Parent Section - Collapsible */}
                    <Grid2 size={12}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                mt: 3,
                            }}
                            onClick={toggleGuardianSection}
                        >
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                color="primary"
                                sx={{ flexGrow: 1 }}
                            >
                                Guardian/Parent Section (Optional)
                            </Typography>
                            <IconButton size="small">
                                {isGuardianSectionOpen ? (
                                    <ExpandLess />
                                ) : (
                                    <ExpandMore />
                                )}
                            </IconButton>
                        </Box>
                    </Grid2>

                    <Grid2 size={12}>
                        <Collapse in={isGuardianSectionOpen}>
                            <Grid2 container spacing={3} sx={{ mt: 1 }}>
                                <Grid2 size={12}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label="Guardian Comment/Feedback"
                                        multiline
                                        rows={3}
                                        value={formData.guardianComment || ""}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "guardianComment",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Any comments, concerns, or feedback from the guardian/parent..."
                                    />
                                </Grid2>

                                <Grid2 size={{ xs: 12 }}>
                                    <Typography
                                        variant="subtitle2"
                                        gutterBottom
                                    >
                                        Guardian Signature
                                    </Typography>
                                    <Box
                                        ref={guardianBoxRef}
                                        sx={{
                                            border: "1px solid #ccc",
                                            borderRadius: 1,
                                            width: "100%",
                                            height: 150,
                                            mb: 1,
                                            overflow: "hidden", // Prevent overflow
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <SignatureCanvas
                                            ref={guardianSigCanvasRef}
                                            canvasProps={{
                                                width: canvasWidth,
                                                height: 148, // Slightly less than box height
                                                style: {
                                                    border: "none",
                                                    borderRadius: "4px",
                                                },
                                            }}
                                        />
                                    </Box>
                                    <Box sx={{ display: "flex", gap: 1 }}>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            startIcon={<Clear />}
                                            onClick={clearGuardianSignature}
                                        >
                                            Clear
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            startIcon={<Save />}
                                            onClick={saveGuardianSignature}
                                        >
                                            Save Signature
                                        </Button>
                                    </Box>
                                </Grid2>
                            </Grid2>
                        </Collapse>
                    </Grid2>
                </Grid2>
            </CardContent>
        </Card>
    );
};

export default SignaturesSection;
