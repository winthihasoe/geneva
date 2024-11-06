import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

const AgeCalculator = ({ date }) => {
    const calculateAge = (dob) => {
        const birthDate = dayjs(dob);
        const today = dayjs();
        const age = today.diff(birthDate, "year");
        return age;
    };

    return calculateAge(date);
};

AgeCalculator.propTypes = {
    date: PropTypes.string.isRequired,
};

export default AgeCalculator;
