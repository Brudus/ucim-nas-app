import React from 'react';

export default class WordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            destination: props.word ? props.word.destination : '',
            source: props.word ? props.word.source : '',
            repeatAt: props.word ? props.word.repeatAt : undefined,
            repeatAtInverted: props.word ? props.word.repeatAtInverted : undefined,
            error: ''
        };
    }

    onDestinationChange = (e) => {
        const destination = e.target.value;
        this.setState(() => ({ destination }));
    };

    onSourceChange = (e) => {
        const source = e.target.value;
        this.setState(() => ({ source }));
    }

    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.destination || !this.state.source) {
            const error = 'Please provide a word and its translation in your language.'
            this.setState(() => ({ error }));
        } else {
            const error = '';
            this.setState(() => ({ error }));
            this.props.onSubmit({
                destination: this.state.destination,
                source: this.state.source,
                repeatAt: this.state.repeatAt ? this.state.repeatAt : Date.now(),
                repeatAtInverted: this.state.repeatAtInverted ? this.state.repeatAtInverted : Date.now()
            });
            this.setState(() => ({
                destination: '',
                source: '',
                repeatAt: undefined,
                repeatAtInverted: undefined
            }));
        }
    };

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        placeholder="Word in Serbo-Croatian"
                        autoFocus
                        value={this.state.destination}
                        onChange={this.onDestinationChange}
                    />
                    <input
                        type="text"
                        placeholder="Word in German"
                        value={this.state.source}
                        onChange={this.onSourceChange}
                    ></input>
                    <button>{ this.props.word ? 'Save' : 'Add' }</button>
                </form>
            </div>
        );
    };
}