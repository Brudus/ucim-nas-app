import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
    startAddWord, 
    addWord, 
    editWord, 
    removeWord, 
    setWords, 
    startSetWords, 
    startRemoveWord, 
    startEditWord
} from '../../actions/words';
import words from '../fixtures/words';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid }};
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const wordData = {};
    words.forEach(({ id, source, destination, easeFactor, repeatAt, interval, reps, easeFactorInverted, repeatAtInverted, intervalInverted, repsInverted, isNew, isNewInverted }) => {
        wordData[id] = { source, destination, easeFactor, repeatAt, interval, reps, easeFactorInverted, repeatAtInverted, intervalInverted, repsInverted, isNew, isNewInverted };
    });
    database.ref(`users/${uid}/words`).set(wordData).then(() => done());
});

test('should setup add word object with provided values', () => {    
    const action = addWord(words[2]);
    expect(action).toEqual({
        type: 'ADD_WORD',
        word: words[2]
    });
});

test('should add word to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const wordData = {
        source: 'Karte',
        destination: 'karta',
        repeatAt: 1000,
        repeatAtInverted: 2000
    };

    store.dispatch(startAddWord(wordData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_WORD',
            word: {
                id: expect.any(String),
                easeFactor: 2.5,
                reps: 0,
                interval: 0,
                easeFactorInverted: 2.5,
                repsInverted: 0,
                intervalInverted: 0,
                isNew: true,
                isNewInverted: true,
                ...wordData
            }
        });

        return database.ref(`users/${uid}/words/${actions[0].word.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual({easeFactor: 2.5, reps: 0, interval: 0, easeFactorInverted: 2.5, repsInverted: 0, intervalInverted: 0, isNew: true, isNewInverted: true, ...wordData});
        done();
    });
});

test('should add word with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const wordDefaults = {        
        source: '',
        destination: '',
        repeatAt: 0,
        repeatAtInverted: 0
    };

    store.dispatch(startAddWord({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_WORD',
            word: {
                id: expect.any(String),
                easeFactor: 2.5,
                reps: 0,
                interval: 0,
                easeFactorInverted: 2.5,
                repsInverted: 0,
                intervalInverted: 0,
                isNew: true,
                isNewInverted: true,
                ...wordDefaults        
            }
        });

        return database.ref(`users/${uid}/words/${actions[0].word.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual({easeFactor: 2.5, reps: 0, interval: 0, easeFactorInverted: 2.5, repsInverted: 0, intervalInverted: 0, isNew: true, isNewInverted: true, ...wordDefaults});
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

test('should remove word from database', (done) => {
    const id = words[1].id;
    const store = createMockStore(defaultAuthState);
    store.dispatch(startRemoveWord({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_WORD',
            id
        });
        return database.ref(`users/${uid}/words/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
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

test('should update word in database', (done) => {
    const id = words[0].id;
    const updates = {
        source: 'nema',
        destination: 'es gibt nicht'
    }; 

    const store = createMockStore(defaultAuthState);
    store.dispatch(startEditWord(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_WORD',
            id,
            updates
        });
        return database.ref(`users/${uid}/words/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().source).toBe(updates.source);
        expect(snapshot.val().destination).toBe(updates.destination);
        done();
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
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetWords()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_WORDS',
            words
        });
        done();
    });
});