import React from 'react';
import WordList from './WordList';
import WordListFilters from './WordListFilters';
import WordsSummary from './WordsSummary';

const WordCatalogPage = () => (
    <div>
        <WordsSummary />
        <WordListFilters />
        <WordList />
    </div>
);

export default WordCatalogPage;