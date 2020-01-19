import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_WORD
export const addWord = (word) => ({
    type: 'ADD_WORD',
    word
});

export const startAddWord = (wordData = {}) => {
    return (dispatch) => {
        const {
            source = '', 
            destination= '', 
            repeatAt = 0
        } = wordData;
        const word = { source, destination, repeatAt, factor: 1 };
        
        return database.ref('words').push(word).then((ref) => {
            dispatch(addWord({
                id: ref.key,
                ...word
            }));
        });
    };
};

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