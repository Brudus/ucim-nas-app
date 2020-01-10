const filtersReducerDefaultState = {
    text: '',
    sortBy: 'destinationText'
};

export default (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_SOURCE':
            return {
                ...state,
                sortBy: 'source'
            };
        case 'SORT_BY_DESTINATION':
            return {
                ...state,
                sortBy: 'destination'
            };
        case 'SORT_BY_REPEAT_AT':
            return {
                ...state,
                sortBy: 'repeatAt'
            };
        default:
            return state;
    }
};