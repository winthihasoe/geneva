import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const steps = [
    { label: "Baby's Basic Info" },
    { label: "Care Schedule" },
    { label: "Services Needed" },
    { label: "Nanny Preferences" },
    { label: "Our Recommendations" },
];

const getColorForStep = (index, active) => {
    const colors = ["#ffa701", "#883835", "#662e50", "#342e4f", "#885b15"];
    return active ? colors[index % colors.length] : "#d3d3d3";
};

// Styled component for each step
const StepBox = styled(Box)(({ color, active }) => ({
    backgroundColor: active ? color : "#d3d3d3",
    color: active ? "#fff" : "#333",
    padding: "15px 20px",
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    textAlign: "center",
    flex: "1 1 0",
    position: "relative",
    cursor: "pointer",
    clipPath: "polygon(0 0, 95% 0, 105% 50%, 95% 100%, 0 100%, 10% 50%)",
    "&::after": {
        content: '""',
        position: "absolute",
        top: 0,
        right: "-20px",
        width: "20px",
        height: "100%",
        backgroundColor: active ? color : "#d3d3d3",
        clipPath: "polygon(0 0, 100% 50%, 0 100%)",
        zIndex: 1,
    },
}));

const ProgressBar = ({ activeStep, onStepClick }) => {
    return (
        <Box
            display={{ xs: "none", sm: "none", md: "flex" }}
            width={"80%"}
            margin={"10px auto"}
        >
            {steps.map((step, index) => (
                <StepBox
                    key={index}
                    color={getColorForStep(index, index === activeStep)}
                    active={index === activeStep}
                    onClick={() => index <= activeStep && onStepClick(index)}
                >
                    <Typography fontSize={13} fontFamily={"Karma"}>
                        {step.label}
                    </Typography>
                </StepBox>
            ))}
        </Box>
    );
};

export default ProgressBar;
