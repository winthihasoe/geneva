import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    LinearProgress,
} from "@mui/material";
import CvContext from "@/Context/CvContext";
import Compressor from "compressorjs";
import PersonalIDUploadForm from "./PersonalIDUploadForm";

const years = Array.from(
    new Array(20), // Next 20 years for expiry
    (val, index) => new Date().getFullYear() + index
);
const months = Array.from(new Array(12), (val, index) => index + 1);
const days = Array.from(new Array(31), (val, index) => index + 1);

const StepThree = ({ oldPassport, oldVisaStamp }) => {
    const { data, setData, handleChange } = useContext(CvContext);

    // Date state for passport expiry
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    // Passport first page states
    const [passportPreview, setPassportPreview] = useState(
        oldPassport
            ? oldPassport
            : typeof data.passport === "string"
            ? `/storage/${data.passport}`
            : null
    );
    const [passportUploading, setPassportUploading] = useState(false);

    // Visa stamp states
    const [visaStampPreview, setVisaStampPreview] = useState(
        oldVisaStamp
            ? oldVisaStamp
            : typeof data.visa_stamp === "string"
            ? `/storage/${data.visa_stamp}`
            : null
    );
    const [visaStampUploading, setVisaStampUploading] = useState(false);

    // Initialize passport expiry date from context data
    useEffect(() => {
        if (data.passport_expiry_date) {
            const date = new Date(data.passport_expiry_date);
            setSelectedYear(date.getFullYear());
            setSelectedMonth(date.getMonth() + 1);
            setSelectedDay(date.getDate());
        }
    }, [data.passport_expiry_date]);

    // Update passport_expiry_date in context when all date fields are selected (like StepOne)
    useEffect(() => {
        if (selectedYear && selectedMonth && selectedDay) {
            const dateString = `${selectedYear}-${selectedMonth
                .toString()
                .padStart(2, "0")}-${selectedDay.toString().padStart(2, "0")}`;

            // Use handleChange like StepOne does, with setTimeout to avoid render cycle issues
            setTimeout(
                () =>
                    handleChange("passport_expiry_date")({
                        target: { value: dateString },
                    }),
                0
            );
        }
    }, [selectedYear, selectedMonth, selectedDay]);

    // Handle individual date changes
    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };

    // Handle passport first page photo upload
    const handlePassportChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setPassportUploading(true);

            new Compressor(file, {
                quality: 0.6,
                maxWidth: 600,
                success(compressedFile) {
                    if (compressedFile instanceof Blob) {
                        // Create a new File object with proper name
                        const fileName = file.name || "compressed_passport.jpg";
                        const newFile = new File([compressedFile], fileName, {
                            type: compressedFile.type,
                            lastModified: Date.now(),
                        });

                        setPassportPreview(URL.createObjectURL(newFile));
                        setData((prevData) => ({
                            ...prevData,
                            passport: newFile, // This stores in the passport field
                        }));
                    } else {
                        console.error("Compressed file is not a valid Blob");
                    }
                    setPassportUploading(false);
                },
                error(err) {
                    console.error("Compression error:", err.message);
                    setPassportUploading(false);
                },
            });
        }
    };

    // Handle visa stamp photo upload
    const handleVisaStampChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setVisaStampUploading(true);

            new Compressor(file, {
                quality: 0.6,
                maxWidth: 600,
                success(compressedFile) {
                    if (compressedFile instanceof Blob) {
                        // Create a new File object with proper name
                        const fileName =
                            file.name || "compressed_visa_stamp.jpg";
                        const newFile = new File([compressedFile], fileName, {
                            type: compressedFile.type,
                            lastModified: Date.now(),
                        });

                        setVisaStampPreview(URL.createObjectURL(newFile));
                        setData((prevData) => ({
                            ...prevData,
                            visa_stamp: newFile, // This stores in a separate field
                        }));
                    } else {
                        console.error("Compressed file is not a valid Blob");
                    }
                    setVisaStampUploading(false);
                },
                error(err) {
                    console.error("Compression error:", err.message);
                    setVisaStampUploading(false);
                },
            });
        }
    };

    useEffect(() => {
        if (data.passport && data.passport instanceof Blob) {
            const newPassportPreview = URL.createObjectURL(data.passport);
            setPassportPreview(newPassportPreview);
        }
    }, [data.passport]);

    useEffect(() => {
        if (data.visa_stamp && data.visa_stamp instanceof Blob) {
            const newVisaStampPreview = URL.createObjectURL(data.visa_stamp);
            setVisaStampPreview(newVisaStampPreview);
        }
    }, [data.visa_stamp]);

    return (
        <Box sx={{ margin: "auto", maxWidth: 450 }}>
            <PersonalIDUploadForm />
        </Box>
    );
};

export default StepThree;
