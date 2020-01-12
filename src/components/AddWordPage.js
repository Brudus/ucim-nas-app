import React from 'react';
import { connect } from 'react-redux';
import WordForm from './WordForm';
import { addWord } from '../actions/words';

export class AddWordPage extends React.Component {
    onSubmit = (word) => {
        this.props.addWord(word);
        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <h1>Add Word</h1>
                <WordForm 
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    };
}

const mapDispatchToProps = (dispatch) => ({
    addWord: (word) => dispatch(addWord(word))
});

export default connect(undefined, mapDispatchToProps)(AddWordPage);