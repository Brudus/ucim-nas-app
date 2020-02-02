import React from 'react';
import { connect } from 'react-redux';
import WordForm from './WordForm';
import { startAddWord } from '../actions/words';

export class AddWordPage extends React.Component {
    onSubmit = (word) => {
        this.props.startAddWord(word);
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
    startAddWord: (word) => dispatch(startAddWord(word))
});

export default connect(undefined, mapDispatchToProps)(AddWordPage);