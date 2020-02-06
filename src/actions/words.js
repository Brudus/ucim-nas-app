import database from '../firebase/firebase';

// ADD_WORD
export const addWord = (word) => ({
    type: 'ADD_WORD',
    word
});

export const startAddWord = (wordData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            source = '', 
            destination= '', 
            repeatAt = 0,
            interval = 0,
            reps = 0,
            easeFactor = 2.5,
            repeatAtInverted = 0,
            intervalInverted = 0,
            repsInverted = 0,
            easeFactorInverted = 2.5
        } = wordData;
        const word = { source, destination, repeatAt, interval, reps, easeFactor, repeatAtInverted, intervalInverted, repsInverted, easeFactorInverted };
        
        return database.ref(`users/${uid}/words`).push(word).then((ref) => {
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
    return (dispatch,getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/words/${id}`).remove().then(() => {
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
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/words/${id}`).update(updates).then(() => {
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
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/words`).once('value').then((snapshot) => {
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