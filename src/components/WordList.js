import React from 'react';
import { connect } from 'react-redux';
import WordListItem from './WordListItem';
import selectWords from '../selectors/words';

const WordList = (props) => (
    <div>
        <h1>Word List</h1>
        {props.words.map((word) => <WordListItem key={word.id} {...word} />) }
    </div>
);

const mapStateToProps = (state) => {
    return {
        words: selectWords(state.words, state.filters)
    };
};

export default connect(mapStateToProps)(WordList);