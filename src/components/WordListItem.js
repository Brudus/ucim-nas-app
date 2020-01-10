import React from 'react';
import { Link } from 'react-router-dom';

const formatDate = (dateToFormat) => {
    return new Date(dateToFormat).toUTCString();
};

const WordListItem = ({ id, source, destination, repeatAt }) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{destination}</h3>
        </Link>
        <h4>{source}</h4>
        <p>Next repetition: {formatDate(repeatAt)}</p>
    </div>
);

export default WordListItem;
    
    