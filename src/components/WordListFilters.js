import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortBySource, sortByDestination, sortByRepeatAt } from '../actions/filters';

export class WordListFilters extends React.Component {
    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    };
    
    onSortChange = (e) => {
        switch (e.target.value) {
            case 'source':
                this.props.sortBySource();
                break;
            case 'destination':
                this.props.sortByDestination();
                break;
            case 'repeatAt':
                this.props.sortByRepeatAt();
                break;
        }
    };

    render() {
        return (
            <div>
                <input type="text" value={this.props.filters.text} onChange={this.onTextChange} />
                <select value={this.props.filters.sortBy} onChange={this.onSortChange}>
                    <option value="destination">Serbo-Croatian</option>
                    <option value="source">German</option>
                    <option value="repeatAt">Repetition date</option>
                </select>
            </div>
        );
    };
};

const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortBySource: () => dispatch(sortBySource()),
    sortByDestination: () => dispatch(sortByDestination()),
    sortByRepeatAt: () => dispatch(sortByRepeatAt())
})

export default connect(mapStateToProps, mapDispatchToProps)(WordListFilters);