import React from 'react';
import { connect } from 'react-redux';

export const StudyPage = (props) => (
    <div>
        <h2>Study!</h2>
        {props.words[0].source}
    </div>
);

const mapStateToProps = (state) => ({
    words: state.words
});

export default connect(mapStateToProps)(StudyPage);