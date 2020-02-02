import React from 'react';
import { shallow } from 'enzyme';
import { AddWordPage } from '../../components/AddWordPage';
import words from '../fixtures/words';

let startAddWord, history, wrapper;

beforeEach(() => {
    startAddWord = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<AddWordPage startAddWord={startAddWord} history={history} />);
});

test('should render AddWordPage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
    wrapper.find('WordForm').prop('onSubmit')(words[1]);
    expect(startAddWord).toHaveBeenLastCalledWith(words[1]);
});