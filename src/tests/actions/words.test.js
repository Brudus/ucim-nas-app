import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddWord, addWord, editWord, removeWord, setWords, startSetWords } from '../../actions/words';
import words from '../fixtures/words';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const wordData = {};
    words.forEach(({ id, source, destination, factor, repeatAt }) => {
        wordData[id] = { source, destination, factor, repeatAt };
    });
    database.ref('words').set(wordData).then(() => done());
});

test('should setup add word object with provided values', () => {    
    const action = addWord(words[2]);
    expect(action).toEqual({
        type: 'ADD_WORD',
        word: words[2]
    });
});

test('should add word to database and store', (done) => {
    const store = createMockStore({});
    const wordData = {
        source: 'Karte',
        destination: 'karta',
        repeatAt: 1000
    };

    store.dispatch(startAddWord(wordData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_WORD',
            word: {
                id: expect.any(String),
                factor: 1,
                ...wordData
            }
        });

        return database.ref(`words/${actions[0].word.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual({factor: 1, ...wordData});
        done();
    });
});

test('should add word with defaults to database and store', (done) => {
    const store = createMockStore({});
    const wordDefaults = {        
        source: '',
        destination: '',
        repeatAt: 0
    };

    store.dispatch(startAddWord({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_WORD',
            word: {
                id: expect.any(String),
                factor: 1,
                ...wordDefaults        
            }
        });

        return database.ref(`words/${actions[0].word.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual({factor: 1, ...wordDefaults});
        done();
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

test('should setup set word action object with data', () => {
    const action = setWords(words);
    expect(action).toEqual({
        type:'SET_WORDS',
        words
    });
});

test('should fetch words from database', (done) => {
    const store = createMockStore({});
    store.dispatch(startSetWords()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_WORDS',
            words
        });
        done();
    });
});