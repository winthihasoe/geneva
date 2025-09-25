import { Box, Button, Container } from "@mui/material";
import React from "react";
import CaregiverCardMini from "./CaregiverCardMini";
import NoData from "../util/NoData";
import { router } from "@inertiajs/react";

function CVdisplay({ CVs }) {
    return (
        <Container maxWidth="lg" sx={{ padding: 0 }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    alignItems: "center",
                    bgcolor: "grey.100",
                    my: 5,
                    borderRadius: 5,
                    py: 6,
                    px: 4,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    {CVs && CVs.length > 0 ? (
                        CVs.map((cv, index) => (
                            <CaregiverCardMini key={index} cv={cv} />
                        ))
                    ) : (
                        <NoData />
                    )}
                </Box>
                <Button
                    onClick={() => router.get(route("job.apply"))}
                    size="medium"
                    variant="contained"
                    color="secondary"
                >
                    Apply Job
                </Button>
            </Box>
        </Container>
    );
}

export default CVdisplay;
