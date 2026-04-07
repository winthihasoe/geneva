import React, { useMemo } from "react";
import { Head, usePage } from "@inertiajs/react";
import GuestCareLogLayout from "@/Layouts/GuestCareLogLayout";
import { Alert, Box, Typography } from "@mui/material";
import NewbornCareLogs from "@/Pages/Caregiver/CareLogs/NewbornCareLog/NewbornCareLogs";
import BabyCareLogs from "@/Pages/Caregiver/CareLogs/BabyCareLog/BabyCareLogs";
import MaternalCareLogs from "@/Pages/Caregiver/CareLogs/MaternalCareLog/MaternalCareLogs";
import ElderlyCareLogs from "@/Pages/Caregiver/CareLogs/ElderlyCareLog/ElderlyCareLogs";

export default function PublicCareLogFill() {
    const { props } = usePage();
    const {
        uuid,
        careType,
        caregiverName,
        patient,
        flash = {},
    } = props;

    const submitUrl = route("public.care-log.store", { uuid });
    const historyUrl = route("public.care-log.history", { uuid });

    const lastCareLog = null;
    const patientPrefill = useMemo(() => {
        if (!patient) {
            return null;
        }
        return {
            firstName: patient.first_name || "",
            lastName: patient.last_name || "",
            age: patient.age_display ?? "",
            date: new Date().toISOString().split("T")[0],
        };
    }, [patient]);

    const formProps = {
        caregiverName,
        lastCareLog,
        isPublic: true,
        lockPatientDemographics: true,
        submitUrl,
        historyUrl,
        initialPatientPrefill: patientPrefill,
    };

    let form = null;
    switch (careType) {
        case "newborn":
            form = <NewbornCareLogs {...formProps} />;
            break;
        case "baby":
            form = <BabyCareLogs {...formProps} />;
            break;
        case "maternal":
            form = <MaternalCareLogs {...formProps} />;
            break;
        case "elder":
            form = <ElderlyCareLogs {...formProps} />;
            break;
        default:
            form = (
                <Typography color="error">
                    Unsupported care type for this patient.
                </Typography>
            );
    }

    return (
        <>
            <Head title="Care log" />
            <GuestCareLogLayout title="Care log" historyUrl={historyUrl}>
                {flash?.success ? (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {flash.success}
                    </Alert>
                ) : null}
                <Box>{form}</Box>
            </GuestCareLogLayout>
        </>
    );
}
