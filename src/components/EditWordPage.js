import React from 'react';
import { connect } from 'react-redux';
import WordForm from './WordForm';
import { editWord, removeWord } from '../actions/words';

const EditWordPage = (props) => (
    <div>
        <WordForm 
            word={props.word}
            onSubmit={(word) => {
                props.dispatch(editWord(props.word.id, word));
                props.history.push('/');
            }}
        />
        <button onClick={(e) => {
            props.dispatch(removeWord({ id: props.word.id }));
            props.history.push('/');
        }}>Remove</button>
    </div>
);

const mapStateToProps = (state, props) => {
    return {
        word: state.words.find((word) => word.id === props.match.params.id)
    };
};

export default connect(mapStateToProps)(EditWordPage);