import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import ApplyForm from "./components/ApplyForm";
import { Container, Grid2 } from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle";
import Noodle from "@/Components/Fancy/Noodle";
import ThreeLeaves from "@/Components/Fancy/ThreeLeaves";

function JobApply() {
    const { data, setData, errors, setError, post } = useForm({
        name: "",
        date_of_birth: "",
        gender: "",
        height: "",
        weight: "",
        ethnicity: "",
        religion: "",
        email: "",
        viber: "",
        current_address: "",
        service_area: "",
        available_townships: [], // Multiple selection
        experience: "",
        language: "",
        certificate_details: "",
        certificates: [], // Multiple files
        passport: null, // Identification file
        visa: null, // Family membership file
    });

    console.log("apply form data", data);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Submit the form with files
        post(route("job.apply.store"), {
            data,
            onError: (errors) => {
                setError(errors);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Job Apply" />

            <Grid2 container>
                <Grid2
                    size={12}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        py: 2,
                        m: 1,
                        position: "relative",
                    }}
                >
                    <ApplyForm
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        errors={errors}
                    />
                </Grid2>
            </Grid2>
        </AppLayout>
    );
}

export default JobApply;
