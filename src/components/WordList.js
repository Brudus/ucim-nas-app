import React from 'react';
import { connect } from 'react-redux';
import WordListItem from './WordListItem';
import selectWords from '../selectors/words';

export const WordList = (props) => (
    <div>
        {
            props.words.length === 0 ? (
                <p>No words available.</p>
            ) : (
                props.words.map((word) => <WordListItem key={word.id} {...word} />)
            )
        }
        { }
    </div>
);

const mapStateToProps = (state) => {
    return {
        words: selectWords(state.words, state.filters)
    };
};

export default connect(mapStateToProps)(WordList);