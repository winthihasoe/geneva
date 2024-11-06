import { router } from "@inertiajs/react";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

function CustomizedCarePlan() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                border: "2px solid",
                borderColor: "primary.main",
                borderRadius: "100px",
                mx: 2,
                overflow: "hidden",
                bgcolor: "white",
            }}
        >
            <img
                src="/images/logo/logo.png"
                style={{ width: 80, height: 80, marginTop: "25px" }}
                alt="logo"
            />
            <Typography
                fontSize={{ xs: 20, sm: 25, md: 35 }}
                fontFamily={"Anton"}
                color="primary"
            >
                Customize Your Care Plan
            </Typography>
            <Typography
                textAlign={"center"}
                fontWeight={600}
                fontSize={14}
                color="primary"
                px={{ xs: 2, sm: 5, md: 8 }}
                gutterBottom
            >
                "Personalized care starts with our expert counseling to
                understand and meet each patient's unique needs."
            </Typography>
            <Button
                size="small"
                sx={{ borderRadius: 20 }}
                variant="contained"
                onClick={() => router.get(route("care.start"))}
            >
                <Typography fontFamily={"Lilita One"} fontSize={18}>
                    Start Now
                </Typography>
            </Button>
            <img
                src="/images/conversation.png"
                style={{ width: "90%" }}
                alt="conversation image"
            />
        </Box>
    );
}

export default CustomizedCarePlan;
