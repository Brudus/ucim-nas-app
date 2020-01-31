import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import filterWordsDue from '../selectors/words-due';

export const DashboardPage = ({ dueWordsCount }) => (
    <div>
        {dueWordsCount > 0 ? <Link to={`/study`}>Study now</Link> : <button disabled>Study now</button>}
    </div>
);

const mapStateToProps = (state) => ({
    dueWordsCount: filterWordsDue(state.words)
});

export default connect(mapStateToProps)(DashboardPage);