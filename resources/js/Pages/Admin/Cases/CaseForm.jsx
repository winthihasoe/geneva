import AdminLayout from "@/Layouts/AdminLayout";
import BackButton from "@/Components/BackButton";
import CasePatientPanel from "@/Pages/Admin/Cases/components/CasePatientPanel";
import { careTypeLabel } from "@/utils/careTypeLabel";
import { Head, useForm } from "@inertiajs/react";
import {
    Box,
    Button,
    Checkbox,
    Container,
    ListItemText,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";

const statusLabel = {
    open: "Open",
    cv_sent: "CV sent",
    interviewing: "Interviewing",
    confirmed: "Confirmed",
    on_duty: "On duty",
    cancelled: "Cancelled",
};

const emptyRecord = {
    branch: "Yangon",
    inquiry_at: "",
    inquiry_note: "",
    care_type: "",
    name: "",
    address: "",
    phone: "",
    requested_start: "",
    requested_start_date: "",
    duration: "",
    level: "",
    duty_type: "",
    cv_sent_at: "",
    cv_sent_note: "",
    client_response: "",
    interview_date: "",
    interview_note: "",
    confirm_date: "",
    confirm_note: "",
    deposit_note: "",
    duty_start_date: "",
    duty_start_note: "",
    status: "open",
    notes: "",
};

const textFieldSx = {
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

const selectSx = {
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

function FieldLabel({ htmlFor, children, required = false }) {
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

function FieldError({ children }) {
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

const levelsDefault = ["Skilled", "Advanced", "Special Nurse"];
const dutyTypesDefault = ["Day", "Night", "Day & Night", "24hr"];

function levelNames(value) {
    const names = Array.isArray(value)
        ? value
        : String(value || "")
              .split(",")
              .map((name) => name.trim())
              .filter(Boolean);

    const unique = [...new Set(names.map((name) => String(name).trim()))].filter(
        Boolean,
    );

    return [
        ...levelsDefault.filter((level) => unique.includes(level)),
        ...unique.filter((level) => !levelsDefault.includes(level)),
    ];
}

export default function CaseForm({
    record = null,
    branches = [],
    careTypes = [],
    levels = levelsDefault,
    dutyTypes = dutyTypesDefault,
    statuses = [],
    matchingPatients = [],
}) {
    const isEdit = Boolean(record?.id);
    const { data, setData, post, put, processing, errors } = useForm({
        ...emptyRecord,
        ...(record || {}),
        level: levelNames(record?.level),
    });
    const selectedLevels = levelNames(data.level);
    const levelOptions = [
        ...levels,
        ...selectedLevels.filter((level) => !levels.includes(level)),
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route("admin.cases.update", record.id));
        } else {
            post(route("admin.cases.store"));
        }
    };

    return (
        <AdminLayout>
            <Head title={isEdit ? "Edit case" : "Add case"} />
            <Container maxWidth="md" sx={{ px: { xs: 0 }, mb: 6 }}>
                <BackButton route={route("admin.cases.index")} label="Cases" />
                <Box sx={{ maxWidth: 720, mx: "auto" }}>
                    <Typography
                        fontSize={{ xs: 22, sm: 26 }}
                        fontWeight={600}
                        fontFamily="Livvic"
                        color="text.primary"
                    >
                        {isEdit ? "Edit case" : "Add new case"}
                    </Typography>

                    <CasePatientPanel
                        record={record}
                        matchingPatients={matchingPatients}
                    />

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        autoComplete="off"
                    >
                        <Section
                            step="1"
                            title="Client"
                            description="Who inquired, which branch, and how to reach them."
                        >
                            <Box sx={pairSx}>
                                <Box>
                                    <FieldLabel htmlFor="branch" required>
                                        Branch
                                    </FieldLabel>
                                    <Select
                                        id="branch"
                                        fullWidth
                                        value={data.branch}
                                        onChange={(e) =>
                                            setData("branch", e.target.value)
                                        }
                                        sx={selectSx}
                                    >
                                        {branches.map((branch) => (
                                            <MenuItem
                                                key={branch}
                                                value={branch}
                                            >
                                                {branch}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FieldError>{errors.branch}</FieldError>
                                </Box>
                                <Box>
                                    <FieldLabel htmlFor="care_type">
                                        Care type
                                    </FieldLabel>
                                    <Select
                                        id="care_type"
                                        fullWidth
                                        displayEmpty
                                        value={data.care_type}
                                        onChange={(e) =>
                                            setData("care_type", e.target.value)
                                        }
                                        sx={selectSx}
                                    >
                                        <MenuItem value="">Not set</MenuItem>
                                        {careTypes.map((type) => (
                                            <MenuItem key={type} value={type}>
                                                {careTypeLabel(type) || type}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FieldError>{errors.care_type}</FieldError>
                                </Box>
                            </Box>
                            <Box sx={pairSx}>
                                <Box>
                                    <FieldLabel htmlFor="name" required>
                                        Name
                                    </FieldLabel>
                                    <TextField
                                        id="name"
                                        placeholder="Client or patient name"
                                        size="small"
                                        fullWidth
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        error={Boolean(errors.name)}
                                        sx={textFieldSx}
                                    />
                                    <FieldError>{errors.name}</FieldError>
                                </Box>
                                <Box>
                                    <FieldLabel htmlFor="phone">
                                        Phone
                                    </FieldLabel>
                                    <TextField
                                        id="phone"
                                        placeholder="Phone number"
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
                            </Box>
                            <Box>
                                <FieldLabel htmlFor="address">
                                    Address
                                </FieldLabel>
                                <TextField
                                    id="address"
                                    placeholder="Where care is needed"
                                    size="small"
                                    fullWidth
                                    multiline
                                    minRows={2}
                                    value={data.address}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                    error={Boolean(errors.address)}
                                    sx={textFieldSx}
                                />
                                <FieldError>{errors.address}</FieldError>
                            </Box>
                        </Section>

                        <Section
                            step="2"
                            title="Inquiry"
                            description="When they called, and the care they asked for."
                        >
                            <Box sx={{ maxWidth: { sm: "calc(50% - 8px)" } }}>
                                <FieldLabel htmlFor="inquiry_at">
                                    Inquiry date and time
                                </FieldLabel>
                                <TextField
                                    id="inquiry_at"
                                    type="datetime-local"
                                    size="small"
                                    fullWidth
                                    value={data.inquiry_at}
                                    onChange={(e) =>
                                        setData("inquiry_at", e.target.value)
                                    }
                                    error={Boolean(errors.inquiry_at)}
                                    sx={textFieldSx}
                                />
                                <FieldError>{errors.inquiry_at}</FieldError>
                            </Box>
                            <Box>
                                <FieldLabel htmlFor="inquiry_note">
                                    Inquiry note
                                </FieldLabel>
                                <TextField
                                    id="inquiry_note"
                                    placeholder="What they asked for on the call"
                                    size="small"
                                    fullWidth
                                    multiline
                                    minRows={2}
                                    value={data.inquiry_note}
                                    onChange={(e) =>
                                        setData("inquiry_note", e.target.value)
                                    }
                                    error={Boolean(errors.inquiry_note)}
                                    sx={textFieldSx}
                                />
                                <FieldError>{errors.inquiry_note}</FieldError>
                            </Box>
                            <Box sx={pairSx}>
                                <Box>
                                    <FieldLabel htmlFor="requested_start">
                                        Requested start
                                    </FieldLabel>
                                    <TextField
                                        id="requested_start"
                                        placeholder="As soon as possible, next week"
                                        size="small"
                                        fullWidth
                                        value={data.requested_start}
                                        onChange={(e) =>
                                            setData(
                                                "requested_start",
                                                e.target.value,
                                            )
                                        }
                                        error={Boolean(errors.requested_start)}
                                        sx={textFieldSx}
                                    />
                                    <FieldError>
                                        {errors.requested_start}
                                    </FieldError>
                                </Box>
                                <Box>
                                    <FieldLabel htmlFor="requested_start_date">
                                        Requested start date
                                    </FieldLabel>
                                    <TextField
                                        id="requested_start_date"
                                        type="date"
                                        size="small"
                                        fullWidth
                                        value={data.requested_start_date}
                                        onChange={(e) =>
                                            setData(
                                                "requested_start_date",
                                                e.target.value,
                                            )
                                        }
                                        error={Boolean(
                                            errors.requested_start_date,
                                        )}
                                        sx={textFieldSx}
                                    />
                                    <FieldError>
                                        {errors.requested_start_date}
                                    </FieldError>
                                </Box>
                            </Box>
                            <Box sx={pairSx}>
                                <Box>
                                    <FieldLabel htmlFor="duration">
                                        Duration
                                    </FieldLabel>
                                    <TextField
                                        id="duration"
                                        placeholder="1 month, long term"
                                        size="small"
                                        fullWidth
                                        value={data.duration}
                                        onChange={(e) =>
                                            setData("duration", e.target.value)
                                        }
                                        error={Boolean(errors.duration)}
                                        sx={textFieldSx}
                                    />
                                    <FieldError>{errors.duration}</FieldError>
                                </Box>
                                <Box>
                                    <FieldLabel htmlFor="level">
                                        Level
                                    </FieldLabel>
                                    <Select
                                        id="level"
                                        multiple
                                        fullWidth
                                        displayEmpty
                                        value={selectedLevels}
                                        onChange={(e) => {
                                            const next = e.target.value;
                                            setData(
                                                "level",
                                                levelNames(
                                                    typeof next === "string"
                                                        ? next.split(",")
                                                        : next,
                                                ),
                                            );
                                        }}
                                        renderValue={(chosen) => {
                                            if (!chosen.length) {
                                                return (
                                                    <Typography
                                                        component="span"
                                                        sx={{
                                                            color: "text.secondary",
                                                            fontSize: 14,
                                                        }}
                                                    >
                                                        Not set
                                                    </Typography>
                                                );
                                            }

                                            return chosen.join(", ");
                                        }}
                                        sx={selectSx}
                                    >
                                        {levelOptions.map((level) => (
                                            <MenuItem key={level} value={level}>
                                                <Checkbox
                                                    size="small"
                                                    checked={selectedLevels.includes(
                                                        level,
                                                    )}
                                                    sx={{ p: 0.5, mr: 1 }}
                                                />
                                                <ListItemText
                                                    primary={level}
                                                    slotProps={{
                                                        primary: {
                                                            sx: { fontSize: 14 },
                                                        },
                                                    }}
                                                />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FieldError>{errors.level}</FieldError>
                                </Box>
                            </Box>
                            <Box sx={{ maxWidth: { sm: "calc(50% - 8px)" } }}>
                                <FieldLabel htmlFor="duty_type">
                                    Duty type
                                </FieldLabel>
                                <Select
                                    id="duty_type"
                                    fullWidth
                                    displayEmpty
                                    value={data.duty_type}
                                    onChange={(e) =>
                                        setData("duty_type", e.target.value)
                                    }
                                    sx={selectSx}
                                >
                                    <MenuItem value="">Not set</MenuItem>
                                    {dutyTypes.map((dutyType) => (
                                        <MenuItem key={dutyType} value={dutyType}>
                                            {dutyType}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FieldError>{errors.duty_type}</FieldError>
                            </Box>
                        </Section>

                        <Section
                            step="3"
                            title="CV"
                            description="When a CV was sent, and how the client replied."
                        >
                            <Box sx={{ maxWidth: { sm: "calc(50% - 8px)" } }}>
                                <FieldLabel htmlFor="cv_sent_at">
                                    CV sent at
                                </FieldLabel>
                                <TextField
                                    id="cv_sent_at"
                                    type="datetime-local"
                                    size="small"
                                    fullWidth
                                    value={data.cv_sent_at}
                                    onChange={(e) =>
                                        setData("cv_sent_at", e.target.value)
                                    }
                                    error={Boolean(errors.cv_sent_at)}
                                    sx={textFieldSx}
                                />
                                <FieldError>{errors.cv_sent_at}</FieldError>
                            </Box>
                            <Box>
                                <FieldLabel htmlFor="cv_sent_note">
                                    CV sent note
                                </FieldLabel>
                                <TextField
                                    id="cv_sent_note"
                                    placeholder="Which CV was sent, and to whom"
                                    size="small"
                                    fullWidth
                                    multiline
                                    minRows={2}
                                    value={data.cv_sent_note}
                                    onChange={(e) =>
                                        setData("cv_sent_note", e.target.value)
                                    }
                                    error={Boolean(errors.cv_sent_note)}
                                    sx={textFieldSx}
                                />
                                <FieldError>{errors.cv_sent_note}</FieldError>
                            </Box>
                            <Box>
                                <FieldLabel htmlFor="client_response">
                                    Client response
                                </FieldLabel>
                                <TextField
                                    id="client_response"
                                    placeholder="What the client said after seeing the CV"
                                    size="small"
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    value={data.client_response}
                                    onChange={(e) =>
                                        setData(
                                            "client_response",
                                            e.target.value,
                                        )
                                    }
                                    error={Boolean(errors.client_response)}
                                    sx={textFieldSx}
                                />
                                <FieldError>
                                    {errors.client_response}
                                </FieldError>
                            </Box>
                        </Section>

                        <Section
                            step="4"
                            title="Interview"
                            description="Interview date and what was discussed."
                        >
                            <Box sx={{ maxWidth: { sm: "calc(50% - 8px)" } }}>
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
                                        setData(
                                            "interview_date",
                                            e.target.value,
                                        )
                                    }
                                    error={Boolean(errors.interview_date)}
                                    sx={textFieldSx}
                                />
                                <FieldError>{errors.interview_date}</FieldError>
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
                                        setData(
                                            "interview_note",
                                            e.target.value,
                                        )
                                    }
                                    error={Boolean(errors.interview_note)}
                                    sx={textFieldSx}
                                />
                                <FieldError>{errors.interview_note}</FieldError>
                            </Box>
                        </Section>

                        <Section
                            step="5"
                            title="Confirmation"
                            description="Confirmation date, what was agreed, and the deposit."
                        >
                            <Box sx={{ maxWidth: { sm: "calc(50% - 8px)" } }}>
                                <FieldLabel htmlFor="confirm_date">
                                    Confirm date
                                </FieldLabel>
                                <TextField
                                    id="confirm_date"
                                    type="date"
                                    size="small"
                                    fullWidth
                                    value={data.confirm_date}
                                    onChange={(e) =>
                                        setData("confirm_date", e.target.value)
                                    }
                                    error={Boolean(errors.confirm_date)}
                                    sx={textFieldSx}
                                />
                                <FieldError>{errors.confirm_date}</FieldError>
                            </Box>
                            <Box>
                                <FieldLabel htmlFor="confirm_note">
                                    Confirm note
                                </FieldLabel>
                                <TextField
                                    id="confirm_note"
                                    placeholder="What was confirmed"
                                    size="small"
                                    fullWidth
                                    multiline
                                    minRows={2}
                                    value={data.confirm_note}
                                    onChange={(e) =>
                                        setData("confirm_note", e.target.value)
                                    }
                                    error={Boolean(errors.confirm_note)}
                                    sx={textFieldSx}
                                />
                                <FieldError>{errors.confirm_note}</FieldError>
                            </Box>
                            <Box>
                                <FieldLabel htmlFor="deposit_note">
                                    Deposit
                                </FieldLabel>
                                <TextField
                                    id="deposit_note"
                                    placeholder="Amount, date, or payment note"
                                    size="small"
                                    fullWidth
                                    multiline
                                    minRows={2}
                                    value={data.deposit_note}
                                    onChange={(e) =>
                                        setData("deposit_note", e.target.value)
                                    }
                                    error={Boolean(errors.deposit_note)}
                                    sx={textFieldSx}
                                />
                                <FieldError>{errors.deposit_note}</FieldError>
                            </Box>
                        </Section>

                        <Section
                            step="6"
                            title="Duty"
                            description="When the caregiver starts duty."
                        >
                            <Box sx={{ maxWidth: { sm: "calc(50% - 8px)" } }}>
                                <FieldLabel htmlFor="duty_start_date">
                                    Duty start date
                                </FieldLabel>
                                <TextField
                                    id="duty_start_date"
                                    type="date"
                                    size="small"
                                    fullWidth
                                    value={data.duty_start_date}
                                    onChange={(e) =>
                                        setData(
                                            "duty_start_date",
                                            e.target.value,
                                        )
                                    }
                                    error={Boolean(errors.duty_start_date)}
                                    sx={textFieldSx}
                                />
                                <FieldError>
                                    {errors.duty_start_date}
                                </FieldError>
                            </Box>
                            <Box>
                                <FieldLabel htmlFor="duty_start_note">
                                    Duty start note
                                </FieldLabel>
                                <TextField
                                    id="duty_start_note"
                                    placeholder="Shift, handover, or start details"
                                    size="small"
                                    fullWidth
                                    multiline
                                    minRows={2}
                                    value={data.duty_start_note}
                                    onChange={(e) =>
                                        setData(
                                            "duty_start_note",
                                            e.target.value,
                                        )
                                    }
                                    error={Boolean(errors.duty_start_note)}
                                    sx={textFieldSx}
                                />
                                <FieldError>
                                    {errors.duty_start_note}
                                </FieldError>
                            </Box>
                        </Section>

                        <Section
                            step="7"
                            title="Status and notes"
                            description="Where the case is now, and anything else that should stay on the record."
                        >
                            <Box>
                                <FieldLabel required>Status</FieldLabel>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 1,
                                    }}
                                >
                                    {statuses.map((status) => {
                                        const selected = data.status === status;

                                        return (
                                            <Button
                                                key={status}
                                                type="button"
                                                size="small"
                                                variant={
                                                    selected
                                                        ? "contained"
                                                        : "outlined"
                                                }
                                                onClick={() =>
                                                    setData("status", status)
                                                }
                                                sx={{ minWidth: 108 }}
                                            >
                                                {statusLabel[status] || status}
                                            </Button>
                                        );
                                    })}
                                </Box>
                                <FieldError>{errors.status}</FieldError>
                            </Box>
                            <Box>
                                <FieldLabel htmlFor="notes">
                                    Additional notes
                                </FieldLabel>
                                <TextField
                                    id="notes"
                                    placeholder="Optional"
                                    size="small"
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    value={data.notes}
                                    onChange={(e) =>
                                        setData("notes", e.target.value)
                                    }
                                    error={Boolean(errors.notes)}
                                    sx={textFieldSx}
                                />
                                <FieldError>{errors.notes}</FieldError>
                            </Box>
                        </Section>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: {
                                    xs: "stretch",
                                    sm: "flex-end",
                                },
                                pt: 3,
                                borderTop: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={processing}
                                sx={{
                                    width: { xs: "100%", sm: "auto" },
                                    minWidth: { sm: 180 },
                                }}
                            >
                                {isEdit ? "Save changes" : "Save case"}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </AdminLayout>
    );
}
