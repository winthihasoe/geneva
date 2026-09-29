import {
    Box,
    Button,
    Checkbox,
    ListItemText,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";

export const decisionLabel = {
    Pending: "Pending",
    Contacted: "Contacted",
    Uncontactable: "Uncontactable",
    "Refuse job": "Refuse job",
    pending: "Pending",
    contacted: "Contacted",
    uncontactable: "Uncontactable",
    recruit: "Recruit",
    deny: "Deny",
    part_time: "Part time",
};

export const textFieldSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        borderBottom: "none",
        backgroundColor: "background.paper",
        "& fieldset": {
            border: "1px solid",
            borderColor: "divider",
        },
        "&:hover": {
            borderBottom: "none",
        },
        "&:hover fieldset": {
            borderColor: "text.disabled",
        },
        "&.Mui-focused": {
            borderBottom: "none",
        },
        "&.Mui-focused fieldset": {
            borderColor: "primary.main",
            borderWidth: "1px",
        },
        "&.Mui-error fieldset": {
            borderColor: "error.main",
        },
    },
    "& .MuiOutlinedInput-root.MuiInputBase-multiline": {
        padding: "10px 12px",
    },
    "& .MuiInputBase-root input": {
        padding: "11px 12px !important",
        height: "22px !important",
        lineHeight: "22px",
        fontSize: "14px",
    },
    "& .MuiInputBase-root textarea": {
        fontSize: "14px",
        lineHeight: 1.5,
        padding: 0,
    },
    "& .MuiInputBase-root input::placeholder, & .MuiInputBase-root textarea::placeholder":
        {
            fontSize: "14px",
            opacity: 0.55,
        },
    "& input[type=number]": {
        MozAppearance: "textfield",
        appearance: "textfield",
    },
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        WebkitAppearance: "none",
        margin: 0,
    },
};

export const selectSx = {
    borderRadius: "8px",
    backgroundColor: "background.paper",
    fontSize: "14px",
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "divider",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "text.disabled",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "primary.main",
        borderWidth: "1px",
    },
    "& .MuiSelect-select": {
        padding: "11px 12px",
        minHeight: "22px",
        lineHeight: "22px",
    },
};

const pairSx = {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
    gap: 2,
};

export function FieldLabel({ htmlFor, children, required = false }) {
    return (
        <Typography
            component="label"
            htmlFor={htmlFor}
            variant="body2"
            sx={{
                display: "block",
                mb: 0.75,
                fontWeight: 600,
                color: "text.primary",
            }}
        >
            {children}
            {required ? (
                <Typography
                    component="span"
                    color="error.main"
                    sx={{ ml: 0.4 }}
                >
                    *
                </Typography>
            ) : null}
        </Typography>
    );
}

export function FieldError({ children }) {
    if (!children) {
        return null;
    }

    return (
        <Typography
            variant="caption"
            color="error"
            sx={{ display: "block", mt: 0.5 }}
        >
            {children}
        </Typography>
    );
}

function Section({ step, title, description, children }) {
    return (
        <Box
            component="section"
            sx={{
                py: 3,
                borderTop: "1px solid",
                borderColor: "divider",
            }}
        >
            <Box sx={{ display: "flex", gap: 1.5, mb: 2.5 }}>
                <Typography
                    variant="caption"
                    sx={{
                        width: 24,
                        height: 24,
                        mt: 0.15,
                        borderRadius: "50%",
                        bgcolor: "action.hover",
                        color: "text.secondary",
                        display: "grid",
                        placeItems: "center",
                        fontWeight: 700,
                        flexShrink: 0,
                    }}
                >
                    {step}
                </Typography>
                <Box>
                    <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        lineHeight={1.3}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.35 }}
                    >
                        {description}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: "grid", gap: 2.25 }}>{children}</Box>
        </Box>
    );
}

function withSavedChoice(options, current, keyOf) {
    if (!current || options.some((option) => keyOf(option) === current)) {
        return options;
    }

    return [...options, current];
}

export function interviewerNames(value) {
    if (Array.isArray(value)) {
        return value.map((name) => String(name).trim()).filter(Boolean);
    }

    if (!value) {
        return [];
    }

    return String(value)
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean);
}

