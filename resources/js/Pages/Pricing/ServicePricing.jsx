import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { Box, Container } from "@mui/material";
import React from "react";
import ServiceTable from "./components/ServiceTable";
import SuperNanny from "./components/SuperNanny";
import Nanny from "./components/Nanny";
import HeartyAidServices from "./components/HeartyAidServices";
import SuperNewborn from "./components/SuperNewborn";
import Newborn from "./components/Newborn";
import AdvancedElderCare from "./components/AdvancedElderCare";
import ElderCare from "./components/ElderCare";
import NannyAndMaid from "./components/NannyAndMaid";
import ElderAndMaid from "./components/ElderAndMaid";

function ServicePricing({ service }) {
    return (
        <AppLayout>
            <Head title={service.name} />
            <Container maxWidth="xl">
                {/* Show service, package, package duration, salary and service fee  */}

                <ServiceTable service={service} />

                {service.name == "Nanny Service" && (
                    <>
                        <SuperNanny />
                        <Nanny />
                    </>
                )}
                {service.name == "Newborn Care" && (
                    <>
                        <SuperNewborn />
                        <Newborn />
                    </>
                )}
                {service.name == "Elder Care" && (
                    <>
                        <AdvancedElderCare />
                        <ElderCare />
                    </>
                )}
                {service.name == "Nanny Care + Maid Service" && (
                    <NannyAndMaid />
                )}

                {service.name == "Elder Care + Maid Service" && (
                    <ElderAndMaid />
                )}
                <HeartyAidServices />
            </Container>
        </AppLayout>
    );
}

export default ServicePricing;
