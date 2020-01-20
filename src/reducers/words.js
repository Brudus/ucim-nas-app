// Words Reducer

const wordsReducerDefaultState = [];

export default (state = wordsReducerDefaultState, action) => {
     switch (action.type) {
        case 'ADD_WORD':
            return [...state, action.word];
        case 'REMOVE_WORD':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_WORD':
            return state.map((word) => {
                if (word.id === action.id) {
                    return { 
                        ...word,
                        ...action.updates
                    };
                } else {
                    return word;
                }
            });
        case 'SET_WORDS':
            return action.words;
        default:
            return state;
     }
};