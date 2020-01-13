import React from 'react';
import { connect } from 'react-redux';
import selectWords from '../selectors/words';
import filterWordsDue from '../selectors/words-due';

export const WordsSummary = ({ wordsCount, dueWordsCount }) => {
    const filteredWordsText = wordsCount === 1 ? '1 word' : `${wordsCount} words`;
    const filteredDueWordsText = dueWordsCount === 1 ? '1 word' : `${dueWordsCount} words`;

    return (
        <div>
            <h2>Viewing {filteredWordsText} with {filteredDueWordsText} due.</h2>
        </div>
    );
};

const mapStateToProps = (state) => {
    const visibleWords = selectWords(state.words, state.filters);

    return {
        wordsCount: visibleWords.length,
        dueWordsCount: filterWordsDue(visibleWords)
    };
};

export default connect(mapStateToProps)(WordsSummary);