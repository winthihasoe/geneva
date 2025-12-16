import { Box, Typography } from "@mui/material";
import React from "react";
import { useForm } from "@inertiajs/react";
import ExperienceForm from "@/Pages/Experience/components/ExperienceForm";

function StepSeven() {
    const { data, setData, post, setError } = useForm({
        experience: "",
        detail: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("experience.store"), {
            onError: (errors) => {
                setError(errors);
            },
            onSuccess: () => {
                setData({
                    experience: "",
                    detail: "",
                });
            },
        });
    };

    return (
        <Box>
            {/* <ExperienceForm
                data={data}
                setData={setData}
                handleSubmit={handleSubmit}
            /> */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    height: 300,
                }}
            >
                <Typography textAlign={"center"} variant="h6" sx={{ mb: 2 }}>
                    Experiences can be added after creating CV.
                </Typography>
                <Typography
                    textAlign={"center"}
                    variant="body2"
                    color="text.secondary"
                >
                    Please proceed to the next step.
                </Typography>
            </Box>
        </Box>
    );
}

export default StepSeven;
