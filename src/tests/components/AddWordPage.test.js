import React from 'react';
import { shallow } from 'enzyme';
import { AddWordPage } from '../../components/AddWordPage';
import words from '../fixtures/words';

let addWord, history, wrapper;

beforeEach(() => {
    addWord = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<AddWordPage addWord={addWord} history={history} />);
});

test('should render AddWordPage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
    wrapper.find('WordForm').prop('onSubmit')(words[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(addWord).toHaveBeenLastCalledWith(words[1]);
});