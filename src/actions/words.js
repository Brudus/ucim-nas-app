import uuid from 'uuid';

// ADD_WORD
export const addWord = ({ source = '', destination= '', repeatAt = 0 } = {}) => ({
    type: 'ADD_WORD',
    word: {
        id: uuid(),
        source,
        destination,
        factor: 1,
        repeatAt
    }
});

// REMOVE_WORD
export const removeWord = ({ id } = {}) => ({
    type: 'REMOVE_WORD',
    id
});

// EDIT_WORD
export const editWord = (id, updates) => ({
    type: 'EDIT_WORD',
    id,
    updates
});