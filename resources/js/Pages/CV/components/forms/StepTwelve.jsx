import React, { useContext } from "react";
import {
    Box,
    Checkbox,
    Divider,
    FormControlLabel,
    Typography,
} from "@mui/material";
import Subtitle from "@/Components/Typo/Subtitle";
import CvContext from "@/Context/CvContext";
import FormText from "@/Components/Typo/FormText";

const Terms = [
    "1. Accuracy of Information: You represent and warrant that all information provided is true, accurate, and complete to the best of your knowledge.",
    "2. Commitment to Services: You agree to perform the duties and services as outlined in this submission in a manner consistent with your representations.",
    "3. Permission for Marketing Use: You grant Hearty Aid Co., Ltd. the irrevocable right to use your profile and information provided on this website for marketing purposes and to disclose such information to clients who engage Hearty Aid Healthcare Services.",
    "4. Service Fee Deduction: You consent to a monthly deduction of 15% from your salary by Hearty Aid Co., Ltd. as payment for service fees. Additionally, you acknowledge that your monthly salary may vary based on adjustments to the service fees received from clients.",
    "5. Responsibility and Conduct: You accept full responsibility for the safety and well-being of the clients, including elderly and pediatric individuals, under your care. You agree to refrain from theft, disrespect, or any unlawful conduct while providing care or residing in the client’s home.",
];

const StepTwelve = () => {
    const { data, setData } = useContext(CvContext);
    const handleCheckboxChange = (field) => (event) => {
        setData((prevData) => ({
            ...prevData,
            [field]: event.target.checked, // Update the field with the checked value
        }));
    };

    return (
        <Box sx={{ mb: 3, maxWidth: 600, margin: "0 auto" }}>
            <Typography variant="subtitle1" mb={2} fontWeight={"bold"}>
                By submitting this CV form, you hereby acknowledge, agree, and
                consent to the following terms:
            </Typography>

            {Terms.map((term, index) => (
                <Typography variant="body2" mb={2} key={index}>
                    {term}
                </Typography>
            ))}

            <Divider sx={{ my: 2 }} />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={data.agree_to_terms}
                        onChange={handleCheckboxChange("agree_to_terms")}
                        sx={{
                            alignSelf: "flex-start", // Aligns the checkbox to the top of the text
                            paddingTop: 0, // Removes extra space if needed
                        }}
                        size="small"
                    />
                }
                label={
                    <Typography
                        fontSize={{ xs: 11, sm: 13, md: 14 }}
                        sx={{ textAlign: "justify" }}
                    >
                        I agree to these terms with full understanding of their
                        implications. I confirm that I am entering into this
                        agreement voluntarily, in a clear and sound state of
                        mind, free from any external persuasion, coercion, or
                        misunderstanding.
                    </Typography>
                }
                sx={{
                    alignItems: "flex-start",
                    my: 2,
                }}
            />
        </Box>
    );
};

export default StepTwelve;
