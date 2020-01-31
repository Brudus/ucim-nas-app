import React from 'react';

export default class StudySelectionOption extends React.Component {
    handleClick = () => {
        this.props.calculateNewSchedule(this.props.grade);
    };

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>{this.props.text}</button>
            </div>
        );
    };
};