function InterviewerSelect({ id, value, onChange, staff }) {
    const selected = interviewerNames(value);
    const choices = staff.map((person) =>
        typeof person === "string"
            ? { id: `saved-${person}`, name: person }
            : person,
    );

    selected.forEach((name) => {
        if (!choices.some((person) => person.name === name)) {
            choices.push({ id: `saved-${name}`, name });
        }
    });

    return (
        <Select
            id={id}
            multiple
            fullWidth
            displayEmpty
            value={selected}
            onChange={(event) => {
                const next = event.target.value;
                onChange(typeof next === "string" ? next.split(",") : next);
            }}
            renderValue={(chosen) => {
                if (!chosen.length) {
                    return (
                        <Typography
                            component="span"
                            sx={{ color: "text.secondary", fontSize: 14 }}
                        >
                            Select staff
                        </Typography>
                    );
                }

                return chosen.join(", ");
            }}
            sx={selectSx}
        >
            {choices.map((person) => (
                <MenuItem key={person.id} value={person.name}>
                    <Checkbox
                        size="small"
                        checked={selected.includes(person.name)}
                        sx={{ p: 0.5, mr: 1 }}
                    />
                    <ListItemText
                        primary={person.name}
                        slotProps={{
                            primary: { sx: { fontSize: 14 } },
                        }}
                    />
                </MenuItem>
            ))}
        </Select>
    );
}

