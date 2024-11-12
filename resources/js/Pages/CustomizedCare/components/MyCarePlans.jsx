import Title from "@/Components/Typo/Title";
import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

function MyCarePlans({ carePlans }) {
    return (
        <Box sx={{ my: 3 }}>
            <Title>My Care Plans</Title>
            {carePlans.map((plan) => (
                <Card key={plan.id}>
                    <CardContent>
                        <Typography
                            fontFamily={"Karma"}
                            fontSize={18}
                            fontWeight={600}
                        >
                            {plan.care_recipient_info.name}
                        </Typography>
                        <Typography fontFamily={"Karma"}>
                            {plan.care_recipient_info.gender}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}

export default MyCarePlans;
