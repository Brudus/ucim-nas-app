import React from 'react';
import { shallow } from 'enzyme';
import { EditWordPage } from '../../components/EditWordPage';
import words from '../fixtures/words';

let editWord, removeWord, history, wrapper;

beforeEach(() => {
    editWord = jest.fn();
    removeWord = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(
        <EditWordPage 
            editWord={editWord} 
            removeWord={removeWord} 
            history={history} 
            word={words[1]}
        />
    );
});

test('should render EditWordPage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle editWord', () => {
    wrapper.find('WordForm').prop('onSubmit')(words[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editWord).toHaveBeenLastCalledWith(words[1].id, words[1]);
});

test('should handle removeWord', () => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(removeWord).toHaveBeenLastCalledWith({ id: words[1].id });
});