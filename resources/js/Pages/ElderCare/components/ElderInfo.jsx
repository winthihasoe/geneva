import MainTitle from "@/Pages/CustomizedCare/components/MainTitle";
import { Box, Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import BasicInfo from "./BasicInfo";
import ContactInfo from "./ContactInfo";
import MedicalConditions from "./MedicalConditions";
import Noodle from "@/Components/Fancy/Noodle";
import ThreeLeaves from "@/Components/Fancy/ThreeLeaves";

// Elder Info filling has 3 steps. These steps are nested in this component.
// The next button of the MultiStepForm component is worked if the step is 3.
function ElderInfo({ onNext }) {
    const [step, setStep] = useState(1);
    // Go to the next step
    const handleNext = () => {
        if (step == 3) {
            onNext();
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            setStep((prev) => prev + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Go to the previous step
    const handleBack = () => {
        if (step > 1) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setStep((prev) => prev - 1);
        }
    };

    return (
        <Container maxWidth="md" sx={{ position: "relative" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 3,
                    mb: 3,
                }}
            >
                <Typography
                    fontSize={11}
                    fontFamily={"Kavoon"}
                    color={step == 1 ? "grey" : "grey.300"}
                >
                    Basic
                </Typography>
                <Typography
                    fontSize={11}
                    fontFamily={"Kavoon"}
                    color={step == 2 ? "grey" : "grey.300"}
                >
                    Contact
                </Typography>
                <Typography
                    fontSize={11}
                    fontFamily={"Kavoon"}
                    color={step == 3 ? "grey" : "grey.300"}
                >
                    Condition
                </Typography>
            </Box>

            {step == 1 && <BasicInfo />}
            {step == 2 && <ContactInfo />}
            {step == 3 && <MedicalConditions />}
            {/* Navigation Buttons */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    px: { xs: 0, sm: 2, md: 5 },
                    mt: 5,
                }}
            >
                <Button
                    variant="contained"
                    sx={{ bgcolor: "#F5F5F5", borderRadius: 20 }}
                    onClick={handleBack}
                    disabled={step == 1}
                >
                    <Typography
                        color="primary"
                        fontFamily={"Kavoon"}
                        fontSize={{ xs: 20, sm: 25 }}
                    >
                        Previous
                    </Typography>
                </Button>

                <Button
                    variant="contained"
                    sx={{ borderRadius: 20 }}
                    onClick={handleNext}
                >
                    <Typography
                        fontFamily={"Kavoon"}
                        fontSize={{ xs: 20, sm: 25 }}
                    >
                        Next
                    </Typography>
                </Button>
            </Box>
            <Noodle top={0} right={-50} />

            <Noodle bottom={0} left={-45} />

            <ThreeLeaves bottom={90} left={-90} />
        </Container>
    );
}
export default ElderInfo;
