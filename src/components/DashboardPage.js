import React from 'react';
import WordList from './WordList';
import WordListFilters from './WordListFilters';

const DashboardPage = () => (
    <div>
        <WordListFilters />
        <WordList />
    </div>
);

export default DashboardPage;