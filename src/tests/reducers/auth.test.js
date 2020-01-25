import authReducer from '../../reducers/auth';

test('should setup default auth values', () => {
    const state = authReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({});
});

test('should log in', () => {
    const uid = 'Fz21fasWaxa13';
    const action = {
        type: 'LOGIN',
        uid
    };
    const state = authReducer({}, action);
    expect(state).toEqual({ uid });
});

test('should log out', () => {
    const action = {
        type: 'LOGOUT'
    };
    const state = authReducer({uid: 'Fz21fasWaxa13'}, action);
    expect(state).toEqual({});
});