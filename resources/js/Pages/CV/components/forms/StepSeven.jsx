import { Box } from "@mui/material";
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
            <ExperienceForm
                data={data}
                setData={setData}
                handleSubmit={handleSubmit}
            />
        </Box>
    );
}

export default StepSeven;
