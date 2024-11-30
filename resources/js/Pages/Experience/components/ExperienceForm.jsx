import Subtitle from "@/Components/Typo/Subtitle";
import TinyText from "@/Components/Typo/TinyText";
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import HospitalCare from "./HospitalCare";
import BodyText from "@/Components/Typo/BodyText";
import arrowUp from "../../../../../public/images/right-up.svg"; // Adjust this path
import BabyCare from "./BabyCare";
import Heart from "@/Components/Fancy/Heart";
import ElderCare from "./ElderCare";

function ExperienceForm({ data, setData, handleSubmit }) {
    const [state, setState] = useState("Hospital");
    const [complete, setComplete] = useState(false);

    const renderComponent = (componentState) => {
        switch (componentState) {
            case "Hospital":
                return (
                    <HospitalCare
                        data={data}
                        setData={setData}
                        setComplete={setComplete}
                    />
                );
            case "Baby":
                return (
                    <BabyCare
                        data={data}
                        setData={setData}
                        setComplete={setComplete}
                    />
                );
            case "Elder":
                return (
                    <ElderCare
                        data={data}
                        setData={setData}
                        setComplete={setComplete}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 800,
                margin: "20px auto",
                border: "5px dotted",
                borderColor: "primary.main",
                p: { xs: 1, sm: 3 },
                borderRadius: 5,
                position: "relative",
            }}
        >
            <Typography
                variant="h5"
                fontSize={{ xs: 15, sm: 18, md: 28 }}
                fontWeight={700}
                my={1}
                fontFamily={"Livvic"}
                color="primary"
            >
                Record new experience
            </Typography>
            <Heart top={15} right={15} />

            <FormControl component="fieldset">
                <Subtitle>Choose where do you work?</Subtitle>

                <RadioGroup
                    row
                    value={state}
                    onChange={(e) => {
                        setState(e.target.value);
                        setData({ experience: "", detail: "" });
                    }}
                >
                    <FormControlLabel
                        value="Hospital"
                        control={<Radio />}
                        label={<BodyText>Hospital job</BodyText>}
                    />
                    <FormControlLabel
                        value="Baby"
                        control={<Radio />}
                        label={<BodyText>Baby care</BodyText>}
                    />
                    <FormControlLabel
                        value="Elder"
                        control={<Radio />}
                        label={<BodyText>Elder care</BodyText>}
                    />
                </RadioGroup>
            </FormControl>
            <form onSubmit={handleSubmit}>
                {renderComponent(state)}

                <TextField
                    fullWidth
                    multiline
                    placeholder="Optional (You can describe detail)"
                    onChange={(e) =>
                        setData({ ...data, detail: e.target.value })
                    }
                />
                <Subtitle>Detail experience</Subtitle>

                {data.experience && (
                    <>
                        <Typography
                            textAlign={"center"}
                            my={1}
                            fontFamily={"Karma"}
                            fontWeight={600}
                            bgcolor={"grey.200"}
                            p={1}
                        >
                            "{data.experience}"
                        </Typography>
                        <Typography
                            textAlign={"center"}
                            my={1}
                            fontFamily={"Karma"}
                            fontSize={{ xs: 12, sm: 14 }}
                        >
                            Your experience will show{" "}
                            <img src={arrowUp} style={{ width: "20px" }} /> like
                            this
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Box textAlign={"center"} my={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ borderRadius: 20, width: 120 }}
                                disabled={!complete}
                            >
                                <Typography fontFamily={"Livvic"}>
                                    Save
                                </Typography>
                            </Button>
                        </Box>
                    </>
                )}
            </form>
        </Box>
    );
}

export default ExperienceForm;
