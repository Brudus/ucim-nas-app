import { setTextFilter, sortBySource, sortByDestination, sortByRepeatAt } from '../../actions/filters'; 

test('should setup text filter object with provided values', () => {
    const text = 'kam';
    const action = setTextFilter(text);
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text
    });
});

test('should setup text filter object with default values', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});

test('should setup sort by source object', () => {
    const action = sortBySource();
    expect(action).toEqual({
        type: 'SORT_BY_SOURCE'
    });
});

test('should setup sort by destination object', () => {
    const action = sortByDestination();
    expect(action).toEqual({
        type: 'SORT_BY_DESTINATION'
    });
});

test('should setup sort by repeat at object', () => {
    const action = sortByRepeatAt();
    expect(action).toEqual({
        type: 'SORT_BY_REPEAT_AT'
    });
});