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

const SignaturesSection = ({ strings, formData, handleInputChange }) => {
    const s = strings.signatures;
    const c = strings.common;

    const caregiverSigCanvasRef = useRef(null);
    const guardianSigCanvasRef = useRef(null);
    const caregiverBoxRef = useRef(null);
    const guardianBoxRef = useRef(null);

    const [isGuardianSectionOpen, setIsGuardianSectionOpen] = useState(false);
    const [canvasWidth, setCanvasWidth] = useState(800);

    const [caregiverAutoSaved, setCaregiverAutoSaved] = useState(false);
    const [guardianAutoSaved, setGuardianAutoSaved] = useState(false);

    useEffect(() => {
        const updateCanvasWidth = () => {
            if (caregiverBoxRef.current) {
                const boxWidth = caregiverBoxRef.current.offsetWidth;
                setCanvasWidth(boxWidth - 2);
            }
        };

        updateCanvasWidth();
        window.addEventListener("resize", updateCanvasWidth);

        const timeout = setTimeout(updateCanvasWidth, 100);

        return () => {
            window.removeEventListener("resize", updateCanvasWidth);
            clearTimeout(timeout);
        };
    }, [isGuardianSectionOpen]);

    const autoSaveCaregiverSignature = () => {
        if (
            caregiverSigCanvasRef.current &&
            !caregiverSigCanvasRef.current.isEmpty()
        ) {
            const dataURL = caregiverSigCanvasRef.current.toDataURL();
            handleInputChange("caregiverSignature", dataURL);
            setCaregiverAutoSaved(true);

            setTimeout(() => setCaregiverAutoSaved(false), 2000);
        }
    };

    const autoSaveGuardianSignature = () => {
        if (
            guardianSigCanvasRef.current &&
            !guardianSigCanvasRef.current.isEmpty()
        ) {
            const dataURL = guardianSigCanvasRef.current.toDataURL();
            handleInputChange("clientSignature", dataURL);
            setGuardianAutoSaved(true);

            setTimeout(() => setGuardianAutoSaved(false), 2000);
        }
    };

    const handleCaregiverSignatureEnd = () => {
        setTimeout(autoSaveCaregiverSignature, 500);
    };

    const handleGuardianSignatureEnd = () => {
        setTimeout(autoSaveGuardianSignature, 500);
    };

    const clearCaregiverSignature = () => {
        caregiverSigCanvasRef.current.clear();
        setCaregiverAutoSaved(false);
        handleInputChange("caregiverSignature", "");
    };

    const clearGuardianSignature = () => {
        guardianSigCanvasRef.current.clear();
        setGuardianAutoSaved(false);
        handleInputChange("clientSignature", "");
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
                    {s.sectionTitle}
                </Typography>

                <Grid2 container spacing={3}>
                    <Grid2 size={12}>
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            gutterBottom
                            color="primary"
                        >
                            {s.caregiverInfo}
                        </Typography>
                    </Grid2>

                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label={s.caregiverName}
                            value={formData.caregiverName || ""}
                            onChange={(e) =>
                                handleInputChange(
                                    "caregiverName",
                                    e.target.value
                                )
                            }
                            disabled={!!formData.caregiverName}
                            placeholder={s.caregiverNamePlaceholder}
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
                                {s.caregiverSignature}
                            </Typography>
                            {caregiverAutoSaved && (
                                <Chip
                                    icon={<CheckCircle />}
                                    label={s.autoSaved}
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
                            {s.signatureAutoSaveHint}
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
                                onEnd={handleCaregiverSignatureEnd}
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
                                {c.clear}
                            </Button>
                        </Box>
                    </Grid2>

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
                                {s.guardianSection}
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
                                        label={s.guardianComment}
                                        multiline
                                        rows={3}
                                        value={formData.clientComment || ""}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "clientComment",
                                                e.target.value
                                            )
                                        }
                                        placeholder={
                                            s.guardianCommentPlaceholder
                                        }
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
                                            {s.guardianSignature}
                                        </Typography>
                                        {guardianAutoSaved && (
                                            <Chip
                                                icon={<CheckCircle />}
                                                label={s.autoSaved}
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
                                        {s.signatureAutoSaveHint}
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
                                            onEnd={handleGuardianSignatureEnd}
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
                                            {c.clear}
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
