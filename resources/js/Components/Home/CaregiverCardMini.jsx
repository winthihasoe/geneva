import { Box, Button, Typography } from "@mui/material";
import React from "react";

function CaregiverCardMini() {
    return (
        <Box pl={9}>
            <Box
                sx={{
                    width: 250,
                    bgcolor: "white",
                    borderRadius: 5,
                    position: "relative",
                    m: 2,
                    p: 1,
                }}
            >
                <img
                    src="/images/caregivers/cg_sample1.jpeg"
                    alt="Caretiver photo"
                    style={{
                        width: 130,
                        height: 130,
                        borderRadius: "50%",
                        position: "absolute",
                        left: -80,
                        backgroundColor: "white",
                        padding: "8px",
                    }}
                />
                <Box pl={6}>
                    <Typography
                        fontSize={16}
                        fontFamily={"ADLaM Display"}
                        mb={1}
                    >
                        Hla May Oo
                    </Typography>
                    <Typography
                        fontSize={12}
                        fontFamily={"Actor"}
                        fontWeight={400}
                    >
                        Age: 25 years old
                    </Typography>
                    <Typography fontSize={12} fontFamily={"Actor"}>
                        Nationality: Myanmar
                    </Typography>
                    <Typography fontSize={12} fontFamily={"Actor"}>
                        Experience: 3 years
                    </Typography>
                    <Typography fontSize={12} fontFamily={"Actor"}>
                        Language: Myanmar/Thai/English
                    </Typography>
                    <Typography
                        fontSize={12}
                        color="primary"
                        fontFamily={"Actor"}
                    >
                        ID: 32450
                    </Typography>
                </Box>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ borderRadius: 20, px: 2, mt: 1 }}
                >
                    <Typography
                        fontSize={14}
                        fontFamily={"Actor"}
                        fontWeight={"bold"}
                    >
                        Book an interview
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
}

export default CaregiverCardMini;
