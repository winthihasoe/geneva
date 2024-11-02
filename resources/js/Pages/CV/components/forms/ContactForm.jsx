import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle";
import PhoneNumberInputOnly from "@/Components/Forms/PhoneNumberInputOnly";

const ContactForm = ({ data, handleChange }) => {
    return (
        <Box
            sx={{
                maxWidth: 300,
                margin: "20px auto",
            }}
        >
            <Box mb={3}>
                <Subtitle>Emergency Contact number in home country</Subtitle>
                <PhoneNumberInputOnly
                    value={data.emergency_contact}
                    onChange={(phone) =>
                        handleChange("emergency_contact")({
                            target: { value: phone },
                        })
                    }
                />
            </Box>
            <Box>
                <Subtitle>
                    Line ID{" "}
                    <img
                        src="/images/social/line.png"
                        style={{ width: 20, height: 20 }}
                        alt="Line"
                    />
                </Subtitle>
                <PhoneNumberInputOnly
                    value={data.whatsapp_number}
                    onChange={(phone) =>
                        handleChange("whatsapp_number")({
                            target: { value: phone },
                        })
                    }
                />
            </Box>
        </Box>
    );
};

export default ContactForm;
