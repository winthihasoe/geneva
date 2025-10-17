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
    Chip,
} from "@mui/material";
import {
    ExpandMore,
    ExpandLess,
    Clear,
    CheckCircle,
} from "@mui/icons-material";
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

    // Auto-save status states
    const [caregiverAutoSaved, setCaregiverAutoSaved] = useState(false);
    const [guardianAutoSaved, setGuardianAutoSaved] = useState(false);

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

    // Auto-save function for caregiver signature
    const autoSaveCaregiverSignature = () => {
        if (
            caregiverSigCanvasRef.current &&
            !caregiverSigCanvasRef.current.isEmpty()
        ) {
            const dataURL = caregiverSigCanvasRef.current.toDataURL();
            setCaregiverSignatureDataURL(dataURL);
            handleInputChange("caregiverSignature", dataURL);
            setCaregiverAutoSaved(true);

            // Reset auto-saved indicator after 2 seconds
            setTimeout(() => setCaregiverAutoSaved(false), 2000);
        }
    };

    // Auto-save function for guardian signature
    const autoSaveGuardianSignature = () => {
        if (
            guardianSigCanvasRef.current &&
            !guardianSigCanvasRef.current.isEmpty()
        ) {
            const dataURL = guardianSigCanvasRef.current.toDataURL();
            setGuardianSignatureDataURL(dataURL);
            handleInputChange("guardianSignature", dataURL);
            setGuardianAutoSaved(true);

            // Reset auto-saved indicator after 2 seconds
            setTimeout(() => setGuardianAutoSaved(false), 2000);
        }
    };

    // Handle caregiver signature events
    const handleCaregiverSignatureEnd = () => {
        // Auto-save after user finishes drawing
        setTimeout(autoSaveCaregiverSignature, 500); // Small delay to ensure stroke is complete
    };

    // Handle guardian signature events
    const handleGuardianSignatureEnd = () => {
        // Auto-save after user finishes drawing
        setTimeout(autoSaveGuardianSignature, 500); // Small delay to ensure stroke is complete
    };

    const clearCaregiverSignature = () => {
        caregiverSigCanvasRef.current.clear();
        setCaregiverSignatureDataURL("");
        setCaregiverAutoSaved(false);
        handleInputChange("caregiverSignature", "");
    };

    const clearGuardianSignature = () => {
        guardianSigCanvasRef.current.clear();
        setGuardianSignatureDataURL("");
        setGuardianAutoSaved(false);
        handleInputChange("guardianSignature", "");
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
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 1,
                            }}
                        >
                            <Typography variant="subtitle2">
                                Caregiver Signature
                            </Typography>
                            {caregiverAutoSaved && (
                                <Chip
                                    icon={<CheckCircle />}
                                    label="Auto-saved"
                                    size="small"
                                    color="success"
                                    variant="filled"
                                />
                            )}
                        </Box>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mb: 1, display: "block" }}
                        >
                            Signature will be automatically saved as you draw
                        </Typography>
                        <Box
                            ref={caregiverBoxRef}
                            sx={{
                                border: "1px solid #ccc",
                                borderRadius: 1,
                                width: "100%",
                                height: 150,
                                mb: 1,
                                overflow: "hidden",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <SignatureCanvas
                                ref={caregiverSigCanvasRef}
                                onEnd={handleCaregiverSignatureEnd} // Auto-save on signature end
                                canvasProps={{
                                    width: canvasWidth,
                                    height: 148,
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
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 2,
                                            mb: 1,
                                        }}
                                    >
                                        <Typography variant="subtitle2">
                                            Guardian Signature
                                        </Typography>
                                        {guardianAutoSaved && (
                                            <Chip
                                                icon={<CheckCircle />}
                                                label="Auto-saved"
                                                size="small"
                                                color="success"
                                                variant="filled"
                                            />
                                        )}
                                    </Box>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ mb: 1, display: "block" }}
                                    >
                                        Signature will be automatically saved as
                                        you draw
                                    </Typography>
                                    <Box
                                        ref={guardianBoxRef}
                                        sx={{
                                            border: "1px solid #ccc",
                                            borderRadius: 1,
                                            width: "100%",
                                            height: 150,
                                            mb: 1,
                                            overflow: "hidden",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <SignatureCanvas
                                            ref={guardianSigCanvasRef}
                                            onEnd={handleGuardianSignatureEnd} // Auto-save on signature end
                                            canvasProps={{
                                                width: canvasWidth,
                                                height: 148,
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