export default function JobApplyPipelineFields({
    data,
    setData,
    errors,
    branches = [],
    genders = ["Male", "Female"],
    staff = [],
    decisions = [],
    includeProfile = false,
    startStep = 1,
    afterStatus = null,
}) {
    return (
        <>
            <Section
                step={String(startStep)}
                title="Candidate"
                description="Who was reported, which branch, and who coordinated the CV."
            >
                <Box sx={pairSx}>
                    <Box>
                        <FieldLabel htmlFor="service_area" required>
                            Branch
                        </FieldLabel>
                        <Select
                            id="service_area"
                            fullWidth
                            value={data.service_area}
                            onChange={(e) =>
                                setData("service_area", e.target.value)
                            }
                            sx={selectSx}
                        >
                            {branches.map((branch) => (
                                <MenuItem key={branch} value={branch}>
                                    {branch}
                                </MenuItem>
                            ))}
                        </Select>
                        <FieldError>{errors.service_area}</FieldError>
                    </Box>
                    <Box>
                        <FieldLabel htmlFor="name" required>
                            Candidate name
                        </FieldLabel>
                        <TextField
                            id="name"
                            placeholder="Full name"
                            size="small"
                            fullWidth
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            error={Boolean(errors.name)}
                            sx={textFieldSx}
                        />
                        <FieldError>{errors.name}</FieldError>
                    </Box>
                </Box>
                <Box sx={pairSx}>
                    <Box>
                        <FieldLabel htmlFor="cv_reported_date">
                            CV reported date
                        </FieldLabel>
                        <TextField
                            id="cv_reported_date"
                            type="date"
                            size="small"
                            fullWidth
                            value={data.cv_reported_date}
                            onChange={(e) =>
                                setData("cv_reported_date", e.target.value)
                            }
                            error={Boolean(errors.cv_reported_date)}
                            sx={textFieldSx}
                        />
                        <FieldError>{errors.cv_reported_date}</FieldError>
                    </Box>
                    <Box>
                        <FieldLabel htmlFor="coordinated_by">
                            Coordinated by
                        </FieldLabel>
                        <TextField
                            id="coordinated_by"
                            placeholder="Name"
                            size="small"
                            fullWidth
                            value={data.coordinated_by}
                            onChange={(e) =>
                                setData("coordinated_by", e.target.value)
                            }
                            error={Boolean(errors.coordinated_by)}
                            sx={textFieldSx}
                        />
                        <FieldError>{errors.coordinated_by}</FieldError>
                    </Box>
                </Box>
                {includeProfile ? (
                    <Box sx={pairSx}>
                        <Box>
                            <FieldLabel htmlFor="phone">Phone</FieldLabel>
                            <TextField
                                id="phone"
                                placeholder="Optional"
                                size="small"
                                fullWidth
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                error={Boolean(errors.phone)}
                                sx={textFieldSx}
                            />
                            <FieldError>{errors.phone}</FieldError>
                        </Box>
                        <Box>
                            <FieldLabel htmlFor="gender">Gender</FieldLabel>
                            <Select
                                id="gender"
                                fullWidth
                                displayEmpty
                                value={data.gender || ""}
                                onChange={(e) =>
                                    setData("gender", e.target.value)
                                }
                                sx={selectSx}
                            >
                                <MenuItem value="">
                                    <Typography
                                        component="span"
                                        sx={{
                                            color: "text.secondary",
                                            fontSize: 14,
                                        }}
                                    >
                                        Select
                                    </Typography>
                                </MenuItem>
                                {withSavedChoice(
                                    genders,
                                    data.gender,
                                    (gender) => gender,
                                ).map((gender) => (
                                    <MenuItem key={gender} value={gender}>
                                        {gender}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FieldError>{errors.gender}</FieldError>
                        </Box>
                    </Box>
                ) : null}
                {includeProfile ? (
                    <Box sx={{ maxWidth: { sm: "calc(50% - 8px)" } }}>
                        <FieldLabel htmlFor="date_of_birth">
                            Date of birth
                        </FieldLabel>
                        <TextField
                            id="date_of_birth"
                            type="date"
                            size="small"
                            fullWidth
                            value={data.date_of_birth}
                            onChange={(e) =>
                                setData("date_of_birth", e.target.value)
                            }
                            error={Boolean(errors.date_of_birth)}
                            sx={textFieldSx}
                        />
                        <FieldError>{errors.date_of_birth}</FieldError>
                    </Box>
                ) : null}
            </Section>

            <Section
                step={String(startStep + 1)}
                title="Interview"
                description="Date, interviewer, score, and status."
            >
                <Box sx={pairSx}>
                    <Box>
                        <FieldLabel htmlFor="interview_date">
                            Interview date
                        </FieldLabel>
                        <TextField
                            id="interview_date"
                            type="date"
                            size="small"
                            fullWidth
                            value={data.interview_date}
                            onChange={(e) =>
                                setData("interview_date", e.target.value)
                            }
                            error={Boolean(errors.interview_date)}
                            sx={textFieldSx}
                        />
                        <FieldError>{errors.interview_date}</FieldError>
                    </Box>
                    <Box>
                        <FieldLabel htmlFor="interviewed_by">
                            Interviewed by
                        </FieldLabel>
                        <InterviewerSelect
                            id="interviewed_by"
                            value={data.interviewed_by}
                            onChange={(names) =>
                                setData("interviewed_by", names)
                            }
                            staff={staff}
                        />
                        <FieldError>{errors.interviewed_by}</FieldError>
                    </Box>
                </Box>
                <Box sx={{ maxWidth: { sm: "calc(50% - 8px)" } }}>
                    <FieldLabel htmlFor="interview_score">
                        Interview score
                    </FieldLabel>
                    <TextField
                        id="interview_score"
                        type="number"
                        placeholder="0–100"
                        size="small"
                        fullWidth
                        value={data.interview_score}
                        onChange={(e) =>
                            setData("interview_score", e.target.value)
                        }
                        error={Boolean(errors.interview_score)}
                        slotProps={{
                            htmlInput: { min: 0, max: 100 },
                        }}
                        sx={textFieldSx}
                    />
                    <FieldError>{errors.interview_score}</FieldError>
                </Box>
                <Box>
                    <FieldLabel htmlFor="interview_score_note">
                        Interview score note
                    </FieldLabel>
                    <TextField
                        id="interview_score_note"
                        placeholder="How the score was reached, if it needs context"
                        size="small"
                        fullWidth
                        multiline
                        minRows={2}
                        value={data.interview_score_note}
                        onChange={(e) =>
                            setData("interview_score_note", e.target.value)
                        }
                        error={Boolean(errors.interview_score_note)}
                        sx={textFieldSx}
                    />
                    <FieldError>{errors.interview_score_note}</FieldError>
                </Box>
                <Box>
                    <FieldLabel htmlFor="interview_note">
                        Interview note
                    </FieldLabel>
                    <TextField
                        id="interview_note"
                        placeholder="What stood out in the interview"
                        size="small"
                        fullWidth
                        multiline
                        minRows={2}
                        value={data.interview_note}
                        onChange={(e) =>
                            setData("interview_note", e.target.value)
                        }
                        error={Boolean(errors.interview_note)}
                        sx={textFieldSx}
                    />
                    <FieldError>{errors.interview_note}</FieldError>
                </Box>
                <Box>
                    <FieldLabel required>Status</FieldLabel>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                        }}
                    >
                        {decisions.map((decision) => {
                            const selected = data.decision === decision;

                            return (
                                <Button
                                    key={decision}
                                    type="button"
                                    size="small"
                                    variant={
                                        selected ? "contained" : "outlined"
                                    }
                                    onClick={() =>
                                        setData("decision", decision)
                                    }
                                    sx={{ minWidth: 118 }}
                                >
                                    {decisionLabel[decision] || decision}
                                </Button>
                            );
                        })}
                    </Box>
                    <FieldError>{errors.decision}</FieldError>
                </Box>
                {afterStatus}
            </Section>

            <Section
                step={String(startStep + 2)}
                title="Training"
                description="Five-day training, once the candidate is taken forward."
            >
                <Box sx={{ maxWidth: { sm: "calc(50% - 8px)" } }}>
                    <FieldLabel htmlFor="training_start_date">
                        5-day training start date
                    </FieldLabel>
                    <TextField
                        id="training_start_date"
                        type="date"
                        size="small"
                        fullWidth
                        value={data.training_start_date}
                        onChange={(e) =>
                            setData("training_start_date", e.target.value)
                        }
                        error={Boolean(errors.training_start_date)}
                        sx={textFieldSx}
                    />
                    <FieldError>{errors.training_start_date}</FieldError>
                </Box>
                <Box>
                    <FieldLabel htmlFor="training_note">
                        Training note
                    </FieldLabel>
                    <TextField
                        id="training_note"
                        placeholder="Attendance, progress, or concerns"
                        size="small"
                        fullWidth
                        multiline
                        minRows={2}
                        value={data.training_note}
                        onChange={(e) =>
                            setData("training_note", e.target.value)
                        }
                        error={Boolean(errors.training_note)}
                        sx={textFieldSx}
                    />
                    <FieldError>{errors.training_note}</FieldError>
                </Box>
            </Section>

            <Section
                step={String(startStep + 3)}
                title="Assessment"
                description="Result after training."
            >
                <Box sx={pairSx}>
                    <Box>
                        <FieldLabel htmlFor="assessment_date">
                            Assessment date
                        </FieldLabel>
                        <TextField
                            id="assessment_date"
                            type="date"
                            size="small"
                            fullWidth
                            value={data.assessment_date}
                            onChange={(e) =>
                                setData("assessment_date", e.target.value)
                            }
                            error={Boolean(errors.assessment_date)}
                            sx={textFieldSx}
                        />
                        <FieldError>{errors.assessment_date}</FieldError>
                    </Box>
                    <Box>
                        <FieldLabel htmlFor="assessment_score">
                            Assessment score
                        </FieldLabel>
                        <TextField
                            id="assessment_score"
                            placeholder="Score or result"
                            size="small"
                            fullWidth
                            value={data.assessment_score}
                            onChange={(e) =>
                                setData("assessment_score", e.target.value)
                            }
                            error={Boolean(errors.assessment_score)}
                            sx={textFieldSx}
                        />
                        <FieldError>{errors.assessment_score}</FieldError>
                    </Box>
                </Box>
                <Box>
                    <FieldLabel htmlFor="assessment_note">
                        Assessment note
                    </FieldLabel>
                    <TextField
                        id="assessment_note"
                        placeholder="What the assessment showed"
                        size="small"
                        fullWidth
                        multiline
                        minRows={2}
                        value={data.assessment_note}
                        onChange={(e) =>
                            setData("assessment_note", e.target.value)
                        }
                        error={Boolean(errors.assessment_note)}
                        sx={textFieldSx}
                    />
                    <FieldError>{errors.assessment_note}</FieldError>
                </Box>
            </Section>

            <Section
                step={String(startStep + 4)}
                title="Notes"
                description="Anything else that should stay on this record."
            >
                <Box>
                    <FieldLabel htmlFor="notes">Additional notes</FieldLabel>
                    <TextField
                        id="notes"
                        placeholder="Optional"
                        size="small"
                        fullWidth
                        multiline
                        minRows={3}
                        value={data.notes}
                        onChange={(e) => setData("notes", e.target.value)}
                        error={Boolean(errors.notes)}
                        sx={textFieldSx}
                    />
                    <FieldError>{errors.notes}</FieldError>
                </Box>
            </Section>
        </>
    );
}
