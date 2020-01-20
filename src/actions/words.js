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

export const startRemoveWord = ({ id } = {}) => {
    return (dispatch) => {
        return database.ref(`words/${id}`).remove().then(() => {
            dispatch(removeWord({ id }));
        });
    };
};

// EDIT_WORD
export const editWord = (id, updates) => ({
    type: 'EDIT_WORD',
    id,
    updates
});

export const startEditWord = (id, updates) => {
    return (dispatch) => {
        return database.ref(`words/${id}`).update(updates).then(() => {
            dispatch(editWord(id, updates));
        })
    };
};

// SET_WORDS
export const setWords = (words) => ({
    type: 'SET_WORDS',
    words
});

export const startSetWords = () => {
    return (dispatch) => {
        return database.ref('words').once('value').then((snapshot) => {
            const words = [];

            snapshot.forEach((childSnapshot) => {
                words.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(setWords(words));
        });
    };
};