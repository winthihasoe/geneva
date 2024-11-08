import React from "react";
import PropTypes from "prop-types";

const DateFormatter = ({ date }) => {
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        return new Intl.DateTimeFormat("en-GB", options).format(
            new Date(dateString)
        );
    };

    return formatDate(date);
};

DateFormatter.propTypes = {
    date: PropTypes.string.isRequired,
};

export default DateFormatter;
