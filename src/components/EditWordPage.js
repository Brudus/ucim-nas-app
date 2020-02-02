import React from 'react';
import { connect } from 'react-redux';
import WordForm from './WordForm';
import { startEditWord, startRemoveWord } from '../actions/words';

export class EditWordPage extends React.Component {
    onSubmit = (word) => {
        this.props.startEditWord(this.props.word.id, word);
        this.props.history.push('/catalog');
    };
    onRemove = (id) => {
        this.props.startRemoveWord({ id: this.props.word.id });
        this.props.history.push('/catalog');
    };

    render() {
        return (
            <div>
                <WordForm 
                    word={this.props.word}
                    onSubmit={this.onSubmit}
                />
                <button onClick={this.onRemove}>Remove</button>
            </div>
        );
    };
};

const mapStateToProps = (state, props) => ({
    word: state.words.find((word) => word.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
    startEditWord: (id, word) => dispatch(startEditWord(id, word)),
    startRemoveWord: (data) => dispatch(startRemoveWord(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditWordPage);