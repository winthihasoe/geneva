import { router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Typography } from "@mui/material";
import { debounce } from "lodash";

function PhoneNumberInputOnly({ onChange, value }) {
    const [userCountryCode, setUserCountryCode] = useState("mm");
    const handleChange = (phone) => {
        onChange(`+${phone}`);
    };
    useEffect(() => {
        // Fetch the user's country code based on IP address
        const fetchCountryCode = async () => {
            try {
                const response = await fetch("https://ipapi.co/json/");
                const data = await response.json();
                if (data && data.country_code) {
                    setUserCountryCode(data.country_code.toLowerCase());
                }
            } catch (error) {
                console.error("Error fetching the country code:", error);
            }
        };

        fetchCountryCode();
    }, []);
    return (
        <>
            <PhoneInput
                value={value}
                country={userCountryCode}
                enableSearch
                inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                }}
                inputStyle={{
                    width: "100%",
                    height: "50px",
                    fontSize: "16px",
                    color: "#000", // Custom text color
                }}
                dropdownStyle={{
                    backgroundColor: "#ffffff", // Dropdown background color
                    color: "#000", // Text color for dropdown
                }}
                onChange={handleChange}
            />
        </>
    );
}

export default PhoneNumberInputOnly;
