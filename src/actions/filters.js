// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_SOURCE
export const sortBySource = () => ({
    type: 'SORT_BY_SOURCE'
});

// SORT_BY_DESTINATION
export const sortByDestination = () => ({
    type: 'SORT_BY_DESTINATION'
});

// SORT_BY_REPEAT_AT
export const sortByRepeatAt = () => ({
    type: 'SORT_BY_REPEAT_AT'
});