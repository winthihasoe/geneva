import React from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import { Head, useForm } from "@inertiajs/react";
import FeedingForm from "./components/FeedingForm";
import DiaperChangesForm from "./components/DiaperChangesForm";
import SleepForm from "./components/SleepForm";
import ActivitiesForm from "./components/ActivitiesForm";
import HygieneGroomingForm from "./components/HygieneGroomingForm";
import HealthBehaviorForm from "./components/HealthBehaviorForm";
import AdditionalNotesForm from "./components/AdditionalNotesForm";
import RequestedSuppliesForm from "./components/RequestedSuppliesForm";
import AppLayout from "@/Layouts/AppLayout";
import TitleCenter from "@/Components/Typo/TitleCenter";

const NewbornCareLogForm = () => {
    const { data, setData, post, processing, errors } = useForm({
        patient_id: "", // Example patient ID
        log_date: new Date().toISOString().slice(0, 10), // Default to today
        feeding: [],
        diaper_changes: [],
        sleep: [],
        activities: [],
        hygiene_grooming: [],
        mood_behavior: "",
        symptoms: "",
        medications: "",
        additional_notes: "",
        requested_supplies: [],
        parent_signature: "",
        parent_comment: "",
        nanny_signature: "",
        nanny_name: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("newborn.careLog.store")); // Post request to your route
    };

    const updateField = (key, value) => {
        setData(key, value);
    };

    console.log("newborn log form", data);

    return (
        <AppLayout>
            <Head title="Newborn Care log form" />
            <Box sx={{ padding: 2, maxWidth: 600, margin: "auto" }}>
                <TitleCenter>Newborn Daily Care Log</TitleCenter>

                <form onSubmit={handleSubmit}>
                    {/* Feeding Form */}
                    <FeedingForm
                        data={data.feeding}
                        setData={(value) => updateField("feeding", value)}
                        errors={errors.feeding}
                    />

                    <Divider sx={{ my: 2 }} />

                    {/* Diaper Changes Form */}
                    <DiaperChangesForm
                        data={data.diaper_changes}
                        setData={(value) =>
                            updateField("diaper_changes", value)
                        }
                        errors={errors.diaper_changes}
                    />

                    <Divider sx={{ my: 2 }} />

                    {/* Sleep Form */}
                    <SleepForm
                        data={data.sleep}
                        setData={(value) => updateField("sleep", value)}
                        errors={errors.sleep}
                    />

                    <Divider sx={{ my: 2 }} />

                    {/* Activities Form */}
                    <ActivitiesForm
                        data={data.activities}
                        setData={(value) => updateField("activities", value)}
                        errors={errors.activities}
                    />

                    <Divider sx={{ my: 2 }} />

                    {/* Hygiene & Grooming Form */}
                    <HygieneGroomingForm
                        data={data.hygiene_grooming}
                        setData={(value) =>
                            updateField("hygiene_grooming", value)
                        }
                        errors={errors.hygiene_grooming}
                    />

                    <Divider sx={{ my: 2 }} />

                    {/* Health & Behavior Form */}
                    <HealthBehaviorForm
                        moodBehavior={data.mood_behavior}
                        setMoodBehavior={(value) =>
                            updateField("mood_behavior", value)
                        }
                        symptoms={data.symptoms}
                        setSymptoms={(value) => updateField("symptoms", value)}
                        medications={data.medications}
                        setMedications={(value) =>
                            updateField("medications", value)
                        }
                        errors={{
                            mood_behavior: errors.mood_behavior,
                            symptoms: errors.symptoms,
                            medications: errors.medications,
                        }}
                    />

                    <Divider sx={{ my: 2 }} />

                    {/* Additional Notes Form */}
                    <AdditionalNotesForm
                        data={data.additional_notes}
                        setData={(value) =>
                            updateField("additional_notes", value)
                        }
                        errors={errors.additional_notes}
                    />

                    <Divider sx={{ my: 2 }} />

                    {/* Requested Supplies Form */}
                    <RequestedSuppliesForm
                        data={data.requested_supplies}
                        setData={(value) =>
                            updateField("requested_supplies", value)
                        }
                        errors={errors.requested_supplies}
                    />

                    <Box sx={{ textAlign: "center", marginTop: 3 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={processing}
                        >
                            Submit Care Log
                        </Button>
                    </Box>
                </form>
            </Box>
        </AppLayout>
    );
};

export default NewbornCareLogForm;
