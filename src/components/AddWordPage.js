import React from 'react';
import { connect } from 'react-redux';
import WordForm from './WordForm';
import { addWord } from '../actions/words';

const AddWordPage = (props) => (
    <div>
        <h1>Add Word</h1>
        <WordForm 
            onSubmit={(word) => {
                props.dispatch(addWord(word));
                props.history.push('/');
            }}
        />
    </div>
);

export default connect()(AddWordPage);