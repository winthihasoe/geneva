import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { Container } from "@mui/material";
import React from "react";
import ServiceTable from "./components/ServiceTable";
import SuperNanny from "./components/SuperNanny";
import Nanny from "./components/Nanny";
import HeartyAidServices from "./components/HeartyAidServices";
import AdvancedElderCare from "./components/AdvancedElderCare";
import ElderCare from "./components/ElderCare";
import NannyAndMaid from "./components/NannyAndMaid";
import ElderAndMaid from "./components/ElderAndMaid";

function ServicePricing({ service }) {
    return (
        <AppLayout>
            <Head title={service.name} />
            <Container maxWidth="lg">
                {/* Show service, package, package duration, salary and service fee  */}

                <ServiceTable service={service} />

                {service.name == "Nanny Basic Service" && (
                    <>
                        <SuperNanny />
                        <Nanny />
                    </>
                )}

                {service.name == "Nanny Advanced Service" && (
                    <>
                        <SuperNanny />
                        <Nanny />
                    </>
                )}

                {service.name == "Elder Basic Care" && (
                    <>
                        <AdvancedElderCare />
                        <ElderCare />
                    </>
                )}

                {service.name == "Elder Advanced Care" && (
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
