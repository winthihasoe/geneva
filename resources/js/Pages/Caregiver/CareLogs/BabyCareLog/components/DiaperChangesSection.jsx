import React from "react";
import {
    Typography,
    TextField,
    Button,
    IconButton,
    FormControl,
    Select,
    MenuItem,
    Card,
    CardContent,
    Box,
    Grid2,
    Divider,
    InputLabel,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

const DIAPER_CONTENTS = ["Wet", "Dirty", "Both"];

const DiaperChangesSection = ({
    data,
    toiletingData,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
    entryRefs,
    strings,
}) => {
    const d = strings.diaper;
    const c = strings.common;
    const o = strings.options;

    return (
        <Card sx={{ borderRadius: 2, bgcolor: "transparent" }}>
            <CardContent>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                >
                    <Typography variant="h6" fontWeight="bold" color="primary">
                        {d.sectionTitle}
                    </Typography>
                    <Button
                        startIcon={<AddIcon />}
                        onClick={() =>
                            addArrayItem("diaperChanges", {
                                time: "",
                                content: "",
                                notes: "",
                            })
                        }
                        variant="outlined"
                        size="small"
                    >
                        {c.addEntry}
                    </Button>
                </Box>

                {data.map((item, index) => (
                    <Box
                        key={index}
                        ref={(el) => {
                            if (entryRefs) {
                                entryRefs.current[`diaperChanges-${index}`] =
                                    el;
                            }
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                            >
                                {c.entry(index + 1)}
                            </Typography>
                            <IconButton
                                onClick={() =>
                                    removeArrayItem("diaperChanges", index)
                                }
                                color="error"
                                size="small"
                                disabled={data.length === 1}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>

                        <Grid2 container spacing={2} sx={{ mb: 3 }}>
                            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label={c.time}
                                    type="time"
                                    value={item.time}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "diaperChanges",
                                            index,
                                            "time",
                                            e.target.value
                                        )
                                    }
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                                <FormControl fullWidth variant="standard">
                                    <InputLabel>{d.diaperContent}</InputLabel>
                                    <Select
                                        value={item.content}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "diaperChanges",
                                                index,
                                                "content",
                                                e.target.value
                                            )
                                        }
                                        label={d.diaperContent}
                                    >
                                        {DIAPER_CONTENTS.map((key) => (
                                            <MenuItem key={key} value={key}>
                                                {o.diaperContent[key]}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid2>

                            <Grid2 size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label={c.notes}
                                    value={item.notes}
                                    onChange={(e) =>
                                        handleArrayChange(
                                            "diaperChanges",
                                            index,
                                            "notes",
                                            e.target.value
                                        )
                                    }
                                    multiline
                                    maxRows={3}
                                    placeholder={d.notesPlaceholder}
                                />
                            </Grid2>
                        </Grid2>

                        {index < data.length - 1 && <Divider sx={{ mb: 3 }} />}
                    </Box>
                ))}

                <Box mt={4}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 3,
                            flexWrap: "wrap",
                            gap: 2,
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            color="primary"
                        >
                            {d.toiletingTitle}
                        </Typography>
                        <Button
                            startIcon={<AddIcon />}
                            onClick={() =>
                                addArrayItem("toileting", {
                                    time: "",
                                    toiletAttempt: "",
                                    result: "",
                                    type: "",
                                    reaction: "",
                                    notes: "",
                                })
                            }
                            variant="outlined"
                            size="small"
                        >
                            {c.addEntry}
                        </Button>
                    </Box>

                    {toiletingData.map((item, index) => (
                        <Box
                            key={index}
                            ref={(el) => {
                                if (entryRefs) {
                                    entryRefs.current[`toileting-${index}`] =
                                        el;
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: 2,
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                >
                                    {c.entry(index + 1)}
                                </Typography>
                                <IconButton
                                    onClick={() =>
                                        removeArrayItem("toileting", index)
                                    }
                                    color="error"
                                    size="small"
                                    disabled={toiletingData.length === 1}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>

                            <Grid2 container spacing={3} sx={{ mb: 3 }}>
                                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label={c.time}
                                        type="time"
                                        value={item.time}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "toileting",
                                                index,
                                                "time",
                                                e.target.value
                                            )
                                        }
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid2>

                                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">
                                            {d.toiletAttempt}
                                        </FormLabel>
                                        <RadioGroup
                                            row
                                            value={item.toiletAttempt}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    "toileting",
                                                    index,
                                                    "toiletAttempt",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <FormControlLabel
                                                value="Yes"
                                                control={<Radio />}
                                                label={c.yes}
                                            />
                                            <FormControlLabel
                                                value="No"
                                                control={<Radio />}
                                                label={c.no}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid2>

                                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">
                                            {d.result}
                                        </FormLabel>
                                        <RadioGroup
                                            row
                                            value={item.result}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    "toileting",
                                                    index,
                                                    "result",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <FormControlLabel
                                                value="Success"
                                                control={<Radio />}
                                                label={o.toiletResult.Success}
                                            />
                                            <FormControlLabel
                                                value="Accident"
                                                control={<Radio />}
                                                label={o.toiletResult.Accident}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid2>

                                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">
                                            {d.type}
                                        </FormLabel>
                                        <RadioGroup
                                            row
                                            value={item.type}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    "toileting",
                                                    index,
                                                    "type",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <FormControlLabel
                                                value="Urine"
                                                control={<Radio />}
                                                label={o.toiletType.Urine}
                                            />
                                            <FormControlLabel
                                                value="Bowel"
                                                control={<Radio />}
                                                label={o.toiletType.Bowel}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid2>

                                <Grid2 size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label={d.childReaction}
                                        value={item.reaction}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "toileting",
                                                index,
                                                "reaction",
                                                e.target.value
                                            )
                                        }
                                        placeholder={
                                            d.childReactionPlaceholder
                                        }
                                        multiline
                                        maxRows={2}
                                    />
                                </Grid2>

                                <Grid2 size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label={c.notes}
                                        value={item.notes}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                "toileting",
                                                index,
                                                "notes",
                                                e.target.value
                                            )
                                        }
                                        placeholder={
                                            d.toiletingNotesPlaceholder
                                        }
                                        multiline
                                        maxRows={2}
                                    />
                                </Grid2>
                            </Grid2>

                            {index < toiletingData.length - 1 && (
                                <Divider sx={{ mb: 3 }} />
                            )}
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default DiaperChangesSection;
