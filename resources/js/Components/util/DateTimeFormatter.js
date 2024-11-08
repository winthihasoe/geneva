import React from "react";
import PropTypes from "prop-types";

const DateTimeFormatter = ({ dateTime }) => {
    const formatDateTime = (dateTimeString) => {
        const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        };
        const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
            new Date(dateTimeString)
        );
        const [date, time] = formattedDate.split(", ");
        return `${time} - ${date}`;
    };

    return formatDateTime(dateTime);
};

DateTimeFormatter.propTypes = {
    dateTime: PropTypes.string.isRequired,
};

export default DateTimeFormatter;
