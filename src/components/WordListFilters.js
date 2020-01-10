import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortBySource, sortByDestination, sortByRepeatAt } from '../actions/filters';

const WordListFilters = (props) => (
    <div>
        <input type="text" value={props.filters.text} onChange={(e) => {
            props.dispatch(setTextFilter(e.target.value));
        }} />
        <select value={props.filters.sortBy} onChange={(e) => {
            switch (e.target.value) {
                case 'source':
                    props.dispatch(sortBySource());
                    break;
                case 'destination':
                    props.dispatch(sortByDestination());
                    break;
                case 'repeatAt':
                    props.dispatch(sortByRepeatAt());
                    break;
            }
        }}>
            <option value="destination">Serbo-Croatian</option>
            <option value="source">German</option>
            <option value="repeatAt">Repetition date</option>
        </select>
    </div>
);

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(WordListFilters);