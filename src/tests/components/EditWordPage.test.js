import React from 'react';
import { shallow } from 'enzyme';
import { EditWordPage } from '../../components/EditWordPage';
import words from '../fixtures/words';

let startEditWord, startRemoveWord, history, wrapper;

beforeEach(() => {
    startEditWord = jest.fn();
    startRemoveWord = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(
        <EditWordPage 
            startEditWord={startEditWord} 
            startRemoveWord={startRemoveWord} 
            history={history} 
            word={words[1]}
        />
    );
});

test('should render EditWordPage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle startEditWord', () => {
    wrapper.find('WordForm').prop('onSubmit')(words[1]);
    expect(history.push).toHaveBeenLastCalledWith('/catalog');
    expect(startEditWord).toHaveBeenLastCalledWith(words[1].id, words[1]);
});

test('should handle startRemoveWord', () => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/catalog');
    expect(startRemoveWord).toHaveBeenLastCalledWith({ id: words[1].id });
});