import { addWord, editWord, removeWord } from '../../actions/words';

test('should setup add word object with provided values', () => {
    const source = 'Karte';
    const destination = 'karta';
    const repeatAt = Date.now();

    const wordData = {
        source,
        destination,
        repeatAt
    };
    
    const action = addWord(wordData);
    expect(action).toEqual({
        type: 'ADD_WORD',
        word: {
            ...wordData,
            id: expect.any(String),
            factor: 1
        }
    });
});

test('should setup add word object with default values', () => {
    const action = addWord();
    expect(action).toEqual({
        type: 'ADD_WORD',
        word: { 
            id: expect.any(String),
            source: '',
            destination: '',
            repeatAt: 0,
            factor: 1
        }
    });
});

test('should setup remove word action object', () => {
    const id = '123abc';
    const action = removeWord({ id });
    expect(action).toEqual({
        type: 'REMOVE_WORD',
        id
    });
});

test('should setup edit word action object', () => {
    const id = '123abc';
    const source = 'Gut';
    const destination = 'Dobro';

    const action = editWord(id, { source, destination });
    expect(action).toEqual({
        type: 'EDIT_WORD',
        id,
        updates: {
            source,
            destination
        }
    });
});