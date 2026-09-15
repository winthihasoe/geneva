import React, { lazy, Suspense, useMemo } from "react";
import { Head, usePage } from "@inertiajs/react";
import GuestCareLogLayout from "@/Layouts/GuestCareLogLayout";
import { Alert, Box, Typography } from "@mui/material";

const NewbornCareLogs = lazy(() =>
    import("@/Pages/Caregiver/CareLogs/NewbornCareLog/NewbornCareLogs")
);
const BabyCareLogs = lazy(() =>
    import("@/Pages/Caregiver/CareLogs/BabyCareLog/BabyCareLogs")
);
const MaternalCareLogs = lazy(() =>
    import("@/Pages/Caregiver/CareLogs/MaternalCareLog/MaternalCareLogs")
);
const ElderlyCareLogs = lazy(() =>
    import("@/Pages/Caregiver/CareLogs/ElderlyCareLog/ElderlyCareLogs")
);

const FORM_BY_TYPE = {
    newborn: NewbornCareLogs,
    baby: BabyCareLogs,
    maternal: MaternalCareLogs,
    elder: ElderlyCareLogs,
};

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

    const FormComponent = FORM_BY_TYPE[careType];
    const form = FormComponent ? (
        <Suspense
            fallback={
                <Typography color="text.secondary">Loading form…</Typography>
            }
        >
            <FormComponent {...formProps} />
        </Suspense>
    ) : (
        <Typography color="error">
            Unsupported care type for this patient.
        </Typography>
    );

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
