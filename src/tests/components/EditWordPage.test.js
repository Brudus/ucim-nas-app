import React from 'react';
import { shallow } from 'enzyme';
import { EditWordPage } from '../../components/EditWordPage';
import words from '../fixtures/words';

let editWord, startRemoveWord, history, wrapper;

beforeEach(() => {
    editWord = jest.fn();
    startRemoveWord = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(
        <EditWordPage 
            editWord={editWord} 
            startRemoveWord={startRemoveWord} 
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

test('should handle startRemoveWord', () => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveWord).toHaveBeenLastCalledWith({ id: words[1].id });
});