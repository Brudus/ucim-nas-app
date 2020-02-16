import React from 'react';
import { Link } from 'react-router-dom';

const formatDate = (dateToFormat) => {
    const nowDate = Date.now();
    const dateDifference = dateToFormat - nowDate;
    const dayInMs = 1000 * 60 * 60 * 24;

    if (dateDifference <= 0) {
        return 'now';
    } else if (dateDifference < dayInMs) {
        return 'today';
    } else if (dateDifference < 2 * dayInMs) {
        return 'tomorrow';
    } else {
        return `in ${Math.floor(dateDifference / dayInMs)} days`;
    }
};

const WordListItem = ({ id, source, destination, repeatAt, repeatAtInverted, isNew, isNewInverted }) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{destination}</h3>
        </Link>
        <h4>{source}</h4>
        {(isNew || isNewInverted) && <span>NEW</span>}
        <p>German -> Serbian - Next repetition: {formatDate(repeatAt)}</p>
        <p>Serbian -> German - Next repetition: {formatDate(repeatAtInverted)}</p>
    </div>
);

export default WordListItem;
    
    