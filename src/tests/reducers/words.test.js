import wordsReducer from '../../reducers/words';
import words from '../fixtures/words';

test('should set default state', () => {
    const state = wordsReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should add word', () => {
    let wordToAdd = {
        id: '4',
        source: 'neu',
        destination: 'novo',
        easeFactor: 2.5,
        repeatAt: 2048,
        interval: 0,
        reps: 0
    };
    const action = {
        type: 'ADD_WORD',
        word: wordToAdd
    };
    const state = wordsReducer(words, action);
    expect(state).toEqual([...words, wordToAdd]);
});

test('should remove word by id', () => {
    const action = {
        type: 'REMOVE_WORD',
        id: words[1].id
    };
    const state = wordsReducer(words, action);
    expect(state).toEqual([words[0], words[2]]);
});

test('should not remove word if id not found', () => {
    const action = {
        type: 'REMOVE_WORD',
        id: '-1'
    };
    const state = wordsReducer(words, action);
    expect(state).toEqual(words);
});

test('should edit word with id', () => {
    const source = 'Buch'
    const action = {
        type: 'EDIT_WORD',
        id: words[2].id,
        updates: {
            source
        }
    };
    const state = wordsReducer(words, action);
    expect(state[2].source).toBe(source);
});

test('should not edit word if id not found', () => {
    const action = {
        type: 'EDIT_WORD',
        id: '-4',
        updates: {
            source: 'Bild'
        }
    };
    const state = wordsReducer(words, action);
    expect(state).toEqual(words);
});

test('should set words', () => {
    const action = {
        type: 'SET_WORDS',
        words: [words[1]]
    };
    const state = wordsReducer(words, action);
    expect(state).toEqual([words[1]]);
});