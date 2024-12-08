import ElderCareWalking from "@/Components/Fancy/ElderCareWalking";
import PhoneVerification from "@/Components/util/PhoneVerification";
import { CarePlanContext } from "@/Context/CarePlanContext";
import { Box, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";

const Label = ({ children }) => {
    return (
        <Typography
            sx={{
                fontFamily: "Madimi One",
                color: "primary.main",
                fontSize: { xs: 15, sm: 17, md: 20 },
            }}
        >
            {children}
        </Typography>
    );
};

function ContactInfo() {
    const { carePlanData, updateNestedField } = useContext(CarePlanContext);
    return (
        <Box position={"relative"}>
            <Typography
                sx={{
                    fontFamily: "Kavoon",
                    textAlign: "center",
                    color: "primary.main",
                    fontWeight: 400,
                    fontSize: { xs: 20, sm: 25 },
                }}
            >
                Info of primary contact person
            </Typography>

            <Box sx={{ my: 3, maxWidth: 500 }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 3,
                    }}
                >
                    <Label>Name</Label>
                    <TextField
                        sx={{
                            bgcolor: "#f5f5f5",
                            borderRadius: 20,
                            px: 2,
                            width: 250,
                            border: "1px solid",
                            borderColor: "primary.main",
                        }}
                        value={carePlanData.contact_info.name}
                        onChange={(e) =>
                            updateNestedField(
                                "contact_info",
                                "name",
                                e.target.value
                            )
                        }
                    />
                </Box>
            </Box>
            <Box sx={{ my: 3, maxWidth: 500 }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 3,
                    }}
                >
                    <Label>Relationship to elderly</Label>
                    <TextField
                        sx={{
                            bgcolor: "#f5f5f5",
                            borderRadius: 20,
                            px: 2,
                            width: 250,
                            border: "1px solid",
                            borderColor: "primary.main",
                        }}
                        value={carePlanData.contact_info.relationship}
                        onChange={(e) =>
                            updateNestedField(
                                "contact_info",
                                "relationship",
                                e.target.value
                            )
                        }
                    />
                </Box>
            </Box>

            <Box sx={{ my: 3, maxWidth: 500 }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 3,
                    }}
                >
                    <Label>Phone Number</Label>
                    <TextField
                        sx={{
                            bgcolor: "#f5f5f5",
                            borderRadius: 20,
                            px: 2,
                            width: 250,
                            border: "1px solid",
                            borderColor: "primary.main",
                        }}
                        value={carePlanData.contact_info.phone_number}
                        onChange={(e) =>
                            updateNestedField(
                                "contact_info",
                                "phone_number",
                                e.target.value
                            )
                        }
                    />
                </Box>
            </Box>

            <Box sx={{ my: 3, maxWidth: 500 }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 3,
                    }}
                >
                    <Label>Email</Label>
                    <TextField
                        sx={{
                            bgcolor: "#f5f5f5",
                            borderRadius: 20,
                            px: 2,
                            width: 250,
                            border: "1px solid",
                            borderColor: "primary.main",
                        }}
                        value={carePlanData.contact_info.email}
                    />
                </Box>
            </Box>
            <Box sx={{ my: 3, maxWidth: 500 }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 3,
                    }}
                >
                    <Label>Line ID</Label>
                    <TextField
                        sx={{
                            bgcolor: "#f5f5f5",
                            borderRadius: 20,
                            px: 2,
                            width: 250,
                            border: "1px solid",
                            borderColor: "primary.main",
                        }}
                        value={carePlanData.contact_info.line_id}
                        onChange={(e) =>
                            updateNestedField(
                                "contact_info",
                                "line_id",
                                e.target.value
                            )
                        }
                    />
                </Box>
            </Box>

            <ElderCareWalking bottom={-60} right={150} />
        </Box>
    );
}

export default ContactInfo;
