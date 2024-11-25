import React, { useState } from "react";
import axios from "axios";
import {
    Box,
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";
import { router } from "@inertiajs/react";

const PhoneVerification = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("+66"); // Default to US
    const [otp, setOtp] = useState("");
    const [isSent, setIsSent] = useState(false);

    const sendOtp = async () => {
        try {
            const response = await axios.post(route("sendOtp"), {
                phoneNumber: `${countryCode}${phoneNumber}`,
            });
            if (response.data.success) {
                setIsSent(true);
                alert("OTP sent to your phone.");
            }
        } catch (error) {
            alert(
                "Error sending OTP: " +
                    (error.response?.data?.message || error.message)
            );
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post(route("verifyOtp"), {
                phoneNumber: `${countryCode}${phoneNumber}`,
                otp,
            });
            if (response.data.success) {
                alert("Phone verified successfully!");
                // Send verified data to Laravel backend for saving
                router.post(route("saveVerifiedPhone"), {
                    phoneNumber: `${countryCode}${phoneNumber}`,
                });
            } else {
                alert("Verification failed.");
            }
        } catch (error) {
            alert(
                "Error verifying OTP: " +
                    (error.response?.data?.message || error.message)
            );
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
                maxWidth: 400,
                margin: "auto",
                padding: 4,
                border: "1px solid #ccc",
                borderRadius: 2,
                boxShadow: 2,
            }}
        >
            <FormControl fullWidth>
                <InputLabel id="country-code-label">Country Code</InputLabel>
                <Select
                    labelId="country-code-label"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    label="Country Code"
                >
                    <MenuItem value="+66">+66 (TH)</MenuItem>
                    <MenuItem value="+95">+95 (MN)</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />

            {isSent && (
                <TextField
                    label="OTP"
                    variant="outlined"
                    fullWidth
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
            )}

            {!isSent ? (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={sendOtp}
                    fullWidth
                >
                    Send OTP
                </Button>
            ) : (
                <Button
                    variant="contained"
                    color="success"
                    onClick={verifyOtp}
                    fullWidth
                >
                    Verify OTP
                </Button>
            )}
        </Box>
    );
};

export default PhoneVerification;
