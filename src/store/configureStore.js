import { createStore, combineReducers } from 'redux';
import wordsReducer from '../redoucers/words';
import filtersReducer from '../redoucers/filters';

export default () => {
    const store = createStore(
        combineReducers({
            words: wordsReducer,
            filters: filtersReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
};

