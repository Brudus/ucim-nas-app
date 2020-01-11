import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'destination'
    });
});

test('should set sortBy to source', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_SOURCE' });
    expect(state.sortBy).toBe('source');
});

test('should set sortBy to destination', () => {
    const currentState = {
        text: '',
        sortBy: 'source'
    };
    const action = { type: 'SORT_BY_DESTINATION' };
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('destination');
});

test('should set sortBy to repeatAt', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_REPEAT_AT' });
    expect(state.sortBy).toBe('repeatAt');
});

test('should set text filter', () => {
    const text = 'dob'
    const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text});
    expect(state.text).toBe(text);
});